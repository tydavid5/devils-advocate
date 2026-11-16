"use client";

import { useState } from "react";
import { EXAMPLES } from "../lib/demo";

const PROBLEM = "Ever had an idea and nobody tells you the flaw? They just say it sounds great, it looks great, it is a banger idea. Devil's Advocate checks your idea for flaws, and tells you straight whether it actually checks out.";

function strengthLabel(s) {
  return s === "strong" ? "Strong hit" : s === "weak" ? "Weak hit" : "Medium hit";
}

export default function Home() {
  const [input, setInput] = useState(EXAMPLES[0].question);
  const [exampleId, setExampleId] = useState(EXAMPLES[0].id);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [modeLabel, setModeLabel] = useState("");

  function pickExample(ex) {
    setExampleId(ex.id);
    setInput(ex.question);
    setResult(null);
    setError("");
    setModeLabel("");
  }

  async function run() {
    if (!input.trim()) {
      setError("Type or pick an idea first.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/argue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input, exampleId: exampleId })
      });
      const body = await res.json();
      if (!body.ok) {
        throw new Error(body.error || "The argument call failed.");
      }
      setResult(body);
      setModeLabel(body.live ? "Live SERV Reasoning" : "Demo mode, sample reasoning, no live SERV call");
    } catch (e) {
      setError(e.message || "The argument call failed.");
    }
    setLoading(false);
  }

  const data = result ? result.data : null;
  const verdictClass = data && data.verdict === "Strong" ? "verdictStrong" : data && data.verdict === "Weak" ? "verdictWeak" : "verdictShaky";

  return (
    <>
      <header className="nav">
        <div className="navInner">
          <a className="brand" href="#top">
            <img src="/logo.png" alt="Devil's Advocate logo" width="32" height="32" />
            Devil&apos;s <em>Advocate</em>
          </a>
          <nav className="navLinks">
            <a href="#try">Try it</a>
            <a href="#how">How it works</a>
          </nav>
        </div>
      </header>

      <main className="wrap" id="top">
        <section className="hero">
          <span className="kicker">SERV Hackathon 02, Open Track</span>
          <h1>Your idea.<br /><span>Cross-examined.</span></h1>
          <p className="lede">{PROBLEM}</p>
        </section>

        <section className="strip" aria-label="What you get">
          <div><b><i>01</i> Verdict</b><span>Strong, Shaky, or Weak, with a confidence score.</span></div>
          <div><b><i>02</i> Weakest link</b><span>The one flaw that sinks the idea, named plainly.</span></div>
          <div><b><i>03</i> Fix</b><span>What to change so the idea holds up.</span></div>
          <div><b><i>04</i> Steelman</b><span>The strongest version of your idea, in one sentence.</span></div>
        </section>

        <section className="card" id="try">
          <p className="cardTitle">Put your idea on the stand</p>
          <label htmlFor="idea">Paste your idea, plan, or argument</label>
          <textarea
            id="idea"
            value={input}
            onChange={function (e) { setInput(e.target.value); setExampleId(""); }}
            placeholder="Type your idea, plan, or argument here"
          />
          <div className="examples">
            {EXAMPLES.map(function (ex) {
              return (
                <button key={ex.id} className={exampleId === ex.id ? "exampleBtn active" : "exampleBtn"} onClick={function () { pickExample(ex); }}>
                  {ex.label}: {ex.short}
                  <small>One tap, runs instantly</small>
                </button>
              );
            })}
          </div>
          <div className="actions">
            <button className="btn btnPrimary" onClick={run} disabled={loading}>{loading ? "Checking..." : "Check This Idea"}</button>
            <button className="btn btnGhost" onClick={function () { setInput(""); setExampleId(""); setResult(null); setError(""); setModeLabel(""); }}>Clear</button>
          </div>
          {modeLabel ? <div className={modeLabel.indexOf("Demo") === 0 ? "notice noticeDemo" : "notice noticeLive"}>{modeLabel}</div> : null}
          {error ? <div className="notice noticeError">{error}</div> : null}
        </section>

        {data ? (
          <section className="card resultCard">
            <p className="cardTitle">The ruling</p>
            <div className="verdictRow">
              <p className={"verdict verdictStamp " + verdictClass}>Verdict: {data.verdict}</p>
            </div>
            <div className="confBar"><div className="confFill" style={{ width: data.confidence + "%" }} /></div>
            <p className="confLine">Confidence: <b>{data.confidence} out of 100</b> {result.live ? "(live SERV call)" : "(sample)"}</p>

            <div className="weakBox">
              <strong>Weakest link:</strong> {data.weakest_link}
              <p><strong>Fix it:</strong> {data.weakest_link_fix}</p>
            </div>

            <ol className="steps">
              {data.counterarguments.map(function (arg, i) {
                const cls = arg.strength === "strong" ? "stepStrong" : arg.strength === "weak" ? "stepWeak" : "stepMedium";
                return (
                  <li key={i} className={"step " + cls} style={{ animationDelay: (i * 0.12) + "s" }}>
                    <div className="stepTop">
                      <span className="stepTitle">{i + 1}. {arg.title}</span>
                      <span className="stepStatus">{strengthLabel(arg.strength)}</span>
                    </div>
                    <p>{arg.reason}</p>
                    <p className="stepEvidence">What would settle it: {arg.evidence_needed}</p>
                    <p className="stepEvidence">Fix: {arg.fix}</p>
                  </li>
                );
              })}
            </ol>

            <div className="flip"><strong>What would change the verdict:</strong> {data.changes_verdict}</div>
            <div className="steelBox"><strong>Steelman, the strongest version of your idea:</strong> {data.steelman}</div>
            {result.demo ? <p className="stepEvidence">Demo mode, sample reasoning, no live SERV call.</p> : null}
          </section>
        ) : null}

        <section className="card" id="how">
          <p className="cardTitle">How it works</p>
          <div className="howGrid">
            <div><b className="num">01</b><p>You paste any idea, plan, or argument, or tap one of the 3 examples.</p></div>
            <div><b className="num">02</b><p>SERV Reasoning judges the idea fairly, weighing its merits, evidence, and logic first, then finding genuine flaws, as a visible graph of counterarguments, each with a strength, a reason, and what evidence would settle it.</p></div>
            <div><b className="num">03</b><p>You get a verdict, Strong, Shaky, or Weak, the one weakest link, a fix for it, and a steelman, so you leave with a better idea, not just a rejection.</p></div>
          </div>
        </section>

        <p className="footer"><b>Devil&apos;s Advocate, built with SERV Reasoning.</b><br />No accounts. No analytics. Nothing you paste is collected, stored, or tracked.</p>
      </main>
    </>
  );
}
