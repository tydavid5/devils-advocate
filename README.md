# Devil's Advocate

Ever had an idea and nobody tells you the flaw? They just say it sounds great, it looks great, it is a banger idea. Devil's Advocate checks your idea for flaws, and tells you straight whether it actually checks out.

Devil's Advocate takes any idea, plan, or argument you paste in, and builds the strongest case against it as a visible reasoning graph, finds the one weakest link, and tells you how to fix it.

## How it works

1. Paste any idea, plan, or argument, or tap one of the 3 preloaded examples.
2. SERV Reasoning builds the strongest case against it, with counterarguments, each with a strength of strong, medium, or weak, a reason, and what evidence would settle it.
3. You get a verdict, Strong, Shaky, or Weak, a confidence score from 0 to 100, the one weakest link highlighted, a fix for that link, and what would change the verdict.
4. You also get a steelman, the strongest version of your original idea in one sentence, so you leave with a better idea, not just a rejection.

## Examples

1. Startup pitch: a food delivery app in a crowded city, faster than the big apps, so customers will switch.
2. Big life call: I should quit my job to start a business with no savings.
3. Team plan: our team should move to a 4 day week with no pay cut, and do the same work in 4 days.

## Track

Open Track, SERV Hackathon 02. Submissions close Sunday Nov 15, 2026, 23:59 UTC, Monday Nov 16, 00:59 WAT.

## SERV Reasoning use

Devil's Advocate calls SERV Reasoning, OpenAI compatible, at https://inference-api.openserv.ai/v1/chat/completions, from the server route at app/api/argue/route.js. Every request needs a system prompt, and the main call uses reasoning_effort medium. The app asks SERV for strict JSON with verdict, confidence, weakest_link, weakest_link_fix, changes_verdict, steelman, and counterarguments. Each counterargument has a title, strength, reason, evidence_needed, and fix.

Model used: gpt-5.4-mini-serv-multipath. This is the SERV Multipath model named in the SERV docs, which is built for branching instructions and decision trees. If the SERV catalog rejects that model id, the API route returns the exact SERV error, and the model can be changed in one place, the SERV_MODEL constant in app/api/argue/route.js.

The API key is read server side only, from process.env.SERV_API_KEY. No key is in code, in the repo, in logs, or in this README.

## Demo mode

If SERV_API_KEY is absent, the app runs in clearly labelled demo mode, with precomputed sample graphs for the 3 examples, and a generic sample graph for custom ideas. Demo mode says plainly, Demo mode, sample reasoning, no live SERV call. Demo results are never presented as live SERV results.

## Live demo

Live demo URL: https://devils-advocate-hazel.vercel.app

To run locally:

1. Copy .env.example to .env.local and add SERV_API_KEY if you have one. Leave it empty for demo mode.
2. Run npm install, then npm run dev.
3. Open http://localhost:3000, pick an example, and tap Argue Against It.

## Tech

Next.js, React, plain CSS, mobile first. One accent colour, red #b91c1c, big readable text.
