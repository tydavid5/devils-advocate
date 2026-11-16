import { demoFor } from "../../../lib/demo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SERV_URL = "https://inference-api.openserv.ai/v1/chat/completions";
const SERV_MODEL = "gpt-5.4-mini-serv-multipath";

function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: { "Content-Type": "application/json" }
  });
}

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < 0 || end <= start) {
    return null;
  }
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch (e) {
    return null;
  }
}

function normalise(parsed) {
  const args = Array.isArray(parsed.counterarguments) ? parsed.counterarguments : [];
  const cleanArgs = args.slice(0, 6).map(function (a) {
    const strength = a.strength === "strong" || a.strength === "medium" || a.strength === "weak" ? a.strength : "medium";
    return {
      title: String(a.title || "Counterargument"),
      strength: strength,
      reason: String(a.reason || ""),
      evidence_needed: String(a.evidence_needed || ""),
      fix: String(a.fix || "")
    };
  });
  if (cleanArgs.length === 0) {
    cleanArgs.push({ title: "No counterargument returned", strength: "medium", reason: "The model gave a verdict with no counterargument to show.", evidence_needed: "A live rerun.", fix: "Run it again." });
  }
  const verdict = String(parsed.verdict || "Shaky");
  const cleanVerdict = verdict === "Strong" || verdict === "Weak" ? verdict : "Shaky";
  const confidence = Number(parsed.confidence);
  return {
    verdict: cleanVerdict,
    confidence: Number.isFinite(confidence) ? Math.max(0, Math.min(100, confidence)) : 50,
    weakest_link: String(parsed.weakest_link || "Not named."),
    weakest_link_fix: String(parsed.weakest_link_fix || parsed.fix || ""),
    changes_verdict: String(parsed.changes_verdict || "A new fact that changes the weakest link would change the verdict."),
    steelman: String(parsed.steelman || ""),
    counterarguments: cleanArgs
  };
}

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch (e) {
    body = {};
  }
  const input = String(body.input || "").slice(0, 2000);
  const exampleId = String(body.exampleId || "");

  if (!input) {
    return jsonResponse({ ok: false, error: "Type or pick an idea first." }, 400);
  }

  const apiKey = process.env.SERV_API_KEY || "";
  if (!apiKey) {
    return jsonResponse({
      ok: true,
      live: false,
      demo: true,
      model: null,
      data: demoFor(exampleId, input)
    });
  }

  const systemPrompt = "You are Devil's Advocate, a neutral judge, not an attacker. The user gives an idea, plan, or argument. First weigh the idea on its merits, its evidence, its logic, and how plausible it is in the real world. Then find genuine flaws. Only include counterarguments that are actually true and material. If a counterargument is weak, mark it weak, do not inflate it. If there is no strong counterargument, say so in the counterarguments, do not invent one. Give a verdict of Strong, Shaky, or Weak for the idea, using these rules. Strong means the core claim holds, the logic and evidence are sound, and the flaws are minor or fixable. Shaky means the core claim is plausible but a key assumption is unproven or a major risk is unresolved. Weak means the core claim fails, the evidence contradicts it, or a fatal flaw cannot be fixed as stated. The verdict must follow the evidence, not the button that was pressed. A good idea can be Strong, and a bad idea can be Weak. Also give a confidence from 0 to 100, the one weakest link, a fix for that link in one or two sentences, what single fact would change the verdict, a steelman of the original idea in one sentence, and 4 counterarguments. Each counterargument has a title, a strength of strong, medium, or weak, a short reason, evidence_needed that would settle it, and a fix. Be specific, be fair, do not be rude, and do not invent facts. Return strict JSON only, with keys verdict, confidence, weakest_link, weakest_link_fix, changes_verdict, steelman, counterarguments. No text outside the JSON.";

  let servResponse;
  try {
    servResponse = await fetch(SERV_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: SERV_MODEL,
        reasoning_effort: "medium",
        max_tokens: 8000,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: input }
        ]
      })
    });
  } catch (e) {
    return jsonResponse({ ok: false, live: false, demo: false, error: "SERV request failed: " + String(e && e.message ? e.message : e) }, 502);
  }

  const rawText = await servResponse.text();
  if (!servResponse.ok) {
    return jsonResponse({ ok: false, live: false, demo: false, error: "SERV API error " + servResponse.status + ": " + rawText.slice(0, 500) }, 502);
  }

  let parsedOuter = null;
  try {
    parsedOuter = JSON.parse(rawText);
  } catch (e) {
    parsedOuter = null;
  }
  const content = parsedOuter && parsedOuter.choices && parsedOuter.choices[0] && parsedOuter.choices[0].message ? parsedOuter.choices[0].message.content : rawText;
  const parsed = typeof content === "string" ? extractJson(content) : content;
  if (!parsed) {
    return jsonResponse({ ok: false, live: false, demo: false, error: "SERV returned a reply that was not JSON. Raw reply start: " + String(content).slice(0, 300) }, 502);
  }

  return jsonResponse({
    ok: true,
    live: true,
    demo: false,
    model: SERV_MODEL,
    data: normalise(parsed)
  });
}
