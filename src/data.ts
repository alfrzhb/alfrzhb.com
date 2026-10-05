export type Tone = 'peach' | 'blue' | 'green' | 'rose' | 'lavender';
export type Detail = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; text: string }[];
  link?: { label: string; href: string };
};
export type Project = {
  id: string;
  title: string;
  year: string;
  description: string;
  tags: { label: string; tone: Tone }[];
  detail: Detail;
};

export const social = {
  email: 'm.alfarizihabibullah@gmail.com',
  github: 'https://github.com/alfrzhb',
  linkedin: 'https://www.linkedin.com/in/m-alfarizi-habibullah',
};

export const projects: Project[] = [
  {
    id: 'ddl', title: 'DDL Optimization + Generative AI', year: '2026',
    description: 'AI-assisted system for reviewing and improving MySQL DDL, with analysis, diff view, ERD, and sandbox validation.',
    tags: [{label:'Next.js',tone:'peach'},{label:'Express',tone:'blue'},{label:'D1',tone:'green'},{label:'Docker',tone:'rose'},{label:'Gemini',tone:'lavender'}],
    detail: {
      id: 'ddl', eyebrow: 'Selected work · Undergraduate thesis', title: 'DDL Optimization + Generative AI',
      intro: 'A practical workflow for reviewing MySQL schema design with generative AI, while keeping the developer in control of every change.',
      sections: [
        { heading: 'The problem', text: 'Improving a database schema involves more than generating SQL. Developers need to understand the proposed structural changes, compare them with the original design, and verify that the resulting DDL can actually run.' },
        { heading: 'What I built', text: 'The workflow starts with DDL input and AI analysis. Developers review and accept suggestions, inspect a SQL diff and an entity relationship diagram, validate the result in a Docker sandbox, and download the final SQL. A self-correction step addresses execution errors found during validation.' },
        { heading: 'How it was developed', text: 'The project used Extreme Programming across four iterations, with an end-to-end evaluation covering 28 stages. The application combines React/Next.js, Node/Express, Cloudflare Workers and D1, Docker, and Gemini 2.5 Flash Lite.' },
        { heading: 'Scope of the research', text: 'Optimization here means improving the DDL structure and schema design. Evaluation used example datasets, rather than a production database. The thesis and defense are complete.' },
      ],
    },
  },
  {
    id: 'ratama', title: 'Ratama Project & Finance Tracker', year: '2026',
    description: 'Internal system for tracking opportunities, proposals, project progress, invoicing, and payments.',
    tags: [{label:'Cloudflare Pages',tone:'peach'},{label:'Workers',tone:'blue'},{label:'D1',tone:'green'}],
    detail: {
      id:'ratama', eyebrow:'Selected work · Internal business system', title:'Ratama Project & Finance Tracker',
      intro:'A shared view of project and financial progress for PT Ratama Mitra Kualitas.',
      sections:[
        {heading:'The problem',text:'Marketing, project delivery, finance, and the owner need the same picture of a project. Information about opportunities, proposals, delivery progress, invoices, and payments can become fragmented as work moves between teams.'},
        {heading:'The workflow',text:'The system follows opportunity → proposal → negotiation and deal → project progress and activities → invoice and accounts receivable → payment. Cost and accounts payable tracking support the financial view.'},
        {heading:'Architecture',text:'A React frontend on Cloudflare Pages talks to a Workers API backed by D1. Role-based views support Owner, Finance, Marketing, PM, and Staff. The staging environment uses Cloudflare Zero Trust OTP access.'},
        {heading:'Current stage',text:'The staging implementation reached Phase 15, including a custom domain. Business flow, schema, API, and deployment documentation accompany the code. The system is an internal project, so its operational data is not displayed here.'},
      ],
    },
  },
  {
    id:'acm',title:'ACM Monitoring System',year:'2025–2026',
    description:'Web-based CCTV monitoring and site management tool for operational visibility and reporting.',
    tags:[{label:'Dashboard',tone:'peach'},{label:'Monitoring',tone:'blue'},{label:'Internal Tool',tone:'green'}],
    detail:{
      id:'acm',eyebrow:'Selected work · Internship',title:'ACM Monitoring System',
      intro:'An internal monitoring application developed during my internship at 295 Technology Solution.',
      sections:[
        {heading:'Context',text:'I worked as an Intern Programmer at 295 Technology Solution from November 2025 to April 2026, contributing to ACM alongside CRM and QR Generator projects.'},
        {heading:'The product',text:'ACM is a web-based tool for CCTV monitoring and site management. It brings monitoring information into a dashboard to support operational visibility and reporting.'},
        {heading:'What I learned',text:'Working on an internal system connected software development with operational needs, requirements documentation, and maintainable interfaces. I also used ACM as the case for my Software Engineer assessment documentation.'},
      ],
    },
  },
];

