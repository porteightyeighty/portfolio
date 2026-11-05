# Cora: unbounded integers

**Java**

[Issue #9](https://github.com/hezzel/cora/issues/9) ·
[PR #10](https://github.com/hezzel/cora/pull/10) (merged 28 July 2026)

[Cora](https://github.com/hezzel/cora) is a research tool for proving that programs terminate.
My MSc project, [rust2lctrs](/rust2lctrs), produces input for it.

## The problem

Cora's integer type is meant to represent all integers, but in the code it was a 32-bit Java
`int` throughout. Any constant beyond that range failed with
`Cannot parse integer constant: 2147483648`.

That meant Cora couldn't read `i32::MIN`, which rust2lctrs needs to encode Rust's `i32` overflow
behaviour, let alone the bounds of `u64` or `i128`. Cora's internal arithmetic also used `int`,
so very large intermediate values could overflow.

## The issue

I opened an issue describing the problem, a minimal example, where in the code it came from, and
two possible fixes: `long`, which is a smaller change but only raises the limit, or `BigInteger`,
which removes it. The maintainer preferred `BigInteger` and suggested I start from the latest
development branch, which had recently changed.

## The change

The PR changed 48 files (+366 / −222). I replaced `int` with `BigInteger` in the parser, the term
model, the SMT layer and the code that reads solver output. I kept `int` versions of the
convenience methods so existing call sites using small numbers didn't need to change.

One method in the HORPO termination technique converted values back to `int` and would have thrown
on large numbers. I first capped it at `Integer.MAX_VALUE`, which could only lose a proof, not
produce a wrong one, and then changed it to use `BigInteger` as well.

## The review

The maintainer pointed out one place that broke the project's style rule about braces on
multi-line `if` statements. I misunderstood the rule and added braces across many files, which
made the diff larger. The maintainer explained the rule and asked me to revert that, so I kept
only the one fix that was needed. Next time I'd ask before making a change that wide.

The PR was approved and merged a month after the issue was opened.
