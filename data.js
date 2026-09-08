/**
 * SIH 2026 INTERNAL HACKATHON PORTAL - Data Repository
 * Co-Branded with AJK College of Arts & Science & AIIF (AJK Innovation Incubator Foundation)
 * Theme: "Observe. Analyze. Innovate." - SIH Problem Statement & Solution Collector
 */

// OPTIONAL: Paste your deployed Google Apps Script Web App URL below for 100% automated background email sending & Google Sheet logging
window.GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbze3jE57qbhsPn00LHlPpgvt7GCKDlyw5dg-b5cFwZ9EmuyETeqDDodu90lwJJMQDYjwQ/exec";

const INITIAL_DATA = {
  branding: {
    portalTitle: "SIH 2026 INTERNAL HACKATHON",
    collegeName: "AJK College of Arts & Science",
    incubationCenter: "AIIF (AJK Innovation Incubator Foundation)",
    tagline: "WORLD'S 1ST ETHNIC INCUBATOR",
    recognition: "Recognized by StartupTN Under SIGrant",
    theme: "Observe. Analyze. Innovate.",
    academicYear: "2026 - 2027",
    primaryColor: "#00a859",
    secondaryColor: "#1e3a8a",
    venue: "AJK College Campus",
    dates: "Registration Deadline: Sep 5, 2026 | Internal Pitching & Shortlisting: Sep 9, 2026",
    targetShortlist: 50,
    minTeamsPerDept: 2
  },

  // 23 Official Departments / Courses at AJK College of Arts & Science
  departments: [
    { id: 1, name: "B.Sc Artificial Intelligence & Machine Learning", code: "B.Sc AI & ML", target: 2 },
    { id: 2, name: "B.Sc Digital & Cyber Forensic Science", code: "B.Sc Cyber Forensic", target: 2 },
    { id: 3, name: "B.Sc Computer Science with Data Analytics", code: "B.Sc CS DA", target: 2 },
    { id: 4, name: "BCA", code: "BCA", target: 2 },
    { id: 5, name: "BCA Artificial Intelligence", code: "BCA AI", target: 2 },
    { id: 6, name: "BCA Augmented Reality & Virtual Reality", code: "BCA AR & VR", target: 2 },
    { id: 7, name: "B.Sc Computer Science", code: "B.Sc CS", target: 2 },
    { id: 8, name: "B.Sc Biotechnology", code: "B.Sc Biotech", target: 2 },
    { id: 9, name: "B.Sc Forensic Science", code: "B.Sc Forensic", target: 2 },
    { id: 10, name: "B.COM CA", code: "B.Com CA", target: 2 },
    { id: 11, name: "BBA CA", code: "BBA CA", target: 2 },
    { id: 12, name: "BBA Aviation Management", code: "BBA Aviation", target: 2 },
    { id: 13, name: "BBA Logistics & Supply Chain Management", code: "BBA Logistics", target: 2 },
    { id: 14, name: "B.Sc Catering Science & Hotel Management", code: "B.Sc CSHM", target: 2 },
    { id: 15, name: "B.Sc Costume Design & Fashion", code: "B.Sc CDF", target: 2 },
    { id: 16, name: "B.Sc Visual Communication & Electronics Media", code: "B.Sc Viscom", target: 2 },
    { id: 17, name: "BCA Cybersecurity with Data Science", code: "BCA Cyber & DS", target: 2 },
    { id: 18, name: "BBA Logistics with Finance", code: "BBA Finance", target: 2 },
    { id: 19, name: "BBA Aviation with Hospitality Management", code: "BBA Hospitality", target: 2 },
    { id: 20, name: "M.Sc Cyber Security", code: "M.Sc Cyber Security", target: 2 },
    { id: 21, name: "M.Sc Computer Science", code: "M.Sc CS", target: 2 },
    { id: 22, name: "M.Com", code: "M.Com", target: 2 },
    { id: 23, name: "MBA", code: "MBA", target: 2 }
  ],

  sdgs: [
    { id: 1, title: "No Poverty", color: "#E5243B", icon: "🤝", desc: "End poverty in all its forms everywhere." },
    { id: 2, title: "Zero Hunger", color: "#DDA63A", icon: "🌾", desc: "End hunger, achieve food security and improved nutrition." },
    { id: 3, title: "Good Health & Well-Being", color: "#4C9F38", icon: "🩺", desc: "Ensure healthy lives and promote well-being for all." },
    { id: 4, title: "Quality Education", color: "#C5192D", icon: "🎓", desc: "Ensure inclusive and equitable quality education." },
    { id: 5, title: "Gender Equality", color: "#FF3A21", icon: "⚖️", desc: "Achieve gender equality and empower all women and girls." },
    { id: 6, title: "Clean Water & Sanitation", color: "#26BDE2", icon: "💧", desc: "Ensure availability and sustainable management of water." },
    { id: 7, title: "Affordable & Clean Energy", color: "#FCC30B", icon: "⚡", desc: "Ensure access to affordable, reliable, sustainable energy." },
    { id: 8, title: "Decent Work & Economic Growth", color: "#A21942", icon: "📈", desc: "Promote sustained, inclusive and sustainable economic growth." },
    { id: 9, title: "Industry, Innovation & Infrastructure", color: "#FD6925", icon: "🏗️", desc: "Build resilient infrastructure, foster innovation." },
    { id: 10, title: "Reduced Inequalities", color: "#DD1367", icon: "🌐", desc: "Reduce inequality within and among countries." },
    { id: 11, title: "Sustainable Cities & Communities", color: "#FD9D24", icon: "🏙️", desc: "Make cities inclusive, safe, resilient and sustainable." },
    { id: 12, title: "Responsible Consumption & Production", color: "#BF8B2E", icon: "♻️", desc: "Ensure sustainable consumption and production patterns." },
    { id: 13, title: "Climate Action", color: "#3F7E44", icon: "🌍", desc: "Take urgent action to combat climate change and its impacts." },
    { id: 14, title: "Life Below Water", color: "#0A97D9", icon: "🌊", desc: "Conserve and sustainably use oceans, seas and marine resources." },
    { id: 15, title: "Life on Land", color: "#56C02B", icon: "🌱", desc: "Protect, restore and promote sustainable use of terrestrial ecosystems." },
    { id: 16, title: "Peace, Justice & Strong Institutions", color: "#00689D", icon: "🕊️", desc: "Promote peaceful and inclusive societies for sustainable development." },
    { id: 17, title: "Partnerships for the Goals", color: "#19486A", icon: "🤝", desc: "Strengthen the means of implementation and revitalize global partnership." }
  ],

  mentors: [],

  // OFFICIAL SIH 2026 PROBLEM STATEMENTS (Exact SIH Portal Table Format: SIH26001, SIH26002, etc.)
  problemStatements: [
    {
      sNo: 1,
      id: "SIH26001",
      title: "AI-Based early warning and landslide Risk Monitoring System in NER",
      category: "Software",
      organization: "Ministry of Development of North Eastern Region (MDoNER)",
      theme: "Disaster Management",
      deadline: "20 September 2026",
      submittedCount: "0/500",
      description: "Deployment of AI/ML predictive risk monitoring for landslide-prone terrains in North Eastern Region with LoRa telemetry and real-time community alerts.",
      techStack: ["Python ML", "GIS Telemetry", "LoRaWAN", "FastAPI"]
    },
    {
      sNo: 2,
      id: "SIH26002",
      title: "AI-Based Smart Logistics and Accessibility Intelligence Platform for North Eastern Region (NER)",
      category: "Software",
      organization: "Ministry of Development of North Eastern Region (MDoNER)",
      theme: "Smart Automation",
      deadline: "20 September 2026",
      submittedCount: "0/500",
      description: "Route optimization, terrain accessibility prediction, and supply chain tracking for hill logistics.",
      techStack: ["React Native", "Python", "Google Maps API", "PostgreSQL"]
    },
    {
      sNo: 3,
      id: "SIH26003",
      title: "AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region (NER)",
      category: "Software",
      organization: "Ministry of Development of North Eastern Region (MDoNER)",
      theme: "Space Technology",
      deadline: "20 September 2026",
      submittedCount: "0/500",
      description: "Adaptive cognitive training exercises, voice memory prompts, and remote caregiver telemetry for dementia care.",
      techStack: ["Flutter", "TensorFlow Lite", "WebRTC", "Node.js"]
    },
    {
      sNo: 4,
      id: "SIH26004",
      title: "AI-Assisted Early Detection System for Osteoarthritis (OA) Risk Markers in North Eastern Region (NER)",
      category: "Hardware",
      organization: "Ministry of Development of North Eastern Region (MDoNER)",
      theme: "Space Technology",
      deadline: "20 September 2026",
      submittedCount: "0/500",
      description: "Wearable acoustic/gait sensor array detecting early biomechanical OA risk markers with edge ML.",
      techStack: ["ESP32 / Wearable Sensors", "Edge Impulse ML", "Bluetooth LE"]
    },
    {
      sNo: 5,
      id: "SIH26005",
      title: "Solar-Powered Smart Mini Cold Storage System for Fresh Vegetables in North Eastern Region (NER)",
      category: "Hardware",
      organization: "Ministry of Development of North Eastern Region (MDoNER)",
      theme: "Smart Vehicles",
      deadline: "20 September 2026",
      submittedCount: "0/500",
      description: "Off-grid solar Peltier cold storage box for small farmers with IoT temperature and humidity telemetry.",
      techStack: ["Peltier Cooling", "Arduino Mega", "Solar Rig", "GSM Telemetry"]
    },
    {
      sNo: 6,
      id: "SIH26006",
      title: "Smart Counterfeit Drug Identification & Blockchain Supply Chain Verification",
      category: "Software",
      organization: "Ministry of Health & Family Welfare",
      theme: "MedTech & Healthcare",
      deadline: "20 September 2026",
      submittedCount: "0/500",
      description: "Mobile scanning portal allowing citizens to scan pharmaceutical QR codes linked to an immutable blockchain ledger verifying manufacturer batch authenticity.",
      techStack: ["Solidity", "Ethereum", "React Native", "Node.js"]
    },
    {
      sNo: 7,
      id: "SIH26007",
      title: "AI Powered Dynamic Traffic Signal Control & Emergency Vehicle Routing",
      category: "Software",
      organization: "Ministry of Road Transport & Highways",
      theme: "Smart Automation",
      deadline: "20 September 2026",
      submittedCount: "0/500",
      description: "Real-time intersection computer vision feed estimating vehicle queue density and dynamically clearing emergency vehicles.",
      techStack: ["Python", "YOLOv8", "OpenCV", "MQTT"]
    },
    {
      sNo: 8,
      id: "SIH26008",
      title: "Automated Dry/Wet Segregation & Smart Bin Telemetry Upgrade Kit",
      category: "Hardware",
      organization: "Ministry of Housing and Urban Affairs",
      theme: "Environment & Waste Mgmt",
      deadline: "20 September 2026",
      submittedCount: "0/500",
      description: "Smart bin upgrade kit using optical/capacitive sensors to automatically route dry vs wet garbage and send GSM fill alerts.",
      techStack: ["Arduino Mega", "Optical Sensors", "GSM Module", "Servo"]
    },
    {
      sNo: 9,
      id: "SIH26009",
      title: "Smart IoT Water Quality Monitoring Sensor Node for Rural Lakes",
      category: "Hardware",
      organization: "Ministry of Jal Shakti",
      theme: "Clean Water & Sanitation",
      deadline: "20 September 2026",
      submittedCount: "0/500",
      description: "Submersible buoy node monitoring pH, TDS, and turbidity pushing telemetry alerts to local Panchayats when water safety thresholds cross.",
      techStack: ["ESP32", "pH & TDS Sensors", "Solar Buoy", "LoRaWAN"]
    },
    {
      sNo: 10,
      id: "SIH26010",
      title: "Voice & Multilingual Legal Document Simplifier for Citizens",
      category: "Software",
      organization: "Ministry of Law and Justice",
      theme: "Governance & Inclusion",
      deadline: "20 September 2026",
      submittedCount: "0/500",
      description: "AI voice translation portal simplifying complex legal land and welfare notices into vernacular Tamil, Hindi, and English.",
      techStack: ["Python", "Whisper Speech API", "LangChain", "React"]
    }
  ],

  // Clean empty array for student submissions
  teams: [
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA Artificial Intelligence",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 1,
    "id": "SIH-TEAM-01",
    "name": "Neural Ninjas",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "10.30 - 11.15am",
    "mentorName": "Mr. V. Muthusaravanan",
    "problemStatementId": "SIH26012",
    "psTitle1": "Problem Statement SIH26012",
    "members": [
      {
        "name": "SREYAS KALLAZHI",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA Artificial Intelligence"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA Artificial Intelligence",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 2,
    "id": "SIH-TEAM-02",
    "name": "Byte Brains",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "10.30 - 11.15am",
    "mentorName": "Mrs. K. Shiny",
    "problemStatementId": "SIH26028",
    "psTitle1": "Problem Statement SIH26028",
    "members": [
      {
        "name": "SRUTHI B",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA Artificial Intelligence"
      }
    ]
  },
  {
    "sno": 62,
    "team_id": "SIH-TEAM-62-A",
    "team_name": "ThreatmailX (Idea 1)",
    "leader_name": "A.FATHIMA RIZWANA",
    "mentor_name": "KISHORE K",
    "department": "M.Sc Cyber Security",
    "email": "afathimarizwana2026@ajkcas.com",
    "roll": "5738",
    "category": "Software",
    "ps": "[SIH26106] AI-Powered Email Threat Detection, GeoLocation & Forensic Intelligence Platform",
    "teamNumber": 3,
    "id": "SIH-TEAM-03",
    "name": "ThreatmailX (Idea 1)",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "10.30 - 11.15am",
    "mentorName": "KISHORE K",
    "problemStatementId": "SIH26106",
    "psTitle1": "Problem Statement SIH26106",
    "members": [
      {
        "name": "A.FATHIMA RIZWANA",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "M.Sc Cyber Security"
      }
    ]
  },
  {
    "sno": 62,
    "team_id": "SIH-TEAM-62-A",
    "team_name": "ThreatmailX (Idea 1)",
    "leader_name": "A.FATHIMA RIZWANA",
    "mentor_name": "KISHORE K",
    "department": "M.Sc Cyber Security",
    "email": "afathimarizwana2026@ajkcas.com",
    "roll": "5738",
    "category": "Software",
    "ps": "[SIH26106] AI-Powered Email Threat Detection, GeoLocation & Forensic Intelligence Platform",
    "teamNumber": 4,
    "id": "SIH-TEAM-04",
    "name": "ThreatmailX (Idea 2)",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "10.30 - 11.15am",
    "mentorName": "KISHORE K",
    "problemStatementId": "SIH26155",
    "psTitle1": "Problem Statement SIH26155",
    "members": [
      {
        "name": "A.FATHIMA RIZWANA",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "M.Sc Cyber Security"
      }
    ]
  },
  {
    "sno": 76,
    "team_id": "SIH-TEAM-76",
    "team_name": "Pixel Pioneers",
    "leader_name": "Ayisha fasna M",
    "mentor_name": "Dr.M. Rajeshkumar",
    "department": "BCA Augmented Reality & Virtual Reality",
    "email": "ayishafasnam2425@ajkcas.com",
    "roll": "24UGAR005",
    "category": "Software",
    "ps": "[SIH26041] AR-Based Vocational Training Simulator for Industrial Safety in Jharkhand's Mining & Manufacturing Sector",
    "teamNumber": 5,
    "id": "SIH-TEAM-05",
    "name": "Pixel Pioneers (2)",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Dr. M. Rajeshkumar",
    "problemStatementId": "SIH26067",
    "psTitle1": "Problem Statement SIH26067",
    "members": [
      {
        "name": "Abhijith C",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA Augmented Reality & Virtual Reality"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 6,
    "id": "SIH-TEAM-06",
    "name": "Team flash (Idea 1)",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Moushika",
    "problemStatementId": "SIH26333",
    "psTitle1": "Problem Statement SIH26333",
    "members": [
      {
        "name": "Abhinav ks",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 7,
    "id": "SIH-TEAM-07",
    "name": "Team flash (Idea 2)",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Moushika",
    "problemStatementId": "SOLVEALLPROBLEMS",
    "psTitle1": "Problem Statement SOLVEALLPROBLEMS",
    "members": [
      {
        "name": "Abhinav ks",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 41,
    "team_id": "SIH-TEAM-37",
    "team_name": "Proton",
    "leader_name": "Abhinav s",
    "mentor_name": "Mr.S.R.DHARAN",
    "department": "B.Sc Computer Science with Data Analytics",
    "email": "abhinavs2526@ajkcas.com",
    "roll": "25UGDA003",
    "category": "Software",
    "ps": "[SIH26044] Portal for Academia - Industry collaboration for Skill Mapping, Internships and  Placement",
    "teamNumber": 8,
    "id": "SIH-TEAM-08",
    "name": "Proton",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Mr.S.R.DHARAN",
    "problemStatementId": "SIH26044",
    "psTitle1": "Problem Statement SIH26044",
    "members": [
      {
        "name": "Abhinav s",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Computer Science with Data Analytics"
      }
    ]
  },
  {
    "sno": 7,
    "team_id": "SIH-TEAM-06",
    "team_name": "Cyclone Guardians",
    "leader_name": "Arun N",
    "mentor_name": "Dr. Vineetha Vijayan",
    "department": "B.Sc Artificial Intelligence & Machine Learning",
    "email": "arunn2425@ajkcas.com",
    "roll": "24UGAI012",
    "category": "Software",
    "ps": "[26070] To develop an Artificial Intelligence (AI) / Machine Learning (ML) based system for identification, classification, and prediction of different tropical cyclone patterns using multi-source satellite data.",
    "teamNumber": 9,
    "id": "SIH-TEAM-09",
    "name": "Cascaders (Idea 1)",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Dr. Vineetha Vijayan",
    "problemStatementId": "SIH26162",
    "psTitle1": "Problem Statement SIH26162",
    "members": [
      {
        "name": "Abhishek Shaji",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Artificial Intelligence & Machine Learning"
      }
    ]
  },
  {
    "sno": 7,
    "team_id": "SIH-TEAM-06",
    "team_name": "Cyclone Guardians",
    "leader_name": "Arun N",
    "mentor_name": "Dr. Vineetha Vijayan",
    "department": "B.Sc Artificial Intelligence & Machine Learning",
    "email": "arunn2425@ajkcas.com",
    "roll": "24UGAI012",
    "category": "Software",
    "ps": "[26070] To develop an Artificial Intelligence (AI) / Machine Learning (ML) based system for identification, classification, and prediction of different tropical cyclone patterns using multi-source satellite data.",
    "teamNumber": 10,
    "id": "SIH-TEAM-10",
    "name": "Cascaders (Idea 2)",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Dr. Vineetha Vijayan",
    "problemStatementId": "SIH26101",
    "psTitle1": "Problem Statement SIH26101",
    "members": [
      {
        "name": "Abhishek Shaji",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Artificial Intelligence & Machine Learning"
      }
    ]
  },
  {
    "sno": 36,
    "team_id": "SIH-TEAM-32-B",
    "team_name": "TEAM NEXORA (Idea 2)",
    "leader_name": "S. Mithyleash",
    "mentor_name": "ASHA K",
    "department": "B.Sc Forensic Science",
    "email": "mithyleashs2425@ajkcas.com",
    "roll": "24UGFS015",
    "category": "Hardware",
    "ps": "[SIH26214] Student Innovation-Ideas that showcase the rich cultural heritage and traditions of India.",
    "teamNumber": 11,
    "id": "SIH-TEAM-11",
    "name": "Innovexa (Idea 1)",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Mr.Kathirvelan",
    "problemStatementId": "SIH26095",
    "psTitle1": "Problem Statement SIH26095",
    "members": [
      {
        "name": "Abinaya S",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Forensic Science"
      }
    ]
  },
  {
    "sno": 36,
    "team_id": "SIH-TEAM-32-B",
    "team_name": "TEAM NEXORA (Idea 2)",
    "leader_name": "S. Mithyleash",
    "mentor_name": "ASHA K",
    "department": "B.Sc Forensic Science",
    "email": "mithyleashs2425@ajkcas.com",
    "roll": "24UGFS015",
    "category": "Hardware",
    "ps": "[SIH26214] Student Innovation-Ideas that showcase the rich cultural heritage and traditions of India.",
    "teamNumber": 12,
    "id": "SIH-TEAM-12",
    "name": "Innovexa (Idea 2)",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Mr.Kathirvelan",
    "problemStatementId": "SIH26204",
    "psTitle1": "Problem Statement SIH26204",
    "members": [
      {
        "name": "Abinaya S",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Forensic Science"
      }
    ]
  },
  {
    "sno": 42,
    "team_id": "SIH-TEAM-38",
    "team_name": "ROYAL COMMERCE",
    "leader_name": "AFRA I",
    "mentor_name": "MS.KRISHNAVENI S",
    "department": "B.COM CA",
    "email": "afrai2526@ajkcas.com",
    "roll": "25UGPA001",
    "category": "Hardware",
    "ps": "[SIH26223] Student Innovation-Disaster management includes ideas related to risk mitigation, Planning and management before, after or during a disaster.",
    "teamNumber": 13,
    "id": "SIH-TEAM-13",
    "name": "ROYAL COMMERCE",
    "hall": "Hall A",
    "hallLetter": "A",
    "assignedJury": "Dr.Aneesh Kumar",
    "slot": "01.15 - 01.45pm",
    "mentorName": "MS.KRISHNAVENI S",
    "problemStatementId": "SIH26223",
    "psTitle1": "Problem Statement SIH26223",
    "members": [
      {
        "name": "AFRA I",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.COM CA"
      }
    ]
  },
  {
    "sno": 41,
    "team_id": "SIH-TEAM-37",
    "team_name": "Proton",
    "leader_name": "Abhinav s",
    "mentor_name": "Mr.S.R.DHARAN",
    "department": "B.Sc Computer Science with Data Analytics",
    "email": "abhinavs2526@ajkcas.com",
    "roll": "25UGDA003",
    "category": "Software",
    "ps": "[SIH26044] Portal for Academia - Industry collaboration for Skill Mapping, Internships and  Placement",
    "teamNumber": 14,
    "id": "SIH-TEAM-14",
    "name": "MindForge",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "10.30 - 11.15am",
    "mentorName": "Satchithanantham",
    "problemStatementId": "SIH26044",
    "psTitle1": "Problem Statement SIH26044",
    "members": [
      {
        "name": "Ahamed roshan.A",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Computer Science with Data Analytics"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 15,
    "id": "SIH-TEAM-15",
    "name": "Cyber Titans",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "10.30 - 11.15am",
    "mentorName": "Kishor R",
    "problemStatementId": "SIH26018",
    "psTitle1": "Problem Statement SIH26018",
    "members": [
      {
        "name": "Ajith Tm",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 62,
    "team_id": "SIH-TEAM-62-A",
    "team_name": "ThreatmailX (Idea 1)",
    "leader_name": "A.FATHIMA RIZWANA",
    "mentor_name": "KISHORE K",
    "department": "M.Sc Cyber Security",
    "email": "afathimarizwana2026@ajkcas.com",
    "roll": "5738",
    "category": "Software",
    "ps": "[SIH26106] AI-Powered Email Threat Detection, GeoLocation & Forensic Intelligence Platform",
    "teamNumber": 16,
    "id": "SIH-TEAM-16",
    "name": "Cyphora (Idea 1)",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "10.30 - 11.15am",
    "mentorName": "KISHORE K",
    "problemStatementId": "SIH26104",
    "psTitle1": "Problem Statement SIH26104",
    "members": [
      {
        "name": "Akshaya Rajesh",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "M.Sc Cyber Security"
      }
    ]
  },
  {
    "sno": 62,
    "team_id": "SIH-TEAM-62-A",
    "team_name": "ThreatmailX (Idea 1)",
    "leader_name": "A.FATHIMA RIZWANA",
    "mentor_name": "KISHORE K",
    "department": "M.Sc Cyber Security",
    "email": "afathimarizwana2026@ajkcas.com",
    "roll": "5738",
    "category": "Software",
    "ps": "[SIH26106] AI-Powered Email Threat Detection, GeoLocation & Forensic Intelligence Platform",
    "teamNumber": 17,
    "id": "SIH-TEAM-17",
    "name": "Cyphora (Idea 2)",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "10.30 - 11.15am",
    "mentorName": "KISHORE K",
    "problemStatementId": "SIH26188",
    "psTitle1": "Problem Statement SIH26188",
    "members": [
      {
        "name": "Akshaya Rajesh",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "M.Sc Cyber Security"
      }
    ]
  },
  {
    "sno": 62,
    "team_id": "SIH-TEAM-62-A",
    "team_name": "ThreatmailX (Idea 1)",
    "leader_name": "A.FATHIMA RIZWANA",
    "mentor_name": "KISHORE K",
    "department": "M.Sc Cyber Security",
    "email": "afathimarizwana2026@ajkcas.com",
    "roll": "5738",
    "category": "Software",
    "ps": "[SIH26106] AI-Powered Email Threat Detection, GeoLocation & Forensic Intelligence Platform",
    "teamNumber": 18,
    "id": "SIH-TEAM-18",
    "name": "Cipher Matrix (Idea 1)",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Ananthakrishnan U K",
    "problemStatementId": "SIH26190",
    "psTitle1": "Problem Statement SIH26190",
    "members": [
      {
        "name": "Amal Thomas",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "M.Sc Cyber Security"
      }
    ]
  },
  {
    "sno": 62,
    "team_id": "SIH-TEAM-62-A",
    "team_name": "ThreatmailX (Idea 1)",
    "leader_name": "A.FATHIMA RIZWANA",
    "mentor_name": "KISHORE K",
    "department": "M.Sc Cyber Security",
    "email": "afathimarizwana2026@ajkcas.com",
    "roll": "5738",
    "category": "Software",
    "ps": "[SIH26106] AI-Powered Email Threat Detection, GeoLocation & Forensic Intelligence Platform",
    "teamNumber": 19,
    "id": "SIH-TEAM-19",
    "name": "Cipher Matrix (Idea 2)",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Ananthakrishnan U K",
    "problemStatementId": "SIH26152",
    "psTitle1": "Problem Statement SIH26152",
    "members": [
      {
        "name": "Amal Thomas",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "M.Sc Cyber Security"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA Artificial Intelligence",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 20,
    "id": "SIH-TEAM-20",
    "name": "Code Catalysts",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Muthusaravanan V",
    "problemStatementId": "SIH26021",
    "psTitle1": "Problem Statement SIH26021",
    "members": [
      {
        "name": "Amrutha Manoj",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA Artificial Intelligence"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 21,
    "id": "SIH-TEAM-21",
    "name": "Hexacode (Idea 1)",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Moushika. D",
    "problemStatementId": "SIH26085",
    "psTitle1": "Problem Statement SIH26085",
    "members": [
      {
        "name": "Anusree S",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 22,
    "id": "SIH-TEAM-22",
    "name": "Hexacode (Idea 2)",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Moushika. D",
    "problemStatementId": "SIH26076",
    "psTitle1": "Problem Statement SIH26076",
    "members": [
      {
        "name": "Anusree S",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 53,
    "team_id": "SIH-TEAM-53-A",
    "team_name": "NEXUS (Idea 1)",
    "leader_name": "ARISH M",
    "mentor_name": "KISHORE K",
    "department": "B.Sc Digital & Cyber Forensic Science",
    "email": "arishm2425@ajkcas.com",
    "roll": "24UGDC002",
    "category": "Software",
    "ps": "[SIH26160] Block chain & Cyber Security",
    "teamNumber": 23,
    "id": "SIH-TEAM-23",
    "name": "NEXUS (Idea 1)",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "11.30 - 12.30pm",
    "mentorName": "KISHORE K",
    "problemStatementId": "SIH26160",
    "psTitle1": "Problem Statement SIH26160",
    "members": [
      {
        "name": "ARISH M",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Digital & Cyber Forensic Science"
      }
    ]
  },
  {
    "sno": 53,
    "team_id": "SIH-TEAM-53-A",
    "team_name": "NEXUS (Idea 1)",
    "leader_name": "ARISH M",
    "mentor_name": "KISHORE K",
    "department": "B.Sc Digital & Cyber Forensic Science",
    "email": "arishm2425@ajkcas.com",
    "roll": "24UGDC002",
    "category": "Software",
    "ps": "[SIH26160] Block chain & Cyber Security",
    "teamNumber": 24,
    "id": "SIH-TEAM-24",
    "name": "NEXUS (Idea 2)",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "01.15 - 01.45pm",
    "mentorName": "KISHORE K",
    "problemStatementId": "SIH26149",
    "psTitle1": "Problem Statement SIH26149",
    "members": [
      {
        "name": "ARISH M",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Digital & Cyber Forensic Science"
      }
    ]
  },
  {
    "sno": 7,
    "team_id": "SIH-TEAM-06",
    "team_name": "Cyclone Guardians",
    "leader_name": "Arun N",
    "mentor_name": "Dr. Vineetha Vijayan",
    "department": "B.Sc Artificial Intelligence & Machine Learning",
    "email": "arunn2425@ajkcas.com",
    "roll": "24UGAI012",
    "category": "Software",
    "ps": "[26070] To develop an Artificial Intelligence (AI) / Machine Learning (ML) based system for identification, classification, and prediction of different tropical cyclone patterns using multi-source satellite data.",
    "teamNumber": 25,
    "id": "SIH-TEAM-25",
    "name": "Cyclone Guardians",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Dr. Vineetha Vijayan",
    "problemStatementId": "SIH26070",
    "psTitle1": "Problem Statement SIH26070",
    "members": [
      {
        "name": "Arun N",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Artificial Intelligence & Machine Learning"
      }
    ]
  },
  {
    "sno": 7,
    "team_id": "SIH-TEAM-06",
    "team_name": "Cyclone Guardians",
    "leader_name": "Arun N",
    "mentor_name": "Dr. Vineetha Vijayan",
    "department": "B.Sc Artificial Intelligence & Machine Learning",
    "email": "arunn2425@ajkcas.com",
    "roll": "24UGAI012",
    "category": "Software",
    "ps": "[26070] To develop an Artificial Intelligence (AI) / Machine Learning (ML) based system for identification, classification, and prediction of different tropical cyclone patterns using multi-source satellite data.",
    "teamNumber": 26,
    "id": "SIH-TEAM-26",
    "name": "VeriFrame",
    "hall": "Hall B",
    "hallLetter": "B",
    "assignedJury": "Dr.Vineetha",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Dr.Vineethavijayan",
    "problemStatementId": "SIH26150",
    "psTitle1": "Problem Statement SIH26150",
    "members": [
      {
        "name": "Ashfaq Ashraf",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Artificial Intelligence & Machine Learning"
      }
    ]
  },
  {
    "sno": 39,
    "team_id": "SIH-TEAM-35",
    "team_name": "Survey team",
    "leader_name": "Athira.S",
    "mentor_name": "Dr mamta",
    "department": "BBA CA",
    "email": "athiras2526@ajkcas.com",
    "roll": "25UGBC019",
    "category": "Hardware",
    "ps": "[SIH26010] Survey based",
    "teamNumber": 27,
    "id": "SIH-TEAM-27",
    "name": "Survey team",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "10.30 - 11.15am",
    "mentorName": "Dr mamta",
    "problemStatementId": "SIH26010",
    "psTitle1": "Problem Statement SIH26010",
    "members": [
      {
        "name": "Athira.S",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA CA"
      }
    ]
  },
  {
    "sno": 76,
    "team_id": "SIH-TEAM-76",
    "team_name": "Pixel Pioneers",
    "leader_name": "Ayisha fasna M",
    "mentor_name": "Dr.M. Rajeshkumar",
    "department": "BCA Augmented Reality & Virtual Reality",
    "email": "ayishafasnam2425@ajkcas.com",
    "roll": "24UGAR005",
    "category": "Software",
    "ps": "[SIH26041] AR-Based Vocational Training Simulator for Industrial Safety in Jharkhand's Mining & Manufacturing Sector",
    "teamNumber": 28,
    "id": "SIH-TEAM-28",
    "name": "Pixel Pioneers",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "10.30 - 11.15am",
    "mentorName": "Dr.M. Rajeshkumar",
    "problemStatementId": "SIH26041",
    "psTitle1": "Problem Statement SIH26041",
    "members": [
      {
        "name": "Ayisha fasna M",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA Augmented Reality & Virtual Reality"
      }
    ]
  },
  {
    "sno": 71,
    "team_id": "SIH-TEAM-71",
    "team_name": "Mayhem",
    "leader_name": "Aysha parveen",
    "mentor_name": "Manobprabha",
    "department": "B.Sc Costume Design & Fashion",
    "email": "ayshaparveen2425@ajkcas.com",
    "roll": "24UGCD010",
    "category": "Hardware",
    "ps": "[26010] Survey/resurvey of rural agricultural land in India",
    "teamNumber": 29,
    "id": "SIH-TEAM-29",
    "name": "Mayhem",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "10.30 - 11.15am",
    "mentorName": "Manobprabha",
    "problemStatementId": "SIH26010",
    "psTitle1": "Problem Statement SIH26010",
    "members": [
      {
        "name": "Aysha parveen",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Costume Design & Fashion"
      }
    ]
  },
  {
    "sno": 55,
    "team_id": "SIH-TEAM-55",
    "team_name": "Viscams",
    "leader_name": "Deepak Dev S",
    "mentor_name": "Adhithiyan P",
    "department": "B.Sc Visual Communication & Electronics Media",
    "email": "deepakdevs2425@ajkcas.com",
    "roll": "24UGVC007",
    "category": "Software",
    "ps": "[SIH26089] Cooperative Gig Services Platform for Household & Community Services",
    "teamNumber": 30,
    "id": "SIH-TEAM-30",
    "name": "Viscams",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "10.30 - 11.15am",
    "mentorName": "Adhithiyan P",
    "problemStatementId": "SIH26089",
    "psTitle1": "Problem Statement SIH26089",
    "members": [
      {
        "name": "Deepak Dev S",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Visual Communication & Electronics Media"
      }
    ]
  },
  {
    "sno": 39,
    "team_id": "SIH-TEAM-35",
    "team_name": "Survey team",
    "leader_name": "Athira.S",
    "mentor_name": "Dr mamta",
    "department": "BBA CA",
    "email": "athiras2526@ajkcas.com",
    "roll": "25UGBC019",
    "category": "Hardware",
    "ps": "[SIH26010] Survey based",
    "teamNumber": 31,
    "id": "SIH-TEAM-31",
    "name": "Jumail Team",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Dr.Mamta",
    "problemStatementId": "SIH26040",
    "psTitle1": "Problem Statement SIH26040",
    "members": [
      {
        "name": "Dharshan R",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA CA"
      }
    ]
  },
  {
    "sno": 62,
    "team_id": "SIH-TEAM-62-A",
    "team_name": "ThreatmailX (Idea 1)",
    "leader_name": "A.FATHIMA RIZWANA",
    "mentor_name": "KISHORE K",
    "department": "M.Sc Cyber Security",
    "email": "afathimarizwana2026@ajkcas.com",
    "roll": "5738",
    "category": "Software",
    "ps": "[SIH26106] AI-Powered Email Threat Detection, GeoLocation & Forensic Intelligence Platform",
    "teamNumber": 32,
    "id": "SIH-TEAM-32",
    "name": "Thadam @ AJK",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Mr.Kishore",
    "problemStatementId": "SIH26184",
    "psTitle1": "Problem Statement SIH26184",
    "members": [
      {
        "name": "Divya Sri T",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "M.Sc Cyber Security"
      }
    ]
  },
  {
    "sno": 51,
    "team_id": "SIH-TEAM-51",
    "team_name": "Solar Frost",
    "leader_name": "Harisath Anandha kumar",
    "mentor_name": "Hema Priyan",
    "department": "B.Sc Catering Science & Hotel Management",
    "email": "harisathanandhakumar2526@ajkcas.com",
    "roll": "25UGHM018",
    "category": "Hardware",
    "ps": "[SIH 26005] Solar powered smart mini cold refrigerator to storege system for fresh vegetable in North eastern area",
    "teamNumber": 33,
    "id": "SIH-TEAM-33",
    "name": "Solar Frost",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Hema Priyan",
    "problemStatementId": "SIH26005",
    "psTitle1": "Problem Statement SIH26005",
    "members": [
      {
        "name": "Harisath Anandha kumar",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Catering Science & Hotel Management"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA Artificial Intelligence",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 34,
    "id": "SIH-TEAM-34",
    "name": "MindMatrix",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Mrs. K. Shiny",
    "problemStatementId": "SIH26061",
    "psTitle1": "Problem Statement SIH26061",
    "members": [
      {
        "name": "Jenisha Sen",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA Artificial Intelligence"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA Artificial Intelligence",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 35,
    "id": "SIH-TEAM-35",
    "name": "AI Pioneers",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "11.30 - 12.30pm",
    "mentorName": "K Shiny",
    "problemStatementId": "SIH26070",
    "psTitle1": "Problem Statement SIH26070",
    "members": [
      {
        "name": "Johen S John",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA Artificial Intelligence"
      }
    ]
  },
  {
    "sno": 53,
    "team_id": "SIH-TEAM-53-A",
    "team_name": "NEXUS (Idea 1)",
    "leader_name": "ARISH M",
    "mentor_name": "KISHORE K",
    "department": "B.Sc Digital & Cyber Forensic Science",
    "email": "arishm2425@ajkcas.com",
    "roll": "24UGDC002",
    "category": "Software",
    "ps": "[SIH26160] Block chain & Cyber Security",
    "teamNumber": 36,
    "id": "SIH-TEAM-36",
    "name": "Raven Grove (Idea 1)",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Kishore kannan",
    "problemStatementId": "SIH26104",
    "psTitle1": "Problem Statement SIH26104",
    "members": [
      {
        "name": "Joshika s m",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Digital & Cyber Forensic Science"
      }
    ]
  },
  {
    "sno": 53,
    "team_id": "SIH-TEAM-53-A",
    "team_name": "NEXUS (Idea 1)",
    "leader_name": "ARISH M",
    "mentor_name": "KISHORE K",
    "department": "B.Sc Digital & Cyber Forensic Science",
    "email": "arishm2425@ajkcas.com",
    "roll": "24UGDC002",
    "category": "Software",
    "ps": "[SIH26160] Block chain & Cyber Security",
    "teamNumber": 37,
    "id": "SIH-TEAM-37",
    "name": "Raven Grove (Idea 2)",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Kishore kannan",
    "problemStatementId": "SIH26188",
    "psTitle1": "Problem Statement SIH26188",
    "members": [
      {
        "name": "Joshika s m",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Digital & Cyber Forensic Science"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 38,
    "id": "SIH-TEAM-38",
    "name": "Code crew",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Mrs.Greeshma",
    "problemStatementId": "SIH26044",
    "psTitle1": "Problem Statement SIH26044",
    "members": [
      {
        "name": "K.K.Soorya",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 4,
    "team_id": "SIH-TEAM-03",
    "team_name": "TechFront",
    "leader_name": "Krishna Theertha S",
    "mentor_name": "Dr John gracias",
    "department": "B.Sc Computer Science",
    "email": "krishnatheerthas2526@ajkcas.com",
    "roll": "25UGCS018",
    "category": "Software",
    "ps": "[SIH26032] Digital Platform for Efficient Agricultural Procurement, Slot Booking and Queue Management”",
    "teamNumber": 39,
    "id": "SIH-TEAM-39",
    "name": "TechFront",
    "hall": "Hall C",
    "hallLetter": "C",
    "assignedJury": "Dr.John Grasias",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Dr John gracias",
    "problemStatementId": "SIH26032",
    "psTitle1": "Problem Statement SIH26032",
    "members": [
      {
        "name": "Krishna Theertha S",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Computer Science"
      }
    ]
  },
  {
    "sno": 22,
    "team_id": "SIH-TEAM-21",
    "team_name": "Insight squad",
    "leader_name": "Krishnapriya. K. U",
    "mentor_name": "Tarun Richard",
    "department": "MBA",
    "email": "krishnapriyakv2627@ajkcas.com",
    "roll": "5503",
    "category": "Hardware",
    "ps": "[SIH26223] Student Innovation-Disaster management includes ideas related to risk mitigation, Planning and management before, after or during a disaster.",
    "teamNumber": 40,
    "id": "SIH-TEAM-40",
    "name": "Insight squad",
    "hall": "Hall D",
    "hallLetter": "D",
    "assignedJury": "Mrs.Sariga",
    "slot": "10.30 - 11.15am",
    "mentorName": "Tarun Richard",
    "problemStatementId": "SIH26223",
    "psTitle1": "Problem Statement SIH26223",
    "members": [
      {
        "name": "Krishnapriya. K. U",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "MBA"
      }
    ]
  },
  {
    "sno": 73,
    "team_id": "SIH-TEAM-73",
    "team_name": "Cybercore",
    "leader_name": "Lifa fathima F",
    "mentor_name": "Adharsh VP",
    "department": "BCA Cybersecurity with Data Science",
    "email": "lifafathimaf2627@ajkcas.com",
    "roll": "6218",
    "category": "Software",
    "ps": "[26005] Solar powered smart mini cold storage system for fresh vegetables in North eastern region ( NER)",
    "teamNumber": 41,
    "id": "SIH-TEAM-41",
    "name": "Cybercore",
    "hall": "Hall D",
    "hallLetter": "D",
    "assignedJury": "Mrs.Sariga",
    "slot": "10.30 - 11.15am",
    "mentorName": "Adharsh VP",
    "problemStatementId": "SIH26005",
    "psTitle1": "Problem Statement SIH26005",
    "members": [
      {
        "name": "Lifa fathima F",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA Cybersecurity with Data Science"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 42,
    "id": "SIH-TEAM-42",
    "name": "KRATOS (Idea 1)",
    "hall": "Hall D",
    "hallLetter": "D",
    "assignedJury": "Mrs.Sariga",
    "slot": "10.30 - 11.15am",
    "mentorName": "SANGEETHA SR",
    "problemStatementId": "SIH26044",
    "psTitle1": "Problem Statement SIH26044",
    "members": [
      {
        "name": "MADHUMITHRA K",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 43,
    "id": "SIH-TEAM-43",
    "name": "KRATOS (Idea 2)",
    "hall": "Hall D",
    "hallLetter": "D",
    "assignedJury": "Mrs.Sariga",
    "slot": "10.30 - 11.15am",
    "mentorName": "SANGEETHA SR",
    "problemStatementId": "SIH26135",
    "psTitle1": "Problem Statement SIH26135",
    "members": [
      {
        "name": "MADHUMITHRA K",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 22,
    "team_id": "SIH-TEAM-21",
    "team_name": "Insight squad",
    "leader_name": "Krishnapriya. K. U",
    "mentor_name": "Tarun Richard",
    "department": "MBA",
    "email": "krishnapriyakv2627@ajkcas.com",
    "roll": "5503",
    "category": "Hardware",
    "ps": "[SIH26223] Student Innovation-Disaster management includes ideas related to risk mitigation, Planning and management before, after or during a disaster.",
    "teamNumber": 44,
    "id": "SIH-TEAM-44",
    "name": "Future Executives",
    "hall": "Hall D",
    "hallLetter": "D",
    "assignedJury": "Mrs.Sariga",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Mr. Tarun Richard",
    "problemStatementId": "SIH26221",
    "psTitle1": "Problem Statement SIH26221",
    "members": [
      {
        "name": "Manjima Muralidharan",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "MBA"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 45,
    "id": "SIH-TEAM-45",
    "name": "Infinity 6",
    "hall": "Hall D",
    "hallLetter": "D",
    "assignedJury": "Mrs.Sariga",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Sangeetha SR",
    "problemStatementId": "SIH26192",
    "psTitle1": "Problem Statement SIH26192",
    "members": [
      {
        "name": "Mishab M",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 22,
    "team_id": "SIH-TEAM-21",
    "team_name": "Insight squad",
    "leader_name": "Krishnapriya. K. U",
    "mentor_name": "Tarun Richard",
    "department": "MBA",
    "email": "krishnapriyakv2627@ajkcas.com",
    "roll": "5503",
    "category": "Hardware",
    "ps": "[SIH26223] Student Innovation-Disaster management includes ideas related to risk mitigation, Planning and management before, after or during a disaster.",
    "teamNumber": 46,
    "id": "SIH-TEAM-46",
    "name": "IdeaHub (Idea 1)",
    "hall": "Hall D",
    "hallLetter": "D",
    "assignedJury": "Mrs.Sariga",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Tarun",
    "problemStatementId": "SIH26225",
    "psTitle1": "Problem Statement SIH26225",
    "members": [
      {
        "name": "Muhammed Irfan kv",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "MBA"
      }
    ]
  },
  {
    "sno": 22,
    "team_id": "SIH-TEAM-21",
    "team_name": "Insight squad",
    "leader_name": "Krishnapriya. K. U",
    "mentor_name": "Tarun Richard",
    "department": "MBA",
    "email": "krishnapriyakv2627@ajkcas.com",
    "roll": "5503",
    "category": "Hardware",
    "ps": "[SIH26223] Student Innovation-Disaster management includes ideas related to risk mitigation, Planning and management before, after or during a disaster.",
    "teamNumber": 47,
    "id": "SIH-TEAM-47",
    "name": "IdeaHub (Idea 2)",
    "hall": "Hall D",
    "hallLetter": "D",
    "assignedJury": "Mrs.Sariga",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Tarun",
    "problemStatementId": "SIH26213",
    "psTitle1": "Problem Statement SIH26213",
    "members": [
      {
        "name": "Muhammed Irfan kv",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "MBA"
      }
    ]
  },
  {
    "sno": 50,
    "team_id": "SIH-TEAM-50",
    "team_name": "Aero Ambassadors",
    "leader_name": "N Maheshwari",
    "mentor_name": "Punitha D",
    "department": "BBA Aviation with Hospitality Management",
    "email": "nmaheshwari2627@ajkcas.com",
    "roll": "5611",
    "category": "Hardware",
    "ps": "[SIH26221] Student Innovation-A solution/idea that can boost the current situation of the tourism industries including hotels, travel and others",
    "teamNumber": 48,
    "id": "SIH-TEAM-48",
    "name": "Aero Ambassadors",
    "hall": "Hall D",
    "hallLetter": "D",
    "assignedJury": "Mrs.Sariga",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Punitha D",
    "problemStatementId": "SIH26221",
    "psTitle1": "Problem Statement SIH26221",
    "members": [
      {
        "name": "N Maheshwari",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA Aviation with Hospitality Management"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 49,
    "id": "SIH-TEAM-49",
    "name": "Team_Nandithazz (Idea 1)",
    "hall": "Hall D",
    "hallLetter": "D",
    "assignedJury": "Mrs.Sariga",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Moushika D",
    "problemStatementId": "SIH26005",
    "psTitle1": "Problem Statement SIH26005",
    "members": [
      {
        "name": "Nanditha j Chandran",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 50,
    "id": "SIH-TEAM-50",
    "name": "Team_Nandithazz (Idea 2)",
    "hall": "Hall D",
    "hallLetter": "D",
    "assignedJury": "Mrs.Sariga",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Moushika D",
    "problemStatementId": "SIH26007",
    "psTitle1": "Problem Statement SIH26007",
    "members": [
      {
        "name": "Nanditha j Chandran",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 51,
    "id": "SIH-TEAM-51",
    "name": "VISION_X",
    "hall": "Hall D",
    "hallLetter": "D",
    "assignedJury": "Mrs.Sariga",
    "slot": "01.15 - 01.45pm",
    "mentorName": "SHABNA RASHEED",
    "problemStatementId": "SIH26068",
    "psTitle1": "Problem Statement SIH26068",
    "members": [
      {
        "name": "NIMISHA RAMESH R",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 52,
    "id": "SIH-TEAM-52",
    "name": "InnovateX",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "10.30 - 11.15am",
    "mentorName": "SHABNA RASHEED",
    "problemStatementId": "SIH26205",
    "psTitle1": "Problem Statement SIH26205",
    "members": [
      {
        "name": "POOJA KRISHNA C T",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 43,
    "team_id": "SIH-TEAM-39",
    "team_name": "Aeros Innovators",
    "leader_name": "Shefin M",
    "mentor_name": "Rekha Ramachandran",
    "department": "BBA Aviation Management",
    "email": "shefinm2627@ajkcas.com",
    "roll": "AJKTEMP0043",
    "category": "Software",
    "ps": "[SIH26056] Smart Automation",
    "teamNumber": 53,
    "id": "SIH-TEAM-53",
    "name": "The InnoCrew (Idea 1)",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "10.30 - 11.15am",
    "mentorName": "Rekha Ramachandran",
    "problemStatementId": "SIH26007",
    "psTitle1": "Problem Statement SIH26007",
    "members": [
      {
        "name": "Prajesh K",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA Aviation Management"
      }
    ]
  },
  {
    "sno": 43,
    "team_id": "SIH-TEAM-39",
    "team_name": "Aeros Innovators",
    "leader_name": "Shefin M",
    "mentor_name": "Rekha Ramachandran",
    "department": "BBA Aviation Management",
    "email": "shefinm2627@ajkcas.com",
    "roll": "AJKTEMP0043",
    "category": "Software",
    "ps": "[SIH26056] Smart Automation",
    "teamNumber": 54,
    "id": "SIH-TEAM-54",
    "name": "The InnoCrew (Idea 2)",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "10.30 - 11.15am",
    "mentorName": "Rekha Ramachandran",
    "problemStatementId": "SIH26002",
    "psTitle1": "Problem Statement SIH26002",
    "members": [
      {
        "name": "Prajesh K",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA Aviation Management"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 55,
    "id": "SIH-TEAM-55",
    "name": "Hacktivators",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "10.30 - 11.15am",
    "mentorName": "Mrs.Greeshma R",
    "problemStatementId": "SIH26003",
    "psTitle1": "Problem Statement SIH26003",
    "members": [
      {
        "name": "Praveen K P",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 43,
    "team_id": "SIH-TEAM-39",
    "team_name": "Aeros Innovators",
    "leader_name": "Shefin M",
    "mentor_name": "Rekha Ramachandran",
    "department": "BBA Aviation Management",
    "email": "shefinm2627@ajkcas.com",
    "roll": "AJKTEMP0043",
    "category": "Software",
    "ps": "[SIH26056] Smart Automation",
    "teamNumber": 56,
    "id": "SIH-TEAM-56",
    "name": "Sky & Service",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Punitha D",
    "problemStatementId": "SIH26056",
    "psTitle1": "Problem Statement SIH26056",
    "members": [
      {
        "name": "R Ajith",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA Aviation Management"
      }
    ]
  },
  {
    "sno": 30,
    "team_id": "SIH-TEAM-28-A",
    "team_name": "Layyarri (Idea 1)",
    "leader_name": "Rihan",
    "mentor_name": "Layyarri",
    "department": "BBA Logistics & Supply Chain Management",
    "email": "mohammedrihan2627@ajkcas.com",
    "roll": "5811",
    "category": "Software",
    "ps": "[LYR267] Logistics",
    "teamNumber": 57,
    "id": "SIH-TEAM-57",
    "name": "Layyarri (Idea 1)",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Layyarri",
    "problemStatementId": "LYR267",
    "psTitle1": "Problem Statement LYR267",
    "members": [
      {
        "name": "Rihan",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA Logistics & Supply Chain Management"
      }
    ]
  },
  {
    "sno": 30,
    "team_id": "SIH-TEAM-28-A",
    "team_name": "Layyarri (Idea 1)",
    "leader_name": "Rihan",
    "mentor_name": "Layyarri",
    "department": "BBA Logistics & Supply Chain Management",
    "email": "mohammedrihan2627@ajkcas.com",
    "roll": "5811",
    "category": "Software",
    "ps": "[LYR267] Logistics",
    "teamNumber": 58,
    "id": "SIH-TEAM-58",
    "name": "Layyarri (Idea 2)",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Layyarri",
    "problemStatementId": "LYR267",
    "psTitle1": "Problem Statement LYR267",
    "members": [
      {
        "name": "Rihan",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA Logistics & Supply Chain Management"
      }
    ]
  },
  {
    "sno": 36,
    "team_id": "SIH-TEAM-32-B",
    "team_name": "TEAM NEXORA (Idea 2)",
    "leader_name": "S. Mithyleash",
    "mentor_name": "ASHA K",
    "department": "B.Sc Forensic Science",
    "email": "mithyleashs2425@ajkcas.com",
    "roll": "24UGFS015",
    "category": "Hardware",
    "ps": "[SIH26214] Student Innovation-Ideas that showcase the rich cultural heritage and traditions of India.",
    "teamNumber": 59,
    "id": "SIH-TEAM-59",
    "name": "TEAM NEXORA (Idea 1)",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "11.30 - 12.30pm",
    "mentorName": "ASHA K",
    "problemStatementId": "SIH26039",
    "psTitle1": "Problem Statement SIH26039",
    "members": [
      {
        "name": "S. Mithyleash",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Forensic Science"
      }
    ]
  },
  {
    "sno": 36,
    "team_id": "SIH-TEAM-32-B",
    "team_name": "TEAM NEXORA (Idea 2)",
    "leader_name": "S. Mithyleash",
    "mentor_name": "ASHA K",
    "department": "B.Sc Forensic Science",
    "email": "mithyleashs2425@ajkcas.com",
    "roll": "24UGFS015",
    "category": "Hardware",
    "ps": "[SIH26214] Student Innovation-Ideas that showcase the rich cultural heritage and traditions of India.",
    "teamNumber": 60,
    "id": "SIH-TEAM-60",
    "name": "TEAM NEXORA (Idea 2)",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "11.30 - 12.30pm",
    "mentorName": "ASHA K",
    "problemStatementId": "SIH26214",
    "psTitle1": "Problem Statement SIH26214",
    "members": [
      {
        "name": "S. Mithyleash",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Forensic Science"
      }
    ]
  },
  {
    "sno": 43,
    "team_id": "SIH-TEAM-39",
    "team_name": "Aeros Innovators",
    "leader_name": "Shefin M",
    "mentor_name": "Rekha Ramachandran",
    "department": "BBA Aviation Management",
    "email": "shefinm2627@ajkcas.com",
    "roll": "AJKTEMP0043",
    "category": "Software",
    "ps": "[SIH26056] Smart Automation",
    "teamNumber": 61,
    "id": "SIH-TEAM-61",
    "name": "Innoverse (Idea 1)",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Regha ramachandran",
    "problemStatementId": "SIH26003",
    "psTitle1": "Problem Statement SIH26003",
    "members": [
      {
        "name": "Sajela thasni m.p",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA Aviation Management"
      }
    ]
  },
  {
    "sno": 43,
    "team_id": "SIH-TEAM-39",
    "team_name": "Aeros Innovators",
    "leader_name": "Shefin M",
    "mentor_name": "Rekha Ramachandran",
    "department": "BBA Aviation Management",
    "email": "shefinm2627@ajkcas.com",
    "roll": "AJKTEMP0043",
    "category": "Software",
    "ps": "[SIH26056] Smart Automation",
    "teamNumber": 62,
    "id": "SIH-TEAM-62",
    "name": "Innoverse (Idea 2)",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Regha ramachandran",
    "problemStatementId": "SIH26004",
    "psTitle1": "Problem Statement SIH26004",
    "members": [
      {
        "name": "Sajela thasni m.p",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA Aviation Management"
      }
    ]
  },
  {
    "sno": 5,
    "team_id": "SIH-TEAM-03-A",
    "team_name": "Keratin (Idea 1)",
    "leader_name": "SAMSHEER.K",
    "mentor_name": "Dr.V.LOGESHWARAN",
    "department": "B.Sc Biotechnology",
    "email": "samsheer473@gmail.com",
    "roll": "25UGBT007",
    "category": "Hardware",
    "ps": "[SIH26217] Development of Sustainable Keratin-Based Bioplastic from Chicken Feather Waste",
    "teamNumber": 63,
    "id": "SIH-TEAM-63",
    "name": "Keratin (Idea 1)",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Dr.V.LOGESHWARAN",
    "problemStatementId": "SIH26217",
    "psTitle1": "Problem Statement SIH26217",
    "members": [
      {
        "name": "SAMSHEER.K",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Biotechnology"
      }
    ]
  },
  {
    "sno": 5,
    "team_id": "SIH-TEAM-03-A",
    "team_name": "Keratin (Idea 1)",
    "leader_name": "SAMSHEER.K",
    "mentor_name": "Dr.V.LOGESHWARAN",
    "department": "B.Sc Biotechnology",
    "email": "samsheer473@gmail.com",
    "roll": "25UGBT007",
    "category": "Hardware",
    "ps": "[SIH26217] Development of Sustainable Keratin-Based Bioplastic from Chicken Feather Waste",
    "teamNumber": 64,
    "id": "SIH-TEAM-64",
    "name": "Keratin (Idea 2)",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "10.30 - 11.15am",
    "mentorName": "Dr.V.LOGESHWARAN",
    "problemStatementId": "SIH26040",
    "psTitle1": "Problem Statement SIH26040",
    "members": [
      {
        "name": "SAMSHEER.K",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Biotechnology"
      }
    ]
  },
  {
    "sno": 53,
    "team_id": "SIH-TEAM-53-A",
    "team_name": "NEXUS (Idea 1)",
    "leader_name": "ARISH M",
    "mentor_name": "KISHORE K",
    "department": "B.Sc Digital & Cyber Forensic Science",
    "email": "arishm2425@ajkcas.com",
    "roll": "24UGDC002",
    "category": "Software",
    "ps": "[SIH26160] Block chain & Cyber Security",
    "teamNumber": 65,
    "id": "SIH-TEAM-65",
    "name": "Nexora",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "10.30 - 11.15am",
    "mentorName": "Kishore k",
    "problemStatementId": "SIH26044",
    "psTitle1": "Problem Statement SIH26044",
    "members": [
      {
        "name": "Shabika KA",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Digital & Cyber Forensic Science"
      }
    ]
  },
  {
    "sno": 71,
    "team_id": "SIH-TEAM-71",
    "team_name": "Mayhem",
    "leader_name": "Aysha parveen",
    "mentor_name": "Manobprabha",
    "department": "B.Sc Costume Design & Fashion",
    "email": "ayshaparveen2425@ajkcas.com",
    "roll": "24UGCD010",
    "category": "Hardware",
    "ps": "[26010] Survey/resurvey of rural agricultural land in India",
    "teamNumber": 66,
    "id": "SIH-TEAM-66",
    "name": "Toss",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "10.30 - 11.15am",
    "mentorName": "G Manoprabha",
    "problemStatementId": "SIH26005",
    "psTitle1": "Problem Statement SIH26005",
    "members": [
      {
        "name": "Shahana sherin V. V",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Costume Design & Fashion"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 67,
    "id": "SIH-TEAM-67",
    "name": "Hacksmiths",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "10.30 - 11.15am",
    "mentorName": "Kishor r",
    "problemStatementId": "SIH26068",
    "psTitle1": "Problem Statement SIH26068",
    "members": [
      {
        "name": "Shamil Ahmed",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 43,
    "team_id": "SIH-TEAM-39",
    "team_name": "Aeros Innovators",
    "leader_name": "Shefin M",
    "mentor_name": "Rekha Ramachandran",
    "department": "BBA Aviation Management",
    "email": "shefinm2627@ajkcas.com",
    "roll": "AJKTEMP0043",
    "category": "Software",
    "ps": "[SIH26056] Smart Automation",
    "teamNumber": 68,
    "id": "SIH-TEAM-68",
    "name": "Aeros Innovators",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Rekha Ramachandran",
    "problemStatementId": "SIH26056",
    "psTitle1": "Problem Statement SIH26056",
    "members": [
      {
        "name": "Shefin M",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA Aviation Management"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 69,
    "id": "SIH-TEAM-69",
    "name": "Neerav fighters",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Pavithra V",
    "problemStatementId": "SIH26028",
    "psTitle1": "Problem Statement SIH26028",
    "members": [
      {
        "name": "Srijin Krishna",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA"
      }
    ]
  },
  {
    "sno": 1,
    "team_id": "SIH-TEAM-13",
    "team_name": "Neural Ninjas",
    "leader_name": "SREYAS KALLAZHI",
    "mentor_name": "Mr. V. Muthusaravanan",
    "department": "BCA Artificial Intelligence",
    "email": "sreyaskallazhi2425@ajkcas.com",
    "roll": "24UGAL051",
    "category": "Software",
    "ps": "[SIH26012] AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "teamNumber": 70,
    "id": "SIH-TEAM-70",
    "name": "AI Mavericks",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Muthusaravanan V",
    "problemStatementId": "SIH26229",
    "psTitle1": "Problem Statement SIH26229",
    "members": [
      {
        "name": "Srinanth AK",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA Artificial Intelligence"
      }
    ]
  },
  {
    "sno": 73,
    "team_id": "SIH-TEAM-73",
    "team_name": "Cybercore",
    "leader_name": "Lifa fathima F",
    "mentor_name": "Adharsh VP",
    "department": "BCA Cybersecurity with Data Science",
    "email": "lifafathimaf2627@ajkcas.com",
    "roll": "6218",
    "category": "Software",
    "ps": "[26005] Solar powered smart mini cold storage system for fresh vegetables in North eastern region ( NER)",
    "teamNumber": 71,
    "id": "SIH-TEAM-71",
    "name": "CIPHERX (Idea 1)",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Adarsh V P",
    "problemStatementId": "SIH26093",
    "psTitle1": "Problem Statement SIH26093",
    "members": [
      {
        "name": "SRUTHI KEERTHI S S",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA Cybersecurity with Data Science"
      }
    ]
  },
  {
    "sno": 73,
    "team_id": "SIH-TEAM-73",
    "team_name": "Cybercore",
    "leader_name": "Lifa fathima F",
    "mentor_name": "Adharsh VP",
    "department": "BCA Cybersecurity with Data Science",
    "email": "lifafathimaf2627@ajkcas.com",
    "roll": "6218",
    "category": "Software",
    "ps": "[26005] Solar powered smart mini cold storage system for fresh vegetables in North eastern region ( NER)",
    "teamNumber": 72,
    "id": "SIH-TEAM-72",
    "name": "CIPHERX (Idea 2)",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Adarsh V P",
    "problemStatementId": "SIH26124",
    "psTitle1": "Problem Statement SIH26124",
    "members": [
      {
        "name": "SRUTHI KEERTHI S S",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BCA Cybersecurity with Data Science"
      }
    ]
  },
  {
    "sno": 55,
    "team_id": "SIH-TEAM-55",
    "team_name": "Viscams",
    "leader_name": "Deepak Dev S",
    "mentor_name": "Adhithiyan P",
    "department": "B.Sc Visual Communication & Electronics Media",
    "email": "deepakdevs2425@ajkcas.com",
    "roll": "24UGVC007",
    "category": "Software",
    "ps": "[SIH26089] Cooperative Gig Services Platform for Household & Community Services",
    "teamNumber": 73,
    "id": "SIH-TEAM-73",
    "name": "Viscomers",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "11.30 - 12.30pm",
    "mentorName": "Adthithyan p",
    "problemStatementId": "SIH26089",
    "psTitle1": "Problem Statement SIH26089",
    "members": [
      {
        "name": "Thoufeeq",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.Sc Visual Communication & Electronics Media"
      }
    ]
  },
  {
    "sno": 42,
    "team_id": "SIH-TEAM-38",
    "team_name": "ROYAL COMMERCE",
    "leader_name": "AFRA I",
    "mentor_name": "MS.KRISHNAVENI S",
    "department": "B.COM CA",
    "email": "afrai2526@ajkcas.com",
    "roll": "25UGPA001",
    "category": "Hardware",
    "ps": "[SIH26223] Student Innovation-Disaster management includes ideas related to risk mitigation, Planning and management before, after or during a disaster.",
    "teamNumber": 74,
    "id": "SIH-TEAM-74",
    "name": "Six Faces",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Suganya P",
    "problemStatementId": "SIH26001",
    "psTitle1": "Problem Statement SIH26001",
    "members": [
      {
        "name": "Varsha K",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "B.COM CA"
      }
    ]
  },
  {
    "sno": 30,
    "team_id": "SIH-TEAM-28-A",
    "team_name": "Layyarri (Idea 1)",
    "leader_name": "Rihan",
    "mentor_name": "Layyarri",
    "department": "BBA Logistics & Supply Chain Management",
    "email": "mohammedrihan2627@ajkcas.com",
    "roll": "5811",
    "category": "Software",
    "ps": "[LYR267] Logistics",
    "teamNumber": 75,
    "id": "SIH-TEAM-75",
    "name": "Logizz innovators (Idea 1)",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Dr.poornima G",
    "problemStatementId": "SIH26006",
    "psTitle1": "Problem Statement SIH26006",
    "members": [
      {
        "name": "W.jemima vasanthy",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA Logistics & Supply Chain Management"
      }
    ]
  },
  {
    "sno": 30,
    "team_id": "SIH-TEAM-28-A",
    "team_name": "Layyarri (Idea 1)",
    "leader_name": "Rihan",
    "mentor_name": "Layyarri",
    "department": "BBA Logistics & Supply Chain Management",
    "email": "mohammedrihan2627@ajkcas.com",
    "roll": "5811",
    "category": "Software",
    "ps": "[LYR267] Logistics",
    "teamNumber": 76,
    "id": "SIH-TEAM-76",
    "name": "Logizz innovators (Idea 2)",
    "hall": "Hall F",
    "hallLetter": "F",
    "assignedJury": "Dr.Bharathi",
    "slot": "01.15 - 01.45pm",
    "mentorName": "Dr.poornima G",
    "problemStatementId": "SIH26002",
    "psTitle1": "Problem Statement SIH26002",
    "members": [
      {
        "name": "W.jemima vasanthy",
        "role": "Team Leader",
        "gender": "Male",
        "dept": "BBA Logistics & Supply Chain Management"
      }
    ]
  },
  {
    "teamNumber": 77,
    "id": "SIH-TEAM-77",
    "name": "OptiFreight",
    "hall": "Hall E",
    "hallLetter": "E",
    "assignedJury": "Mr.Sachin",
    "slot": "01.15 - 01.45pm",
    "department": "BBA Logistics & Supply Chain Management",
    "mentorName": "Dr. Poornima G",
    "category": "Software",
    "problemStatementId": "SIH26006",
    "psTitle1": "Intelligent Freight Forecasting Model for Optimized Vessel Chartering",
    "solution1": "Development of an Intelligent Freight Forecasting Model for Optimized Vessel Chartering and Bulk Cargo Procurement from overseas to East Coast of India",
    "techStack1": "Python, Scikit-learn, Prophet/XGBoost, FastAPI, PostgreSQL, React.js, Docker",
    "submittedAt": "2026-09-08T07:05:57.000Z",
    "members": [
      {
        "name": "Avanthika P",
        "role": "Team Leader",
        "gender": "Female",
        "rollNo": "25UGBL019",
        "email": "avanthikap2526@ajkcas.com",
        "dept": "BBA Logistics & Supply Chain Management"
      },
      {
        "name": "Sreenandana K R",
        "role": "Member",
        "gender": "Female",
        "rollNo": "25UGBL055",
        "email": "sreenandanakr2526@ajkcas.com",
        "dept": "BBA Logistics & Supply Chain Management"
      },
      {
        "name": "Sibi Bhaskar",
        "role": "Member",
        "gender": "Male",
        "rollNo": "25UGBL053",
        "email": "sibibhaskar2526@ajkcas.com",
        "dept": "BBA Logistics & Supply Chain Management"
      },
      {
        "name": "Rowther Aaryan Abdulmunaf",
        "role": "Member",
        "gender": "Male",
        "rollNo": "25UGBL048",
        "email": "rowtheraaryanabdulmunaf2526@ajkcas.com",
        "dept": "BBA Logistics & Supply Chain Management"
      },
      {
        "name": "Vaishnav.J",
        "role": "Member",
        "gender": "Male",
        "rollNo": "25UGBL059",
        "email": "vaishnavjayakumar7@gmail.com",
        "dept": "BBA Logistics & Supply Chain Management"
      },
      {
        "name": "Alan biju",
        "role": "Member",
        "gender": "Male",
        "rollNo": "25UGBL006",
        "email": "alanbiju2526@ajkcas.com",
        "dept": "BBA Logistics & Supply Chain Management"
      }
    ],
    "scores": null
  }
]
};

if (typeof window !== "undefined") {
  window.INITIAL_DATA = INITIAL_DATA;
}
