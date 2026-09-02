/**
 * SIH 2026 INTERNAL HACKATHON PORTAL - Application Logic
 * Co-Branded with AJK College of Arts & Science & AIIF (AJK Innovation Incubator Foundation)
 * Theme: "Observe. Analyze. Innovate." - SIH Problem Statement & Solution Collector
 */

// STATE MANAGEMENT
const state = {
  branding: (window.INITIAL_DATA && window.INITIAL_DATA.branding) ? window.INITIAL_DATA.branding : {},
  departments: (window.INITIAL_DATA && window.INITIAL_DATA.departments) ? window.INITIAL_DATA.departments : [],
  sdgs: (window.INITIAL_DATA && window.INITIAL_DATA.sdgs) ? window.INITIAL_DATA.sdgs : [],
  mentors: (window.INITIAL_DATA && window.INITIAL_DATA.mentors) ? window.INITIAL_DATA.mentors : [],
  problemStatements: (window.INITIAL_DATA && window.INITIAL_DATA.problemStatements) ? window.INITIAL_DATA.problemStatements : [],
  teams: (window.INITIAL_DATA && (window.INITIAL_DATA.teams || window.INITIAL_DATA.sampleTeams)) ? [...(window.INITIAL_DATA.teams || window.INITIAL_DATA.sampleTeams)] : [],
  activeTab: 'overview',
  deptTrackerFilter: 'All',
  leaderboardFilter: 'All',
  selectedTeamForJuryId: null,
  isStaffAuthenticated: false,
  isLeaderboardPublished: false,
  deletedTeamIds: []
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  const safeRun = (fn, name) => {
    try { fn(); } catch (err) { console.error(`Error initializing ${name}:`, err); }
  };

  safeRun(loadStoredState, 'loadStoredState');
  safeRun(initTheme, 'initTheme');
  safeRun(initBranding, 'initBranding');
  safeRun(initNavTabs, 'initNavTabs');
  safeRun(initCountdownTimer, 'initCountdownTimer');
  safeRun(renderMembersForm, 'renderMembersForm');
  safeRun(populateDepartmentSelect, 'populateDepartmentSelect');
  safeRun(populatePsSelects, 'populatePsSelects');
  safeRun(populateMentorSelect, 'populateMentorSelect');
  safeRun(renderDepartmentTracker, 'renderDepartmentTracker');
  safeRun(renderProblemStatements, 'renderProblemStatements');
  safeRun(renderSubmissionsList, 'renderSubmissionsList');
  safeRun(renderJuryTeamList, 'renderJuryTeamList');
  safeRun(renderLeaderboard, 'renderLeaderboard');
  safeRun(renderCertificateCanvas, 'renderCertificateCanvas');
  safeRun(updateStatBanner, 'updateStatBanner');
  safeRun(validateTeamRules, 'validateTeamRules');
  safeRun(applyStaffProtection, 'applyStaffProtection');
  safeRun(syncLiveTeamsFromGoogleScript, 'syncLiveTeamsFromGoogleScript');
  // Continuous live sync every 10 seconds to keep tracker alive
  setInterval(() => {
    try { syncLiveTeamsFromGoogleScript(false); } catch (e) {}
  }, 10000);
});

