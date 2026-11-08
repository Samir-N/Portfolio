import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import img1 from "./assets/images/img1.jpg";
import img2 from "./assets/images/img2.jpg";
import img3 from "./assets/images/img3.jpg";
import img4 from "./assets/images/img5.jpg";
import img5 from "./assets/images/img6.jpg";
import img6 from "./assets/images/img7.jpg";
import img7 from "./assets/images/img8.jpg";

import barberImage from "./assets/images/front.png";
import pikachuImg from "./assets/images/pikachu.png";
import raichuImg from "./assets/images/raichu.jpg";
import bgMusic from "./assets/audio/bg.mp3";
import "./App.css";

const ME = {
  name: "Samir Niroula",
  role: "Backend Developer",
  location: "Nepal",
  email: "samirniroua79@gmail.com",
  github: "https://github.com/Samir-N",
  bio: "Myself Samir Niroula, 18 yold student",
};

const PROJECTS = [
  {
    number: "01",
    title: "Barber Booking App",
    year: "2026",
    status: "In progress",
    tagline:
      "Skip the waiting-room chaos: book a slot and watch the queue update live.",
    highlights: [
      {
        title: "Live queue",
        text: "Real-time status updates pushed with Socket.IO.",
      },
      {
        title: "Easy booking",
        text: "Appointments and queue handled in one place.",
      },
      {
        title: "Secure login",
        text: "JWT-based authentication for every user.",
      },
    ],
    description:
      "A barber appointment and queue management app with booking, status updates, and authentication.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.IO", "JWT"],
    image: barberImage,
    github: "https://github.com/Samir-N/BarberQueueManagement",
    live: "https://barber-queue-management.vercel.app",
  },
];

const EDUCATION = [
  {
    title: "BE Computer Engineering",
    institution: "TU-affiliated Engineering College",
    period: "2026 — Present",
  },
  {
    title: "+2 Technical Computer Engineering",
    institution: "Himalaya Secondary School",
    period: "Completed",
  },
  {
    title: "Secondary Education Examination",
    institution: "Himalaya Secondary School",
    period: "Completed",
  },
];

const EXPERIENCE = [
  {
    role: "QA Intern",
    organization: "Damak Municipality, Nepal",
    period: "2026",
    details: [
      "Helped maintain office computers and resolve hardware and software issues.",
      "Supported the QA team with Unit and Integrated Testing",
    ],
  },
];

const TECH_GROUPS = [
  {
    level: "core",
    label: "Core",
    note: "My main tools",
    items: ["Node.js", "Express.js", "MongoDB", "React"],
  },
  {
    level: "solid",
    label: "Comfortable",
    note: "Use them often",
    items: ["Next.js", "Socket.IO", "Git", "Vercel"],
  },
  {
    level: "learning",
    label: "Learning",
    note: "Getting better",
    items: ["Docker", "AWS","Typescript"],
  },
];

/* ── Theme ─────────────────────────────────────────── */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

/* ── Scroll reveal ────────────────────────────────── */

function useScrollReveal(ready = true) {
  useEffect(() => {
    if (!ready) return;

    const elements = document.querySelectorAll("[data-reveal]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [ready]);
}

/* ── Background music ─────────────────────────────── */

function useBackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(bgMusic);

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.15;
    audio.playbackRate = 0.8;

    audioRef.current = audio;

    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  }, []);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      void play();
    }
  }, [isPlaying, play, stop]);

  // stop the music when the visitor leaves the tab or the page
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) stop();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", stop);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", stop);
    };
  }, [stop]);

  return { isPlaying, toggleMusic };
}

/* ── Reusable components ──────────────────────────── */

function Reveal({ children, className = "" }) {
  return (
    <div className={className} data-reveal>
      {children}
    </div>
  );
}

/* ── Protected image ──────────────────────────────── */

function ProtectedImage({
  src,
  alt,
  className = "",
  loading = "lazy",
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitUserDrag: "none",
        pointerEvents: "none",
      }}
    />
  );
}

function Rule({ label }) {
  return (
    <div className="rule-wrap" aria-hidden="true">
      <span className="rule-line" />
      {label && <span className="rule-label">{label}</span>}
      <span className="rule-line" />
    </div>
  );
}

