import React, { useEffect } from 'react';
import DPImage from './images/DPImage.png';
import './App.css';

const App = () => {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];

    /* ---- nav scrolled + progress ---- */
    const nav = document.querySelector('.nav');
    const progress = document.querySelector('.progress');
    const onScroll = () => {
      const y = window.scrollY;
      if (nav) nav.classList.toggle('scrolled', y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener('scroll', onScroll));

    /* ---- mobile menu ---- */
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    const onToggle = () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
    };
    const linkAnchors = links ? Array.from(links.querySelectorAll('a')) : [];
    const closeMenu = () => {
      if (links) links.classList.remove('open');
      if (toggle) toggle.classList.remove('open');
    };
    if (toggle && links) {
      toggle.addEventListener('click', onToggle);
      linkAnchors.forEach(a => a.addEventListener('click', closeMenu));
      cleanups.push(() => {
        toggle.removeEventListener('click', onToggle);
        linkAnchors.forEach(a => a.removeEventListener('click', closeMenu));
      });
    }

    /* ---- reveal on scroll ---- */
    const revs = document.querySelectorAll('.reveal');
    let revealIO;
    if ('IntersectionObserver' in window && !reduce) {
      revealIO = new IntersectionObserver((ents) => {
        ents.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            revealIO.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revs.forEach(r => revealIO.observe(r));
      cleanups.push(() => revealIO.disconnect());
    } else {
      revs.forEach(r => r.classList.add('in'));
    }

    /* ---- scroll spy ---- */
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const spy = new IntersectionObserver((ents) => {
      ents.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
    cleanups.push(() => spy.disconnect());

    /* ---- typing role line ---- */
    const typeEl = document.querySelector('[data-type]');
    let typeTimer;
    if (typeEl) {
      const roles = ['Agentic AI Systems', 'Production ML Engineer', 'Semantic Memory · RAG · MCP', 'Real-time Voice Agents'];
      let w = 0, c = 0, del = false;
      const tick = () => {
        const cur = roles[w];
        if (!del) {
          typeEl.textContent = cur.slice(0, c + 1); c++;
          if (c === cur.length) { del = true; typeTimer = setTimeout(tick, 1800); return; }
          typeTimer = setTimeout(tick, 70 + Math.random() * 40);
        } else {
          typeEl.textContent = cur.slice(0, c - 1); c--;
          if (c === 0) { del = false; w = (w + 1) % roles.length; typeTimer = setTimeout(tick, 320); return; }
          typeTimer = setTimeout(tick, 38);
        }
      };
      if (reduce) { typeEl.textContent = roles[0]; } else { tick(); }
      cleanups.push(() => clearTimeout(typeTimer));
    }

    /* ---- count-up metrics ---- */
    const counters = document.querySelectorAll('[data-count]');
    let countIO;
    if ('IntersectionObserver' in window && !reduce) {
      countIO = new IntersectionObserver((ents) => {
        ents.forEach(e => {
          if (!e.isIntersecting) return;
          countIO.unobserve(e.target);
          const el = e.target;
          const target = parseFloat(el.dataset.count);
          const dur = 1400, t0 = performance.now();
          const numNode = el.querySelector('.n') || el;
          const step = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = target % 1 === 0 ? Math.round(eased * target) : (eased * target).toFixed(1);
            numNode.textContent = val;
            if (p < 1) requestAnimationFrame(step);
            else numNode.textContent = target % 1 === 0 ? target : target.toFixed(1);
          };
          requestAnimationFrame(step);
        });
      }, { threshold: 0.5 });
      counters.forEach(c => countIO.observe(c));
      cleanups.push(() => countIO.disconnect());
    } else {
      counters.forEach(c => {
        const n = c.querySelector('.n') || c;
        n.textContent = c.dataset.count;
      });
    }

    /* ---- magnetic buttons ---- */
    const magneticHandlers = [];
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce) {
      document.querySelectorAll('[data-magnetic]').forEach(el => {
        const strength = parseFloat(el.dataset.magnetic) || 0.3;
        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        };
        const onLeave = () => { el.style.transform = ''; };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        magneticHandlers.push({ el, onMove, onLeave });
      });
      cleanups.push(() => {
        magneticHandlers.forEach(({ el, onMove, onLeave }) => {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        });
      });
    }

    /* ---- custom cursor ---- */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const dot = document.createElement('div'); dot.className = 'cursor-dot';
      const ring = document.createElement('div'); ring.className = 'cursor-ring';
      document.body.append(dot, ring);
      let rx = 0, ry = 0, dx = 0, dy = 0, raf;
      const onMouse = (e) => {
        dx = e.clientX; dy = e.clientY;
        dot.style.left = dx + 'px'; dot.style.top = dy + 'px';
      };
      window.addEventListener('mousemove', onMouse);
      const loop = () => {
        rx += (dx - rx) * 0.18; ry += (dy - ry) * 0.18;
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      const ringTargets = document.querySelectorAll('a, button, .work-card, .exp-row, .metric-card, .paper');
      const onEnter = () => ring.classList.add('hover');
      const onLeave = () => ring.classList.remove('hover');
      ringTargets.forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
      cleanups.push(() => {
        window.removeEventListener('mousemove', onMouse);
        cancelAnimationFrame(raf);
        ringTargets.forEach(el => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
        });
        dot.remove();
        ring.remove();
      });
    }

    return () => cleanups.forEach(fn => fn());
  }, []);

  const resumeHref = `${process.env.PUBLIC_URL}/Resume.pdf`;
  const year = new Date().getFullYear();

  return (
    <>
      <div className="grain"></div>
      <div className="progress"></div>

      {/* ===================== NAV ===================== */}
      <header className="nav">
        <a href="#top" className="nav-logo">Het Patel<span className="star">*</span></a>
        <nav className="nav-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#work" className="nav-link">Work</a>
          <a href="#research" className="nav-link">Research</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href={resumeHref} target="_blank" rel="noopener noreferrer" className="nav-resume" data-magnetic="0.25">Résumé ↗</a>
        </nav>
        <button className="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
      </header>

      <main id="top">
        {/* ===================== HERO ===================== */}
        <section className="hero" id="hero">
          <div className="wrap">
            <div className="hero-avail reveal"><span className="dot"></span>Open to ML / AI engineering roles</div>
            <h1 className="hero-statement reveal" data-d="1">I build <em>agentic&nbsp;AI</em> systems that ship to production.</h1>

            <div className="hero-current reveal" data-d="2">
              <span className="lab">Currently</span>
              <span className="dash"></span>
              <span className="val"><span data-type></span><span className="cur"></span></span>
            </div>

            <div className="hero-bottom reveal" data-d="3">
              <p className="hero-desc">ML software developer in Toronto working on <b>semantic memory</b>, <b>RAG</b> and <b>voice agents</b> — building <b>Memanto</b> at Moorcheh.ai and healthcare agents at <b>Wedge&nbsp;(YC&nbsp;S25)</b>. Two published papers, GPA 3.7 Honours.</p>
              <div className="hero-cta">
                <a href="#contact" className="btn btn-fill" data-magnetic="0.3">Get in touch <span className="arr">↗</span></a>
                <a href={resumeHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Résumé</a>
              </div>
            </div>

            <div className="marquee reveal" data-d="4">
              <div className="marquee-track">
                <span className="marquee-item"><b>LangChain</b><span className="sep">/</span><b>LangGraph</b><span className="sep">/</span><b>MCP</b><span className="sep">/</span><b>CrewAI</b><span className="sep">/</span><b>FastAPI</b><span className="sep">/</span><b>LiveKit</b><span className="sep">/</span><b>Pinecone</b><span className="sep">/</span><b>Docker</b><span className="sep">/</span><b>AWS</b><span className="sep">/</span><b>Next.js</b><span className="sep">/</span></span>
                <span className="marquee-item" aria-hidden="true"><b>LangChain</b><span className="sep">/</span><b>LangGraph</b><span className="sep">/</span><b>MCP</b><span className="sep">/</span><b>CrewAI</b><span className="sep">/</span><b>FastAPI</b><span className="sep">/</span><b>LiveKit</b><span className="sep">/</span><b>Pinecone</b><span className="sep">/</span><b>Docker</b><span className="sep">/</span><b>AWS</b><span className="sep">/</span><b>Next.js</b><span className="sep">/</span></span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT ===================== */}
        <section className="section" id="about">
          <div className="wrap">
            <div className="section-label reveal">01 / About</div>
            <div className="about-grid">
              <div>
                <p className="about-lead reveal">I'm an AI/ML developer who loves taking systems from <span className="hl">research idea</span> to <span className="hl">production</span> — and proving they work along the way.</p>
                <div className="about-body reveal" data-d="1">
                  <p>My work spans <b>LLMs, NLP, agentic systems, semantic memory</b> and AI-based data pipelines. I'm currently leading development of <b>Memanto</b>, an AI memory-layer agent at Moorcheh.ai — building the gateway and evaluation pipeline alongside it — and contributing to large-scale LLM evaluation work.</p>
                  <p>I recently completed an Honours Bachelor of Computer Science (Data Analytics) at Sheridan College and co-authored two research papers presented at international conferences. On the side I build multilingual voice agents, semantic-search products, and contribute to open-source LangChain integrations.</p>
                  <p>My background spans <b>IIoT, full-stack development and cloud</b> — which makes me a well-rounded problem solver who's comfortable owning a system end-to-end.</p>
                </div>
              </div>
              <aside className="about-card reveal" data-d="1">
                <div className="about-portrait"><img src={DPImage} alt="Het Patel" /></div>
                <div className="about-facts">
                  <div className="about-fact"><span className="k">Based in</span><span className="v">Toronto, ON</span></div>
                  <div className="about-fact"><span className="k">Focus</span><span className="v">Agentic AI · ML</span></div>
                  <div className="about-fact"><span className="k">Degree</span><span className="v">CS · Data Analytics</span></div>
                  <div className="about-fact"><span className="k">Status</span><span className="v">Available</span></div>
                </div>
                <p className="about-quote">“I love analyzing car performance data almost as much as driving them.”</p>
              </aside>
            </div>
          </div>
        </section>

        {/* ===================== EXPERIENCE ===================== */}
        <section className="section" id="experience">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="section-label">02 / Experience</div>
                <h2 className="section-title">Where I've worked</h2>
              </div>
              <div className="aside">7 roles · 2023 — present</div>
            </div>

            <div className="exp-list">
              <article className="exp-row reveal">
                <div className="exp-when">Feb 2026 — Now<span className="loc">Toronto · Remote</span></div>
                <div>
                  <div className="exp-role">Software Developer</div>
                  <div className="exp-co">Moorcheh.ai <span className="badge">Full-time</span></div>
                  <ul className="exp-points">
                    <li>Built &amp; shipped <b>Memanto</b>, an AI memory-layer agent, end-to-end on Moorcheh's architecture.</li>
                    <li>Built the core memory pipeline on RAG semantic search; integrated via MCP &amp; CrewAI for multi-agent workflows.</li>
                    <li>Shipped the Memanto landing + MDX docs site (Next.js 16, R3F, Framer Motion).</li>
                  </ul>
                </div>
                <div className="exp-stack"><span className="chip">Python</span><span className="chip">FastAPI</span><span className="chip">MCP</span><span className="chip">CrewAI</span><span className="chip">Next.js</span></div>
              </article>

              <article className="exp-row reveal">
                <div className="exp-when">Jan 2026 — Now<span className="loc">Remote</span></div>
                <div>
                  <div className="exp-role">Software Engineer</div>
                  <div className="exp-co">Wedge <span className="badge">YC S25 · Part-time</span></div>
                  <ul className="exp-points">
                    <li>Building production AI agents for healthcare — referral intake, follow-up &amp; payer comms.</li>
                    <li>Shipped the <b>Automated Referral System</b>: fax ingestion + Groq LLM extraction → structured Supabase records.</li>
                    <li>Built an <b>Insurance Caller voice agent</b> on LiveKit (Deepgram + 11Labs + OpenAI) for prior-auth follow-up.</li>
                  </ul>
                </div>
                <div className="exp-stack"><span className="chip">LiveKit</span><span className="chip">Supabase</span><span className="chip">Twilio</span><span className="chip">Playwright</span></div>
              </article>

              <article className="exp-row reveal">
                <div className="exp-when">Jan 2026 — Mar 2026<span className="loc">Toronto · Remote</span></div>
                <div>
                  <div className="exp-role">Gen AI Associate</div>
                  <div className="exp-co">Innodata Inc. <span className="badge">Freelance</span></div>
                  <ul className="exp-points">
                    <li>Ran structured LLM evaluation across Locality, Freshness, Completeness &amp; OnPoint accuracy.</li>
                    <li>Applied A/B-style test frameworks &amp; human-in-the-loop review across multiple model versions.</li>
                  </ul>
                </div>
                <div className="exp-stack"><span className="chip">LLM Eval</span><span className="chip">A/B Testing</span><span className="chip">HITL</span></div>
              </article>

              <article className="exp-row reveal">
                <div className="exp-when">Sep 2024 — Aug 2025<span className="loc">Oakville · Hybrid</span></div>
                <div>
                  <div className="exp-role">AI Researcher (Part-time)</div>
                  <div className="exp-co">Sheridan — Centre for Applied AI</div>
                  <ul className="exp-points">
                    <li>Built an end-to-end ML pipeline for KPI extraction from unstructured docs (RAG + LangChain + vector indexing).</li>
                    <li>Fine-tuned LLMs with LoRA/PEFT; built a BERTopic system enhanced with LLM summaries.</li>
                    <li>Co-authored two papers accepted &amp; presented at international conferences.</li>
                  </ul>
                </div>
                <div className="exp-stack"><span className="chip">LangChain</span><span className="chip">LoRA/PEFT</span><span className="chip">BERTopic</span><span className="chip">RAG</span></div>
              </article>

              <article className="exp-row reveal">
                <div className="exp-when">May 2024 — Sep 2024<span className="loc">Oakville · Hybrid</span></div>
                <div>
                  <div className="exp-role">AI/ML Developer (Co-op)</div>
                  <div className="exp-co">Naryant — Centre for Applied AI</div>
                  <ul className="exp-points">
                    <li>Built a CTGAN synthetic-data pipeline for SUMO mobility simulations.</li>
                    <li>Owned a transportation mode-detection system end-to-end, reaching <b>92% accuracy</b>.</li>
                  </ul>
                </div>
                <div className="exp-stack"><span className="chip">CTGAN</span><span className="chip">Scikit-learn</span><span className="chip">TensorFlow</span><span className="chip">SUMO</span></div>
              </article>

              <article className="exp-row reveal">
                <div className="exp-when">May 2023 — Feb 2024<span className="loc">Milton · On-site</span></div>
                <div>
                  <div className="exp-role">IIoT Developer (Co-op)</div>
                  <div className="exp-co">Magna International</div>
                  <ul className="exp-points">
                    <li>Built real-time Ignition dashboards — <b>cut troubleshooting time 85%</b>, improved monitoring accuracy 97%.</li>
                    <li>Updated PLC programs to stream live data into custom visualizations.</li>
                  </ul>
                </div>
                <div className="exp-stack"><span className="chip">Ignition</span><span className="chip">PLC</span><span className="chip">Python</span><span className="chip">MySQL</span></div>
              </article>
            </div>
          </div>
        </section>

        {/* ===================== WORK (dark) ===================== */}
        <section className="section dark" id="work">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="section-label">03 / Selected Work</div>
                <h2 className="section-title">Things I've shipped</h2>
              </div>
              <div className="aside">{'// 2023 — 2026'}</div>
            </div>

            <div className="work-grid">
              {/* featured */}
              <article className="work-card feat col-7 reveal">
                <a className="go" href="https://arxiv.org/abs/2604.22085" target="_blank" rel="noopener noreferrer" aria-label="arXiv">↗</a>
                <span className="pn">001 — Moorcheh.ai</span>
                <h3>Memanto — AI Memory Layer</h3>
                <p>Production memory layer for AI agents. Persists &amp; retrieves context across sessions via Moorcheh's RAG semantic search, exposed as a first-class tool over MCP and integrated with CrewAI multi-agent workflows. Co-authored arXiv paper, April 2026.</p>
                <div className="stack"><span className="chip">Python</span><span className="chip">FastAPI</span><span className="chip">Pydantic</span><span className="chip">MCP</span><span className="chip">CrewAI</span><span className="chip">Moorcheh SDK</span></div>
              </article>

              {/* metric: Magna */}
              <article className="metric-card col-5 reveal" data-d="1" data-count="85">
                <span className="pn">002 — Magna International</span>
                <div>
                  <div className="num"><span className="n">0</span><span className="pct">%</span></div>
                  <p className="mlab"><b>Reduction in troubleshooting time</b> with real-time IIoT SCADA dashboards — plus 97% better monitoring accuracy.</p>
                </div>
              </article>

              {/* voice agent */}
              <article className="work-card col-4 reveal">
                <a className="go" href="#work" aria-label="View">↗</a>
                <span className="pn">003 — Wedge · YC S25</span>
                <h3>Insurance Voice Agent</h3>
                <p>Outbound LiveKit agent calling payers for verification &amp; prior-auth — Deepgram STT, 11Labs TTS, low-latency turn-taking over Twilio.</p>
                <div className="stack"><span className="chip">LiveKit</span><span className="chip">Deepgram</span><span className="chip">OpenAI</span></div>
              </article>

              {/* referral */}
              <article className="work-card col-4 reveal" data-d="1">
                <a className="go" href="#work" aria-label="View">↗</a>
                <span className="pn">004 — Wedge · YC S25</span>
                <h3>Automated Referral System</h3>
                <p>Fax ingestion + LLM extraction (Groq + pdfplumber) → structured Supabase referrals, triage agent &amp; scheduled follow-up.</p>
                <div className="stack"><span className="chip">FastAPI</span><span className="chip">Supabase</span><span className="chip">Groq</span></div>
              </article>

              {/* contextiq */}
              <article className="work-card col-4 reveal" data-d="2">
                <a className="go" href="https://github.com/het0814/ContextIQ-rag-chatbot" target="_blank" rel="noopener noreferrer" aria-label="GitHub">↗</a>
                <span className="pn">005 — Production RAG</span>
                <h3>ContextIQ</h3>
                <p>End-to-end RAG with hybrid vector search (Pinecone + pgvector), re-ranking, query rewriting &amp; groundedness scoring.</p>
                <div className="stack"><span className="chip">LangChain</span><span className="chip">Pinecone</span><span className="chip">Docker</span></div>
              </article>

              {/* metric: Naryant */}
              <article className="metric-card col-4 reveal" data-count="92">
                <span className="pn">006 — Naryant</span>
                <div>
                  <div className="num"><span className="n">0</span><span className="pct">%</span></div>
                  <p className="mlab"><b>Classification accuracy</b> on a transportation mode-detection system, owned end-to-end.</p>
                </div>
              </article>

              {/* restro */}
              <article className="work-card col-4 reveal" data-d="1">
                <a className="go" href="#work" aria-label="View">↗</a>
                <span className="pn">007 — Personal</span>
                <h3>Restro — Voice IVR</h3>
                <p>Real-time multilingual restaurant agent (English, Hindi, Gujarati, Punjabi) — SIP ingress, streaming STT, low-latency TTS.</p>
                <div className="stack"><span className="chip">LiveKit</span><span className="chip">Claude</span><span className="chip">Cartesia</span></div>
              </article>

              {/* fairlens */}
              <article className="work-card col-4 reveal" data-d="2">
                <a className="go" href="https://github.com/het0814/Fairlens" target="_blank" rel="noopener noreferrer" aria-label="GitHub">↗</a>
                <span className="pn">008 — AI for Good</span>
                <h3>FairLens</h3>
                <p>AI hiring tool that anonymizes résumés, runs NLP bias detection &amp; visualizes diversity metrics in a live dashboard.</p>
                <div className="stack"><span className="chip">Flask</span><span className="chip">Dash</span><span className="chip">GPT-4o</span></div>
              </article>
            </div>
          </div>
        </section>

        {/* ===================== RESEARCH ===================== */}
        <section className="section" id="research">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="section-label">04 / Research</div>
                <h2 className="section-title">Published work</h2>
              </div>
              <div className="aside">3 papers · intl. conferences</div>
            </div>
            <div className="research-list">
              <a className="paper reveal" href="https://arxiv.org/abs/2604.22085" target="_blank" rel="noopener noreferrer">
                <span className="pidx">P.01</span>
                <div>
                  <h3>Memanto: Typed Semantic Memory with Information-Theoretic Retrieval for Long-Horizon Agents</h3>
                  <div className="meta">Abtahi, Rahnema, <span className="you">Patel&nbsp;H.</span>, Patel&nbsp;N., Fekri, Khani</div>
                </div>
                <span className="venue">arXiv · 2026 <span className="arr">↗</span></span>
              </a>
              <a className="paper reveal" data-d="1" href="#research">
                <span className="pidx">P.02</span>
                <div>
                  <h3>Topic Modeling Enhancement using Summaries Generated by LLM Models</h3>
                  <div className="meta">BERTopic enhanced with LLM-generated summaries for richer semantic clustering</div>
                </div>
                <span className="venue">Intl. Conf. · 2025 <span className="arr">↗</span></span>
              </a>
              <a className="paper reveal" data-d="2" href="#research">
                <span className="pidx">P.03</span>
                <div>
                  <h3>Integrating Knowledge &amp; Data-Driven Methods to Generate Synthetic Mobility Data</h3>
                  <div className="meta">Synthetic data generation using CTGAN for mobility simulations</div>
                </div>
                <span className="venue">Intl. Conf. · 2024 <span className="arr">↗</span></span>
              </a>
            </div>
          </div>
        </section>

        {/* ===================== SKILLS ===================== */}
        <section className="section" id="skills">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="section-label">05 / Toolkit</div>
                <h2 className="section-title">What I work with</h2>
              </div>
            </div>
            <div className="skills-grid">
              <div className="skill-group reveal"><h4>Agentic &amp; Orchestration <span className="gn">/01</span></h4>
                <div className="skill-tags"><span>LangGraph</span><span>LangChain</span><span>CrewAI</span><span>MCP</span><span>AutoGen</span><span>Semantic Kernel</span><span>Tool Calling</span></div></div>
              <div className="skill-group reveal" data-d="1"><h4>ML &amp; AI Systems <span className="gn">/02</span></h4>
                <div className="skill-tags"><span>PyTorch</span><span>TensorFlow</span><span>Scikit-learn</span><span>LoRA/PEFT</span><span>RAG</span><span>BERTopic</span><span>Hugging Face</span></div></div>
              <div className="skill-group reveal" data-d="2"><h4>Voice &amp; Conversational <span className="gn">/03</span></h4>
                <div className="skill-tags"><span>LiveKit</span><span>Deepgram</span><span>11Labs</span><span>Twilio SIP</span><span>Silero VAD</span><span>Vapi</span></div></div>
              <div className="skill-group reveal"><h4>LLM APIs &amp; SDKs <span className="gn">/04</span></h4>
                <div className="skill-tags"><span>Anthropic</span><span>OpenAI</span><span>Gemini</span><span>Groq</span><span>Vertex AI</span><span>Moorcheh SDK</span></div></div>
              <div className="skill-group reveal" data-d="1"><h4>Vector &amp; Retrieval <span className="gn">/05</span></h4>
                <div className="skill-tags"><span>Pinecone</span><span>pgvector</span><span>Chroma</span><span>Milvus</span><span>Redis</span><span>Hybrid Search</span><span>Re-ranking</span></div></div>
              <div className="skill-group reveal" data-d="2"><h4>Cloud &amp; Infra <span className="gn">/06</span></h4>
                <div className="skill-tags"><span>AWS</span><span>Azure</span><span>GCP</span><span>Docker</span><span>Kubernetes</span><span>CI/CD</span><span>Vercel</span></div></div>
              <div className="skill-group reveal"><h4>Languages <span className="gn">/07</span></h4>
                <div className="skill-tags"><span>Python</span><span>TypeScript</span><span>JavaScript</span><span>R</span><span>C++</span><span>C#</span></div></div>
              <div className="skill-group reveal" data-d="1"><h4>Web &amp; Frameworks <span className="gn">/08</span></h4>
                <div className="skill-tags"><span>Next.js</span><span>React</span><span>Tailwind</span><span>FastAPI</span><span>Flask</span><span>Three.js / R3F</span></div></div>
              <div className="skill-group reveal" data-d="2"><h4>MLOps &amp; Eval <span className="gn">/09</span></h4>
                <div className="skill-tags"><span>MLflow</span><span>A/B Testing</span><span>HITL Review</span><span>Groundedness</span><span>pytest</span><span>LoCoMo</span></div></div>
            </div>
          </div>
        </section>

        {/* ===================== EDUCATION + CERTS ===================== */}
        <section className="section" id="education">
          <div className="wrap">
            <div className="section-head reveal">
              <div>
                <div className="section-label">06 / Education</div>
                <h2 className="section-title">Foundations</h2>
              </div>
            </div>
            <div className="edu-grid">
              <div className="edu-card reveal">
                <div className="edu-deg">Honours Bachelor of Computer Science <span style={{ color: 'var(--clay)' }}>(Data Analytics)</span></div>
                <div className="edu-school">Sheridan College — Ontario, Canada</div>
                <div className="edu-when">Jan 2022 — Apr 2025</div>
                <div className="edu-stats">
                  <div className="s"><div className="v">3.7</div><div className="l">GPA · Honours</div></div>
                  <div className="s"><div className="v">2</div><div className="l">papers published</div></div>
                  <div className="s"><div className="v">11</div><div className="l">certifications</div></div>
                </div>
                <div className="edu-focus">
                  <span className="chip">Data Analytics</span><span className="chip">Machine Learning</span><span className="chip">AI Systems</span><span className="chip">Cloud Computing</span>
                </div>
              </div>
              <div className="certs reveal" data-d="1">
                <h4>Selected Certifications</h4>
                <div className="cert"><span className="cn">Prompt Engineering &amp; Programming with OpenAI</span><span className="ci">Columbia · 25</span></div>
                <div className="cert"><span className="cn">Machine Learning I</span><span className="ci">Columbia · 25</span></div>
                <div className="cert"><span className="cn">OCI Generative AI Professional</span><span className="ci">Oracle · 25</span></div>
                <div className="cert"><span className="cn">OCI Data Science Professional</span><span className="ci">Oracle · 25</span></div>
                <div className="cert"><span className="cn">GitHub Foundations</span><span className="ci">Microsoft · 25</span></div>
                <div className="cert-more">+ 6 more — Cisco, Databricks, MongoDB, AWS, Postman</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CONTACT (dark) ===================== */}
        <section className="section dark contact" id="contact">
          <div className="wrap">
            <div className="contact-lead reveal">07 / Contact</div>
            <h2 className="contact-big reveal" data-d="1">Let's build<br />something good.</h2>
            <a href="mailto:hetkumar.patel1403@gmail.com" className="contact-mail reveal" data-d="2" data-magnetic="0.15">
              hetkumar.patel1403@gmail.com <span className="arr">↗</span>
            </a>

            <footer className="footer reveal" data-d="2">
              <div className="footer-socials">
                <a href="https://github.com/het0814" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg viewBox="0 0 24 24"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7 0-.7 0-.7 1.2 0 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.3.8 1 .8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" /></svg></a>
                <a href="https://linkedin.com/in/h3t08" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2 2 0 1 1 0-4.1 2 2 0 0 1 0 4.1zM7.1 20.4H3.6V9h3.5v11.4zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7c0-.9-.8-1.7-1.8-1.7z" /></svg></a>
                <a href="mailto:hetkumar.patel1403@gmail.com" aria-label="Email"><svg viewBox="0 0 24 24"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-10 6.3L2 8V6l10 6.3L22 6v2z" /></svg></a>
              </div>
              <div className="footer-meta">Designed &amp; built by <b>Het Patel</b> · Toronto · © {year}</div>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