export const experience = [
  {date:'Nov 2025 – Apr 2026',title:'Intern Programmer',organization:'295 Technology Solution',description:'Worked on CRM, ACM Monitoring System, and QR Generator.',tags:[{label:'Internship',tone:'peach'},{label:'Software',tone:'blue'}],icon:'code'},
  {date:'2024',title:'Vice Chairman',organization:'HMIT UIN Sunan Kalijaga',description:'Supported student organization programs and coordination.',tags:[{label:'Leadership',tone:'green'}],icon:'people'},
  {date:'2024',title:'Chairman',organization:'SCIT',description:'Led committee planning and execution.',tags:[{label:'Organization',tone:'blue'}],icon:'check'},
  {date:'2024',title:'Supporting Committee',organization:'Baparekraf Developer Day',description:'Assisted in event preparation, coordination, and technical support.',tags:[{label:'Committee',tone:'peach'}],icon:'calendar'},
] as const;

export const education = [
  {title:'S2 Kenotariatan',description:'Universitas Tarumanagara (UNTAR)',status:'2026 – Present',tone:'blue',icon:'graduate'},
  {title:'S1 Informatika',description:'UIN Sunan Kalijaga',status:'Graduate',tone:'green',icon:'graduate'},
  {title:'Bangkit Academy 2024',description:'Android Learning Path',icon:'book'},
  {title:'DBS Coding Camp',description:'Capstone: Harumnesia',icon:'code'},
  {title:'BNSP Software Engineer',description:'Assessment completed · certificate pending',icon:'credential'},
] as const;

export const notes: (Detail & {category:string;tone:Tone;description:string;icon:string})[] = [
  {
    id:'binary-search',category:'Algorithms',tone:'peach',icon:'file',eyebrow:'Learning note · Algorithms',title:'Understanding Binary Search',description:'How to find the search space efficiently and reduce the problem size.',
    intro:'Binary search is a way to find a value by repeatedly cutting a sorted search space in half.',
    sections:[
      {heading:'Start with the right condition',text:'The data must be sorted, or the question must have a monotonic answer. In a sorted list, values to the left of a position are smaller and values to the right are larger. That is what makes it safe to discard half of the remaining candidates.'},
      {heading:'A small example',text:'Look for 23 in [3, 7, 12, 18, 23, 31, 42]. The middle value is 18. Since 23 is larger, keep only the right side. Its middle is 31, so keep the smaller side. That leaves 23. Each comparison narrows the interval.'},
      {heading:'Think in boundaries',text:'Maintain a left and right boundary. Calculate the middle, compare it with the target, then move the appropriate boundary past the middle. Stop when you find the target or the interval becomes empty. Decide whether your interval includes both endpoints before writing the loop.'},
      {heading:'Why it matters',text:'The number of comparisons grows logarithmically: O(log n). But sorting an unsorted list also has a cost. Binary search becomes particularly useful when data is already ordered or when the same collection will be searched many times.'},
    ],
  },
  {
    id:'big-o',category:'Complexity',tone:'blue',icon:'chart',eyebrow:'Learning note · Complexity',title:'Big O Without Overcomplicating It',description:'A practical way to understand time and space complexity.',
    intro:'Big O describes how an algorithm’s resource needs grow as its input grows. It is a model of growth, not a stopwatch.',
    sections:[
      {heading:'Count the growing work',text:'Reading one array item by index is O(1). Reading every item once is O(n). Comparing every pair is usually O(n²). Binary search on sorted data is O(log n), because it discards half of the search space at each step.'},
      {heading:'Ignore constant factors, keep the context',text:'Two loops that each scan the input still give O(n), even though they do about twice as much work as one. The constants still affect actual performance. Big O helps compare growth; benchmarks help compare specific implementations and workloads.'},
      {heading:'Memory grows too',text:'An algorithm that creates a second array containing every input item uses O(n) additional space. A scan that only keeps a running total can use O(1) additional space. Time and space are separate dimensions, and improving one can increase the other.'},
      {heading:'A useful habit',text:'Before optimizing, identify the input size and the operation that repeats. Ask how often it runs, what it allocates, and which case you are describing. Then measure the real bottleneck.'},
    ],
  },
  {
    id:'cloudflare',category:'Cloudflare',tone:'green',icon:'cloud',eyebrow:'Learning note · Cloudflare',title:'Building With Pages, Workers, and D1',description:'Notes on practical architecture choices and what I’ve learned.',
    intro:'For Ratama, I separated the static frontend, application API, and database into Cloudflare Pages, Workers, and D1.',
    sections:[
      {heading:'Give each layer a job',text:'Pages serves the frontend. Workers handles application requests and business rules. D1 stores structured records. Keeping these responsibilities clear makes the data flow easier to document and reason about.'},
      {heading:'Access belongs at the boundaries',text:'The browser is not a trusted source of permissions. The API must validate input and enforce role-based access. A protected staging environment is useful, but it does not replace application authorization.'},
      {heading:'Not every project needs a database',text:'Harumnesia V2 takes a different approach. Its recommendation dataset is static JSON, and its recommender runs in a Web Worker in the browser. There is no need to add D1 simply because it is available.'},
      {heading:'Choose from the workload',text:'An internal finance tracker needs durable records and shared access. A static perfume dataset can be distributed as an asset. The simplest useful architecture comes from the product’s data and interactions.'},
    ],
  },
  {
    id:'harumnesia-v2',category:'Projects',tone:'rose',icon:'book',eyebrow:'Project note · Harumnesia',title:'Rebuilding Harumnesia V2',description:'Turning an old capstone into a cleaner, production-ready remake.',
    intro:'Harumnesia V2 revisits the DBS Coding Camp perfume recommendation capstone while preserving the original version as an archive.',
    sections:[
      {heading:'Preserve the original',text:'The original capstone remains a record of what the team submitted. V2 lives in a new monorepo, so the remake can improve structure and deployment without rewriting that history.'},
      {heading:'Make recommendations understandable',text:'The production pipeline filters candidates, compares notes and accords with cosine similarity, combines weighted scores, and diversifies the results. It returns a Top 5 with explanations based on the selected preferences.'},
      {heading:'Keep the runtime simple',text:'The dataset is shipped as static JSON. A browser Web Worker initializes the recommendation engine, produces results, and retrieves perfume details without blocking the main interface. The frontend is hosted on Cloudflare Pages.'},
      {heading:'A different production core',text:'V1’s Autoencoder and K-Means are preserved as capstone history, rather than used as the V2 production core. The remake prioritizes explainable ranking, maintainable boundaries, and a deployment that does not require a VPS.'},
    ],
    link:{label:'Explore Harumnesia V2',href:'https://harumnesia.pages.dev/'},
  },
];

