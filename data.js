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
    dates: "SIH Release: Today at 4 PM | Internal Pitching & Shortlisting: Sep 4, 2026",
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
  teams: []
};

if (typeof window !== 'undefined') {
  window.INITIAL_DATA = INITIAL_DATA;
}
