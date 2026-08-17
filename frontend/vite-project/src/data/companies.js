export const COMPANIES = [
  {
    id: "tcs",
    name: "TCS",
    fullName: "Tata Consultancy Services",
    type: "IT Services",
    color: "#0066CC",
    accent: "from-blue-600 to-blue-800",
    logo: "TCS",
    difficulty: "Medium",
    avgPackage: "₹3.5 – 7 LPA (Fresher)",
    duration: "4–6 weeks",
    overview: "TCS follows a structured campus and off-campus hiring process with aptitude, technical, and HR rounds. NQT (National Qualifier Test) is the primary entry path for freshers.",
    rounds: [
      {
        name: "TCS NQT / Online Test",
        type: "Aptitude + Coding",
        duration: "90 mins",
        topics: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Advanced Coding (2 questions)"],
        tips: "Focus on time management. Coding section has medium-level array and string problems. Practice TCS-specific aptitude patterns."
      },
      {
        name: "Technical Interview",
        type: "Technical",
        duration: "45–60 mins",
        topics: ["OOPs (Java/C++)", "DBMS & SQL", "Data Structures", "Project Discussion", "Basic OS & Networks"],
        tips: "Be thorough with your resume projects. Expect 1–2 coding questions on arrays, strings, or recursion."
      },
      {
        name: "Managerial / HR Round",
        type: "HR",
        duration: "20–30 mins",
        topics: ["Career goals", "Willingness to relocate", "Company knowledge", "Salary negotiation basics"],
        tips: "Research TCS business units. Show flexibility for any location assignment."
      }
    ],
    commonQuestions: ["Reverse a linked list", "Find duplicate in array", "Explain ACID properties", "Difference between process and thread"],
    prepTopics: ["Arrays", "Strings", "DBMS", "OOPs", "Aptitude"],
    problemIds: ["two-sum", "reverse-string", "valid-palindrome", "merge-sorted-array"]
  },
  {
    id: "cognizant",
    name: "Cognizant",
    fullName: "Cognizant Technology Solutions",
    type: "IT Services",
    color: "#1D4ED8",
    accent: "from-indigo-600 to-blue-700",
    logo: "CTS",
    difficulty: "Medium",
    avgPackage: "₹4 – 6.5 LPA (Fresher)",
    duration: "3–5 weeks",
    overview: "Cognizant (GenC profile) uses an online assessment followed by technical and HR interviews. The online test includes aptitude, communication, and coding sections.",
    rounds: [
      {
        name: "Aptitude & Communication Test",
        type: "Online Assessment",
        duration: "100 mins",
        topics: ["Quantitative", "Logical Reasoning", "Verbal / Communication", "Automata Fix (debugging)"],
        tips: "Automata Fix section tests your ability to identify and fix code bugs quickly. Practice reading C/Java snippets."
      },
      {
        name: "Technical Interview",
        type: "Technical",
        duration: "45 mins",
        topics: ["Programming fundamentals", "SQL queries", "SDLC & Agile basics", "Coding (easy-medium)"],
        tips: "Expect questions on JOIN types in SQL and basic sorting/searching algorithms."
      },
      {
        name: "HR Interview",
        type: "HR",
        duration: "15–20 mins",
        topics: ["Background verification readiness", "Shift flexibility", "Long-term commitment"],
        tips: "Cognizant values adaptability. Mention willingness to work in client-facing roles."
      }
    ],
    commonQuestions: ["SQL JOIN queries", "Bubble sort implementation", "Explain polymorphism", "Stack vs Queue"],
    prepTopics: ["SQL", "Java Basics", "Arrays", "Aptitude", "Debugging"],
    problemIds: ["two-sum", "valid-parentheses", "best-time-to-buy-sell-stock", "contains-duplicate"]
  },
  {
    id: "epam",
    name: "EPAM",
    fullName: "EPAM Systems",
    type: "Product Engineering",
    color: "#39FF14",
    accent: "from-emerald-500 to-teal-700",
    logo: "EPAM",
    difficulty: "Hard",
    avgPackage: "₹6 – 12 LPA (Fresher)",
    duration: "4–8 weeks",
    overview: "EPAM has a rigorous hiring process focused on strong coding skills and system design fundamentals. Expect LeetCode medium-level problems and deep technical discussions.",
    rounds: [
      {
        name: "Online Coding Assessment",
        type: "Coding",
        duration: "90–120 mins",
        topics: ["2–3 DSA problems (Medium)", "Time complexity analysis", "Edge case handling"],
        tips: "EPAM tests clean code and optimal solutions. Practice medium problems on arrays, trees, and dynamic programming."
      },
      {
        name: "Technical Interview 1",
        type: "Technical",
        duration: "60 mins",
        topics: ["Live coding", "Data Structures deep dive", "Language-specific concepts", "Code review of your solution"],
        tips: "Think aloud while coding. EPAM interviewers evaluate problem-solving approach, not just the final answer."
      },
      {
        name: "Technical Interview 2 / System Design",
        type: "Technical",
        duration: "45–60 mins",
        topics: ["System design basics", "API design", "Database schema design", "Scalability concepts"],
        tips: "For fresher roles, basic system design (design a URL shortener, chat app) is common."
      },
      {
        name: "HR / Culture Fit",
        type: "HR",
        duration: "30 mins",
        topics: ["English proficiency", "Team collaboration", "Learning agility"],
        tips: "EPAM works with global clients — strong communication in English is essential."
      }
    ],
    commonQuestions: ["Binary tree level-order traversal", "LRU Cache design", "Merge intervals", "Detect cycle in linked list"],
    prepTopics: ["Trees", "Graphs", "Dynamic Programming", "System Design Basics", "Medium DSA"],
    problemIds: ["binary-tree-level-order", "merge-intervals", "number-of-islands", "longest-substring-without-repeating"]
  },
  {
    id: "ltim",
    name: "LTIMindtree",
    fullName: "LTIMindtree (formerly L&T Infotech)",
    type: "IT Services",
    color: "#004B87",
    accent: "from-sky-600 to-blue-900",
    logo: "LTIM",
    difficulty: "Medium",
    avgPackage: "₹4 – 7 LPA (Fresher)",
    duration: "3–5 weeks",
    overview: "LTIMindtree conducts an online assessment with aptitude and technical sections, followed by technical and HR interviews. The process emphasizes fundamentals and logical thinking.",
    rounds: [
      {
        name: "Online Assessment",
        type: "Aptitude + Technical MCQ",
        duration: "75 mins",
        topics: ["Quantitative Aptitude", "Logical Reasoning", "Technical MCQs (CS fundamentals)", "1 Coding question"],
        tips: "Technical MCQs cover C, Java, DBMS, and OS. Revise core CS subjects before the test."
      },
      {
        name: "Technical Interview",
        type: "Technical",
        duration: "45 mins",
        topics: ["Programming (C/Java)", "DBMS & SQL", "Project walkthrough", "Puzzle or coding question"],
        tips: "Be ready to explain every line on your resume. LTIM values honest answers over bluffing."
      },
      {
        name: "HR Round",
        type: "HR",
        duration: "20 mins",
        topics: ["Location preference", "Salary expectations", "Notice period / joining date"],
        tips: "LTIM has offices across India. Flexibility on location improves your chances."
      }
    ],
    commonQuestions: ["Fibonacci series", "Palindrome check", "Normalization in DBMS", "Explain your final year project"],
    prepTopics: ["CS Fundamentals", "SQL", "Arrays", "Aptitude", "Projects"],
    problemIds: ["valid-palindrome", "fibonacci-number", "reverse-string", "climbing-stairs"]
  },
  {
    id: "infosys",
    name: "Infosys",
    fullName: "Infosys Limited",
    type: "IT Services",
    color: "#007CC3",
    accent: "from-cyan-600 to-blue-700",
    logo: "INFY",
    difficulty: "Medium",
    avgPackage: "₹3.6 – 8 LPA (Fresher)",
    duration: "4–6 weeks",
    overview: "Infosys uses the InfyTQ certification exam and HackWithInfy for top performers. Standard hiring includes online test, technical interview, and HR round.",
    rounds: [
      {
        name: "Online Test (InfyTQ / HackWithInfy)",
        type: "Aptitude + Coding",
        duration: "120 mins",
        topics: ["Quantitative", "Logical", "Verbal", "Advanced Coding (2 problems)"],
        tips: "HackWithInfy winners get direct PPI. For standard track, focus on solving at least one coding problem fully."
      },
      {
        name: "Technical Interview",
        type: "Technical",
        duration: "45–60 mins",
        topics: ["OOPs", "DBMS", "Data Structures", "Puzzle solving", "Coding"],
        tips: "Infosys often asks puzzle-based questions alongside standard DSA."
      },
      {
        name: "HR Interview",
        type: "HR",
        duration: "20 mins",
        topics: ["Infosys values & culture", "Career aspirations", "Relocation"],
        tips: "Mention interest in continuous learning — InfyTQ and internal upskilling programs are valued."
      }
    ],
    commonQuestions: ["Find missing number in array", "Explain inheritance", "SQL subqueries", "Tower of Hanoi"],
    prepTopics: ["Arrays", "OOPs", "SQL", "Puzzles", "Aptitude"],
    problemIds: ["missing-number", "two-sum", "valid-parentheses", "maximum-subarray"]
  },
  {
    id: "wipro",
    name: "Wipro",
    fullName: "Wipro Limited",
    type: "IT Services",
    color: "#341C53",
    accent: "from-purple-700 to-indigo-800",
    logo: "WIPRO",
    difficulty: "Easy–Medium",
    avgPackage: "₹3.5 – 6 LPA (Fresher)",
    duration: "3–4 weeks",
    overview: "Wipro's Elite NLT program and standard hiring include an online assessment, technical interview, and HR round. The coding section is generally easier compared to product companies.",
    rounds: [
      {
        name: "Elite NLT / Online Test",
        type: "Aptitude + Coding",
        duration: "90 mins",
        topics: ["Quantitative", "Logical", "Verbal", "Coding (1–2 easy problems)"],
        tips: "Elite NLT offers higher packages. Standard track has easier coding questions — focus on accuracy over speed."
      },
      {
        name: "Technical Interview",
        type: "Technical",
        duration: "30–45 mins",
        topics: ["C/Java basics", "DBMS", "Project discussion", "Simple coding"],
        tips: "Wipro technical rounds are often shorter. Prepare concise answers for fundamental concepts."
      },
      {
        name: "HR Interview",
        type: "HR",
        duration: "15–20 mins",
        topics: ["Background check", "Joining timeline", "General fit"],
        tips: "Be clear about your joining date and any pending academic requirements."
      }
    ],
    commonQuestions: ["Swap two numbers without temp variable", "Prime number check", "Explain normalization", "Difference between C and C++"],
    prepTopics: ["Basics", "C/Java", "DBMS", "Aptitude", "Projects"],
    problemIds: ["reverse-string", "valid-palindrome", "contains-duplicate", "best-time-to-buy-sell-stock"]
  },
  {
    id: "accenture",
    name: "Accenture",
    fullName: "Accenture plc",
    type: "Consulting & IT",
    color: "#A100FF",
    accent: "from-violet-600 to-purple-800",
    logo: "ACN",
    difficulty: "Medium",
    avgPackage: "₹4.5 – 8 LPA (Fresher)",
    duration: "3–5 weeks",
    overview: "Accenture's hiring includes an online assessment (Cognitive + Technical + Coding), followed by technical and HR interviews. Communication skills are heavily weighted.",
    rounds: [
      {
        name: "Cognitive & Technical Assessment",
        type: "Online Assessment",
        duration: "90 mins",
        topics: ["Cognitive Ability", "Technical MCQs", "Coding (1–2 problems)", "Communication evaluation"],
        tips: "Accenture's cognitive section includes pattern recognition and abstract reasoning. Practice inductive logic puzzles."
      },
      {
        name: "Technical Interview",
        type: "Technical",
        duration: "45 mins",
        topics: ["Programming concepts", "Cloud basics (AWS/Azure awareness)", "SQL", "Coding"],
        tips: "Even for fresher roles, basic cloud awareness (IaaS, PaaS, SaaS) is a plus at Accenture."
      },
      {
        name: "HR Interview",
        type: "HR",
        duration: "20–30 mins",
        topics: ["Communication skills", "Teamwork examples", "Career goals", "Accenture values"],
        tips: "Prepare STAR format answers for behavioral questions. Accenture values diversity and inclusion."
      }
    ],
    commonQuestions: ["Array rotation", "Explain REST API", "SQL GROUP BY", "Agile vs Waterfall"],
    prepTopics: ["DSA Basics", "SQL", "Cloud Awareness", "Communication", "Aptitude"],
    problemIds: ["rotate-array", "two-sum", "valid-parentheses", "merge-sorted-array"]
  },
  {
    id: "hcl",
    name: "HCLTech",
    fullName: "HCL Technologies",
    type: "IT Services",
    color: "#0072CE",
    accent: "from-blue-500 to-blue-800",
    logo: "HCL",
    difficulty: "Easy–Medium",
    avgPackage: "₹3.5 – 6 LPA (Fresher)",
    duration: "2–4 weeks",
    overview: "HCLTech conducts an online test with aptitude and technical sections, followed by a technical interview and HR round. The process is relatively straightforward for mass hiring.",
    rounds: [
      {
        name: "Online Test",
        type: "Aptitude + Technical",
        duration: "60 mins",
        topics: ["Quantitative", "Reasoning", "Technical MCQs", "1 Coding question"],
        tips: "HCL's coding question is usually easy-level. Don't spend too much time on aptitude — manage time wisely."
      },
      {
        name: "Technical Interview",
        type: "Technical",
        duration: "30–45 mins",
        topics: ["Programming basics", "DBMS", "Networks basics", "Project discussion"],
        tips: "HCL interviewers often focus on what you studied in college. Revise your core subjects."
      },
      {
        name: "HR Round",
        type: "HR",
        duration: "15 mins",
        topics: ["Salary discussion", "Location", "Joining date"],
        tips: "HCL mass hiring moves fast. Keep your documents ready for quick onboarding."
      }
    ],
    commonQuestions: ["Factorial program", "String reversal", "Types of joins in SQL", "OSI model layers"],
    prepTopics: ["Basics", "DBMS", "Networks", "Aptitude", "Projects"],
    problemIds: ["reverse-string", "fibonacci-number", "valid-palindrome", "contains-duplicate"]
  }
];

export function getCompanyById(id) {
  return COMPANIES.find((c) => c.id === id);
}