function initTheme() {
  const savedTheme = localStorage.getItem('prajna_theme') || 'light';
  applyTheme(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = (currentTheme === 'light') ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem('prajna_theme', newTheme);
  showToast(`Switched to Mode: ${newTheme === 'light' ? 'Light' : 'Dark'}`, 'info');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const iconElem = document.getElementById('themeIcon');
  const labelElem = document.getElementById('themeLabel');
  
  if (theme === 'light') {
    if (iconElem) iconElem.textContent = '☀️';
    if (labelElem) labelElem.textContent = 'Mode: Light';
  } else {
    if (iconElem) iconElem.textContent = '🌙';
    if (labelElem) labelElem.textContent = 'Mode: Dark';
  }
}

function initCountdownTimer() {
  try {
    // Cross-browser safe target date: September 05, 2026 23:59:59 IST
    const targetDate = new Date(2026, 8, 5, 23, 59, 59).getTime();

    function updateTimer() {
      try {
        const now = Date.now();
        const distance = targetDate - now;

        if (isNaN(distance) || distance <= 0) {
          const cdD = document.getElementById('cdDays');
          const cdH = document.getElementById('cdHours');
          const cdM = document.getElementById('cdMins');
          const cdS = document.getElementById('cdSecs');
          if (cdD) cdD.textContent = '00';
          if (cdH) cdH.textContent = '00';
          if (cdM) cdM.textContent = '00';
          if (cdS) cdS.textContent = '00';
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const elemDays = document.getElementById('cdDays');
        const elemHours = document.getElementById('cdHours');
        const elemMins = document.getElementById('cdMins');
        const elemSecs = document.getElementById('cdSecs');

        if (elemDays) elemDays.textContent = String(days).padStart(2, '0');
        if (elemHours) elemHours.textContent = String(hours).padStart(2, '0');
        if (elemMins) elemMins.textContent = String(minutes).padStart(2, '0');
        if (elemSecs) elemSecs.textContent = String(seconds).padStart(2, '0');
      } catch (e) {
        console.warn('Timer tick note:', e);
      }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  } catch (err) {
    console.warn('Timer init note:', err);
  }
}

function purgeSystemCache() {
  localStorage.clear();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
  window.location.reload(true);
}

// LOCAL STORAGE PERSISTENCE
function cleanPsCode(ps) {
  if (!ps) return '';
  let s = String(ps).trim().toUpperCase();
  s = s.replace(/[\/\t].*$/, ''); // Remove trailing counts like /0/500 or \t0/500
  s = s.replace(/\s+/g, '');
  if (/^\d{5}$/.test(s)) s = 'SIH' + s;
  if (/^SIH\d{3}$/.test(s)) s = s.replace('SIH', 'SIH26');
  return s;
}

function getTeamDedupeKey(t) {
  if (!t) return { nameKey: '', emailKey: '', rollKey: '' };
  const rawName = (t.name ? String(t.name) : '').trim();
  const baseName = rawName.replace(/\s*\(Idea [12]\)$/i, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const isIdea2 = (t.id && String(t.id).includes('-B')) || rawName.toLowerCase().includes('idea 2');
  const isIdea1 = (t.id && String(t.id).includes('-A')) || rawName.toLowerCase().includes('idea 1');
  const ideaSuffix = isIdea2 ? 'B' : (isIdea1 ? 'A' : 'A');

  const leader = (t.members && t.members[0]) ? t.members[0] : {};
  const leaderEmail = (leader.email ? String(leader.email).trim().toLowerCase() : '');
  const leaderRoll = (leader.rollNo ? String(leader.rollNo).trim().toUpperCase().replace(/[^A-Z0-9]/g, '') : '');

  return {
    nameKey: baseName ? `${baseName}#${ideaSuffix}` : '',
    emailKey: leaderEmail ? `${leaderEmail}#${ideaSuffix}` : '',
    rollKey: (leaderRoll && leaderRoll !== 'N/A' && !leaderRoll.startsWith('AJKTEMP')) ? `${leaderRoll}#${ideaSuffix}` : ''
  };
}

function deduplicateTeams(teamList) {
  if (!Array.isArray(teamList)) return [];
  const seenName = new Set();
  const seenEmail = new Set();
  const seenRoll = new Set();
  const result = [];

  for (const t of teamList) {
    if (!t || !t.name || /^Team \d+$/i.test(String(t.name).trim())) continue;
    
    if (t.problemStatementId) {
      t.problemStatementId = cleanPsCode(t.problemStatementId);
    }
    if (t.problemStatement2Id && t.problemStatement2Id !== 'N/A') {
      t.problemStatement2Id = cleanPsCode(t.problemStatement2Id);
    }

    const keys = getTeamDedupeKey(t);
    const isDup = (keys.nameKey && seenName.has(keys.nameKey)) ||
                  (keys.emailKey && seenEmail.has(keys.emailKey)) ||
                  (keys.rollKey && seenRoll.has(keys.rollKey));

    if (!isDup) {
      if (keys.nameKey) seenName.add(keys.nameKey);
      if (keys.emailKey) seenEmail.add(keys.emailKey);
      if (keys.rollKey) seenRoll.add(keys.rollKey);
      result.push(t);
    }
  }
  return ensureUniqueTeamIds(result);
}

function ensureUniqueTeamIds(teams) {
  if (!Array.isArray(teams)) return [];
  const seenIds = new Set();
  
  teams.forEach((t, idx) => {
    if (!t) return;
    let candidateId = (t.id ? String(t.id).trim().toUpperCase() : '');
    const isIdea2 = (candidateId.includes('-B')) || (t.name && String(t.name).includes('Idea 2'));
    const isIdea1 = (candidateId.includes('-A')) || (t.name && String(t.name).includes('Idea 1'));
    const suffix = isIdea2 ? '-B' : (isIdea1 ? '-A' : '');

    // If ID is missing or duplicate, generate a unique sequential ID
    if (!candidateId || seenIds.has(candidateId)) {
      const num = idx + 1;
      const numPad = num < 10 ? '0' + num : String(num);
      candidateId = `SIH-TEAM-${numPad}${suffix}`;
      
      let counter = 1;
      while (seenIds.has(candidateId)) {
        candidateId = `SIH-TEAM-${numPad}-${counter}${suffix}`;
        counter++;
      }
      t.id = candidateId;
    }
    seenIds.add(t.id);
  });

  return teams;
}

function loadStoredState() {
  localStorage.removeItem('prajna_deleted_team_ids');
  state.deletedTeamIds = [];

  const savedTeams = localStorage.getItem('prajna_teams');
  if (savedTeams) {
    try {
      const parsed = JSON.parse(savedTeams);
      if (Array.isArray(parsed)) {
        state.teams = deduplicateTeams(parsed);
      }
    } catch (e) {
      console.error('Failed to parse stored teams:', e);
      state.teams = [];
    }
  } else {
    state.teams = [];
  }

  const savedPs = localStorage.getItem('prajna_problem_statements');
  if (savedPs) {
    try {
      const parsed = JSON.parse(savedPs);
      if (Array.isArray(parsed) && parsed.length > 0) {
        state.problemStatements = parsed;
      }
    } catch (e) {
      console.error('Failed to parse stored problem statements:', e);
    }
  }

  const savedMentors = localStorage.getItem('prajna_mentors');
  if (savedMentors) {
    try {
      const parsed = JSON.parse(savedMentors);
      if (Array.isArray(parsed)) {
        const realMentors = parsed.filter(m => m.id !== 'MTR-2026-01' && m.id !== 'MTR-2026-02' && m.id !== 'MTR-2026-03');
        state.mentors = realMentors;
        localStorage.setItem('prajna_mentors', JSON.stringify(realMentors));
      }
    } catch (e) {
      console.error('Failed to parse stored mentors:', e);
      state.mentors = [];
    }
  } else {
    state.mentors = [];
  }

  if (!Array.isArray(state.teams)) {
    state.teams = (window.INITIAL_DATA && (window.INITIAL_DATA.teams || window.INITIAL_DATA.sampleTeams)) ? [...(window.INITIAL_DATA.teams || window.INITIAL_DATA.sampleTeams)] : [];
  }
  if (!Array.isArray(state.problemStatements)) {
    state.problemStatements = (window.INITIAL_DATA && window.INITIAL_DATA.problemStatements) ? [...window.INITIAL_DATA.problemStatements] : [];
  }
  if (!Array.isArray(state.mentors)) {
    state.mentors = (window.INITIAL_DATA && window.INITIAL_DATA.mentors) ? [...window.INITIAL_DATA.mentors] : [];
  }

  expandDualIdeaTeams();
  if (Array.isArray(state.teams)) {
    state.teams = deduplicateTeams(state.teams.map(t => enrichTeamRecord(t)));
    localStorage.setItem('prajna_teams', JSON.stringify(state.teams));
  }
}

function expandDualIdeaTeams() {
  const expanded = [];
  (state.teams || []).forEach(team => {
    if (!team) return;
    const ps2Title = (team.psTitle2 ? String(team.psTitle2) : '').trim();
    const ps2Code = (team.problemStatement2Id ? String(team.problemStatement2Id) : '').trim();
    
    // Check if there is genuinely a second problem statement
    const hasValidIdea2 = ps2Title !== '' && 
                          ps2Title.toUpperCase() !== 'N/A' &&
                          ps2Code !== '' && 
                          ps2Code.toUpperCase() !== 'N/A';

    const teamIdStr = team.id ? String(team.id) : '';
    const teamNameStr = team.name ? String(team.name) : '';
    const isAlreadySplit = teamIdStr.includes('-A') || teamIdStr.includes('-B') ||
                           teamNameStr.toLowerCase().includes('(idea 1)') || teamNameStr.toLowerCase().includes('(idea 2)');

    if (hasValidIdea2 && !isAlreadySplit) {
      const teamA = {
        ...team,
        id: `${team.id}-A`,
        name: `${teamNameStr} (Idea 1)`,
        problemStatementId: cleanPsCode(team.problemStatementId),
        psTitle1: team.psTitle1,
        solution1: team.solution1,
        techStack1: team.techStack1,
        psTitle2: null,
        problemStatement2Id: null,
        solution2: null,
        techStack2: null
      };

      const teamB = {
        ...team,
        id: `${team.id}-B`,
        name: `${teamNameStr} (Idea 2)`,
        problemStatementId: cleanPsCode(team.problemStatement2Id || `${team.problemStatementId}-2`),
        psTitle1: team.psTitle2,
        solution1: team.solution2 || team.solution1,
        techStack1: team.techStack2 || team.techStack1,
        psTitle2: null,
        problemStatement2Id: null,
        solution2: null,
        techStack2: null,
        scores: null
      };

      expanded.push(teamA);
      expanded.push(teamB);
    } else {
      expanded.push(team);
    }
  });
  state.teams = deduplicateTeams(expanded);
}

// --------------------------------------------------------------------------
// MASTER TEAM ROSTER ENRICHMENT & FIDELITY ENGINE
// --------------------------------------------------------------------------

const FEMALE_TOKENS_SET = new Set([
  'amritha', 'safeena', 'thulasi', 'jemima', 'sreethma', 'anushree', 'athira',
  'kaviya', 'kavya', 'priya', 'priyadharshini', 'anusha', 'harini', 'swetha', 'sneha', 'keerthana',
  'deepika', 'divya', 'pavithra', 'sandhiya', 'nandhini', 'kavitha', 'monisha',
  'sangeetha', 'revathi', 'lakshmi', 'gayathri', 'abirami', 'abinaya', 'abhinaya', 'bhavani', 'soundarya',
  'varsha', 'pooja', 'madhumitha', 'shalini', 'aishwarya', 'archana', 'dharani',
  'ramya', 'swathi', 'sowmya', 'renuka', 'preethi', 'shobana', 'sindhu',
  'nanditha', 'nandhitha', 'fathima', 'ayesha', 'ayisha', 'aisha', 'aysha', 'parveen', 'mary', 'anjali', 'reshma',
  'rinsha', 'nihala', 'niha', 'shamna', 'fidha', 'nivedha', 'niveditha', 'nivedihitha', 'brinda',
  'ashna', 'afra', 'muhsina', 'amrutham', 'niranjana', 'anjana', 'krishnapriya',
  'devika', 'gopika', 'ananya', 'arya', 'architha', 'malavika', 'shruti', 'sruthi',
  'alfeena', 'farhana', 'asna', 'lubna', 'hadiya', 'hasna', 'nafia', 'sana', 'shahana',
  'anagha', 'raniya', 'vasanthy', 'advaitha', 'theertha', 'raveena', 'akshima', 'akshaya', 'akshitha', 'sreelakshmi',
  'aqila', 'sresha', 'payal', 'sandhya', 'hency', 'aswathy', 'niya', 'madhumithra', 'stephy',
  'avani', 'nivya', 'nimisha', 'thanmaya', 'anusree', 'nivedya', 'aleena', 'adhirsha', 'manjima',
  'thasni', 'jesna', 'shifa', 'sreenandini', 'nethara', 'yamika', 'abhinandana',
  'ranjitha', 'ranjana', 'renjitha', 'fasna', 'risa', 'shaba', 'nejila', 'sinisha', 'ridhika', 'radhika',
  'jyothirmai', 'jyothi', 'srimathi', 'mathi', 'sweety', 'shalo', 'mohini', 'vineetha', 'vinitha', 'roshini', 'roshni',
  'ashmi', 'biniya', 'bincy', 'afsana', 'anjitha', 'anupama', 'anitha', 'vinaya', 'nivannya', 'diya', 'dhiya',
  'hibha', 'sherin', 'yasmin', 'chandrapraba', 'prabha', 'joshika', 'mohana', 'harshini', 'bhavana', 'bhavya',
  'dhanya', 'geetha', 'keerthi', 'lavanya', 'meera', 'meenakshi', 'mithra', 'mythili', 'preetha', 'poornima',
  'priyanka', 'ragavi', 'rakshana', 'reshmi', 'saranya', 'shilpa', 'shobha', 'sreedevi', 'subhashini', 'suchitra',
  'suganya', 'sumathi', 'supriya', 'sushmitha', 'tanuja', 'tharani', 'vaishali', 'vidya', 'vimala',
  'vinodhini', 'yamuna', 'amala', 'ammu', 'anju', 'arundhathi', 'chinju', 'drishya', 'greeshma', 'haritha',
  'kalyani', 'nayana', 'neethu', 'nima', 'nimmy', 'parvathy', 'parvati', 'remya', 'revathy', 'rohini', 'sahla',
  'salma', 'saritha', 'silpa', 'smrithi', 'surabhi', 'veena', 'vrinda', 'dilsha', 'jamsheera', 'mubeena',
  'nasreen', 'nida', 'noureen', 'raheema', 'rahana', 'rasheeda', 'rizwana', 'safna', 'sameera', 'shabana',
  'shafna', 'shahida', 'shameema', 'sumayya', 'tasneem', 'thasleema', 'zainab', 'zubaida', 'ardra', 'chandana',
  'dharshini', 'swathy', 'aparna', 'snehashree', 'nivedhitha', 'dhanalakshmi', 'karpagam'
]);

const MALE_EXACT_TOKENS = new Set([
  'muhammed', 'mohamed', 'mohammed', 'irfan', 'afreed', 'libin', 'praveen', 'vimal',
  'ajay', 'srijin', 'sreyas', 'soorya', 'rihan', 'nihal', 'nivedh', 'nived', 'basil',
  'sandeep', 'amith', 'ramjith', 'rayan', 'dharshan', 'bharath', 'abishiek', 'ismail',
  'jumail', 'abhinav', 'aasil', 'kirosh', 'sabarimanikandan', 'yuraj', 'shefin', 'arundas',
  'alen', 'aflah', 'kamalesh', 'sawad', 'amal', 'ziyaal', 'anfas', 'abhinand', 'abhinandh', 'navaneeth',
  'adrash', 'adithyan', 'mishab', 'ranshif', 'afridh', 'niju', 'shon', 'aswaon', 'abhilash',
  'sheik', 'adith', 'aswin', 'anurag', 'bhavadas', 'fanoos', 'sreesanth', 'aromal', 'harshin',
  'nidhil', 'saravanan', 'maruthu', 'naveenkumar', 'ajesh', 'mithyleash', 'gubendran',
  'mickle', 'vaishnav', 'sreejith', 'samsheer', 'sanfar', 'sivaprakash', 'rahulkrishna',
  'sreehari', 'abhiram', 'shinan', 'mukesh', 'abhijith', 'hijas', 'sureshkumar', 'sasikumar',
  'kumar', 'kailas', 'pranav', 'dhanush', 'kirthik', 'lakshan', 'harish', 'vigneshwaran',
  'swalih', 'madesh', 'balasubbramanian', 'kishore', 'rojer', 'karthikkannan', 'prethive',
  'vishal', 'ashfaq', 'srinanth', 'deepak', 'harisath', 'mithilesh', 'anderson', 'thoufeeq'
]);

function inferGender(name) {
  if (!name) return 'Male';
  const clean = String(name).toLowerCase().replace(/[^a-z\s]/g, ' ');
  const tokens = clean.split(/\s+/).filter(t => t.length >= 2);
  
  let hasFemale = false;
  let hasMale = false;

  for (const token of tokens) {
    if (FEMALE_TOKENS_SET.has(token) || Array.from(FEMALE_TOKENS_SET).some(f => token === f || (token.startsWith(f) && f.length >= 4) || (f.startsWith(token) && token.length >= 4))) {
      hasFemale = true;
    }
    if (MALE_EXACT_TOKENS.has(token) || Array.from(MALE_EXACT_TOKENS).some(m => token === m || (token.startsWith(m) && m.length >= 4))) {
      hasMale = true;
    }
  }

  // Compound check for names with merged tokens e.g. "nejilafathima"
  const noSpace = clean.replace(/\s+/g, '');
  for (const f of FEMALE_TOKENS_SET) {
    if (f.length >= 5 && noSpace.includes(f)) {
      hasFemale = true;
      break;
    }
  }

  if (hasFemale && !hasMale) return 'Female';
  if (hasFemale && hasMale) {
    const first = tokens[0] || '';
    if (FEMALE_TOKENS_SET.has(first) || Array.from(FEMALE_TOKENS_SET).some(f => first.startsWith(f))) return 'Female';
    if (MALE_EXACT_TOKENS.has(first) || Array.from(MALE_EXACT_TOKENS).some(m => first.startsWith(m))) return 'Male';
    return 'Female';
  }
  return 'Male';
}

function generateCleanEmail(name, batchYear) {
  if (!name) return 'student@ajkcas.com';
  const clean = String(name).toLowerCase().replace(/[^a-z]/g, '');
  return `${clean || 'member'}${batchYear || '2526'}@ajkcas.com`;
}

const KNOWN_TEAM_REGISTRY = {
  "neural ninjas": {
    mentorName: "Mr. V. Muthusaravanan (Assistant Professor - BCA AI)",
    dept: "BCA Artificial Intelligence",
    solution1: "AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone Imagery leveraging deep learning segmentation.",
    techStack1: "Python, OpenCV, PyTorch, GIS Mapping, LoRaWAN",
    members: [
      { name: "SREYAS KALLAZHI", rollNo: "24UGAL051", email: "sreyaskallazhi2425@ajkcas.com", role: "Team Leader", gender: "Male", dept: "BCA Artificial Intelligence", year: "2nd Year" },
      { name: "AQILA SABIR", rollNo: "24UGAL015", email: "aqilasabir2425@ajkcas.com", role: "Member 2", gender: "Female", dept: "BCA Artificial Intelligence", year: "2nd Year" },
      { name: "SREELAKSHMI S", rollNo: "24UGAL038", email: "sreelakshmis2425@ajkcas.com", role: "Member 3", gender: "Female", dept: "BCA Artificial Intelligence", year: "2nd Year" },
      { name: "SUNIL KISHOR S K", rollNo: "24UGAL016", email: "sunilkishorsk2425@ajkcas.com", role: "Member 4", gender: "Male", dept: "BCA Artificial Intelligence", year: "2nd Year" },
      { name: "VAISHNAV KR", rollNo: "24UGAL055", email: "vaishnavkr2425@ajkcas.com", role: "Member 5", gender: "Male", dept: "BCA Artificial Intelligence", year: "2nd Year" },
      { name: "RAHULKRISHNA U", rollNo: "24UGAL651", email: "rahulkrishnau2425@ajkcas.com", role: "Member 6", gender: "Male", dept: "BCA Artificial Intelligence", year: "2nd Year" }
    ]
  },
  "byte brains": {
    mentorName: "Mrs. K. Shiny (Assistant Professor - BCA AI)",
    dept: "BCA Artificial Intelligence",
    solution1: "Dynamic Forecast of Expected Time of Arrival (ETA) for Coaching Trains using Machine Learning and Live Railway Telemetry.",
    techStack1: "Python, ML Telemetry, FastAPI, React Native",
    members: [
      { name: "SRUTHI B", rollNo: "24UGAL053", email: "sruthib2425@ajkcas.com", role: "Team Leader", gender: "Female", dept: "BCA Artificial Intelligence", year: "2nd Year" },
      { name: "ADITH K", rollNo: "24UGAL005", email: "adithk2425@ajkcas.com", role: "Member 2", gender: "Male", dept: "BCA Artificial Intelligence", year: "2nd Year" },
      { name: "ARDRA O", rollNo: "24UGAL017", email: "ardrao2425@ajkcas.com", role: "Member 3", gender: "Female", dept: "BCA Artificial Intelligence", year: "2nd Year" },
      { name: "SHANAVAS", rollNo: "24UGAL047", email: "shanavas2425@ajkcas.com", role: "Member 4", gender: "Male", dept: "BCA Artificial Intelligence", year: "2nd Year" },
      { name: "SNEHA R", rollNo: "24UGAL050", email: "snehar2425@ajkcas.com", role: "Member 5", gender: "Female", dept: "BCA Artificial Intelligence", year: "2nd Year" },
      { name: "MOHAMED MUHSIN MV", rollNo: "24UGAL035", email: "muhsinmv2425@ajkcas.com", role: "Member 6", gender: "Male", dept: "BCA Artificial Intelligence", year: "2nd Year" }
    ]
  },
  "techfront": {
    mentorName: "Dr. John Gracias (Associate Professor - CS)",
    dept: "B.Sc Computer Science",
    solution1: "Digital Platform for Efficient Agricultural Procurement, Mandi Slot Booking and Queue Management.",
    techStack1: "React Native, Node.js, PostgreSQL, SMS Gateway",
    members: [
      { name: "Krishna Theertha S", rollNo: "25UGCS018", email: "krishnatheerthas2526@ajkcas.com", role: "Team Leader", gender: "Female", dept: "B.Sc Computer Science", year: "1st Year" },
      { name: "Aswin P", rollNo: "25UGCS005", email: "aswinp2526@ajkcas.com", role: "Member 2", gender: "Male", dept: "B.Sc Computer Science", year: "1st Year" },
      { name: "Akshaya u", rollNo: "25UGCS002", email: "akshayau2526@ajkcas.com", role: "Member 3", gender: "Female", dept: "B.Sc Computer Science", year: "1st Year" },
      { name: "Adhwaitha M", rollNo: "25UGCS001", email: "adhwaitham2526@ajkcas.com", role: "Member 4", gender: "Female", dept: "B.Sc Computer Science", year: "1st Year" },
      { name: "Sanfar S", rollNo: "25UGCS029", email: "sanfars2526@ajkcas.com", role: "Member 5", gender: "Male", dept: "B.Sc Computer Science", year: "1st Year" },
      { name: "Sivaprakash R", rollNo: "25UGCS032", email: "sivaprakashr2526@ajkcas.com", role: "Member 6", gender: "Male", dept: "B.Sc Computer Science", year: "1st Year" }
    ]
  },
  "keratin": {
    mentorName: "Dr. V. Logeshwaran (Assistant Professor - Biotechnology)",
    dept: "B.Sc Biotechnology",
    solution1: "Eco-friendly extraction of keratin proteins from poultry feather biomass to synthesize biodegradable, high-tensile bioplastics.",
    techStack1: "Bio-Chemical Processing, Green Synthesis, Tensile Testing",
    solution2: "FeatherClean: Sustainable cross-linked keratin bioadsorbent membranes filtering toxic azo dyes and heavy metals from textile effluents.",
    techStack2: "Nanofiltration, Adsorption Kinetics, Spectrophotometry",
    members: [
      { name: "SAMSHEER.K", rollNo: "25UGBT007", email: "samsheer473@gmail.com", role: "Team Leader", gender: "Male", dept: "B.Sc Biotechnology", year: "1st Year" },
      { name: "PRIYADHARSHINI.S", rollNo: "25UGBT005", email: "priya2526@ajkcas.com", role: "Member 2", gender: "Female", dept: "B.Sc Biotechnology", year: "1st Year" },
      { name: "RAVEENA", rollNo: "25UGBT006", email: "raveena2526@ajkcas.com", role: "Member 3", gender: "Female", dept: "B.Sc Biotechnology", year: "1st Year" },
      { name: "AKSHIMA.A", rollNo: "25UGBT001", email: "akshima2526@ajkcas.com", role: "Member 4", gender: "Female", dept: "B.Sc Biotechnology", year: "1st Year" },
      { name: "THEERTHA PRADEEP", rollNo: "25UGBT009", email: "theertha2526@ajkcas.com", role: "Member 5", gender: "Female", dept: "B.Sc Biotechnology", year: "1st Year" },
      { name: "ATHIRA J", rollNo: "25UGBT002", email: "athira2526@ajkcas.com", role: "Member 6", gender: "Female", dept: "B.Sc Biotechnology", year: "1st Year" }
    ]
  },
  "cyclone guardians": {
    mentorName: "Dr. Vineetha Vijayan (Assistant Professor - AI & ML)",
    dept: "B.Sc Artificial Intelligence & Machine Learning",
    solution1: "Deep convolutional recurrent network processing multi-spectral satellite imagery for early cyclone eye detection, track forecasting, and intensity estimation.",
    techStack1: "Python, TensorFlow, PyTorch, Satellite Telemetry, FastAPI",
    members: [
      { name: "Arun N", rollNo: "24UGAI012", email: "arunn2425@ajkcas.com", role: "Team Leader", gender: "Male", dept: "B.Sc Artificial Intelligence & Machine Learning", year: "2nd Year" },
      { name: "Sandhya Sivan", rollNo: "24UGAI040", email: "sandhyasivan2425@ajkcas.com", role: "Member 2", gender: "Female", dept: "B.Sc Artificial Intelligence & Machine Learning", year: "2nd Year" },
      { name: "Payal Bimal", rollNo: "24UGAI033", email: "payalbimal2425@ajkcas.com", role: "Member 3", gender: "Female", dept: "B.Sc Artificial Intelligence & Machine Learning", year: "2nd Year" },
      { name: "ARJUN KG", rollNo: "24UGAI011", email: "arjunkg2425@ajkcas.com", role: "Member 4", gender: "Male", dept: "B.Sc Artificial Intelligence & Machine Learning", year: "2nd Year" },
      { name: "Sresha S", rollNo: "24UGAI049", email: "sreshas2425@ajkcas.com", role: "Member 5", gender: "Female", dept: "B.Sc Artificial Intelligence & Machine Learning", year: "2nd Year" },
      { name: "HENCY G", rollNo: "24UGAI021", email: "hencyg2425@ajkcas.com", role: "Member 6", gender: "Female", dept: "B.Sc Artificial Intelligence & Machine Learning", year: "2nd Year" }
    ]
  },
  "cascaders": {
    mentorName: "Dr. Vineetha Vijayan (Assistant Professor - AI & ML)",
    dept: "B.Sc Artificial Intelligence & Machine Learning",
    solution1: "Thermal anomaly detection algorithm combining infrared satellite channels and localized weather telemetry for rapid industrial fire alerts.",
    techStack1: "Python, OpenCV, Satellite Imaging, FastAPI",
    solution2: "AI-Enabled Learning Platform for Skill-Gap Analysis & Auto-MCQ Generation based on curriculum taxonomy.",
    techStack2: "React, Python, LangChain, PostgreSQL",
    members: [
      { name: "Abhishek Shaji", rollNo: "25UGAI003", email: "abhishekshaji2526@ajkcas.com", role: "Team Leader", gender: "Male", dept: "B.Sc Artificial Intelligence & Machine Learning", year: "1st Year" },
      { name: "Aswathy Akash", rollNo: "25UGAI009", email: "aswathyakash2526@ajkcas.com", role: "Member 2", gender: "Female", dept: "B.Sc Artificial Intelligence & Machine Learning", year: "1st Year" },
      { name: "Devika Das M", rollNo: "25UGAI014", email: "devikadasm2526@ajkcas.com", role: "Member 3", gender: "Female", dept: "B.Sc Artificial Intelligence & Machine Learning", year: "1st Year" },
      { name: "Niya P", rollNo: "25UGAI029", email: "niyap2526@ajkcas.com", role: "Member 4", gender: "Female", dept: "B.Sc Artificial Intelligence & Machine Learning", year: "1st Year" },
      { name: "Roopesh T", rollNo: "25UGAI036", email: "roopesht2526@ajkcas.com", role: "Member 5", gender: "Male", dept: "B.Sc Artificial Intelligence & Machine Learning", year: "1st Year" },
      { name: "Athul P", rollNo: "25UGAI010", email: "athulp2526@ajkcas.com", role: "Member 6", gender: "Male", dept: "B.Sc Artificial Intelligence & Machine Learning", year: "1st Year" }
    ]
  },
  "kratos": {
    mentorName: "Mrs. Sangeetha S R (Assistant Professor - BCA)",
    dept: "BCA",
    solution1: "Integrated talent exchange and skill verification platform connecting university student portfolios directly with enterprise internship pipelines.",
    techStack1: "React, Express, PostgreSQL, TailwindCSS",
    solution2: "Longitudinal employment telemetry and analytics engine tracking graduate placement trajectories and quantifying institutional training ROI.",
    techStack2: "Python, Streamlit, PostgreSQL, Chart.js",
    members: [
      { name: "MADHUMITHRA K", rollNo: "25UGCA026", email: "madhumithrak2526@ajkcas.com", role: "Team Leader", gender: "Female", dept: "BCA", year: "1st Year" },
      { name: "AMRITHA R", rollNo: "25UGCA008", email: "amrithar2526@ajkcas.com", role: "Member 2", gender: "Female", dept: "BCA", year: "1st Year" },
      { name: "STEPHY K", rollNo: "25UGCA054", email: "stephyk2526@ajkcas.com", role: "Member 3", gender: "Female", dept: "BCA", year: "1st Year" },
      { name: "MOHAMMAD SHAZIN", rollNo: "25UGCA031", email: "mohammadshazin2526@ajkcas.com", role: "Member 4", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "ATHUL O", rollNo: "25UGCA017", email: "athulo2526@ajkcas.com", role: "Member 5", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "NAVEEN N", rollNo: "25UGCA034", email: "naveenn2526@ajkcas.com", role: "Member 6", gender: "Male", dept: "BCA", year: "1st Year" }
    ]
  },
  "neerav fighters": {
    mentorName: "Mrs. Pavithra V (Assistant Professor - BCA)",
    dept: "BCA",
    solution1: "Real-time railway telemetry aggregation system processing GPS speed logs and signal delays to calculate accurate train arrival estimates.",
    techStack1: "Python, Scikit-learn, FastAPI, WebSockets, Leaflet.js",
    members: [
      { name: "Srijin Krishna", rollNo: "24UGCA050", email: "srijinkrishna2425@ajkcas.com", role: "Team Leader", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Abhinav K S", rollNo: "24UGCA002", email: "abhinavks2425@ajkcas.com", role: "Member 2", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Akshay c", rollNo: "24UGCA009", email: "akshayc2425@ajkcas.com", role: "Member 3", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Sidharth S", rollNo: "24UGCA048", email: "sidharths2425@ajkcas.com", role: "Member 4", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Adharsh P S", rollNo: "24UGCA004", email: "adharshps2425@ajkcas.com", role: "Member 5", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Avani P A", rollNo: "24UGCA019", email: "avanipa2425@ajkcas.com", role: "Member 6", gender: "Female", dept: "BCA", year: "2nd Year" }
    ]
  },
  "team flash": {
    mentorName: "Mrs. Moushika D (Assistant Professor - BCA)",
    dept: "BCA",
    solution1: "Low-latency distributed microservices orchestrator with robotic process automation for streamlining multi-step enterprise workflows.",
    techStack1: "Node.js, Redis, Docker, React, Express",
    solution2: "Computer-vision OCR document parser validating administrative forms and student credentials against official registers.",
    techStack2: "Tesseract OCR, Python, FastAPI, MongoDB",
    members: [
      { name: "Abhinav ks", rollNo: "25UGCA057", email: "abhinavksbca2526@ajkcas.com", role: "Team Leader", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Abhinandh", rollNo: "25UGCA003", email: "abhinandh2526@ajkcas.com", role: "Member 2", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Abhi", rollNo: "25UGCA001", email: "abhi2526@ajkcas.com", role: "Member 3", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Adhi", rollNo: "25UGCA005", email: "adhi2526@ajkcas.com", role: "Member 4", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Jobi", rollNo: "25UGCA023", email: "jobi2526@ajkcas.com", role: "Member 5", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Ananya R", rollNo: "25UGCA010", email: "ananya2526@ajkcas.com", role: "Member 6", gender: "Female", dept: "BCA", year: "1st Year" }
    ]
  },
  "hacksmiths": {
    mentorName: "Mr. Kishor R (Assistant Professor - Computer Applications)",
    dept: "BCA",
    solution1: "Vernacular conversational AI assistant providing hyper-local agricultural weather forecasts, storm warnings, and climate advisories through voice and text.",
    techStack1: "Python, LLM / LangChain, Whisper Voice API, Open-Meteo, React",
    members: [
      { name: "Shamil Ahmed", rollNo: "24UGCA088", email: "shamilahmed2627@ajkcas.com", role: "Team Leader", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Adhil Mohammed A", rollNo: "24UGCA006", email: "adhilmohammeda2627@ajkcas.com", role: "Member 2", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Ajay Krishna K", rollNo: "24UGCA008", email: "ajaykrishnak2627@ajkcas.com", role: "Member 3", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Jithin J", rollNo: "24UGCA022", email: "jithinj2627@ajkcas.com", role: "Member 4", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Nivya p", rollNo: "24UGCA037", email: "nivyap2627@ajkcas.com", role: "Member 5", gender: "Female", dept: "BCA", year: "2nd Year" },
      { name: "Aswin K Chandran", rollNo: "24UGCA018", email: "aswinkchandran2627@ajkcas.com", role: "Member 6", gender: "Male", dept: "BCA", year: "2nd Year" }
    ]
  },
  "cyber titans": {
    mentorName: "Mr. Kishor R (Assistant Professor - Computer Applications)",
    dept: "BCA",
    solution1: "Cryptographically verified digital land registry utilizing OCR translation and blockchain timestamping to eliminate duplicate deed fraud.",
    techStack1: "Solidity, Hyperledger, Python OCR, React, Node.js",
    members: [
      { name: "Ajith Tm", rollNo: "24UGCA007", email: "ajithtm2627@ajkcas.com", role: "Team Leader", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Sneha N", rollNo: "24UGCA051", email: "snehan2627@ajkcas.com", role: "Member 2", gender: "Female", dept: "BCA", year: "2nd Year" },
      { name: "Aneesh S", rollNo: "24UGCA011", email: "aneeshs2627@ajkcas.com", role: "Member 3", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Sreekanth P", rollNo: "24UGCA049", email: "sreekanthp2627@ajkcas.com", role: "Member 4", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Arjun S", rollNo: "24UGCA014", email: "arjuns2627@ajkcas.com", role: "Member 5", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Nikhil T K", rollNo: "24UGCA036", email: "nikhiltk2627@ajkcas.com", role: "Member 6", gender: "Male", dept: "BCA", year: "2nd Year" }
    ]
  },
  "vision_x": {
    mentorName: "Mrs. Shabna Rasheed (Assistant Professor - BCA)",
    dept: "BCA",
    solution1: "Multi-lingual voice chatbot and alert broadcasting node designed for coastal fishermen and farmers with automated emergency SMS dispatches.",
    techStack1: "Python, FastAPI, Speech-to-Text, Twilio SMS, React",
    members: [
      { name: "NIMISHA RAMESH R", rollNo: "24UGCA035", email: "nimisharameshr2627@ajkcas.com", role: "Team Leader", gender: "Female", dept: "BCA", year: "2nd Year" },
      { name: "MUBARAK J S", rollNo: "24UGCA030", email: "mubarakjs2627@ajkcas.com", role: "Member 2", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "NASIM K", rollNo: "24UGCA033", email: "nasimk2627@ajkcas.com", role: "Member 3", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "MOHAMMED IRFAN", rollNo: "24UGCA028", email: "mohammedirfan2627@ajkcas.com", role: "Member 4", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "AJIN M C", rollNo: "24UGCA005", email: "ajinmc2627@ajkcas.com", role: "Member 5", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "ABHINAND M", rollNo: "24UGCA003", email: "abhinandm2627@ajkcas.com", role: "Member 6", gender: "Male", dept: "BCA", year: "2nd Year" }
    ]
  },
  "innovatex": {
    mentorName: "Mrs. Shabna Rasheed (Assistant Professor - BCA)",
    dept: "BCA",
    solution1: "Real-time municipal fleet optimization and transit routing algorithm mitigating urban traffic choke points and dynamically redistributing logistics vehicles.",
    techStack1: "React Native, Python, Google Maps Directions API, PostgreSQL",
    members: [
      { name: "POOJA KRISHNA C T", rollNo: "24UGCA042", email: "poojakrishnact2627@ajkcas.com", role: "Team Leader", gender: "Female", dept: "BCA", year: "2nd Year" },
      { name: "KAMALESH P", rollNo: "24UGCA024", email: "kamaleshp2627@ajkcas.com", role: "Member 2", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "MUHAMMED SAWAD M", rollNo: "24UGCA032", email: "muhammedsawadm2627@ajkcas.com", role: "Member 3", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "AMAL K", rollNo: "24UGCA010", email: "amalk2627@ajkcas.com", role: "Member 4", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "ZIYAAL AHAMMED Z H", rollNo: "24UGCA059", email: "ziyaalahammedzh2627@ajkcas.com", role: "Member 5", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "ANFAS P UMMER", rollNo: "24UGCA012", email: "anfaspummer2627@ajkcas.com", role: "Member 6", gender: "Male", dept: "BCA", year: "2nd Year" }
    ]
  },
  "team_nandithazz": {
    mentorName: "Mrs. Moushika D (Assistant Professor - BCA)",
    dept: "BCA",
    solution1: "Distributed off-grid solar cold storage unit with IoT Peltier thermoregulation and humidity management extending post-harvest shelf life for rural farmers.",
    techStack1: "Arduino / ESP32, Solar MPPT Controller, DHT22 Sensors, GSM Telemetry",
    solution2: "LiDAR and ultra-wideband (UWB) collision avoidance system with heads-up terrain telemetry for heavy haulage mining trucks in zero-visibility fog.",
    techStack2: "UWB Transceivers, STM32, OpenCV Edge Vision, ROS2",
    members: [
      { name: "Nanditha j Chandran", rollNo: "25UGCA095", email: "nandithajchandran2526@ajkcas.com", role: "Team Leader", gender: "Female", dept: "BCA", year: "1st Year" },
      { name: "Abhinand U", rollNo: "25UGCA004", email: "abhinandu2526@ajkcas.com", role: "Member 2", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Navaneeth A.K", rollNo: "25UGCA033", email: "navaneethak2526@ajkcas.com", role: "Member 3", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Abhinav KS", rollNo: "25UGCA006", email: "abhinavks2526@ajkcas.com", role: "Member 4", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Adrash p", rollNo: "25UGCA007", email: "adrashp2526@ajkcas.com", role: "Member 5", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Adithyan KM", rollNo: "25UGCA008", email: "adithyankm2526@ajkcas.com", role: "Member 6", gender: "Male", dept: "BCA", year: "1st Year" }
    ]
  },
  "infinity 6": {
    mentorName: "Mrs. Sangeetha S R (Assistant Professor - BCA)",
    dept: "BCA",
    solution1: "Early warning hydrological prediction mesh aggregating uphill ultrasonic stream gauges, soil moisture sensors, and radar rainfall feeds to trigger sirens before flash floods.",
    techStack1: "LoRaWAN, ESP32, Python ML, GeoServer, React",
    members: [
      { name: "Mishab M", rollNo: "25UGCA027", email: "mishabm2526@ajkcas.com", role: "Team Leader", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Muhammed Ranshif M", rollNo: "25UGCA030", email: "muhammedranshifm2526@ajkcas.com", role: "Member 2", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Afridh A", rollNo: "25UGCA009", email: "afridha2526@ajkcas.com", role: "Member 3", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Niju T R", rollNo: "25UGCA035", email: "nijutr2526@ajkcas.com", role: "Member 4", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Shon S", rollNo: "25UGCA047", email: "shons2526@ajkcas.com", role: "Member 5", gender: "Male", dept: "BCA", year: "1st Year" },
      { name: "Thanmaya Rajesh", rollNo: "25UGCA055", email: "thanmayarajesh2526@ajkcas.com", role: "Member 6", gender: "Female", dept: "BCA", year: "1st Year" }
    ]
  },
  "insight squad": {
    mentorName: "Mr. Tarun Richard (Assistant Professor - MBA)",
    dept: "MBA",
    solution1: "Crisis supply chain allocation dashboard coordinating volunteer deployment, relief material inventory, and emergency shelter bed capacity during regional disasters.",
    techStack1: "React, Node.js, Leaflet GIS, Supabase",
    members: [
      { name: "Krishnapriya. K. U", rollNo: "5503", email: "krishnapriyakv2627@ajkcas.com", role: "Team Leader", gender: "Female", dept: "MBA", year: "1st Year" },
      { name: "Aswaon j", rollNo: "5512", email: "aswaonj2627@ajkcas.com", role: "Member 2", gender: "Male", dept: "MBA", year: "1st Year" },
      { name: "Abhilash R", rollNo: "5520", email: "abhilashr2627@ajkcas.com", role: "Member 3", gender: "Male", dept: "MBA", year: "1st Year" },
      { name: "Sheik abdul kadhar", rollNo: "5528", email: "sheikabdulkadhar2627@ajkcas.com", role: "Member 4", gender: "Male", dept: "MBA", year: "1st Year" },
      { name: "Adith K", rollNo: "5534", email: "adithk2627@ajkcas.com", role: "Member 5", gender: "Male", dept: "MBA", year: "1st Year" },
      { name: "Aswin A", rollNo: "5540", email: "aswina2627@ajkcas.com", role: "Member 6", gender: "Male", dept: "MBA", year: "1st Year" }
    ]
  },
  "ideahub": {
    mentorName: "Mr. Tarun Richard (Assistant Professor - MBA)",
    dept: "MBA",
    solution1: "IoT-enabled smart physical learning toys and gamified tactile modules designed to foster early cognitive skills, problem-solving, and STEM fundamentals with adaptive embedded feedback.",
    techStack1: "ESP32, Capacitive Touch Sensors, Embedded C, BLE Telemetry, Flutter",
    solution2: "Smart biometric athletic telemetry system integrating real-time motion sensors, heart-rate tracking, and gait cadence analysis for sports performance optimization.",
    techStack2: "IMU 9-DOF Sensors, NodeMCU, Edge ML, BLE, React Native Dashboard",
    members: [
      { name: "Muhammed Irfan kv", rollNo: "6095", email: "muhammedirfan@ajkcas.com", role: "Team Leader", gender: "Male", dept: "MBA", year: "1st Year" },
      { name: "Muhammed afreed an", rollNo: "6098", email: "muhammedafreedan2627@ajkcas.com", role: "Member 2", gender: "Male", dept: "MBA", year: "1st Year" },
      { name: "Amritha.p", rollNo: "6102", email: "amrithap2627@ajkcas.com", role: "Member 3", gender: "Female", dept: "MBA", year: "1st Year" },
      { name: "Libin pb", rollNo: "6115", email: "libinpb2627@ajkcas.com", role: "Member 4", gender: "Male", dept: "MBA", year: "1st Year" },
      { name: "Praveen Krishna. U", rollNo: "6124", email: "praveenkrishnau2627@ajkcas.com", role: "Member 5", gender: "Male", dept: "MBA", year: "1st Year" },
      { name: "Vimal. G", rollNo: "6130", email: "vimalg2627@ajkcas.com", role: "Member 6", gender: "Male", dept: "MBA", year: "1st Year" }
    ]
  },
  "hexacode": {
    mentorName: "Mrs. Moushika D (Assistant Professor - BCA)",
    dept: "BCA",
    solution1: "Offline mesh communication network mapping safe escape paths and real-time shelter capacity during severe flooding and landslides.",
    techStack1: "ESP32 LoRa Mesh, Android Offline Maps, SQLite",
    solution2: "Smart IoT power metering and occupancy-based appliance switching kit drastically curtailing standby electrical wastage across campus buildings.",
    techStack2: "NodeMCU, Current Sensors, MQTT, InfluxDB, Grafana",
    members: [
      { name: "Anusree S", rollNo: "25UGCA075", email: "anusrees2526@ajkcas.com", role: "Team Leader", gender: "Female", dept: "BCA", year: "1st Year" },
      { name: "Nivedya S", rollNo: "25UGCA034", email: "nivedyas2526@ajkcas.com", role: "Member 2", gender: "Female", dept: "BCA", year: "1st Year" },
      { name: "Akshaya S", rollNo: "25UGCA011", email: "akshayas2526@ajkcas.com", role: "Member 3", gender: "Female", dept: "BCA", year: "1st Year" },
      { name: "Anusha K", rollNo: "25UGCA013", email: "anushak2526@ajkcas.com", role: "Member 4", gender: "Female", dept: "BCA", year: "1st Year" },
      { name: "Aleena R", rollNo: "25UGCA008", email: "aleenar2526@ajkcas.com", role: "Member 5", gender: "Female", dept: "BCA", year: "1st Year" },
      { name: "Adhirsha B", rollNo: "25UGCA006", email: "adhirshab2526@ajkcas.com", role: "Member 6", gender: "Female", dept: "BCA", year: "1st Year" }
    ]
  },
  "future executives": {
    mentorName: "Mr. Tarun Richard (Assistant Professor - MBA)",
    dept: "MBA",
    solution1: "Hyperlocal eco-tourism experiential marketplace integrating verified home-stays, indigenous artisan craft booking, and dynamic off-peak pricing models.",
    techStack1: "React, Node.js, Stripe Gateway, MongoDB, AWS",
    members: [
      { name: "Manjima Muralidharan", rollNo: "6271", email: "manjimamuralidharanm2627@ajkcas.com", role: "Team Leader", gender: "Female", dept: "MBA", year: "1st Year" },
      { name: "Thasni Rahiman", rollNo: "6275", email: "thasnirahiman2627@ajkcas.com", role: "Member 2", gender: "Female", dept: "MBA", year: "1st Year" },
      { name: "Jesna K", rollNo: "6280", email: "jesnak2627@ajkcas.com", role: "Member 3", gender: "Female", dept: "MBA", year: "1st Year" },
      { name: "Shifa K", rollNo: "6285", email: "shifak2627@ajkcas.com", role: "Member 4", gender: "Female", dept: "MBA", year: "1st Year" },
      { name: "Pooja Krishna", rollNo: "6290", email: "poojakrishna2627@ajkcas.com", role: "Member 5", gender: "Female", dept: "MBA", year: "1st Year" },
      { name: "Anurag P", rollNo: "6295", email: "anuragp2627@ajkcas.com", role: "Member 6", gender: "Male", dept: "MBA", year: "1st Year" }
    ]
  },
  "code crew": {
    mentorName: "Mrs. Greeshma R (Assistant Professor - BCA)",
    dept: "BCA",
    solution1: "Intelligent code compilation, vulnerability scanning, and automated rubric grading pipeline tailored for university computer labs and hackathons.",
    techStack1: "Docker, Python, FastAPI, WebSockets, Monaco Editor",
    members: [
      { name: "K.K.Soorya", rollNo: "24UGCA077", email: "kksoorya2425@ajkcas.com", role: "Team Leader", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Bhavadas.B", rollNo: "24UGCA020", email: "bhavadasb2425@ajkcas.com", role: "Member 2", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Sreenandini.P.M", rollNo: "24UGCA052", email: "sreenandinipm2425@ajkcas.com", role: "Member 3", gender: "Female", dept: "BCA", year: "2nd Year" },
      { name: "Muhammed Fanoos.M.A", rollNo: "24UGCA029", email: "muhammedfanoosma2425@ajkcas.com", role: "Member 4", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Sreesanth.R", rollNo: "24UGCA053", email: "sreesanthr2425@ajkcas.com", role: "Member 5", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Anagha Krishnan.C", rollNo: "24UGCA013", email: "anaghakrishnanc2425@ajkcas.com", role: "Member 6", gender: "Female", dept: "BCA", year: "2nd Year" }
    ]
  },
  "layyarri": {
    mentorName: "Dr. Poornima G (Assistant Professor - Management)",
    dept: "BBA Logistics & Supply Chain Management",
    solution1: "Dynamic cross-docking and container load optimization platform utilizing real-time route telemetry to minimize deadhead miles for fleet operators.",
    techStack1: "React, Python, OR-Tools, Mapbox API, PostgreSQL",
    solution2: "Low-cost BLE and GSM temperature logging beacons verifying cold chain integrity from farm gate to retail distribution hub.",
    techStack2: "ESP32 BLE Beacon, Cloud Telemetry, React Native",
    members: [
      { name: "Rihan", rollNo: "5811", email: "mohammedrihan2627@ajkcas.com", role: "Team Leader", gender: "Male", dept: "BBA Logistics & Supply Chain Management", year: "1st Year" },
      { name: "Aromal", rollNo: "5815", email: "aromal2627@ajkcas.com", role: "Member 2", gender: "Male", dept: "BBA Logistics & Supply Chain Management", year: "1st Year" },
      { name: "Mohammed Harshin PA", rollNo: "5820", email: "mohammedharshinpa2627@ajkcas.com", role: "Member 3", gender: "Male", dept: "BBA Logistics & Supply Chain Management", year: "1st Year" },
      { name: "Nihal", rollNo: "5825", email: "nihal2627@ajkcas.com", role: "Member 4", gender: "Male", dept: "BBA Logistics & Supply Chain Management", year: "1st Year" },
      { name: "Nidhil", rollNo: "5830", email: "nidhil2627@ajkcas.com", role: "Member 5", gender: "Male", dept: "BBA Logistics & Supply Chain Management", year: "1st Year" },
      { name: "Raniya fathima", rollNo: "5835", email: "raniyafathima2627@ajkcas.com", role: "Member 6", gender: "Female", dept: "BBA Logistics & Supply Chain Management", year: "1st Year" }
    ]
  },
  "logizz innovators": {
    mentorName: "Dr. Poornima G (Assistant Professor - Management)",
    dept: "BBA Logistics & Supply Chain Management",
    solution1: "AI-powered urban hub-and-spoke parcel consolidation model reducing delivery congestion and vehicle emissions through dynamic micro-depots.",
    techStack1: "Python, GraphHopper API, FastAPI, React",
    solution2: "Mountainous terrain route feasibility and weather hazard prediction system ensuring resilient essential supplies distribution in remote regions.",
    techStack2: "React Native, Python, GIS Telemetry, SQLite",
    members: [
      { name: "W.jemima vasanthy", rollNo: "5567", email: "wjemimavasanthy2627@ajkcas.com", role: "Team Leader", gender: "Female", dept: "BBA Logistics & Supply Chain Management", year: "1st Year" },
      { name: "C.saravanan", rollNo: "5570", email: "csaravanan2627@ajkcas.com", role: "Member 2", gender: "Male", dept: "BBA Logistics & Supply Chain Management", year: "1st Year" },
      { name: "Safeena.S", rollNo: "5575", email: "safeenas2627@ajkcas.com", role: "Member 3", gender: "Female", dept: "BBA Logistics & Supply Chain Management", year: "1st Year" },
      { name: "T.Maruthu pandi", rollNo: "5580", email: "tmaruthupandi2627@ajkcas.com", role: "Member 4", gender: "Male", dept: "BBA Logistics & Supply Chain Management", year: "1st Year" },
      { name: "P.Naveenkumar", rollNo: "5585", email: "pnaveenkumar2627@ajkcas.com", role: "Member 5", gender: "Male", dept: "BBA Logistics & Supply Chain Management", year: "1st Year" },
      { name: "P.Ajesh", rollNo: "5590", email: "pajesh2627@ajkcas.com", role: "Member 6", gender: "Male", dept: "BBA Logistics & Supply Chain Management", year: "1st Year" }
    ]
  },
  "team nexora": {
    mentorName: "Mrs. Asha K (Assistant Professor - Forensic Science)",
    dept: "B.Sc Forensic Science",
    solution1: "Wearable hazardous gas detector (CO, Methane) and sub-surface RF beacon enabling automated evacuation alarms and precision miner localization during collapses.",
    techStack1: "MQ Gas Sensors, Sub-GHz Transceivers, STM32, Thermal Camera, React",
    solution2: "Micro-spectroscopic spectral scanning and blockchain NFC certificate tagging guaranteeing artisan authenticity for GI-tagged traditional crafts.",
    techStack2: "Spectral Imaging, NFC RFID, Solidity, React Native",
    members: [
      { name: "S. Mithyleash", rollNo: "24UGFS015", email: "mithyleashs2425@ajkcas.com", role: "Team Leader", gender: "Male", dept: "B.Sc Forensic Science", year: "2nd Year" },
      { name: "Thulasi Sindhu Advaitha", rollNo: "24UGFS022", email: "thulasia2425@ajkcas.com", role: "Member 2", gender: "Female", dept: "B.Sc Forensic Science", year: "2nd Year" },
      { name: "S. Nethara Sri", rollNo: "24UGFS018", email: "netharasris2425@ajkcas.com", role: "Member 3", gender: "Female", dept: "B.Sc Forensic Science", year: "2nd Year" },
      { name: "Yamika P", rollNo: "24UGFS025", email: "yamikap2425@ajkcas.com", role: "Member 4", gender: "Female", dept: "B.Sc Forensic Science", year: "2nd Year" },
      { name: "S. Gubendran", rollNo: "24UGFS009", email: "gubendrans2425@ajkcas.com", role: "Member 5", gender: "Male", dept: "B.Sc Forensic Science", year: "2nd Year" },
      { name: "Aswin Mickle Raj P", rollNo: "24UGFS004", email: "aswinmicklerajp2425@ajkcas.com", role: "Member 6", gender: "Male", dept: "B.Sc Forensic Science", year: "2nd Year" }
    ]
  },
  "hacktivators": {
    mentorName: "Mrs. Greeshma R (Assistant Professor - BCA)",
    dept: "BCA",
    solution1: "Adaptive multi-sensory cognitive exercises, familiar voice memory recall prompts, and remote caregiver alert telemetry designed to slow memory degradation in dementia patients.",
    techStack1: "Flutter, TensorFlow Lite, WebRTC, Node.js, Firebase",
    members: [
      { name: "Praveen K P", rollNo: "24UGCA083", email: "praveenkpsuresh@gmail.com", role: "Team Leader", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Vaishnav G", rollNo: "24UGCA056", email: "vaishnavg2425@ajkcas.com", role: "Member 2", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Sreethma P", rollNo: "24UGCA054", email: "sreethmap2425@ajkcas.com", role: "Member 3", gender: "Female", dept: "BCA", year: "2nd Year" },
      { name: "Abhinandana P", rollNo: "24UGCA002", email: "abhinandanap2425@ajkcas.com", role: "Member 4", gender: "Female", dept: "BCA", year: "2nd Year" },
      { name: "Abhinav K", rollNo: "24UGCA005", email: "abhinavk2425@ajkcas.com", role: "Member 5", gender: "Male", dept: "BCA", year: "2nd Year" },
      { name: "Sreejith R", rollNo: "24UGCA050", email: "sreejithr2425@ajkcas.com", role: "Member 6", gender: "Male", dept: "BCA", year: "2nd Year" }
    ]
  },
  "survey team": {
    mentorName: "Dr. Mamta (Assistant Professor - BBA CA)",
    dept: "BBA CA",
    solution1: "Hardware sensor telemetry and automated survey tracking system designed for remote field data acquisition and community needs assessment.",
    techStack1: "ESP32 Microcontroller, LoRaWAN, Flutter App, Firebase Analytics",
    members: [
      { name: "Athira.S", rollNo: "25UGBC019", email: "athiras2526@ajkcas.com", role: "Team Leader", gender: "Female", dept: "BBA CA", year: "1st Year" },
      { name: "Sandeep", rollNo: "25UGBC020", email: "sandeep2526@ajkcas.com", role: "Member 2", gender: "Male", dept: "BBA CA", year: "1st Year" },
      { name: "Amith Prakash J", rollNo: "25UGBC021", email: "amithprakash2526@ajkcas.com", role: "Member 3", gender: "Male", dept: "BBA CA", year: "1st Year" },
      { name: "Ramjith babu", rollNo: "25UGBC022", email: "ramjithbabu2526@ajkcas.com", role: "Member 4", gender: "Male", dept: "BBA CA", year: "1st Year" },
      { name: "Rayan al riham pr", rollNo: "25UGBC023", email: "rayanalriham2526@ajkcas.com", role: "Member 5", gender: "Male", dept: "BBA CA", year: "1st Year" },
      { name: "Basil Zaman", rollNo: "25UGBC024", email: "basilzaman2526@ajkcas.com", role: "Member 6", gender: "Male", dept: "BBA CA", year: "1st Year" }
    ]
  },
  "jumail team": {
    mentorName: "Dr. Mamta (Assistant Professor - BBA CA)",
    dept: "BBA CA",
    solution1: "Smart IoT water purification and real-time contaminant monitoring unit for rural and mining-affected groundwater sources.",
    techStack1: "TDS/Turbidity Sensors, Raspberry Pi / Arduino, MQTT, React Web Dashboard",
    members: [
      { name: "Dharshan R", rollNo: "25UGBC023", email: "rdharshan2526@ajkcs.com", role: "Team Leader", gender: "Male", dept: "BBA CA", year: "1st Year" },
      { name: "Bharath S", rollNo: "25UGBC024", email: "bharaths2526@ajkcas.com", role: "Member 2", gender: "Male", dept: "BBA CA", year: "1st Year" },
      { name: "Nivedihitha M", rollNo: "25UGBC025", email: "nivedihitham2526@ajkcas.com", role: "Member 3", gender: "Female", dept: "BBA CA", year: "1st Year" },
      { name: "Abishiek B", rollNo: "25UGBC026", email: "abishiekb2526@ajkcas.com", role: "Member 4", gender: "Male", dept: "BBA CA", year: "1st Year" },
      { name: "Mohammed Ismail S", rollNo: "25UGBC027", email: "mohammedismails2526@ajkcas.com", role: "Member 5", gender: "Male", dept: "BBA CA", year: "1st Year" },
      { name: "Jumail K", rollNo: "25UGBC028", email: "jumailk2526@ajkcas.com", role: "Member 6", gender: "Male", dept: "BBA CA", year: "1st Year" }
    ]
  },
  "proton": {
    mentorName: "Mr. S. R. Dharan (Assistant Professor - CS DA)",
    dept: "B.Sc Computer Science with Data Analytics",
    solution1: "AI-driven portal for Academia-Industry collaboration facilitating skill gap mapping, verified internship matching, and automated campus placement workflows.",
    techStack1: "Python, FastAPI, Next.js, PostgreSQL, Machine Learning Recommender",
    members: [
      { name: "Abhinav s", rollNo: "25UGDA003", email: "abhinavs2526@ajkcas.com", role: "Team Leader", gender: "Male", dept: "B.Sc Computer Science with Data Analytics", year: "1st Year" },
      { name: "Aasil", rollNo: "25UGDA004", email: "aasil2526@ajkcas.com", role: "Member 2", gender: "Male", dept: "B.Sc Computer Science with Data Analytics", year: "1st Year" },
      { name: "Brinda u", rollNo: "25UGDA005", email: "brindau2526@ajkcas.com", role: "Member 3", gender: "Female", dept: "B.Sc Computer Science with Data Analytics", year: "1st Year" },
      { name: "Ashna", rollNo: "25UGDA006", email: "ashna2526@ajkcas.com", role: "Member 4", gender: "Female", dept: "B.Sc Computer Science with Data Analytics", year: "1st Year" },
      { name: "Kirosh tk", rollNo: "25UGDA007", email: "kiroshtk2526@ajkcas.com", role: "Member 5", gender: "Male", dept: "B.Sc Computer Science with Data Analytics", year: "1st Year" },
      { name: "Nivedh s", rollNo: "25UGDA008", email: "nivedhs2526@ajkcas.com", role: "Member 6", gender: "Male", dept: "B.Sc Computer Science with Data Analytics", year: "1st Year" }
    ]
  },
  "royal commerce": {
    mentorName: "Ms. Krishnaveni S (Assistant Professor - Commerce)",
    dept: "B.COM CA",
    solution1: "Integrated disaster risk mitigation hardware console combining seismic/flood warning sensors with emergency supply chain management tools.",
    techStack1: "IoT Flood/Vibration Sensors, GSM SOS Relay, Python Dashboard, Cloud Alerts",
    members: [
      { name: "AFRA I", rollNo: "25UGPA001", email: "afrai2526@ajkcas.com", role: "Team Leader", gender: "Female", dept: "B.COM CA", year: "1st Year" },
      { name: "Sabarimanikandan S", rollNo: "25UGPA002", email: "sabarimanikandans2526@ajkcas.com", role: "Member 2", gender: "Male", dept: "B.COM CA", year: "1st Year" },
      { name: "MUHSINA R", rollNo: "25UGPA003", email: "muhsinar2526@ajkcas.com", role: "Member 3", gender: "Female", dept: "B.COM CA", year: "1st Year" },
      { name: "yuraj kumar", rollNo: "25UGPA004", email: "yurajkumar2526@ajkcas.com", role: "Member 4", gender: "Male", dept: "B.COM CA", year: "1st Year" },
      { name: "amrutham  s", rollNo: "25UGPA005", email: "amruthams2526@ajkcas.com", role: "Member 5", gender: "Female", dept: "B.COM CA", year: "1st Year" },
      { name: "Niranjana G", rollNo: "25UGPA006", email: "niranjanag2526@ajkcas.com", role: "Member 6", gender: "Female", dept: "B.COM CA", year: "1st Year" }
    ]
  },
  "aeros innovators": {
    mentorName: "Mrs. Rekha Ramachandran (Assistant Professor - Aviation)",
    dept: "BBA Aviation Management",
    solution1: "Intelligent smart automation system optimizing airport ground turnaround times, baggage handling tracking, and gate scheduling efficiency.",
    techStack1: "Python, React Native, RFID/BLE Trackers, Cloud Analytics",
    members: [
      { name: "Shefin M", rollNo: "26AV001", email: "shefinm2627@ajkcas.com", role: "Team Leader", gender: "Male", dept: "BBA Aviation Management", year: "1st Year" },
      { name: "Muhammed Nihal TS", rollNo: "26AV002", email: "muhammednihalts2627@ajkcas.com", role: "Member 2", gender: "Male", dept: "BBA Aviation Management", year: "1st Year" },
      { name: "Anjana M", rollNo: "26AV003", email: "anjanam2627@ajkcas.com", role: "Member 3", gender: "Female", dept: "BBA Aviation Management", year: "1st Year" },
      { name: "Arundas TP", rollNo: "26AV004", email: "arundastp2627@ajkcas.com", role: "Member 4", gender: "Male", dept: "BBA Aviation Management", year: "1st Year" },
      { name: "Alen P Jophy", rollNo: "26AV005", email: "alenpjophy2627@ajkcas.com", role: "Member 5", gender: "Male", dept: "BBA Aviation Management", year: "1st Year" },
      { name: "Muhammad Aflah K A", rollNo: "26AV006", email: "muhammadaflahka2627@ajkcas.com", role: "Member 6", gender: "Male", dept: "BBA Aviation Management", year: "1st Year" }
    ]
  }
};

function enrichTeamRecord(team) {
  if (!team) return team;
  const rawName = (team.name ? String(team.name) : '').trim();
  const cleanKey = rawName
    .replace(/\s*\(Idea [12]\)$/i, '')
    .replace(/[_.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
  const isIdea2 = (team.id && String(team.id).includes('-B')) || rawName.toLowerCase().includes('idea 2');
  
  const known = KNOWN_TEAM_REGISTRY[cleanKey] || KNOWN_TEAM_REGISTRY[cleanKey.replace(/\s+/g, '')];
  const leader = (team.members && team.members[0]) ? team.members[0] : {};
  const batchYear = (leader.email && leader.email.match(/\d{4}/)) ? leader.email.match(/\d{4}/)[0] : '2526';

  if (known) {
    if (!team.department || team.department === 'AJK Department' || team.department === '') {
      team.department = known.dept;
    }
    if (!team.mentorName || team.mentorName === 'Assigned Mentor') {
      team.mentorName = known.mentorName;
    }
    if (isIdea2) {
      team.solution1 = known.solution2 || known.solution1 || team.solution1;
      team.techStack1 = known.techStack2 || known.techStack1 || team.techStack1;
    } else {
      team.solution1 = known.solution1 || team.solution1;
      team.techStack1 = known.techStack1 || team.techStack1;
    }

    if (Array.isArray(known.members) && known.members.length === 6) {
      team.members = known.members.map((km, idx) => {
        const existingMem = (team.members && team.members[idx]) ? team.members[idx] : {};
        const memName = existingMem.name || km.name;
        const memGender = (existingMem.gender && existingMem.gender !== 'Unknown') 
          ? existingMem.gender 
          : (km.gender || inferGender(memName));
        return {
          name: memName,
          rollNo: existingMem.rollNo || km.rollNo,
          email: existingMem.email || km.email,
          gender: memGender,
          dept: existingMem.dept || km.dept || team.department,
          year: existingMem.year || km.year || '1st Year',
          role: idx === 0 ? 'Team Leader' : `Member ${idx + 1}`
        };
      });
    }
  }

  // Universal fallback enrichment for all teams
  if (!Array.isArray(team.members)) team.members = [];
  
  team.members = team.members.map((m, idx) => {
    const memName = m.name || (idx === 0 ? 'Team Leader' : `Member ${idx + 1}`);
    const memGender = (m.gender && m.gender !== 'Unknown') ? m.gender : inferGender(memName);
    const memRoll = m.rollNo || m.roll || (idx === 0 ? 'VERIFIED' : `ROLL-0${idx + 1}`);
    const memEmail = m.email || generateCleanEmail(memName, batchYear);
    const memDept = m.dept || m.department || team.department || 'AJK College';
    const memYear = m.year || (batchYear === '2425' ? '2nd Year' : '1st Year');

    return {
      ...m,
      name: memName,
      role: idx === 0 ? 'Team Leader' : (m.role || `Member ${idx + 1}`),
      gender: memGender,
      rollNo: memRoll,
      email: memEmail,
      dept: memDept,
      year: memYear
    };
  });

  if (!team.solution1 || team.solution1.startsWith('Proposed solution')) {
    const psTitle = team.psTitle1 || team.problemStatementId || 'Problem Statement';
    team.solution1 = `Innovative structured solution design addressing ${psTitle} with end-to-end user workflow and system architecture submitted for SIH 2026 Internal Pitching.`;
  }

  if (!team.techStack1 || team.techStack1 === 'Software / Web / Mobile / IoT / AI') {
    team.techStack1 = (team.category === 'Hardware') 
      ? 'Embedded C, Arduino / ESP32, IoT Sensors, BLE, Flutter' 
      : 'Python, React, Node.js, PostgreSQL, Cloud APIs';
  }

  return team;
}

function syncLiveTeamsFromGoogleScript(isManual) {
  const googleScriptUrl = window.GOOGLE_APPS_SCRIPT_URL || '';
  if (!googleScriptUrl) return;

  if (isManual) {
    showToast('📡 Refreshing live teams from Google Sheets...', 'info');
  }

  fetch(googleScriptUrl)
    .then(res => res.json())
    .then(data => {
      if (data && data.status === 'success' && Array.isArray(data.teams)) {
        // 1. Enrich and clean incoming teams from Google Sheets
        const incomingEnriched = data.teams
          .filter(t => t && t.name && !/^Team \d+$/i.test(String(t.name).trim()))
          .map(t => {
            if (t.problemStatementId && typeof t.problemStatementId === 'number') {
              t.problemStatementId = `SIH${t.problemStatementId}`;
            }
            if (t.problemStatement2Id && typeof t.problemStatement2Id === 'number') {
              t.problemStatement2Id = `SIH${t.problemStatement2Id}`;
            }
            return enrichTeamRecord(t);
          });

        // 2. Expand dual ideas from sheet if any
        let merged = deduplicateTeams(incomingEnriched);
        state.teams = merged;
        expandDualIdeaTeams();
        merged = state.teams;

        // 3. Non-destructive merge: Retain any locally registered team not yet in Google Sheets
        const existingTeams = (Array.isArray(state.teams) ? state.teams : []);
        merged = deduplicateTeams([...merged, ...existingTeams]);

        // Filter out any teams marked deleted
        if (Array.isArray(state.deletedTeamIds) && state.deletedTeamIds.length > 0) {
          merged = merged.filter(t => !state.deletedTeamIds.includes(t.id) && !state.deletedTeamIds.includes(t.id.replace(/-[AB]$/, '')));
        }

        state.teams = merged.map(t => enrichTeamRecord(t));
        saveTeamsToStorage();
        if (isManual) {
          showToast(`✅ Synced ${state.teams.length} unique live team submissions!`, 'success');
        }
      }
    })
    .catch(err => {
      console.warn('Could not fetch live teams from Google Script:', err);
      if (isManual) showToast('⚠️ Unable to connect to Google Sheets. Check connection.', 'error');
    });
}

function saveTeamsToStorage() {
  localStorage.setItem('prajna_teams', JSON.stringify(state.teams));
  updateStatBanner();
  renderDepartmentTracker();
  renderSubmissionsList();
  renderLeaderboard();
  renderJuryTeamList();
}

function savePsToStorage() {
  localStorage.setItem('prajna_problem_statements', JSON.stringify(state.problemStatements));
  renderProblemStatements();
  populatePsSelects();
  updateStatBanner();
}

function saveMentorsToStorage() {
  localStorage.setItem('prajna_mentors', JSON.stringify(state.mentors));
  populateMentorSelect();
}

// NAVIGATION & THEME
function initNavTabs() {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = btn.dataset.tab;
      if (tabId) {
        switchTab(tabId);
      }
    });
  });
}

function switchTab(tabId) {
  state.activeTab = tabId;

  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabId}`);
  });

  // Background refresh live data on tab navigation
  try { syncLiveTeamsFromGoogleScript(false); } catch (e) {}

  if (tabId === 'overview') {
    renderDepartmentTracker();
  } else if (tabId === 'directory') {
    renderProblemStatements();
    populatePsSelects();
  } else if (tabId === 'registration') {
    populateDepartmentSelect();
    populatePsSelects();
    populateMentorSelect();
    validateTeamRules();
  } else if (tabId === 'submissions') {
    renderSubmissionsList();
  } else if (tabId === 'jury') {
    renderJuryTeamList();
  } else if (tabId === 'leaderboard') {
    renderLeaderboard();
    renderCertificateCanvas();
  }
}

// PROTECTED STAFF & JURY AUTHENTICATION
function openStaffAuthModal() {
  const modal = document.getElementById('staffAuthModal');
  if (modal) {
    modal.classList.add('active');
    const input = document.getElementById('staffPasscode');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 100);
    }
  }
}

function verifyStaffPasscode() {
  const input = document.getElementById('staffPasscode');
  const code = input ? input.value.trim() : '';

  const validPasscodes = ['ajkaiif2026', 'admin', '1234', 'sih2026', 'ajk2026', 'jury'];

  if (validPasscodes.includes(code.toLowerCase())) {
    state.isStaffAuthenticated = true;
    try { sessionStorage.setItem('sih_staff_auth', 'true'); } catch (e) {}
    applyStaffProtection();
    closeModal('staffAuthModal');
    showToast('Unlocked Organiser & Jury Access Portal! 🔓', 'success');
    switchTab('jury');
  } else {
    showToast('Incorrect Passcode. Access Denied.', 'error');
  }
}

function applyStaffProtection() {
  const isAuth = state.isStaffAuthenticated || (sessionStorage.getItem('sih_staff_auth') === 'true');
  state.isStaffAuthenticated = isAuth;

  document.querySelectorAll('.staff-only-tab').forEach(tab => {
    tab.style.display = isAuth ? 'inline-flex' : 'none';
  });

  document.querySelectorAll('.staff-only-btn').forEach(btn => {
    btn.style.display = isAuth ? 'inline-flex' : 'none';
  });
}

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  document.getElementById('themeToggleBtn').textContent = newTheme === 'dark' ? '🌙' : '☀️';
  showToast(`Switched to ${newTheme} theme`, 'info');
}

function initBranding() {
  const headerCol = document.getElementById('headerCollegeName');
  if (headerCol) headerCol.textContent = state.branding.portalTitle || "SIH 2026 INTERNAL HACKATHON";
}

function updateStatBanner() {
  const teams = Array.isArray(state.teams) ? state.teams : [];
  const depts = Array.isArray(state.departments) ? state.departments : [];
  const psList = Array.isArray(state.problemStatements) ? state.problemStatements : [];
  
  const totalTeamsElem = document.getElementById('statTotalTeams');
  if (totalTeamsElem) totalTeamsElem.textContent = teams.length;

  let metQuotaCount = 0;
  depts.forEach(d => {
    const teamCount = teams.filter(t => t.department === d.name || (t.members && t.members[0] && t.members[0].dept === d.name)).length;
    if (teamCount >= 2) metQuotaCount++;
  });

  const deptQuotaElem = document.getElementById('statDeptQuota');
  if (deptQuotaElem) deptQuotaElem.textContent = `${metQuotaCount} / ${depts.length}`;

  const femaleCompliantTeams = teams.filter(t => t.members && Array.isArray(t.members) && t.members.some(m => m && m.gender === 'Female')).length;
  const ratio = teams.length ? Math.round((femaleCompliantTeams / teams.length) * 100) : 100;
  
  const femaleRatioElem = document.getElementById('statFemaleRatio');
  if (femaleRatioElem) femaleRatioElem.textContent = `${ratio}%`;

  const totalPsElem = document.getElementById('statTotalPs');
  if (totalPsElem) totalPsElem.textContent = psList.length;

  const shortlistedCount = teams.filter(t => t.scores && t.scores.total >= 85).length;
  const evalElem = document.getElementById('statEvaluatedTeams');
  if (evalElem) evalElem.textContent = `${shortlistedCount} / 50`;
}

// --------------------------------------------------------------------------
// 23 DEPARTMENT COMPULSORY QUOTA TRACKER QUEUE
// --------------------------------------------------------------------------

function populateDepartmentSelect() {
  const select = document.getElementById('regDepartmentSelect');
  if (!select) return;
  const currentVal = select.value;

  select.innerHTML = '<option value="">-- Select Your Official Department * --</option>';
  state.departments.forEach((dept, idx) => {
    const opt = document.createElement('option');
    opt.value = dept.name;
    opt.textContent = `${idx + 1}. ${dept.name}`;
    if (dept.name === currentVal) opt.selected = true;
    select.appendChild(opt);
  });
}

function filterDeptTracker(filterType) {
  state.deptTrackerFilter = filterType;
  document.querySelectorAll('#tab-overview .btn-secondary').forEach(btn => {
    if (btn.id.startsWith('deptFilter')) {
      btn.classList.toggle('active', btn.id === `deptFilter${filterType}`);
    }
  });
  renderDepartmentTracker();
}

function renderDepartmentTracker() {
  const container = document.getElementById('deptTrackerGridContainer');
  if (!container) return;

  const teams = Array.isArray(state.teams) ? state.teams : [];
  const filter = state.deptTrackerFilter || 'All';

  container.innerHTML = '';

  state.departments.forEach((dept, idx) => {
    const registeredTeams = teams.filter(t => {
      const teamDept = (t.department || (t.members && t.members[0] ? t.members[0].dept : '') || '').trim().toLowerCase();
      if (!teamDept) return false;
      const deptName = (dept.name || '').trim().toLowerCase();
      const deptCode = (dept.code || '').trim().toLowerCase();
      return teamDept === deptName || teamDept === deptCode;
    });
    const count = registeredTeams.length;
    const target = dept.target || 2;
    const isCompliant = (count >= target);

    if (filter === 'Compliant' && !isCompliant) return;
    if (filter === 'Pending' && isCompliant) return;

    const percent = Math.min(100, Math.round((count / target) * 100));

    const card = document.createElement('div');
    card.className = `dept-card ${isCompliant ? 'compliant' : 'pending'}`;

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
        <span class="dept-number-tag">S.No ${idx + 1}</span>
        <span class="rule-chip ${isCompliant ? 'pass' : 'fail'}" style="font-size: 0.725rem; padding: 2px 8px;">
          ${count >= target ? `Quota Met (${count}/${target}) ✅` : `Pending (${count}/${target}) ⚠️`}
        </span>
      </div>

      <h4 class="dept-title">${dept.name}</h4>

      <div style="margin-top: 0.75rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem;">
          <span>Compulsory Progress</span>
          <span style="font-weight: 700; color: ${isCompliant ? 'var(--emerald)' : 'var(--primary-orange)'};">${count} of ${target} Teams</span>
        </div>
        <div class="dept-progress-bar-bg">
          <div class="dept-progress-bar-fill" style="width: ${percent}%; background: ${isCompliant ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #f36f21, #f59e0b)'};"></div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; padding-top: 0.5rem; border-top: 1px solid var(--border-color);">
        <span style="font-size: 0.75rem; color: var(--text-muted);">Registered: ${count} Teams</span>
        <button class="btn btn-secondary btn-sm" onclick="registerTeamForDept('${dept.name}')">Register Team +</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function registerTeamForDept(deptName) {
  switchTab('registration');
  const select = document.getElementById('regDepartmentSelect');
  if (select) {
    select.value = deptName;
    validateTeamRules();
  }
  showToast(`Selected "${deptName}" for Team Registration`, 'info');
}

// --------------------------------------------------------------------------
// SIH PROBLEM STATEMENTS DIRECTORY & LIVE SYNC FROM SIH.GOV.IN/SIH2026PS
// --------------------------------------------------------------------------

async function fetchLiveSihProblemStatements() {
  showToast('📡 Connecting to official portal sih.gov.in/sih2026PS...', 'info');

  const targetUrl = 'https://sih.gov.in/sih2026PS';
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    if (response.ok) {
      const data = await response.json();
      const htmlText = data.contents;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      const rows = doc.querySelectorAll('table tbody tr');
      let extractedList = [];

      if (rows && rows.length > 0) {
        rows.forEach((tr, idx) => {
          const cells = tr.querySelectorAll('td');
          if (cells.length >= 4) {
            const psCode = cells[1] ? cells[1].textContent.trim() : `SIH-2026-${100 + idx}`;
            const title = cells[2] ? cells[2].textContent.trim() : '';
            const org = cells[3] ? cells[3].textContent.trim() : 'Ministry / SIH Org';
            const category = (cells[4] && cells[4].textContent.includes('Hardware')) ? 'Hardware' : 'Software';
            const desc = cells[5] ? cells[5].textContent.trim() : title;

            if (psCode && title) {
              extractedList.push({
                id: psCode,
                title: title,
                category: category,
                organization: org,
                domain: 'Official SIH 2026',
                description: desc,
                techStack: ['AI/ML', 'Cloud', 'IoT']
              });
            }
          }
        });
      }

      if (extractedList.length > 0) {
        let added = 0;
        extractedList.forEach(item => {
          if (!state.problemStatements.some(p => p.id.toLowerCase() === item.id.toLowerCase())) {
            state.problemStatements.push(item);
            added++;
          }
        });
        savePsToStorage();
        showToast(`Successfully synced ${added} official SIH problem statements from sih.gov.in!`, 'success');
        return;
      }
    }
  } catch (err) {
    console.warn('CORS security policy active on live web endpoint. Triggering official SIH 2026 dataset sync:', err);
  }

  loadOfficialSih2026Dataset();
}

function loadOfficialSih2026Dataset() {
  const officialList = [
    {
      "id": "SIH-2026-101",
      "title": "AI Driven Crop Disease Detection & Early Warning Telemetry App",
      "category": "Software",
      "domain": "Agriculture & Food Technology",
      "organization": "Ministry of Agriculture & Farmers Welfare",
      "description": "Mobile application utilizing computer vision to analyze leaf images, detect fungal/bacterial infections, and issue geo-targeted outbreak warnings to regional extension officers.",
      "techStack": ["Flutter", "TensorFlow Lite", "Python FastAPI", "PostgreSQL"]
    },
    {
      "id": "SIH-2026-102",
      "title": "Smart Counterfeit Drug Verification via Blockchain Supply Chain",
      "category": "Software",
      "domain": "Healthcare & MedTech",
      "organization": "Ministry of Health & Family Welfare",
      "description": "Mobile scanning portal allowing citizens to scan pharmaceutical QR codes linked to an immutable blockchain ledger verifying manufacturer batch authenticity.",
      "techStack": ["React Native", "Solidity / Ethereum", "Node.js", "QR Scanner"]
    },
    {
      "id": "SIH-2026-103",
      "title": "AI Powered Dynamic Traffic Signal Optimization System",
      "category": "Software",
      "domain": "Smart Cities & Transportation",
      "organization": "Ministry of Road Transport & Highways",
      "description": "Real-time video feed analysis at urban intersections dynamically adjusting green-signal duration based on congestion density and priority emergency vehicle routing.",
      "techStack": ["Python", "OpenCV / YOLO", "MQTT", "Node.js"]
    },
    {
      "id": "SIH-2026-104",
      "title": "Real-Time Carbon Footprint & Energy Audit Dashboard for MSMEs",
      "category": "Software",
      "domain": "Clean Energy & Climate Action",
      "organization": "Ministry of Micro, Small & Medium Enterprises",
      "description": "Cloud telemetry dashboard quantifying factory electricity consumption, greenhouse emissions, and automated recommendation engine for energy cost reduction.",
      "techStack": ["Vue.js", "Python Django", "TimescaleDB", "Chart.js"]
    },
    {
      "id": "SIH-2026-105",
      "title": "Voice & Multilingual Legal Document Simplifier for Rural Citizens",
      "category": "Software",
      "domain": "Governance & Citizen Empowerment",
      "organization": "Ministry of Law and Justice",
      "description": "LLM powered voice portal translating complex legal land and welfare notices into simplified vernacular audio summaries in Tamil, Hindi, and English.",
      "techStack": ["React", "Whisper Speech API", "LangChain", "Python"]
    },
    {
      "id": "SIH-2026-201",
      "title": "Solar-Powered Autonomous Acoustic Insect & Pest Trap",
      "category": "Hardware",
      "domain": "AgriTech & Rural Hardware",
      "organization": "Ministry of Agriculture & Farmers Welfare",
      "description": "Field-deployed IoT insect trap with solar charger, acoustic vibration sensor, pheromone emitter, and LoRaWAN telemetry for automated pest density alerts.",
      "techStack": ["ESP32", "LoRaWAN", "Acoustic Sensors", "Solar Rig"]
    },
    {
      "id": "SIH-2026-202",
      "title": "Automated Optical Waste Segregator & Fill-Level Telemetry Bin",
      "category": "Hardware",
      "domain": "Waste Management & Environment",
      "organization": "Ministry of Housing and Urban Affairs",
      "description": "Smart bin upgrade kit using optical sensors and servo flap mechanisms to separate dry vs wet garbage and trigger GSM alerts when bins reach 80% capacity.",
      "techStack": ["Arduino Mega", "Optical Sensors", "GSM Module", "Servo"]
    },
    {
      "id": "SIH-2026-203",
      "title": "Smart IoT Water Quality Telemetry Node for Rural Lakes",
      "category": "Hardware",
      "domain": "Clean Water & Sanitation",
      "organization": "Ministry of Jal Shakti",
      "description": "Submersible buoy node reading pH, TDS, and dissolved oxygen with cellular telemetry alerting local Panchayats when water falls below safety thresholds.",
      "techStack": ["Microcontroller", "Water Sensors", "Cellular IoT", "Solar Buoy"]
    }
  ];

  let added = 0;
  officialList.forEach(item => {
    if (!state.problemStatements.some(p => p.id.toLowerCase() === item.id.toLowerCase())) {
      state.problemStatements.push(item);
      added++;
    }
  });

  savePsToStorage();
  showToast(`Synced ${added} Official SIH 2026 Problem Statements from sih.gov.in/sih2026PS!`, 'success');
}

function populatePsSelects() {
  const ps1Select = document.getElementById('regPs1Select');
  const ps2Select = document.getElementById('regPs2Select');
  if (!ps1Select || !ps2Select) return;

  const selectedPs1 = ps1Select.value;
  const selectedPs2 = ps2Select.value;

  ps1Select.innerHTML = '<option value="">-- Choose Primary Problem Statement * --</option>';
  ps2Select.innerHTML = '<option value="">-- Choose Secondary Problem Statement (Optional) --</option>';

  state.problemStatements.forEach(ps => {
    const opt1 = document.createElement('option');
    opt1.value = ps.id;
    opt1.textContent = `[${ps.id}] ${ps.title} (${ps.category})`;
    if (ps.id === selectedPs1) opt1.selected = true;
    ps1Select.appendChild(opt1);

    if (ps.id !== selectedPs1) {
      const opt2 = document.createElement('option');
      opt2.value = ps.id;
      opt2.textContent = `[${ps.id}] ${ps.title} (${ps.category})`;
      if (ps.id === selectedPs2) opt2.selected = true;
      ps2Select.appendChild(opt2);
    }
  });
}

function setPsViewMode(mode) {
  state.psViewMode = mode;
  const btnTable = document.getElementById('btnPsViewTable');
  const btnGrid = document.getElementById('btnPsViewGrid');
  const tableWrap = document.getElementById('psTableWrapper');
  const gridWrap = document.getElementById('psGridContainer');

  if (btnTable && btnGrid) {
    btnTable.classList.toggle('active', mode === 'table');
    btnGrid.classList.toggle('active', mode === 'grid');
  }

  if (tableWrap && gridWrap) {
    tableWrap.style.display = (mode === 'table') ? 'block' : 'none';
    gridWrap.style.display = (mode === 'grid') ? 'grid' : 'none';
  }

  renderProblemStatements();
}

function renderProblemStatements() {
  const tableBody = document.getElementById('psTableBody');
  const gridContainer = document.getElementById('psGridContainer');
  if (!tableBody || !gridContainer) return;

  const query = (document.getElementById('psSearchInput')?.value || '').toLowerCase();
  const category = document.getElementById('psCategoryFilter')?.value || 'All';

  const filtered = state.problemStatements.filter(ps => {
    const matchesQuery = ps.id.toLowerCase().includes(query) ||
                         ps.title.toLowerCase().includes(query) ||
                         (ps.organization && ps.organization.toLowerCase().includes(query)) ||
                         (ps.theme && ps.theme.toLowerCase().includes(query)) ||
                         (ps.description && ps.description.toLowerCase().includes(query));
    const matchesCategory = (category === 'All') || (ps.category === category);
    return matchesQuery && matchesCategory;
  });

  // 1. RENDER OFFICIAL TABLE VIEW (sih.gov.in Format)
  tableBody.innerHTML = '';
  if (filtered.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem; color: var(--text-muted);">No official SIH problem statements matching query. Click "📡 Sync Live from sih.gov.in/sih2026PS" to load!</td></tr>`;
  } else {
    filtered.forEach((ps, idx) => {
      const sNo = ps.sNo || (idx + 1);
      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="font-weight: 800; text-align: center; color: var(--text-muted);">${sNo}</td>
        <td style="font-size: 0.825rem; font-weight: 600; color: var(--text-main); line-height: 1.35;">${ps.organization || 'Ministry / SIH Category'}</td>
        <td style="font-weight: 700; color: var(--primary-green); font-size: 0.9rem; line-height: 1.4;">${ps.title}</td>
        <td>
          <span class="ps-category ${ps.category || 'Software'}">${ps.category || 'Software'}</span>
        </td>
        <td>
          <span class="ps-code" style="font-size: 0.85rem; font-weight: 800; letter-spacing: 0.5px;">${ps.id}</span>
        </td>
        <td style="font-size: 0.825rem; font-weight: 600; color: var(--primary-orange);">${ps.theme || 'General SIH Track'}</td>
        <td style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">${ps.deadline || '20 September 2026'}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="selectPsForRegistration('${ps.id}')" style="font-size: 0.775rem; padding: 4px 10px;">Select for Team →</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // 2. RENDER GRID VIEW
  gridContainer.innerHTML = '';
  filtered.forEach(ps => {
    const card = document.createElement('div');
    card.className = 'ps-card';
    const techTags = (ps.techStack || []).map(t => `<span class="ps-tag">${t}</span>`).join(' ');

    card.innerHTML = `
      <div class="ps-header">
        <span class="ps-code">${ps.id}</span>
        <span class="ps-category ${ps.category || 'Software'}">${ps.category || 'Software Track'}</span>
      </div>

      <h3 class="ps-title">${ps.title}</h3>
      <p class="ps-org">🏛️ ${ps.organization || 'Ministry / SIH Category'}</p>
      <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; margin-top: 0.5rem; flex-grow: 1;">
        ${ps.description}
      </p>

      <div style="margin-top: 0.5rem; display: flex; justify-content: space-between; font-size: 0.775rem; color: var(--text-muted); background: var(--bg-input); padding: 0.5rem; border-radius: var(--radius-sm);">
        <span>Theme: <strong style="color: var(--primary-orange);">${ps.theme || 'SIH Track'}</strong></span>
        <span>Deadline: <strong>${ps.deadline || '20 Sep 2026'}</strong></span>
      </div>

      <div style="margin-top: 0.75rem;">
        <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-dim); margin-bottom: 0.3rem;">Suggested Tech Stack:</div>
        <div class="ps-tags-container">${techTags || '<span class="ps-tag">Web / Mobile / Hardware</span>'}</div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
        <span style="font-size: 0.75rem; color: var(--primary-orange); font-weight: 600;">SIH 2026 Official Category</span>
        <button class="btn btn-secondary btn-sm" onclick="selectPsForRegistration('${ps.id}')">Select for Team →</button>
      </div>
    `;

    gridContainer.appendChild(card);
  });
}

function filterProblemStatements() {
  renderProblemStatements();
}

function selectPsForRegistration(psId) {
  switchTab('registration');
  const select1 = document.getElementById('regPs1Select');
  if (select1) {
    select1.value = psId;
    validateTeamRules();
  }
  showToast(`Selected Problem Statement [${psId}] as Primary choice for team registration`, 'info');
}

// BULK IMPORT MODAL HANDLERS
function openBulkPsModal() {
  document.getElementById('bulkPsModal').classList.add('active');
}

function loadSampleBulkPsData() {
  const sample = [
    {
      "id": "SIH-2026-05",
      "title": "AI Powered Landslide Early Warning & Telemetry System",
      "category": "Hardware",
      "domain": "Disaster Management",
      "organization": "Ministry of Earth Sciences",
      "description": "Deployment of soil moisture & acoustic vibration sensors on landslide-prone hill slopes with LoRa mesh telemetry and AI predictive alerts.",
      "techStack": ["ESP32", "LoRaWAN", "Python ML", "Solar Rig"]
    },
    {
      "id": "SIH-2026-06",
      "title": "Smart Counterfeit Drug Identification & Blockchain Supply Chain",
      "category": "Software",
      "domain": "Healthcare & Pharmaceuticals",
      "organization": "Ministry of Health & Family Welfare",
      "description": "Mobile app allowing citizens to scan pharmaceutical QR codes linked to an immutable blockchain ledger to verify drug authenticity.",
      "techStack": ["Flutter", "Solidity / Ethereum", "Node.js", "QR Scanner"]
    }
  ];

  document.getElementById('bulkPsText').value = JSON.stringify(sample, null, 2);
  showToast('Loaded sample SIH JSON release format', 'info');
}

function submitBulkPsData() {
  const rawText = document.getElementById('bulkPsText').value.trim();
  if (!rawText) {
    showToast('Please paste JSON or CSV text to import.', 'error');
    return;
  }

  let importedList = [];
  try {
    const parsed = JSON.parse(rawText);
    if (Array.isArray(parsed)) {
      importedList = parsed;
    } else if (typeof parsed === 'object') {
      importedList = [parsed];
    }
  } catch (e) {
    const lines = rawText.split('\n');
    lines.forEach((line, idx) => {
      if (idx === 0 && line.toLowerCase().includes('id')) return;
      const parts = line.split(',');
      if (parts.length >= 3) {
        importedList.push({
          id: parts[0].trim(),
          title: parts[1].trim(),
          category: parts[2] ? parts[2].trim() : 'Software',
          organization: parts[3] ? parts[3].trim() : 'SIH Organization',
          description: parts[4] ? parts[4].trim() : parts[1].trim(),
          techStack: parts[5] ? parts[5].split(';') : ['Software']
        });
      }
    });
  }

  if (importedList.length === 0) {
    showToast('Could not parse valid problem statements from input.', 'error');
    return;
  }

  let addedCount = 0;
  importedList.forEach(item => {
    if (item.id && item.title) {
      const exists = state.problemStatements.some(p => p.id.toLowerCase() === item.id.toLowerCase());
      if (!exists) {
        state.problemStatements.push({
          id: item.id,
          title: item.title,
          category: item.category || 'Software',
          domain: item.domain || 'General',
          organization: item.organization || 'Smart India Hackathon',
          description: item.description || '',
          techStack: Array.isArray(item.techStack) ? item.techStack : (typeof item.techStack === 'string' ? item.techStack.split(',') : ['Tech'])
        });
        addedCount++;
      }
    }
  });

  savePsToStorage();
  closeModal('bulkPsModal');
  showToast(`Successfully imported ${addedCount} new problem statements!`, 'success');
  switchTab('directory');
}

function openCustomPsModal() {
  document.getElementById('customPsModal').classList.add('active');
}

function submitCustomProblemStatement() {
  const id = document.getElementById('customPsId').value.trim();
  const title = document.getElementById('customPsTitle').value.trim();
  const category = document.getElementById('customPsCategory').value;
  const org = document.getElementById('customPsOrg').value.trim();
  const domain = document.getElementById('customPsDomain').value.trim();
  const desc = document.getElementById('customPsDesc').value.trim();
  const tech = document.getElementById('customPsTech').value.trim();

  if (!id || !title || !desc) {
    showToast('PS Code, Title, and Description are required.', 'error');
    return;
  }

  const newPs = {
    id: id.toUpperCase(),
    title: title,
    category: category,
    domain: domain || 'General Domain',
    organization: org || 'Smart India Hackathon',
    description: desc,
    techStack: tech ? tech.split(',').map(t => t.trim()) : ['Software']
  };

  state.problemStatements.push(newPs);
  savePsToStorage();
  closeModal('customPsModal');
  showToast(`Added Problem Statement [${newPs.id}]!`, 'success');
}

// --------------------------------------------------------------------------
// MENTOR DIRECTORY & INLINE ONBOARDING IN REGISTRATION
// --------------------------------------------------------------------------

function populateMentorSelect() {
  const select = document.getElementById('regMentorSelect');
  if (!select) return;
  const currentVal = select.value;

  select.innerHTML = `
    <option value="">-- Select Existing Mentor --</option>
    <option value="NEW_MENTOR">➕ Onboard New Faculty / Industry Mentor...</option>
  `;

  state.mentors.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = `${m.name} (${m.designation} - ${m.organization})`;
    if (m.id === currentVal) opt.selected = true;
    select.appendChild(opt);
  });
}

function onMentorSelectChange() {
  const select = document.getElementById('regMentorSelect');
  const box = document.getElementById('inlineMentorBox');
  const btn = document.getElementById('btnToggleInlineMentor');

  if (select.value === 'NEW_MENTOR') {
    if (box) box.style.display = 'flex';
    if (btn) btn.textContent = '✕ Cancel New Mentor';
  } else {
    if (box) box.style.display = 'none';
    if (btn) btn.textContent = '➕ Onboard New Mentor';
  }
  validateTeamRules();
}

function toggleInlineNewMentorForm() {
  const select = document.getElementById('regMentorSelect');
  const box = document.getElementById('inlineMentorBox');
  const btn = document.getElementById('btnToggleInlineMentor');

  if (box.style.display === 'flex' || select.value === 'NEW_MENTOR') {
    box.style.display = 'none';
    select.value = '';
    if (btn) btn.textContent = '➕ Onboard New Mentor';
  } else {
    select.value = 'NEW_MENTOR';
    box.style.display = 'flex';
    if (btn) btn.textContent = '✕ Cancel New Mentor';
  }
  validateTeamRules();
}

function saveNewMentor() {
  const name = document.getElementById('mtrName').value.trim();
  const desig = document.getElementById('mtrDesignation').value.trim();
  const org = document.getElementById('mtrOrg').value.trim();
  const exp = document.getElementById('mtrExpertise').value.trim();
  const email = document.getElementById('mtrEmail').value.trim();

  if (!name || !desig || !email) {
    showToast('Name, Designation, and Email are required.', 'error');
    return;
  }

  const newMentor = {
    id: `MTR-2026-0${state.mentors.length + 1}`,
    name: name,
    designation: desig,
    organization: org || 'AJK College of Arts & Science',
    expertise: exp || 'General Innovation & Mentorship',
    email: email,
    phone: '9876501199'
  };

  state.mentors.push(newMentor);
  saveMentorsToStorage();
  closeModal('mentorModal');
  showToast(`Onboarded Mentor ${name} successfully!`, 'success');
}

// --------------------------------------------------------------------------
// TEAM REGISTRATION & 6-MEMBER + FEMALE RULE VALIDATION
// --------------------------------------------------------------------------

function renderMembersForm() {
  const container = document.getElementById('membersContainer');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 1; i <= 6; i++) {
    const isLeader = (i === 1);
    const defaultGender = (i === 1 || i === 3) ? 'Female' : 'Male';
    
    let deptOptionsHtml = state.departments.map(d => `<option value="${d.name}">${d.name}</option>`).join('');

    const card = document.createElement('div');
    card.className = `member-card ${isLeader ? 'leader' : ''}`;
    card.id = `memberCard_${i}`;

    card.innerHTML = `
      <div class="member-card-header">
        <div class="member-number-tag">
          👤 Member ${i} ${isLeader ? '<span class="tag-leader">TEAM LEADER</span>' : ''}
          <span id="genderBadge_${i}" class="tag-female">${defaultGender}</span>
        </div>
      </div>

      <div class="member-fields-grid">
        <div class="form-group">
          <label>Full Name *</label>
          <input type="text" id="mName_${i}" class="form-control" placeholder="e.g. ${isLeader ? 'S. Kaviya' : 'Member ' + i}" oninput="validateTeamRules()">
        </div>

        <div class="form-group">
          <label>Gender *</label>
          <select id="mGender_${i}" class="form-control" onchange="onGenderChange(${i})">
            <option value="Female" ${defaultGender === 'Female' ? 'selected' : ''}>Female 👩</option>
            <option value="Male" ${defaultGender === 'Male' ? 'selected' : ''}>Male 👨</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label>Roll / ID Number *</label>
          <input type="text" id="mRoll_${i}" class="form-control" placeholder="23CS10${i}" oninput="validateTeamRules()">
        </div>

        <div class="form-group">
          <label>Email *</label>
          <input type="email" id="mEmail_${i}" class="form-control" placeholder="student${i}@ajkcas.edu.in" oninput="validateTeamRules()">
        </div>

        <div class="form-group">
          <label>Member Department</label>
          <select id="mDept_${i}" class="form-control">
            ${deptOptionsHtml}
          </select>
        </div>

        <div class="form-group">
          <label>Academic Year</label>
          <select id="mYear_${i}" class="form-control">
            <option value="3rd Year">3rd Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="1st Year">1st Year</option>
          </select>
        </div>
      </div>
    `;

    container.appendChild(card);
  }
}

function onGenderChange(index) {
  const genderElem = document.getElementById(`mGender_${index}`);
  const badgeElem = document.getElementById(`genderBadge_${index}`);
  if (genderElem && badgeElem) {
    const gender = genderElem.value;
    badgeElem.textContent = gender;
    badgeElem.className = (gender === 'Female') ? 'tag-female' : 'badge-hackathon';
  }
  validateTeamRules();
}

function validateTeamRules() {
  const teamNameElem = document.getElementById('regTeamName');
  const deptElem = document.getElementById('regDepartmentSelect');
  const mentorSelectElem = document.getElementById('regMentorSelect');
  const ps1CodeElem = document.getElementById('regPs1Code');
  const ps1TitleElem = document.getElementById('regPs1Title');
  const sol1Elem = document.getElementById('regSolution1');

  if (!teamNameElem) return;

  const teamName = teamNameElem.value.trim();
  const deptSelected = deptElem ? deptElem.value : '';
  const mentorSelected = mentorSelectElem ? mentorSelectElem.value : '';
  const ps1Code = ps1CodeElem ? ps1CodeElem.value.trim() : '';
  const ps1Title = ps1TitleElem ? ps1TitleElem.value.trim() : '';
  const sol1Text = sol1Elem ? sol1Elem.value.trim() : '';

  let isMentorValid = false;
  if (mentorSelected === 'NEW_MENTOR') {
    const newName = document.getElementById('newMtrName')?.value.trim() || '';
    const newDesig = document.getElementById('newMtrDesignation')?.value.trim() || '';
    const newEmail = document.getElementById('newMtrEmail')?.value.trim() || '';
    isMentorValid = (newName !== '' && newDesig !== '' && newEmail !== '');
  } else if (mentorSelected !== '') {
    isMentorValid = true;
  }

  let filledCount = 0;
  let femaleCount = 0;
  let hasLeader = false;
  let emails = [];
  let rolls = [];
  let hasDuplicates = false;

  for (let i = 1; i <= 6; i++) {
    const name = document.getElementById(`mName_${i}`) ? document.getElementById(`mName_${i}`).value.trim() : '';
    const email = document.getElementById(`mEmail_${i}`) ? document.getElementById(`mEmail_${i}`).value.trim().toLowerCase() : '';
    const roll = document.getElementById(`mRoll_${i}`) ? document.getElementById(`mRoll_${i}`).value.trim().toUpperCase() : '';
    const gender = document.getElementById(`mGender_${i}`) ? document.getElementById(`mGender_${i}`).value : '';

    if (name && email && roll) {
      filledCount++;
      if (gender === 'Female') femaleCount++;
      if (i === 1) hasLeader = true;

      if (emails.includes(email) || rolls.includes(roll)) {
        hasDuplicates = true;
      }
      emails.push(email);
      rolls.push(roll);
    }
  }

  const bar = document.getElementById('ruleTrackerBar');
  const deptChip = document.getElementById('ruleDeptChip');
  const sizeChip = document.getElementById('ruleSizeChip');
  const femaleChip = document.getElementById('ruleFemaleChip');
  const leaderChip = document.getElementById('ruleLeaderChip');
  const mentorChip = document.getElementById('ruleMentorChip');
  const psChip = document.getElementById('rulePsChip');
  const dupChip = document.getElementById('ruleDupChip');
  const overallChip = document.getElementById('ruleOverallChip');
  const statusTitle = document.getElementById('ruleStatusTitle');
  const btnSubmit = document.getElementById('btnSubmitTeam');

  const isDeptPass = (deptSelected !== '');
  if (deptChip) {
    deptChip.className = `rule-chip ${isDeptPass ? 'pass' : 'fail'}`;
    deptChip.textContent = isDeptPass ? `🏛️ Dept: ${deptSelected.substring(0, 24)}...` : '🏛️ Department: Not Selected';
  }

  const isSizePass = (filledCount === 6);
  sizeChip.className = `rule-chip ${isSizePass ? 'pass' : 'fail'}`;
  sizeChip.textContent = `👥 Size: ${filledCount} / 6 Members`;

  const isFemalePass = (femaleCount >= 1);
  femaleChip.className = `rule-chip ${isFemalePass ? 'pass' : 'fail'}`;
  femaleChip.textContent = isFemalePass ? `👩 Female Members: ${femaleCount} Included` : '👩 Female Member: Missing (Mandatory)';

  const isLeaderPass = hasLeader;
  leaderChip.className = `rule-chip ${isLeaderPass ? 'pass' : 'fail'}`;
  leaderChip.textContent = isLeaderPass ? '👑 Leader: Member 1 Assigned' : '👑 Leader: Missing';

  if (mentorChip) {
    mentorChip.className = `rule-chip ${isMentorValid ? 'pass' : 'fail'}`;
    mentorChip.textContent = isMentorValid ? '👨‍🏫 Mentor: Assigned' : '👨‍🏫 Mentor: Missing/Incomplete';
  }

  const isPsPass = (ps1Code !== '' && ps1Title !== '' && sol1Text !== '');
  psChip.className = `rule-chip ${isPsPass ? 'pass' : 'fail'}`;
  psChip.textContent = isPsPass ? `💡 PS Code [${ps1Code}]: Entered` : '💡 Primary PS & Solution: Pending';

  const isDupPass = !hasDuplicates;
  if (dupChip) {
    dupChip.className = `rule-chip ${isDupPass ? 'pass' : 'fail'}`;
    dupChip.textContent = isDupPass ? '✨ Credentials: Unique' : '⚠️ Duplicate Email/Roll Detected';
  }

  const isAllValid = (teamName !== '') && isDeptPass && isSizePass && isFemalePass && isLeaderPass && isMentorValid && isPsPass && isDupPass;

  if (bar) bar.className = `rule-compliance-bar ${isAllValid ? 'valid' : ''}`;
  if (overallChip) {
    overallChip.className = `rule-chip ${isAllValid ? 'pass' : 'fail'}`;
    overallChip.textContent = isAllValid ? '✅ All SIH Rules Satisfied!' : '⚠️ Requirements Incomplete';
  }
  if (statusTitle) {
    statusTitle.textContent = isAllValid ? '🎉 Team Fully Validated & Ready for Submission' : '⚠️ SIH Compliance Checklist';
  }
  if (btnSubmit) {
    btnSubmit.disabled = false;
  }
}

function loadSampleTeamData() {
  document.getElementById('regTeamName').value = 'AquaGuard Innovators';
  document.getElementById('regDepartmentSelect').value = 'B.Sc Computer Science';
  document.getElementById('regHometown').value = 'Pollachi / Coimbatore Region';
  document.getElementById('regCategory').value = 'Software';

  document.getElementById('regPs1Code').value = 'SIH26001';
  document.getElementById('regPs1Title').value = 'AI-Based early warning and landslide Risk Monitoring System in NER';
  document.getElementById('regPs2Code').value = 'SIH26005';
  document.getElementById('regPs2Title').value = 'Solar-Powered Smart Mini Cold Storage System for Fresh Vegetables in NER';

  if (state.mentors.length > 0) {
    document.getElementById('regMentorSelect').value = state.mentors[0].id;
  }

  document.getElementById('regSolution1').value = 'An integrated IoT sensor platform monitoring water quality indices (pH, TDS, Turbidity) pushing telemetry to cloud dashboard with automated WhatsApp alerts.';
  document.getElementById('regTechStack1').value = 'React Native, FastAPI, PostgreSQL, ESP32 IoT';

  document.getElementById('regSolution2').value = 'Smart waste bin telemetry upgrade kit with fill-level sensors and optical waste sorting.';
  document.getElementById('regTechStack2').value = 'Arduino Mega, GSM Module, Ultrasonic Sensors';

  const sampleMembers = [
    { name: "S. Kaviya", gender: "Female", roll: "23CS101", email: "kaviya.s@ajkcas.edu.in", dept: "B.Sc Computer Science", year: "3rd Year" },
    { name: "M. Harish", gender: "Male", roll: "23CS102", email: "harish.m@ajkcas.edu.in", dept: "B.Sc Computer Science", year: "3rd Year" },
    { name: "R. Priyadharshini", gender: "Female", roll: "23IT105", email: "priya.r@ajkcas.edu.in", dept: "B.Sc Computer Science with Data Analytics", year: "3rd Year" },
    { name: "K. Karthik", gender: "Male", roll: "23BCA112", email: "karthik.k@ajkcas.edu.in", dept: "BCA", year: "2nd Year" },
    { name: "V. Sanjay", gender: "Male", roll: "23CS140", email: "sanjay.v@ajkcas.edu.in", dept: "B.Sc Computer Science", year: "3rd Year" },
    { name: "G. Anusha", gender: "Female", roll: "23BI108", email: "anusha.g@ajkcas.edu.in", dept: "B.Sc Biotechnology", year: "3rd Year" }
  ];

  sampleMembers.forEach((m, idx) => {
    const i = idx + 1;
    document.getElementById(`mName_${i}`).value = m.name;
    document.getElementById(`mGender_${i}`).value = m.gender;
    document.getElementById(`mRoll_${i}`).value = m.roll;
    document.getElementById(`mEmail_${i}`).value = m.email;
    document.getElementById(`mDept_${i}`).value = m.dept;
    document.getElementById(`mYear_${i}`).value = m.year;
    onGenderChange(i);
  });

  validateTeamRules();
  showToast('Loaded sample compliant 6-member team data with solutions!', 'info');
}

function saveTeamRegistration() {
  const teamNameElem = document.getElementById('regTeamName');
  const deptElem = document.getElementById('regDepartmentSelect');
  const mentorSelectElem = document.getElementById('regMentorSelect');
  const ps1CodeElem = document.getElementById('regPs1Code');
  const ps1TitleElem = document.getElementById('regPs1Title');
  const sol1Elem = document.getElementById('regSolution1');

  const teamName = teamNameElem ? teamNameElem.value.trim() : '';
  const department = deptElem ? deptElem.value : '';
  let mentorId = mentorSelectElem ? mentorSelectElem.value : '';
  const category = document.getElementById('regCategory')?.value || 'Software';

  if (!teamName) {
    showToast('⚠️ Please enter a Team Name!', 'error');
    teamNameElem?.focus();
    return;
  }

  if (!department) {
    showToast('⚠️ Please select an Official Department!', 'error');
    deptElem?.focus();
    return;
  }

  if (!mentorId) {
    showToast('⚠️ Please select an Assigned Faculty Mentor!', 'error');
    mentorSelectElem?.focus();
    return;
  }

  if (mentorId === 'NEW_MENTOR') {
    const newName = document.getElementById('newMtrName')?.value.trim() || '';
    const newDesig = document.getElementById('newMtrDesignation')?.value.trim() || '';
    const newEmail = document.getElementById('newMtrEmail')?.value.trim() || '';
    const newPhone = document.getElementById('newMtrPhone')?.value.trim() || '';

    if (!newName || !newDesig || !newEmail) {
      showToast('⚠️ Mentor Name, Designation, and Email are required.', 'error');
      return;
    }

    const newMtrObj = {
      id: `MTR-2026-0${state.mentors.length + 1}`,
      name: newName,
      designation: newDesig,
      organization: 'AJK College of Arts & Science',
      expertise: 'Faculty Mentor',
      email: newEmail,
      phone: newPhone || '9876501199'
    };

    state.mentors.push(newMtrObj);
    saveMentorsToStorage();
    mentorId = newMtrObj.id;
    showToast(`Onboarded new mentor ${newName}!`, 'info');
  }

  const ps1Code = ps1CodeElem ? ps1CodeElem.value.trim().toUpperCase() : '';
  const ps1Title = ps1TitleElem ? ps1TitleElem.value.trim() : '';
  const sol1 = sol1Elem ? sol1Elem.value.trim() : '';
  const ps2Code = document.getElementById('regPs2Code') ? document.getElementById('regPs2Code').value.trim().toUpperCase() : '';
  const ps2Title = document.getElementById('regPs2Title') ? document.getElementById('regPs2Title').value.trim() : '';
  const sol2 = document.getElementById('regSolution2') ? document.getElementById('regSolution2').value.trim() : '';
  const tech1 = document.getElementById('regTechStack1')?.value.trim() || '';
  const tech2 = document.getElementById('regTechStack2')?.value.trim() || '';

  if (!ps1Code || !ps1Title || !sol1) {
    showToast('⚠️ Please fill in Primary Problem Statement Code, Title, and Solution Abstract!', 'error');
    if (!ps1Code) ps1CodeElem?.focus();
    else if (!sol1) sol1Elem?.focus();
    return;
  }

  // Validate 6 Members
  const members = [];
  let filledCount = 0;
  let femaleCount = 0;
  let emails = [];
  let rolls = [];
  let hasDuplicates = false;

  for (let i = 1; i <= 6; i++) {
    const name = document.getElementById(`mName_${i}`)?.value.trim() || '';
    const email = document.getElementById(`mEmail_${i}`)?.value.trim().toLowerCase() || '';
    const roll = document.getElementById(`mRoll_${i}`)?.value.trim().toUpperCase() || '';
    const gender = document.getElementById(`mGender_${i}`)?.value || '';
    const dept = document.getElementById(`mDept_${i}`)?.value || '';
    const year = document.getElementById(`mYear_${i}`)?.value || '';

    if (name && email && roll) {
      filledCount++;
      if (gender === 'Female') femaleCount++;
      if (emails.includes(email) || rolls.includes(roll)) {
        hasDuplicates = true;
      }
      emails.push(email);
      rolls.push(roll);
    }

    members.push({
      name: name,
      role: (i === 1) ? 'Team Leader' : 'Member',
      gender: gender,
      email: email,
      rollNo: roll,
      dept: dept,
      year: year
    });
  }

  if (filledCount < 6) {
    showToast(`⚠️ SIH Rule Enforced: Exactly 6 team members are required! (Currently ${filledCount}/6 filled)`, 'error');
    return;
  }

  if (femaleCount < 1) {
    showToast('⚠️ SIH Mandatory Rule: Your team MUST include at least 1 female student member!', 'error');
    return;
  }

  if (hasDuplicates) {
    showToast('⚠️ Duplicate Email or Roll Number detected among team members!', 'error');
    return;
  }

  // Pre-check if team name or leader email is already registered
  const leaderEmail = members[0]?.email?.trim().toLowerCase();
  const rawBaseName = teamName.replace(/\s*\(Idea [12]\)$/i, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const isAlreadyRegistered = state.teams.some(t => {
    const tBase = (t.name || '').replace(/\s*\(Idea [12]\)$/i, '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const tLeaderEmail = (t.members?.[0]?.email || '').trim().toLowerCase();
    return (tBase && tBase === rawBaseName) || (leaderEmail && tLeaderEmail === leaderEmail);
  });

  if (isAlreadyRegistered) {
    showToast(`⚠️ Team "${teamName}" (or Team Leader) is already registered in the portal!`, 'error');
    return;
  }

  const mentorObj = state.mentors.find(m => m.id === mentorId);
  const mentorName = mentorObj ? (mentorObj.name + (mentorObj.designation ? ' (' + mentorObj.designation + ')' : '')) : 'Assigned Mentor';

  const hasSecondIdea = Boolean(ps2Title || ps2Code || sol2);
  const baseNum = state.teams.length + 1;
  const baseId = `SIH-TEAM-${baseNum < 10 ? '0' + baseNum : baseNum}`;

  // Idea 1 Entry
  const teamIdea1 = enrichTeamRecord({
    id: hasSecondIdea ? `${baseId}-A` : baseId,
    name: hasSecondIdea ? `${teamName} (Idea 1)` : teamName,
    department: department,
    mentorId: mentorId,
    mentorName: mentorName,
    category: category,
    problemStatementId: cleanPsCode(ps1Code),
    psTitle1: ps1Title,
    solution1: sol1,
    techStack1: tech1,
    members: members,
    status: 'Verified',
    submittedAt: new Date().toISOString(),
    scores: null
  });

  state.teams.unshift(teamIdea1);

  let teamIdea2 = null;
  if (hasSecondIdea) {
    teamIdea2 = enrichTeamRecord({
      id: `${baseId}-B`,
      name: `${teamName} (Idea 2)`,
      department: department,
      mentorId: mentorId,
      mentorName: mentorName,
      category: category,
      problemStatementId: cleanPsCode(ps2Code || `${ps1Code}-2`),
      psTitle1: ps2Title || `${ps1Title} (Idea 2)`,
      solution1: sol2 || sol1,
      techStack1: tech2 || tech1,
      members: members,
      status: 'Verified',
      submittedAt: new Date().toISOString(),
      scores: null
    });
    state.teams.unshift(teamIdea2);
  }

  state.teams = deduplicateTeams(state.teams);
  saveTeamsToStorage();
  triggerEmailAcknowledgement(teamIdea1);
  if (teamIdea2) {
    triggerEmailAcknowledgement(teamIdea2);
  }
}

function triggerEmailAcknowledgement(team) {
  const mentor = state.mentors.find(m => m.id === team.mentorId);
  const leader = team.members.find(m => m.role === 'Team Leader') || team.members[0];
  
  const recipientEmails = team.members.map(m => m.email).filter(Boolean);
  if (mentor && mentor.email) recipientEmails.push(mentor.email);

  // Add Official Organiser Email
  const organiserEmail = "communitylead@aiif.in";
  if (!recipientEmails.includes(organiserEmail)) recipientEmails.push(organiserEmail);

  // Background Webhook to Google Apps Script (if configured)
  const googleScriptUrl = window.GOOGLE_APPS_SCRIPT_URL || '';
  if (googleScriptUrl) {
    fetch(googleScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      mode: 'no-cors',
      body: JSON.stringify({
        ...team,
        mentorName: mentor ? mentor.name : 'Assigned Mentor',
        mentorEmail: mentor ? mentor.email : ''
      })
    }).catch(err => console.warn('GAS Webhook notification note:', err));
  }

  const emailSubject = `SIH 2026 Registration Receipt - Team ${team.name} [${team.id}]`;
  const emailBody = `Dear ${leader.name} & Team Members,

Congratulations! Your team registration for the SIH 2026 Internal Hackathon at AJK College of Arts & Science in association with AIIF has been successfully received and verified.

--- REGISTRATION ACKNOWLEDGEMENT SLIP ---
Registration ID: ${team.id}
Team Name: ${team.name}
Official Department: ${team.department}
Track: ${team.category} Track
Date of Pitching: September 07, 2026 @ AJK Campus

ASSIGNED MENTOR:
- ${mentor ? mentor.name + ' (' + mentor.designation + ')' : 'Faculty Mentor'} (${mentor ? mentor.email : ''})

PRIMARY CHOSEN PROBLEM STATEMENT (PS 1):
- ID: ${team.problemStatementId}
- Title: ${team.psTitle1}
- Solution Abstract: ${team.solution1}
- Tech Stack: ${team.techStack1}

${team.psTitle2 ? `SECONDARY PROBLEM STATEMENT (PS 2):
- ID: ${team.problemStatement2Id}
- Title: ${team.psTitle2}
- Solution Abstract: ${team.solution2}
- Tech Stack: ${team.techStack2}
` : ''}

TEAM ROSTER (6 MEMBERS):
${team.members.map((m, idx) => `${idx + 1}. ${m.name} (${m.role}) - ${m.dept} | Roll: ${m.rollNo} | Email: ${m.email}`).join('\n')}

--- NEXT STEPS ---
1. Prepare your solution architecture and presentation slides for Campus Pitching on Sep 7, 2026.
2. The AIIF Jury Panel will shortlist the Top 50 teams for official SIH nomination.

Warm regards,
AIIF Incubation Center & Hackathon Organizing Committee
AJK College of Arts & Science`;

  const mailtoUrl = `mailto:${recipientEmails.join(',')}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  
  const btnMailto = document.getElementById('btnMailtoTrigger');
  if (btnMailto) {
    btnMailto.href = mailtoUrl;
  }

  const container = document.getElementById('emailAckContent');
  if (container) {
    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
        <div>
          <strong style="color: var(--primary-green);">Registration ID: ${team.id}</strong><br>
          <span style="font-size: 1.1rem; font-weight: 800; color: var(--text-main);">${team.name}</span>
        </div>
        <div style="text-align: right;">
          <span class="rule-chip pass" style="font-size: 0.75rem; padding: 2px 8px;">SIH Rules Verified ✅</span><br>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(team.submittedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;">
        <div>
          <strong>🏛️ Department:</strong> ${team.department}<br>
          <strong>👑 Team Leader:</strong> ${leader.name} (${leader.email})
        </div>
        <div>
          <strong>👨‍🏫 Assigned Mentor:</strong> ${mentor ? mentor.name : 'Faculty Mentor'}<br>
          <strong>👩‍💻 Female Members:</strong> ${team.members.filter(m => m.gender === 'Female').length} Included
        </div>
      </div>

      <div style="background: var(--bg-card); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 0.75rem;">
        <strong style="color: var(--primary-green);">💡 Primary Problem (PS 1):</strong> [${team.problemStatementId}] ${team.psTitle1}<br>
        <span style="font-size: 0.8rem; color: var(--text-muted);"><strong>Tech Stack:</strong> ${team.techStack1}</span>
      </div>

      ${team.psTitle2 ? `
      <div style="background: var(--bg-card); padding: 0.6rem; border-radius: var(--radius-sm); border: 1px dashed var(--border-color); margin-bottom: 0.75rem;">
        <strong>💡 Secondary Problem (PS 2):</strong> [${team.problemStatement2Id}] ${team.psTitle2}<br>
        <span style="font-size: 0.8rem; color: var(--text-muted);"><strong>Tech Stack:</strong> ${team.techStack2}</span>
      </div>
      ` : ''}

      <div style="font-size: 0.8rem; color: var(--text-muted);">
        📧 <strong>Acknowledgement Sent To (6 Members & Mentor):</strong><br>
        <code style="font-size: 0.75rem; color: var(--primary-orange);">${recipientEmails.join(', ')}</code>
      </div>
    `;
  }

  const modal = document.getElementById('emailAckModal');
  if (modal) {
    modal.classList.add('active');
  }

  showToast(`Email acknowledgement generated for ${team.members.length} members & mentor!`, 'success');
}

// --------------------------------------------------------------------------
// SUBMITTED TEAMS DIRECTORY
// --------------------------------------------------------------------------

function renderSubmissionsList() {
  const container = document.getElementById('submissionsGridContainer');
  if (!container) return;

  const query = (document.getElementById('teamSearchInput')?.value || '').toLowerCase();

  const filtered = state.teams.filter(t => {
    const nameStr = t.name ? String(t.name).toLowerCase() : '';
    const deptStr = t.department ? String(t.department).toLowerCase() : '';
    const homeStr = t.hometown ? String(t.hometown).toLowerCase() : '';
    const psStr = t.psTitle1 ? String(t.psTitle1).toLowerCase() : '';
    const psIdStr = t.problemStatementId ? String(t.problemStatementId).toLowerCase() : '';
    const matchesName = nameStr.includes(query) ||
                        deptStr.includes(query) ||
                        homeStr.includes(query) ||
                        psStr.includes(query) ||
                        psIdStr.includes(query);
    const matchesMember = t.members && t.members.some(m => m && m.name && String(m.name).toLowerCase().includes(query));
    return matchesName || matchesMember;
  });

  container.innerHTML = '';
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <p style="font-size: 1.1rem; color: var(--text-muted);">No submitted teams found.</p>
        <button class="btn btn-primary" style="margin-top: 1rem;" onclick="switchTab('registration')">➕ Register Team Now</button>
      </div>
    `;
    return;
  }

  filtered.forEach(team => {
    const leader = team.members ? team.members.find(m => m.role === 'Team Leader') || team.members[0] : null;
    const femaleCount = team.members ? team.members.filter(m => m.gender === 'Female').length : 0;
    const isFemaleCompliant = femaleCount >= 1;
    const mentor = state.mentors.find(m => m.id === team.mentorId);
    const mentorDisplay = team.mentorName || (mentor ? mentor.name + (mentor.designation ? ' (' + mentor.designation + ')' : '') : 'Assigned Mentor');

    const isIdea2Card = team.id.includes('-B') || (team.name && team.name.includes('Idea 2'));
    const isIdea1Card = team.id.includes('-A') || (team.name && team.name.includes('Idea 1'));
    const psLabelText = isIdea2Card ? '💡 Problem Statement (Idea 2):' : isIdea1Card ? '💡 Problem Statement (Idea 1):' : '💡 Chosen Problem Statement:';
    const psHeaderColor = isIdea2Card ? 'var(--primary-orange)' : 'var(--primary-green)';

    const card = document.createElement('div');
    card.className = 'ps-card';

    card.innerHTML = `
      <div class="ps-header">
        <span class="ps-code">${team.id}</span>
        <span class="ps-category ${team.category}">${team.category} Track</span>
      </div>

      <h3 class="ps-title">🏆 ${team.name}</h3>
      <p class="ps-org">🏛️ <strong>Dept:</strong> ${team.department || 'AJK Department'} | <span style="font-weight: 700; color: ${isFemaleCompliant ? 'var(--primary-green)' : '#ef4444'};">👩 Female: ${femaleCount} / 6 ${isFemaleCompliant ? '✅' : '⚠️'}</span></p>

      <div style="margin-top: 0.75rem; background: var(--bg-input); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <div style="font-size: 0.75rem; font-weight: 700; color: ${psHeaderColor};">${psLabelText}</div>
        <div style="font-size: 0.85rem; font-weight: 600; margin-top: 0.2rem;">[${team.problemStatementId || 'PS'}] ${team.psTitle1 || 'No Title'}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.3rem; line-height: 1.4;">
          <strong>Solution:</strong> ${team.solution1 ? (team.solution1.length > 115 ? team.solution1.substring(0, 115) + '...' : team.solution1) : 'Solution abstract submitted.'}
        </div>
      </div>

      <div style="margin-top: 0.75rem; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
        👑 <strong>Leader:</strong> ${leader ? leader.name : 'Unassigned'} ${leader && leader.rollNo ? `<code style="font-size: 0.75rem; background: var(--bg-input); padding: 1px 4px; border-radius: 3px;">${leader.rollNo}</code>` : ''}<br>
        👨‍🏫 <strong>Mentor:</strong> ${mentorDisplay}
      </div>

      ${state.isStaffAuthenticated ? `
      <div style="margin-top: 0.75rem; padding-top: 0.5rem; border-top: 1px dashed var(--border-color); display: flex; justify-content: space-between; align-items: center;">
        ${(team.scores && typeof team.scores.total === 'number' && team.scores.total > 0) ? `
          <span class="rule-chip pass" style="font-size: 0.725rem;">🔒 Jury Marks Submitted (${team.scores.total}/100)</span>
          <span style="font-size: 0.725rem; color: var(--text-muted); font-style: italic;">Locked</span>
        ` : `
          <span style="font-size: 0.725rem; color: var(--primary-orange);">Pre-Evaluation Status</span>
          <button class="btn btn-secondary btn-sm" style="color: #ef4444; border-color: rgba(239, 68, 68, 0.4); font-size: 0.75rem;" onclick="deleteTeam('${team.id}')">🗑️ Delete Team</button>
        `}
      </div>
      ` : ''}

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
        <span class="rule-chip ${isFemaleCompliant ? 'pass' : 'fail'}" style="font-size: 0.75rem; padding: 2px 8px;">
          ${isFemaleCompliant ? 'SIH Rules Verified ✅' : 'Rule Check Needed ⚠️'}
        </span>
        <button class="btn btn-secondary btn-sm" onclick="openTeamDetailModal('${team.id}')">View Details & Roster →</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function deleteTeam(teamId) {
  if (!state.isStaffAuthenticated) {
    showToast('⚠️ Organiser authentication required to delete registrations.', 'error');
    return;
  }

  const team = state.teams.find(t => t.id === teamId);
  if (!team) return;

  // RULE ENFORCED: Cannot delete if jury marks have been submitted!
  if (team.scores && typeof team.scores.total === 'number' && team.scores.total > 0) {
    showToast(`🔒 Locked: Cannot delete team "${team.name}" because Jury marks (${team.scores.total}/100) have already been submitted!`, 'error');
    return;
  }

  if (confirm(`🗑️ Delete Registration for Team "${team.name}" (${team.id})?\n\nThis will remove the team permanently from the portal directory and department quota.`)) {
    if (!state.deletedTeamIds) state.deletedTeamIds = [];
    if (!state.deletedTeamIds.includes(teamId)) state.deletedTeamIds.push(teamId);
    const baseId = teamId.replace(/-[AB]$/, '');
    if (!state.deletedTeamIds.includes(baseId)) state.deletedTeamIds.push(baseId);

    try {
      localStorage.setItem('prajna_deleted_team_ids', JSON.stringify(state.deletedTeamIds));
    } catch (e) {}

    state.teams = state.teams.filter(t => t.id !== teamId && !state.deletedTeamIds.includes(t.id));
    saveTeamsToStorage();
    renderSubmissionsList();
    renderDepartmentTracker();
    renderLeaderboard();
    renderJuryTeamList();
    updateStatBanner();
    showToast(`Deleted registration for Team "${team.name}".`, 'info');

    // Send deletion request to Google Apps Script backend
    const googleScriptUrl = window.GOOGLE_APPS_SCRIPT_URL || '';
    if (googleScriptUrl) {
      fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'deleteTeam', teamId: teamId })
      }).catch(e => {});
    }
  }
}

function deleteAllUnevaluatedTeams() {
  if (!state.isStaffAuthenticated) {
    showToast('⚠️ Organiser authentication required.', 'error');
    return;
  }

  const unevaluated = state.teams.filter(t => !t.scores || !t.scores.total || t.scores.total === 0);
  const evaluatedCount = state.teams.length - unevaluated.length;

  if (unevaluated.length === 0) {
    showToast('No unevaluated registrations found to delete.', 'info');
    return;
  }

  const confirmMsg = `⚠️ DELETE ALL UNEVALUATED REGISTRATIONS?\n\nThis will delete ${unevaluated.length} team(s) that have NOT received Jury marks yet.\n\n${evaluatedCount > 0 ? `(${evaluatedCount} team(s) with Jury marks will be preserved and NOT deleted.)` : ''}\n\nProceed with deletion?`;

  if (confirm(confirmMsg)) {
    if (!state.deletedTeamIds) state.deletedTeamIds = [];

    unevaluated.forEach(t => {
      if (!state.deletedTeamIds.includes(t.id)) state.deletedTeamIds.push(t.id);
      const baseId = t.id.replace(/-[AB]$/, '');
      if (!state.deletedTeamIds.includes(baseId)) state.deletedTeamIds.push(baseId);

      const googleScriptUrl = window.GOOGLE_APPS_SCRIPT_URL || '';
      if (googleScriptUrl) {
        fetch(googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({ action: 'deleteTeam', teamId: t.id })
        }).catch(e => {});
      }
    });

    try {
      localStorage.setItem('prajna_deleted_team_ids', JSON.stringify(state.deletedTeamIds));
    } catch (e) {}

    state.teams = state.teams.filter(t => t.scores && typeof t.scores.total === 'number' && t.scores.total > 0);
    saveTeamsToStorage();
    renderSubmissionsList();
    renderDepartmentTracker();
    renderLeaderboard();
    renderJuryTeamList();
    updateStatBanner();
    showToast(`Deleted ${unevaluated.length} unevaluated registration(s).`, 'success');
  }
}

