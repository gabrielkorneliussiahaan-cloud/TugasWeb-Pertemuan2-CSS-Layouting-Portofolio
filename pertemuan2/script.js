// ====================================================================
// UBAH DI SINI: foto dan kontak Instagram kamu
// ====================================================================
const CONFIG = {
  // Taruh file fotomu di folder yang sama dengan index.html, lalu tulis
  // nama filenya di sini. Boleh juga pakai link foto online (https://...)
  photoUrl: "foto-profil.jpg",

  // Ganti dengan username Instagram kamu (boleh pakai @ atau tidak)
  instagram: "@g4bbiell_",

  // Teks yang "diketik" di terminal hero setelah "$ whoami"
  typedIntro:
    "Mahasiswa PSIK 25C. Percaya bahwa melayani orang lain adalah panggilan, dan paling semangat kalau sudah pegang raket bulutangkis. Sedang belajar jadi programmer yang berhasil, satu hari satu langkah.",
};
// ====================================================================

/* ---------- FOTO ---------- */
const img = document.getElementById("photo");
const placeholder = document.getElementById("photo-placeholder");

if (CONFIG.photoUrl && CONFIG.photoUrl.trim() !== "") {
  img.src = CONFIG.photoUrl;
  img.onerror = () => {
    img.style.display = "none";
    placeholder.style.display = "flex";
  };
  img.onload = () => {
    placeholder.style.display = "none";
  };
} else {
  img.style.display = "none";
}

/* ---------- INSTAGRAM ---------- */
const handle = CONFIG.instagram.replace("@", "");
const igLink = document.getElementById("ig-link");
igLink.textContent = "@" + handle;
igLink.href = "https://instagram.com/" + handle;

/* ---------- EFEK MENGETIK DI TERMINAL HERO ---------- */
const typedOutput = document.getElementById("typed-output");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

function typeText(el, text, speed) {
  if (prefersReducedMotion) {
    el.textContent = text;
    return;
  }
  let i = 0;
  function step() {
    el.textContent = text.slice(0, i);
    i++;
    if (i <= text.length) {
      setTimeout(step, speed);
    }
  }
  step();
}

typeText(typedOutput, CONFIG.typedIntro, 18);

/* ---------- BONUS: DARK MODE ----------
   Secara default, situs ini memang bertema dark/tech (lihat :root di
   styles.css) dan tetap mengikuti @media (prefers-color-scheme: dark).
   Tombol di bawah ini adalah opsi TAMBAHAN untuk override manual ke
   varian terang, selama sesi berjalan (lewat atribut data-theme). */
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀️";
    themeLabel.textContent = "light_mode";
    themeToggle.setAttribute("aria-pressed", "false");
  } else {
    root.setAttribute("data-theme", "dark");
    themeIcon.textContent = "🌙";
    themeLabel.textContent = "dark_mode";
    themeToggle.setAttribute("aria-pressed", "true");
  }
}

// Situs ini didesain dark-by-default, tapi tetap dicek ke preferensi
// sistem dulu supaya pengguna yang benar-benar suka mode terang OS-nya
// bisa langsung melihat varian light saat pertama buka halaman.
let currentTheme = prefersDark.matches ? "dark" : "dark";
applyTheme(currentTheme);

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(currentTheme);
});

/* ---------- TOMBOL UNDUH CV (cetak / simpan sebagai PDF) ---------- */
document.getElementById("print-btn").addEventListener("click", () => {
  window.print();
});

/* ---------- SCROLL REVEAL ---------- */
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ---------- HITUNG NAIK ANGKA STATISTIK ---------- */
function animateCount(el, target, duration) {
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out
    el.textContent = Math.round(eased * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll(".stat-row__value[data-count]");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute("data-count"), 10);
        animateCount(entry.target, target, 1400);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

statNums.forEach((el) => statsObserver.observe(el));