function MusicWidget({ isPlaying, onToggle, small = false }) {
  return (
    <button
      className={`music-widget${small ? " music-widget--sm" : ""}`}
      type="button"
      onClick={onToggle}
      aria-pressed={isPlaying}
      aria-label={
        isPlaying
          ? "Turn background music off"
          : "Turn background music on"
      }
    >
      <span
        className={`music-widget__dot${isPlaying ? " is-playing" : ""}`}
      />
      <span>{isPlaying ? "Music on" : "Music off"}</span>
    </button>
  );
}

/* ── Background removal (edge flood-fill) ────────── */

// Turns the flat background of a JPG transparent, in the browser.
// It only removes background-coloured pixels connected to the image edge,
// so whites inside the character (eyes, belly) are kept.
function useCutout(src, tolerance = 55) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      const scale = Math.min(
        1,
        480 / Math.max(img.naturalWidth, img.naturalHeight)
      );
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, w, h);

      let imageData;
      try {
        imageData = ctx.getImageData(0, 0, w, h);
      } catch {
        return; // canvas blocked: keep the original image
      }

      const d = imageData.data;

      // background colour = average of the four corners
      const corners = [0, w - 1, (h - 1) * w, h * w - 1];
      let r = 0, g = 0, b = 0;
      corners.forEach((i) => {
        r += d[i * 4];
        g += d[i * 4 + 1];
        b += d[i * 4 + 2];
      });
      r /= 4; g /= 4; b /= 4;

      const dist2 = (i) => {
        const dr = d[i * 4] - r;
        const dg = d[i * 4 + 1] - g;
        const db = d[i * 4 + 2] - b;
        return dr * dr + dg * dg + db * db;
      };

      const tol2 = tolerance * tolerance;
      const removed = new Uint8Array(w * h);
      const stack = [];

      const push = (i) => {
        if (!removed[i] && dist2(i) <= tol2) {
          removed[i] = 1;
          stack.push(i);
        }
      };

      for (let x = 0; x < w; x++) {
        push(x);
        push((h - 1) * w + x);
      }
      for (let y = 0; y < h; y++) {
        push(y * w);
        push(y * w + w - 1);
      }

      while (stack.length) {
        const i = stack.pop();
        const x = i % w;
        if (x > 0) push(i - 1);
        if (x < w - 1) push(i + 1);
        if (i >= w) push(i - w);
        if (i < w * (h - 1)) push(i + w);
      }

      const soft2 = tol2 * 3;

      for (let i = 0; i < w * h; i++) {
        if (removed[i]) {
          d[i * 4 + 3] = 0;
          continue;
        }

        const x = i % w;
        const touchesBg =
          (x > 0 && removed[i - 1]) ||
          (x < w - 1 && removed[i + 1]) ||
          (i >= w && removed[i - w]) ||
          (i < w * (h - 1) && removed[i + w]);

        // soften the JPG halo around the edge
        if (touchesBg) d[i * 4 + 3] = dist2(i) < soft2 ? 0 : 170;
      }

      ctx.putImageData(imageData, 0, 0);

      if (!cancelled) setUrl(canvas.toDataURL("image/png"));
    };

    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src, tolerance]);

  return url;
}

/* ── Minecraft dirt burst on click ────────────────── */

const DIRT_COLORS = ["#866043", "#593d29", "#7a5230", "#9b7653", "#6b4a31"];

function useDirtClick() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handlePointerDown = (event) => {
      if (reduced.matches) return;

      for (let i = 0; i < 12; i += 1) {
        const size = [6, 8, 10][Math.floor(Math.random() * 3)];
        const dx = (Math.random() - 0.5) * 90;
        const up = -(18 + Math.random() * 40);
        const fall = 50 + Math.random() * 60;

        const bit = document.createElement("span");
        bit.className = "dirt-bit";
        bit.style.left = `${event.clientX - size / 2}px`;
        bit.style.top = `${event.clientY - size / 2}px`;
        bit.style.width = `${size}px`;
        bit.style.height = `${size}px`;
        bit.style.backgroundColor =
          DIRT_COLORS[Math.floor(Math.random() * DIRT_COLORS.length)];
        document.body.appendChild(bit);

        // pop up and out, then drop with gravity
        const animation = bit.animate(
          [
            { transform: "translate(0, 0)", opacity: 1, easing: "ease-out" },
            {
              transform: `translate(${dx * 0.6}px, ${up}px)`,
              opacity: 1,
              offset: 0.35,
              easing: "ease-in",
            },
            {
              transform: `translate(${dx}px, ${up + fall}px)`,
              opacity: 0,
            },
          ],
          { duration: 550 + Math.random() * 300, fill: "forwards" }
        );

        animation.onfinish = () => bit.remove();
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);
}

