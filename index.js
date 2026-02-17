<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>System Failure | When Code Costs Lives</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');

  :root {
    --black: #0d0d0d;
    --white: #f5f5f0;
    --red: #c0392b;
    --red-light: #e74c3c;
    --gray: #888;
    --gray-light: #e8e8e4;
    --mono: 'IBM Plex Mono', monospace;
    --sans: 'IBM Plex Sans', sans-serif;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: var(--sans);
    background: var(--white);
    color: var(--black);
    font-size: 17px;
    line-height: 1.7;
  }

  nav {
    background: var(--black);
    color: var(--white);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    height: 56px;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .nav-logo {
    font-family: var(--mono);
    font-weight: 600;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
    color: var(--white);
    cursor: pointer;
  }
  .nav-logo span { color: var(--red-light); }

  .view { display: none; }
  .view.active { display: block; }

  .hero {
    background: var(--black);
    color: var(--white);
    padding: 5rem 2rem 4rem;
    text-align: center;
    border-bottom: 4px solid var(--red);
  }
  .hero-eyebrow {
    font-family: var(--mono);
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--red-light);
    margin-bottom: 1rem;
  }
  .hero h1 {
    font-size: clamp(2.8rem, 7vw, 5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.05;
    margin-bottom: 1rem;
  }
  .hero-tagline {
    font-size: 1.1rem;
    color: #aaa;
    max-width: 520px;
    margin: 0 auto 2rem;
    font-style: italic;
  }
  .logo-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border: 2px solid var(--red);
    margin-bottom: 1.5rem;
  }
  .logo-mark svg { width: 36px; height: 36px; }

  .section-header {
    padding: 3rem 2rem 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: baseline;
    gap: 1rem;
    border-bottom: 1px solid var(--gray-light);
  }
  .section-header h2 {
    font-family: var(--mono);
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--gray);
  }
  .section-header .count {
    font-family: var(--mono);
    font-size: 0.75rem;
    color: var(--red);
  }

  .grid {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
  }

  .card {
    border: 1px solid var(--gray-light);
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    background: #fff;
  }
  .card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }
  .card-image {
    height: 180px;
    background: var(--black);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-image svg { opacity: 0.15; }
  .card-label {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-family: var(--mono);
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: var(--red);
    color: white;
    padding: 3px 8px;
  }
  .card-num {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    font-family: var(--mono);
    font-size: 2.5rem;
    font-weight: 600;
    color: rgba(255,255,255,0.07);
    line-height: 1;
  }
  .card-body { padding: 1.4rem; }
  .card-body h3 {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.6rem;
  }
  .card-body p {
    font-size: 0.88rem;
    color: #555;
    line-height: 1.55;
    margin-bottom: 1rem;
  }
  .card-meta {
    display: flex;
    gap: 1rem;
    font-family: var(--mono);
    font-size: 0.7rem;
    color: var(--gray);
    letter-spacing: 0.04em;
  }
  .card-meta .tag { color: var(--red); }

  .article-wrap {
    max-width: 720px;
    margin: 0 auto;
    padding: 3rem 2rem 5rem;
  }
  .article-back {
    font-family: var(--mono);
    font-size: 0.8rem;
    color: var(--gray);
    cursor: pointer;
    letter-spacing: 0.05em;
    margin-bottom: 2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    text-transform: uppercase;
    border: none;
    background: none;
    padding: 0;
  }
  .article-back:hover { color: var(--black); }
  .article-tag {
    font-family: var(--mono);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 0.8rem;
  }
  .article-wrap h1 {
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
  }
  .article-dek {
    font-size: 1.15rem;
    color: #444;
    font-style: italic;
    margin-bottom: 1.5rem;
    line-height: 1.6;
    border-left: 3px solid var(--red);
    padding-left: 1rem;
  }
  .article-meta {
    font-family: var(--mono);
    font-size: 0.75rem;
    color: var(--gray);
    letter-spacing: 0.04em;
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--gray-light);
  }
  .article-body h2 {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 2.5rem 0 0.8rem;
    letter-spacing: -0.01em;
  }
  .article-body p {
    margin-bottom: 1.2rem;
    color: #222;
  }
  .article-body a {
    color: var(--red);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .callout {
    background: var(--black);
    color: var(--white);
    padding: 1.5rem 1.8rem;
    margin: 2rem 0;
    border-left: 4px solid var(--red);
    font-size: 1.05rem;
    line-height: 1.6;
    font-style: italic;
  }
  .callout cite {
    display: block;
    font-family: var(--mono);
    font-size: 0.75rem;
    color: #aaa;
    margin-top: 0.6rem;
    font-style: normal;
  }
  .data-box {
    background: var(--gray-light);
    border: 1px solid #ddd;
    padding: 1.5rem;
    margin: 2rem 0;
    font-family: var(--mono);
    font-size: 0.82rem;
    line-height: 1.8;
  }
  .data-box .label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--gray);
    margin-bottom: 0.8rem;
  }
  .data-box .val { color: var(--red); font-weight: 600; }
  .timeline {
    margin: 2rem 0;
    position: relative;
    padding-left: 1.5rem;
    border-left: 2px solid var(--red);
  }
  .timeline-item { margin-bottom: 1.5rem; position: relative; }
  .timeline-item::before {
    content: '';
    width: 10px;
    height: 10px;
    background: var(--red);
    border-radius: 50%;
    position: absolute;
    left: -1.95rem;
    top: 0.45rem;
  }
  .timeline-date {
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--red);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.2rem;
  }
  .timeline-item p { font-size: 0.9rem; margin: 0; }

  footer {
    background: var(--black);
    color: #666;
    text-align: center;
    padding: 2rem;
    font-family: var(--mono);
    font-size: 0.72rem;
    letter-spacing: 0.05em;
  }
  footer span { color: var(--red); }
