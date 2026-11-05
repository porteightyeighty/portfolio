/** Pages and projects, shared by the home list, the terminal and the 404 page. */

export interface Project {
  slug: string;
  desc: string;
  stack: string;
}

export const projects: Project[] = [
  {
    slug: "rust2lctrs",
    desc: "My MSc project. A Java tool that translates a small subset of Rust into rewrite rules for Cora, a termination prover, with a Spring Boot API that runs Cora with time and concurrency limits.",
    stack: "java · antlr · spring boot · docker",
  },
  {
    slug: "gym-tracker",
    desc: "The workout log I use. Nuxt and Postgres, with a separate worker that reads events from an outbox table and recalculates personal records and targets.",
    stack: "typescript · nuxt · postgres · railway",
  },
  {
    slug: "open-source",
    desc: "A change to Cora so that it handles integers larger than 32 bits, and an sObject refresh command for the sf.nvim Neovim plugin.",
    stack: "java · lua · neovim",
  },
  {
    slug: "other",
    desc: "mermaid-edit.nvim, a plugin for editing Mermaid diagrams, and my Nix dotfiles.",
    stack: "lua · nix",
  },
];

/** Everything `cd` and `cat` can reach, as name → path. */
export const pages: Record<string, string> = {
  "~": "/",
  ...Object.fromEntries(projects.map((p) => [p.slug, `/${p.slug}`])),
  about: "/about",
  cv: "/cv",
};

export const email = "hi@mattport.com";
export const linkedin = "https://linkedin.com/in/matthew-port";