export const archive: (Project & {icon:string})[] = [
  {id:'harumnesia',title:'Harumnesia',year:'2026',description:'Perfume recommendation app.',icon:'perfume',tags:[{label:'Recommender',tone:'peach'},{label:'Web',tone:'blue'}],detail:{id:'harumnesia',eyebrow:'Archive · Capstone remake',title:'Harumnesia',intro:'An explainable perfume recommender rebuilt from our DBS Coding Camp capstone.',sections:[{heading:'Version 2',text:'The public monorepo brings together a React frontend, shared types, recommendation engine, dataset, and evaluation. A static dataset and a browser Web Worker support filtering, cosine similarity, weighted scoring, diversification, and Top 5 explanations.'},{heading:'Version 1',text:'The original capstone is retained as an archive. Its machine learning approach used an Autoencoder and K-Means. V2 replaces the production recommendation core while keeping the original work intact.'}],link:{label:'View public repository',href:'https://github.com/Harumnesia/harumnesia'}}},
  {id:'crm',title:'CRM',year:'2025–2026',description:'Customer relationship management tool.',icon:'people',tags:[{label:'Internal Tool',tone:'green'},{label:'Laravel',tone:'rose'}],detail:{id:'crm',eyebrow:'Archive · Internship',title:'CRM',intro:'An internal customer relationship management project at 295 Technology Solution.',sections:[{heading:'Context',text:'Part of my November 2025 to April 2026 internship work, alongside ACM and QRGen. The project supported customer relationship management through a web interface.'},{heading:'Availability',text:'This was an internal company project. Its private customer data and source code are not shared through this portfolio.'}]}},
  {id:'qrgen',title:'QRGen',year:'2025–2026',description:'QR code generation utility.',icon:'qr',tags:[{label:'Utility',tone:'blue'},{label:'Web',tone:'peach'}],detail:{id:'qrgen',eyebrow:'Archive · Internship',title:'QRGen',intro:'A QR code generation utility developed during my internship.',sections:[{heading:'Context',text:'QR Generator was one of the projects I worked on at 295 Technology Solution, alongside CRM and ACM, from November 2025 to April 2026.'}]}},
  {id:'usstuck',title:'UsStuck',year:'2024',description:'Chatbot / hackathon project.',icon:'chat',tags:[{label:'AI',tone:'rose'},{label:'Hackathon',tone:'blue'}],detail:{id:'usstuck',eyebrow:'Archive · Hackathon',title:'UsStuck',intro:'A chatbot project developed for a national hackathon.',sections:[{heading:'Team achievement',text:'Our UsStuck chatbot project earned third place at a national hackathon. It was an opportunity to turn an idea into a working demonstration under a competition deadline.'}]}},
  {id:'dicoding-event',title:'MyDicodingEvent',year:'2024',description:'Android event app.',icon:'mobile',tags:[{label:'Android',tone:'green'},{label:'Mobile',tone:'peach'}],detail:{id:'dicoding-event',eyebrow:'Archive · Android learning',title:'MyDicodingEvent',intro:'An Android event application built as part of my learning journey.',sections:[{heading:'Learning through building',text:'This project belongs to my Kotlin and Android Studio learning work. It is part of the smaller applications that helped me practice mobile development alongside Bangkit Academy’s Android path.'}]}},
  {id:'kkn-goat',title:'KKN Goat',year:'2024',description:'Community project.',icon:'people',tags:[{label:'Social',tone:'blue'},{label:'Web',tone:'peach'}],detail:{id:'kkn-goat',eyebrow:'Archive · Community',title:'KKN Goat',intro:'A community project focused on livestock goat management.',sections:[{heading:'Community context',text:'Built in the context of KKN, this project connected web development with a practical community use case: organizing goat management information.'}]}},
];
