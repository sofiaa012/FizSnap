function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function setTips(tips) {
  const ul = document.getElementById("tipsList");
  ul.innerHTML = "";
  tips.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    ul.appendChild(li);
  });
}

const dataRaw = localStorage.getItem("chapterFeedback");
const data = dataRaw ? JSON.parse(dataRaw) : null;

// fallback if nothing stored
const chapter = data?.chapter ?? 1;
const score = data?.score ?? 0;
const timeUsed = data?.timeUsed ?? 0;
const livesLeft = data?.livesLeft ?? 0;
const isWin = data?.isWin ?? false;

document.getElementById("statChapter").textContent = chapter;
document.getElementById("statScore").textContent = score;
document.getElementById("statTime").textContent = formatTime(timeUsed);
document.getElementById("statLives").textContent = livesLeft;

const resultTitle = document.getElementById("resultTitle");
const summary = document.getElementById("learningSummary");
const resultImage = document.getElementById("resultImage");

const starRating = document.getElementById("starRating");
const ratingText = document.getElementById("ratingText");

// total pairs = cards.length / 2 (Chapter 1: 7 pairs)
// untuk feedback page, kita boleh anggap score = matchedPairs
const totalPairs = data?.totalPairs ?? 7;
const accuracyRatio = totalPairs ? (score / totalPairs) : 0;

// masaUsed dalam file kamu seconds; kalau jadi negatif, clamp ke 0
const safeTimeUsed = Math.max(0, Number(timeUsed) || 0);

// kiraan ringkas: fokus pada (win/lose + score + lives + masa)
let stars = 1;

if (isWin) stars += 1;                // win bonus
if (accuracyRatio >= 0.85) stars += 1; // score tinggi
if (livesLeft >= 2) stars += 1;        // banyak nyawa tinggal
if (safeTimeUsed <= 180) stars += 1;   // cepat (<= 3 min)

stars = Math.min(5, Math.max(1, stars));

// render stars
starRating.innerHTML = "";
for (let i = 1; i <= 5; i++) {
  const iconClass = i <= stars ? "fa-solid fa-star" : "fa-regular fa-star";
  starRating.insertAdjacentHTML("beforeend", `<i class="${iconClass}"></i>`);
}

// text ikut rating
const messages = {
  1: "Perlu cuba lagi, fokus pada konsep asas.",
  2: "Baik, ulang sekali lagi untuk lebih memahami.",
  3: "Bagus, anda sudah faham kebanyakan konsep.",
  4: "Sangat bagus, hampir sempurna!",
  5: "Cemerlang, prestasi terbaik!"
};
ratingText.textContent = messages[stars];

document.querySelector(".feedback-card")
  .classList.add(isWin ? "win" : "lose");

