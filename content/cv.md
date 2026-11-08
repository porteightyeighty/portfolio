# Matthew Port

London · [hi@mattport.com](mailto:hi@mattport.com) · [github.com/porteightyeighty](https://github.com/porteightyeighty) ·
[mattport.com](https://mattport.com)

## Summary

Software developer with an MSc in Computer Science (Distinction) and five years building
production systems for charities on Salesforce: Apex backend services, REST APIs and Lightning Web
Components, written test-first. I adapt to whatever technology the work needs: I taught myself
Google Apps Script and REST APIs to meet a client deadline, and wrote my dissertation, a compiler
front-end, in Java. As a co-founder of a small consultancy co-operative, I owned projects from
client workshops to production support, so I'm used to explaining technical decisions to
non-technical people, from executives to frontline fundraisers. Looking for a software engineering
role.

## Experience

### CRM Consultant and Founding Director, Impact Box Co-operative <span class="when">Remote · Sep 2021 – Sep 2026</span>

- Co-founded a Salesforce consultancy co-operative for nonprofits and community-interest
  organisations of 10 to 500+ users. Owned 30+ implementations from requirements and solution
  design through build, testing, documentation and handover, then supported them in production.
- Wrote backend services in Apex (a Java-like language) using test-driven development, with unit
  and integration test suites, following Salesforce's bulk processing and governor-limit practices.
- Built internal REST APIs, including a ClickUp integration written from scratch, that combined
  relational and non-relational data sources into a time-tracking dashboard and saved the team
  hours of timesheet work each week.
- Built integrations with payment processors and other external APIs, covering authentication,
  data transformation, synchronisation, error handling and retries.
- Built a storefront for a charity to sell jobs board postings, with Stripe taking payments and
  each successful order creating records in the CRM. Added a custom event handler to the standard
  Stripe integration that identified duplicate events by payment ID, reported failed payments and
  let buyers retry from an email link. Live in production with early-adopter organisations.
- Consolidated Salesforce data and two spreadsheets into one funding-allocation system for a
  grant-making charity managing hundreds of funding sources a year: a junction-object data model,
  an LWC for splitting funds across projects, Apex notifications, 100% Apex test coverage and
  Jest-tested components. Cleaned and migrated ~5,000 rows after a workshop with the client to
  agree data definitions, testing the load in a sandbox first.
- Took over a charity's live referrals migration from Airtable to Salesforce after continued use
  of the old system left no clear source of truth. Wrote a Python script that compared full exports
  from both systems and used last-edited times to resolve most of a few hundred differences,
  leaving a few dozen conflicts for manual review. Airtable was then shut down.
- Replaced a manual trustee dashboard that took days of work each reporting period with a live
  view of fundraising, combining Xero, spreadsheet and Salesforce data.
- Set up a CI/CD pipeline with Travis CI and GitHub to automate testing and deployment, and took
  part in weekly code reviews with the Technical Lead.
- Led a support team of five serving 30+ retainer clients and 100+ cases a month. Grew the support
  service's monthly revenue by 15%, retained 20+ clients over three years and automated contract
  renewals, saving a day a month.

### Research and Development Assistant, National Centre for Diversity <span class="when">Leeds · Oct 2020 – Sep 2021</span>

- Taught myself Google Apps Script and the SCORM Cloud REST API to replace a manual weekly report
  with client dashboards updated hourly.

### Welfare Officer (sabbatical), Leeds University Union <span class="when">Leeds · Jun 2018 – Jun 2019</span>

- One of six elected Executive Directors representing 30,000+ students. Ran the University's
  largest drug and alcohol consultation with an external consultancy, which led the Board to adopt
  a new harm-reduction policy.

*Earlier: hospitality and retail jobs, 2014 – 2020.*

## Education

### MSc Computer Science, Birkbeck, University of London <span class="when">2024 – 2026 · Distinction · part-time</span>

- Dissertation (82%): [rust2lctrs](/rust2lctrs), a compiler front-end in Java that translates a
  subset of Rust into rewrite rules for the Cora termination prover, built with Maven and tested
  with unit, snapshot and end-to-end tests.
- Team project: a local transcription tool with speaker identification and meeting analytics, a
  Python CLI running models through Ollama.

### BA English and Comparative Literature, University of Leeds <span class="when">2016 – 2020 · 2:1</span>

- Electives: Programming for the Web (99%), Introduction to Web Technologies (100%).

## Projects and open source

- **[rust2lctrs](/rust2lctrs):** Java, ANTLR, Spring Boot. My dissertation, with a live demo at
  mattport.com/rust2lctrs/demo.
- **[Gym tracker](/gym-tracker):** TypeScript, Nuxt, Postgres. A workout log with an outbox-based
  analysis worker.
- **[Cora](/open-source):** changed the prover's integers from 32-bit `int` to `BigInteger` (merged).
- **[sf.nvim](/open-source):** added an sObject refresh command to a Neovim plugin for Salesforce
  (merged).

## Skills

- **Proficient:** Java, Apex, SOQL, SQL (PostgreSQL), Lua, Bash, Lightning Web Components
  (JavaScript, HTML, CSS), REST APIs, Git
- **Familiar:** TypeScript, Python, Vue and Nuxt, Spring Boot, Docker, Rust
- **Practices:** test-driven development, object-oriented design and SOLID, REST API design, unit,
  integration and snapshot testing, CI/CD (Travis CI, GitHub Actions), Maven, code review, Agile,
  technical writing
- **Salesforce:** Sales, Service, Nonprofit, Education and Experience Cloud; Flow; SFDX
- **Certifications:** Salesforce Platform Administrator, Platform App Builder, Service Cloud
  Consultant