/* ── Pikachu scroll runner (click to evolve) ──────── */

const EVOLVE_MS = 2600;

// Which way each image faces in its original artwork:
// 1 = faces right, -1 = faces left. (Both arts face left.)
// If a sprite ever runs backwards while scrolling, flip its value.
const PIKACHU_FACES = -1;
const RAICHU_FACES = -1;

function PikachuProgress() {
  const runnerRef = useRef(null);
  const fillRef = useRef(null);
  const stageRef = useRef("pikachu");
  const evolveTimer = useRef(null);
  const idleTimer = useRef(null);

  const [percent, setPercent] = useState(0);
  const [facing, setFacing] = useState(1); // 1 = running right (scrolling down)
  const [moving, setMoving] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [stage, setStage] = useState("pikachu"); // pikachu | evolving | raichu

  const raichuSrc = useCutout(raichuImg) || raichuImg;

  const changeStage = useCallback((next) => {
    stageRef.current = next;
    setStage(next);
  }, []);

  const evolve = () => {
    if (stageRef.current !== "pikachu") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    changeStage("evolving");
    setHovered(false);

    evolveTimer.current = setTimeout(
      () => changeStage("raichu"),
      reduced ? 600 : EVOLVE_MS
    );
  };

  useEffect(
    () => () => {
      clearTimeout(evolveTimer.current);
      clearTimeout(idleTimer.current);
    },
    []
  );

  // run along the bottom as the page scrolls
  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;

      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      const pct = progress * 100;

      if (runnerRef.current) {
        runnerRef.current.style.left = `${pct}%`;
        runnerRef.current.style.transform = `translateX(-${pct}%)`;
      }

      if (fillRef.current) fillRef.current.style.width = `${pct}%`;

      setPercent(Math.round(pct));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const handleScroll = () => {
      const y = window.scrollY;

      if (y !== lastY) {
        setFacing(y > lastY ? 1 : -1);
        setMoving(true);
        clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => setMoving(false), 160);
        lastY = y;
      }

      schedule();
    };

    update();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", schedule);

    // page height changes as images load and sections reveal
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(schedule)
        : null;

    observer?.observe(document.body);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const done = percent >= 100;
  const showTip = hovered && stage === "pikachu" && !done;

  return (
    <div className="scroll-run">
      <div
        className="scroll-run__track"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className="scroll-run__fill" ref={fillRef} />
      </div>

      <div className={`pikachu pikachu--${stage}`} ref={runnerRef}>
        {!showTip && !done && (
          <span className="scroll-run__pct" aria-hidden="true">
            {percent}%
          </span>
        )}

        {done && (
          <div className="scroll-run__thanks" role="status">
            Thanks for visiting!
          </div>
        )}

        <button
          className="pikachu__btn"
          type="button"
          aria-label={
            stage === "pikachu" ? "Evolve Pikachu" : "Raichu"
          }
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={evolve}
        >
          {showTip && (
            <span className="pikachu__tip" aria-hidden="true">
              Evolve?
            </span>
          )}

          {stage === "evolving" && (
            <span className="pikachu__glow" aria-hidden="true" />
          )}

          <span
            className={`pikachu__sprite${moving ? " is-moving" : ""}`}
            style={{ transform: `scaleX(${facing})`, "--facing": facing }}
          >
            {stage === "pikachu" && (
              <img
                className="pikachu__img"
                src={pikachuImg}
                style={{ transform: `scaleX(${PIKACHU_FACES})` }}
                alt=""
                draggable={false}
              />
            )}

            {stage === "evolving" && (
              <>
                <img
                  className="pikachu__img evo-a"
                  src={pikachuImg}
                  style={{ transform: `scaleX(${PIKACHU_FACES})` }}
                  alt=""
                  draggable={false}
                />
                <img
                  className="pikachu__img pikachu__img--raichu evo-b"
                  src={raichuSrc}
                  style={{ transform: `scaleX(${RAICHU_FACES})` }}
                  alt=""
                  draggable={false}
                />
              </>
            )}

            {stage === "raichu" && (
              <img
                className="pikachu__img pikachu__img--raichu pikachu__img--pop"
                src={raichuSrc}
                style={{ transform: `scaleX(${RAICHU_FACES})` }}
                alt=""
                draggable={false}
              />
            )}
          </span>

          {stage === "raichu" && (
            <span className="pikachu__burst" aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => (
                <i key={i} style={{ "--a": `${i * 45}deg` }} />
              ))}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── Loading screen ───────────────────────────────── */

const LOADER_MS = 2000;
const LOADER_EXIT_MS = 700;

const LOADER_MESSAGES = [
  { upTo: 30, text: "Warming up" },
  { upTo: 65, text: "Loading projects" },
  { upTo: 99, text: "Almost there" },
  { upTo: 100, text: "Ready" },
];

function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const t = Math.min((now - start) / LOADER_MS, 1);
      // ease in-out so it feels like real loading
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      setProgress(Math.round(eased * 100));

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!leaving) return;

    const id = setTimeout(onFinish, LOADER_EXIT_MS);
    return () => clearTimeout(id);
  }, [leaving, onFinish]);

  const message = LOADER_MESSAGES.find((m) => progress <= m.upTo).text;

  return (
    <div
      className={`loader${leaving ? " loader--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="loader__inner">
        <p className="loader__logo" aria-hidden="true">
          SN<span>.</span>
        </p>

        <p className="loader__name">
          Samir Niroula <span>/</span> Backend Developer
        </p>

        <div
          className="loader__bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span
            className="loader__fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="loader__meta">
          <span className="loader__msg">{message}</span>
          <span className="loader__count">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Settings dropdown (theme + music) ────────────── */

function SettingsMenu({ theme, onThemeChange, isPlaying, toggleMusic }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="settings" ref={wrapRef}>
      <button
        className="theme-toggle settings__toggle"
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="settings-panel"
        onClick={() => setOpen((current) => !current)}
      >
        Settings <span aria-hidden="true">{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div
          className="settings__panel"
          id="settings-panel"
          role="group"
          aria-label="Settings"
        >
          <div className="settings__row">
            <span className="settings__label">Theme</span>

            <button
              className="theme-toggle"
              type="button"
              onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } theme`}
            >
              {theme === "dark" ? "☾ Dark" : "☀ Light"}
            </button>
          </div>

          <div className="settings__row">
            <span className="settings__label">Music</span>

            <MusicWidget isPlaying={isPlaying} onToggle={toggleMusic} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Navigation ───────────────────────────────────── */

function Navbar({ theme, onThemeChange, isPlaying, toggleMusic }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#stack" },
    { label: "Pictures", href: "#pictures" },
    { label: "Contact", href: "#contact" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a className="navbar__brand" href="#home" onClick={closeMenu}>
          SN<span className="navbar__brand-dot">.</span>
        </a>

        <button
          className="navbar__menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close −" : "Menu +"}
        </button>

        <nav
          className={`navbar__links${menuOpen ? " navbar__links--open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar__controls">
          <SettingsMenu
            theme={theme}
            onThemeChange={onThemeChange}
            isPlaying={isPlaying}
            toggleMusic={toggleMusic}
          />
        </div>
      </div>
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────── */

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__inner">
        <Reveal className="hero__content">
          <p className="eyebrow">Portfolio / 2026</p>

          <h1 className="hero__name">
            Samir
            <br />
            Niroula<span className="hero__period">.</span>
          </h1>

          <p className="hero__role">
            <strong className="hero__role-hl">Backend Developer</strong>{" "}
            <span>—</span> Nepal
          </p>

          <p className="hero__bio">{ME.bio}</p>

          <div className="hero__status">
            <span className="status-dot" />
            Open to internships &amp; collaborations
          </div>

          <div className="hero__contact">
            <span className="hero__contact-label">Reach me</span>

            <a
              className="retro-link"
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                ME.email
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email Samir using Gmail"
            >
              Email ↗
            </a>

            <a
              className="retro-link"
              href={ME.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </Reveal>

        <div className="hero__aside" aria-hidden="true">
          <span className="hero__aside-number">200</span>
          <span className="hero__aside-caption">
            OK.
            <br />
            Built with care.
            <br />
            Kept simple.
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── Projects ─────────────────────────────────────── */

function Projects() {
  return (
    <section className="page-section page-section--alt" id="projects">
      <div className="page-section__inner">
        <Reveal>
          <p className="eyebrow">Selected work / 01</p>
          <h2 className="section-title">
            Projects<span>.</span>
          </h2>
          <p className="section-intro">
            Things I have built and learned from.
          </p>
        </Reveal>

        <div className="projects-list">
          {PROJECTS.map((project) => (
            <ProjectEntry key={project.number} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectEntry({ project }) {
  const windowRef = useRef(null);

  const handleMove = (event) => {
    if (event.pointerType === "touch" || !windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    windowRef.current.style.setProperty("--ry", `${px * 7}deg`);
    windowRef.current.style.setProperty("--rx", `${-py * 5}deg`);
  };

  const handleLeave = () => {
    if (!windowRef.current) return;

    windowRef.current.style.setProperty("--ry", "0deg");
    windowRef.current.style.setProperty("--rx", "0deg");
  };

  return (
    <Reveal className="project-entry">
      <div className="pe__head">
        <span className="pe__num" aria-hidden="true">
          {project.number}
        </span>

        <div className="pe__heading">
          <p className="pe__kicker">
            <span className="pe__badge">★ Featured</span>
            <span>{project.year}</span>
            <span className="pe__status">
              <i aria-hidden="true" />
              {project.status}
            </span>
          </p>

          <h3 className="pe__title">{project.title}</h3>
          <p className="pe__tagline">{project.tagline}</p>
        </div>
      </div>

      <div
        className="pe__stage"
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        <span className="pe__sticker" aria-hidden="true">
          Try it live →
        </span>

        <div className="pe__window" ref={windowRef}>
          <div className="pe__titlebar">
            <span className="pe__lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>

            <span className="pe__url">
              {project.live.replace("https://", "")}
            </span>

            <span className="pe__live-tag">● Live</span>
          </div>

          <a
            className="pe__shot"
            href={project.live}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title} live demo`}
          >
            <ProtectedImage
              src={project.image}
              alt={`${project.title} screenshot`}
              loading="eager"
            />

            <span className="pe__shot-cta">Open live demo ↗</span>
          </a>
        </div>
      </div>

      <p className="pe__desc">{project.description}</p>

      <ul className="pe__highlights">
        {project.highlights.map((item, index) => (
          <li key={item.title}>
            <span className="pe__hl-num">0{index + 1}</span>
            <strong>{item.title}</strong>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>

      <div className="pe__tech" aria-label="Built with">
        {project.tech.map((tech) => (
          <span className="pe__chip" key={tech}>
            {tech}
          </span>
        ))}
      </div>

      <div className="pe__links">
        <a
          className="retro-link retro-link--primary retro-link--lg"
          href={project.live}
          target="_blank"
          rel="noreferrer"
        >
          Live demo ↗
        </a>

        <a
          className="retro-link retro-link--lg"
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          Source code ↗
        </a>
      </div>
    </Reveal>
  );
}

/* ── Pictures gallery ─────────────────────────────── */

const PICTURES = [
  { image: img1, caption: "Frame No. 01", alt: "Gallery photograph one" },
  { image: img2, caption: "Frame No. 02", alt: "Gallery photograph two" },
  { image: img3, caption: "Frame No. 03", alt: "Gallery photograph three" },
  { image: img4, caption: "Frame No. 04", alt: "Gallery photograph four" },
  { image: img5, caption: "Frame No. 05", alt: "Gallery photograph five" },
  { image: img6, caption: "Frame No. 06", alt: "Gallery photograph six" },
  { image: img7, caption: "Frame No. 07", alt: "Gallery photograph seven" },
];

function Pictures() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [direction, setDirection] = useState("none"); // none | next | prev

  const swipeStart = useRef(null);
  const lastSwipeAt = useRef(0);

  const isOpen = activeIndex !== null;
  const selectedPicture = isOpen ? PICTURES[activeIndex] : null;

  const openPicture = (index) => {
    setDirection("none");
    setActiveIndex(index);
  };

  const closePicture = useCallback(() => setActiveIndex(null), []);

  // step through the gallery, wrapping around at both ends
  const go = useCallback((step) => {
    setDirection(step > 0 ? "next" : "prev");
    setActiveIndex(
      (current) =>
        (current + step + PICTURES.length) % PICTURES.length
    );
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePicture();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, go, closePicture]);

  // swipe left = next picture, swipe right = previous picture
  const handleSwipeStart = (event) => {
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const handleSwipeEnd = (event) => {
    const start = swipeStart.current;
    swipeStart.current = null;

    if (!start) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      lastSwipeAt.current = Date.now();
      go(dx < 0 ? 1 : -1);
    }
  };

  const handleBackdropClick = () => {
    // a swipe also fires a click; don't let it close the viewer
    if (Date.now() - lastSwipeAt.current < 400) return;

    closePicture();
  };

  return (
    <section
      className="page-section page-section--alt pictures-section"
      id="pictures"
    >
      <div className="page-section__inner">
        <Reveal>
          <p className="eyebrow">Visual archive / 05</p>
          <h2 className="section-title">
            Pictures<span>.</span>
          </h2>
          <p className="section-intro">
            Seven little moments, collected like prints from an old photo album.
          </p>
        </Reveal>

        <div className="pictures-gallery">
          {PICTURES.map((picture, index) => (
            <Reveal className="picture-card" key={picture.caption}>
              <button
                className={`picture-card__button picture-card__button--${
                  (index % 4) + 1
                }`}
                type="button"
                onClick={() => openPicture(index)}
                aria-label={`View ${picture.caption}`}
              >
                <span className="picture-card__photo">
                  <ProtectedImage
                    src={picture.image}
                    alt={picture.alt}
                    loading="lazy"
                  />
                </span>

                <span className="picture-card__caption">
                  <span>{picture.caption}</span>
                  <span aria-hidden="true">↗</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {selectedPicture && (
          <div
            className="picture-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={selectedPicture.caption}
            onClick={handleBackdropClick}
          >
            <button
              className="picture-lightbox__close"
              type="button"
              onClick={closePicture}
              aria-label="Close picture"
            >
              Close ×
            </button>

            <button
              className="picture-lightbox__nav picture-lightbox__nav--prev"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                go(-1);
              }}
              aria-label="Previous picture"
            >
              ‹
            </button>

            <div
              className="picture-lightbox__stage"
              onPointerDown={handleSwipeStart}
              onPointerUp={handleSwipeEnd}
              onPointerCancel={() => {
                swipeStart.current = null;
              }}
            >
              <figure
                key={activeIndex}
                className={`picture-lightbox__slide picture-lightbox__slide--${direction}`}
              >
                <ProtectedImage
                  className="picture-lightbox__image"
                  src={selectedPicture.image}
                  alt={selectedPicture.alt}
                  loading="eager"
                />

                <figcaption className="picture-lightbox__caption">
                  {selectedPicture.caption} · {activeIndex + 1} /{" "}
                  {PICTURES.length}
                </figcaption>
              </figure>
            </div>

            <button
              className="picture-lightbox__nav picture-lightbox__nav--next"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                go(1);
              }}
              aria-label="Next picture"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Education ────────────────────────────────────── */

function Education() {
  return (
    <section className="page-section" id="education">
      <div className="page-section__inner">
        <Reveal>
          <p className="eyebrow">Learning / 02</p>
          <h2 className="section-title">
            Education<span>.</span>
          </h2>
        </Reveal>

        <div className="timeline-list">
          {EDUCATION.map((item, index) => (
            <Reveal key={item.title} className="timeline-item">
              <span className="timeline-item__number">
                0{index + 1}
              </span>

              <div className="timeline-item__content">
                <h3>{item.title}</h3>
                <p>{item.institution}</p>
              </div>

              <span className="timeline-item__period">{item.period}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Experience ───────────────────────────────────── */

function Experience() {
  return (
    <section className="page-section page-section--alt" id="experience">
      <div className="page-section__inner">
        <Reveal>
          <p className="eyebrow">Where I have worked / 03</p>
          <h2 className="section-title">
            Experience<span>.</span>
          </h2>
        </Reveal>

        <div className="timeline-list">
          {EXPERIENCE.map((item, index) => (
            <Reveal key={item.role} className="experience-item">
              <div className="experience-item__top">
                <span className="timeline-item__number">
                  0{index + 1}
                </span>

                <div>
                  <h3>{item.role}</h3>
                  <p>{item.organization}</p>
                </div>

                <span className="timeline-item__period">{item.period}</span>
              </div>

              <ul className="experience-item__details">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Tech stack ───────────────────────────────────── */

function Stack() {
  return (
    <section className="page-section" id="stack">
      <div className="page-section__inner">
        <Reveal>
          <p className="eyebrow">Tools of the trade / 04</p>
          <h2 className="section-title">
            Tech stack<span>.</span>
          </h2>
          <p className="section-intro">
            From what I rely on most to what I am still picking up.
          </p>
        </Reveal>

        <div className="stack-tiers">
          {TECH_GROUPS.map((group) => (
            <Reveal
              key={group.level}
              className={`stack-tier stack-tier--${group.level}`}
            >
              <div className="stack-tier__info">
                <h3>{group.label}</h3>
                <p>{group.note}</p>
              </div>

              <ul className="stack-tier__items">
                {group.items.map((tech) => (
                  <li className="stack-chip" key={tech}>
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────── */

const CONTACT_TOPICS = [
  {
    number: "01",
    title: "Internships",
    text: "Backend roles where I can learn fast and ship real work.",
  },
  {
    number: "02",
    title: "Collaborations",
    text: "Side projects, hackathons and anything worth building.",
  },
  {
    number: "03",
    title: "Ideas",
    text: "Got something in mind? Let’s talk it through.",
  },
];

function Contact() {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(ME.email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="page-section contact" id="contact">
      <div className="page-section__inner">
        <Reveal>
          <p className="eyebrow">Have a project in mind? / 06</p>
          <h2 className="section-title contact__title">
            Let’s talk<span>.</span>
          </h2>

          <p className="contact__lead">
            This is the part that matters most. If something here caught your
            eye, an opportunity, an idea or just a question, write to me. I
            read every message.
          </p>
        </Reveal>

        <Reveal className="contact__topics">
          {CONTACT_TOPICS.map((topic) => (
            <div className="contact__topic" key={topic.title}>
              <span className="contact__topic-number">{topic.number}</span>
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal>
          <a
            className="contact__cta"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
              ME.email
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email Samir using Gmail"
          >
            <span className="contact__cta-text">
              <span className="contact__cta-label">Say hello</span>
              <span className="contact__cta-address">{ME.email}</span>
            </span>

            <span className="contact__cta-arrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <div className="contact__sub">
            <span className="contact__status">
              <span className="status-dot" />
              Open to internships &amp; collaborations
            </span>

            <span className="contact__sub-links">
              <button
                className="contact__copy"
                type="button"
                onClick={copyEmail}
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>

              <a href={ME.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────── */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a className="footer__brand" href="#home">
          SN<span>.</span>
        </a>

        <p>Designed &amp; built by Samir Niroula.</p>

        <a className="footer__top" href="#home">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

/* ── App ──────────────────────────────────────────── */

export default function App() {
  const { theme, setTheme } = useTheme();
  const { isPlaying, toggleMusic } = useBackgroundMusic();

  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  // no scrolling while the loading screen is up
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  useScrollReveal(!loading);
  useDirtClick();

  return (
    <div className="site-shell">
      {loading && <Loader onFinish={finishLoading} />}

      <Navbar
        theme={theme}
        onThemeChange={setTheme}
        isPlaying={isPlaying}
        toggleMusic={toggleMusic}
      />

      {!loading && <PikachuProgress />}

      <main>
        <Hero />
        <Rule label="Contents" />
        <Projects />
        <Experience />
        <Education />
        <Stack />
        <Pictures />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}