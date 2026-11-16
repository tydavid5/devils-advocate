export const EXAMPLES = [
  {
    id: "delivery",
    label: "Startup pitch",
    short: "A food delivery app in a crowded city",
    question: "Pitch: I will build a food delivery app for a crowded city. It will be faster than the big apps, so customers will switch to us, and we will win the market."
  },
  {
    id: "quit",
    label: "Big life call",
    short: "Quit my job to start a business",
    question: "I should quit my job to start a business with no savings. The business will earn enough in the first month to pay my rent and bills."
  },
  {
    id: "fourday",
    label: "Team plan",
    short: "Move to a 4 day week, same pay",
    question: "Our team should move to a 4 day week with no pay cut. We will do the same amount of work in 4 days, and everyone will be happier and more productive."
  }
];

const DEMO = {
  delivery: {
    verdict: "Shaky",
    confidence: 72,
    weakest_link: "Customers will switch for a slightly faster delivery.",
    weakest_link_fix: "Prove switching with a paid pilot: 200 real orders from strangers, not friends, before you build the full app.",
    changes_verdict: "A paid pilot with 200 repeat orders, and a cost per order below the delivery fee, would change this to Strong.",
    steelman: "A food delivery app focused on one neighbourhood and one food type, with a delivery fee that covers its costs, could win by being the most reliable option there.",
    counterarguments: [
      { title: "The market is already crowded", strength: "strong", reason: "Many apps already deliver food. Switching is easy for users, but winning each user costs you a lot in marketing.", evidence_needed: "The cost to win one paying customer, and how many orders that customer places.", fix: "Pick one narrow niche, one food type or one neighbourhood, and win it first." },
      { title: "The margins are thin", strength: "strong", reason: "Delivery, discounts, and driver pay eat most of the price of each order.", evidence_needed: "The full cost per order at 100, 1000, and 10000 orders.", fix: "Charge a delivery fee that covers the real cost from day one." },
      { title: "Speed is not a moat", strength: "medium", reason: "Rivals can copy a faster delivery time in weeks.", evidence_needed: "One thing rivals cannot copy in 90 days.", fix: "Build a repeat habit, such as subscriptions or a local kitchen partner, not just speed." },
      { title: "Demand is assumed, not proven", strength: "medium", reason: "People ordering food is not the same as people ordering from you.", evidence_needed: "200 strangers who prepay or place a real order.", fix: "Sell before you build. Take preorders first." }
    ]
  },
  quit: {
    verdict: "Weak",
    confidence: 81,
    weakest_link: "The business will earn enough, fast enough, to pay rent.",
    weakest_link_fix: "Save 6 months of living costs first, or keep the job and test the business on weekends until it pays you for 3 months in a row.",
    changes_verdict: "6 months of savings plus 3 months of real sales would change this to Strong.",
    steelman: "Starting a business is a good goal, and quitting with a 6 month runway and 3 months of proven sales would make it a strong plan.",
    counterarguments: [
      { title: "There is no runway", strength: "strong", reason: "With no savings, one slow month means rent is missed and the business must earn or die.", evidence_needed: "How many months you can live with zero income.", fix: "Build a 6 month runway before you quit." },
      { title: "Demand is not tested", strength: "strong", reason: "No sales yet means no proof that anyone will pay, at what price, or how often.", evidence_needed: "Paying customers, not likes or nice words.", fix: "Get 10 paying customers while you still have a job." },
      { title: "One income becomes zero income", strength: "medium", reason: "Quitting removes your only safety net on the same day the risk starts.", evidence_needed: "Your monthly bills, and what happens if month one earns nothing.", fix: "Keep a part time income until the business covers your bills." },
      { title: "Stress makes bad decisions", strength: "medium", reason: "Money pressure pushes founders to take bad deals and cut corners.", evidence_needed: "A plan for the first 3 months if sales are slow.", fix: "Write the slow month plan now, while you are calm." }
    ]
  },
  fourday: {
    verdict: "Shaky",
    confidence: 64,
    weakest_link: "The same work fits in 4 days with no loss.",
    weakest_link_fix: "Run a 4 week trial on one team, measure output each week, and name what work stops or moves before the trial starts.",
    changes_verdict: "A trial showing the same output in 4 days for 4 weeks would change this to Strong.",
    steelman: "A 4 day week with clear output targets and a trial period could keep output steady while giving staff more rest.",
    counterarguments: [
      { title: "Output may drop by a fifth", strength: "strong", reason: "One day less is 20 percent less time, and most teams do not have 20 percent slack.", evidence_needed: "Output per week now, and what would be cut to fit 4 days.", fix: "Cut meetings and low value work first, then measure." },
      { title: "Customers still need 5 days", strength: "medium", reason: "Clients and users do not move to a 4 day week just because the team does.", evidence_needed: "Who covers day 5, and what it costs.", fix: "Rotate cover so someone is always available." },
      { title: "Meetings and handover grow", strength: "medium", reason: "Less shared time means more handover, more messages, and more missed context.", evidence_needed: "Hours lost to handover in a trial week.", fix: "Set one shared overlap day and strict handover notes." },
      { title: "Pay stays the same, output is unproven", strength: "weak", reason: "Same pay for less time is fair only if output holds. That is the claim to test, not a fact yet.", evidence_needed: "A trial with output measured, not just happiness measured.", fix: "Agree the output target in writing before the trial." }
    ]
  }
};