const FEEDBACK_BANK = {
  1: {
    winSummary:
      "Tahniah! Anda berjaya memadankan kad Bab 1 dengan tepat. Ini menunjukkan anda faham konsep pengukuran seperti unit SI serta asas graf (kecerunan dan persamaan garis lurus). Teruskan latihan untuk lebih yakin.",
    loseSummary:
      "Anda hampir berjaya. Ulang Bab 1 untuk kukuhkan ingatan unit SI dan konsep graf. Fokus pada pasangan kad yang melibatkan simbol unit dan formula kecerunan.",
    winTips: [
      "Ingat unit SI asas: panjang (m), jisim (kg), masa (s), suhu (K), arus (A).",
      "Kecerunan graf: (y2 − y1) / (x2 − x1).",
      "Persamaan garis lurus: y = mx + c; kaitkan m dengan kecerunan."
    ],
    loseTips: [
      "Padankan nama kuantiti dengan unit dan simbol (contoh: panjang ↔ metre, m).",
      "Ulang semula formula kecerunan dan kenal pasti y1, y2, x1, x2 dengan betul.",
      "Main lebih teratur: ingat lokasi kad unit (m, kg, s, K, A) sebelum flip kad lain."
    ]
  },

  2: {
    winSummary:
      "Bagus! Anda menguasai Bab 2 (Daya dan Gerakan). Anda menunjukkan pemahaman tentang laju, halaju, pecutan, momentum, impuls dan Hukum Newton. Cuba main semula untuk tingkatkan ketepatan dan masa.",
    loseSummary:
      "Cuba lagi. Bab 2 ada banyak formula yang hampir sama. Fokus bezakan laju vs halaju, serta momentum vs impuls supaya tidak tersalah padan.",
    winTips: [
      "Bezakan laju dan halaju: laju v = d/t, halaju v = s/t.",
      "Pecutan: a = (v − u) / t; sesaran: s = 1/2 (u + v) t.",
      "Daya dan gerakan: F = ma, berat W = mg; momentum p = mv; impuls J = Ft = mv − mu."
    ],
    loseTips: [
      "Cari kata kunci pada kad: distance (d) vs displacement (s), final velocity (v) vs initial (u).",
      "Untuk momentum: guna prinsip pemuliharaan (m1u1 + m2u2 = m1v1 + m2v2).",
      "Ulang kaji ringkas formula utama sebelum main semula untuk elak keliru."
    ]
  },

  3: {
    winSummary:
      "Tahniah! Anda berjaya dalam Bab 3 (Graviti). Ini menunjukkan anda faham hukum kegravitian Newton, pecutan graviti, serta konsep pecutan dan daya memusat untuk satelit.",
    loseSummary:
      "Anda hampir berjaya. Ulang Bab 3 dan fokus pada perbezaan formula graviti (r, R, h) serta formula memusat (v²/r).",
    winTips: [
      "Hukum graviti semesta Newton: F = (G m1 m2) / r².",
      "Pecutan graviti: g = GM / (R + h)²; di permukaan bumi: g = GM / R².",
      "Konsep memusat: a = v²/r dan F = m v² / r; laju satelit v = √(GM / (R + h))."
    ],
    loseTips: [
      "Pastikan anda tahu maksud r, R dan h (jarak, jejari bumi, altitud).",
      "Bezakan formula g di permukaan (R²) vs pada altitud (R+h)².",
      "Jika nampak v²/r, itu berkait pecutan/ daya memusat — bukan graviti terus."
    ]
  },

  4: {
    winSummary:
      "Cemerlang! Anda menguasai Bab 4 (Haba). Anda dapat memadankan konsep muatan haba, muatan haba tentu, haba pendam tentu serta hubungan tekanan dengan isipadu.",
    loseSummary:
      "Tidak mengapa. Ulang Bab 4 dan fokus pada struktur formula Q serta beza antara C, c dan l. Ini yang selalu mengelirukan semasa padanan kad.",
    winTips: [
      "Muatan haba: C = Q / Δθ.",
      "Muatan haba tentu: c = Q / (m Δθ).",
      "Haba pendam tentu: l = Q / m; tekanan berkait songsang dengan isipadu: P ∝ 1/V."
    ],
    loseTips: [
      "Cari pemboleh ubah m: jika ada m, biasanya c atau l (bukan C).",
      "Δθ hanya muncul untuk C dan c (bukan l).",
      "Buat padanan ikut petunjuk: C (total), c (per kg per perubahan suhu), l (per kg perubahan keadaan)."
    ]
  },

  5: {
    winSummary:
      "Bagus! Anda berjaya untuk Bab 5 (Gelombang). Anda jelas memahami laju gelombang, frekuensi, panjang gelombang dan hubungan pembiasan.",
    loseSummary:
      "Cuba lagi. Bab gelombang mudah keliru antara v, f, λ dan T. Fokus pada hubungan utama v = fλ dan f = 1/T.",
    winTips: [
      "Hubungan asas gelombang: v = fλ.",
      "Frekuensi: f = 1/T.",
      "Pembiasan gelombang: v1/λ1 = v2/λ2; panjang gelombang boleh muncul sebagai λ = ax/D (ikut konteks eksperimen)."
    ],
    loseTips: [
      "Jika nampak 1/T, itu frekuensi (f).",
      "Jika nampak fλ, itu laju gelombang (v).",
      "Ulang kaji makna simbol v, f, λ, T supaya padanan lebih cepat."
    ]
  },

  6: {
    winSummary:
      "Tahniah! Anda mantap dalam Bab 6 (Cahaya dan Optik). Anda berjaya memadankan indeks biasan, Hukum Snell serta formula kanta nipis dengan tepat.",
    loseSummary:
      "Cuba semula. Bab optik selalu keliru antara indeks biasan n, hukum Snell dan formula kanta. Fokus pada bentuk formula dan simbol sudut.",
    winTips: [
      "Indeks biasan: n = c/v (laju cahaya dalam vakum dibahagi laju dalam medium).",
      "Hukum Snell: n2/n1 = sinθ1 / sinθ2.",
      "Formula kanta nipis: 1/f = 1/u + 1/v; kenal pasti f, u dan v dengan betul."
    ],
    loseTips: [
      "Jika ada sinθ, itu Hukum Snell (pembiasan).",
      "Jika ada 1/f, 1/u, 1/v, itu formula kanta nipis.",
      "Bezakan c (vakum) dan v (medium) untuk indeks biasan supaya tidak tersalah padan."
    ]
  }
};



const pack = FEEDBACK_BANK[chapter] ?? FEEDBACK_BANK[1];

if (isWin) {
  resultImage.src = "images/win.png";
  resultTitle.textContent = "Tahniah! Anda Berjaya";
  summary.textContent = pack.winSummary;
  setTips(pack.winTips);
} else {
  resultImage.src = "images/lost.png";
  resultTitle.textContent = "Maaf, Anda Tidak Berjaya";
  summary.textContent = pack.loseSummary;
  setTips(pack.loseTips);
}


document.getElementById("btnRetry").addEventListener("click", () => {
  window.location.href = `chapter${chapter}.html`;
});

document.getElementById("btnNext").addEventListener("click", () => {
  // adjust this when chapter2.html exists
  window.location.href = `chapter${chapter + 1}.html`;
});

const homeIcon = document.querySelector(".home-icon");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // scrolling down → fade out
    homeIcon.classList.add("fade-out");
  } else {
    // scrolling up → fade in
    homeIcon.classList.remove("fade-out");
  }

  lastScrollY = currentScrollY;
});
