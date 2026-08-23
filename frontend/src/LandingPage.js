import React from "react";
import {
  ArrowRight,
  Users,
  ShieldCheck,
  Zap,
  Globe2,
  BarChart3,
  Sparkles
} from "lucide-react";

function LandingPage({ onEnterWorkspace }) {
  return (
    <div className="landing-page">

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-brand">
          <div className="landing-brand-icon">
            <Sparkles size={21} />
          </div>

          <div>
            <strong>NEXORA</strong>
            <span>Technology & People</span>
          </div>
        </div>

        <div className="landing-links">
          <a href="#about">About</a>
          <a href="#solutions">Solutions</a>
          <a href="#culture">Culture</a>

          <button onClick={onEnterWorkspace}>
            Workspace
            <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">

        <div className="hero-content">

          <div className="hero-badge">
            <span></span>
            PEOPLE • TECHNOLOGY • INNOVATION
          </div>

          <h1>
            Where great
            <br />
            <span>people build</span>
            <br />
            what comes next.
          </h1>

          <p>
            Nexora brings people, technology and intelligent operations
            together to help modern organizations build stronger teams
            and move faster.
          </p>

          <div className="hero-buttons">

            <button
              className="hero-primary"
              onClick={onEnterWorkspace}
            >
              Enter Employee Workspace
              <ArrowRight size={19} />
            </button>

            <a href="#about" className="hero-secondary">
              Discover Nexora
            </a>

          </div>

          <div className="hero-trust">
            <ShieldCheck size={17} />
            Secure • Connected • People-first
          </div>

        </div>

        <div className="hero-visual">

          <div className="visual-orbit orbit-one"></div>
          <div className="visual-orbit orbit-two"></div>

          <div className="visual-card main-visual">

            <div className="visual-top">
              <span>TEAM PULSE</span>
              <span className="live-indicator">
                <i></i>
                LIVE
              </span>
            </div>

            <div className="visual-number">
              94<span>%</span>
            </div>

            <p>Team engagement</p>

            <div className="visual-bars">
              <span style={{ height: "45%" }}></span>
              <span style={{ height: "70%" }}></span>
              <span style={{ height: "55%" }}></span>
              <span style={{ height: "88%" }}></span>
              <span style={{ height: "75%" }}></span>
              <span style={{ height: "96%" }}></span>
              <span style={{ height: "90%" }}></span>
            </div>

          </div>

          <div className="floating-card floating-one">
            <Users size={18} />
            <div>
              <strong>People</strong>
              <span>At the center</span>
            </div>
          </div>

          <div className="floating-card floating-two">
            <Zap size={18} />
            <div>
              <strong>Fast</strong>
              <span>Built to scale</span>
            </div>
          </div>

        </div>

      </section>

      {/* About */}
      <section id="about" className="landing-section">

        <div className="section-heading">
          <span>01 — ABOUT US</span>

          <h2>
            Technology should
            <br />
            empower people.
          </h2>
        </div>

        <div className="about-content">

          <p>
            At Nexora, we believe that the best technology is technology
            that makes people better at what they do. Our platform connects
            workforce operations with modern engineering practices to create
            a simple, reliable and connected workplace.
          </p>

          <p>
            From employee management to operational insights, we design
            experiences that allow teams to focus less on administration
            and more on meaningful work.
          </p>

        </div>

      </section>

      {/* Solutions */}
      <section id="solutions" className="solutions-section">

        <div className="section-heading centered">

          <span>02 — WHAT WE DO</span>

          <h2>
            One connected
            <br />
            workplace.
          </h2>

          <p>
            Designed around the people who make organizations move.
          </p>

        </div>

        <div className="solution-grid">

          <div className="solution-card">

            <div className="solution-icon purple">
              <Users size={23} />
            </div>

            <h3>People Management</h3>

            <p>
              Keep employee information organized and accessible from
              one central workspace.
            </p>

            <span className="solution-number">01</span>

          </div>

          <div className="solution-card">

            <div className="solution-icon blue">
              <BarChart3 size={23} />
            </div>

            <h3>Operational Insights</h3>

            <p>
              Turn workforce information into useful insights that help
              teams make better decisions.
            </p>

            <span className="solution-number">02</span>

          </div>

          <div className="solution-card">

            <div className="solution-icon green">
              <Globe2 size={23} />
            </div>

            <h3>Connected Operations</h3>

            <p>
              Build reliable digital workflows that connect people,
              applications and infrastructure.
            </p>

            <span className="solution-number">03</span>

          </div>

        </div>

      </section>

      {/* Culture */}
      <section id="culture" className="culture-section">

        <div className="culture-card">

          <div>

            <span className="section-label">
              03 — OUR CULTURE
            </span>

            <h2>
              Curious minds.
              <br />
              <span>Bold ideas.</span>
            </h2>

            <p>
              We encourage curiosity, ownership and continuous learning.
              Every improvement starts with a question.
            </p>

          </div>

          <div className="culture-stats">

            <div>
              <strong>01</strong>
              <span>Think deeply</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Build simply</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Improve continuously</span>
            </div>

          </div>

        </div>

      </section>

      {/* Workspace CTA */}
      <section className="workspace-cta">

        <div className="cta-glow"></div>

        <span>READY WHEN YOU ARE</span>

        <h2>
          Meet your
          <br />
          <span>workspace.</span>
        </h2>

        <p>
          Manage your team from a single, connected workspace.
        </p>

        <button
          className="hero-primary"
          onClick={onEnterWorkspace}
        >
          Open Employee Workspace
          <ArrowRight size={19} />
        </button>

      </section>

      {/* Footer */}
      <footer className="landing-footer">

        <div className="landing-brand">

          <div className="landing-brand-icon">
            <Sparkles size={18} />
          </div>

          <div>
            <strong>NEXORA</strong>
            <span>Technology & People</span>
          </div>

        </div>

        <p>
          © 2026 Nexora. Building better workplaces through technology.
        </p>

      </footer>

    </div>
  );
}

export default LandingPage;