export function demoFor(exampleId, input) {
  if (DEMO[exampleId]) {
    return DEMO[exampleId];
  }
  const text = (input || "").slice(0, 120);
  return {
    verdict: "Shaky",
    confidence: 54,
    weakest_link: "This sample graph cannot test a new idea.",
    weakest_link_fix: "Add a SERV API key to get a live argument for this idea.",
    changes_verdict: "A live SERV run with real evidence would give the true verdict for this idea.",
    steelman: "Every idea has a stronger version. A live run would find it.",
    counterarguments: [
      { title: "The idea was read", strength: "medium", reason: "The idea was received and read in full.", evidence_needed: "A live run to test it.", fix: "Add a SERV API key and run it live." },
      { title: "Hidden assumptions were not tested", strength: "medium", reason: "Every plan hides assumptions. A live run would name them.", evidence_needed: "A live SERV graph.", fix: "Run it live with SERV Reasoning." },
      { title: "No evidence was checked", strength: "weak", reason: "No live evidence was checked in demo mode.", evidence_needed: "A live SERV call.", fix: "Add a SERV API key and run it live." }
    ]
  };
}

export const COMPARE_PAIRS = [
  {
    id: "delivery-pharmacy",
    label: "Startup vs pharmacy",
    short: "Food delivery app vs licensed pharmacy",
    a: "Pitch: I will build a food delivery app for a crowded city. It will be faster than the big apps, so customers will switch to us, and we will win the market.",
    b: "Open a licensed pharmacy next to a busy hospital, stocking the medicines doctors there prescribe every day, with prices that cover costs."
  },
  {
    id: "brush-quit",
    label: "Habit vs big leap",
    short: "Brush teeth vs quit job with no savings",
    a: "Brush your teeth twice a day with fluoride toothpaste to reduce cavities, a habit dentists recommend and studies support.",
    b: "I should quit my job to start a business with no savings. The business will earn enough in the first month to pay my rent and bills."
  }
];

const BRUSH_DEMO = {
  verdict: "Strong",
  confidence: 97,
  weakest_link: "The benefit varies by individual risk, brushing technique, and whether fluoride exposure is consistent.",
  weakest_link_fix: "Brush thoroughly for about two minutes and use fluoride toothpaste consistently. People at high cavity risk should also floss and see a dentist regularly.",
  steelman: "Brushing twice a day with fluoride toothpaste is a low cost, evidence based habit that reliably lowers cavity risk for most people.",
  counterarguments: [
    { title: "Technique matters more than frequency", strength: "medium", reason: "Rushing through brushing leaves plaque behind, even twice a day.", evidence_needed: "How long and how thoroughly most people actually brush.", fix: "Brush for about two minutes, reaching every surface." },
    { title: "Fluoride must be consistent", strength: "weak", reason: "Skipping fluoride toothpaste or rinsing it away right after brushing lowers the benefit.", evidence_needed: "Whether fluoride toothpaste is used every time.", fix: "Use fluoride toothpaste every time and spit, do not rinse right away." },
    { title: "High risk people need more", strength: "weak", reason: "People with high cavity risk may still get cavities from diet and dry mouth alone.", evidence_needed: "Individual cavity risk and diet.", fix: "Add flossing, diet changes, and dental checkups for high risk people." }
  ]
};

