/** EP005–EP007 publication data */
const short = (code, file, title, cut, publish, role, exp, hookOs, hookVo, reframeOs, reframeVo, valueOs, valueVo, actionOs, actionVo) => ({
  code, file, title, cut, publish, role, export: exp, hookOs, hookVo, reframeOs, reframeVo, valueOs, valueVo, actionOs, actionVo,
});

export const episodes005to007 = [
  {
    id: "EP005",
    title: "What AI can and cannot do at your job",
    alts: [
      "What you're actually allowed to use AI for at work",
      "Automate, Assist, Avoid — your AI work map",
      "Boss-safe AI uses that won't get you in trouble",
    ],
    slug: "ep005-ai-work-map-boundaries",
    topic: "T005",
    framework: "THE WORK MAP",
    series: "FutureHer · AI",
    pillar: "AI",
    template: "A Educational",
    templateId: "FH_TMPL_A_Educational",
    projectName: "FH_EP005_AI_WorkMap",
    accent: "#2F6F6A",
    idea: "Clarity beats permission anxiety — map what AI may touch",
    skillLine: "The Work Map — Automate · Assist · Avoid",
    skillShort: "Automate · Assist · Avoid",
    actionLine: "Map eight duties. Run one Assist task today.",
    cta: "Subscribe + this week's Work Map challenge",
    ctaExtra: "Challenge — map your week and run one Assist task daily: [CHALLENGE LINK]",
    product: "AI Boundaries at Work one-pager pack",
    productBlurb:
      "If your workplace is vague about AI rules, the AI Boundaries at Work pack expands the Automate · Assist · Avoid map with conversation scripts for managers and a reusable duty checklist.",
    download: "Automate / Assist / Avoid map",
    worksheetFile: "AI_WORK_MAP_worksheet.html",
    thumbText: "Assist ≠ replace",
    thumbSupport: "Automate · Assist · Avoid",
    hookOverlay: "Assist ≠ replace.",
    storyOverlays: ["manager said use AI", "no rules", "freeze", "what's safe"],
    problemOverlays: ["Permission anxiety", "Automate", "Assist", "Avoid", "Judgment stays yours"],
    skillOverlays: ["THE WORK MAP", "01 Automate", "02 Assist", "03 Avoid", "Automate · Assist · Avoid"],
    psychOverlay: "Ambiguity feels like danger.",
    actionOverlay: "Map 8 duties. Run 1 Assist.",
    actionSteps: [
      "List eight real duties from your job",
      "Label each: Automate · Assist · Avoid",
      "Run one Assist task with AI — then verify before share",
    ],
    previewOverlay: "Next — prompting basics that last",
    demo: "Eight duties list → AAA labels → one Assist email/summary demo",
    primaryKw: "what can AI do at work",
    secondaryKw: [
      "AI boundaries at work",
      "safe AI uses office",
      "ChatGPT work rules",
      "AI for admin jobs",
      "AI policy for employees",
      "FutureHer",
    ],
    tags: "what can AI do at work, AI boundaries at work, safe AI uses office, ChatGPT work rules, FutureHer, AI for women, AI at work South Africa, Automate Assist Avoid, workplace AI",
    intent: "Informational → Boundary clarity → Micro action",
    clickTest: "Office worker sees: unclear AI rules → simple map → safe action today",
    langLater: "ZU",
    hashtagsLong: "#FutureHer #AIForWomen #SouthAfrica",
    hashtagsShort: "#FutureHer #AIForWomen",
    hashtagsLi: "#FutureHer #AIatWork #SouthAfrica",
    chapters: `0:00 Assist is not replace
0:30 When the boss says "use AI" with no rules
2:00 Why ambiguity freezes good workers
4:00 The Work Map (Automate · Assist · Avoid)
6:00 Ambiguity feels like danger
7:00 Map eight duties today
7:40 Challenge + subscribe
7:55 Next: forever prompting basics`,
    descOpen: "If your manager said “use AI more” and gave you zero rules, you don't need panic — you need a Work Map.",
    toolsBlock: `Tools mentioned:
- Any workplace-allowed AI assistant
- Never paste passwords, OTPs, or confidential client files

Digital product: AI Boundaries at Work one-pager pack`,
    hook: `If your boss said "use AI more"
and your body heard "don't mess this up" —
you're not slow.

You're missing a map.

Today: one idea, one skill, one action.
Clarity on what AI may touch — and what stays human.`,
    story: `Picture this.
In a Johannesburg office — or a school staffroom in Limpopo —
someone in leadership drops a line in the group chat:
"Let's start using AI to work smarter."

No policy.
No examples.
No "never do this" list.

Half the room freezes.
Someone experiments wildly.
Someone pretends they already know.

I've watched excellent admins, teachers, supervisors, and analysts
get stuck between looking progressive and staying safe.

Here's the truth:
permission anxiety is not laziness.
It's what happens when expectations arrive without boundaries.`,
    problem: `The problem isn't AI at work.
The problem is vague instruction without a use map.

Ambiguity feels like danger —
so people either avoid AI completely
or use it in the riskiest places because those tasks feel urgent.

So let's separate three lanes:

One — Automate: repeatable formatting, sorting, first-pass cleanup where rules are clear.
Two — Assist: drafts, summaries, outlines you will verify and own.
Three — Avoid: passwords, confidential data, invented facts, final decisions, anything your role is accountable for without review.

AI can speed preparation.
AI cannot carry your accountability.

Your judgment stays.
That's not old-fashioned.
That's professional.`,
    skill: `Here's the skill.
Framework name: THE WORK MAP

Step 1 — Automate.
List duties that are repetitive and low-risk:
rename files to a pattern, clean a table layout, turn bullet notes into a first agenda.
If a mistake is easy to spot and easy to fix, it may belong here.

Step 2 — Assist.
List duties where AI can draft and you must decide:
emails, report outlines, lesson activity ideas, meeting summaries.
Rule: AI starts · you verify · you send.

Step 3 — Avoid.
List duties AI must not touch unsupervised:
passwords, payroll details, medical or learner private data, legal commitments, performance judgments, anything you'd be ashamed to say "the tool made up."

Then pick one Assist duty and run it today —
with a human check on facts before anyone else sees it.

That is the Work Map.
Automate. Assist. Avoid.
You stop guessing what's allowed —
and you practise boss-safe clarity.`,
    psychology: `Quick psychology — not as a diagnosis, as a tool.

Ambiguity activates threat systems.
When rules are unclear, your brain overestimates punishment.

A written map shrinks the threat.
You replace "What if I get in trouble?"
with "This duty is Assist — here's my check."

Ambiguity feels like danger.
Labels make action possible.`,
    action: `Your action today — under thirty minutes:

1. Write eight duties you actually did this week.
2. Label each Automate, Assist, or Avoid.
3. Run one Assist task with AI — then verify names, numbers, and tone before you share.

When you're done, you will not have a company policy.
You will have a personal Work Map you can defend calmly.`,
    community: `If this helped, subscribe to FutureHer —
and take this week's challenge: one Assist task a day, verified before send.

Join The Forward Collective if you want peers practising the same map.`,
    preview: `Next time: prompting basics that still work in five years —
so your asks stop producing fluff.`,
    pinned: "Which duty did you put in AVOID — and which ASSIST will you run today?",
    ytCommunity: `“Use AI more” without rules is how good people freeze.

New lesson:
What AI can and cannot do at your job

You'll leave with The Work Map:
Automate · Assist · Avoid

Question:
Which duty is firmly in your Avoid lane?`,
    waCommunity: `Boss-safe AI clarity is live.

What AI can and cannot do at your job.

Automate. Assist. Avoid.

Reply with one Avoid and one Assist.`,
    igCommunity: `Assist ≠ replace.
Map your duties.

Full lesson on YouTube — FutureHer.`,
    liCommunity: `Most workplace AI fear is not anti-technology.
It's missing boundaries.

This FutureHer lesson teaches The Work Map:
Automate · Assist · Avoid.

Judgment, accountability, and confidential data stay human.
Drafts can be assisted — then verified.`,
    ai01: "Editorial still, South African office or school admin desk, calm woman reviewing a simple three-column paper checklist, soft daylight, focused professional mood, ink stone brass lagoon palette, no readable confidential text, no neon, 16:9",
    ai02: "Flat editorial diagram three columns or nodes AUTOMATE ASSIST AVOID, Ink on Stone, Lagoon accents, brass micro horizon arc, teaching framework, no characters, no robots, SVG-ready, 16:9",
    ai04: "Notebook with three calm labelled columns (text illegible), pen, muted office desk, Stone field, shallow DOF, education brand still",
    br01: "Office desk / staffroom calm establishing shot",
    br03: "WhatsApp work group blur — 'use AI' vibe without readable names",
    br05: "Hands writing three columns in notebook",
    screenBeats: `1. List 8 duties
2. Label Automate / Assist / Avoid with colour
3. Open AI for one Assist duty only
4. Verify facts on screen
5. End on labelled map`,
    stockTerms: `- woman office desk natural light african
- notebook checklist pen
- calm laptop work
- school admin desk daylight`,
    worksheet: {
      steps: [
        ["Automate", "Repetitive low-risk tasks where mistakes are easy to spot and fix."],
        ["Assist", "AI drafts · you verify · you own the send."],
        ["Avoid", "Passwords, confidential data, invented facts, final judgments, unsupervised commitments."],
      ],
      labels: [
        ["AUTOMATE", "Repeatable · low-risk · easy to check"],
        ["ASSIST", "Draft help · human ownership"],
        ["AVOID", "Confidential · accountable · unverified"],
      ],
      tableHeaders: ["Duty", "Automate / Assist / Avoid", "Why", "Check before share"],
      tableRows: 8,
      runHeaders: ["Assist task today", "Prompt used", "What I verified"],
    },
    shorts: [
      short("S1", "S1_Assist_Not_Replace.txt", "Assist is not replace", "0:07–0:35", "Day 0 +2h", "Hook", "FH_EP005_S1_AssistNotReplace.mp4", "Assist ≠ replace.", "Assist ≠ replace.", "You're not slow", "If 'use AI' came with no rules, freezing is rational — not weakness.", "You need a map", "Map what AI may touch. Keep judgment human.", "Write one Avoid duty", "Write one duty AI must not touch unsupervised."),
      short("S2", "S2_Never_Invent_Facts.txt", "Never let AI invent facts at work", "2:07–2:52", "Day 1 evening", "Problem", "FH_EP005_S2_NoInventedFacts.mp4", "Never invent facts.", "Never invent facts.", "Fluency lies", "A confident sentence can still be wrong — and you still own it.", "Avoid lane", "Unverified numbers, names, and citations belong in Avoid until checked.", "Check one number", "Open your last AI draft. Verify one number before it travels."),
      short("S3", "S3_Work_Map_60s.txt", "The Work Map in 60 seconds", "4:07–5:12", "Day 0 +6h", "Skill", "FH_EP005_S3_WorkMap.mp4", "Map your duties.", "Map your duties.", "Three lanes", "Automate. Assist. Avoid.", "Judgment stays", "AI can prepare. You still carry accountability.", "Label three duties", "Label three duties from this week right now."),
      short("S4", "S4_Privacy_Line.txt", "The workplace AI privacy line", "4:50–5:35", "Day 2", "Safety", "FH_EP005_S4_PrivacyLine.mp4", "Don't paste secrets.", "Don't paste secrets.", "Privacy is professional", "Passwords, payroll, learner or client private data — Avoid.", "Boss-safe uses", "Drafts and summaries can be Assist — after you strip sensitive details.", "Remove one sensitive line", "Before prompting, delete names and IDs you shouldn't share."),
      short("S5", "S5_Judgment_Stays.txt", "Your judgment stays at work", "7:07–7:42", "Day 1", "Action", "FH_EP005_S5_JudgmentStays.mp4", "Judgment stays yours.", "Judgment stays yours.", "Run one Assist", "Pick one Assist duty. Draft with AI. Verify. Then share.", "Map then move", "Eight duties. One Assist run. Clarity over panic.", "Run your Assist task", "Finish one Assist task before end of day."),
    ],
  },

  {
    id: "EP006",
    title: "Prompting basics that still work in 5 years",
    alts: [
      "Why your ChatGPT answers are fluff — and how to fix them",
      "The forever prompt framework (RTCCE)",
      "Stop writing bad prompts — use this structure",
    ],
    slug: "ep006-rtcce-forever-prompts",
    topic: "T006",
    framework: "RTCCE",
    series: "FutureHer · AI",
    pillar: "AI",
    template: "A Educational",
    templateId: "FH_TMPL_A_Educational",
    projectName: "FH_EP006_RTCCE_Prompts",
    accent: "#2F6F6A",
    idea: "Good prompts are clear instructions — not magic words",
    skillLine: "RTCCE — Role · Task · Context · Constraints · Example",
    skillShort: "Role · Task · Context · Constraints · Example",
    actionLine: "Rewrite one failed prompt with RTCCE and save the winner.",
    cta: "Download the RTCCE card + join the AI challenge",
    ctaExtra: "Challenge — save three winning RTCCE prompts this week: [CHALLENGE LINK]",
    product: "Forever Prompts Practice Pack",
    productBlurb:
      "When you're ready to build a personal prompt library you can reuse for years, the Forever Prompts Practice Pack (entry practice workbook) gives you RTCCE drills, save templates, and workplace examples beyond this lesson.",
    download: "RTCCE Prompt Card",
    worksheetFile: "RTCCE_PROMPT_CARD_worksheet.html",
    thumbText: "Role · Task · Context",
    thumbSupport: "Constraints · Example",
    hookOverlay: "Stop asking for magic.",
    storyOverlays: ["help with work", "fluff answer", "I must be bad", "framework fixes it"],
    problemOverlays: ["Vague in → fluff out", "Role", "Task", "Context", "Constraints · Example"],
    skillOverlays: ["RTCCE", "01 Role", "02 Task", "03 Context", "04 Constraints", "05 Example"],
    psychOverlay: "Clarity reduces shame.",
    actionOverlay: "Rewrite one prompt with RTCCE.",
    actionSteps: [
      "Find one prompt that gave you fluff",
      "Rewrite it with Role · Task · Context · Constraints · Example",
      "Run it once and save the winner in Notes",
    ],
    previewOverlay: "Next — fact-check AI before you send",
    demo: "Bad prompt → RTCCE rewrite → meeting-notes-to-email demo in SA English",
    primaryKw: "how to write better AI prompts",
    secondaryKw: [
      "ChatGPT prompt framework",
      "RTCCE prompting",
      "prompt engineering for beginners",
      "better ChatGPT answers",
      "AI prompts for work",
      "FutureHer",
    ],
    tags: "how to write better AI prompts, ChatGPT prompt framework, RTCCE, prompt engineering beginners, better ChatGPT answers, FutureHer, AI for women, AI prompts for work South Africa",
    intent: "How-to → Durable skill",
    clickTest: "Beginner sees: fluff answers → forever framework → rewrite today",
    langLater: "NSO / ZU / TS",
    hashtagsLong: "#FutureHer #AIForWomen #SouthAfrica",
    hashtagsShort: "#FutureHer #AIForWomen",
    hashtagsLi: "#FutureHer #Prompting #AIatWork",
    chapters: `0:00 Stop asking for magic
0:30 The "help with work" fluff moment
2:00 Why vague prompts punish you
4:00 RTCCE (Role · Task · Context · Constraints · Example)
6:00 Clarity reduces shame
7:00 Rewrite one prompt today
7:40 Download + challenge
7:55 Next: verify before you send`,
    descOpen: "If ChatGPT gives you fluff, you don't need secret prompt hacks — you need clear instructions that will still work in five years.",
    toolsBlock: `Tools mentioned:
- ChatGPT / Gemini / Copilot — same RTCCE structure works across tools

Demo prompt shape:
Role: You are a concise workplace writing assistant.
Task: Turn these meeting notes into a short follow-up email.
Context: South African English, project Alpha, Thursday 10:00 next week.
Constraints: 120 words max, no buzzwords, warm professional tone.
Example: Start with the decision, then the ask.

Digital product: Forever Prompts Practice Pack`,
    hook: `If your prompts sound like
"help me with work"
and the answer comes back like a motivational poster —
you're not bad at AI.

You're asking for magic
instead of giving instructions.

Today: one idea, one skill, one action.
A prompt structure that still works when the logos change.`,
    story: `Picture this.
You finally open ChatGPT after work in Soweto, Polokwane, Durban — wherever home is —
and you type: "Help me with my report."

It gives you a generic essay.
You think: "Maybe I'm not smart enough for this."

A cousin sends a "secret prompt" with twenty roles and a pirate voice.
You try it. Still fluff. Still shame.

I've watched brilliant women conclude they lack a talent
when what they lacked was a clear ask.

Here's the truth:
models follow instructions.
Vague instructions produce vague help.`,
    problem: `The problem isn't that AI is useless.
The problem is we treat prompting like wishing.

Wishing sounds like: "make this better."
Instructing sounds like: who you are for this task, what to produce, what context matters, what limits to respect, and what good looks like.

So let's name the durable parts:

Role — who should the model act as for this job.
Task — the deliverable in one clean verb phrase.
Context — the facts it must know.
Constraints — length, tone, format, what to avoid.
Example — a tiny sample of the shape you want.

Tricks expire.
Clear instructions compound.`,
    skill: `Here's the skill.
Framework name: RTCCE

Role — Task — Context — Constraints — Example.

Watch a rewrite.

Bad: "Help with work email."

Better:
Role: You are a concise workplace writing assistant for South African professionals.
Task: Turn these notes into a follow-up email confirming next steps.
Context: Project Alpha meeting today; next check-in Thursday 10:00; recipient is my manager Thandi.
Constraints: Maximum 120 words; warm professional tone; no buzzwords; South African English.
Example: Open with the decision made, then one clear ask.

Run it.
Edit the facts.
Save the prompt that worked in a note titled Forever Prompts.

That is RTCCE.
You stop gambling on magic words —
and you start writing instructions your future self can reuse.`,
    psychology: `Quick psychology — not as a diagnosis, as a tool.

Shame grows in unclear tasks.
When the output is bad and the ask was vague,
people blame identity: "I'm bad at this."

Clarity relocates the problem to the instruction —
which you can improve.

Clarity reduces shame.
Shame shrinks when the next prompt is specific.`,
    action: `Your action today — under thirty minutes:

1. Find one prompt that gave you fluff.
2. Rewrite it with Role, Task, Context, Constraints, and Example.
3. Run it once, human-edit the result, and save the winning prompt in Notes.

When you're done, you will not need a new tool.
You will own a FutureHer skill that outlasts the hype cycle.`,
    community: `Download the free RTCCE Prompt Card,
join this week's AI challenge,
and subscribe so we can keep building calm fluency together.

The Forward Collective is practising one saved prompt a day.`,
    preview: `Next time: fact-check AI before it embarrasses you —
because fluency is not proof.`,
    pinned: "Paste your before/after RTCCE prompt (blur anything private).",
    ytCommunity: `Fluff answers usually mean vague asks.

New lesson:
Prompting basics that still work in 5 years

Framework: RTCCE
Role · Task · Context · Constraints · Example

Share a before/after (blur private details).`,
    waCommunity: `Forever prompting lesson is live.

Stop magic words. Use RTCCE.

Reply with one Constraint you'll always include.`,
    igCommunity: `Vague in → fluff out.
Use RTCCE.

Full lesson on YouTube — FutureHer.`,
    liCommunity: `Prompting isn't a personality trait.
It's instructional clarity.

FutureHer teaches RTCCE —
Role, Task, Context, Constraints, Example —

a structure that survives tool changes because it teaches thinking, not tricks.`,
    ai01: "Editorial still, South African woman at desk rewriting a prompt on phone or laptop, calm concentration, soft morning light, ink stone brass lagoon, no readable UI text, Horizon mood, 16:9",
    ai02: "Flat editorial diagram five small nodes in a calm pathway labelled spaces for ROLE TASK CONTEXT CONSTRAINTS EXAMPLE, Ink on Stone, Lagoon accents, brass micro arc, teaching framework, no characters, SVG-ready, 16:9",
    ai04: "Index card and pen on Stone desk with five short illegible lines, brass clip, shallow DOF, education still",
    br01: "Phone keyboard typing a short prompt",
    br03: "Split moment: vague prompt vs structured prompt on notes (blur)",
    br05: "Saving a note titled Forever Prompts",
    screenBeats: `1. Show bad prompt: Help with work email
2. Build RTCCE lines one by one
3. Run meeting-notes → email prompt
4. Human edit two lines
5. Save winning prompt in Notes`,
    stockTerms: `- woman laptop writing natural light
- hands phone typing
- notebook index cards desk
- calm study desk african woman`,
    worksheet: {
      steps: [
        ["Role + Task", "Who should AI act as, and what deliverable do you want in one verb phrase?"],
        ["Context + Constraints", "Facts it must know · length, tone, format, what to avoid."],
        ["Example + Save", "Show a tiny sample of the shape you want. Save winners in Forever Prompts."],
      ],
      labels: [
        ["ROLE / TASK", "Who + deliverable"],
        ["CONTEXT", "Facts that matter"],
        ["CONSTRAINTS / EXAMPLE", "Limits + shape of good"],
      ],
      tableHeaders: ["Element", "My line", "Keep for reuse?"],
      tableRows: 5,
      runHeaders: ["Before prompt", "RTCCE after", "Result quality 1–5"],
    },
    shorts: [
      short("S1", "S1_Bad_Vs_Good_Prompt.txt", "Bad prompt vs good prompt", "0:07–0:35", "Day 0 +2h", "Hook", "FH_EP006_S1_BadVsGood.mp4", "Stop asking for magic.", "Stop asking for magic.", "Vague in → fluff out", "Help with work is a wish. Instructions get results.", "RTCCE", "Role, Task, Context, Constraints, Example.", "Rewrite one line", "Rewrite your vaguest prompt with a clear Task verb."),
      short("S2", "S2_Constraints_Save_You.txt", "Constraints save your prompts", "2:07–2:52", "Day 1 evening", "Problem", "FH_EP006_S2_Constraints.mp4", "Add constraints.", "Add constraints.", "Limits help", "Word count, tone, no buzzwords — constraints reduce fluff.", "Be bossy kindly", "Tell the model what to avoid as clearly as what to do.", "Add one constraint now", "Add: 120 words max, no buzzwords."),
      short("S3", "S3_RTCCE_60s.txt", "RTCCE in 60 seconds", "4:07–5:12", "Day 0 +6h", "Skill", "FH_EP006_S3_RTCCE.mp4", "Forever prompts.", "Forever prompts.", "Five parts", "Role · Task · Context · Constraints · Example.", "Works in 5 years", "Logos change. Clear instructions stay useful.", "Build one RTCCE", "Write all five lines for one real work task."),
      short("S4", "S4_Examples_Teach_AI.txt", "Examples teach AI faster", "5:00–5:45", "Day 2", "Value", "FH_EP006_S4_Examples.mp4", "Show the shape.", "Show the shape you want.", "Tiny example", "One sample opening line teaches better than another adjective.", "Shorter can be stronger", "A tight example beats a long pep talk.", "Add a one-line example", "Add: Start with the decision, then the ask."),
      short("S5", "S5_Save_Best_Prompts.txt", "Save your best prompts", "7:07–7:42", "Day 1", "Action", "FH_EP006_S5_SavePrompts.mp4", "Save the winners.", "Save the winners.", "Build a library", "One saved prompt is an asset. Ten is a system.", "Notes folder", "Create Forever Prompts and paste today's winner.", "Save one now", "Save your best prompt before you close the app."),
    ],
  },

  {
    id: "EP007",
    title: "Fact-check AI before it embarrasses you",
    alts: [
      "Don't trust fluent AI answers — verify first",
      "3-step verify before you send AI work",
      "AI hallucinates — here's the calm fix",
    ],
    slug: "ep007-verify-before-you-send",
    topic: "T007",
    framework: "VERIFY",
    series: "FutureHer · AI",
    pillar: "AI",
    template: "A Educational",
    templateId: "FH_TMPL_A_Educational",
    projectName: "FH_EP007_VerifyBeforeSend",
    accent: "#2F6F6A",
    idea: "Fluency is not proof — verify before you share",
    skillLine: "VERIFY — Source · Number · Name",
    skillShort: "Source · Number · Name",
    actionLine: "Verify sources, numbers, and names before you send.",
    cta: "Subscribe to Forward Notes + join The Forward Collective",
    ctaExtra: "Forward Notes — calm weekly readiness: [NEWSLETTER LINK]",
    product: "Verify Before You Send checklist pack",
    productBlurb:
      "Students and professionals who cite AI often need more than a reminder — the Verify Before You Send checklist pack includes printable cards, team teaching lines, and a pre-presentation gate you can reuse.",
    download: "3-Step Verify card",
    worksheetFile: "THREE_STEP_VERIFY_worksheet.html",
    thumbText: "Don't trust fluency",
    thumbSupport: "Source · Number · Name",
    hookOverlay: "Don't trust fluency.",
    storyOverlays: ["almost sent", "invented statistic", "boss email", "caught in time"],
    problemOverlays: ["Fluency ≠ truth", "Source", "Number", "Name", "Confidence without gullibility"],
    skillOverlays: ["VERIFY", "01 Source", "02 Number", "03 Name", "Source · Number · Name"],
    psychOverlay: "Confidence can be borrowed.",
    actionOverlay: "Source. Number. Name — then send.",
    actionSteps: [
      "Take one AI answer you almost trusted",
      "Check Source · Number · Name",
      "Correct or cut anything unverified before sharing",
    ],
    previewOverlay: "Next — Money series: when salary disappears",
    demo: "AI paragraph with fake statistic → verify source/number/name → corrected send-ready note",
    primaryKw: "how to fact check AI",
    secondaryKw: [
      "AI hallucinations",
      "verify ChatGPT answers",
      "AI fact checking students",
      "don't trust AI fluency",
      "AI mistakes at work",
      "FutureHer",
    ],
    tags: "how to fact check AI, AI hallucinations, verify ChatGPT answers, AI fact checking, FutureHer, AI for students, AI at work South Africa, Verify Before You Send",
    intent: "How-to / Fear-relief → Trust skill",
    clickTest: "Student/pro sees: AI can lie smoothly → 3 checks → send safely today",
    langLater: "ZU / NSO",
    hashtagsLong: "#FutureHer #AIForWomen #SouthAfrica",
    hashtagsShort: "#FutureHer #AIForWomen",
    hashtagsLi: "#FutureHer #DigitalLiteracy #AIatWork",
    chapters: `0:00 Don't trust fluency
0:30 The statistic that almost went to the boss
2:00 Why confident answers still lie
4:00 VERIFY (Source · Number · Name)
6:00 Borrowed confidence is risky
7:00 Verify one answer today
7:40 Forward Notes
7:55 Next: Money — payday map`,
    descOpen: "AI can sound sure and still be wrong. Before you send, run Source · Number · Name.",
    toolsBlock: `Tools mentioned:
- Any AI assistant + your browser for verification
- Prefer primary sources, official pages, and your own documents

Digital product: Verify Before You Send checklist pack`,
    hook: `If AI ever answered you with perfect confidence
and you almost pasted it into a slide, email, or assignment —
this lesson is your seatbelt.

Don't trust fluency.

Today: one idea, one skill, one action.
Confidence without gullibility.`,
    story: `Picture this.
You're finishing a presentation for class or a Monday update for your manager.
AI gives you a clean line:
"Studies show 73% of teams improved productivity in two weeks."

It sounds research-ish.
It sounds sendable.
You almost drop it into the deck.

Then something nags —
and you search.
No study. Wrong number. Or a name that doesn't exist.

I've seen students and professionals catch this one minute before send —
and I've seen the version where they didn't.

Here's the truth:
embarrassment rarely comes from using AI.
It comes from outsourcing verification.`,
    problem: `The problem isn't that AI makes mistakes.
The problem is that mistakes arrive wearing fluent clothing.

Your brain treats smooth language as credible language.
That's normal.
It's also dangerous.

So separate three checks before anything leaves your hands:

Source — Where did this claim live outside the chat?
Number — Can I confirm the figure in a reliable place?
Name — Are people, companies, laws, and book titles real and correctly spelled?

If any check fails, cut or correct.
Fluency is not proof.`,
    skill: `Here's the skill.
Framework name: VERIFY

Step 1 — Source.
Highlight every claim that isn't from your own files.
Ask: can I open a source that isn't this chat?
If the model won't show a real link you can open — treat it as unverified.

Step 2 — Number.
Circle every percentage, date, price, and statistic.
Confirm against a primary page, your spreadsheet, or a trusted report.
No confirmation — no number.

Step 3 — Name.
Check people, organisations, laws, place names, and titles.
One wrong name can sink a good email.

Demo: take an AI paragraph, strike the fancy statistic, replace with a fact from your own notes, keep the useful structure.

That is VERIFY.
Source. Number. Name.
You stop fearing AI —
and you stop being fooled by it.`,
    psychology: `Quick psychology — not as a diagnosis, as a tool.

Confidence can be borrowed.
When text sounds assured, we borrow that assurance into our body.

Verification returns ownership to you.
You become the adult in the room again.

Borrowed confidence is risky.
Earned confidence is checked.`,
    action: `Your action today — under thirty minutes:

1. Take one AI answer you planned to use.
2. Run Source · Number · Name.
3. Correct or cut anything unverified, then save the clean version.

When you're done, you will not be cynical.
You will be FutureHer-ready: calm, sharp, and hard to embarrass.`,
    community: `Subscribe to Forward Notes for calm weekly readiness,
and join The Forward Collective if you want a place to practise verification together.`,
    preview: `Next time we shift into Money —
what to do when your salary disappears before month-end.
Dignity first. A map second.`,
    pinned: "What number or name did you catch AI inventing this week?",
    ytCommunity: `Fluent ≠ true.

New lesson:
Fact-check AI before it embarrasses you

VERIFY: Source · Number · Name

What fake-confident detail have you caught?`,
    waCommunity: `Seatbelt lesson is live.

Fact-check AI before it embarrasses you.

Source. Number. Name.

Reply with one thing you caught.`,
    igCommunity: `Don't trust fluency.
Verify before you send.

Full lesson on YouTube — FutureHer.`,
    liCommunity: `The professional risk with AI isn't using it.
It's publishing unverified fluency.

FutureHer teaches VERIFY:
Source · Number · Name.

Confidence without gullibility is a career skill.`,
    ai01: "Editorial still, South African student or young professional comparing laptop screen with phone browser calmly, soft library or home light, focused not panicked, ink stone brass lagoon, no readable secret data, 16:9",
    ai02: "Flat editorial diagram three nodes SOURCE NUMBER NAME, Ink on Stone, Lagoon accents, brass micro arc, teaching framework, no characters, SVG-ready, 16:9",
    ai04: "Printed paragraph with three neat circled words and a brass pen, Stone desk, shallow DOF, education still, text illegible",
    br01: "Highlighting a statistic on screen (blur numbers)",
    br03: "Browser search compare moment",
    br05: "Striking a line from a draft with pen or track changes vibe",
    screenBeats: `1. AI paragraph containing a confident statistic
2. Source check fails / is weak
3. Number removed or replaced from real notes
4. Name spelling check
5. Final clean paragraph ready to send`,
    stockTerms: `- woman researching laptop phone
- highlighting document desk
- calm student study african
- professional reviewing report`,
    worksheet: {
      steps: [
        ["Source", "Can this claim live outside the chat on a real page or your own file?"],
        ["Number", "Confirm every percentage, date, price, and statistic — or cut it."],
        ["Name", "Check people, organisations, laws, places, and titles before send."],
      ],
      labels: [
        ["SOURCE", "Outside the chat"],
        ["NUMBER", "Confirm or cut"],
        ["NAME", "Spelling + reality check"],
      ],
      tableHeaders: ["Claim", "Source OK?", "Number OK?", "Name OK?", "Action"],
      tableRows: 6,
      runHeaders: ["AI answer checked", "What I cut/fixed", "Final decision"],
    },
    shorts: [
      short("S1", "S1_AI_Hallucinates.txt", "AI hallucinates — calmly explained", "0:07–0:35", "Day 0 +2h", "Hook", "FH_EP007_S1_Hallucinates.mp4", "Don't trust fluency.", "Don't trust fluency.", "Sure can be wrong", "AI can sound certain and still invent. That's the trap.", "Seatbelt skill", "Verify before you send — every time it matters.", "Pause one paste", "Before you paste AI into a deck, pause for one check."),
      short("S2", "S2_Check_Numbers.txt", "Always check AI numbers", "2:07–2:52", "Day 1 evening", "Problem", "FH_EP007_S2_CheckNumbers.mp4", "Circle the numbers.", "Circle the numbers.", "Statistics lie fluently", "Percentages feel like research. Confirm or cut.", "No confirmation → no number", "Your reputation is more expensive than a fancy figure.", "Verify one figure", "Verify one figure from your last AI draft now."),
      short("S3", "S3_Verify_60s.txt", "VERIFY in 60 seconds", "4:07–5:12", "Day 0 +6h", "Skill", "FH_EP007_S3_Verify.mp4", "Source. Number. Name.", "Source. Number. Name.", "Three checks", "That's the whole seatbelt.", "Then send", "Correct or cut — then share with a calm conscience.", "Run VERIFY once", "Run all three checks on one paragraph today."),
      short("S4", "S4_Distrust_Fluency.txt", "When to distrust fluent AI", "6:07–6:55", "Day 2", "Psych", "FH_EP007_S4_DistrustFluency.mp4", "Smooth ≠ true.", "Smooth ≠ true.", "Borrowed confidence", "Your body borrows certainty from fluent sentences.", "Take it back", "Verification returns ownership to you.", "Ask where else", "Ask: where does this live outside the chat?"),
      short("S5", "S5_Teach_Your_Team.txt", "Teach your team to verify AI", "7:07–7:42", "Day 1", "Action", "FH_EP007_S5_TeachTeam.mp4", "Teach the seatbelt.", "Teach the seatbelt.", "Share the three checks", "Source · Number · Name — easy enough for a team WhatsApp.", "Culture > tools", "A verifying culture beats another AI subscription.", "Send the three words", "Text a colleague: Source, Number, Name — before we send."),
    ],
  },
];
