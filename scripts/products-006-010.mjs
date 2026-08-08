import { DEST } from "./fh-product-lib.mjs";

function qrFor(pillar) {
  return [
    {
      label: "Forward Collective",
      url: DEST.community,
      note: "Join The Forward Collective on the FutureHer Community tab for challenges and calm weekly practice.",
    },
    {
      label: `${pillar} lessons`,
      url: DEST.playlists,
      note: `Open the ${pillar} playlist on @FutureHerAfrica and continue the series.`,
    },
    {
      label: "FutureHer on YouTube",
      url: DEST.youtube,
      note: "Subscribe for one idea, one skill, one action — every lesson.",
    },
  ];
}

function emails(base) {
  return [
    { day: 0, subject: base.e1s, preview: base.e1p, body: base.e1b },
    { day: 2, subject: base.e2s, preview: base.e2p, body: base.e2b },
    { day: 4, subject: base.e3s, preview: base.e3p, body: base.e3b },
    { day: 7, subject: base.e4s, preview: base.e4p, body: base.e4b },
    { day: 10, subject: base.e5s, preview: base.e5p, body: base.e5b },
  ];
}

export const products006to010 = [
  {
    epId: "EP006",
    type: "Cheat Sheet",
    name: "Forever Prompts Cheat Sheet",
    subtitle: "RTCCE on one glance — Role · Task · Context · Constraints · Example — reusable for years.",
    slug: "forever-prompts-cheat-sheet",
    series: "FutureHer · AI",
    pillar: "AI",
    accent: "#2F6F6A",
    framework: "RTCCE",
    skillShort: "Role · Task · Context · Constraints · Example",
    idea: "Good prompts are clear instructions — not magic words",
    episodeTitle: "Prompting basics that still work in 5 years",
    freeCompanion: "RTCCE Prompt Card",
    priceZar: 79,
    whoFor:
      "This cheat sheet is for South African women who are tired of fluffy AI answers — admin, teaching, freelancing, studies — and want a forever prompt structure that outlives logo changes.",
    promise: [
      "One clearer idea: vague in → fluff out",
      "One practical skill: RTCCE",
      "One winning prompt saved in your Forever Prompts note",
    ],
    brandingClose:
      "FutureHer teaches instructions, not magic words. Logos change. Clear prompts stay useful.",
    contents: [
      { title: "Cover", page: "01" },
      { title: "Who this is for", page: "02" },
      { title: "Contents", page: "03" },
      { title: "RTCCE at a glance", page: "04" },
      { title: "Fill-in prompt builder", page: "05" },
      { title: "Workplace examples", page: "06" },
      { title: "Forever Prompts library", page: "07" },
      { title: "Action sheets", page: "08" },
      { title: "QR codes", page: "09" },
      { title: "Next step", page: "10" },
      { title: "Thank you", page: "11" },
    ],
    pages: [
      {
        title: "RTCCE at a glance",
        teach:
          "Role: who should AI act as. Task: the deliverable in one verb phrase. Context: facts it must know. Constraints: length, tone, format, what to avoid. Example: a tiny sample of the shape you want. That is a forever prompt.",
        steps: [
          ["Role + Task", "Who + deliverable"],
          ["Context", "Facts that matter"],
          ["Constraints + Example", "Limits + shape of good"],
        ],
      },
      {
        title: "Fill-in prompt builder",
        teach: "Write each line once. Paste into any assistant.",
        prompts: [
          "ROLE — Act as a…",
          "TASK — Create / rewrite / summarise…",
          "CONTEXT — Facts it must know…",
          "CONSTRAINTS — Length, tone, avoid…",
          "EXAMPLE — Start like this / shape like this…",
        ],
        checkboxes: [
          "My Task uses a clear verb (rewrite, summarise, draft, outline)",
          "I added at least one constraint (words, no buzzwords, format)",
          "I included a tiny example of the shape I want",
        ],
      },
      {
        title: "Workplace examples",
        teach: "Steal the structure. Replace the facts with yours.",
        scripts: [
          {
            label: "Email rewrite",
            text: "ROLE: Clear workplace communicator. TASK: Rewrite this email. CONTEXT: [paste facts]. CONSTRAINTS: 120 words, warm SA professional tone, no buzzwords. EXAMPLE: Start with the decision, then the ask.",
          },
          {
            label: "Meeting summary",
            text: "ROLE: Reliable note-taker. TASK: Summarise these notes into decisions, owners, and next steps. CONTEXT: [paste]. CONSTRAINTS: bullets only, no invented names. EXAMPLE: Decision — Owner — Due.",
          },
          {
            label: "Lesson / training outline",
            text: "ROLE: Practical adult educator. TASK: Outline a 20-minute lesson. CONTEXT: audience and outcome. CONSTRAINTS: three sections max, plain English. EXAMPLE: Hook · Skill · Practice.",
          },
        ],
      },
      {
        title: "Forever Prompts library",
        teach: "One saved prompt is an asset. Ten is a system. Rate quality after each run.",
        table: {
          title: "My Forever Prompts",
          headers: ["Element / Prompt name", "My line", "Keep for reuse?"],
          rows: 5,
        },
        prompts: ["Before prompt (weak version):", "RTCCE after (winner):", "Result quality 1–5:"],
      },
    ],
    actions: [
      { action: "Rewrite your vaguest prompt with a clear Task verb", minutes: "5 min", detail: "Help with work becomes rewrite / summarise / draft." },
      { action: "Add one hard constraint", minutes: "3 min", detail: "Example: 120 words max, no buzzwords." },
      { action: "Add a one-line example of the shape you want", minutes: "3 min", detail: "Show the opening or bullet pattern." },
      { action: "Run the full RTCCE on one real work task", minutes: "12 min", detail: "Compare against your old vague prompt." },
      { action: "Save the winner in Forever Prompts", minutes: "3 min", detail: "Notes folder title: Forever Prompts." },
      { action: "Rate the result 1–5 and note what to tighten", minutes: "2 min", detail: "Constraints usually fix fluff." },
    ],
    qr: qrFor("AI"),
    upsell: {
      headline: "When you're ready for the next layer",
      items: [
        { name: "Verify Before You Send Checklist", line: "Source · Number · Name before fluent answers leave your hands." },
        { name: "The Forward Collective", line: "Share one winning RTCCE prompt with the community." },
      ],
      close: "Save the winners. That is how prompts become assets.",
    },
    thankYou: {
      body: "You traded magic words for clear instructions. That skill will outlast the next app launch.",
      signoff: "Thank you for building Forever Prompts with FutureHer.",
    },
    sales: {
      headline: "Stop asking for magic.",
      subhead: "The Forever Prompts Cheat Sheet locks RTCCE onto scannable pages with a fill-in builder, workplace examples, and a reusable library.",
      bullets: [
        "RTCCE at-a-glance teach",
        "Fill-in prompt builder with check gates",
        "Workplace example prompts for email, meetings, lessons",
        "Forever Prompts library table",
        "Pairs with the free EP006 RTCCE Prompt Card",
      ],
      objection: "Tool names will change. Role · Task · Context · Constraints · Example will not.",
      priceLine: "R79 — keep it beside your Notes app.",
      cta: "Get the Forever Prompts Cheat Sheet and save one winning prompt today.",
      softClose: "Clear instructions beat lucky wording.",
      blurb:
        "When you're ready to build a personal prompt library you can reuse for years, the Forever Prompts Cheat Sheet gives you RTCCE drills, save templates, and workplace examples beyond the free card.",
    },
    emails: emails({
      e1s: "Your Forever Prompts sheet",
      e1p: "RTCCE beats magic words.",
      e1b: `Your Forever Prompts Cheat Sheet is ready.

Open the fill-in builder.
Write ROLE and TASK for one real job before you open AI.

Lesson: ${DEST.youtube}`,
      e2s: "Add constraints",
      e2p: "Limits reduce fluff.",
      e2b: `Constraints are kindness to your future self.

Add: word count, tone, format, and what to avoid.
Example: 120 words max, no buzzwords, bullets only.`,
      e3s: "Show the shape",
      e3p: "Tiny examples teach faster.",
      e3b: `Add one example line to today's prompt.

"Start with the decision, then the ask."
A tight example beats another adjective.`,
      e4s: "Save the winner",
      e4p: "Library page time.",
      e4b: `Run RTCCE on one task.
Rate the result 1–5.
Paste the winning prompt into your Forever Prompts table.

One saved prompt is an asset.`,
      e5s: "Verify before you send",
      e5p: "Fluency is not proof.",
      e5b: `Great prompts still need a seatbelt.

When you're ready, Verify Before You Send Checklist covers Source · Number · Name.
Community: ${DEST.community}`,
    }),
  },

  {
    epId: "EP007",
    type: "Checklist",
    name: "Verify Before You Send Checklist",
    subtitle: "Source · Number · Name — the seatbelt that stops fluent AI from embarrassing you.",
    slug: "verify-before-you-send-checklist",
    series: "FutureHer · AI",
    pillar: "AI",
    accent: "#2F6F6A",
    framework: "VERIFY",
    skillShort: "Source · Number · Name",
    idea: "Fluency is not proof — verify before you share",
    episodeTitle: "Fact-check AI before it embarrasses you",
    freeCompanion: "3-Step Verify card",
    priceZar: 97,
    whoFor:
      "This checklist is for South African women who paste AI into decks, emails, learner materials, and reports — and need a fast seatbelt before reputation takes the hit.",
    promise: [
      "One clearer idea: smooth ≠ true",
      "One practical skill: Source · Number · Name",
      "One verified paragraph you can send with a calm conscience",
    ],
    brandingClose:
      "FutureHer treats verification as professionalism. AI can sound certain and still invent. You take ownership back.",
    contents: [
      { title: "Cover", page: "01" },
      { title: "Who this is for", page: "02" },
      { title: "Contents", page: "03" },
      { title: "VERIFY teach", page: "04" },
      { title: "Source gate", page: "05" },
      { title: "Number + Name gates", page: "06" },
      { title: "Claim scorecard", page: "07" },
      { title: "Action sheets", page: "08" },
      { title: "QR codes", page: "09" },
      { title: "Next step", page: "10" },
      { title: "Thank you", page: "11" },
    ],
    pages: [
      {
        title: "VERIFY teach",
        teach:
          "Source: can this claim live outside the chat on a real page or your own file? Number: confirm every percentage, date, price, and statistic — or cut it. Name: check people, organisations, laws, places, and titles before send. Correct or cut — then share.",
        steps: [
          ["Source", "Outside the chat"],
          ["Number", "Confirm or cut"],
          ["Name", "Spelling + reality check"],
        ],
      },
      {
        title: "Source gate",
        teach: "Ask: where does this live outside the chat?",
        checkboxes: [
          "I can point to a real page, policy, or my own file for this claim",
          "I did not accept a citation I have not opened",
          "If the source is missing, I cut the claim or marked it as unverified",
          "I separated AI wording from evidence I actually hold",
        ],
        prompts: ["Source I used for today's key claim:"],
      },
      {
        title: "Number + Name gates",
        teach: "Statistics lie fluently. Names travel forever.",
        checkboxes: [
          "Every percentage is confirmed or removed",
          "Every date, price, and count is confirmed or removed",
          "People names are spelled correctly",
          "Organisation, school, clinic, or company names are real",
          "Law / policy titles are checked before I teach or send them",
        ],
        prompts: ["Number I verified:", "Name I double-checked:"],
      },
      {
        title: "Claim scorecard",
        teach: "Run VERIFY on one AI answer before it enters a deck, email, or WhatsApp.",
        table: {
          title: "Claims to verify",
          headers: ["Claim", "Source OK?", "Number OK?", "Name OK?", "Action"],
          rows: 6,
        },
        prompts: ["AI answer checked:", "What I cut/fixed:", "Final decision:"],
      },
    ],
    actions: [
      { action: "Pause one AI paste before it travels", minutes: "1 min", detail: "Deck, email, or chat — pause for VERIFY." },
      { action: "Run the Source gate on one claim", minutes: "5 min", detail: "Find it outside the chat or cut it." },
      { action: "Circle every number and confirm or cut", minutes: "7 min", detail: "No confirmation → no number." },
      { action: "Check every name and title", minutes: "5 min", detail: "Spelling and reality." },
      { action: "Fill one row on the claim scorecard", minutes: "5 min", detail: "Action = keep, fix, or cut." },
      { action: "Text a colleague Source · Number · Name", minutes: "2 min", detail: "Teach the seatbelt — culture beats tools." },
    ],
    qr: qrFor("AI"),
    upsell: {
      headline: "When you're ready for the next layer",
      items: [
        { name: "Money Clarity in 14 Days", line: "Bring the same calm verification energy to your payday map." },
        { name: "The Forward Collective", line: "Build a verifying culture with others at work." },
      ],
      close: "Verification returns ownership to you.",
    },
    thankYou: {
      body: "You chose a calm conscience over fluent risk. That protects more than today's send.",
      signoff: "Thank you for verifying with FutureHer.",
    },
    sales: {
      headline: "Don't trust fluency.",
      subhead: "Verify Before You Send Checklist turns Source · Number · Name into printable gates and a claim scorecard you can run in minutes.",
      bullets: [
        "VERIFY teach with three clear gates",
        "Source, Number, and Name checklists",
        "Six-row claim scorecard",
        "Team teaching cue: Source · Number · Name",
        "Pairs with the free EP007 3-Step Verify card",
      ],
      objection: "If AI sounds certain, your body borrows that certainty. This checklist gives it back to you.",
      priceLine: "R97 — the cheapest reputation insurance on your desk.",
      cta: "Get Verify Before You Send and run the seatbelt on your next AI draft.",
      softClose: "Smooth ≠ true. Confirm or cut.",
      blurb:
        "When fluent AI answers start travelling into your decks and emails, Verify Before You Send Checklist expands Source · Number · Name into full gates and a claim scorecard you can reuse every time it matters.",
    },
    emails: emails({
      e1s: "Your VERIFY checklist",
      e1p: "Seatbelt before send.",
      e1b: `Verify Before You Send is ready.

Open one AI paragraph you almost shared.
Do not send it yet.

Run Source first: where does this live outside the chat?
Lesson: ${DEST.youtube}`,
      e2s: "Source · Number · Name",
      e2p: "Three checks. That's the whole seatbelt.",
      e2b: `Source — outside the chat.
Number — confirm or cut.
Name — spelling and reality.

Correct or cut — then share.`,
      e3s: "Smooth ≠ true",
      e3p: "Borrowed confidence is risky.",
      e3b: `Your nervous system loves fluent sentences.

Verification is how you take ownership back.
If a statistic feels fancy and unconfirmed — cut it.`,
      e4s: "Scorecard one answer",
      e4p: "Keep, fix, or cut.",
      e4b: `Fill at least three rows on the claim scorecard today.

Then send the cleaned version — or decide it is not ready.
Either choice is professional.`,
      e5s: "Money clarity when ready",
      e5p: "Same calm. Different pillar.",
      e5b: `AI seatbelt installed.

When you're ready for payday clarity, Money Clarity in 14 Days maps Fixed · Flexible · Forward without shame scripts.
Community: ${DEST.community}`,
    }),
  },

  {
    epId: "EP008",
    type: "Planner",
    name: "Money Clarity in 14 Days",
    subtitle: "Fixed · Flexible · Forward — a two-week payday rebuild without shame scripts.",
    slug: "money-clarity-in-14-days",
    series: "FutureHer · Money",
    pillar: "Money",
    accent: "#B8893A",
    framework: "THE PAYDAY MAP",
    skillShort: "Fixed · Flexible · Forward",
    idea: "Disappearing salary is a map problem — not a character flaw",
    episodeTitle: "My salary disappears before month-end — here's the map",
    freeCompanion: "Payday Map worksheet",
    priceZar: 247,
    whoFor:
      "This planner is for South African women whose salary arrives and vanishes by week three — salaried workers, teachers, nurses, admin staff, and freelancers who need categories before lectures.",
    promise: [
      "One clearer idea: clarity before shame",
      "One practical skill: Fixed · Flexible · Forward",
      "One payday where every rand gets a job within 48 hours",
    ],
    brandingClose:
      "FutureHer does money without humiliation. Airtime, data, and transport count. Map the rands while the numbers are still clear.",
    contents: [
      { title: "Cover", page: "01" },
      { title: "Who this is for", page: "02" },
      { title: "Contents", page: "03" },
      { title: "Payday Map teach", page: "04" },
      { title: "Income + Fixed setup", page: "05" },
      { title: "Flexible + Forward setup", page: "06" },
      { title: "14-day planner", page: "07" },
      { title: "Week-three rescue page", page: "08" },
      { title: "Action sheets", page: "09" },
      { title: "QR codes", page: "10" },
      { title: "Next step", page: "11" },
      { title: "Thank you", page: "12" },
    ],
    pages: [
      {
        title: "Payday Map teach",
        teach:
          "Fixed: must-pay costs that keep life standing — include transport, data, airtime basics, and a groceries baseline. Flexible: choices that change week to week — give them a ceiling. Forward: money that leaves today's pressure — save, stokvel, buffer, or extra debt payment. Unassigned money gets spent by the loudest notification.",
        steps: [
          ["Fixed", "Must-pay · keep life standing"],
          ["Flexible", "Choices · set a ceiling"],
          ["Forward", "Future you · even if small"],
        ],
      },
      {
        title: "Income + Fixed setup",
        teach: "Write income as one number. Build Fixed first — including SA realities.",
        prompts: [
          "Payday date this month:",
          "Income (R):",
          "Fixed total (R):",
        ],
        table: {
          title: "Fixed list",
          headers: ["Item", "Amount (R)", "Paid?"],
          rows: 8,
        },
        note: "Include rent/rooms, transport, data, airtime basics, groceries baseline, school needs you already know.",
      },
      {
        title: "Flexible + Forward setup",
        teach: "Choose Forward before Flexible expands into every gap.",
        prompts: ["Flexible ceiling (R):", "Forward amount (R):", "Where Forward lives:"],
        table: {
          title: "Flexible + Forward lines",
          headers: ["Item", "Fixed / Flexible / Forward", "Amount (R)", "Paid?"],
          rows: 8,
        },
      },
      {
        title: "14-day planner",
        teach: "Two weeks of small maps beat one perfect budget speech.",
        days: [
          { label: "Day 1", task: "Write income as one number. Start Fixed list." },
          { label: "Day 2", task: "Finish Fixed — include transport, data, airtime." },
          { label: "Day 3", task: "Set Flexible ceiling. List top flexible spends." },
          { label: "Day 4", task: "Choose Forward amount — even if small." },
          { label: "Day 5", task: "Assign every rand a job within 48h of payday." },
          { label: "Day 6", task: "Track three spends into the right bucket." },
          { label: "Day 7", task: "Adjust one Fixed estimate that was wrong." },
          { label: "Day 8", task: "Protect Forward before a Flexible treat." },
          { label: "Day 9", task: "Review WhatsApp money pressure — map before yes." },
          { label: "Day 10", task: "Update paid checkboxes on your lists." },
          { label: "Day 11", task: "Week-three preview: what usually disappears?" },
          { label: "Day 12", task: "Move or confirm Forward still exists." },
          { label: "Day 13", task: "Rewrite next payday's first 48-hour plan." },
          { label: "Day 14", task: "Close the cycle. Note one shame story you retired." },
        ],
      },
      {
        title: "Week-three rescue page",
        teach: "If confusion arrives early, reopen the map — do not open a shame spiral.",
        prompts: [
          "What spent itself without a job?",
          "Which Fixed line was underestimated?",
          "What Flexible will I pause until payday?",
          "What Forward still remains (R)?",
        ],
        checkboxes: [
          "I reopened Fixed · Flexible · Forward before self-blame",
          "I named airtime/data/transport as real lines if they ate the month",
          "I chose one pause that protects next week",
        ],
      },
    ],
    actions: [
      { action: "Write this month's income on one line", minutes: "3 min", detail: "One number. No story attached yet." },
      { action: "Build your Fixed list including transport and data", minutes: "15 min", detail: "Must-pay costs that keep life standing." },
      { action: "Set a Flexible ceiling", minutes: "5 min", detail: "Choices need a lid." },
      { action: "Choose a Forward amount — even if small", minutes: "5 min", detail: "Save, stokvel, buffer, or debt extra." },
      { action: "Assign every rand a job within 48 hours of payday", minutes: "20 min", detail: "Map while numbers are clear." },
      { action: "Complete Days 1–3 of the 14-day planner", minutes: "25 min", detail: "Momentum over perfection." },
      { action: "Use the week-three rescue page once if needed", minutes: "10 min", detail: "Categories before shame." },
    ],
    qr: qrFor("Money"),
    upsell: {
      headline: "When you're ready for the next layer",
      items: [
        { name: "Micro-Save 30-Day Challenge", line: "Floor · Automate · Protect — small and sacred savings that stick." },
        { name: "The Forward Collective", line: "Money practice without humiliation." },
      ],
      close: "Clarity before shame. Finish this payday's map first.",
    },
    thankYou: {
      body: "You gave your rands jobs. That is dignity with arithmetic — not a personality transplant.",
      signoff: "Thank you for mapping money with FutureHer.",
    },
    sales: {
      headline: "Map the money first.",
      subhead: "Money Clarity in 14 Days turns Fixed · Flexible · Forward into a two-week planner with setup pages and a week-three rescue — built for South African payday reality.",
      bullets: [
        "Payday Map teach without shame scripts",
        "Income, Fixed, Flexible, and Forward setup worksheets",
        "Day-by-day 14-day planner",
        "Week-three rescue page for mid-month confusion",
        "Pairs with the free EP008 Payday Map worksheet",
      ],
      objection: "If week three feels confusing, you need a map — not a lecture about character.",
      priceLine: "R247 — one payday rebuild you can repeat every month.",
      cta: "Get Money Clarity in 14 Days and assign every rand a job this payday.",
      softClose: "The month is longer than an unmapped salary. Map first.",
      blurb:
        "If the free Payday Map worksheet helps and you want a guided two-week rebuild — Money Clarity in 14 Days walks you through fixed costs, flexible spend, and a forward line without shame scripts.",
    },
    emails: emails({
      e1s: "Your 14-day money planner",
      e1p: "Income on one line.",
      e1b: `Money Clarity in 14 Days is ready.

Open Income + Fixed setup.
Write this month's income as one number.

No shame story yet — just the number.
Lesson: ${DEST.youtube}`,
      e2s: "Fixed · Flexible · Forward",
      e2p: "Three buckets. Clear month.",
      e2b: `Fixed keeps life standing — including transport, data, airtime.
Flexible gets a ceiling.
Forward leaves today's pressure — even if small.

Build Fixed before Flexible expands.`,
      e3s: "Shame blocks arithmetic",
      e3p: "Categories restore it.",
      e3b: `If self-blame got loud, reopen the map.

Disappearing salary is often uncategorised money meeting a long month.
Airtime counts. Transport counts. Helping counts — map it.`,
      e4s: "48-hour payday plan",
      e4p: "Assign the rands.",
      e4b: `Within forty-eight hours of payday, finish the assignment:

Every rand gets Fixed, Flexible, or Forward.
Then tick Day 5 on the planner.`,
      e5s: "Micro-save when ready",
      e5p: "Floor — not fantasy.",
      e5b: `Your map is alive.

When you're ready to protect a tiny Forward streak, join the Micro-Save 30-Day Challenge.
Community: ${DEST.community}`,
    }),
  },

  {
    epId: "EP009",
    type: "Challenge",
    name: "Micro-Save 30-Day Challenge",
    subtitle: "Floor · Automate · Protect — keep a tiny save sacred for thirty days.",
    slug: "micro-save-30-day-challenge",
    series: "FutureHer · Money",
    pillar: "Money",
    accent: "#B8893A",
    framework: "THE MICRO-SAVE",
    skillShort: "Floor · Automate · Protect",
    idea: "Saving starts at a floor you can keep — not an ideal you abandon",
    episodeTitle: "How to start saving when it feels impossible",
    freeCompanion: "Micro-Save rules worksheet",
    priceZar: 179,
    whoFor:
      "This challenge is for South African women who feel saving is impossible — not because they are careless, but because fantasy targets keep breaking. Solo pockets and stokvel both welcome.",
    promise: [
      "One clearer idea: floor — not fantasy",
      "One practical skill: Floor · Automate · Protect",
      "One 30-day streak with a floor small enough to keep",
    ],
    brandingClose:
      "FutureHer honours small and sacred. A kept R20–R50 promise beats an abandoned speech. Stokvel or solo — dignity either way.",
    contents: [
      { title: "Cover", page: "01" },
      { title: "Who this is for", page: "02" },
      { title: "Contents", page: "03" },
      { title: "Micro-Save system", page: "04" },
      { title: "Floor · Automate · Protect setup", page: "05" },
      { title: "30-day streak tracker", page: "06" },
      { title: "Pressure & raid scripts", page: "07" },
      { title: "Action sheets", page: "08" },
      { title: "QR codes", page: "09" },
      { title: "Next step", page: "10" },
      { title: "Thank you", page: "11" },
    ],
    pages: [
      {
        title: "Micro-Save system",
        teach:
          "Floor: the smallest repeatable amount you will not lie about. Automate: payday auto-move or same-day manual ritual — stokvel counts if it is your system. Protect: one rule that stops impulse and pressure from raiding it for 30 days. Shrink until honesty fits. Then guard the streak.",
        steps: [
          ["Floor", "Small enough to keep"],
          ["Automate", "Payday path · less decision"],
          ["Protect", "Rules that guard the streak"],
        ],
      },
      {
        title: "Floor · Automate · Protect setup",
        teach: "Write the three lines before pressure arrives.",
        prompts: [
          "My floor (R) — so small it almost feels too easy:",
          "Move method (auto-move / same-hour ritual / stokvel):",
          "Protect rule (example: I wait 72 hours before any raid):",
          "Where the floor lives:",
        ],
        checkboxes: [
          "My floor is honest for a hard month, not a fantasy month",
          "I scheduled the move for next payday",
          "I named stokvel, solo, or both for this season",
        ],
      },
      {
        title: "30-day streak tracker",
        teach: "Tick the move. Protect the streak. No performance theatre.",
        table: {
          title: "30-day micro-save log",
          headers: ["Date", "Floor moved (R)", "Where it lives", "Protected? Y/N"],
          rows: 10,
        },
        note: "Use extra paper or Notes for days 11–30. Same columns. Same honesty.",
        days: [
          { label: "Week 1", task: "Move floor on payday. Write Protect rule. No raids." },
          { label: "Week 2", task: "Confirm the money still lives where you put it." },
          { label: "Week 3", task: "If pressure rises, read your Protect rule aloud." },
          { label: "Week 4", task: "Finish day 30. Decide whether to raise the floor by a tiny step." },
        ],
      },
      {
        title: "Pressure & raid scripts",
        teach: "Protect the streak with warm, short language.",
        scripts: [
          {
            label: "To yourself",
            text: "This floor is small on purpose. Missing it for a treat I will forget is how the old story wins. I wait 72 hours.",
          },
          {
            label: "Soft decline on spending pressure",
            text: "I'm keeping a tiny save streak this month. I can't pull from it today — let's look at another option tomorrow.",
          },
          {
            label: "Stokvel honour line",
            text: "My contribution is Forward money. I treat it as already spent toward future-me.",
          },
        ],
      },
    ],
    actions: [
      { action: "Choose a floor so small it almost feels too easy", minutes: "5 min", detail: "Honesty over impressiveness." },
      { action: "Set the payday move method", minutes: "8 min", detail: "Auto-move, same-hour ritual, or stokvel path." },
      { action: "Write one Protect rule", minutes: "5 min", detail: "Example: wait 72 hours before any raid." },
      { action: "Move the first floor amount", minutes: "5 min", detail: "Before Flexible expands." },
      { action: "Log the move on the streak tracker", minutes: "2 min", detail: "Date · amount · where · protected." },
      { action: "Practise one pressure script aloud", minutes: "3 min", detail: "Say it once before you need it." },
    ],
    qr: qrFor("Money"),
    upsell: {
      headline: "When you're ready for the next layer",
      items: [
        { name: "Kind No Money Journal", line: "Pause · Values · Script for purchases that pressure you." },
        { name: "The Forward Collective", line: "30 days of saving with company, not shame." },
      ],
      close: "Small and sacred first. Raise the floor only after a kept streak.",
    },
    thankYou: {
      body: "You kept a promise small enough to be true. That is how saving becomes identity — quietly.",
      signoff: "Thank you for protecting the streak with FutureHer.",
    },
    sales: {
      headline: "Floor — not fantasy.",
      subhead: "The Micro-Save 30-Day Challenge turns Floor · Automate · Protect into a streak tracker, setup page, and pressure scripts for real South African months.",
      bullets: [
        "Micro-Save system teach",
        "Floor · Automate · Protect setup",
        "30-day streak tracker with weekly focus",
        "Pressure and raid scripts",
        "Pairs with the free EP009 Micro-Save rules worksheet",
      ],
      objection: "If the target is fantasy, missing it becomes a personality story. Shrink until honesty fits.",
      priceLine: "R179 — thirty days of a floor you can keep.",
      cta: "Start the Micro-Save 30-Day Challenge and move your first floor today.",
      softClose: "A kept R50 promise beats an abandoned speech.",
      blurb:
        "When saving feels impossible, the Micro-Save 30-Day Challenge expands Floor · Automate · Protect into a streak tracker and pressure scripts — stokvel or solo, dignity either way.",
    },
    emails: emails({
      e1s: "Your Micro-Save challenge",
      e1p: "Choose a tiny floor.",
      e1b: `The Micro-Save 30-Day Challenge is ready.

Open the setup page.
Choose a floor so small it almost feels too easy.

Do not raise it today.
Lesson: ${DEST.youtube}`,
      e2s: "Floor · Automate · Protect",
      e2p: "Three lines. One streak.",
      e2b: `Floor — honest amount.
Automate — payday path.
Protect — one rule against raids.

Write all three before the week gets loud.`,
      e3s: "Both can be wise",
      e3p: "Stokvel or solo.",
      e3b: `Stokvel is a system. Solo pockets are a system.

Shame helps neither.
Name your system for this season and put the contribution in Forward.`,
      e4s: "Protect the streak",
      e4p: "Read your rule aloud.",
      e4b: `Open the tracker.
Confirm the money still lives where you put it.
If pressure is rising, practise a raid script once out loud.`,
      e5s: "Kind No when ready",
      e5p: "Pressure isn't a bill.",
      e5b: `Your floor is sacred for thirty days.

When purchases start pressuring you, the Kind No Money Journal teaches Pause · Values · Script.
Community: ${DEST.community}`,
    }),
  },

  {
    epId: "EP010",
    type: "Journal",
    name: "Kind No Money Journal",
    subtitle: "Pause · Values · Script — decline money pressure kindly without abandoning your map.",
    slug: "kind-no-money-journal",
    series: "FutureHer · Money",
    pillar: "Money",
    accent: "#B8893A",
    framework: "THE KIND NO",
    skillShort: "Pause · Values · Script",
    idea: "Social pressure is not a financial obligation — pause before you spend to please",
    episodeTitle: "Needs, wants, and the purchases that pressure you",
    freeCompanion: "Kind No money scripts worksheet",
    priceZar: 149,
    whoFor:
      "This journal is for South African women who say yes to outings, family asks, and group spends faster than their Payday Map can speak — and want warmth without self-betrayal.",
    promise: [
      "One clearer idea: pressure is not a bill",
      "One practical skill: Pause · Values · Script",
      "One Kind No practised out loud before you send it",
    ],
    brandingClose:
      "FutureHer protects belonging and boundaries. Care deeply. Decide slowly. Speak clearly. Your Payday Map is allowed to have a spine.",
    contents: [
      { title: "Cover", page: "01" },
      { title: "Who this is for", page: "02" },
      { title: "Contents", page: "03" },
      { title: "Kind No teach", page: "04" },
      { title: "Values pages", page: "05" },
      { title: "Script bank", page: "06" },
      { title: "Decision journal", page: "07" },
      { title: "Action sheets", page: "08" },
      { title: "QR codes", page: "09" },
      { title: "Next step", page: "10" },
      { title: "Thank you", page: "11" },
    ],
    pages: [
      {
        title: "Kind No teach",
        teach:
          "Pause: non-emergencies get 24 hours — check your plan before your guilt spends. Values: need, want, or pressure? Does it fit your Payday Map? Will you respect yourself after? Script: warm, clear, short Kind No — practised out loud before you send. Belonging is not a receipt.",
        steps: [
          ["Pause", "Speed is guilt's favourite tool"],
          ["Values", "Need · want · pressure"],
          ["Script", "Kind · clear · short"],
        ],
      },
      {
        title: "Values pages",
        teach: "Label the spend before the story writes itself.",
        prompts: [
          "Request or purchase in front of me:",
          "Is this a need, a want, or pressure?",
          "Does it fit my Payday Map this month?",
          "Will I respect myself after a yes?",
          "Will I respect myself after a Kind No?",
        ],
        checkboxes: [
          "I timestamped a 24-hour pause in Notes",
          "I separated WhatsApp urgency from a due invoice",
          "I named joy-on-purpose as different from fear-based yes",
        ],
      },
      {
        title: "Script bank",
        teach: "Practise out loud once. Then send. Warm. Clear. Short.",
        scripts: [
          {
            label: "Pause reply",
            text: "I need to check my plan — I'll come back tomorrow.",
          },
          {
            label: "Kind No — outing",
            text: "Thank you for including me. I can't spend on this one, and I still care about you. Let's find a low-cost catch-up soon.",
          },
          {
            label: "Kind No — family ask",
            text: "I hear you. I'm not able to help with money on this one. I can help think through options if that is useful.",
          },
          {
            label: "Values yes",
            text: "I've checked my plan — yes, this fits what matters to me this month. I'm in.",
          },
        ],
      },
      {
        title: "Decision journal",
        teach: "Log the request, the label, the script, and the decision. Patterns teach faster than guilt.",
        table: {
          title: "Money boundary log",
          headers: ["Request / purchase", "Need / Want / Pressure", "Script used", "Decision"],
          rows: 6,
        },
        prompts: ["Paused item:", "Kind No script I used:", "Final decision:", "What I protected by deciding:"],
      },
    ],
    actions: [
      { action: "Start a 24-hour pause on one non-emergency ask", minutes: "3 min", detail: "Timestamp tomorrow's decision time in Notes." },
      { action: "Label it need, want, or pressure", minutes: "5 min", detail: "Use the values page — no rush." },
      { action: "Check the ask against your Payday Map", minutes: "5 min", detail: "If you have no map yet, open Money Clarity." },
      { action: "Practise one Kind No script out loud", minutes: "3 min", detail: "Mouth first, then send." },
      { action: "Send the calm decision before guilt writes it", minutes: "5 min", detail: "Yes on values or Kind No — both can be respectful." },
      { action: "Log the decision in the journal table", minutes: "3 min", detail: "Pattern over self-attack." },
    ],
    qr: qrFor("Money"),
    upsell: {
      headline: "When you're ready for the next layer",
      items: [
        { name: "Money Clarity in 14 Days", line: "Strengthen the Payday Map your Kind No is protecting." },
        { name: "The Forward Collective", line: "Practise Soft Power and money boundaries with company." },
      ],
      close: "Values yes. Pressure pause. Your map keeps a spine.",
    },
    thankYou: {
      body: "You practised a warm boundary. That protects future-you without hardening your heart.",
      signoff: "Thank you for choosing dignity with FutureHer.",
    },
    sales: {
      headline: "Pressure isn't a bill.",
      subhead: "The Kind No Money Journal turns Pause · Values · Script into values pages, a script bank, and a decision log for real WhatsApp money pressure.",
      bullets: [
        "Kind No teach without coldness",
        "Values prompts for need / want / pressure",
        "Script bank for pause, outing, family ask, and values yes",
        "Decision journal table for patterns",
        "Pairs with the free EP010 Kind No money scripts worksheet",
      ],
      objection: "Slow answers can be loving. This journal gives you language before guilt spends.",
      priceLine: "R149 — a journal you reopen every time pressure gets loud.",
      cta: "Get the Kind No Money Journal and practise one script out loud today.",
      softClose: "Care deeply. Decide slowly. Speak clearly.",
      blurb:
        "When social pressure spends faster than your plan, the Kind No Money Journal expands Pause · Values · Script with a script bank and decision log so you can decline kindly without abandoning your Payday Map.",
    },
    emails: emails({
      e1s: "Your Kind No journal",
      e1p: "Pause before guilt spends.",
      e1b: `The Kind No Money Journal is ready.

If a request is sitting in WhatsApp, send the pause reply:

I need to check my plan — I'll come back tomorrow.

Lesson: ${DEST.youtube}`,
      e2s: "Pause · Values · Script",
      e2p: "Three steps. Warm spine.",
      e2b: `Pause — 24 hours for non-emergencies.
Values — need, want, or pressure?
Script — kind, clear, short.

Practise one script out loud once today.`,
      e3s: "Belonging isn't a receipt",
      e3p: "Status spending steals Forward-you.",
      e3b: `Spending to perform belonging is different from joy you chose on purpose.

Use the values page.
Ask: will I respect myself after a yes?`,
      e4s: "Log the decision",
      e4p: "Patterns over guilt.",
      e4b: `Send your calm decision.
Then fill one row in the decision journal.

Request · label · script · decision.
That log becomes your Soft Power archive.`,
      e5s: "Stay close",
      e5p: "Map + boundary together.",
      e5b: `You practised a Kind No.

If your Payday Map still needs structure, reopen Money Clarity in 14 Days.
Stay in The Forward Collective: ${DEST.community}

Ready for what's next.`,
    }),
  },
];