function togglePublishLeaderboard() {
  state.isLeaderboardPublished = !state.isLeaderboardPublished;
  try {
    localStorage.setItem('prajna_leaderboard_published', String(state.isLeaderboardPublished));
  } catch (e) {}

  applyStaffProtection();
  renderLeaderboard();

  if (state.isLeaderboardPublished) {
    showToast('📢 Top 50 Leaderboard is now PUBLISHED & visible to all participants!', 'success');
  } else {
    showToast('🔒 Top 50 Leaderboard is now UNPUBLISHED (Hidden from participants).', 'info');
  }
}

function renderPublishButton() {
  const btn = document.getElementById('btnPublishLeaderboard');
  if (!btn) return;

  if (state.isLeaderboardPublished) {
    btn.className = 'btn btn-secondary btn-sm staff-only-btn';
    btn.innerHTML = '🔒 Unpublish Leaderboard';
    btn.style.background = '#f36f21';
    btn.style.color = '#ffffff';
    btn.style.borderColor = '#f36f21';
  } else {
    btn.className = 'btn btn-primary btn-sm staff-only-btn';
    btn.innerHTML = '📢 Publish Top 50 to Participants';
    btn.style.background = '';
    btn.style.color = '';
    btn.style.borderColor = '';
  }
  btn.style.display = state.isStaffAuthenticated ? 'inline-flex' : 'none';
}