const PHARMACY_DEMO = {
  verdict: "Shaky",
  confidence: 78,
  weakest_link: "Demand is real, but rent, licensing, and competition from chains can eat the margin.",
  weakest_link_fix: "Get the licence and the rent in writing first, then check the real margin on the 50 most prescribed medicines before signing a lease.",
  steelman: "A licensed pharmacy next to a busy hospital, stocking what its doctors prescribe, can win on trust and convenience.",
  counterarguments: [
    { title: "Chains and hospital pharmacies compete", strength: "strong", reason: "Big chains buy cheaper and hospital pharmacies are steps away from patients.", evidence_needed: "What the nearest three pharmacies charge for the same medicines.", fix: "Win on opening hours, home delivery, and stock that chains often run out of." },
    { title: "Licensing and rent are fixed costs", strength: "medium", reason: "A licence, a pharmacist on staff, and rent near a hospital all cost money before the first sale.", evidence_needed: "The licence cost, the pharmacist salary, and the monthly rent.", fix: "Lock those costs in writing before committing to the location." },
    { title: "Stock can expire unsold", strength: "medium", reason: "Slow moving medicines expire, and expired stock is money thrown away.", evidence_needed: "Which medicines the hospital prescribes most, and how fast they sell.", fix: "Stock the fast movers first and order the rest on demand." }
  ]
};

function compareIdea(entry) {
  return {
    verdict: entry.verdict,
    confidence: entry.confidence,
    weakest_link: entry.weakest_link,
    weakest_link_fix: entry.weakest_link_fix,
    steelman: entry.steelman,
    counterarguments: entry.counterarguments.slice(0, 3)
  };
}

function rankOf(verdict) {
  return verdict === "Strong" ? 3 : verdict === "Weak" ? 1 : 2;
}

export function demoCompare(pairId, ideaA, ideaB) {
  let a = null;
  let b = null;
  let winner = "Tie";
  let winnerReason = "Both ideas are close on the evidence, so neither clearly wins.";
  let flip = "A new fact about either idea's weakest link would change the winner.";
  if (pairId === "delivery-pharmacy") {
    a = compareIdea(DEMO.delivery);
    b = compareIdea(PHARMACY_DEMO);
    winner = "B";
    winnerReason = "The pharmacy serves demand that already exists next door, while the delivery app must win customers away from apps they already use.";
    flip = "A paid pilot with 200 repeat orders from strangers would make the delivery app the winner.";
  } else if (pairId === "brush-quit") {
    a = compareIdea(BRUSH_DEMO);
    b = compareIdea(DEMO.quit);
    winner = "A";
    winnerReason = "Brushing teeth is low cost and backed by evidence, while quitting with no savings has no runway and no proven sales.";
    flip = "Six months of savings plus three months of real sales would make quitting the stronger plan.";
  } else {
    a = compareIdea(demoFor("", ideaA));
    b = compareIdea(demoFor("", ideaB));
    const scoreA = rankOf(a.verdict) * 100 + a.confidence;
    const scoreB = rankOf(b.verdict) * 100 + b.confidence;
    winner = scoreA > scoreB ? "A" : scoreB > scoreA ? "B" : "Tie";
    winnerReason = "This is a demo comparison, not a live SERV call. Add a SERV API key to get a live verdict for both ideas.";
    flip = "A live SERV run with real evidence would name what would flip the winner.";
  }
  return { idea_a: a, idea_b: b, winner: winner, winner_reason: winnerReason, what_would_flip_it: flip };
}

export function exampleById(id) {
  return EXAMPLES.find(function (e) { return e.id === id; }) || null;
}
