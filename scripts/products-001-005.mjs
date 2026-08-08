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
    {
      day: 0,
      subject: base.e1s,
      preview: base.e1p,
      body: base.e1b,
    },
    {
      day: 2,
      subject: base.e2s,
      preview: base.e2p,
      body: base.e2b,
    },
    {
      day: 4,
      subject: base.e3s,
      preview: base.e3p,
      body: base.e3b,
    },
    {
      day: 7,
      subject: base.e4s,
      preview: base.e4p,
      body: base.e4b,
    },
    {
      day: 10,
      subject: base.e5s,
      preview: base.e5p,
      body: base.e5b,
    },
  ];
}

export const products001to005 = [
  {
    epId: "EP001",
    type: "Workbook",
    name: "The Task Layer Workbook",
    subtitle: "Map five tasks. Label them. Run one with AI — then edit in your voice.",
    slug: "task-layer-workbook",
    series: "FutureHer · AI",
    pillar: "AI",
    accent: "#2F6F6A",
    framework: "THE TASK LAYER",
    skillShort: "Map · Label · Run",
    idea: "AI pressures tasks — not your whole worth",
    episodeTitle: "AI won't replace you — but ignoring this will",
    freeCompanion: "Task Layer worksheet",
    priceZar: 197,
    whoFor:
      "This workbook is for South African women who feel AI panic at work and need a calm map — not another hype thread. Teachers, admin officers, freelancers, bank staff, and students who want to keep judgment human while using AI on real tasks.",
    promise: [
      "One clearer idea: AI pressures tasks, not your whole identity",
      "One practical skill: Map · Label · Run with ASSIST / OWN / HYBRID",
      "One action you can finish in a single sitting this week",
    ],
    brandingClose:
      "FutureHer does not create noise. FutureHer creates readiness. Work the pages. Keep your dignity. Practise on real work — Johannesburg inbox, Limpopo staffroom, or a quiet evening at the kitchen table.",
    contents: [
      { title: "Cover", page: "01" },
      { title: "Who this is for", page: "02" },
      { title: "Contents", page: "03" },
      { title: "The idea — fear is data", page: "04" },
      { title: "Skill — Map · Label · Run", page: "05" },
      { title: "Label guide — ASSIST / OWN / HYBRID", page: "06" },
      { title: "Five-task worksheet", page: "07" },
      { title: "Run one — edit in your voice", page: "08" },
      { title: "Reflection", page: "09" },
      { title: "Action sheets", page: "10" },
      { title: "QR codes", page: "11" },
      { title: "Next step", page: "12" },
      { title: "Thank you", page: "13" },
    ],
    pages: [
      {
        title: "The idea — fear is data",
        teach:
          "You're not dramatic for fearing AI. You're reading the room. Fear becomes useful when you treat it as data: which tasks feel threatened, which stay yours, and which can be assisted without surrendering judgment. AI replaces tasks — not your worth.",
        prompts: [
          "What AI fear shows up most for you at work right now?",
          "Which part of your job do you refuse to outsource — and why?",
        ],
        checkboxes: [
          "I can say out loud: AI pressures tasks, not my whole identity",
          "I will practise on one real task this week — not ten fantasies",
        ],
      },
      {
        title: "Skill — Map · Label · Run",
        teach:
          "The Task Layer has three moves. Map: write five tasks you actually did this week — not your job title. Label: mark each ASSIST, OWN, or HYBRID. Run one: pick one ASSIST or HYBRID task, get an AI first draft, then edit for truth, tone, and context before anyone else sees it.",
        steps: [
          ["Map", "List five concrete tasks from this week. Example: first draft of a parent letter; summarise a staff meeting; sort invoices."],
          ["Label", "ASSIST = AI can speed up. OWN = needs your judgment. HYBRID = AI drafts, you decide and own the send."],
          ["Run one", "Choose one ASSIST or HYBRID task. Prompt once. Edit in your voice. Save what you changed."],
        ],
        prompts: ["The one task I will run today is:"],
      },
      {
        title: "Label guide — ASSIST / OWN / HYBRID",
        teach:
          "Use these labels until they feel automatic. ASSIST covers drafting, sorting, summarising, and first research. OWN covers judgment, trust, accountability, and reading the room. HYBRID means AI starts and you finish — you still own the outcome.",
        checkboxes: [
          "ASSIST examples I use: drafting, sorting, summarising, first research",
          "OWN examples I protect: final decisions, confidential judgment, relationship calls",
          "HYBRID rule I keep: AI drafts · I verify · I send",
        ],
        prompts: [
          "One OWN task I will never fully automate:",
          "One ASSIST task I keep postponing:",
        ],
      },
      {
        title: "Five-task worksheet",
        teach: "Write five real tasks from your week. Label each. Add a short note on risk or privacy.",
        table: {
          title: "My five tasks this week",
          headers: ["Task", "ASSIST / OWN / HYBRID", "Notes / privacy"],
          rows: 5,
        },
      },
      {
        title: "Run one — edit in your voice",
        teach:
          "Pick one ASSIST or HYBRID task. Get an AI first draft. Then edit: strip anything untrue, add context only you know, and read it aloud once. If your mouth trips, your reader will too.",
        table: {
          title: "The one I will run today",
          headers: ["Task", "Prompt I used", "What I changed in my edit"],
          rows: 2,
        },
        prompts: ["What did I learn about my voice in this edit?"],
      },
      {
        title: "Reflection",
        teach: "Close the loop. Three prompts max — then return to work.",
        prompts: [
          "Which label felt hardest to assign — and what does that tell you?",
          "Where did AI help without stealing your judgment?",
          "What will you practise again next week?",
        ],
      },
    ],
    actions: [
      {
        action: "Map five real work tasks from this week",
        minutes: "8 min",
        detail: "Write tasks, not job titles. Include one admin task and one communication task.",
      },
      {
        action: "Label each task ASSIST, OWN, or HYBRID",
        minutes: "5 min",
        detail: "If privacy is unclear, mark OWN until you know the rule.",
      },
      {
        action: "Run one ASSIST or HYBRID task with AI",
        minutes: "12 min",
        detail: "One prompt. One draft. No tool hopping.",
      },
      {
        action: "Edit the draft in your voice before sharing",
        minutes: "8 min",
        detail: "Fix facts, tone, and one true detail only you would know.",
      },
      {
        action: "Save your five-task map in Notes for next week",
        minutes: "3 min",
        detail: "Reuse the map. Update labels as your week changes.",
      },
    ],
    qr: qrFor("AI"),
    upsell: {
      headline: "When you're ready for the next layer",
      items: [
        {
          name: "Trusted Tools Checklist",
          line: "Pick one AI tool you can trust — Need · Safety · Stick — without the download circus.",
        },
        {
          name: "The Forward Collective",
          line: "Stay close for challenges, worksheets, and calm weekly practice on YouTube Community.",
        },
      ],
      close: "No pressure. Finish The Task Layer first. Readiness compounds.",
    },
    thankYou: {
      body: "You mapped real work. You kept judgment human. That is readiness — not performance.",
      signoff: "Thank you for practising with FutureHer.",
    },
    sales: {
      headline: "Stop panicking about AI. Map the tasks.",
      subhead:
        "The Task Layer Workbook turns AI fear into a writeable system: Map · Label · Run — built for South African workdays, not Silicon Valley theatre.",
      bullets: [
        "Full A4 workbook with teach pages, label guide, and write-in worksheets",
        "ASSIST / OWN / HYBRID labels you can reuse every week",
        "Five timeboxed actions you can finish in one sitting",
        "Pairs with the free EP001 Task Layer worksheet",
        "Soft next steps into Trusted Tools and The Forward Collective",
      ],
      objection:
        "If you've already watched the lesson — this workbook is the practice room. The video teaches; the pages make it stick on your actual duties.",
      priceLine: "R197 — once. Print it, fill it, keep it next to your desk.",
      cta: "Get The Task Layer Workbook and run one AI-assisted task this week.",
      softClose: "Ready for what's next — starting with five honest tasks.",
      blurb:
        "If the free Task Layer worksheet helped and you want a fuller practice room — The Task Layer Workbook expands Map · Label · Run with label guides, reflection, and a week-ready action sheet for South African workdays.",
    },
    emails: emails({
      e1s: "Your Task Layer is ready",
      e1p: "Open page one. Map five tasks.",
      e1b: `Welcome — your Task Layer Workbook is ready.

Open the cover, then go straight to the five-task worksheet.
Your only job today: write five real tasks from this week and label one of them ASSIST or HYBRID.

Episode companion: AI won't replace you — but ignoring this will
Watch again anytime: ${DEST.youtube}`,
      e2s: "Map · Label · Run",
      e2p: "The three moves, on paper.",
      e2b: `Quick teach from your workbook.

Map — tasks, not titles.
Label — ASSIST, OWN, or HYBRID.
Run one — AI drafts, you edit, you own the send.

Reply to yourself in Notes: which one task will you run before Friday?`,
      e3s: "Fear is data",
      e3p: "Not a forecast. A signal.",
      e3b: `If AI fear got loud again, use the idea page.

Fear is data. Data needs a next step.
Protect your OWN tasks. Assist the ones that deserve speed.
You are not behind for wanting clarity.`,
      e4s: "Finish one run",
      e4p: "Twelve minutes is enough.",
      e4b: `Open your action sheet.

Run one ASSIST or HYBRID task.
Edit for truth and tone.
Tick Done — then stop.

When you finish, write one line: what you changed in your voice.`,
      e5s: "Next layer when ready",
      e5p: "Trusted Tools is waiting.",
      e5b: `You practised The Task Layer. That is enough for now.

When you're ready, the Trusted Tools Checklist helps you pick one AI tool without the download circus.
Or stay close in The Forward Collective: ${DEST.community}

No pressure. Readiness compounds.`,
    }),
  },

  {
    epId: "EP002",
    type: "Checklist",
    name: "Trusted Tools Checklist",
    subtitle: "Need · Safety · Stick — choose one AI tool you can live with for thirty days.",
    slug: "trusted-tools-checklist",
    series: "FutureHer · AI",
    pillar: "AI",
    accent: "#2F6F6A",
    framework: "THE TRUST STACK",
    skillShort: "Need · Safety · Stick",
    idea: "Trust is a checklist — not a download frenzy",
    episodeTitle: "Stop downloading every AI app — pick one you can trust",
    freeCompanion: "AI Tool Trust Checklist",
    priceZar: 97,
    whoFor:
      "This checklist is for South African women whose phones are full of AI apps they never open — teachers, freelancers, office staff, and students tired of tool FOMO and ready for one calm primary assistant.",
    promise: [
      "One clearer idea: downloads are not progress",
      "One practical skill: Need · Safety · Stick",
      "One 30-day tool decision you can keep",
    ],
    brandingClose:
      "FutureHer does not create noise. FutureHer creates readiness. Mute the circus. Practise with one tool until your hands know the path.",
    contents: [
      { title: "Cover", page: "01" },
      { title: "Who this is for", page: "02" },
      { title: "Contents", page: "03" },
      { title: "Trust Stack overview", page: "04" },
      { title: "Need checklist", page: "05" },
      { title: "Safety checklist", page: "06" },
      { title: "Stick + tool scorecard", page: "07" },
      { title: "Action sheets", page: "08" },
      { title: "QR codes", page: "09" },
      { title: "Next step", page: "10" },
      { title: "Thank you", page: "11" },
    ],
    pages: [
      {
        title: "Trust Stack overview",
        teach:
          "The Trust Stack has three gates. Need: one job for AI this month. Safety: three non-negotiable rules you can explain in plain English. Stick: one primary assistant for thirty days while you mute the rest. Free can be fine. Paid can be fine. Fluency needs repetition.",
        steps: [
          ["Need", "Write one sentence: I need AI to help me with ___."],
          ["Safety", "Never paste passwords/OTPs · no private files without permission · edit facts before send."],
          ["Stick", "Circle ChatGPT, Gemini, or Copilot as Primary — 30 days."],
        ],
      },
      {
        title: "Need checklist",
        teach: "Shrink the job until it is honest. One job beats ten shiny features.",
        checkboxes: [
          "I named one work job for AI this month — not ten",
          "The job shows up in my real week (emails, notes, outlines, sorting)",
          "I can finish a first attempt on phone or laptop I already have",
          "I am not choosing a tool only because a WhatsApp group hyped it",
        ],
        prompts: ["My one Need sentence:"],
      },
      {
        title: "Safety checklist",
        teach: "If you cannot explain where your data goes in one plain sentence — pause.",
        checkboxes: [
          "Never paste passwords or OTPs into AI",
          "Never paste private client, learner, or payroll files without permission",
          "Always edit facts before I send or submit",
          "I paused on any tool asking for access I do not understand",
          "I know whether this tool is allowed at my workplace",
        ],
        prompts: ["My three safety rules:"],
      },
      {
        title: "Stick + tool scorecard",
        teach: "Score tools you already have. Keep one. Mute the rest for thirty days.",
        table: {
          title: "Tool scorecard",
          headers: ["Tool name", "Need it meets", "Safety pass? Y/N", "Keep / Mute"],
          rows: 5,
        },
        prompts: ["Primary tool for 30 days:", "First real task I will run on it:"],
      },
    ],
    actions: [
      { action: "Write your one Need sentence", minutes: "5 min", detail: "One job only — emails, notes, outlines, or sorting." },
      { action: "Write three safety rules in Notes", minutes: "5 min", detail: "Passwords, private files, edit-before-send." },
      { action: "Score every AI app currently on your phone", minutes: "10 min", detail: "Use the tool scorecard. Be honest." },
      { action: "Choose one primary tool for 30 days", minutes: "3 min", detail: "ChatGPT, Gemini, or Copilot — circle one." },
      { action: "Mute or delete unused AI apps", minutes: "5 min", detail: "Remove the circus so Stick can happen." },
      { action: "Run one real task on the primary tool today", minutes: "15 min", detail: "Save the result. That is fluency starting." },
    ],
    qr: qrFor("AI"),
    upsell: {
      headline: "When you're ready for the next layer",
      items: [
        { name: "Phone-First AI Toolkit", line: "Run Capture · Prompt · Save entirely on your phone — including low-data days." },
        { name: "The Forward Collective", line: "Company while you stick with one tool for thirty days." },
      ],
      close: "No pressure. One trusted tool is already a win.",
    },
    thankYou: {
      body: "You chose trust over collection. That decision will quiet more noise than another download ever could.",
      signoff: "Thank you for choosing calm with FutureHer.",
    },
    sales: {
      headline: "One tool. Ignore the circus.",
      subhead: "The Trusted Tools Checklist turns Need · Safety · Stick into printable pass/fail gates and a 30-day primary-tool scorecard.",
      bullets: [
        "Need, Safety, and Stick checklists you can reuse quarterly",
        "Tool scorecard for Keep / Mute decisions",
        "Six timeboxed actions under one sitting",
        "Built for WhatsApp-driven tool FOMO in South Africa",
        "Pairs with the free EP002 AI Tool Trust Checklist",
      ],
      objection: "You do not need another app review channel. You need a closed choice and three rules.",
      priceLine: "R97 — print once, refresh each quarter.",
      cta: "Get the Trusted Tools Checklist and pick your primary AI tool today.",
      softClose: "Good enough beats perfect. Stick beats collecting.",
      blurb:
        "If you want a living list you can refresh each quarter — without chasing every new app — the Trusted Tools Checklist keeps your Need · Safety · Stick decisions in one calm place.",
    },
    emails: emails({
      e1s: "Your Trusted Tools Checklist",
      e1p: "Need first. Apps later.",
      e1b: `Your Trusted Tools Checklist is ready.

Open the Need page first.
Write one sentence: I need AI to help me with ___.

Do not download anything new today.
Watch the lesson anytime: ${DEST.youtube}`,
      e2s: "Three safety rules",
      e2p: "Plain English. Non-negotiable.",
      e2b: `Safety is not paranoia. It is employability.

Write these three rules in Notes if you have not:
1. Never paste passwords or OTPs
2. Never paste private files without permission
3. Always edit facts before you send`,
      e3s: "Choice fatigue isn't failure",
      e3p: "Shrink the menu.",
      e3b: `If you feel behind because of tool lists, that is choice fatigue — not personal failure.

A closed choice lowers the threat.
Pick one primary assistant. Mute the rest for thirty days.`,
      e4s: "Scorecard day",
      e4p: "Keep or mute — decide.",
      e4b: `Open your tool scorecard.

Mark Keep or Mute for every AI app on your phone.
Circle one Primary for 30 days.
Then run one real task on it before tonight.`,
      e5s: "Phone-first when ready",
      e5p: "No laptop required.",
      e5b: `You have a trust decision. That is the win.

When you're ready, the Phone-First AI Toolkit shows Capture · Prompt · Save on mobile — including low-data windows.
Stay close: ${DEST.community}`,
    }),
  },

  {
    epId: "EP003",
    type: "Toolkit",
    name: "Phone-First AI Toolkit",
    subtitle: "Capture · Prompt · Save — finish real AI tasks on your phone, even on low data.",
    slug: "phone-first-ai-toolkit",
    series: "FutureHer · AI",
    pillar: "AI",
    accent: "#2F6F6A",
    framework: "THE PHONE FLOW",
    skillShort: "Capture · Prompt · Save",
    idea: "A smartphone is a full AI classroom if you have a system",
    episodeTitle: "You only have a phone? You can still use AI",
    freeCompanion: "Phone-Only AI Starter Card",
    priceZar: 179,
    whoFor:
      "This toolkit is for South African women who work from a phone first — commuting, load-shedding evenings, rural data limits, shared laptops, or no laptop at all — and still want finished AI tasks without device envy.",
    promise: [
      "One clearer idea: no laptop does not mean no AI",
      "One practical skill: Capture · Prompt · Save",
      "One phone-only task finished in under 30 minutes",
    ],
    brandingClose:
      "FutureHer builds for real constraints. Data is a budget line. Capture offline. Prompt in a short window. Save before you close.",
    contents: [
      { title: "Cover", page: "01" },
      { title: "Who this is for", page: "02" },
      { title: "Contents", page: "03" },
      { title: "Phone Flow system", page: "04" },
      { title: "Low-data playbook", page: "05" },
      { title: "Voice-to-prompt cards", page: "06" },
      { title: "Weekly phone tracker", page: "07" },
      { title: "Action sheets", page: "08" },
      { title: "QR codes", page: "09" },
      { title: "Next step", page: "10" },
      { title: "Thank you", page: "11" },
    ],
    pages: [
      {
        title: "Phone Flow system",
        teach:
          "The Phone Flow is three moves that fit a smartphone. Capture: voice note or three messy lines before you open AI. Prompt: one clear ask in a Wi‑Fi or short data window. Save: copy the useful result into Notes and edit two lines in your voice before you switch apps.",
        steps: [
          ["Capture", "Offline-friendly. Cheap on data. Name the task before the tool."],
          ["Prompt", "One ask · one window. Do not browse ten features on mobile data."],
          ["Save", "Notes over screenshots when possible. Edit two lines. Then close."],
        ],
      },
      {
        title: "Low-data playbook",
        teach: "Treat data like airtime — planned, not endless scroll.",
        checkboxes: [
          "I captured the task offline or on Notes before opening AI",
          "I chose one Wi‑Fi or short data window for prompting",
          "I avoided browsing extra AI features during that window",
          "I saved the useful output before the app switched or signal dropped",
        ],
        prompts: [
          "My usual data window today (time + place):",
          "Task I will finish phone-only:",
        ],
      },
      {
        title: "Voice-to-prompt cards",
        teach: "Talk first. Type less. A messy voice note is a valid first draft of your prompt.",
        scripts: [
          {
            label: "Capture script",
            text: "I need help with [task]. Audience is [who]. Must include [facts]. Tone should sound like me at work — clear, warm, no buzzwords.",
          },
          {
            label: "Prompt wrapper",
            text: "Turn my notes into [deliverable] under 120 words. Keep my facts. Do not invent names or numbers. End with one clear ask.",
          },
          {
            label: "Save checklist whisper",
            text: "Before I close: copy to Notes · edit two lines · delete anything untrue · done.",
          },
        ],
      },
      {
        title: "Weekly phone tracker",
        teach: "Five loops. Phone only. That is a week of readiness.",
        table: {
          title: "This week's Capture · Prompt · Save loops",
          headers: ["Task", "Capture method", "Prompt used", "Saved in"],
          rows: 5,
        },
      },
    ],
    actions: [
      { action: "Capture one task as a voice note or three lines", minutes: "3 min", detail: "Do this before you open any AI app." },
      { action: "Choose today's data window", minutes: "2 min", detail: "Lunch Wi‑Fi, evening home, or one short mobile burst." },
      { action: "Prompt once on your phone", minutes: "8 min", detail: "One ask. No feature tourism." },
      { action: "Save and edit two lines in Notes", minutes: "7 min", detail: "Make it sound like you before you close." },
      { action: "Log the loop on the weekly tracker", minutes: "3 min", detail: "Task · method · where you saved it." },
      { action: "Repeat one more loop before the week ends", minutes: "15 min", detail: "Fluency is repetition on a phone you already own." },
    ],
    qr: qrFor("AI"),
    upsell: {
      headline: "When you're ready for the next layer",
      items: [
        { name: "Human Edit Loop Templates", line: "Keep your voice when AI drafts get too smooth." },
        { name: "The Forward Collective", line: "Phone-first challenges with other women practising in real constraints." },
      ],
      close: "Your phone is enough. Finish today's loop first.",
    },
    thankYou: {
      body: "You finished AI work on the device you already have. That is modern readiness — not waiting for perfect tools.",
      signoff: "Thank you for practising phone-first with FutureHer.",
    },
    sales: {
      headline: "Your phone is enough.",
      subhead: "The Phone-First AI Toolkit gives you Capture · Prompt · Save cards, a low-data playbook, and a weekly tracker built for South African mobile life.",
      bullets: [
        "Phone Flow system pages plus low-data rules",
        "Voice-to-prompt copy cards you can reuse",
        "Weekly tracker for five real loops",
        "Designed for commute, load-shedding, and prepaid data",
        "Pairs with the free EP003 Phone-Only AI Starter Card",
      ],
      objection: "Waiting for a laptop before you start AI is how later becomes never. This toolkit removes that excuse kindly.",
      priceLine: "R179 — toolkit PDF you can keep on your phone.",
      cta: "Get the Phone-First AI Toolkit and finish one mobile AI task today.",
      softClose: "System beats device envy.",
      blurb:
        "When you're ready for a week of guided phone-only drills — voice notes, low-data windows, and save habits — the Phone-First AI Toolkit is built for real SA data constraints, not laptop fantasy.",
    },
    emails: emails({
      e1s: "Your Phone-First Toolkit",
      e1p: "Capture before you prompt.",
      e1b: `Your Phone-First AI Toolkit is ready.

Do not open ChatGPT yet.
Open voice notes or Notes and capture one real task in one sentence.

Then pick today's data window.
Lesson home: ${DEST.youtube}`,
      e2s: "Capture · Prompt · Save",
      e2p: "Three moves. Phone only.",
      e2b: `The Phone Flow again:

Capture — offline-friendly.
Prompt — one ask, one window.
Save — Notes before you switch apps.

If signal is weak, capture now and prompt later.`,
      e3s: "Data is a budget line",
      e3p: "Plan the window.",
      e3b: `Low-data days are not a character test.

Browse less. Capture first.
Prompt once.
Save immediately.

That is professional mobile practice.`,
      e4s: "Log your first loop",
      e4p: "Tracker page is waiting.",
      e4b: `Open the weekly tracker.

Fill one row: Task · Capture method · Prompt · Saved in.
If you have not saved yet, do that before you reply to anyone with AI text.`,
      e5s: "Keep your voice next",
      e5p: "Human Edit Loop Templates.",
      e5b: `Phone fluency is growing.

When AI drafts start sounding fake, Human Edit Loop Templates teach Draft · Strip · Stamp.
Stay close: ${DEST.community}`,
    }),
  },

  {
    epId: "EP004",
    type: "Template",
    name: "Human Edit Loop Templates",
    subtitle: "Draft · Strip · Stamp — reusable edits so AI writing still sounds like you.",
    slug: "human-edit-loop-templates",
    series: "FutureHer · AI",
    pillar: "AI",
    accent: "#2F6F6A",
    framework: "THE HUMAN EDIT LOOP",
    skillShort: "Draft · Strip · Stamp",
    idea: "AI draft ≠ your voice until you edit",
    episodeTitle: "How to use AI without sounding fake",
    freeCompanion: "Human Edit Loop card",
    priceZar: 149,
    whoFor:
      "This template pack is for South African women who use AI for emails, reports, and messages — and hate the robotic aftertaste. Built for professionals who want speed without losing trust.",
    promise: [
      "One clearer idea: smooth is not the same as you",
      "One practical skill: Draft · Strip · Stamp",
      "One reusable strip list and stamp prompts",
    ],
    brandingClose:
      "FutureHer protects your voice. AI can start the structure. You still carry identity, truth, and the final send.",
    contents: [
      { title: "Cover", page: "01" },
      { title: "Who this is for", page: "02" },
      { title: "Contents", page: "03" },
      { title: "Edit Loop teach", page: "04" },
      { title: "Strip library", page: "05" },
      { title: "Stamp templates", page: "06" },
      { title: "Before/after worksheet", page: "07" },
      { title: "Action sheets", page: "08" },
      { title: "QR codes", page: "09" },
      { title: "Next step", page: "10" },
      { title: "Thank you", page: "11" },
    ],
    pages: [
      {
        title: "Edit Loop teach",
        teach:
          "Draft: let AI start the structure — ask for no buzzwords from the beginning when you can. Strip: delete empty openers and corporate camouflage you would never say aloud. Stamp: add one true detail only you would know, then read aloud before you send.",
        steps: [
          ["Draft", "AI starts. You do not outsource identity."],
          ["Strip", "Buzzwords out. Breath back in."],
          ["Stamp", "One true detail. Your voice. Read aloud."],
        ],
      },
      {
        title: "Strip library",
        teach: "Kill the camouflage. These phrases rarely sound like a real person in Braamfontein, Polokwane, or Durban.",
        table: {
          title: "My strip list",
          headers: ["Phrase to strip", "Why it sounds fake", "My natural replacement"],
          rows: 6,
        },
        note: "Seed bans to consider: hope this finds you well · leverage · synergy · delve · circling back · robust solutioning.",
      },
      {
        title: "Stamp templates",
        teach: "Stamp truth. Invoice numbers, real meeting details, real reasons — that is trust.",
        scripts: [
          {
            label: "Email stamp",
            text: "Add: the real meeting day, the exact ask, and one reason that is true. Remove any sentence you would not say to a colleague face to face.",
          },
          {
            label: "Report stamp",
            text: "Replace vague claims with one verified number from your own notes. If you cannot verify it, cut it.",
          },
          {
            label: "WhatsApp / short message stamp",
            text: "One warm greeting · one clear fact · one ask · no corporate filler.",
          },
        ],
      },
      {
        title: "Before/after worksheet",
        teach: "Practise on a real draft — school letter, client email, or manager update.",
        table: {
          title: "Human edit log",
          headers: ["Piece I'm editing", "What I stripped", "What I stamped"],
          rows: 4,
        },
        prompts: ["Read-aloud note — where did my mouth trip?"],
      },
    ],
    actions: [
      { action: "Open your last AI draft", minutes: "2 min", detail: "Email, report, or message — anything you almost sent." },
      { action: "Highlight three lines that are not you", minutes: "5 min", detail: "If you would not say it aloud, mark it." },
      { action: "Strip five banned phrases into your strip list", minutes: "8 min", detail: "Write natural replacements beside each." },
      { action: "Stamp one true detail only you know", minutes: "5 min", detail: "Meeting fact, invoice detail, or real reason." },
      { action: "Read the final paragraph aloud once", minutes: "3 min", detail: "If your mouth trips, edit again." },
      { action: "Save the before/after in your edit log", minutes: "3 min", detail: "Reuse the pattern tomorrow." },
    ],
    qr: qrFor("AI"),
    upsell: {
      headline: "When you're ready for the next layer",
      items: [
        { name: "AI Boundaries at Work Guide", line: "Map Automate · Assist · Avoid so voice work stays boss-safe." },
        { name: "The Forward Collective", line: "Share one human-edited win with the community." },
      ],
      close: "Keep your story in the edit. That is the trust signal.",
    },
    thankYou: {
      body: "You refused to sound like a template. Your readers can feel the difference.",
      signoff: "Thank you for keeping your voice with FutureHer.",
    },
    sales: {
      headline: "AI draft ≠ your voice.",
      subhead: "Human Edit Loop Templates give you strip libraries, stamp scripts, and before/after logs so speed never costs trust.",
      bullets: [
        "Draft · Strip · Stamp teach page",
        "Reusable strip library table",
        "Stamp templates for email, reports, and short messages",
        "Before/after worksheet for real drafts",
        "Pairs with the free EP004 Human Edit Loop card",
      ],
      objection: "You do not need to quit AI. You need a human edit you can repeat in under fifteen minutes.",
      priceLine: "R149 — templates you will reuse every week.",
      cta: "Get Human Edit Loop Templates and recover your voice on the next AI draft.",
      softClose: "Smooth ≠ ready. Stamp the truth.",
      blurb:
        "When AI drafts start sounding robotic, Human Edit Loop Templates expand Draft · Strip · Stamp with strip libraries, stamp scripts, and a before/after log you can reuse on every send.",
    },
    emails: emails({
      e1s: "Your edit templates are in",
      e1p: "Strip first. Stamp second.",
      e1b: `Human Edit Loop Templates are ready.

Open your last AI draft.
Highlight one line that is not you.

That line is today's starting point.
Lesson: ${DEST.youtube}`,
      e2s: "Draft · Strip · Stamp",
      e2p: "Three edits. Your voice back.",
      e2b: `Draft with AI.
Strip empty openers and buzzwords.
Stamp one true detail.
Read aloud once.

If your mouth trips, your reader will too.`,
      e3s: "Kill the camouflage",
      e3p: "Buzzwords aren't professional.",
      e3b: `Fill five rows in your strip library today.

Seed bans: hope this finds you well, leverage, synergy, delve, circling back.

Write how you would actually say it to a colleague.`,
      e4s: "Stamp one true detail",
      e4p: "Trust lives in specifics.",
      e4b: `Open the stamp templates.

Add one real meeting detail, verified number, or honest reason.
Then log the before/after on your worksheet.`,
      e5s: "Boundaries when ready",
      e5p: "Automate · Assist · Avoid.",
      e5b: `Your voice is clearer.

When workplace AI rules feel vague, the AI Boundaries at Work Guide gives you a duty map and manager scripts.
Community: ${DEST.community}`,
    }),
  },

  {
    epId: "EP005",
    type: "Guide",
    name: "AI Boundaries at Work Guide",
    subtitle: "Automate · Assist · Avoid — a boss-safe map for real South African workplaces.",
    slug: "ai-boundaries-at-work-guide",
    series: "FutureHer · AI",
    pillar: "AI",
    accent: "#2F6F6A",
    framework: "THE WORK MAP",
    skillShort: "Automate · Assist · Avoid",
    idea: "Clarity beats permission anxiety — map what AI may touch",
    episodeTitle: "What AI can and cannot do at your job",
    freeCompanion: "Automate / Assist / Avoid map",
    priceZar: 197,
    whoFor:
      "This guide is for South African women whose manager said “use AI more” with zero rules — office teams, schools, clinics admin, banks, and freelancers who need a calm duty map and conversation scripts.",
    promise: [
      "One clearer idea: Assist is not replace",
      "One practical skill: Automate · Assist · Avoid",
      "One Assist task run and verified before share",
    ],
    brandingClose:
      "FutureHer keeps judgment human. AI can prepare. You still carry accountability, privacy, and the final decision.",
    contents: [
      { title: "Cover", page: "01" },
      { title: "Who this is for", page: "02" },
      { title: "Contents", page: "03" },
      { title: "Work Map teach", page: "04" },
      { title: "Duty mapping worksheet", page: "05" },
      { title: "Manager conversation scripts", page: "06" },
      { title: "Privacy red lines", page: "07" },
      { title: "Action sheets", page: "08" },
      { title: "QR codes", page: "09" },
      { title: "Next step", page: "10" },
      { title: "Thank you", page: "11" },
    ],
    pages: [
      {
        title: "Work Map teach",
        teach:
          "Automate: repetitive low-risk tasks where mistakes are easy to spot and fix. Assist: AI drafts, you verify, you own the send. Avoid: passwords, confidential data, invented facts, final judgments, and unsupervised commitments. Ambiguity feels like danger — a map restores movement.",
        steps: [
          ["Automate", "Repeatable · low-risk · easy to check"],
          ["Assist", "Draft help · human ownership"],
          ["Avoid", "Confidential · accountable · unverified"],
        ],
      },
      {
        title: "Duty mapping worksheet",
        teach: "List eight real duties from your job. Label each lane. Note what you must check before share.",
        table: {
          title: "My eight duties",
          headers: ["Duty", "Automate / Assist / Avoid", "Why", "Check before share"],
          rows: 8,
        },
      },
      {
        title: "Manager conversation scripts",
        teach: "Use these when policy is vague. Warm. Clear. Short. No drama.",
        scripts: [
          {
            label: "Clarify the lane",
            text: "I want to use AI in a way that protects our work. For [duty], I plan to use it as Assist — AI drafts, I verify. Are there duties you want marked Avoid?",
          },
          {
            label: "Privacy boundary",
            text: "I will not paste passwords, OTPs, payroll, or private client/learner data into AI tools. If a task needs those details, I will keep it human-only.",
          },
          {
            label: "Verification habit",
            text: "Before I share AI-assisted work, I will verify sources, numbers, and names. If I cannot verify, I will cut the claim.",
          },
        ],
      },
      {
        title: "Privacy red lines",
        teach: "Don't paste secrets. Privacy is professional — not fear.",
        checkboxes: [
          "Passwords, OTPs, and banking secrets stay out of AI",
          "Payroll, ID numbers, and private learner/client files stay Avoid",
          "I strip names and sensitive details before prompting when possible",
          "I never let AI invent facts, citations, or commitments I will own",
          "Final judgments and unsupervised promises stay human",
        ],
        prompts: ["One Avoid duty I will protect this week:", "One Assist task I will run today:"],
      },
    ],
    actions: [
      { action: "List eight real duties from your job", minutes: "10 min", detail: "Concrete duties — not vague goals." },
      { action: "Label each Automate, Assist, or Avoid", minutes: "8 min", detail: "When unsure, choose Avoid until clarified." },
      { action: "Write one manager clarification message", minutes: "7 min", detail: "Use a script from this guide — edit in your voice." },
      { action: "Run one Assist task with AI", minutes: "12 min", detail: "Draft, verify, then share only after checks." },
      { action: "Remove one sensitive detail before prompting", minutes: "3 min", detail: "Names, IDs, or private numbers out." },
    ],
    qr: qrFor("AI"),
    upsell: {
      headline: "When you're ready for the next layer",
      items: [
        { name: "Forever Prompts Cheat Sheet", line: "RTCCE prompts that still work when tools change." },
        { name: "The Forward Collective", line: "Practise workplace AI boundaries with others doing the same." },
      ],
      close: "Clarity first. Then speed. Judgment stays yours.",
    },
    thankYou: {
      body: "You mapped what AI may touch. That is professional courage — quiet and useful.",
      signoff: "Thank you for leading with clarity alongside FutureHer.",
    },
    sales: {
      headline: "Assist ≠ replace.",
      subhead: "The AI Boundaries at Work Guide turns Automate · Assist · Avoid into a duty map, privacy red lines, and manager scripts for real SA workplaces.",
      bullets: [
        "Work Map teach with clear lane definitions",
        "Eight-duty mapping worksheet",
        "Manager conversation scripts you can send today",
        "Privacy red-line checklist",
        "Pairs with the free EP005 Automate / Assist / Avoid map",
      ],
      objection: "If policy is missing, freezing is rational. This guide gives you a map and language — not reckless experimentation.",
      priceLine: "R197 — keep beside your workplace AI questions.",
      cta: "Get the AI Boundaries at Work Guide and map eight duties today.",
      softClose: "Clarity beats permission anxiety.",
      blurb:
        "If your workplace is vague about AI rules, the AI Boundaries at Work Guide expands Automate · Assist · Avoid with conversation scripts for managers and a reusable duty checklist.",
    },
    emails: emails({
      e1s: "Your Work Map guide",
      e1p: "Eight duties. Three lanes.",
      e1b: `Your AI Boundaries at Work Guide is ready.

Open the duty mapping worksheet.
List eight real duties from your job before you touch a new AI feature.

Lesson home: ${DEST.youtube}`,
      e2s: "Automate · Assist · Avoid",
      e2p: "Judgment stays human.",
      e2b: `Automate — repetitive, low-risk, easy to check.
Assist — AI drafts, you verify, you own the send.
Avoid — secrets, invented facts, final judgments.

Label three duties right now.`,
      e3s: "Ambiguity feels like danger",
      e3p: "A map restores movement.",
      e3b: `If your body froze when leadership said "use AI," that was ambiguity — not incompetence.

Use a manager script from the guide.
Ask which duties are Avoid.
Offer your Assist plan for one duty.`,
      e4s: "Run one Assist task",
      e4p: "Verify before share.",
      e4b: `Pick one Assist duty.
Draft with AI.
Verify facts.
Share only after the check.

Log what you verified on the worksheet.`,
      e5s: "Forever prompts next",
      e5p: "RTCCE on one page.",
      e5b: `Boundaries create room for better prompts.

When you're ready, the Forever Prompts Cheat Sheet locks Role · Task · Context · Constraints · Example.
Community: ${DEST.community}`,
    }),
  },
];
