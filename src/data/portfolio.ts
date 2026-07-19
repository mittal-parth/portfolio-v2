export const resumeLink =
  "https://drive.google.com/file/d/1vkxyMDB5_KpMwt4QXFgT2aqdRizr8Czh/view?usp=sharing";

export const siteConfig = {
  name: "Parth Mittal",
  title: "Parth Mittal - Software Developer",
  description:
    "Member of Technical Staff at Oracle. 13x hackathon winner. Builder of Khoj, Echo, and open-source tools.",
  url: "https://parthmittal.dev",
  githubUsername: "mittal-parth",
  role: "Member of Technical Staff",
  tagline: "MTS @ Oracle · 13x Hackathon Winner · NITK'24 · PBA-5",
};

/** GitHub contribution graph — tweak months, labels, and sizing here. */
export const githubGraphConfig = {
  /** Rolling window in months — 12 matches GitHub's last-year view */
  months: 12,
  cellSize: 11,
  cellGap: 3,
  showLegend: true,
  showWeekdayLabels: true,
  showMonthLabels: true,
} as const;

export type SocialLink = {
  id: string;
  platform: "linkedin" | "github" | "mail" | "twitter";
  link: string;
  label: string;
};

export const socialMedia: SocialLink[] = [
  {
    id: "social-media-1",
    platform: "linkedin",
    link: "https://www.linkedin.com/in/mittal-parth",
    label: "LinkedIn",
  },
  {
    id: "social-media-2",
    platform: "github",
    link: "https://www.github.com/mittal-parth",
    label: "GitHub",
  },
  {
    id: "social-media-3",
    platform: "mail",
    link: "mailto:work.parthmittal@gmail.com",
    label: "Email",
  },
  {
    id: "social-media-4",
    platform: "twitter",
    link: "https://www.twitter.com/mittalparth_",
    label: "Twitter",
  },
];

export type IntroSegment =
  | { type: "text"; value: string }
  | { type: "hand"; value: string }
  | {
      type: "link";
      label: string;
      href: string;
      previewTitle?: string;
      previewDescription?: string;
    };

export type IntroBullet = {
  id: string;
  segments: IntroSegment[];
};

export const introBullets: IntroBullet[] = [
  {
    id: "intro-1",
    segments: [
      { type: "text", value: "I am currently a " },
      { type: "hand", value: "Member of Technical Staff" },
      { type: "text", value: " at " },
      {
        type: "link",
        label: "Oracle",
        href: "https://www.oracle.com",
        previewTitle: "Oracle",
        previewDescription: "Cloud infrastructure and enterprise software.",
      },
      {
        type: "text",
        value:
          ", working in the Exadata Database as a Service, Control Plane team.",
      },
    ],
  },
  {
    id: "intro-2",
    segments: [
      { type: "text", value: "I like doing " },
      { type: "hand", value: "hackathons" },
      {
        type: "text",
        value:
          ". Participated in 30+, won 13 (including one of India's largest Web3 hackathons), and judged 3.",
      },
    ],
  },
  {
    id: "intro-3",
    segments: [
      { type: "text", value: "I used to lead a team of 40+ student developers, building " },
      {
        type: "link",
        label: "IRIS",
        href: "https://about.iris.nitk.ac.in/",
        previewTitle: "IRIS, NITK",
        previewDescription: "Institute MIS with 10K+ active users.",
      },
      { type: "text", value: " - an MIS with 10K+ active users." },
    ],
  },
  {
    id: "intro-4",
    segments: [
      { type: "text", value: "Graduated from " },
      {
        type: "link",
        label: "NITK",
        href: "https://www.nitk.ac.in/",
        previewTitle: "NITK Surathkal",
        previewDescription: "National Institute of Technology Karnataka.",
      },
      { type: "text", value: " in 2024. Also an alumnus of the " },
      {
        type: "link",
        label: "Polkadot Blockchain Academy",
        href: "https://polkadot.academy/",
        previewTitle: "Polkadot Blockchain Academy",
        previewDescription: "Intensive blockchain developer program.",
      },
      { type: "text", value: " @ National University of Singapore." },
    ],
  },
  {
    id: "intro-5",
    segments: [
      { type: "text", value: "Fun fact: I was " },
      {
        type: "link",
        label: "featured",
        href: "https://www.linkedin.com/posts/mittal-parth_look-mom-i-am-on-the-times-square-ugcPost-7324078226178215936-tat9/",
        previewTitle: "Times Square feature",
        previewDescription: "Featured on Times Square by Talent Protocol.",
      },
      { type: "text", value: " on the Times Square by Talent Protocol!" },
    ],
  },
];

