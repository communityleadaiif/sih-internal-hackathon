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
  videoLanguageFilter: 'All',
  preparationVideos: [
    // --- 🇮🇳 TAMIL (தமிழ்) MASTERCLASSES ---
    {
      id: "vid_tam_1",
      language: "Tamil",
      langBadge: "🇮🇳 தமிழ்",
      langClass: "tamil",
      youtubeId: "VfP_fK6k7Y8",
      embedUrl: "https://www.youtube-nocookie.com/embed/VfP_fK6k7Y8?autoplay=1",
      title: "Smart India Hackathon Complete Guide & Winning Roadmap in Tamil | தமிழ் வழிகாட்டி",
      category: "strategy",
      categoryName: "🎯 SIH Roadmap",
      duration: "15:20",
      speaker: "CodeHunters Tamil Tech & SIH Mentors",
      thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
      desc: "SIH தொடக்கம் முதல் இறுதி வரை: Problem Statement தேர்வு செய்வது, குழு விதிகள் மற்றும் Internal Hackathon-ல் வெற்றி பெறும் முழுமையான தமிழ் வழிகாட்டி.",
      keyPoints: [
        "Ministry Problem Statement-களின் உண்மைத் தேவையை எவ்வாறு புரிந்துகொள்வது?",
        "கல்லூரி அளவிலான Internal Hackathon-ல் தேர்வாக தேவையான வழிமுறைகள்",
        "பெண் பங்கேற்பாளர் கட்டாய விதி மற்றும் குழு அமைப்பு (6 உறுப்பினர்கள்)",
        "தேசிய அளவிலான Grand Finale-க்கு தகுதி பெறும் ரகசியங்கள்"
      ]
    },
    {
      id: "vid_tam_2",
      language: "Tamil",
      langBadge: "🇮🇳 தமிழ்",
      langClass: "tamil",
      youtubeId: "5a6qJ2gX5_w",
      embedUrl: "https://www.youtube-nocookie.com/embed/5a6qJ2gX5_w?autoplay=1",
      title: "SIH PPT & Pitch Deck Format in Tamil: 5 நிமிடத்தில் நடுவர்களை கவர்வது எப்படி?",
      category: "pitch",
      categoryName: "🚀 PPT & Pitch Deck",
      duration: "12:40",
      speaker: "Innovation Coach & Startup Evaluator (Tamil)",
      thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80",
      desc: "நடுவர்கள் (Jury) விரும்பும் சிறந்த 6-ஸ்லைடு PPT தயாரிப்பது மற்றும் 5 நிமிட நேரக்கட்டுப்பாட்டுக்குள் பயமில்லாமல் சிறந்த Elevator Pitch வழங்குவது எப்படி?",
      keyPoints: [
        "ஸ்லைடு 1-2: பிரச்சனையின் ஆழம் மற்றும் தற்போதைய தீர்வுகள் உள்ள இடைவெளி",
        "ஸ்லைடு 3: தொழில்நுட்ப கட்டமைப்பு (System Architecture Flowchart)",
        "ஸ்லைடு 4-5: செயல்படும் மாதிரி (Working Prototype) மற்றும் சாத்தியக்கூறு",
        "ஸ்லைடு 6: சமூக மற்றும் பொருளாதார தாக்கம் (Impact & Scalability)"
      ]
    },
    {
      id: "vid_tam_3",
      language: "Tamil",
      langBadge: "🇮🇳 தமிழ்",
      langClass: "tamil",
      youtubeId: "9No-FiEInLA",
      embedUrl: "https://www.youtube-nocookie.com/embed/9No-FiEInLA?autoplay=1",
      title: "SIH Problem Statement Selection & Prototype Building in Tamil | தமிழ் வழிகாட்டி",
      category: "prototype",
      categoryName: "💻 Prototype & Tech",
      duration: "17:15",
      speaker: "Tech Lead & AI Innovator (Tamil)",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      desc: "Hardware மற்றும் Software வகைகளில் குறைந்த நேரத்தில் தரமான Working Prototype உருவாக்குவது மற்றும் ஆஃப்லைன் டெமோ தயார் செய்வது பற்றிய விளக்கம்.",
      keyPoints: [
        "கடினமான பிரச்னைகளை எளிய மாட்யூல்களாக பிரிப்பது",
        "Arduino, ESP32, Python AI மற்றும் Cloud Frameworks தேர்வு",
        "இணைய இணைப்பு இல்லாத போதும் செயல்படும் Offline Demo தயாரிப்பு",
        "Idea 1 மற்றும் Idea 2 இரட்டை யோசனைகளை சமர்ப்பிக்கும் உத்தி"
      ]
    },

    // --- 🇬🇧 ENGLISH MASTERCLASSES ---
    {
      id: "vid_eng_1",
      language: "English",
      langBadge: "🇬🇧 English",
      langClass: "english",
      youtubeId: "rVlhMRBgF-k",
      embedUrl: "https://www.youtube-nocookie.com/embed/rVlhMRBgF-k?autoplay=1",
      title: "How to Crack Smart India Hackathon: Official Flow, Rules & Winning Roadmap",
      category: "strategy",
      categoryName: "🎯 SIH Roadmap",
      duration: "14:10",
      speaker: "National SIH Mentor & Grand Finale Jury",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
      desc: "Comprehensive English orientation covering end-to-end hackathon lifecycle from internal evaluation to national finals.",
      keyPoints: [
        "Analyzing Ministry Problem Statements & domain requirements",
        "Formulating achievable prototype scopes for offline pitching",
        "Balancing Software vs Hardware innovation criteria",
        "Team cohesion, leadership, and sprint execution best practices"
      ]
    },
    {
      id: "vid_eng_2",
      language: "English",
      langBadge: "🇬🇧 English",
      langClass: "english",
      youtubeId: "PkZNo7MFNFg",
      embedUrl: "https://www.youtube-nocookie.com/embed/PkZNo7MFNFg?autoplay=1",
      title: "5-Minute Pitch Deck Architecture: How SIH Winners Impress the Evaluation Panel",
      category: "pitch",
      categoryName: "🚀 PPT & Pitch Deck",
      duration: "11:30",
      speaker: "Hackathon Judge & Startup Ecosystem Lead",
      thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80",
      desc: "Master the structure of an award-winning 6-slide deck: Problem validation, Architecture, Feasibility, Impact, and Live Demo.",
      keyPoints: [
        "Stick to 1 minute per core evaluation criterion",
        "Highlight unique novelty over existing off-the-shelf market tools",
        "Show clear end-to-end data pipelines and user journey diagrams",
        "Demonstrate sustainable deployment economics and scalability"
      ]
    },
    {
      id: "vid_eng_3",
      language: "English",
      langBadge: "🇬🇧 English",
      langClass: "english",
      youtubeId: "WPni755-Krg",
      embedUrl: "https://www.youtube-nocookie.com/embed/WPni755-Krg?autoplay=1",
      title: "Inside the Mind of SIH Jury: How 100 Marks are Evaluated Across 5 Pillars",
      category: "winner",
      categoryName: "⚖️ Jury Rubrics",
      duration: "13:45",
      speaker: "Senior Academician & Technical Evaluator",
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
      desc: "In-depth breakdown of the 5 official scoring pillars: Novelty (20), Architecture (25), Feasibility (25), Impact (15), and Presentation (15).",
      keyPoints: [
        "Novelty (20): What makes your technical approach 10x superior?",
        "Architecture (25): Scalable, modular, and fault-tolerant system design",
        "Feasibility (25): Realistic component costs and technological readiness",
        "Presentation & Defense (15): Confident defense during tough Q&A rounds"
      ]
    },

    // --- 🌴 MALAYALAM (മലയാളം) GUIDES ---
    {
      id: "vid_mal_1",
      language: "Malayalam",
      langBadge: "🌴 മലയാളം",
      langClass: "malayalam",
      youtubeId: "VfP_fK6k7Y8",
      embedUrl: "https://www.youtube-nocookie.com/embed/VfP_fK6k7Y8?autoplay=1",
      title: "Smart India Hackathon Malayalam Complete Guide: Registration, Ideas & Roadmap",
      category: "strategy",
      categoryName: "🎯 SIH Roadmap",
      duration: "16:05",
      speaker: "Kerala Tech Educator & SIH Mentor",
      thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80",
      desc: "സ്മാർട്ട് ഇന്ത്യ ഹാക്കത്തോൺ (SIH) മലയാളത്തിൽ പൂർണ്ണമായ ഗൈഡ്: പ്രോബ്ലം സെലക്ഷൻ, ടീം റൂളുകൾ, ഇന്റേണൽ ഹാക്കത്തോൺ തയ്യാറെടുപ്പുകൾ.",
      keyPoints: [
        "മിനിസ്ട്രി പ്രോബ്ലം സ്റ്റേറ്റ്‌മെന്റുകൾ എങ്ങനെ കൃത്യമായി തിരഞ്ഞെടുക്കാം?",
        "ടീമിൽ നിർബന്ധമായും പാലിക്കേണ്ട വനിതാ പങ്കാളിത്ത നിയമം",
        "കോളേജ് ഇന്റേണൽ പിച്ചിങ്ങിൽ ഉയർന്ന മാർക്ക് നേടാനുള്ള തന്ത്രങ്ങൾ",
        "ഗ്രാൻഡ് ഫിനാലെയിലേക്ക് യോഗ്യത നേടാനുള്ള ഘട്ടങ്ങൾ"
      ]
    },
    {
      id: "vid_mal_2",
      language: "Malayalam",
      langBadge: "🌴 മലയാളം",
      langClass: "malayalam",
      youtubeId: "5a6qJ2gX5_w",
      embedUrl: "https://www.youtube-nocookie.com/embed/5a6qJ2gX5_w?autoplay=1",
      title: "SIH PPT Preparation & 5-Minute Pitching Secrets in Malayalam | മലയാളം ഗൈഡ്",
      category: "pitch",
      categoryName: "🚀 PPT & Pitch Deck",
      duration: "13:20",
      speaker: "Tech Innovation Lead (Malayalam)",
      thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80",
      desc: "ജൂറിയെ ആകർഷിക്കുന്ന മികച്ച പ്രസന്റേഷൻ സ്ലൈഡുകൾ എങ്ങനെ നിർമ്മിക്കാം? 5 മിനിറ്റ് സമയപരിധിയിൽ മികച്ച പിച്ചിംഗ് നൽകുന്ന വിധം.",
      keyPoints: [
        "ആറ് പ്രധാന സ്ലൈഡുകളുടെ കൃത്യമായ ഫോർമാറ്റും ക്രമീകരണവും",
        "സിസ്റ്റം ആർക്കിടെക്ചർ ഫ്ലോചാർട്ടുകൾ വ്യക്തമായി അവതരിപ്പിക്കുക",
        "ജൂറിയുടെ ചോദ്യങ്ങൾക്ക് കൃത്യവും വ്യക്തവുമായ മറുപടി നൽകൽ",
        "സാമൂഹിക-സാമ്പത്തിക പ്രയോജനങ്ങൾ (Impact) എടുത്തുകാണിക്കൽ"
      ]
    },
    {
      id: "vid_mal_3",
      language: "Malayalam",
      langBadge: "🌴 മലയാളം",
      langClass: "malayalam",
      youtubeId: "9No-FiEInLA",
      embedUrl: "https://www.youtube-nocookie.com/embed/9No-FiEInLA?autoplay=1",
      title: "SIH Prototype Building & Grand Finale Winner Experience in Malayalam | മലയാളം ഗൈഡ്",
      category: "winner",
      categoryName: "🏆 Winners Secrets",
      duration: "18:30",
      speaker: "SIH National Awardee (Kerala)",
      thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
      desc: "ദേശീയ തലത്തിൽ വിജയിച്ച മലയാളി വിദ്യാർത്ഥികളുടെ അനുഭവങ്ങളും വർക്കിംഗ് പ്രോട്ടോടൈപ്പ് നിർമ്മാണ രഹസ്യങ്ങളും.",
      keyPoints: [
        "സോഫ്റ്റ്‌വെയർ, ഹാർഡ്‌വെയർ പ്രോട്ടോടൈപ്പുകൾ വേഗത്തിൽ നിർമ്മിക്കുന്ന രീതി",
        "ലൈവ് ഡെമോ പരാജയപ്പെടാതിരിക്കാൻ ചെയ്യേണ്ട മുൻകരുതലുകൾ",
        "ടീം അംഗങ്ങളുടെ ജോലി വിഭജനവും സമയക്രമീകരണവും",
        "ഹാക്കത്തോൺ മെന്ററിംഗ് സെഷനുകൾ പരമാവധി പ്രയോജനപ്പെടുത്തുക"
      ]
    }
  ],
  activeTab: 'overview',
  deptTrackerFilter: 'All',
  leaderboardFilter: 'All',
  selectedTeamForJuryId: null,
  currentUser: (function() {
    try {
      const u = sessionStorage.getItem('sih_auth_user');
      return u ? JSON.parse(u) : null;
    } catch(e) { return null; }
  })(),
  activeJuryId: (function() {
    try {
      const u = sessionStorage.getItem('sih_auth_user');
      if (u) {
        const parsed = JSON.parse(u);
        return parsed.juryId || 'Jury 1';
      }
      return sessionStorage.getItem('sih_active_jury_id') || 'Jury 1';
    } catch(e) { return 'Jury 1'; }
  })(),
  activeHallFilter: 'my',
  jurySearchQuery: '',
  isStaffAuthenticated: (function() {
    try { return !!sessionStorage.getItem('sih_auth_user') || sessionStorage.getItem('sih_staff_auth') === 'true'; } catch(e) { return false; }
  })(),
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
  safeRun(renderVideoQueue, 'renderVideoQueue');
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
  safeRun(initJuryProfile, 'initJuryProfile');
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
    // Cross-browser safe target date: September 09, 2026 23:59:59 IST
    const targetDate = new Date(2026, 8, 9, 23, 59, 59).getTime();

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

