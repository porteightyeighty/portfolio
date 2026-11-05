# rust2lctrs

**Java · ANTLR · Spring Boot · Docker · Railway**

[Live demo](https://mattport.com/r2l/) · [Source](https://github.com/porteightyeighty/rust2lctrs) ·
[Architecture](https://github.com/porteightyeighty/rust2lctrs/blob/main/docs/ARCHITECTURE.md)

My MSc project at Birkbeck (2026).

## What it does

[Cora](https://github.com/hezzel/cora) is a tool that tries to prove a program always
terminates. It doesn't read Rust. It reads a *logically constrained term rewriting system*
(LCTRS), a set of rewrite rules with conditions, and answers `YES` (proved) or `MAYBE` (not
proved).

rust2lctrs translates a function written in a small subset of Rust (integers, booleans, `if`,
`while`, `loop`, function calls) into an LCTRS that Cora can analyse. Anything outside that subset
is rejected with an error message rather than translated approximately, because a wrong
translation would give a verdict about a different program.

## How it works

```
Rust source → parse (ANTLR) → AST → translate → simplify → .lctrs text
```

Each point in a function's control flow becomes a symbol, and each rule moves the program one
step. For example, `u2(x, y) -> u3(x, y) | y > 0` means "at point 2, if `y > 0`, go to point 3".

The stages between parsing and output are pure functions, so the same input always gives the
same output. The command-line tool and the web API call the same entry point.

## Design decisions

### Rejecting unsupported Rust

The Rust grammar is large and the supported subset is small. The AST builder only accepts
constructs it names explicitly. Anything else is rejected with a message pointing at the source
line, such as "`for` loops are out of scope". I chose that over a visitor, because a visitor
passes unhandled constructs through by default.

AST nodes are Java records behind sealed interfaces, so adding a new construct causes a compile
error anywhere it isn't handled yet. Out-of-scope code and unparseable code have different exit
codes (2 and 3), which the API returns as `422` and `400`.

### Integer overflow and division

In Rust, integer overflow panics in debug builds and wraps in release builds. The encoding I based
the project on treats integers as unbounded. I modelled both Rust behaviours instead, selected
with a `--profile` flag, because the choice changes the result: seven of the benchmark programs
are proved to terminate under debug semantics but not under release.

Division needed extra handling. Cora rounds division differently from Rust, so each `/` and `%`
needs a three-case correction. Writing those corrections inline would need 3ᴺ rules for N
divisions, so each division gets its own step instead, which needs 3N.

### The web API

The demo's `/v1/analyse` route translates the submitted code and then runs Cora on it. Cora starts
Z3 solver processes and can run for a long time, so the route has limits:

- At most two analyses run at once. Further requests get `503` with `Retry-After` straight away
  instead of waiting in a queue.
- After 30 seconds, Cora and all its child processes are killed and the client gets `504`.
- Cora's memory is capped, request bodies are limited to 64 KiB, and output is cut off at 256 KiB.
- Each outcome is recorded as a Prometheus metric.

Cora only ever receives output produced by the translator, never the user's text directly.

I first wrote the server with the JDK's built-in HTTP server, then moved it to Spring Boot to
learn the framework on a small project that already had tests. The API stayed the same, so the
frontend didn't change. I also split the build into two jars, so the command-line jar doesn't
include Spring. It went from 18.5 MB to 2.2 MB.

### A change to Cora

Cora stored integers as 32-bit Java `int`s, so it couldn't parse `i32::MIN` or the bounds of
`u64` and `i128`. Rather than limit which integer types rust2lctrs accepts, I changed Cora to use
`BigInteger`. The change was merged upstream
([hezzel/cora#10](https://github.com/hezzel/cora/pull/10)).

## Testing

There are 294 tests in three layers:

- **Unit tests** for each translation rule.
- **Snapshot tests:** a saved `.lctrs` file for each of 32 benchmark programs under each profile
  (64 files), so any change in output shows up as a diff.
- **End-to-end tests:** each benchmark is run through Cora and its verdict compared with the
  expected one. These run with `./mvnw verify` against a local Cora install.

The API has separate tests, using a stand-in script in place of Cora so that timeouts and crashes
can be tested.

## Results

| Profile | Programs that terminate | Proved by Cora |
|---|---|---|
| debug | 29 of 32 | 28 |
| release | 26 of 32 | 21 |

The terminating program Cora doesn't prove under debug is McCarthy's 91 function: its
termination argument depends on nested recursive calls, which Cora's search doesn't find. Under release, Cora proves fewer programs because it no
longer has the overflow bound to work with.

## Next steps

- Test that a Rust program and its translation give the same results on the same inputs. Nothing
  checks that directly yet.
- Support more of Rust, starting with `for` loops over ranges.