export type ContentBlock = { text: string; link?: string };

export type Position = {
  title: string;
  duration: string;
  content: ContentBlock[];
};

export type Experience = {
  id: string;
  organisation: string;
  logo: string;
  link: string;
  positions: Position[];
};

export const experiences: Experience[] = [
  {
    id: "exp-oracle",
    organisation: "Oracle, India",
    logo: "/assets/oracle.jpg",
    link: "https://www.oracle.com/in/",
    positions: [
      {
        title: "Member of Technical Staff",
        duration: "Oct 2025 - Present",
        content: [
          {
            text: "Working in the Database as a Service Control Plane team for Oracle Cloud Infrastructure.",
          },
        ],
      },
      {
        title: "Member of Technical Staff - 1",
        duration: "Jul 2024 - Sep 2025",
        content: [
          {
            text: "Made several fixes to reduce the time taken for backup deletion from OCI Object Storage for large customers resulting in decreased costs.",
          },
          {
            text: "Worked towards building an AI On-Call Agent using an internal agentic framework.",
          },
          {
            text: "Developed a common integration test framework for ExaCS, ExaDB-XS and ExaCC, reducing code maintenance by ~67% and increased coverage by ~50%.",
          },
        ],
      },
      {
        title: "Member of Technical Staff Intern",
        duration: "May 2023 - Jul 2023",
        content: [
          {
            text: "Worked with the Exadata Cloud@Customer team in the Database Unit.",
          },
          {
            text: "Wrote APIs in Java to help gracefully migrate a running ExaC@C infrastructure to a new region in the case of a region failure.",
          },
        ],
      },
    ],
  },
  {
    id: "exp-averlon",
    organisation: "Averlon",
    logo: "/assets/averlon.jpg",
    link: "https://averlon.ai/",
    positions: [
      {
        title: "Software Developer Intern",
        duration: "Sept 2023 - Feb 2024",
        content: [
          {
            text: "Added support for the discoverability of Microsoft Azure assets utilising Go and Gremlin.",
          },
          {
            text: "Extended support for Azure for reachability analysis of assets for cloud security posture management.",
          },
        ],
      },
    ],
  },
  {
    id: "exp-iris",
    organisation: "IRIS, NITK",
    logo: "/assets/placeholder-iris.svg",
    link: "https://iris.nitk.ac.in/about_us",
    positions: [
      {
        title: "Tech Lead",
        duration: "Apr 2023 - Apr 2024",
        content: [
          {
            text: "Led a team of 40+ students in digitizing administrative, academic and alumni-related work.",
          },
          {
            text: "Managed all phases of Software Development Life Cycle (SDLC) for 15+ modules.",
          },
        ],
      },
      {
        title: "Web Lead",
        duration: "Apr 2022 - Apr 2024",
        content: [
          {
            text: "Managed a team of 6 student developers while also overlooking multiple modules.",
          },
        ],
      },
      {
        title: "Web Developer",
        duration: "Nov 2021 - Apr 2022",
        content: [
          {
            text: "Added Conditional Fields support to the Forms Module.",
          },
        ],
      },
      {
        title: "Web Developer Intern",
        duration: "Jun 2021 - Oct 2021",
        content: [
          {
            text: "Developed a multi-role approval flow system to facilitate data collection and display on the Institute's Department Websites.",
          },
        ],
      },
    ],
  },
];

export type Education = {
  id: string;
  icon: string;
  title: string;
  degree: string;
  duration: string;
  content: string[];
  link?: string;
};

export const educationList: Education[] = [
  {
    id: "education-1",
    icon: "/assets/placeholder-nitk.svg",
    title: "National Institute of Technology Karnataka, Surathkal",
    degree: "Bachelor of Technology",
    duration: "December 2020 - May 2024",
    content: [
      "Major: Electronics and Communication Engineering",
      "Minor: Information Technology",
    ],
    link: "https://www.nitk.ac.in/",
  },
  {
    id: "education-2",
    icon: "/assets/pba_logo.jpeg",
    title: "Polkadot Blockchain Academy",
    degree: "Distinction",
    duration: "May 2024 - June 2024",
    content: [
      "Graduated with a distinction in the fifth cohort at the National University of Singapore.",
    ],
    link: "https://polkadot.academy/",
  },
];

