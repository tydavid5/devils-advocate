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
    <main className="wrap">
      <section className="hero">
        <span className="badge">SERV Hackathon 02, Open Track</span>
        <h1>Devil's <span>Advocate</span></h1>
        <p>{PROBLEM}</p>
      </section>

      <section className="card">
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
          <button className="btn btnPrimary" onClick={run} disabled={loading}>{loading ? "Arguing..." : "Argue Against It"}</button>
          <button className="btn btnGhost" onClick={function () { setInput(""); setExampleId(""); setResult(null); setError(""); setModeLabel(""); }}>Clear</button>
        </div>
        {modeLabel ? <div className={modeLabel.indexOf("Demo") === 0 ? "notice noticeDemo" : "notice noticeLive"}>{modeLabel}</div> : null}
        {error ? <div className="notice noticeError">{error}</div> : null}
      </section>

      {data ? (
        <section className="card">
          <p className={"verdict " + verdictClass}>Verdict: {data.verdict}</p>
          <div className="confBar"><div className="confFill" style={{ width: data.confidence + "%" }} /></div>
          <p>Confidence: {data.confidence} out of 100 {result.live ? "(live SERV call)" : "(sample)"}</p>

          <div className="weakBox">
            <strong>Weakest link:</strong> {data.weakest_link}
            <p style={{ margin: "8px 0 0" }}><strong>Fix it:</strong> {data.weakest_link_fix}</p>
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
      ) : (
        <section className="card">
          <h2 style={{ marginTop: 0 }}>How it works</h2>
          <p>1. You paste any idea, plan, or argument, or tap one of the 3 examples.</p>
          <p>2. SERV Reasoning builds the strongest case against it, as a visible graph of counterarguments, each with a strength, a reason, and what evidence would settle it.</p>
          <p>3. You get a verdict, Strong, Shaky, or Weak, the one weakest link, a fix for it, and a steelman, so you leave with a better idea, not just a rejection.</p>
        </section>
      )}

      <p className="footer">Devil's Advocate, built with SERV Reasoning.</p>
    </main>
  );
}
