# Other projects

## mermaid-edit.nvim

**Lua · Neovim · tree-sitter** · [Source](https://github.com/porteightyeighty/mermaid-edit.nvim)

A Neovim plugin for editing Mermaid flowcharts and ER diagrams. In a flowchart, the connections
between steps are node IDs repeated across lines, so inserting or reordering a step by hand means
rewriting those IDs. The plugin uses the tree-sitter parse tree to do it:

- **Flowcharts:** insert a step between two nodes, swap steps, change a node's shape, or remove a
  node and reconnect the nodes either side.
- **ER diagrams:** change a relationship's cardinality, edit attributes, or rename an entity
  everywhere it appears.

The same keys work in both kinds of diagram.

<video controls muted playsinline preload="metadata" width="1000" height="420"
  poster="/media/mermaid-edit-demo.jpg" aria-label="Demo: swapping, inserting, reshaping and removing flowchart steps, then renaming an ER entity">
  <source src="/media/mermaid-edit-demo.mp4" type="video/mp4">
</video>

## dotfiles

**Nix · home-manager · Neovim · Hyprland** · [Source](https://github.com/porteightyeighty/dotfiles)

My development setup, defined as a Nix flake that works on macOS and Linux.

- The username, home directory and platform are read when it's built, so the same config works on
  any account. Git identity isn't stored in the repo.
- Most tools are installed by Nix. Configs I change often (Neovim, the shell, the terminal) are
  symlinked to the repo, so edits apply without a rebuild.
- One environment variable leaves out the desktop setup on a server.
