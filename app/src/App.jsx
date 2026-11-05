
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
import bgMusic from "./assets/audio/bg.mp3";
import "./App.css";

const ME = {
  name: "Samir Niroula",
  role: "Backend Developer",
  location: "Nepal",
  email: "samirniroua79@gmail.com",
  github: "https://github.com/Samir-N",
  bio: "I build practical web applications, reliable APIs, and backend systems.",
};

const PROJECTS = [
  {
    number: "01",
    title: "Barber Booking App",
    year: "2026",
    status: "In progress",
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

const TECH = [
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Socket.IO",
  "React",
  "Git",
  "Vercel",
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

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }, []);

  return { theme, toggleTheme };
}

/* ── Scroll reveal ────────────────────────────────── */

function useScrollReveal() {
  useEffect(() => {
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
  }, []);
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

/* ── Navigation ───────────────────────────────────── */

function Navbar({ theme, toggleTheme, isPlaying, toggleMusic }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Projects", href: "#projects" },
    { label: "Pictures", href: "#pictures" },
    { label: "About", href: "#about" },
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
          <MusicWidget
            isPlaying={isPlaying}
            onToggle={toggleMusic}
            small
          />

          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
            title={`Switch to ${
              theme === "light" ? "dark" : "light"
            } theme`}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
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
            Backend Developer <span>—</span> Nepal
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
          <span className="hero__aside-number">90s</span>
          <span className="hero__aside-caption">
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
  const [showImage, setShowImage] = useState(false);

  return (
    <Reveal className="project-entry">
      <div className="pe__top">
        <span className="pe__num">{project.number}.</span>

        <div className="pe__heading">
          <h3 className="pe__title">{project.title}</h3>

          <div className="pe__meta">
            <span>{project.year}</span>
            <span aria-hidden="true">/</span>
            <span className="pe__status">{project.status}</span>
          </div>
        </div>
      </div>

      <p className="pe__desc">{project.description}</p>

      <div className="pe__img-row">
        <button
          className="pe__img-toggle"
          type="button"
          aria-expanded={showImage}
          onClick={() => setShowImage((visible) => !visible)}
        >
          {showImage ? "Hide preview −" : "View preview +"}
        </button>

        {showImage && (
          <div className="pe__img-wrap">
            <ProtectedImage
              className="pe__img"
              src={project.image}
              alt={`${project.title} screenshot`}
            />
          </div>
        )}
      </div>

      <div className="pe__tech">
        <span className="pe__tech-label">Built with: </span>
        {project.tech.join(" · ")}
      </div>

      <div className="pe__links">
        <a
          className="retro-link retro-link--primary"
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          Source code ↗
        </a>

        <a
          className="retro-link"
          href={project.live}
          target="_blank"
          rel="noreferrer"
        >
          Live demo ↗
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
  const [selectedPicture, setSelectedPicture] = useState(null);

  useEffect(() => {
    if (!selectedPicture) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedPicture(null);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPicture]);

  return (
    <section className="page-section pictures-section" id="pictures">
      <div className="page-section__inner">
        <Reveal>
          <p className="eyebrow">Visual archive / 02</p>
          <h2 className="section-title">
            Pictures<span>.</span>
          </h2>
          <p className="section-intro">
            Eight little moments, collected like prints from an old photo album.
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
                onClick={() => setSelectedPicture(picture)}
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
            onClick={() => setSelectedPicture(null)}
          >
            <button
              className="picture-lightbox__close"
              type="button"
              onClick={() => setSelectedPicture(null)}
              aria-label="Close picture"
            >
              Close ×
            </button>

            <ProtectedImage
              src={selectedPicture.image}
              alt={selectedPicture.alt}
              loading="eager"
            />

            <p>{selectedPicture.caption}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Education ────────────────────────────────────── */

function Education() {
  return (
    <section className="page-section" id="about">
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
            Technologies I use to build and ship projects.
          </p>
        </Reveal>

        <Reveal className="stack-list">
          {TECH.map((tech, index) => (
            <span className="stack-item" key={tech}>
              <span className="stack-item__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              {tech}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────── */

function Contact() {
  return (
    <section className="page-section page-section--alt" id="contact">
      <div className="page-section__inner">
        <Reveal>
          <p className="eyebrow">Have a project in mind? / 05</p>
          <h2 className="section-title">
            Let’s talk<span>.</span>
          </h2>

          <p className="contact__text">
            Have an opportunity, idea, or question? Send me a message.
          </p>

          <div className="contact__links">
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
  const { theme, toggleTheme } = useTheme();
  const { isPlaying, toggleMusic } = useBackgroundMusic();

  useScrollReveal();

  return (
    <div className="site-shell">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        isPlaying={isPlaying}
        toggleMusic={toggleMusic}
      />

      <main>
        <Hero />
        <Rule label="Contents" />
        <Projects />
        <Pictures />
        <Education />
        <Experience />
        <Stack />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