</style>
</head>
<body>

<nav>
  <div class="nav-logo" onclick="showView('home')">SYSTEM<span>_</span>FAILURE</div>
</nav>

<div id="view-home" class="view active">
  <div class="hero">
    <div class="logo-mark">
      <svg viewBox="0 0 36 36" fill="none">
        <path d="M18 4L32 28H4L18 4Z" stroke="#c0392b" stroke-width="2" fill="none"/>
        <line x1="18" y1="14" x2="18" y2="22" stroke="#c0392b" stroke-width="2"/>
        <circle cx="18" cy="25" r="1.5" fill="#c0392b"/>
      </svg>
    </div>
    <div class="hero-eyebrow">A Blog About Software & Its Consequences</div>
    <h1>System<br>Failure</h1>
    <p class="hero-tagline">When code costs lives — investigating the real human consequences of technical decisions.</p>
  </div>

  <div class="section-header">
    <h2>Latest Entries</h2>
    <span class="count">// 3 posts</span>
  </div>

  <div class="grid">
    <div class="card" onclick="showArticle(1)">
      <div class="card-image">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect x="20" y="20" width="80" height="80" stroke="white" stroke-width="1"/>
          <line x1="20" y1="60" x2="100" y2="60" stroke="white" stroke-width="1"/>
          <line x1="60" y1="20" x2="60" y2="100" stroke="white" stroke-width="1"/>
          <circle cx="60" cy="40" r="8" stroke="#c0392b" stroke-width="2"/>
        </svg>
        <span class="card-label">Case Study</span>
        <span class="card-num">01</span>
      </div>
      <div class="card-body">
        <h3>The Therac-25: How a Race Condition Killed Six People</h3>
        <p>A radiation therapy machine, a software bug, and the cost of removing hardware safety interlocks.</p>
        <div class="card-meta">
          <span class="tag">#MedicalSoftware</span>
          <span>Feb 16, 2026</span>
        </div>
      </div>
    </div>

    <div class="card" onclick="showArticle(2)">
      <div class="card-image">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M60 20 L90 80 L30 80 Z" stroke="white" stroke-width="1" fill="none"/>
          <path d="M60 35 L80 75 L40 75 Z" stroke="#c0392b" stroke-width="1" fill="none"/>
        </svg>
        <span class="card-label">Algorithmic Bias</span>
        <span class="card-num">02</span>
      </div>
      <div class="card-body">
        <h3>The Face the Algorithm Couldn't See: Facial Recognition's Discrimination Problem</h3>
        <p>Dr. Joy Buolamwini's research showed that facial recognition systems fail darker-skinned faces at much higher rates.</p>
        <div class="card-meta">
          <span class="tag">#AlgorithmicBias</span>
          <span>Feb 16, 2026</span>
        </div>
      </div>
    </div>

    <div class="card" onclick="showArticle(3)">
      <div class="card-image">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect x="30" y="50" width="60" height="35" stroke="white" stroke-width="1"/>
          <path d="M30 50 L60 25 L90 50" stroke="white" stroke-width="1" fill="none"/>
          <line x1="50" y1="65" x2="50" y2="85" stroke="#c0392b" stroke-width="2"/>
          <line x1="70" y1="65" x2="70" y2="85" stroke="#c0392b" stroke-width="2"/>
        </svg>
        <span class="card-label">Case Study</span>
        <span class="card-num">03</span>
      </div>
      <div class="card-body">
        <h3>MCAS and the 737 MAX: When Boeing Let Software Override Pilots</h3>
        <p>Two crashes. 346 deaths. A single sensor. How cost-cutting turned a flight control system into a death trap.</p>
        <div class="card-meta">
          <span class="tag">#SafetyCritical</span>
          <span>Feb 16, 2026</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="view-article" class="view">
  <div class="article-wrap" id="article-content"></div>