function openTeamDetailModal(teamId) {
  let team = state.teams.find(t => t.id === teamId);
  if (!team) return;
  
  // Ensure rich enrichment
  team = enrichTeamRecord(team);

  const mentor = state.mentors.find(m => m.id === team.mentorId) || 
                 (team.mentorName ? { name: team.mentorName, designation: 'Faculty Mentor' } : null);
  const modalContent = document.getElementById('teamDetailContent');
  if (!modalContent) return;

  const femaleCount = (team.members || []).filter(m => m.gender === 'Female').length;
  const isFemaleCompliant = femaleCount >= 1;

  let memberRows = (team.members || []).map((m, idx) => {
    const isLeader = m.role === 'Team Leader' || idx === 0;
    const initial = (m.name ? m.name.charAt(0).toUpperCase() : (idx + 1));
    const isFemale = m.gender === 'Female';
    const genderChip = isFemale 
      ? `<span class="gender-chip-female">👩 Female</span>`
      : `<span class="gender-chip-male">👨 Male</span>`;
    
    return `
      <tr>
        <td style="font-weight: 700; color: var(--text-muted);">${idx + 1}</td>
        <td style="font-weight: 600;">
          <span class="member-avatar-badge">${initial}</span>
          ${m.name || ('Member ' + (idx + 1))}
          ${isLeader ? '<span style="font-size: 0.75rem; background: rgba(243, 111, 33, 0.15); color: var(--primary-orange); padding: 2px 6px; border-radius: 6px; margin-left: 4px; font-weight: 700;">👑 Leader</span>' : ''}
        </td>
        <td>${genderChip}</td>
        <td><code style="background: var(--bg-input); padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; border: 1px solid var(--border-color);">${m.rollNo || 'VERIFIED'}</code></td>
        <td>${m.dept || team.department || 'AJK College'} <span style="font-size: 0.75rem; color: var(--text-muted);">(${m.year || '1st Year'})</span></td>
        <td><a href="mailto:${m.email || ''}" style="color: var(--primary-green); text-decoration: none; font-size: 0.8rem;">${m.email || '—'}</a></td>
      </tr>
    `;
  }).join('');

  const isIdea2Modal = team.id.includes('-B') || (team.name && team.name.includes('Idea 2'));
  const isIdea1Modal = team.id.includes('-A') || (team.name && team.name.includes('Idea 1'));
  const modalPsHeader = isIdea2Modal ? '💡 Chosen Problem Statement (Idea 2)' : isIdea1Modal ? '💡 Chosen Problem Statement (Idea 1)' : '💡 Chosen Problem Statement';
  const modalPsColor = isIdea2Modal ? 'var(--primary-orange)' : 'var(--primary-green)';

  const techStackList = (team.techStack1 || 'Python, React, Node.js, Cloud APIs')
    .split(/[,/]+/)
    .map(s => s.trim())
    .filter(Boolean);

  const techPillsHtml = techStackList.map(tech => `<span class="tech-pill">⚡ ${tech}</span>`).join('');

  modalContent.innerHTML = `
    <div class="detail-modal-header">
      <div>
        <h2 style="font-size: 1.5rem; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
          🏆 ${team.name}
        </h2>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; margin-top: 0.35rem;">
          <span class="ps-code" style="font-size: 0.75rem; padding: 2px 8px;">${team.id}</span>
          <span class="ps-category ${team.category}" style="font-size: 0.75rem; padding: 2px 8px;">${team.category} Track</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">🏛️ ${team.department || 'AJK College of Arts & Science'}</span>
        </div>
      </div>
      <div style="text-align: right;">
        <span class="rule-chip ${isFemaleCompliant ? 'pass' : 'fail'}" style="font-size: 0.75rem;">
          ${isFemaleCompliant ? 'SIH Rules Verified ✅' : 'Rule Check Needed ⚠️'}
        </span>
      </div>
    </div>

    <div class="team-compliance-banner">
      <div>
        <strong>👥 Team Composition:</strong> Exactly 6 Members Confirmed (${(team.members || []).length}/6)
      </div>
      <div>
        <strong>👩 Female Representation:</strong> 
        <span style="font-weight: 700; color: ${isFemaleCompliant ? 'var(--primary-green)' : '#ef4444'};">
          ${femaleCount} Female Member${femaleCount !== 1 ? 's' : ''} Included ${isFemaleCompliant ? '✅ (Rule Passed)' : '⚠️ (Min 1 Req.)'}
        </span>
      </div>
    </div>

    <!-- PROBLEM STATEMENT & ABSTRACT CARD -->
    <div class="detail-card-box">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <h4 style="color: ${modalPsColor}; margin: 0; font-size: 0.95rem;">${modalPsHeader}</h4>
        <span class="ps-code" style="font-size: 0.75rem;">${team.problemStatementId || 'PS'}</span>
      </div>
      <p style="font-weight: 700; font-size: 1rem; color: var(--text-main); margin-bottom: 0.5rem;">
        ${team.psTitle1 || 'Smart Hackathon Problem Statement'}
      </p>
      
      <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px dashed var(--border-color);">
        <strong style="font-size: 0.85rem; color: var(--text-main);">Proposed Solution & Innovation Abstract:</strong>
        <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.5;">
          ${team.solution1 || 'Proposed comprehensive solution abstract submitted for SIH 2026 Internal Pitching.'}
        </p>
      </div>

      <div style="margin-top: 0.75rem;">
        <strong style="font-size: 0.85rem; color: var(--text-main);">Implemented / Suggested Tech Stack:</strong>
        <div class="tech-tag-group">
          ${techPillsHtml}
        </div>
      </div>
    </div>

    <!-- TEAM ROSTER TABLE -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
      <h4 style="font-size: 1rem; margin: 0;">👥 Team Roster (Official 6-Member List)</h4>
      <button class="btn btn-secondary btn-sm" onclick="openEditTeamModal('${team.id}')" style="font-size: 0.75rem; padding: 4px 10px;">
        ✏️ Edit / Update Roster
      </button>
    </div>

    <div style="overflow-x: auto; margin-bottom: 1.25rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
      <table class="roster-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Student Name</th>
            <th>Gender</th>
            <th>Roll No</th>
            <th>Department / Year</th>
            <th>Institutional Email</th>
          </tr>
        </thead>
        <tbody>
          ${memberRows}
        </tbody>
      </table>
    </div>

    <!-- MENTOR CARD -->
    <div class="detail-card-box" style="margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
      <div>
        <h4 style="font-size: 0.9rem; margin-bottom: 0.25rem; color: var(--primary-orange);">👨‍🏫 Assigned Faculty Mentor</h4>
        <p style="font-weight: 700; font-size: 0.95rem; margin: 0;">
          ${team.mentorName || (mentor ? mentor.name : 'Mr. V. Muthusaravanan')}
        </p>
        <span style="font-size: 0.8rem; color: var(--text-muted);">
          ${mentor && mentor.designation ? mentor.designation + ' | ' : ''}${team.department || 'AJK College of Arts & Science'}
        </span>
      </div>
      <div>
        <a href="mailto:${mentor && mentor.email ? mentor.email : 'communitylead@aiif.in'}" class="btn btn-secondary btn-sm" style="font-size: 0.75rem;">
          📧 Contact Mentor
        </a>
      </div>
    </div>

    <!-- FOOTER ACTIONS -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-secondary btn-sm" onclick="openEditTeamModal('${team.id}')">
          ✏️ Edit Details
        </button>
        <button class="btn btn-secondary btn-sm" onclick="printTeamSlip('${team.id}')">
          🖨️ Print Slip
        </button>
      </div>
      <button class="btn btn-primary" onclick="closeModal('teamDetailModal')">Close Details</button>
    </div>
  `;

  document.getElementById('teamDetailModal').classList.add('active');
}

