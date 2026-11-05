# sf.nvim: sObject refresh

**Lua · Neovim · Salesforce REST API**

[Issue #334](https://github.com/xixiaofinland/sf.nvim/issues/334) ·
[PR #340](https://github.com/xixiaofinland/sf.nvim/pull/340) (merged 23 May 2026)

[sf.nvim](https://github.com/xixiaofinland/sf.nvim) is a Neovim plugin for Salesforce development.
I added one command to it.

## The feature

VS Code's Salesforce extension has a "Refresh SObject Definitions" command. It downloads the schema
of every object in the org and saves it as stub Apex classes, so the Apex language server can
offer field completion and type checking. sf.nvim didn't have an equivalent.

I opened an issue proposing it, and the maintainer invited a PR. The command I added,
`:SF sobject refresh`, is about 900 lines across six files. It:

- lists the org's objects through the `sf` CLI
- fetches their schemas through Salesforce's `composite/batch` REST endpoint, 25 objects per
  request with up to 15 requests at a time (an org with about 1,500 objects takes under a minute)
- writes stub classes in the same format as VS Code
- restarts the Apex language server so it picks up the new files

## Review

The maintainer raised four points, which I fixed:

1. A refresh of custom objects also deleted the standard-object folder.
2. A filter for excluding some system objects was written but never used.
3. Restarting the language server froze the editor for up to five seconds.
4. Partial failures in a batch weren't reported to the user.

## What happened later

In October, the maintainer found that every request failed with `401` on newer versions of the
`sf` CLI ([#345](https://github.com/xixiaofinland/sf.nvim/issues/345)). My code read an access
token from `sf org display --json` and passed it to `curl`, and newer CLI versions no longer return
a token that works for that. The refresh also deleted the old files before downloading new ones,
so a failed refresh left the user with none.

The maintainer fixed both in [#375](https://github.com/xixiaofinland/sf.nvim/pull/375), by sending
requests through the CLI's own `sf api request rest` command and only replacing the old files once
every request had succeeded. I wasn't involved in that fix.

If I wrote it again, I'd use the CLI's supported request command rather than taking the token
out of its output, and I'd write the new files somewhere else first and only replace the old ones
once everything had succeeded.