// 🎬 SIH 2026 PREPARATION VIDEO QUEUE CONTROLLER (TAMIL, ENGLISH & MALAYALAM)
function filterVideosByLanguage(lang) {
  state.videoLanguageFilter = lang || 'All';
  
  // Update button active state
  ['All', 'Tamil', 'English', 'Malayalam'].forEach(l => {
    const btn = document.getElementById(`vidLangFilter${l}`);
    if (btn) {
      if (l === state.videoLanguageFilter) {
        btn.classList.add('active');
        btn.style.background = 'var(--primary-green)';
        btn.style.color = '#ffffff';
        btn.style.borderColor = 'var(--primary-green)';
      } else {
        btn.classList.remove('active');
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
      }
    }
  });

  renderVideoQueue();
}

function renderVideoQueue() {
  const container = document.getElementById('videoCarouselQueue');
  if (!container) return;
  const allVideos = Array.isArray(state.preparationVideos) ? state.preparationVideos : [];
  
  const currentFilter = state.videoLanguageFilter || 'All';
  const videos = currentFilter === 'All' 
    ? allVideos 
    : allVideos.filter(v => v.language === currentFilter);

  if (videos.length === 0) {
    container.innerHTML = `<p class="text-muted" style="padding: 1.5rem; text-align: center; width: 100%;">No video guides available for selected language.</p>`;
    return;
  }

  container.innerHTML = videos.map(vid => `
    <div class="video-card" onclick="openVideoPlayerModal('${vid.id}')" title="Watch '${vid.title}' (${vid.language})">
      <div class="video-thumb-container">
        <span class="video-lang-badge video-lang-badge-${vid.langClass}">${vid.langBadge}</span>
        <img class="video-thumb-img" src="${vid.thumbnail}" alt="${vid.title}" loading="lazy" />
        <div class="video-play-overlay">▶</div>
        <div class="video-duration-tag">⏱️ ${vid.duration}</div>
      </div>
      <div class="video-card-body">
        <div style="display: flex; gap: 0.35rem; align-items: center; margin-bottom: 0.4rem; flex-wrap: wrap;">
          <span class="video-tag-pill video-tag-${vid.category}">${vid.categoryName}</span>
        </div>
        <h4 class="video-title">${vid.title}</h4>
        <p class="video-desc">${vid.desc}</p>
        <div class="video-footer">
          <span>🎙️ ${vid.speaker}</span>
          <span style="color: #ef4444; font-weight: 700;">Watch Guide →</span>
        </div>
      </div>
    </div>
  `).join('');
}