</div>

<footer>
  <p>SYSTEM_FAILURE &nbsp;|&nbsp; <span>When code costs lives.</span> &nbsp;|&nbsp; A blog by Jhonyel &nbsp;|&nbsp; Northeastern University</p>
</footer>

<script>
const articles = {
  1: {
    tag: "Case Study // Medical Software",
    title: "The Therac-25: How a Race Condition Killed Six People",
    dek: "A radiation therapy machine, a software bug with no hardware safety net, and a company that insisted the problem was impossible.",
    meta: "February 16, 2026 &nbsp;|&nbsp; By Jhonyel &nbsp;|&nbsp; #MedicalSoftware #SafetyCritical",
    body: `
      <p>Between 1985 and 1987, a radiation therapy machine called the Therac-25 gave at least six patients massive overdoses of radiation. Three of them died. The machine was made by Atomic Energy of Canada Limited, and the cause was a software bug that the company insisted could not exist. This is one of the most studied disasters in software engineering history, and the reason it still matters today is that the same kinds of mistakes are still being made.</p>

      <h2>What the Machine Was</h2>
      <p>The Therac-25 was a medical linear accelerator used to treat cancer. It worked by directing a beam of energy at a tumor to destroy it. The machine had two operating modes. In electron mode, it delivered a low-power beam directly to the patient. In X-ray mode, it directed a higher-power beam through a metal target to produce X-rays. The key difference between these two modes was the position of a tungsten flattening filter. In X-ray mode, that filter had to be physically in place to reduce the beam to a safe level. Without it, the electron beam hitting the patient was roughly 100 times more powerful than it was supposed to be.</p>
      <p>AECL had built earlier versions of this machine, the Therac-6 and Therac-20, and both had hardware interlocks. These were physical switches that made it mechanically impossible to fire the beam if the components were in the wrong position. You could not accidentally deliver a massive dose because the machine simply would not let you. When AECL designed the Therac-25, they removed those interlocks and replaced them with software checks. Their reasoning was that the new machine was more advanced and computerized, and the software was reliable. They did not perform a formal safety analysis to verify that claim.</p>

      <h2>The Bug Itself</h2>
      <p>The flaw at the center of this disaster was a race condition. To understand what that means, you need a basic picture of how the Therac-25 software worked. The machine ran multiple tasks at the same time. One task managed the operator interface on screen. Another task controlled the physical hardware. These tasks ran concurrently, meaning they were both active at the same time, sharing access to the same variables in memory.</p>
      <p>The problem occurred when an operator entered commands quickly. Specifically, if they typed in a treatment mode and then immediately pressed the up-arrow key to move the cursor back and correct something, the software entered a very small timing window. In that window, the interface task and the hardware task were both trying to access the same variable at the same moment. The result was that the machine could end up in a state where the software believed it was in electron mode, but the physical hardware had been configured for X-ray mode. The tungsten filter was out of position. The beam fired at full power. Directly into a patient.</p>
      <p>This kind of bug is especially dangerous because it does not happen every time. It only happens when the timing is exactly wrong. Slower typists might never trigger it. Faster typists were more at risk. And because it was so inconsistent, it was very hard to reproduce and diagnose.</p>

      <div class="callout">
        "The software was assumed to be safe because it had been used before. But the Therac-25 was not the same as its predecessors. The interlocks were gone."
        <cite>— Nancy Leveson & Clark Turner, ACM (1993)</cite>
      </div>

      <div class="data-box">
        <div class="label">// Selected Incidents</div>
        <p><span class="val">March 1986 — Yakima, WA:</span> Patient felt a sudden jolt during treatment. Operator saw a "malfunction 54" error on screen. AECL told the hospital this error was physically impossible.</p>
        <p><span class="val">December 1986 — Tyler, TX:</span> Patient received a massive radiation overdose. She died five months later from radiation injuries.</p>
        <p><span class="val">January 1987 — Tyler, TX:</span> A second patient at the same hospital on the same machine was also overdosed. He died three months later.</p>
        <p><span class="val">Total confirmed overdose incidents:</span> <span class="val">6</span>. Confirmed fatalities: <span class="val">3</span>, with additional deaths attributed to both radiation injury and underlying cancer.</p>
      </div>

      <h2>Why It Took So Long to Stop</h2>
      <p>After the first incident was reported, AECL sent a letter to hospitals stating that the error code operators were seeing was "not physically possible." They had not done a thorough review of the software. They were operating on the assumption that a machine that had worked safely for years could not suddenly start harming patients. That assumption was wrong, and it cost lives.</p>
      <p>The error message operators saw, "MALFUNCTION 54," gave no indication of severity. It did not say the beam had misfired. It did not say a patient might have been harmed. Some operators had gotten used to seeing it occasionally and just reset the machine and continued treatment. The system gave them no reason to think anything serious had happened.</p>
      <p>There was also very little communication between hospitals. Each incident was treated as an isolated event. No one was connecting the dots across facilities until investigators started looking at the pattern. By that point, multiple people had already been injured or killed.</p>

      <h2>What the Investigation Found</h2>
      <p>Nancy Leveson and Clark Turner published a detailed investigation of the Therac-25 accidents in 1993 that is still widely read today. They identified failures at every level of the system. The software had no formal hazard analysis. There was no process for systematically reviewing whether the software could fail in dangerous ways. The company relied on the fact that earlier versions had been safe without recognizing that removing the hardware interlocks fundamentally changed the risk profile of the machine.</p>
      <p>They also found that the FDA's oversight of software-controlled medical devices was insufficient at the time. There were no clear standards requiring manufacturers to prove their software was safe before putting it in a device that could kill someone. That regulatory gap has since been addressed, but it existed long enough to contribute to this disaster.</p>

      <h2>What Developers Should Take Away</h2>
      <p>The Therac-25 is not just a historical story. It is a warning that applies to any software system that affects human safety. The core lessons are straightforward. Do not remove physical safety mechanisms and replace them with software alone unless you can formally prove the software is at least as reliable. Race conditions in safety-critical systems are not acceptable, and they cannot be caught through basic testing because they depend on timing that is hard to reproduce. Error messages need to communicate what actually happened, not just a code number. And when users report something going wrong, you take it seriously instead of telling them it is impossible.</p>
      <p>Most importantly, the Therac-25 shows what happens when an organization stops treating software as something that can fail and starts treating it as something that just works. Software is not magic. It fails. The question is whether you have built your system to survive those failures safely.</p>
      <p><em>Further reading: Leveson and Turner's original paper is freely available through the ACM digital library and remains one of the most thorough post-mortems of a software disaster ever written.</em></p>
    `
  },
  2: {
    tag: "Algorithmic Bias // AI Systems",
    title: "The Face the Algorithm Couldn't See",
    dek: "Facial recognition is sold as neutral and objective. Dr. Joy Buolamwini's research proved it is neither.",
    meta: "February 16, 2026 &nbsp;|&nbsp; By Jhonyel &nbsp;|&nbsp; #AlgorithmicBias #FacialRecognition",
    body: `
      <p>In 2016, a doctoral student at MIT was working on an art project involving robots. She needed a computer vision system to detect and track her face. The system could not find it. When she put on a white mask, it worked perfectly. The student was Joy Buolamwini, and that experience of being made invisible by an algorithm became the starting point for one of the most important AI ethics research projects of the past decade.</p>
      <p>Dr. Buolamwini went on to found the <a href="https://www.ajl.org/" target="_blank">Algorithmic Justice League</a>, publish landmark research exposing bias in commercial facial recognition systems, and write <em>Unmasking AI</em>, a book that investigates how these systems cause real harm to real people. Her website describes her as "the conscience of the AI revolution." This post is about what her research found, why it happens, and what it means for the people these systems are used on every day.</p>

      <h2>The Gender Shades Study</h2>
      <p>In 2018, Buolamwini and her collaborator Timnit Gebru published a study called Gender Shades. The goal was to test how well commercial facial analysis tools performed across different demographic groups. They built a dataset that was carefully designed to include equal representation across gender and skin tone. To measure skin tone, they used the Fitzpatrick scale, a six-point system originally developed for dermatology that ranges from the lightest to the darkest skin tones.</p>
      <p>They then tested facial analysis products from three major tech companies: Microsoft, IBM, and Face++. Each system was asked to classify faces by gender. The results were clear and consistent across all three companies. Every system performed best on lighter-skinned male faces. As faces got darker and as subjects shifted from male to female, accuracy dropped. For darker-skinned women, error rates were up to 34 percentage points higher than for lighter-skinned men. In some cases the systems were essentially guessing.</p>

      <div class="data-box">
        <div class="label">// Gender Shades Key Findings (Buolamwini & Gebru, 2018)</div>
        <p>Best accuracy — lighter-skinned males: <span class="val">up to 99.7%</span></p>
        <p>Worst accuracy — darker-skinned females: <span class="val">as low as 65.3%</span></p>
        <p>Maximum performance gap between groups: <span class="val">about 34 percentage points</span></p>
        <p>All three commercial systems tested showed bias in the same direction.</p>
      </div>

      <h2>Why This Happens</h2>
      <p>Facial recognition systems learn from data. They are shown millions of labeled images and they learn to recognize patterns from those examples. The problem is that "millions of images" does not mean "representative images." Most large facial datasets that have been scraped from the internet over-represent lighter-skinned, Western, male faces. That is because those faces are overrepresented in the sources being scraped: news websites, stock photo libraries, political databases, and other online archives that reflect existing social inequalities.</p>
      <p>A model trained on that data learns to recognize those faces very well. It sees fewer darker-skinned faces during training, so it develops weaker pattern recognition for them. This is not a conspiracy or an intentional design choice. It is a predictable, structural outcome of using convenience samples as training data. The bias gets baked in at the data collection stage, before anyone has written a single line of training code.</p>
      <p>There is also a second problem, which is that the people building these systems often do not check for this kind of disparity before releasing their products. If your test set has the same demographic skew as your training data, your accuracy numbers will look fine overall, and you will never see the performance gap for underrepresented groups. The system looks like it works. For some people, it does not.</p>

      <div class="callout">
        "If you have not seen my face before, you will not be able to see me now."
        <cite>— Dr. Joy Buolamwini</cite>
      </div>

      <h2>Where These Systems Are Being Used</h2>
      <p>This would be a frustrating but minor problem if facial recognition were only used for unlocking phones. It is not. These systems are deployed in situations where errors have serious consequences for the people they affect.</p>
      <p>In law enforcement, many police departments in the United States use facial recognition to identify suspects from surveillance footage or photos. A wrong match does not just mean an incorrect answer. It can mean an arrest, a criminal charge, and time spent in jail before the mistake gets corrected. Robert Williams, Nijeer Parks, and Michael Oliver are among the documented cases of Black men who were wrongfully arrested based on facial recognition errors. Each case involved the same pattern: a system with high error rates on darker-skinned faces, used by investigators who treated its output as reliable evidence without enough scrutiny.</p>
      <p>In hiring, some companies use automated video interview tools that analyze a candidate's facial expressions and movements to generate a score. If these tools have uneven accuracy across demographic groups, they can systematically disadvantage certain applicants without any human decision-maker ever realizing it. The bias is invisible because it is built into the tool itself.</p>
      <p>In banking and identity verification, facial recognition is increasingly used to confirm that a person is who they say they are before allowing access to an account. Higher error rates for certain users translate directly into higher rates of being locked out of their own money and financial services.</p>

      <h2>The Neutral Algorithm Myth</h2>
      <p>One of the most common things people say when confronted with evidence of algorithmic bias is that algorithms are neutral because they are mathematical. They do not have prejudices. They just run the numbers. This argument sounds reasonable but it misses something important. An algorithm trained on biased data does not become unbiased because it is mathematical. The math faithfully reproduces whatever patterns existed in the training data, including the biases. The numbers are not neutral. They reflect the world that produced them.</p>
      <p>This is why Buolamwini's framework of algorithmic accountability pushes for disaggregated evaluation. That means breaking down accuracy numbers by demographic group instead of reporting only an overall average. A system with 95% average accuracy might be performing at 99% for some groups and 65% for others. If you only report the average, you hide the harm that is being done to the people in that lower-performing group.</p>

      <h2>What Has Changed and What Has Not</h2>
      <p>The Gender Shades study had a real impact. Several cities including San Francisco and Boston banned or restricted government use of facial recognition. IBM announced in 2020 that it was exiting the facial recognition market. The EU AI Act, which took effect in 2024, classifies facial recognition as high-risk and requires strict transparency and accuracy requirements for its use.</p>
      <p>But change has been uneven. Many law enforcement agencies continue using commercial systems without mandatory audits or public disclosure requirements. Private sector use in retail, hospitality, and hiring keeps expanding with limited oversight. The same patterns Buolamwini identified in 2018 have not been fully addressed.</p>
      <p>Dr. Buolamwini had to put on a white mask so an algorithm could detect her face. That should not be how this works. The question for anyone building or deploying these systems is whether they have actually checked who their system works for, and what they are willing to do when the answer is not everyone.</p>
      <p><em>For more: Visit <a href="https://www.ajl.org/" target="_blank">ajl.org</a> and <a href="https://www.poetofcode.com/" target="_blank">poetofcode.com</a>. The Gender Shades paper is freely available online.</em></p>
    `
  },
  3: {
    tag: "Case Study // Aviation Safety",
    title: "MCAS and the 737 MAX: When Boeing Let Software Override Pilots",
    dek: "Two crashes. 346 lives. A single sensor. How Boeing built a system pilots did not know existed, and what happened when it activated on bad data.",
    meta: "February 16, 2026 &nbsp;|&nbsp; By Jhonyel &nbsp;|&nbsp; #SafetyCritical #Aviation",
    body: `
      <p>On October 29, 2018, Lion Air Flight 610 took off from Jakarta, Indonesia and crashed into the Java Sea thirteen minutes later. All 189 people onboard died. Five months after that, on March 10, 2019, Ethiopian Airlines Flight 302 took off from Addis Ababa and crashed six minutes into the flight. All 157 people onboard died. Both planes were Boeing 737 MAXs. Both crashes were caused by the same system: MCAS.</p>
      <p>This is a story about a software system that was designed to be invisible, a company that prioritized cost and schedule over safety, and a regulatory process that was not independent enough to catch what was being missed. It is also a story about what happens when pilots are expected to respond to a failure in a system they were never told existed.</p>

      <h2>Why MCAS Existed</h2>
      <p>To understand MCAS, you need to understand the business decision that made it necessary. In 2011, Airbus announced the A320neo, a fuel-efficient update to one of their best-selling aircraft. Boeing needed a competitive response and needed it quickly. Rather than design an entirely new aircraft from scratch, which takes well over a decade and costs billions of dollars, Boeing decided to update the existing 737 with new, larger, more fuel-efficient engines.</p>
      <p>The problem was physical. The new engines were bigger than what the original 737 was designed for. To keep enough ground clearance, they had to be mounted higher and further forward on the wing than the older engines. This changed the aerodynamics of the plane. Under certain conditions, specifically at high angles of attack with high engine thrust, the new engine placement caused the nose to pitch upward more than it did on the original 737. If the nose pitches up too far, the plane can stall. MCAS was the software solution to this problem. It was designed to automatically push the nose down when it detected those conditions, making the MAX handle like the older 737 models that pilots were already trained on.</p>
      <p>The engineering problem was real and the concept of a software fix was not inherently wrong. What went wrong was everything about how that fix was designed, tested, and certified.</p>

      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-date">2016</div>
          <p>Boeing certifies the 737 MAX. MCAS is designed to read from a single angle-of-attack sensor. The FAA allows Boeing to conduct significant portions of its own safety certification through a process called ODA.</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">Oct 29, 2018</div>
          <p>Lion Air 610 crashes. 189 dead. MCAS activated repeatedly based on a faulty sensor reading and pushed the nose down each time pilots tried to pull it back up.</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">Nov 2018</div>
          <p>Boeing issues a bulletin to airlines describing MCAS for the first time. The aircraft is not grounded. Airlines are told existing runaway stabilizer procedures are sufficient to handle a bad MCAS activation.</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">March 10, 2019</div>
          <p>Ethiopian Airlines 302 crashes. 157 dead. The pilots followed Boeing's recommended procedures. MCAS still could not be stopped. The entire global 737 MAX fleet is grounded within days.</p>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">Nov 2020</div>
          <p>The FAA recertifies the 737 MAX after Boeing updates MCAS to use both angle-of-attack sensors and adds a sensor disagree warning as standard equipment on all aircraft.</p>
        </div>
      </div>

      <h2>The Single Sensor Problem</h2>
      <p>Modern aircraft are built around the principle of redundancy. If one system fails, a backup takes over. Critical sensors are duplicated or triplicated so that if one gives a bad reading, others can catch it. The 737 MAX had two angle-of-attack sensors, one on each side of the fuselage. These sensors measure how steeply the nose is pointed relative to the direction the plane is actually moving, which is a key input for detecting a potential stall.</p>
      <p>In the original MCAS design, the system only read from one of those two sensors. There was no cross-check. If that sensor failed or gave a wrong reading, MCAS had no way of knowing. It would just act on the bad data as if it were accurate. That is exactly what happened on both crashed aircraft. On the Lion Air flight, the sensor had been damaged. On the Ethiopian flight, it malfunctioned shortly after takeoff. In both cases, MCAS received a signal indicating the nose was pitching up dangerously when it was not, and it responded by pushing the nose down over and over again.</p>
      <p>Boeing knew the plane had two sensors. A warning system that alerts pilots when the two sensors give conflicting readings was technically available. Boeing classified it as an optional paid upgrade. Neither of the crashed aircraft had it enabled.</p>

      <div class="callout">
        "You have redundant sensors. You have a warning that detects when they disagree. You make the warning optional. And then you build a critical flight control system that only reads one sensor."
        <cite>— Peter Lemme, aviation safety analyst, via The Seattle Times</cite>
      </div>

      <h2>The Certification Failures</h2>
      <p>How does a system with this kind of flaw get certified to fly passengers? Part of the answer is a process called Organization Designation Authorization, or ODA. Under ODA, the FAA can allow aircraft manufacturers to conduct portions of their own safety certification using company employees who are officially designated as FAA representatives. For the 737 MAX, Boeing's own engineers performed significant parts of the MCAS safety review.</p>
      <p>Congressional investigations later found that Boeing had originally told the FAA that MCAS could move the horizontal stabilizer a maximum of 0.6 degrees. By the time the aircraft was certified, that authority had been expanded to 2.5 degrees, a much larger range that gave MCAS far more power to push the nose down. The FAA was not properly informed of this change. The safety analysis was not updated to reflect it.</p>
      <p>The original hazard analysis also classified an erroneous MCAS activation as "hazardous" rather than "catastrophic." That classification mattered because a catastrophic designation would have triggered a much more rigorous certification process. The analysis assumed pilots would be able to respond to a runaway MCAS using existing procedures. That assumption was not validated, and it turned out to be wrong.</p>

      <h2>What the Pilots Faced</h2>
      <p>Put yourself in the cockpit of Lion Air 610. Shortly after takeoff, the controls start pushing the nose toward the ground. You pull back. The nose comes up. A few seconds later it pitches down again. You pull back again. It happens again. You are climbing out of a major airport, managing airspeed, talking to air traffic control, running through checklists, and fighting a system you were never told existed. The Lion Air crew dealt with this for thirteen minutes.</p>
      <p>The cutout switches that could have disabled MCAS required sustained physical force to hold in position. And even after cutting MCAS out, the aircraft was in a configuration where aerodynamic forces made the stabilizer very difficult to move manually at the speeds they were flying. The system had been deliberately designed to be resistant to easy pilot override, because the whole point of MCAS was to make sure pilots could not inadvertently fly into a stall. In a failure scenario, that resistance became the thing that killed everyone on board.</p>

      <h2>The Takeaway</h2>
      <p>Safety-critical systems cannot rely on a single point of failure, especially when redundant sensors already exist. Pilots cannot be expected to respond correctly to a system they have never been told about. And a certification process that allows the company being regulated to conduct its own safety reviews creates incentives to minimize the apparent severity of failure modes.</p>
      <p>Boeing has paid billions in fines and settlements. The 737 MAX flies again with a redesigned MCAS. But 346 people are still dead, and the families of those people watched a company treat their lives as an acceptable cost of doing business on schedule. Software is infrastructure. When we build it carelessly, or when the systems meant to catch our mistakes are compromised, that is who pays the price.</p>
    `
  }
};

function showView(v) {
  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
  document.getElementById('view-' + v).classList.add('active');
  window.scrollTo(0, 0);
}

function showArticle(id) {
  const a = articles[id];
  document.getElementById('article-content').innerHTML = `
    <button class="article-back" onclick="showView('home')">← Back to all articles</button>
    <div class="article-tag">${a.tag}</div>
    <h1>${a.title}</h1>
    <p class="article-dek">${a.dek}</p>
    <div class="article-meta">${a.meta}</div>
    <div class="article-body">${a.body}</div>
  `;
  showView('article');
}
</script>
</body>
</html>
