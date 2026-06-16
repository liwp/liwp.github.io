export const profile = {
  name: { first: 'Lauri', last: 'Pesonen' },
  handle: 'liwp',
  title: 'Lead Software Engineer',
  tagline: 'Product engineer with a PhD in distributed systems. Building reliable products end-to-end.',
  location: 'Cambridge, UK',
  coordinates: '52.21°N — 0.12°E',
  availability: 'Actively looking',
  email: 'lauri.pesonen@iki.fi',
  since: 1997,
  links: [
    { label: 'GitHub', url: 'https://github.com/liwp' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/lauri-pesonen/' },
    { label: 'Stack Overflow', url: 'https://stackoverflow.com/users/140938/liwp' },
  ],
};

export type Job = {
  period: string;
  role: string;
  company: string;
  summary: string;
  tags: string[];
  highlights?: { label: string; text: string }[];
};

export const experience: Job[] = [
  {
    period: '2021 — 2026',
    role: 'Lead Software Engineer',
    company: 'Whimsical',
    summary:
      'Collaborative visual workspace — boards, docs, and project management. Full-stack work across a Clojure/PostgreSQL backend on AWS and a ClojureScript/React frontend, in a small team where engineers and designers owned projects directly.',
    highlights: [
      {
        label: 'Tasks & Projects',
        text: 'Lead backend engineer on the project-management expansion, a Linear-style surface built to turn Whimsical from an occasional diagramming tool into part of users’ daily work. Designed the project data model — configurable statuses, custom fields, and a task filter language — and extended the backend with My Tasks and a file-attachment API.',
      },
      {
        label: 'Entitlements & monetisation',
        text: 'Built the feature-gating system that controls which capabilities each plan tier unlocks, from Free through Enterprise — the enforcement layer tying product features directly to revenue. Built the credit-based metering for the AI features, and added prompt caching after noticing Whimsical’s own demo prompts would exhaust a free user’s monthly credits on first use.',
      },
      {
        label: 'Platform modernisation',
        text: 'Instigated and drove the conversion of the backend web layer from asynchronous to synchronous — faster compiles, readable stack traces, fewer concurrency mistakes. A strangler-fig approach kept the migration transparent to ongoing delivery. The migrated surface handles several hundred thousand requests/week in production, with the busiest endpoint at p50 16ms / p95 70ms.',
      },
      {
        label: 'Reliability infrastructure',
        text: 'Built, on my own initiative, a watchdog service that pages the team when a recurring background job silently stalls, and a queue-based migration framework on which I ran tens of production data migrations.',
      },
    ],
    tags: ['Clojure', 'ClojureScript', 'React', 'PostgreSQL', 'AWS'],
  },
  {
    period: '2019 — 2021',
    role: 'Principal Software Engineer',
    company: 'BigPay',
    summary:
      'Fintech challenger bank. Worked on personal loans and payments. Identified that the core monetary transaction flow, spanning multiple microservices, was too fragile to extend safely with new products, and redesigned it to be fault-tolerant with a clean API for new client services.',
    tags: ['Java', 'Kotlin', 'Rust', 'Kafka', 'PostgreSQL', 'CockroachDB'],
  },
  {
    period: '2015 — 2019',
    role: 'Self-Employed Contractor',
    company: 'Moss Oak Software',
    summary:
      'Full-stack web contracting across a wide range of technologies, typically hired for breadth and to coach junior engineers. Projects included an IoT connectivity service (Go, RabbitMQ, React), a GIS data service (Node, PostgreSQL), and an OAuth2 client management service (Go, Ember).',
    tags: ['Go', 'Node.js', 'React', 'Ember', 'PostgreSQL'],
  },
  {
    period: '2014 — 2015',
    role: 'Software Engineer / Team Lead',
    company: 'Listora',
    summary:
      'Tech lead on a Clojure/Datomic event data (e.g. theatre show times) API. Built the Elasticsearch search, Redis-based rate limiting, and JWT authentication. Owned the team backlog, drove design consensus, and reviewed code.',
    tags: ['Clojure', 'Datomic', 'Elasticsearch', 'Redis'],
  },
  {
    period: '2010 — 2014',
    role: 'Software Engineer',
    company: 'Red Gate Software',
    summary:
      'Built multiple C# database-tooling products — SQL Scripts Manager, SQL Virtual Restore, SQL HyperBac, SQL Storage Compress. Implemented Azure web services for analytics event processing. Member of the engineering steering group; ran the internal Clojure user group.',
    tags: ['C#', 'Clojure', 'Azure', 'Ruby'],
  },
  {
    period: '2008 — 2010',
    role: 'Senior Software Engineer',
    company: 'Progress Software',
    summary:
      'Core engineer on the Apama Complex Event Processing platform. Implemented green-thread scheduling with continuations to replace a native-thread model, and built a hierarchical logging system.',
    tags: ['C++', 'Python', 'Java', 'Apama CEP'],
  },
  {
    period: '2006 — 2008',
    role: 'Senior Engineer',
    company: 'Cambridge Consultants',
    summary:
      'Designed and implemented a proprietary network element for a mobile operator with five-nines availability and soft real-time requirements. Implemented a Ruby DSL for generating C event-type structures. Administered a 20-server Solaris development environment.',
    tags: ['C', 'Ruby', 'Solaris', 'TCP/IP'],
  },
];

export const education = [
  {
    period: '2003 — 2008',
    degree: 'PhD, Computer Science',
    school: 'University of Cambridge',
    note: 'Thesis on decentralised access control in multi-domain publish/subscribe systems. Six publications in ACM, IEEE, and Springer venues.',
  },
  {
    period: '1995 — 2001',
    degree: 'MSc, Computer Science',
    school: 'Helsinki University of Technology',
    note: 'Major in computer networks and security. Thesis on temporary and anonymous authorisation with XML-encoded SPKI certificates.',
  },
];

export const olderExperience: Job[] = [
  {
    period: '2004',
    role: 'Software Developer, Internship',
    company: 'IBM Research',
    summary: 'Middleware on the OSGi platform acting as an event aggregator at the edge of sensor networks.',
    tags: ['Java', 'OSGi'],
  },
  {
    period: '2002 — 2003',
    role: 'Software Developer',
    company: 'Meridea Financial Software',
    summary: 'Eclipse IDE plug-ins for a proprietary configuration editor — analysis, design, implementation, and testing.',
    tags: ['Java', 'Eclipse'],
  },
  {
    period: '1999 — 2002',
    role: 'R&D Engineer → Product Development Manager',
    company: 'First Hop',
    summary: 'Three progressive roles: R&D building distributed Java systems, Customer Care Team Leader, then Product Development Manager — introduced unit testing and requirements management.',
    tags: ['Java', 'RMI'],
  },
  {
    period: '1997 — 1998',
    role: 'Software Engineer',
    company: 'More Magic Software',
    summary: 'Implemented the prototype MProxy product as an Apache module in C.',
    tags: ['C', 'Apache'],
  },
];

export const projects = [
  {
    name: 'again',
    description: 'Clojure library for retrying operations with composable, data-driven backoff strategies.',
    url: 'https://github.com/liwp/again',
    status: 'STABLE',
    stack: ['Clojure'],
  },
  {
    name: 'rasp.surge.sh',
    description: 'Gliding weather forecast app. Renders RASP (Regional Atmospheric Soaring Prediction) charts for UK and European sites.',
    url: 'https://rasp.surge.sh/',
    status: 'RUNNING',
    stack: ['JavaScript'],
  },
  {
    name: 'xcdebrief',
    description: 'Post-flight gap analysis for UK XC glider pilots. Compares actual flights against optimal routes to identify missed opportunities.',
    url: '',
    status: 'WIP',
    stack: ['TypeScript'],
  },
];