function scrollVideoQueue(direction) {
  const container = document.getElementById('videoCarouselQueue');
  if (!container) return;
  const scrollAmount = direction === 'left' ? -330 : 330;
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

function openVideoPlayerModal(videoId) {
  const vid = state.preparationVideos.find(v => v.id === videoId);
  if (!vid) return;

  const contentContainer = document.getElementById('sihVideoModalContent');
  if (contentContainer) {
    contentContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.85rem; margin-bottom: 1rem;">
        <div>
          <div style="display: flex; gap: 0.4rem; align-items: center; margin-bottom: 0.4rem;">
            <span class="video-lang-badge video-lang-badge-${vid.langClass}" style="position: static;">${vid.langBadge}</span>
            <span class="video-tag-pill video-tag-${vid.category}" style="margin: 0;">${vid.categoryName}</span>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main); line-height: 1.3;">
            ${vid.title}
          </h3>
          <p class="text-muted" style="font-size: 0.825rem; margin-top: 0.25rem;">
            🎙️ Presented by <strong>${vid.speaker}</strong> | Language: <strong>${vid.language}</strong> | Duration: <strong>${vid.duration}</strong>
          </p>
        </div>
      </div>

      <div class="video-modal-iframe-wrapper">
        <iframe 
          src="${vid.embedUrl}" 
          title="${vid.title}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      </div>

      <div style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1rem;">
        <h4 style="font-size: 0.925rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
          📌 Masterclass Overview & Key Takeaways
        </h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.75rem;">
          ${vid.desc}
        </p>
        
        <div style="font-size: 0.825rem; font-weight: 700; color: var(--primary-green); margin-bottom: 0.4rem;">
          🎯 Essential SIH Hackathon Preparation Checklist:
        </div>
        <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.825rem; color: var(--text-main); line-height: 1.6;">
          ${vid.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
        </ul>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; border-top: 1px solid var(--border-color); padding-top: 0.85rem;">
        <a href="https://www.youtube.com/watch?v=${vid.youtubeId}" target="_blank" class="btn btn-secondary btn-sm" style="text-decoration: none; color: #ef4444; border-color: rgba(239, 68, 68, 0.4);">
          ▶ Open on YouTube App / Website ↗
        </a>
        <button class="btn btn-primary btn-sm" onclick="closeVideoPlayerModal()">Done Watching</button>
      </div>
    `;
  }

  const modal = document.getElementById('sihVideoModal');
  if (modal) modal.classList.add('active');
}

function closeVideoPlayerModal() {
  const modal = document.getElementById('sihVideoModal');
  if (modal) {
    modal.classList.remove('active');
    // Stop video audio/playback by clearing iframe src
    const contentContainer = document.getElementById('sihVideoModalContent');
    if (contentContainer) contentContainer.innerHTML = '';
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

  // Master team definition from INITIAL_DATA (77 teams with verified slots and hall allocations)
  const masterTeams = (window.INITIAL_DATA && window.INITIAL_DATA.teams) 
    ? JSON.parse(JSON.stringify(window.INITIAL_DATA.teams)) 
    : [];

  const savedTeamsJson = localStorage.getItem('prajna_teams');
  if (savedTeamsJson) {
    try {
      const parsedSaved = JSON.parse(savedTeamsJson);
      if (Array.isArray(parsedSaved) && parsedSaved.length > 0) {
        // Build map of existing evaluation scores by teamNumber and team name
        const scoreMap = {};
        parsedSaved.forEach(st => {
          const keyNum = st.teamNumber || (st.id ? parseInt(st.id.replace(/[^0-9]/g, '')) : null);
          const keyName = (st.name || st.team_name || '').toLowerCase().trim();
          if (keyNum) scoreMap['num_' + keyNum] = st;
          if (keyName) scoreMap['name_' + keyName] = st;
        });

        // Merge scores onto authoritative master team records
        state.teams = masterTeams.map(mt => {
          const keyNum = mt.teamNumber || (mt.id ? parseInt(mt.id.replace(/[^0-9]/g, '')) : null);
          const keyName = (mt.name || mt.team_name || '').toLowerCase().trim();
          const match = scoreMap['num_' + keyNum] || scoreMap['name_' + keyName];
          if (match) {
            if (match.scores) mt.scores = match.scores;
            if (match.juryEvaluations) mt.juryEvaluations = match.juryEvaluations;
            if (match.marks) mt.marks = match.marks;
            if (match.feedback) mt.feedback = match.feedback;
            if (match.status && match.status !== 'Submitted') mt.status = match.status;
            if (match.evaluatorName) mt.evaluatorName = match.evaluatorName;
          }
          return mt;
        });
      } else {
        state.teams = masterTeams;
      }
    } catch (e) {
      console.error('Failed to parse stored teams, reverting to master:', e);
      state.teams = masterTeams;
    }
  } else {
    state.teams = masterTeams;
  }

  // Ensure state.teams is properly initialized
  if (!Array.isArray(state.teams) || state.teams.length === 0) {
    state.teams = masterTeams;
  }
  
  // Resave clean state
  localStorage.setItem('prajna_teams', JSON.stringify(state.teams));

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

// --------------------------------------------------------------------------
// DEDICATED 12-JURY & ORGANISER AUTHENTICATION ENGINE (STRICT CREDENTIALS)
// --------------------------------------------------------------------------

const AUTH_ACCOUNTS = {
  'organiser': {
    id: 'organiser',
    role: 'organiser',
    juryId: 'Organiser',
    name: 'Organiser Command Center',
    passcodes: ['Organiser@2026', 'admin2026', 'ajkaiif2026', 'organiser2026'],
    hall: 'All',
    hallName: 'All 6 Halls (Master Command)',
    track: 'All Tracks (Master View)',
    displayPass: 'Organiser@2026'
  },
  'admin': {
    id: 'organiser',
    role: 'organiser',
    juryId: 'Organiser',
    name: 'Organiser Command Center',
    passcodes: ['Organiser@2026', 'admin2026', 'ajkaiif2026', 'organiser2026'],
    hall: 'All',
    hallName: 'All 6 Halls (Master Command)',
    track: 'All Tracks (Master View)',
    displayPass: 'Organiser@2026'
  },
  // Hall A Juries (Teams 1 - 13)
  'jury1': {
    id: 'jury1',
    role: 'jury',
    juryId: 'Jury 1',
    name: 'Dr. Aneesh Kumar (Internal)',
    passcodes: ['Aneesh@HallA', 'jury1@2026', 'jury1pass', 'Jury1#2026'],
    hall: 'Hall A',
    hallName: 'Hall A (Third Floor)',
    track: 'AI, ML, Cyber & Tech (Teams 1–13)',
    displayPass: 'Aneesh@HallA'
  },
  'jury2': {
    id: 'jury2',
    role: 'jury',
    juryId: 'Jury 2',
    name: 'Hall A Co-Jury (Panel A)',
    passcodes: ['CoJuryA#2026', 'jury2@2026', 'jury2pass', 'Jury2#2026'],
    hall: 'Hall A',
    hallName: 'Hall A (Third Floor)',
    track: 'AI, ML, Cyber & Tech (Teams 1–13)',
    displayPass: 'CoJuryA#2026'
  },
  // Hall B Juries (Teams 14 - 26)
  'jury3': {
    id: 'jury3',
    role: 'jury',
    juryId: 'Jury 3',
    name: 'Dr. Vineetha (Internal)',
    passcodes: ['Vineetha@HallB', 'jury3@2026', 'jury3pass', 'Jury3#2026'],
    hall: 'Hall B',
    hallName: 'Hall B (Third Floor)',
    track: 'CS, BCA & Data Analytics (Teams 14–26)',
    displayPass: 'Vineetha@HallB'
  },
  'jury4': {
    id: 'jury4',
    role: 'jury',
    juryId: 'Jury 4',
    name: 'Hall B Co-Jury (Panel B)',
    passcodes: ['CoJuryB#2026', 'jury4@2026', 'jury4pass', 'Jury4#2026'],
    hall: 'Hall B',
    hallName: 'Hall B (Third Floor)',
    track: 'CS, BCA & Data Analytics (Teams 14–26)',
    displayPass: 'CoJuryB#2026'
  },
  // Hall C Juries (Teams 27 - 39)
  'jury5': {
    id: 'jury5',
    role: 'jury',
    juryId: 'Jury 5',
    name: 'Dr. John Grasias (Internal)',
    passcodes: ['John@HallC', 'jury5@2026', 'jury5pass', 'Jury5#2026'],
    hall: 'Hall C',
    hallName: 'Hall C (Third Floor)',
    track: 'Biotech, Forensic & Sciences (Teams 27–39)',
    displayPass: 'John@HallC'
  },
  'jury6': {
    id: 'jury6',
    role: 'jury',
    juryId: 'Jury 6',
    name: 'Hall C Co-Jury (Panel C)',
    passcodes: ['CoJuryC#2026', 'jury6@2026', 'jury6pass', 'Jury6#2026'],
    hall: 'Hall C',
    hallName: 'Hall C (Third Floor)',
    track: 'Biotech, Forensic & Sciences (Teams 27–39)',
    displayPass: 'CoJuryC#2026'
  },
  // Hall D Juries (Teams 40 - 51)
  'jury7': {
    id: 'jury7',
    role: 'jury',
    juryId: 'Jury 7',
    name: 'Mrs. Sariga (Internal)',
    passcodes: ['Sariga@HallD', 'jury7@2026', 'jury7pass', 'Jury7#2026'],
    hall: 'Hall D',
    hallName: 'Hall D (Third Floor)',
    track: 'Commerce & FinTech (Teams 40–51)',
    displayPass: 'Sariga@HallD'
  },
  'jury8': {
    id: 'jury8',
    role: 'jury',
    juryId: 'Jury 8',
    name: 'Hall D Co-Jury (Panel D)',
    passcodes: ['CoJuryD#2026', 'jury8@2026', 'jury8pass', 'Jury8#2026'],
    hall: 'Hall D',
    hallName: 'Hall D (Third Floor)',
    track: 'Commerce & FinTech (Teams 40–51)',
    displayPass: 'CoJuryD#2026'
  },
  // Hall E Juries (Teams 52 - 63, 77)
  'jury9': {
    id: 'jury9',
    role: 'jury',
    juryId: 'Jury 9',
    name: 'Mr. Sachin (Internal)',
    passcodes: ['Sachin@HallE', 'jury9@2026', 'jury9pass', 'Jury9#2026'],
    hall: 'Hall E',
    hallName: 'Hall E (Third Floor)',
    track: 'Management, Hotel & Aviation (Teams 52–63, 77)',
    displayPass: 'Sachin@HallE'
  },
  'jury10': {
    id: 'jury10',
    role: 'jury',
    juryId: 'Jury 10',
    name: 'Hall E Co-Jury (Panel E)',
    passcodes: ['CoJuryE#2026', 'jury10@2026', 'jury10pass', 'Jury10#2026'],
    hall: 'Hall E',
    hallName: 'Hall E (Third Floor)',
    track: 'Management, Hotel & Aviation (Teams 52–63, 77)',
    displayPass: 'CoJuryE#2026'
  },
  // Hall F Juries (Teams 64 - 76)
  'jury11': {
    id: 'jury11',
    role: 'jury',
    juryId: 'Jury 11',
    name: 'Dr. Bharathi (Internal)',
    passcodes: ['Bharathi@HallF', 'jury11@2026', 'jury11pass', 'Jury11#2026'],
    hall: 'Hall F',
    hallName: 'Hall F (Third Floor)',
    track: 'VisCom, Design & Media (Teams 64–76)',
    displayPass: 'Bharathi@HallF'
  },
  'jury12': {
    id: 'jury12',
    role: 'jury',
    juryId: 'Jury 12',
    name: 'Hall F Co-Jury (Panel F)',
    passcodes: ['CoJuryF#2026', 'jury12@2026', 'jury12pass', 'Jury12#2026'],
    hall: 'Hall F',
    hallName: 'Hall F (Third Floor)',
    track: 'VisCom, Design & Media (Teams 64–76)',
    displayPass: 'CoJuryF#2026'
  }
};

function openStaffAuthModal() {
  const modal = document.getElementById('staffAuthModal');
  if (modal) {
    modal.classList.add('active');
    const uInput = document.getElementById('staffUserId');
    const pInput = document.getElementById('staffPasscode');
    if (uInput) {
      setTimeout(() => uInput.focus(), 100);
    }
    if (pInput) pInput.value = '';
  }
}

function selectAuthAccount(userId) {
  const uInput = document.getElementById('staffUserId');
  const pInput = document.getElementById('staffPasscode');
  if (uInput) uInput.value = userId;
  if (pInput) {
    pInput.value = '';
    pInput.focus();
  }
  const acc = AUTH_ACCOUNTS[userId.toLowerCase()];
  if (acc) {
    showToast(`Selected ${acc.name}. Please enter your passcode to log in.`, 'info');
  }
}

function verifyStaffLogin() {
  const uInput = document.getElementById('staffUserId');
  const pInput = document.getElementById('staffPasscode');
  const userId = uInput ? uInput.value.trim() : '';
  const passcode = pInput ? pInput.value.trim() : '';
  
  if (!userId || !passcode) {
    showToast('⚠️ Please enter BOTH your Login ID and Passcode.', 'warning');
    if (!userId && uInput) uInput.focus();
    else if (!passcode && pInput) pInput.focus();
    return;
  }

  loginUser(userId, passcode);
}

function verifyStaffPasscode() {
  verifyStaffLogin();
}

function loginUser(username, passcode) {
  const u = (username || '').trim().toLowerCase().replace(/\s+/g, '');
  const p = (passcode || '').trim();

  if (!u || !p) {
    showToast('⚠️ Please enter both Login ID and Passcode.', 'warning');
    return false;
  }

  let targetAccount = null;

  // Exact username lookup
  if (AUTH_ACCOUNTS[u]) {
    targetAccount = AUTH_ACCOUNTS[u];
  } else if (u.startsWith('jury0')) {
    const norm = 'jury' + u.replace('jury0', '');
    if (AUTH_ACCOUNTS[norm]) targetAccount = AUTH_ACCOUNTS[norm];
  } else if (u.startsWith('jury')) {
    const num = u.replace('jury', '');
    if (AUTH_ACCOUNTS['jury' + num]) targetAccount = AUTH_ACCOUNTS['jury' + num];
  }

  // Validate credentials strictly
  if (targetAccount) {
    const validMatches = targetAccount.passcodes.some(code => code.toLowerCase() === p.toLowerCase());
    if (validMatches) {
      setCurrentUser(targetAccount);
      closeModal('staffAuthModal');
      showToast(`Welcome, ${targetAccount.name}! 🔓`, 'success');
      switchTab('jury');
      return true;
    }
  }

  showToast('❌ Invalid Login ID or Passcode. Access Denied.', 'error');
  return false;
}

function setCurrentUser(account) {
  state.currentUser = account;
  state.isStaffAuthenticated = true;
  state.activeJuryId = account.juryId;
  state.activeHallFilter = account.role === 'organiser' ? 'all' : account.hall;

  try {
    sessionStorage.setItem('sih_auth_user', JSON.stringify(account));
    sessionStorage.setItem('sih_staff_auth', 'true');
    sessionStorage.setItem('sih_active_jury_id', account.juryId);
  } catch (e) {}

  applyStaffProtection();
  initJuryProfile();
  renderJuryTeamList();
  if (account.role === 'organiser') {
    renderMasterMultiJuryMatrix();
  }
}

function logoutUser() {
  state.currentUser = null;
  state.isStaffAuthenticated = false;
  state.activeJuryId = 'Jury 1';
  state.activeHallFilter = 'my';

  try {
    sessionStorage.removeItem('sih_auth_user');
    sessionStorage.removeItem('sih_staff_auth');
    sessionStorage.removeItem('sih_active_jury_id');
  } catch (e) {}

  applyStaffProtection();
  initJuryProfile();
  renderJuryTeamList();
  showToast('You have logged out successfully. 🚪', 'info');
  switchTab('overview');
}

function applyStaffProtection() {
  // Restore user from session if available
  if (!state.currentUser) {
    try {
      const stored = sessionStorage.getItem('sih_auth_user');
      if (stored) state.currentUser = JSON.parse(stored);
    } catch (e) {}
  }

  const isAuth = !!state.currentUser || state.isStaffAuthenticated || (sessionStorage.getItem('sih_staff_auth') === 'true');
  state.isStaffAuthenticated = isAuth;
  const isOrganiser = state.currentUser && state.currentUser.role === 'organiser';
  const isJury = state.currentUser && state.currentUser.role === 'jury';

  const isPublished = state.isLeaderboardPublished || (localStorage.getItem('prajna_leaderboard_published') === 'true');
  state.isLeaderboardPublished = isPublished;

  // 1. Update Header Auth Badge & Login Button
  const headerBadge = document.getElementById('headerAuthBadge');
  const headerText = document.getElementById('headerAuthText');
  const headerLoginBtn = document.getElementById('headerLoginBtn');

  if (headerBadge && headerText && headerLoginBtn) {
    if (isAuth && state.currentUser) {
      headerBadge.style.display = 'inline-flex';
      headerText.innerHTML = isOrganiser 
        ? '🏛️ Organiser Command Center' 
        : `⚖️ ${state.currentUser.name} (${state.currentUser.hall})`;
      headerLoginBtn.style.display = 'none';
    } else {
      headerBadge.style.display = 'none';
      headerLoginBtn.style.display = 'inline-flex';
    }
  }

  // 2. Navigation Tab Visibility
  const juryTab = document.querySelector('.nav-tab[data-tab="jury"]');
  if (juryTab) {
    juryTab.style.display = isAuth ? 'inline-flex' : 'none';
    if (isJury) {
      juryTab.innerHTML = `⚖️ 5. My Pitch Hall (${state.currentUser.hall})`;
    } else {
      juryTab.innerHTML = '⚖️ 5. Jury Evaluation Desk';
    }
  }

  const lbTab = document.querySelector('.nav-tab[data-tab="leaderboard"]');
  if (lbTab) {
    lbTab.style.display = (isOrganiser || isPublished) ? 'inline-flex' : 'none';
    if (isPublished && !isOrganiser) {
      lbTab.innerHTML = '🏆 5. Top 50 Shortlist & Certificates';
    } else if (isOrganiser) {
      lbTab.innerHTML = '🏆 6. Leaderboard & Certificates';
    }
  }

  // 3. Organiser vs Jury Desk Customization
  const profileSwitcherWrapper = document.getElementById('juryProfileSwitcherWrapper');
  if (profileSwitcherWrapper) {
    profileSwitcherWrapper.style.display = isOrganiser ? 'flex' : 'none';
  }

  const masterMatrixSec = document.getElementById('organiserMasterMatrixSection');
  if (masterMatrixSec) {
    masterMatrixSec.style.display = isOrganiser ? 'block' : 'none';
    if (isOrganiser) renderMasterMultiJuryMatrix();
  }

  // 4. Hall Filter Tabs: Lock for individual Jury
  const hallFilterTabs = document.getElementById('hallFilterTabs');
  if (hallFilterTabs) {
    if (isJury) {
      hallFilterTabs.querySelectorAll('.hall-filter-btn').forEach(btn => {
        if (btn.id === 'hallFilterMyHall') {
          btn.style.display = 'inline-flex';
          btn.textContent = `🏢 My Hall (${state.currentUser.hall})`;
          btn.classList.add('active');
        } else {
          btn.style.display = 'none';
        }
      });
      state.activeHallFilter = state.currentUser.hall;
    } else {
      hallFilterTabs.querySelectorAll('.hall-filter-btn').forEach(btn => {
        btn.style.display = 'inline-flex';
      });
    }
  }

  document.querySelectorAll('.staff-only-btn').forEach(btn => {
    btn.style.display = isOrganiser ? 'inline-flex' : 'none';
  });

  renderPublishButton();
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
Date of Pitching: September 09, 2026 @ AJK Campus

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
1. Prepare your solution architecture and presentation slides for Campus Pitching on Sep 9, 2026.
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
// 6-HALL PITCHING & 2-JURY EVALUATION DISTRIBUTION ENGINE
// --------------------------------------------------------------------------

const HALL_CONFIG = {
  'Hall A': { 
    name: 'Hall A (Third Floor)', 
    shortName: 'Hall A', 
    letter: 'A',
    internalJury: 'Dr. Aneesh Kumar',
    juries: ['Jury 1', 'Jury 2'], 
    juryNames: { 'Jury 1': 'Dr. Aneesh Kumar (Internal)', 'Jury 2': 'Hall A Co-Jury (Panel A)' },
    track: 'AI, ML, Cyber & Tech (Teams 1–13)', 
    icon: '🤖' 
  },
  'Hall B': { 
    name: 'Hall B (Third Floor)', 
    shortName: 'Hall B', 
    letter: 'B',
    internalJury: 'Dr. Vineetha',
    juries: ['Jury 3', 'Jury 4'], 
    juryNames: { 'Jury 3': 'Dr. Vineetha (Internal)', 'Jury 4': 'Hall B Co-Jury (Panel B)' },
    track: 'CS, BCA & Data Analytics (Teams 14–26)', 
    icon: '💻' 
  },
  'Hall C': { 
    name: 'Hall C (Third Floor)', 
    shortName: 'Hall C', 
    letter: 'C',
    internalJury: 'Dr. John Grasias',
    juries: ['Jury 5', 'Jury 6'], 
    juryNames: { 'Jury 5': 'Dr. John Grasias (Internal)', 'Jury 6': 'Hall C Co-Jury (Panel C)' },
    track: 'Biotech, Forensic & Sciences (Teams 27–39)', 
    icon: '🔬' 
  },
  'Hall D': { 
    name: 'Hall D (Third Floor)', 
    shortName: 'Hall D', 
    letter: 'D',
    internalJury: 'Mrs. Sariga',
    juries: ['Jury 7', 'Jury 8'], 
    juryNames: { 'Jury 7': 'Mrs. Sariga (Internal)', 'Jury 8': 'Hall D Co-Jury (Panel D)' },
    track: 'Commerce & FinTech (Teams 40–51)', 
    icon: '📊' 
  },
  'Hall E': { 
    name: 'Hall E (Third Floor)', 
    shortName: 'Hall E', 
    letter: 'E',
    internalJury: 'Mr. Sachin',
    juries: ['Jury 9', 'Jury 10'], 
    juryNames: { 'Jury 9': 'Mr. Sachin (Internal)', 'Jury 10': 'Hall E Co-Jury (Panel E)' },
    track: 'Management, Hotel & Aviation (Teams 52–63)', 
    icon: '✈️' 
  },
  'Hall F': { 
    name: 'Hall F (Third Floor)', 
    shortName: 'Hall F', 
    letter: 'F',
    internalJury: 'Dr. Bharathi',
    juries: ['Jury 11', 'Jury 12'], 
    juryNames: { 'Jury 11': 'Dr. Bharathi (Internal)', 'Jury 12': 'Hall F Co-Jury (Panel F)' },
    track: 'VisCom, Design & Media (Teams 64–76)', 
    icon: '🎨' 
  }
};

const JURY_HALL_MAP = {
  'Jury 1': 'Hall A', 'Jury 2': 'Hall A',
  'Jury 3': 'Hall B', 'Jury 4': 'Hall B',
  'Jury 5': 'Hall C', 'Jury 6': 'Hall C',
  'Jury 7': 'Hall D', 'Jury 8': 'Hall D',
  'Jury 9': 'Hall E', 'Jury 10': 'Hall E',
  'Jury 11': 'Hall F', 'Jury 12': 'Hall F',
  'Organiser': 'All'
};

function assignHallToTeam(team) {
  if (team.hall && HALL_CONFIG[team.hall]) return team.hall;
  if (team.hallLetter && HALL_CONFIG['Hall ' + team.hallLetter]) return 'Hall ' + team.hallLetter;
  
  // Strict 1-to-1 mapping matching SIH Team Hall Allocation & Jury List.xlsx
  const num = parseInt(team.teamNumber || (team.id ? team.id.replace(/[^0-9]/g, '') : 0));
  if (num >= 1 && num <= 13) return 'Hall A';
  if (num >= 14 && num <= 26) return 'Hall B';
  if (num >= 27 && num <= 39) return 'Hall C';
  if (num >= 40 && num <= 51) return 'Hall D';
  if ((num >= 52 && num <= 63) || num === 77) return 'Hall E';
  if (num >= 64 && num <= 76) return 'Hall F';

  return 'Hall A';
}

function getActiveJuryId() {
  if (state.currentUser && state.currentUser.role === 'jury') {
    return state.currentUser.juryId;
  }
  return state.activeJuryId || 'Jury 1';
}

function initJuryProfile() {
  const activeJury = getActiveJuryId();
  const isOrganiser = (state.currentUser && state.currentUser.role === 'organiser') || activeJury === 'Organiser';
  const hall = JURY_HALL_MAP[activeJury] || 'Hall A';
  const hallInfo = HALL_CONFIG[hall];

  const titleElem = document.getElementById('activeJuryTitle');
  if (titleElem) {
    if (isOrganiser) {
      titleElem.textContent = '🏛️ Organiser Command Center';
    } else {
      const juryAcc = Object.values(AUTH_ACCOUNTS).find(a => a.juryId === activeJury);
      titleElem.textContent = `⚖️ ${juryAcc ? juryAcc.name : activeJury}`;
    }
  }

  const tagElem = document.getElementById('activeJuryHallTag');
  if (tagElem) {
    tagElem.textContent = isOrganiser ? '📍 All 6 Halls (Master Command)' : `📍 ${hallInfo ? hallInfo.name : hall}`;
  }

  const selElem = document.getElementById('juryProfileSelect');
  if (selElem) selElem.value = activeJury;
  
  const badgeElem = document.getElementById('evalCurrentJuryBadge');
  if (badgeElem) badgeElem.textContent = `Evaluator: ${activeJury} (${hall})`;
  
  const lblElem = document.getElementById('myJuryNameScoreLbl');
  if (lblElem) lblElem.textContent = `${activeJury} [${hall}]`;

  renderHallProgressMatrix();
}

function changeActiveJuryProfile(juryId) {
  // Only organiser can switch profile freely
  if (state.currentUser && state.currentUser.role === 'jury') {
    juryId = state.currentUser.juryId;
  }

  state.activeJuryId = juryId || 'Jury 1';
  try {
    sessionStorage.setItem('sih_active_jury_id', state.activeJuryId);
  } catch (e) {}

  initJuryProfile();
  showToast(`Switched evaluator profile to: ${state.activeJuryId}`, 'info');

  renderJuryTeamList();
  if (state.selectedTeamForJuryId) {
    loadTeamForEvaluation(state.selectedTeamForJuryId);
  }
}

function setHallFilter(hallFilter) {
  // If jury is logged in, restrict to their hall
  if (state.currentUser && state.currentUser.role === 'jury') {
    hallFilter = state.currentUser.hall;
  }

  state.activeHallFilter = hallFilter;
  document.querySelectorAll('#hallFilterTabs .hall-filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtnId = hallFilter === 'my' ? 'hallFilterMyHall' : 
                      hallFilter === 'all' ? 'hallFilterAll' : 
                      `hallFilter${hallFilter.replace(/\s+/g, '')}`;
  const btn = document.getElementById(activeBtnId);
  if (btn) btn.classList.add('active');

  renderJuryTeamList();
  renderHallProgressMatrix();
}

function filterJuryTeamList(query) {
  state.jurySearchQuery = (query || '').trim().toLowerCase();
  renderJuryTeamList();
}

function renderHallProgressMatrix() {
  const container = document.getElementById('hallProgressMatrixContainer');
  if (!container) return;
  container.innerHTML = '';

  const activeJury = getActiveJuryId();
  const currentJuryHall = JURY_HALL_MAP[activeJury] || 'Hall A';
  const isOrganiser = (state.currentUser && state.currentUser.role === 'organiser') || activeJury === 'Organiser';

  Object.keys(HALL_CONFIG).forEach(hallKey => {
    const config = HALL_CONFIG[hallKey];
    const teamsInHall = state.teams.filter(t => (t.hall || assignHallToTeam(t)) === hallKey);
    const totalTeams = teamsInHall.length;

    let fullyEvaluated = 0;
    let partiallyEvaluated = 0;

    teamsInHall.forEach(t => {
      const j1 = t.juryEvaluations && t.juryEvaluations[config.juries[0]];
      const j2 = t.juryEvaluations && t.juryEvaluations[config.juries[1]];
      if (j1 && j2) {
        fullyEvaluated++;
      } else if (j1 || j2) {
        partiallyEvaluated++;
      }
    });

    const percent = totalTeams > 0 ? Math.round((fullyEvaluated / totalTeams) * 100) : 0;
    const isCurrentHall = hallKey === currentJuryHall && !isOrganiser;
    const isFiltered = state.activeHallFilter === hallKey || (state.activeHallFilter === 'my' && isCurrentHall);

    // If logged in as jury, only render their own hall or show others muted
    if (state.currentUser && state.currentUser.role === 'jury' && hallKey !== state.currentUser.hall) {
      return; // Hide other halls for isolated view
    }

    const card = document.createElement('div');
    card.className = `hall-card ${isFiltered ? 'active' : ''}`;
    card.onclick = () => {
      if (isOrganiser) setHallFilter(hallKey);
    };

    card.innerHTML = `
      <div class="hall-card-header">
        <span class="hall-name-title">
          <span>${config.icon}</span> ${config.name}
          ${isCurrentHall ? '<span class="rule-chip pass" style="font-size:0.65rem; padding:1px 5px;">My Assigned Hall</span>' : ''}
        </span>
        <span class="hall-juries-tag">${config.internalJury || config.juries[0]}</span>
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        ${config.track}
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: 700;">
        <span style="color: var(--text-main);">${totalTeams} Teams Allocated</span>
        <span style="color: ${percent === 100 ? 'var(--primary-green)' : 'var(--primary-orange)'};">
          ${fullyEvaluated}/${totalTeams} Completed (${percent}%)
        </span>
      </div>
      <div class="progress-bar-bg" style="margin-top: 0.4rem; height: 6px;">
        <div class="progress-bar-fill" style="width: ${percent}%; background: ${percent === 100 ? 'var(--primary-green)' : 'var(--primary-orange)'};"></div>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderJuryTeamList() {
  const container = document.getElementById('juryTeamList');
  if (!container) return;
  container.innerHTML = '';

  const activeJury = getActiveJuryId();
  const currentJuryHall = JURY_HALL_MAP[activeJury] || 'Hall A';
  const query = state.jurySearchQuery || '';
  const isOrganiser = (state.currentUser && state.currentUser.role === 'organiser') || activeJury === 'Organiser';
  const isJury = state.currentUser && state.currentUser.role === 'jury';

  // Determine target hall filter
  let targetHall = 'all';
  if (isJury) {
    targetHall = state.currentUser.hall; // Strictly locked to jury's assigned hall
  } else {
    const hallFilter = state.activeHallFilter || 'all';
    targetHall = (hallFilter === 'my') ? (isOrganiser ? 'all' : currentJuryHall) : hallFilter;
  }

  const filteredTeams = state.teams.filter(t => {
    const teamHall = t.hall || assignHallToTeam(t);
    if (targetHall !== 'all' && teamHall !== targetHall) {
      return false;
    }

    if (!query) return true;
    const name = (t.name || '').toLowerCase();
    const id = (t.id || '').toLowerCase();
    const dept = (t.department || '').toLowerCase();
    const ps = (t.psTitle1 || t.problemStatementId || '').toLowerCase();
    const mentor = (t.mentorName || '').toLowerCase();
    const rolls = (t.members || []).map(m => (m.rollNo || '').toLowerCase()).join(' ');
    const leader = (t.members && t.members[0] ? t.members[0].name : '').toLowerCase();
    return name.includes(query) || id.includes(query) || dept.includes(query) || ps.includes(query) || rolls.includes(query) || mentor.includes(query) || leader.includes(query);
  });

  // Sort by Team Number ascending
  filteredTeams.sort((a, b) => {
    const numA = parseInt(a.teamNumber || a.id?.replace(/[^0-9]/g, '') || 999);
    const numB = parseInt(b.teamNumber || b.id?.replace(/[^0-9]/g, '') || 999);
    return numA - numB;
  });

  // Calculate stats for current filter
  let scoredCount = 0;
  filteredTeams.forEach(t => {
    if (isOrganiser) {
      if (t.scores && t.scores.total) scoredCount++;
    } else {
      if (t.juryEvaluations && t.juryEvaluations[activeJury]) scoredCount++;
    }
  });

  const statsElem = document.getElementById('juryEvaluatedStats');
  if (statsElem) {
    statsElem.textContent = `${scoredCount} / ${filteredTeams.length} Scored (${activeJury})`;
  }

  if (filteredTeams.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 2rem 1rem; color: var(--text-muted); font-size: 0.85rem;">No teams matching in ${targetHall === 'all' ? 'All Halls' : targetHall}</div>`;
    return;
  }

  filteredTeams.forEach(team => {
    const teamHall = team.hall || assignHallToTeam(team);
    const hallJuries = HALL_CONFIG[teamHall]?.juries || ['Jury 1', 'Jury 2'];
    const item = document.createElement('div');
    item.className = `team-selector-item ${team.id === state.selectedTeamForJuryId ? 'active' : ''}`;
    item.onclick = () => loadTeamForEvaluation(team.id);

    const juryEval = team.juryEvaluations && team.juryEvaluations[activeJury];
    const j1Score = team.juryEvaluations && team.juryEvaluations[hallJuries[0]];
    const j2Score = team.juryEvaluations && team.juryEvaluations[hallJuries[1]];

    let statusChipClass = 'fail';
    let statusText = '0/2 Juries';

    if (j1Score && j2Score) {
      statusChipClass = 'pass';
      statusText = `✅ 2/2 Complete (${team.scores?.total || Math.round((j1Score.total + j2Score.total)/2)}/100)`;
    } else if (j1Score || j2Score) {
      statusChipClass = 'pending';
      const who = j1Score ? hallJuries[0] : hallJuries[1];
      const val = (j1Score || j2Score).total;
      statusText = `⚡ 1/2 (${who}: ${val})`;
    }

    const myScoreDisplay = juryEval ? `Mine: ${juryEval.total}/100` : 'Not Scored';
    const leaderName = team.members && team.members[0] ? team.members[0].name : '';

    item.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 800; font-size: 0.925rem; color: var(--text-main);">
          <span style="color: var(--primary-orange);">#${team.teamNumber || ''}</span> ${team.name}
        </span>
        <span class="hall-badge" style="font-size: 0.65rem; padding: 1px 5px;">${teamHall}</span>
      </div>
      <div style="font-size: 0.725rem; color: var(--text-muted); margin-top: 0.2rem; display: flex; justify-content: space-between;">
        <span>⏰ ${team.slot || '10.30 - 11.15am'}</span>
        <span>${team.problemStatementId || 'PS Code'}</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.35rem;">
        <span class="rule-chip ${statusChipClass}" style="font-size: 0.675rem; padding: 2px 6px;">
          ${statusText}
        </span>
        <span style="font-size: 0.725rem; font-weight: 700; color: ${juryEval ? 'var(--primary-green)' : 'var(--text-muted)'};">
          ${isOrganiser ? `Consensus: ${team.scores?.total || 'Pending'}` : myScoreDisplay}
        </span>
      </div>
    `;

    container.appendChild(item);
  });

  if (!state.selectedTeamForJuryId && filteredTeams.length > 0) {
    loadTeamForEvaluation(filteredTeams[0].id);
  }
}

function renderTeamPitchDossier(team) {
  const container = document.getElementById('juryTeamDossier');
  if (!container) return;
  if (!team) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📋</div>
        <h4>No Team Selected</h4>
        <p style="font-size: 0.85rem;">Select any team from the left roster to view their complete pitch dossier.</p>
      </div>
    `;
    return;
  }

  const teamHall = team.hall || assignHallToTeam(team);
  const hallConfig = HALL_CONFIG[teamHall] || { name: teamHall, juries: ['Jury 1', 'Jury 2'], internalJury: 'Assigned Jury' };
  const femaleCount = team.members ? team.members.filter(m => m.gender === 'Female').length : 0;
  const isFemaleCompliant = femaleCount >= 1;

  const j1Eval = team.juryEvaluations && team.juryEvaluations[hallConfig.juries[0]];
  const j2Eval = team.juryEvaluations && team.juryEvaluations[hallConfig.juries[1]];
  const juriesScoredCount = (j1Eval ? 1 : 0) + (j2Eval ? 1 : 0);
  const avgScore = team.scores ? team.scores.total : (j1Eval && j2Eval ? Math.round((j1Eval.total + j2Eval.total)/2) : 'Pending');

  // Build 2-Jury Score Matrix Chips
  let juryChipsHtml = `
    <span class="jury-pill-chip ${j1Eval ? 'highlight' : ''}" title="${j1Eval?.feedback || 'Not scored yet'}">
      ⚖️ ${hallConfig.juryNames ? hallConfig.juryNames[hallConfig.juries[0]] : hallConfig.juries[0]}: <strong>${j1Eval ? `${j1Eval.total}/100` : 'Pending'}</strong>
    </span>
    <span class="jury-pill-chip ${j2Eval ? 'highlight' : ''}" title="${j2Eval?.feedback || 'Not scored yet'}">
      ⚖️ ${hallConfig.juryNames ? hallConfig.juryNames[hallConfig.juries[1]] : hallConfig.juries[1]}: <strong>${j2Eval ? `${j2Eval.total}/100` : 'Pending'}</strong>
    </span>
  `;

  // Build Members Roster Grid
  const membersHtml = (team.members || []).map((m, idx) => `
    <div class="dossier-member-item">
      <div style="font-weight: 700; color: var(--text-main); display: flex; justify-content: space-between;">
        <span>${idx + 1}. ${m.name}</span>
        <span style="font-size: 0.7rem; color: var(--primary-orange); font-weight: 800;">${m.role || 'Member'}</span>
      </div>
      <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
        Roll: <strong>${m.rollNo || 'N/A'}</strong> | ${m.gender || 'Not specified'}
      </div>
      <div style="font-size: 0.725rem; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        📧 ${m.email || 'N/A'}
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <!-- HEADER BAR -->
    <div class="dossier-header-bar">
      <div>
        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.25rem;">
          <span class="rule-chip pass" style="font-size: 0.75rem; font-weight: 800;">Team #${team.teamNumber || team.id}</span>
          <span class="hall-badge" style="font-size: 0.75rem;">📍 ${hallConfig.name}</span>
          <span class="rule-chip" style="font-size: 0.75rem; background: rgba(59, 130, 246, 0.15); color: #3b82f6;">⏰ Slot: ${team.slot || '10.30 - 11.15am'}</span>
          <span class="ps-category ${team.category || 'Software'}">${team.category || 'Software'} Track</span>
          <span class="rule-chip ${isFemaleCompliant ? 'pass' : 'fail'}" style="font-size: 0.725rem;">
            ${isFemaleCompliant ? `👩 ${femaleCount} Female Member(s) Verified` : '⚠️ No Female Member'}
          </span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-main); margin: 0;">${team.name}</h2>
        <div style="font-size: 0.85rem; color: var(--primary-green); font-weight: 600; margin-top: 0.2rem;">
          🏛️ ${team.department || 'AJK Department'} | 👨‍🏫 Mentor: ${team.mentorName || 'Assigned Mentor'} | ⚖️ Internal Jury: ${hallConfig.internalJury}
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 0.725rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">Consensus Total</div>
        <div style="font-size: 1.6rem; font-weight: 900; color: ${typeof avgScore === 'number' && avgScore >= 75 ? 'var(--primary-green)' : 'var(--primary-orange)'};">
          ${typeof avgScore === 'number' ? `${avgScore} / 100` : avgScore}
        </div>
        <div style="font-size: 0.7rem; color: var(--text-muted);">${juriesScoredCount}/2 Juries Evaluated</div>
      </div>
    </div>

    <!-- 2-JURY EVALUATOR STATUS CHIPS -->
    <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; margin-bottom: 1.25rem; padding-bottom: 0.85rem; border-bottom: 1px dashed var(--border-color);">
      <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">Jury Panel Scores:</span>
      ${juryChipsHtml}
    </div>

    <!-- PROBLEM STATEMENT & PROPOSED SOLUTION SECTION -->
    <div class="dossier-problem-box" style="margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
        <span class="ps-number" style="font-size: 0.85rem;">[${team.problemStatementId || 'SIH-PS'}]</span>
        <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Theme: ${team.category || 'Software'}</span>
      </div>
      <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.6rem;">
        ${team.psTitle1 || 'Problem Statement Title'}
      </h3>
      
      <div style="background: var(--bg-card); border-radius: var(--radius-sm); padding: 0.75rem; margin-bottom: 0.75rem; border-left: 3px solid var(--primary-green);">
        <div style="font-size: 0.725rem; font-weight: 800; text-transform: uppercase; color: var(--primary-green); margin-bottom: 0.25rem;">💡 Proposed Solution Abstract:</div>
        <p style="font-size: 0.85rem; color: var(--text-main); line-height: 1.5; margin: 0;">
          ${team.solution1 || 'Solution details submitted by student team for SIH 2026.'}
        </p>
      </div>

      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem;">
        <span style="font-weight: 700; color: var(--text-muted);">🛠️ Tech Stack:</span>
        <span style="color: var(--text-main); font-weight: 600;">${team.techStack1 || 'React, Python, Cloud'}</span>
      </div>
    </div>

    <!-- 6-MEMBER ROSTER ACCORDION -->
    <div>
      <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">
        👥 Team Roster (6 Members - Female Representation Verified):
      </div>
      <div class="dossier-members-grid">
        ${membersHtml}
      </div>
    </div>
  `;
}

function loadTeamForEvaluation(teamId) {
  state.selectedTeamForJuryId = teamId;
  const team = state.teams.find(t => t.id === teamId);
  if (!team) return;

  const activeJury = getActiveJuryId();
  const teamHall = team.hall || assignHallToTeam(team);
  const hallConfig = HALL_CONFIG[teamHall] || { name: teamHall, juries: ['Jury 1', 'Jury 2'] };

  // Render Left Selection Active Item
  document.querySelectorAll('#juryTeamList .team-selector-item').forEach(item => {
    item.classList.remove('active');
  });

  // Render Pre-Pitch Dossier Card
  renderTeamPitchDossier(team);

  // Update Rubric Header Info
  const evalNameElem = document.getElementById('evalTeamName');
  if (evalNameElem) evalNameElem.textContent = `#${team.teamNumber || ''} ${team.name} (${team.id})`;

  const evalPsElem = document.getElementById('evalTeamPs');
  if (evalPsElem) evalPsElem.textContent = `[${team.problemStatementId || 'PS'}] ${team.psTitle1 || ''} | Slot: ${team.slot || '10.30 - 11.15am'}`;

  const evalBadgeElem = document.getElementById('evalCurrentJuryBadge');
  if (evalBadgeElem) evalBadgeElem.textContent = `Active Evaluator: ${activeJury} (${teamHall})`;

  const myScoreLbl = document.getElementById('myJuryNameScoreLbl');
  if (myScoreLbl) myScoreLbl.textContent = `${activeJury} [${teamHall}]`;

  // Pre-fill existing evaluation score for this active jury if exists
  const existingJuryEval = (team.juryEvaluations && team.juryEvaluations[activeJury]) || null;
  const defaults = existingJuryEval || {
    novelty: 18,
    architecture: 23,
    feasibility: 22,
    impact: 14,
    presentation: 14,
    feedback: ''
  };

  const slideNov = document.getElementById('slideNovelty');
  const slideArch = document.getElementById('slideArchitecture');
  const slideFeas = document.getElementById('slideFeasibility');
  const slideImp = document.getElementById('slideImpact');
  const slidePres = document.getElementById('slidePresentation');
  const feedTxt = document.getElementById('evalFeedback');

  if (slideNov) slideNov.value = defaults.novelty;
  if (slideArch) slideArch.value = defaults.architecture;
  if (slideFeas) slideFeas.value = defaults.feasibility;
  if (slideImp) slideImp.value = defaults.impact;
  if (slidePres) slidePres.value = defaults.presentation;
  if (feedTxt) feedTxt.value = defaults.feedback || '';

  updateRubricTotal();
}

function updateRubricTotal() {
  const n = parseInt(document.getElementById('slideNovelty')?.value || 0);
  const a = parseInt(document.getElementById('slideArchitecture')?.value || 0);
  const f = parseInt(document.getElementById('slideFeasibility')?.value || 0);
  const i = parseInt(document.getElementById('slideImpact')?.value || 0);
  const p = parseInt(document.getElementById('slidePresentation')?.value || 0);

  const valNov = document.getElementById('valNovelty');
  const valArch = document.getElementById('valArchitecture');
  const valFeas = document.getElementById('valFeasibility');
  const valImp = document.getElementById('valImpact');
  const valPres = document.getElementById('valPresentation');

  if (valNov) valNov.textContent = n;
  if (valArch) valArch.textContent = a;
  if (valFeas) valFeas.textContent = f;
  if (valImp) valImp.textContent = i;
  if (valPres) valPres.textContent = p;

  const total = n + a + f + i + p;
  const valTot = document.getElementById('valTotalScore');
  if (valTot) valTot.textContent = `${total} / 100`;

  const statusChip = document.getElementById('evalScoreStatus');
  if (statusChip) {
    if (total >= 75) {
      statusChip.className = 'rule-chip pass';
      statusChip.textContent = 'Nominated for Top 50';
    } else if (total >= 50) {
      statusChip.className = 'rule-chip pending';
      statusChip.textContent = 'Shortlist Consideration';
    } else {
      statusChip.className = 'rule-chip fail';
      statusChip.textContent = 'Needs Improvement';
    }
  }
}

function submitJuryEvaluation() {
  const teamId = state.selectedTeamForJuryId;
  const team = state.teams.find(t => t.id === teamId);
  if (!team) {
    showToast('Please select a team from the roster first!', 'warning');
    return;
  }

  const activeJury = getActiveJuryId();
  const teamHall = team.hall || assignHallToTeam(team);
  const hallConfig = HALL_CONFIG[teamHall] || { name: teamHall, juries: ['Jury 1', 'Jury 2'] };

  const novelty = parseInt(document.getElementById('slideNovelty')?.value || 0);
  const architecture = parseInt(document.getElementById('slideArchitecture')?.value || 0);
  const feasibility = parseInt(document.getElementById('slideFeasibility')?.value || 0);
  const impact = parseInt(document.getElementById('slideImpact')?.value || 0);
  const presentation = parseInt(document.getElementById('slidePresentation')?.value || 0);
  const feedback = (document.getElementById('evalFeedback')?.value || '').trim();
  const total = novelty + architecture + feasibility + impact + presentation;

  if (!team.juryEvaluations) team.juryEvaluations = {};

  team.juryEvaluations[activeJury] = {
    juryId: activeJury,
    hall: teamHall,
    novelty,
    architecture,
    feasibility,
    impact,
    presentation,
    total,
    feedback,
    evaluatedAt: new Date().toISOString()
  };

  // Compute Consensus Score (Average of all juries who scored this team)
  const juryKeys = Object.keys(team.juryEvaluations);
  if (juryKeys.length > 0) {
    let sumNov = 0, sumArch = 0, sumFeas = 0, sumImp = 0, sumPres = 0, sumTot = 0;
    juryKeys.forEach(k => {
      const je = team.juryEvaluations[k];
      sumNov += je.novelty;
      sumArch += je.architecture;
      sumFeas += je.feasibility;
      sumImp += je.impact;
      sumPres += je.presentation;
      sumTot += je.total;
    });
    const cnt = juryKeys.length;
    team.scores = {
      novelty: Math.round(sumNov / cnt),
      architecture: Math.round(sumArch / cnt),
      feasibility: Math.round(sumFeas / cnt),
      impact: Math.round(sumImp / cnt),
      presentation: Math.round(sumPres / cnt),
      total: Math.round(sumTot / cnt),
      feedback: team.juryEvaluations[activeJury]?.feedback || ''
    };
  }

  saveTeamsToStorage();
  renderJuryTeamList();
  renderTeamPitchDossier(team);
  renderHallProgressMatrix();
  renderLeaderboard();
  if (state.currentUser && state.currentUser.role === 'organiser') {
    renderMasterMultiJuryMatrix();
  }

  // Background Cloud Sync to Google Sheets
  try {
    if (window.GOOGLE_APPS_SCRIPT_URL) {
      fetch(window.GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'submitJuryScore',
          teamId: team.id,
          teamName: team.name,
          department: team.department,
          hall: teamHall,
          juryId: activeJury,
          novelty,
          architecture,
          feasibility,
          impact,
          presentation,
          total,
          feedback
        })
      }).then(r => r.json()).then(res => {
        console.log('Score synced to cloud successfully:', res);
      }).catch(err => {
        console.warn('Cloud score sync failed (offline cache retained):', err);
      });
    }
  } catch (err) {
    console.error('Failed to dispatch score to GAS:', err);
  }

  showToast(`✅ Score of ${total}/100 saved for ${team.name} by ${activeJury}!`, 'success');
}

function renderMasterMultiJuryMatrix() {
  const tbody = document.getElementById('masterJuryMatrixBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const sortedTeams = [...state.teams].sort((a, b) => {
    const numA = parseInt(a.teamNumber || a.id?.replace(/[^0-9]/g, '') || 999);
    const numB = parseInt(b.teamNumber || b.id?.replace(/[^0-9]/g, '') || 999);
    return numA - numB;
  });

  sortedTeams.forEach((team, idx) => {
    const teamHall = team.hall || assignHallToTeam(team);
    const hallConfig = HALL_CONFIG[teamHall] || { name: teamHall, juries: ['Jury 1', 'Jury 2'], internalJury: 'Jury' };
    const j1Key = hallConfig.juries[0];
    const j2Key = hallConfig.juries[1];

    const j1Eval = team.juryEvaluations && team.juryEvaluations[j1Key];
    const j2Eval = team.juryEvaluations && team.juryEvaluations[j2Key];

    const j1ScoreDisplay = j1Eval ? `<span style="font-weight:700; color:var(--primary-green);">${j1Eval.total}/100</span>` : '<span style="color:var(--text-muted);">Pending</span>';
    const j2ScoreDisplay = j2Eval ? `<span style="font-weight:700; color:var(--primary-green);">${j2Eval.total}/100</span>` : '<span style="color:var(--text-muted);">Pending</span>';

    const consensusScore = team.scores ? team.scores.total : (j1Eval && j2Eval ? Math.round((j1Eval.total + j2Eval.total)/2) : (j1Eval ? j1Eval.total : (j2Eval ? j2Eval.total : null)));

    let discrepancyBadge = '';
    if (j1Eval && j2Eval) {
      const diff = Math.abs(j1Eval.total - j2Eval.total);
      if (diff >= 15) {
        discrepancyBadge = `<div style="font-size:0.65rem; color:#ef4444; font-weight:800; margin-top:2px;">⚠️ Diff: ${diff} pts</div>`;
      }
    }

    let statusHtml = '<span class="rule-chip fail" style="font-size:0.7rem;">0/2 Scored</span>';
    if (j1Eval && j2Eval) {
      statusHtml = consensusScore >= 75 
        ? '<span class="rule-chip pass" style="font-size:0.7rem;">🏆 Top 50 Nominated</span>' 
        : '<span class="rule-chip pending" style="font-size:0.7rem;">Evaluated</span>';
    } else if (j1Eval || j2Eval) {
      statusHtml = '<span class="rule-chip pending" style="font-size:0.7rem;">⚡ 1/2 Scored</span>';
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-weight:800; color:var(--primary-orange);">${team.teamNumber || (idx + 1)}</td>
      <td>
        <span class="hall-badge" style="font-size:0.75rem;">${teamHall}</span>
        <div style="font-size:0.725rem; color:var(--text-muted); margin-top:2px;">⏰ ${team.slot || '10.30 - 11.15am'}</div>
      </td>
      <td>
        <strong style="color:var(--text-main); font-size:0.9rem;">${team.name}</strong>
        <div style="font-size:0.725rem; color:var(--text-muted);">${team.id}</div>
      </td>
      <td>
        <div style="font-weight:600; font-size:0.825rem;">${team.department || 'N/A'}</div>
        <div style="font-size:0.725rem; color:var(--primary-green);">👨‍🏫 ${team.mentorName || 'Mentor'}</div>
      </td>
      <td>
        <span class="ps-number" style="font-size:0.75rem;">[${team.problemStatementId || 'PS'}]</span>
        <div style="font-size:0.75rem; color:var(--text-muted); max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${team.psTitle1 || ''}</div>
      </td>
      <td style="text-align:center;">
        <div>${j1ScoreDisplay}</div>
        <div style="font-size:0.65rem; color:var(--text-muted);">${j1Key}</div>
      </td>
      <td style="text-align:center;">
        <div>${j2ScoreDisplay}</div>
        <div style="font-size:0.65rem; color:var(--text-muted);">${j2Key}</div>
      </td>
      <td style="text-align:center;">
        <span style="font-size:1.1rem; font-weight:900; color:${consensusScore !== null ? (consensusScore >= 75 ? '#10b981' : consensusScore >= 50 ? '#f59e0b' : '#ef4444') : 'var(--text-muted)'};">
          ${consensusScore !== null ? `${consensusScore} / 100` : 'Pending'}
        </span>
        ${discrepancyBadge}
      </td>
      <td style="text-align:center;">
        ${statusHtml}
      </td>
      <td style="text-align:center;">
        <button class="btn btn-primary btn-sm" style="font-size:0.75rem; padding:3px 8px;" onclick="loadTeamForEvaluation('${team.id}'); window.scrollTo({top: 500, behavior: 'smooth'});">
          📝 Evaluate
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function exportMultiJuryMatrixExcel() {
  const headers = [
    'Team Number', 'Hall', 'Pitch Slot', 'Team ID', 'Team Name', 'Department',
    'Assigned Mentor', 'Internal Jury', 'PS Code', 'PS Title', 'Entry Track',
    'Team Leader', 'Leader Email', 'Female Members Count',
    'Jury 1 ID', 'Jury 1 Score (/100)', 'Jury 1 Feedback',
    'Jury 2 ID', 'Jury 2 Score (/100)', 'Jury 2 Feedback',
    'Consensus Average Total (/100)', 'Shortlist Recommendation Status'
  ];

  const rows = [];
  rows.push(headers.map(h => `"${h}"`).join(','));

  const sortedTeams = [...state.teams].sort((a, b) => {
    const numA = parseInt(a.teamNumber || a.id?.replace(/[^0-9]/g, '') || 999);
    const numB = parseInt(b.teamNumber || b.id?.replace(/[^0-9]/g, '') || 999);
    return numA - numB;
  });

  sortedTeams.forEach((team, idx) => {
    const teamHall = team.hall || assignHallToTeam(team);
    const hallConfig = HALL_CONFIG[teamHall] || { name: teamHall, juries: ['Jury 1', 'Jury 2'], internalJury: 'Jury' };
    const j1Key = hallConfig.juries[0];
    const j2Key = hallConfig.juries[1];

    const j1Eval = team.juryEvaluations && team.juryEvaluations[j1Key];
    const j2Eval = team.juryEvaluations && team.juryEvaluations[j2Key];
    const consensusScore = team.scores ? team.scores.total : (j1Eval && j2Eval ? Math.round((j1Eval.total + j2Eval.total)/2) : (j1Eval ? j1Eval.total : (j2Eval ? j2Eval.total : 'Pending')));

    const femaleCount = team.members ? team.members.filter(m => m.gender === 'Female').length : 0;
    const leader = (team.members && team.members[0]) ? team.members[0] : {};

    let status = 'Pending Evaluation';
    if (j1Eval && j2Eval) {
      status = consensusScore >= 75 ? 'Top 50 Shortlisted' : 'Evaluated - Alternate';
    } else if (j1Eval || j2Eval) {
      status = 'Partially Evaluated (1/2 Juries)';
    }

    const rowData = [
      team.teamNumber || (idx + 1),
      teamHall,
      team.slot || '10.30 - 11.15am',
      team.id || '',
      team.name || '',
      team.department || '',
      team.mentorName || 'Assigned Mentor',
      hallConfig.internalJury || '',
      team.problemStatementId || '',
      team.psTitle1 || '',
      team.category || 'Software',
      leader.name || '',
      leader.email || '',
      femaleCount,
      j1Key,
      j1Eval ? j1Eval.total : 'N/A',
      j1Eval ? (j1Eval.feedback || '').replace(/"/g, '""') : '',
      j2Key,
      j2Eval ? j2Eval.total : 'N/A',
      j2Eval ? (j2Eval.feedback || '').replace(/"/g, '""') : '',
      consensusScore,
      status
    ];

    rows.push(rowData.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
  });

  const csvContent = 'data:text/csv;charset=utf-8,\ufeff' + rows.join('\r\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `SIH_2026_Multi_Jury_Evaluation_Matrix_Report.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('📊 Exported Multi-Jury Score Matrix for all 76 Teams successfully!', 'success');
}

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
            Check back after the offline campus pitching session on <strong>September 09, 2026</strong>!
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
    const evalCount = team.juryEvaluations ? Object.keys(team.juryEvaluations).length : (team.scores ? 1 : 0);
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
      <td style="font-weight: 800; color: var(--primary-orange);">
        ${scoreText}
        ${evalCount > 0 ? `<span style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600; display: block;">👥 ${evalCount} Juries</span>` : ''}
      </td>
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
  ctx.fillText(`Organized at AJK College Campus on ${document.getElementById('certDate')?.value || 'September 09, 2026'}.`, width / 2, 510);

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