export type Achievement = {
  id: string;
  icon: string;
  event: string;
  position: string;
  highlight: string;
  article?: string;
  project?: string;
  youtube?: string;
  github?: string;
  rotation?: number;
};

export const achievements: Achievement[] = [
  {
    id: "a-1",
    icon: "/assets/ethindia.png",
    event: "ETHIndia'24 | India's Largest Ethereum Hackathon",
    position: "Winner",
    highlight: "Top 10 Overall Finalists — True Network's Winner, Polkadot 1st Runner Up",
    article:
      "https://www.linkedin.com/posts/mittal-parth_super-stoked-to-announce-that-our-team-emerged-activity-7274735259621961729-tkq4",
    project: "https://devfolio.co/projects/khoj-3336",
    youtube: "https://www.youtube.com/live/qJ4OCtnvjUY?si=VkcnHEdwJTEEDlMg&t=4718",
    rotation: -2.5,
  },
  {
    id: "a-2",
    icon: "/assets/ethglobal.png",
    event: "ETHIndia'22 | World's Largest Ethereum Hackathon",
    position: "Winner",
    highlight: "Top 12 Winners among 20k+ registrations — Polygon's Best Public Goods",
    article:
      "https://www.thehindu.com/news/cities/Mangalore/nitk-iiit-delhi-team-makes-it-to-top-12-winners-in-ethindia-22/article66238923.ece",
    project: "https://devfolio.co/projects/chargeswap-3527",
    youtube: "https://youtu.be/9rieTya8Yds?t=3908",
    rotation: 1.8,
  },
  {
    id: "a-3",
    icon: "/assets/polkadot.jpeg",
    event: "Polkadot Hackathon: Europe Edition",
    position: "2nd Runner Up — ink! Smart Contracts",
    highlight: "Built GreenTrust for organic farming certification via decentralized PGSs.",
    article:
      "https://www.linkedin.com/posts/mittal-parth_hackathon-winners-web3-activity-7048340759116214272-eJvo",
    github: "https://github.com/pranav2305/GreenTrust",
    rotation: -1.2,
  },
  {
    id: "a-4",
    icon: "/assets/placeholder-lightspeed.svg",
    event: "Warpspeed by Lightspeed 2023",
    position: "1st Runner Up",
    highlight: "1st Runner Up Overall among 107 hackers — AWS 1st Runner Up",
    article: "https://shorturl.at/fhjsT",
    rotation: 2.2,
  },
  {
    id: "a-5",
    icon: "/assets/placeholder-lightspeed.svg",
    event: "Warpspeed: Agentic AI Hackathon | Lightspeed India",
    position: "Runners Up — Base Track",
    highlight: "Built an ambient virtual assistant before ChatGPT Pulse.",
    project: "https://devfolio.co/projects/aeva-58d2",
    rotation: -1.8,
  },
  {
    id: "a-6",
    icon: "/assets/placeholder-pba.svg",
    event: "Kudos Carnival | Polkadot Blockchain Academy",
    position: "Runner Up",
    highlight: "Finished 2nd globally among PBA Alumni in a 6-week event.",
    article: "https://www.morekudos.com/carnival",
    rotation: 1.4,
  },
  {
    id: "a-7",
    icon: "/assets/polkadot.jpeg",
    event: "Web3 Marketing Hackathon",
    position: "Runner Up",
    highlight: "2nd in Polkadot Challenge I — Creative Marketing Strategies.",
    article: "https://x.com/polkadotsub0/status/1998425721916551355",
    project:
      "https://taikai.network/OutofOrdinary/hackathons/web3mkthack/projects/cmi0skdbk0257vu09q3n8m44u/idea",
    rotation: -2,
  },
  {
    id: "a-8",
    icon: "/assets/placeholder-ai.svg",
    event: "Global AI HackFest 2023",
    position: "Winner",
    highlight: "1st Position in the Education, Finance & Tech track by AI Planet.",
    article:
      "https://www.linkedin.com/posts/mittal-parth_happy-to-share-that-comicifyai-emerged-as-activity-7078790186435833856-88fh",
    rotation: 2.5,
  },
  {
    id: "a-9",
    icon: "/assets/placeholder-portfolio.svg",
    event: "September Hackathon by Dennis Ivy",
    position: "Winner",
    highlight: "Best portfolio website among 450+ participants globally.",
    youtube: "https://www.youtube.com/watch?v=X2473En3h_o&t=5278s",
    project: "https://parthmittal.netlify.app/",
    rotation: -1.5,
  },
  {
    id: "a-10",
    icon: "/assets/placeholder-hackathon.svg",
    event: "Manipal Hackathon'22",
    position: "Consolation Prize",
    highlight: "Top 10 among 500+ teams across India.",
    article: "https://shorturl.at/exEIQ",
    rotation: 1.6,
  },
  {
    id: "a-11",
    icon: "/assets/placeholder-hackathon.svg",
    event: "ICON Hyperbuild Hackathon",
    position: "Honorable Mention",
    highlight: "Honorable Mention among 655 participants in a 3-month online hackathon.",
    project: "https://devpost.com/software/green-trust-xj2w6g",
    rotation: -2.8,
  },
  {
    id: "a-12",
    icon: "/assets/ethglobal.png",
    event: "ETHForAll 2023",
    position: "Top 3 Superfluid Projects",
    highlight: "Bounty winners among 430 projects in ETHGlobal's largest online hackathon.",
    project: "https://devfolio.co/projects/green-trust-ed14",
    rotation: 1.2,
  },
];