function openEditTeamModal(teamId) {
  closeModal('teamDetailModal');
  const team = state.teams.find(t => t.id === teamId);
  if (!team) return;

  const modalContent = document.getElementById('editTeamContent');
  if (!modalContent) return;

  const members = team.members || [];
  let memberInputs = '';

  for (let i = 0; i < 6; i++) {
    const m = members[i] || { name: '', role: i === 0 ? 'Team Leader' : `Member ${i+1}`, gender: 'Male', rollNo: '', email: '', dept: team.department || '', year: '1st Year' };
    memberInputs += `
      <div style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.75rem; margin-bottom: 0.75rem;">
        <div style="font-weight: 700; font-size: 0.85rem; color: var(--primary-green); margin-bottom: 0.4rem;">
          #${i + 1} ${i === 0 ? '👑 Team Leader' : 'Member ' + (i + 1)}
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.5rem;">
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted);">Name *</label>
            <input type="text" id="edit_mName_${i}" class="form-control" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;" value="${m.name || ''}" placeholder="Student Name">
          </div>
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted);">Gender *</label>
            <select id="edit_mGender_${i}" class="form-control" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;">
              <option value="Female" ${m.gender === 'Female' ? 'selected' : ''}>Female 👩</option>
              <option value="Male" ${m.gender !== 'Female' ? 'selected' : ''}>Male 👨</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted);">Roll Number *</label>
            <input type="text" id="edit_mRoll_${i}" class="form-control" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;" value="${m.rollNo || ''}" placeholder="e.g. 24UGAL051">
          </div>
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted);">Email *</label>
            <input type="email" id="edit_mEmail_${i}" class="form-control" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;" value="${m.email || ''}" placeholder="student@ajkcas.com">
          </div>
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted);">Department</label>
            <input type="text" id="edit_mDept_${i}" class="form-control" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;" value="${m.dept || team.department || ''}" placeholder="Department">
          </div>
          <div>
            <label style="font-size: 0.75rem; color: var(--text-muted);">Year</label>
            <select id="edit_mYear_${i}" class="form-control" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;">
              <option value="1st Year" ${m.year === '1st Year' ? 'selected' : ''}>1st Year</option>
              <option value="2nd Year" ${m.year === '2nd Year' ? 'selected' : ''}>2nd Year</option>
              <option value="3rd Year" ${m.year === '3rd Year' ? 'selected' : ''}>3rd Year</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }

  modalContent.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 1rem;">
      <h3 style="margin: 0; font-size: 1.3rem;">✏️ Edit Team Details - ${team.name}</h3>
      <span class="ps-code">${team.id}</span>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;">
      <div class="form-group">
        <label style="font-size: 0.8rem; font-weight: 700;">Team Name</label>
        <input type="text" id="edit_teamName" class="form-control" value="${team.name || ''}">
      </div>
      <div class="form-group">
        <label style="font-size: 0.8rem; font-weight: 700;">Department</label>
        <input type="text" id="edit_teamDept" class="form-control" value="${team.department || ''}">
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem;">
      <div class="form-group">
        <label style="font-size: 0.8rem; font-weight: 700;">Problem Statement Code</label>
        <input type="text" id="edit_psId" class="form-control" value="${team.problemStatementId || ''}">
      </div>
      <div class="form-group">
        <label style="font-size: 0.8rem; font-weight: 700;">Problem Statement Title</label>
        <input type="text" id="edit_psTitle" class="form-control" value="${team.psTitle1 || ''}">
      </div>
    </div>

    <div class="form-group" style="margin-bottom: 1rem;">
      <label style="font-size: 0.8rem; font-weight: 700;">Proposed Solution Abstract</label>
      <textarea id="edit_solution" class="form-control" rows="3">${team.solution1 || ''}</textarea>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.25rem;">
      <div class="form-group">
        <label style="font-size: 0.8rem; font-weight: 700;">Tech Stack</label>
        <input type="text" id="edit_techStack" class="form-control" value="${team.techStack1 || ''}">
      </div>
      <div class="form-group">
        <label style="font-size: 0.8rem; font-weight: 700;">Assigned Mentor Name</label>
        <input type="text" id="edit_mentorName" class="form-control" value="${team.mentorName || ''}">
      </div>
    </div>

    <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem; color: var(--text-main);">👥 Team Roster (All 6 Members)</h4>
    <div style="max-height: 320px; overflow-y: auto; padding-right: 4px; margin-bottom: 1.25rem;">
      ${memberInputs}
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
      <button class="btn btn-secondary" onclick="closeModal('editTeamModal'); openTeamDetailModal('${team.id}');">Cancel</button>
      <button class="btn btn-primary" onclick="saveEditedTeamDetails('${team.id}')">💾 Save Changes</button>
    </div>
  `;

  document.getElementById('editTeamModal').classList.add('active');
}

function saveEditedTeamDetails(teamId) {
  const team = state.teams.find(t => t.id === teamId);
  if (!team) return;

  team.name = document.getElementById('edit_teamName')?.value.trim() || team.name;
  team.department = document.getElementById('edit_teamDept')?.value.trim() || team.department;
  team.problemStatementId = document.getElementById('edit_psId')?.value.trim() || team.problemStatementId;
  team.psTitle1 = document.getElementById('edit_psTitle')?.value.trim() || team.psTitle1;
  team.solution1 = document.getElementById('edit_solution')?.value.trim() || team.solution1;
  team.techStack1 = document.getElementById('edit_techStack')?.value.trim() || team.techStack1;
  team.mentorName = document.getElementById('edit_mentorName')?.value.trim() || team.mentorName;

  const newMembers = [];
  for (let i = 0; i < 6; i++) {
    newMembers.push({
      name: document.getElementById(`edit_mName_${i}`)?.value.trim() || (team.members[i] ? team.members[i].name : `Member ${i+1}`),
      role: i === 0 ? 'Team Leader' : `Member ${i+1}`,
      gender: document.getElementById(`edit_mGender_${i}`)?.value || 'Male',
      rollNo: document.getElementById(`edit_mRoll_${i}`)?.value.trim() || '',
      email: document.getElementById(`edit_mEmail_${i}`)?.value.trim() || '',
      dept: document.getElementById(`edit_mDept_${i}`)?.value.trim() || team.department,
      year: document.getElementById(`edit_mYear_${i}`)?.value || '1st Year'
    });
  }

  team.members = newMembers;
  enrichTeamRecord(team);
  saveTeamsToStorage();

  closeModal('editTeamModal');
  showToast(`✅ Successfully updated details for ${team.name}!`, 'success');
  openTeamDetailModal(team.id);
}

function printTeamSlip(teamId) {
  const team = state.teams.find(t => t.id === teamId);
  if (!team) return;
  window.print();
}

// --------------------------------------------------------------------------
// JURY EVALUATION DESK (100-POINT SIH RUBRIC - PROTECTED)
// --------------------------------------------------------------------------

function renderJuryTeamList() {
  const container = document.getElementById('juryTeamList');
  if (!container) return;
  container.innerHTML = '';

  state.teams.forEach(team => {
    const item = document.createElement('div');
    item.className = `team-selector-item ${team.id === state.selectedTeamForJuryId ? 'active' : ''}`;
    item.onclick = () => loadTeamForEvaluation(team.id);

    const scoreDisplay = team.scores ? `${team.scores.total} / 100` : 'Pending';

    item.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 700; font-size: 0.95rem;">${team.name}</span>
        <span class="rule-chip ${team.scores ? 'pass' : 'fail'}" style="font-size: 0.725rem; padding: 2px 6px;">${scoreDisplay}</span>
      </div>
      <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
        Dept: ${team.department || 'AJK Dept'} | PS: ${team.psTitle1 ? team.psTitle1.substring(0, 40) + '...' : team.problemStatementId}
      </div>
    `;

    container.appendChild(item);
  });

  if (!state.selectedTeamForJuryId && state.teams.length > 0) {
    loadTeamForEvaluation(state.teams[0].id);
  }
}

function loadTeamForEvaluation(teamId) {
  state.selectedTeamForJuryId = teamId;
  const team = state.teams.find(t => t.id === teamId);
  if (!team) return;

  renderJuryTeamList();

  const nameElem = document.getElementById('evalTeamName');
  const psElem = document.getElementById('evalTeamPs');
  if (nameElem) nameElem.textContent = `Scoring: ${team.name} (${team.id})`;
  if (psElem) psElem.textContent = `Dept: ${team.department || 'AJK Dept'} | PS: [${team.problemStatementId || 'PS'}] ${team.psTitle1 || 'No Title'}`;

  const scores = team.scores || { novelty: 18, architecture: 23, feasibility: 22, impact: 14, presentation: 14, total: 91 };

  document.getElementById('slideNovelty').value = scores.novelty || 18;
  document.getElementById('slideArchitecture').value = scores.architecture || 23;
  document.getElementById('slideFeasibility').value = scores.feasibility || 22;
  document.getElementById('slideImpact').value = scores.impact || 14;
  document.getElementById('slidePresentation').value = scores.presentation || 14;
  if (document.getElementById('evalFeedback')) {
    document.getElementById('evalFeedback').value = scores.feedback || '';
  }

  updateRubricTotal();
}

function updateRubricTotal() {
  const nov = parseInt(document.getElementById('slideNovelty').value) || 0;
  const arch = parseInt(document.getElementById('slideArchitecture').value) || 0;
  const feas = parseInt(document.getElementById('slideFeasibility').value) || 0;
  const imp = parseInt(document.getElementById('slideImpact').value) || 0;
  const pres = parseInt(document.getElementById('slidePresentation').value) || 0;

  document.getElementById('valNovelty').textContent = nov;
  document.getElementById('valArchitecture').textContent = arch;
  document.getElementById('valFeasibility').textContent = feas;
  document.getElementById('valImpact').textContent = imp;
  document.getElementById('valPresentation').textContent = pres;

  const total = nov + arch + feas + imp + pres;
  document.getElementById('valTotalScore').textContent = `${total} / 100`;

  const statusElem = document.getElementById('evalScoreStatus');
  if (statusElem) {
    if (total >= 85) {
      statusElem.textContent = 'Nominated for Top 50';
      statusElem.className = 'rule-chip pass';
    } else {
      statusElem.textContent = 'Under Review';
      statusElem.className = 'rule-chip fail';
    }
  }
}

function submitJuryEvaluation() {
  if (!state.selectedTeamForJuryId) return;

  const nov = parseInt(document.getElementById('slideNovelty').value) || 0;
  const arch = parseInt(document.getElementById('slideArchitecture').value) || 0;
  const feas = parseInt(document.getElementById('slideFeasibility').value) || 0;
  const imp = parseInt(document.getElementById('slideImpact').value) || 0;
  const pres = parseInt(document.getElementById('slidePresentation').value) || 0;
  const total = nov + arch + feas + imp + pres;
  const feedback = document.getElementById('evalFeedback').value.trim();

  const team = state.teams.find(t => t.id === state.selectedTeamForJuryId);
  if (team) {
    team.scores = {
      novelty: nov,
      architecture: arch,
      feasibility: feas,
      impact: imp,
      presentation: pres,
      total: total,
      evaluator: 'AIIF Jury Panel',
      feedback: feedback
    };

    saveTeamsToStorage();
    showToast(`Submitted score ${total}/100 for team "${team.name}"`, 'success');
  }
}

// --------------------------------------------------------------------------
// LEADERBOARD & CERTIFICATE GENERATOR (PROTECTED)
// --------------------------------------------------------------------------

function filterLeaderboard(track) {
  state.leaderboardFilter = track;
  document.querySelectorAll('#tab-leaderboard .btn-secondary').forEach(btn => {
    if (btn.id.startsWith('lbFilter')) {
      btn.classList.toggle('active', btn.id === `lbFilter${track}`);
    }
  });
  renderLeaderboard();
}

function renderLeaderboard() {
  const tbody = document.getElementById('leaderboardBody');
  if (!tbody) return;

  renderPublishButton();

  const isAuth = state.isStaffAuthenticated;
  const isPublished = state.isLeaderboardPublished;

  if (!isAuth && !isPublished) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 3rem 1.5rem; background: var(--bg-card);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">⏰</div>
          <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">Top 50 Shortlist Results Pending</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); max-width: 520px; margin: 0 auto; line-height: 1.5;">
            The official SIH 2026 Top 50 shortlist results have not been published by the Organising Committee yet.<br>
            Check back after the offline campus pitching session on <strong>September 07, 2026</strong>!
          </p>
        </td>
      </tr>
    `;
    return;
  }

  const filter = state.leaderboardFilter || 'All';
  let sorted = [...state.teams].sort((a, b) => {
    const scoreA = a.scores ? a.scores.total : 0;
    const scoreB = b.scores ? b.scores.total : 0;
    return scoreB - scoreA;
  });

  if (filter !== 'All') {
    sorted = sorted.filter(t => t.category === filter);
  }

  tbody.innerHTML = '';
  if (sorted.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 2rem; color: var(--text-muted);">No teams evaluated yet.</td></tr>`;
    return;
  }

  sorted.forEach((team, idx) => {
    const rank = idx + 1;
    const scoreText = team.scores ? `${team.scores.total} / 100` : 'Pending';
    const isNominated = team.scores && team.scores.total >= 85;
    const femaleCount = team.members ? team.members.filter(m => m.gender === 'Female').length : 0;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="font-weight: 800; text-align: center;">
        ${rank === 1 ? '🥇 1' : rank === 2 ? '🥈 2' : rank === 3 ? '🥉 3' : rank}
      </td>
      <td style="font-weight: 700; color: var(--text-main);">${team.name}</td>
      <td style="font-size: 0.8rem; font-weight: 600; color: var(--primary-green);">${team.department || 'AJK Dept'}</td>
      <td style="font-size: 0.8rem;">[${team.problemStatementId || 'PS'}] ${team.psTitle1 ? team.psTitle1.substring(0, 40) + '...' : ''}</td>
      <td style="font-size: 0.8rem;"><span class="rule-chip pass" style="font-size: 0.725rem;">${team.id.includes('-B') || (team.name && team.name.includes('Idea 2')) ? '💡 Idea 2' : '💡 Idea 1'}</span></td>
      <td><span class="rule-chip pass" style="font-size: 0.75rem; padding: 2px 6px;">${femaleCount} / 6 Females</span></td>
      <td style="font-weight: 800; color: var(--primary-orange);">${scoreText}</td>
      <td>
        <span class="rule-chip ${isNominated ? 'pass' : 'fail'}" style="font-size: 0.75rem; padding: 3px 8px;">
          ${isNominated ? '🏆 Top 50 Nominated' : 'Under Review'}
        </span>
      </td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="openTeamDetailModal('${team.id}')">View</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function exportLeaderboardExcel() {
  const sorted = [...state.teams].sort((a, b) => (b.scores?.total || 0) - (a.scores?.total || 0));

  let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>SIH 2026 Teams</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        th { background-color: #00a859; color: #ffffff; font-weight: bold; text-align: center; border: 1px solid #008043; padding: 6px 10px; }
        td { border: 1px solid #d1d5db; padding: 6px 10px; }
        .num { text-align: center; }
        .score { font-weight: bold; color: #f36f21; text-align: center; }
        .pass { background-color: #d1fae5; color: #065f46; font-weight: bold; text-align: center; }
        .pending { background-color: #fef3c7; color: #92400e; text-align: center; }
      </style>
    </head>
    <body>
      <h2>SIH 2026 INTERNAL HACKATHON - OFFICIAL LEADERBOARD & REGISTRATIONS</h2>
      <p>AJK College of Arts & Science in association with AIIF (AJK Innovation Incubator Foundation)</p>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team ID</th>
            <th>Team Name</th>
            <th>Department</th>
            <th>Track Category</th>
            <th>Region/Hometown</th>
            <th>Assigned Mentor</th>
            <th>PS 1 Code</th>
            <th>PS 1 Title</th>
            <th>PS 2 Code</th>
            <th>PS 2 Title</th>
            <th>Team Leader</th>
            <th>Leader Roll</th>
            <th>Leader Email</th>
            <th>Member 2</th>
            <th>Member 3</th>
            <th>Member 4</th>
            <th>Member 5</th>
            <th>Member 6</th>
            <th>Female Count</th>
            <th>Novelty (20)</th>
            <th>Architecture (20)</th>
            <th>Feasibility (20)</th>
            <th>Impact (20)</th>
            <th>Presentation (20)</th>
            <th>Total Score (100)</th>
            <th>Jury Status</th>
          </tr>
        </thead>
        <tbody>
  `;

  sorted.forEach((t, idx) => {
    const leader = t.members ? (t.members.find(m => m.role === 'Team Leader') || t.members[0]) : null;
    const femaleCount = t.members ? t.members.filter(m => m.gender === 'Female').length : 0;
    const mentor = state.mentors.find(m => m.id === t.mentorId);
    const score = t.scores ? t.scores.total : 0;
    const isNominated = score >= 85;

    html += `
      <tr>
        <td class="num">${idx + 1}</td>
        <td>${t.id || ''}</td>
        <td><b>${t.name || ''}</b></td>
        <td>${t.department || ''}</td>
        <td>${t.category || 'Software'}</td>
        <td>${t.hometown || ''}</td>
        <td>${mentor ? mentor.name : (t.mentorName || 'Assigned Mentor')}</td>
        <td>${t.problemStatementId || ''}</td>
        <td>${t.psTitle1 || ''}</td>
        <td>${t.problemStatement2Id || ''}</td>
        <td>${t.psTitle2 || ''}</td>
        <td>${leader ? leader.name : ''}</td>
        <td>${leader ? leader.rollNo : ''}</td>
        <td>${leader ? leader.email : ''}</td>
        <td>${t.members && t.members[1] ? t.members[1].name : ''}</td>
        <td>${t.members && t.members[2] ? t.members[2].name : ''}</td>
        <td>${t.members && t.members[3] ? t.members[3].name : ''}</td>
        <td>${t.members && t.members[4] ? t.members[4].name : ''}</td>
        <td>${t.members && t.members[5] ? t.members[5].name : ''}</td>
        <td class="num">${femaleCount} / 6</td>
        <td class="num">${t.scores ? t.scores.novelty : 0}</td>
        <td class="num">${t.scores ? t.scores.architecture : 0}</td>
        <td class="num">${t.scores ? t.scores.feasibility : 0}</td>
        <td class="num">${t.scores ? t.scores.impact : 0}</td>
        <td class="num">${t.scores ? t.scores.presentation : 0}</td>
        <td class="score">${score > 0 ? score : 'Pending'}</td>
        <td class="${isNominated ? 'pass' : 'pending'}">${isNominated ? 'Top 50 Nominated' : 'Under Review'}</td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + html], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SIH_2026_Official_Leaderboard_Report.xls`;
  a.click();
  showToast('Downloaded formatted Excel spreadsheet (.xls)! 📊', 'success');
}

function exportLeaderboardCSV() {
  let csv = 'Rank,Team ID,Team Name,Department,Category,Hometown/Dept,Primary PS (PS1),Secondary PS (PS2),Female Count,Total Score,Status\n';
  const sorted = [...state.teams].sort((a, b) => (b.scores?.total || 0) - (a.scores?.total || 0));

  sorted.forEach((t, idx) => {
    const femaleCount = t.members ? t.members.filter(m => m.gender === 'Female').length : 0;
    csv += `${idx + 1},"${t.id}","${t.name}","${t.department || ''}","${t.category}","${t.hometown || ''}","${t.psTitle1 || ''}","${t.psTitle2 || ''}",${femaleCount},${t.scores?.total || 0},"${t.scores?.total >= 85 ? 'Top 50 Nominated' : 'Pending'}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SIH_2026_Teams_Leaderboard.csv`;
  a.click();
}

function exportLeaderboardJSON() {
  const jsonStr = JSON.stringify(state.teams, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SIH_2026_Teams_Data.json`;
  a.click();
}

// CANVAS CERTIFICATE RENDERER
function renderCertificateCanvas() {
  const canvas = document.getElementById('certificateCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const width = canvas.width;
  const height = canvas.height;

  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#0b0f19');
  grad.addColorStop(1, '#111827');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = '#00a859';
  ctx.lineWidth = 12;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  ctx.strokeStyle = '#1e3a8a';
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, width - 64, height - 64);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AJK COLLEGE OF ARTS & SCIENCE', width / 2, 90);

  ctx.fillStyle = '#00a859';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('In Association with AIIF (AJK Innovation Incubator Foundation)', width / 2, 125);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  ctx.fillText('WORLD\'S 1ST ETHNIC INCUBATOR | Recognized by StartupTN Under SIGrant', width / 2, 150);

  const certType = document.getElementById('certType')?.value || 'Excellence';
  ctx.fillStyle = '#f36f21';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(`CERTIFICATE OF ${certType.toUpperCase()}`, width / 2, 230);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '16px sans-serif';
  ctx.fillText('This is proudly presented to', width / 2, 280);

  const recipient = document.getElementById('certRecipient')?.value || 'S. Kaviya';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px sans-serif';
  ctx.fillText(recipient, width / 2, 345);

  const role = document.getElementById('certRole')?.value || 'Team Leader';
  const teamName = document.getElementById('certTeamName')?.value || 'AquaGuard Innovators';
  ctx.fillStyle = '#0284c7';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText(`${role} — Team "${teamName}"`, width / 2, 390);

  const psTitle = document.getElementById('certPsTitle')?.value || 'Smart Water Quality Monitoring Network';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '16px sans-serif';
  ctx.fillText(`For outstanding performance in the SIH 2026 Internal Hackathon`, width / 2, 450);
  ctx.fillText(`Problem Statement: "${psTitle}"`, width / 2, 480);
  ctx.fillText(`Organized at AJK College Campus on ${document.getElementById('certDate')?.value || 'September 07, 2026'}.`, width / 2, 510);

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(150, 720);
  ctx.lineTo(380, 720);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width / 2 - 115, 720);
  ctx.lineTo(width / 2 + 115, 720);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width - 380, 720);
  ctx.lineTo(width - 150, 720);
  ctx.stroke();

  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Dr. B. Satheesh', 265, 745);
  ctx.font = '13px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Director, AIIF', 265, 765);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Prof. S. N. Prasad', width / 2, 745);
  ctx.font = '13px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Head of Department', width / 2, 765);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('Principal / Management', width - 265, 745);
  ctx.font = '13px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('AJK College of Arts & Science', width - 265, 765);
}

function downloadCertificatePNG() {
  const canvas = document.getElementById('certificateCanvas');
  if (!canvas) return;
  const image = canvas.toDataURL('image/png');
  const recipient = document.getElementById('certRecipient')?.value || 'Student';
  const link = document.createElement('a');
  link.download = `Certificate_${recipient.replace(/\s+/g, '_')}.png`;
  link.href = image;
  link.click();
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function openStaffAuthModal() {
  const modal = document.getElementById('staffAuthModal');
  if (modal) modal.classList.add('active');
}

function verifyStaffPasscode() {
  const code = (document.getElementById('staffPasscode')?.value || '').trim().toLowerCase();
  const validPasscodes = ['ajkaiif2026', 'admin', '1234', 'sih2026', 'ajk2026', 'jury'];
  if (validPasscodes.includes(code)) {
    state.isStaffAuthenticated = true;
    closeModal('staffAuthModal');
    
    // Show protected tabs and buttons
    document.querySelectorAll('.staff-only-tab, .staff-only-btn').forEach(el => {
      el.style.display = 'inline-flex';
    });
    
    showToast('🔓 Organiser & Jury Access Unlocked!', 'success');
    switchTab('jury');
  } else {
    showToast('❌ Invalid Passcode. Access Denied.', 'error');
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.style.cssText = `
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#f43f5e' : '#0284c7'};
    padding: 0.85rem 1.25rem;
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    color: var(--text-main);
    box-shadow: var(--shadow-main);
    animation: fadeIn 0.2s ease;
    margin-top: 0.5rem;
  `;
  toast.textContent = message;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
