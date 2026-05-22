// ============================================================================
//  PORTFOLIO CONTENT — edit this file to update the site.
//  Everything that changes over time (experiences, education, projects,
//  technologies, accomplishments, social links) lives here.
// ============================================================================
import avatarUrl from "/images/photo.png";

export const profile = {
  name: "Bacem Jaza",
  role: "Web Developer & CS Student",
  tagline: "Welcome to my digital home!",
  intro:
    "This is where my passions and talents converge. I'm excited to give you a glimpse into my creative world.",
  status:
    "🎓 Officially graduated! Ready for a new adventure and whatever's next ✨",
  resumeUrl: "/resume.pdf",
  email: "bacemjaza7@gmail.com",
  avatarInitials: "BJ",
  avatarUrl: avatarUrl,
};

export const socials = [
  { label: "GitHub", href: "https://github.com/BacemJaza", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jaza-bacem/", icon: "linkedin" },
  { label: "Email", href: "mailto:bacemjaza7@gmail.com", icon: "mail" },
] as const;

export const navLinks = [
  { label: "My Space", href: "#myspace" },
  { label: "About", href: "#about" },
  { label: "Technologies", href: "#technologies" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Accomplishments", href: "#accomplishments" },
] as const;

export const about = {
  heading: "About Me",
  bio: "Unlocking skills and passions beyond the code.",
  highlights: [
    {
      title: "Software Engineer",
      description: "Experienced in building full-stack web applications with a focus on clean code and user-centric design.",
      icon: "code",
    },
    {
      title: "Video Editor",
      description: "Passionate about creating compelling visual narratives through editing and post-production.",
      icon: "editor",
    },
  ],
};

export const education = [
  {
    school: "ESPRIT",
    degree: "Software Architectural Engineering (SAE)",
    period: "2023 — 2025",
    certificate:"/attestations/attestation-ESPRIT.pdf",
    description: "As we conclude our extensive academic journey at ESPRIT School, we reflect upon the profound experiences gained throughout this formidable educational odyssey. Within this comprehensive program, our focus on computer science has been unwavering, honing our expertise by integrating pre-existing knowledge with collaborative team projects. The invaluable guidance provided by our exceptionally skilled supervisors has been instrumental in shaping our academic trajectory.",
    url: "https://esprit.tn/",
  },
  {
    school: "ISIMM",
    degree: "Software Engineering",
    period: "2019 — 2023",
    certificate:"/attestations/attestation-ISIMM.pdf",
    description: "Upon graduating from high school, my discerning choice led me to ISIMM—an institution that has proven to be an indelible cornerstone in my educational journey. From the onset, my decision to enroll at ISIMM has been a source of unwavering satisfaction, as it opened the doors to an expansive realm of computer science. Within the hallowed halls of ISIMM, I delved into a comprehensive curriculum that not only acquainted me with the intricacies of hardware and software utilities but also provided a platform for immersive learning. The educational landscape here has been transformative, facilitating a deep dive into the dynamic world of computer science, where theoretical knowledge seamlessly integrates with hands-on practical experience.",
    url: "https://isimm.rnu.tn/public/",
  }
];

export const experiences = [
  {
    company: "MAON GmbH",
    role: "Software Engineer Intern",
    stack: "MongoDB · Express.js · React · Node.js",
    period: "2025",
    location: "Germany",
    logoUrl: "/maon_logo.jpg",
    pdf:"/Rapport_stage_MAON.pdf",
    vidSrc:"",
    certificate:"/attestations/attestation_stage_Bacem_Jaza.pdf",
    description:
      "As part of my 6-month end-of-studies internship, I worked on full-stack development using the MEAN stack (MongoDB, Express.js, React, Node.js), contributing to both front-end and back-end features. I also helped integrate CI/CD pipelines with GitLab and supported Kubernetes deployments to ensure scalable and reliable application delivery. Throughout the internship, I collaborated closely with the development team through code reviews, user flow testing, and updating technical documentation.",
  },
  {
    company: "Sicilia Mia",
    role: "Software Engineer Intern (Remote)",
    stack: "React · JavaScript · HTML · CSS",
    period: "2024 - 2025",
    location: "Italy",
    logoUrl: "/images/siciliamia.png",
    pdf:"",
    vidSrc:"",
    certificate:"/attestations/sicilia-mia-certificate.pdf",
    description:
      "I had the incredible opportunity to work remotely for 30 hours a week on several React components as part of a group project. It was an exciting journey that strengthened my coding skills and fueled my growth through collaboration, vibrant discussions, and problem-solving. I’m eager to carry this momentum into new challenges ahead!",
  },
  {
    company: "3D WAVE",
    role: "Software Engineer Intern",
    stack: "MongoDB · Express.js · React · Node.js",
    period: "2023",
    location: "Tunisia",
    logoUrl: "/images/3dwave.png",
    pdf:"/documents/Rapport_stage_3DWAVE.pdf",
    certificate:"/attestations/attestation-3dwave.pdf",
    vidSrc:"https://www.youtube.com/watch?v=k_Wb5dQ0s1o",
    description:
      "I developed a MERN stack application featuring a user dashboard for registering and showcasing battery passports, with additional security measures implemented to enhance platform safety. Throughout the project, I ensured that the scrum team's efficiency was maintained, meeting deadlines and rigorously testing functionalities.",
  },
  {
    company: "Docstream Solutions",
    role: "JavaScript Developer Intern",
    stack: "JavaScript · HTML · CSS",
    period: "2022",
    location: "Tunisia",
    logoUrl: "/images/docstreamsolutions_logo.jpg",
    pdf:"",
    certificate:"/attestations/AttestationStage-docstream.pdf",
    vidSrc:"https://www.youtube.com/watch?v=HCsihl7BsdQ",
    description:
      "During my internship at Docstream Solutions, I developed two JavaScript plugins to enhance UI/UX and document management within web applications. The first project focused on a calendar system with organized data display and CRUD functionalities, while the second involved creating a PDF Viewer plugin with features such as zooming, cropping, and digital signing. These projects strengthened my skills in JavaScript development, plugin integration, and user-centered design.",
  },
];

export const projects = [
  {
    title: "Internship Management Site",
    description: "I developed an internship management system to streamline processes for students and companies, implementing features using Angular, Spring Boot, Python, and Flask. This system significantly improved efficiency in internship application and documentation processes.",
    tags: ['AngularJS', 'SpringBoot', 'Tailwind CSS','Data Mining','Flask'],
    href: "#",
    repo: "#",
    vidSrc: "https://www.youtube.com/watch?v=N8V8cENDSY4",
    pdf:"/documents/internship-application-report.pdf"  },
  {
    title: "E-commerce platform",
    description: "This Flutter-based mobile application was developed as part of a school project. It enables users to navigate through various products and make purchases. Working on this project introduced me to the capabilities of this exceptional framework and helped me appreciate its simplicity and structured approach.",
    tags: ["Flutter","Widgets","Tailwind"],
    href: "#",
    repo: "#",
    vidSrc:"",
    pdf:""
  },
  {
    title: "Maven project",
    description: "This maven project was created for a school assignment. The accompanying file provides detailed insights into the algorithm's process and the aspects it tests, so I encourage you to review it.",
    tags: ['Maven','JUNIT','Java'],
    href: "#",
    repo: "#",
    vidSrc:"",
    pdf:"/documents/mavenproject.pdf"
  },
  {
    title: "Traffic run game",
    description: "A little dive into ThreeJS world and exploring game development with this simple application. This entertaining game challenges players to avoid colliding with other cars in order to progress. Try to play the game and enjoy.",
    tags: ['Three.js','Javascript','CSS'],
    href: "https://traffic-run-game-365j3rqr2-bacemjazas-projects.vercel.app",
    repo: "https://github.com/BacemJaza/traffic-run-game",
    vidSrc:"",
    pdf:""
  },
  {
    title: "MyNotes",
    description: "This project marked my initial foray into creating a notes application, driven by my desire to explore and master ReactJs. The app was designed with CRUD functionalities specifically tailored for managing notes, allowing users to showcase and edit them as needed.",
    tags: ['ReactJs','JSON server'],
    href: "#",
    repo: "https://github.com/BacemJaza/My-Notes",
    vidSrc:"https://www.youtube.com/watch?v=3ZCaScGlryM&ab_channel=JazaBacem",
    pdf:""
  },
];

export const technologies = [
  { name: "TypeScript", category: "Language", icon: "SiTypescript" },
  { name: "JavaScript", category: "Language", icon: "SiJavascript" },
  { name: "Python", category: "Language", icon: "SiPython" },
  { name: "React", category: "Frontend", icon: "SiReact" },
  { name: "Next.js", category: "Frontend", icon: "SiNextdotjs" },
  { name: "Angular", category: "Frontend", icon: "SiAngular" },
  { name: "Tailwind CSS", category: "Frontend", icon: "SiTailwindcss" },
  { name: "Node.js", category: "Backend", icon: "SiNodedotjs" },
  { name: "Express.js", category: "Backend", icon: "SiExpress" },
  { name: "Spring Boot", category: "Backend", icon: "SiSpringboot" },
  { name: "Flask", category: "Backend", icon: "SiFlask" },
  { name: "MongoDB", category: "Database", icon: "SiMongodb" },
  { name: "PostgreSQL", category: "Database", icon: "SiPostgresql" },
  { name: "Docker", category: "DevOps", icon: "SiDocker" },
  { name: "Kubernetes", category: "DevOps", icon: "SiKubernetes" },
  { name: "GitHub Actions", category: "CI/CD", icon: "SiGithubactions" },
  { name: "Git", category: "Tools", icon: "SiGit" },
  { name: "Figma", category: "Design", icon: "SiFigma" },
  { name: "REST APIs", category: "Architecture", icon: "SiPostman" },
];

export const accomplishments = [
  {
    title: "Internship in Berlin",
    issuer: "MAON GmbH",
    date: "2026",
    description: "My internship at MAON GmbH in Berlin was an important experience in my professional and personal growth. I worked in an international environment on innovative software solutions related to the energy sector, which helped me strengthen my technical and teamwork skills. On a personal level, this internship was a major achievement because it gave me the opportunity to move from Tunisia to Germany and prove my ability to adapt, work independently, and succeed in an international professional environment.",
    imageUrl: "/images/maon.jpg",
  },
  {
    title: "Participation in IEEE TSYP 2021",
    issuer: "IEEE Tunisia Student Branch",
    date: "2021",
    description: "Participating in IEEE and joining TSYP 2021 was a dynamic experience filled with conferences, workshops, and ample networking opportunities. The diverse sessions allowed for in-depth learning and collaboration, while the social activities and entertainment provided moments of relaxation and amusement. The event successfully blended professional development with personal connections, making it a valuable and enjoyable experience.",
    imageUrl: "/images/ieee.png",
  },
  {
    title: "Hult Prize 2020 — 2nd Runner-Up",
    issuer: "Tunisia",
    date: "2020",
    description: "In the Hult Prize 2020 competition, our team of four dedicated individuals passionately addressed the global challenge of food insecurity. Focusing on a sustainable and community-driven solution, we proposed the creation of an innovative application. The app aimed to connect students with local housewives who would prepare nutritious, well-balanced meals. The unique aspect of our concept was that these housewives would not only contribute to combating food insecurity but also earn a fair income for their culinary skills.Our team worked diligently to develop a comprehensive business plan and prototype for the application, emphasizing the social impact it could have on both students and the community. Through careful consideration of economic, cultural, and logistical factors, we crafted a solution that not only provided students with convenient access to wholesome meals but also empowered local women economically.Our efforts and commitment were recognized by the Hult Prize 2020 judges, resulting in our team securing the second runner-up position in the competition.",
    imageUrl: "/images/hultPrize.jpg",
  },
  {
    title: "Program Planner and active member of APEK",
    issuer: "Tunisia",
    date: "2016 - 2019",
    description: "Over three years with APEK, I contributed to environmental initiatives by managing challenges related to finance, networking, and logistics. In 2017, I served as program planner for a conference on Tunisia’s environmental future and 2030 challenges, collaborating with experts to organize impactful discussions and raise awareness about sustainable solutions.",
    imageUrl: "/images/apek.jpg",
  },
];

export const mySpace = {
  heading: "MySpace",
  description:
    "A few things I love outside of code — replace this with hobbies, interests, or a personal note.",
  items: ["Reading", "Travel", "Coffee", "Music", "Open Source"],
};