export type ProjectStackItem = { name: string };

export type Project = {
  id: string;
  title: string;
  github?: string;
  link?: string;
  image?: string;
  content: string;
  stack: ProjectStackItem[];
  highlight?: string;
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Khoj",
    github: "https://github.com/mittal-parth/Khoj",
    link: "https://playkhoj.com/",
    content:
      "AI-personalised treasure hunts with on-chain rewards. Overall winning project at ETHIndia'24.",
    highlight: "Winner — ETHIndia'24",
    stack: [
      { name: "Solidity" },
      { name: "TypeScript" },
      { name: "React.js" },
      { name: "TailwindCSS" },
      { name: "Gemini" },
      { name: "Thirdweb" },
      { name: "IPFS" },
    ],
  },
  {
    id: "project-2",
    title: "Echo",
    github: "https://github.com/imApoorva36/Echo",
    link: "https://testflight.apple.com/join/TpYrhKRy",
    content:
      "A proactive AI assistant that's always listening and executes without you having to ask.",
    stack: [
      { name: "TypeScript" },
      { name: "React Native" },
      { name: "Node.js" },
      { name: "Supabase" },
      { name: "Vercel AI SDK" },
    ],
  },
  {
    id: "project-3",
    title: "Hackathon Curation AI Agent",
    github: "https://github.com/mittal-parth/hackathon-curation-agent",
    content:
      "Curates hackathons from email newsletters, evaluates them with AI, and posts the best ones to Twitter.",
    stack: [
      { name: "Python" },
      { name: "Gemini" },
      { name: "Gmail API" },
      { name: "Google Sheets API" },
      { name: "Twitter API" },
      { name: "Google Cloud Platform" },
    ],
  },
  {
    id: "project-4",
    title: "Comicify.ai",
    github: "https://github.com/ayush4345/Comicify.ai",
    link: "https://devfolio.co/projects/comicifyai-97a6",
    content:
      "Convert any academic or boring text into comic strips using GPT-3.5 and Stable Diffusion.",
    highlight: "Winner — Global AI HackFest",
    stack: [
      { name: "React" },
      { name: "TailwindCSS" },
      { name: "OpenAI" },
      { name: "Google Cloud Platform" },
      { name: "Flask" },
    ],
  },
  {
    id: "project-6",
    title: "GreenTrust",
    github: "https://github.com/mittal-parth/GreenTrust",
    link: "https://green-trust-fantom.netlify.app/",
    content:
      "Novel solution for organic farming certification via decentralized Participatory Guarantee Systems.",
    highlight: "Winner — 3 hackathons",
    stack: [
      { name: "React" },
      { name: "TailwindCSS" },
      { name: "Solidity" },
      { name: "IPFS" },
      { name: "Push Protocol" },
    ],
  },
  {
    id: "project-12",
    title: "Kosh SDK",
    github: "https://github.com/mittal-parth/kosh-sdk",
    link: "https://ethglobal.com/showcase/kosh-hk3mp",
    content:
      "Simple and secure way to interact with remote MCP Servers in Trusted Execution Environments.",
    stack: [
      { name: "TypeScript" },
      { name: "TailwindCSS" },
      { name: "Python" },
    ],
  },
];

export const navSections = [
  { id: "profile", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Wins" },
  { id: "projects", label: "Projects" },
];
