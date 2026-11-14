/*
  Dweller Health · "Medicare Advantage" living deck
  Content file. To update a slide: change its text here, update `updated` on that slide
  and DECK.updated below, and commit with a message saying what changed and why.
  Rules: every number keeps its source and date, and its kind (Fact, Estimate, Forecast, Quote).
  Based on: States, T. (2024). Medicare Advantage. Action NC. Edited and source-checked Nov 2026.
*/
window.DECK = {
  title: "Medicare Advantage in North Carolina",
  updated: "2026-11-13",
  checked: "2026-11-11",
  basedOn: "Based on Medicare Advantage by Tom States (Action NC, 2024), edited and source-checked November 2026",
  slides: [
    { id: "cover", layout: "cover", visual: "street-00-concept",
      kicker: "Dweller Health · North Carolina",
      headline: "Medicare Advantage: who pays, who gets paid, and what you can do",
      sub: "A nonpartisan guide to costs, coverage and choices, built from the public record.",
      updated: "2026-11-13" },

    { id: "how", layout: "split", visual: "street-01-street",
      kicker: "How it works",
      headline: "Two ways to get Medicare, on either side of one street",
      bullets: [
        { k: "Fact", t: "Original Medicare is run by the federal government (CMS)." },
        { k: "Fact", t: "Medicare Advantage plans are run by private insurers that Medicare pays each month." },
        { k: "Fact", t: "Congress created today’s Medicare Advantage program in the Medicare Modernization Act of 2003." }
      ],
      orig: "Medicare Advantage Plans Cost Taxpayers More Than Traditional Medicare",
      source: "Public Law 108-173 (2003); Medicare.gov", updated: "2026-11-13" },

    { id: "payments", layout: "bignum", visual: "street-02-money",
      kicker: "The money",
      headline: "Medicare pays more for people in Medicare Advantage than it would in Original Medicare",
      big: { v: "≈ $76 billion", label: "more for MA enrollees in 2026", k: "Estimate" },
      bullets: [
        { k: "Estimate", t: "MedPAC put the gap at $83 billion in its March 2024 report." },
        { k: "Fact", t: "CMS raised 2027 MA payments 2.48% on average, over $13 billion." }
      ],
      orig: "MA Plans ‘Corporations Are People Too’",
      response: true,
      source: "MedPAC, Reports to the Congress, Mar 15, 2024 and Mar 2026; CMS 2027 rate announcement", updated: "2026-11-13" },

    { id: "whopays", layout: "split", visual: "street-07-hourglass",
      kicker: "Who pays",
      headline: "The extra cost reaches everyone on Medicare, and the hospital trust fund",
      bullets: [
        { k: "Estimate", t: "Higher spending on MA enrollees added about $7 billion in 2019, raising Part B premiums for everyone." },
        { k: "Forecast", t: "The Part A hospital trust fund is projected to run short in 2033; about 89% of benefits payable after." }
      ],
      orig: "Medicare Advantage Plans Cost Taxpayers More Than Traditional Medicare",
      source: "KFF, Aug 17, 2021; Medicare Trustees Report, Jun 9, 2026", updated: "2026-11-13" },

    { id: "margins", layout: "bignum", visual: null,
      kicker: "Insurer finances",
      headline: "Medicare Advantage earns insurers more per person than their other lines of business",
      big: { v: "$1,982", label: "gross margin per MA enrollee, 2023", k: "Fact" },
      bullets: [
        { k: "Fact", t: "In 2021: $1,730 per MA enrollee, vs. $689–$768 in other insurance markets." },
        { k: "Fact", t: "UnitedHealth Group reported $22.4 billion in net earnings in 2023 (all businesses)." }
      ],
      orig: "MA Plans Gouge Taxpayers to Manage Profit Margins",
      response: true,
      source: "KFF, Feb 28, 2023 and Jul 2, 2024; UnitedHealth Group, Jan 12, 2024", updated: "2026-11-13" },

    { id: "coding", layout: "compare", visual: null,
      kicker: "Coding",
      headline: "How patients are coded changes what Medicare pays",
      compare: [
        { v: "$656 million", label: "a year from coding in Original Medicare hospital stays (Part A)", k: "Estimate" },
        { v: "$10–15 billion", label: "a year estimated from coding in Medicare Advantage", k: "Estimate" }
      ],
      orig: "MA Networks Game the System",
      response: true,
      source: "Joiner, Lin & Pantano, Health Economics Review, Jan 2, 2024 (2010–2019 data)", updated: "2026-11-13" },

    { id: "priorauth", layout: "stats", visual: "street-03-gate",
      kicker: "Access to care",
      headline: "Prior authorization: most requests pass, few denials are appealed",
      stats: [
        { v: "35 million", label: "requests in 2021", k: "Fact" },
        { v: "2 million", label: "denied", k: "Fact" },
        { v: "11%", label: "of denials appealed", k: "Fact" }
      ],
      orig: "MA Plans Short-Change Seniors: Narrow Networks Restrict Care To Cut Cost",
      response: true,
      source: "KFF, Feb 2, 2023", updated: "2026-11-13" },

    { id: "physicians", layout: "bignum", visual: null,
      kicker: "What doctors report",
      headline: "Doctors say prior authorization leads some patients to give up treatment",
      big: { v: "78%", label: "of physicians saw patients abandon a recommended treatment", k: "Fact" },
      bullets: [
        { k: "Fact", t: "Same survey: more office visits (68%), urgent or ER visits (42%), hospital stays (29%)." },
        { k: "Fact", t: "Applies to all insurers, not only Medicare Advantage. The 2022 survey found 80%." }
      ],
      orig: "Delay, Deny, Profit",
      response: true,
      source: "AMA Prior Authorization Physician Survey 2023 (released Jun 18, 2024); AMA 2022 survey via CEPR", updated: "2026-11-13" },

    { id: "leaving", layout: "table", visual: "street-04-way-back",
      kicker: "Leaving Medicare Advantage",
      headline: "People who leave MA cost Medicare more the next year",
      big: { v: "+$2,585", label: "average extra Medicare spending per person, the year after leaving (2022)", k: "Estimate" },
      table: { head: ["Condition", "Always in Original Medicare", "Left MA", "Difference"],
        rows: [["Atrial fibrillation","$21,251","$27,398","$6,147"],["Chronic kidney disease","$17,609","$23,471","$5,863"],["Diabetes","$13,638","$18,224","$4,586"],["Hypothyroidism","$13,082","$16,820","$3,738"],["Hypertension","$12,715","$16,381","$3,665"]],
        k: "Fact", note: "Medicare spending per person in the year after leaving MA, 2022" },
      orig: "MA Plans Cherry-Pick Enrollees: Disenrolling Sicker Seniors Is Called ‘Lemon Dropping’",
      quote: { t: "an incomplete and misleading picture", who: "Insurers (AHIP), via The Wall Street Journal" },
      source: "KFF, Dec 6, 2024", updated: "2026-11-13" },

    { id: "endoflife", layout: "bignum", visual: null,
      kicker: "The last year of life",
      headline: "Some people leave MA in their final year, and the cost moves to Medicare",
      big: { v: "300,075", label: "people in their final year of life left MA, 2016–2022", k: "Estimate" },
      bullets: [
        { k: "Estimate", t: "Their care averaged $218 a day, shifting from private insurers to the federal government." }
      ],
      orig: "MA Plans Do Not Prioritize Healthcare Outcomes",
      response: true,
      source: "Wall Street Journal analysis, via Association of Health Care Journalists, Dec 2024", updated: "2026-11-13" },

    { id: "exits", layout: "bignum", visual: "street-05-lights-out",
      kicker: "Plans ending",
      headline: "Millions have had to pick new coverage when their plan ended",
      big: { v: "2.9 million", label: "MA enrollees had to switch plans for 2026", k: "Fact" },
      bullets: [
        { k: "Fact", t: "Humana ended plans for about 560,000 members for 2025." },
        { k: "Estimate", t: "Reported plans: CVS/Aetna about 430,000; Centene nearly 40,000 in six states." },
        { k: "Fact", t: "Ended contracts had lower ratings: 3.1 vs. 3.6 stars (2011–2020)." }
      ],
      orig: "MA In For a Penny Out For a Profit",
      source: "JAMA, 2026; Humana CFO via Becker’s, Sep 4, 2024; W. Potter, Aug 8, 2024; Meyers, Trivedi et al., JAMA Health Forum, Oct 21, 2022", updated: "2026-11-13" },

    { id: "affected", layout: "bignum", visual: "street-01-street",
      kicker: "Who is affected",
      headline: "MA has widened some access, but not evenly",
      big: { v: "30%", label: "of the nearly 34 million MA enrollees are Black, Latino or Asian", k: "Fact" },
      bullets: [
        { k: "Quote", t: "MA “reduces racial and ethnic disparities” in some cost-related access measures, but not all (AJMC)." },
        { k: "Fact", t: "Fewer Black enrollees are in higher-rated plans, where fewer are offered in their counties." }
      ],
      orig: "MA Plan Maximum Risk No Reward",
      source: "Better Medicare Alliance, State of MA 2024 (industry-supported); AJMC, Jun 24, 2024; KFF, Aug 8, 2024", updated: "2026-11-13" },

    { id: "benefits", layout: "split", visual: null,
      kicker: "Benefits",
      headline: "Extra benefits can shrink when plans cut costs",
      big: { v: "$40", label: "per member per month: CMS cap on yearly cost increases, 2025", k: "Fact" },
      bullets: [
        { k: "Estimate", t: "Reported possible cuts: dental, gym, over-the-counter and flex cards." },
        { k: "Estimate", t: "Reported possible increases: specialist, hospital and ER copays; out-of-pocket limits." }
      ],
      orig: "MA Plan Sick and Elderly Cut Backs",
      response: true,
      source: "CMS, CY 2025 Part C standards; HealthCare Dive, Jun 6, 2024; W. Potter, Aug 8, 2024", updated: "2026-11-13" },

    { id: "providers", layout: "bignum", visual: "street-06-doctors-leave",
      kicker: "Doctors and hospitals",
      headline: "Some health systems plan to stop taking certain MA plans",
      big: { v: "16%", label: "of 135 health systems surveyed plan to drop one or more MA plans", k: "Estimate" },
      bullets: [
        { k: "Fact", t: "Reasons given: high denials, slow payment, longer stays, paperwork." }
      ],
      quote: { t: "It’s become a game of delay, deny and not pay.", who: "Chris Van Gorder, Scripps Health CEO (Becker’s, Oct 2023)" },
      orig: "MA Plan Providers Exit Networks",
      response: true,
      source: "HFMA & Eliciting Insights, CFO survey, 2024; Becker’s, Dec 26, 2024", updated: "2026-11-13" },

    { id: "dates", layout: "timeline", visual: null,
      kicker: "Key dates",
      headline: "When things happen",
      timeline: [
        { d: "2003", t: "Medicare Advantage created (Medicare Modernization Act)" },
        { d: "Mar 2026", t: "MedPAC: ≈ $76 billion more for MA enrollees" },
        { d: "Jun 9, 2026", t: "Trustees: Part A fund projected short in 2033" },
        { d: "Oct 15 – Dec 7", t: "Open Enrollment: switch plans or return to Original Medicare" },
        { d: "Dec 7, 2026", t: "CMS update due on Inspector General denial report" },
        { d: "Jan 1 – Mar 31", t: "MA Open Enrollment: one change if you’re in an MA plan" }
      ],
      source: "Public Law 108-173; MedPAC; Medicare Trustees; Medicare.gov; HHS OIG OEI-09-24-00330", updated: "2026-11-13" },

    { id: "act", layout: "action", visual: "street-08-your-move",
      kicker: "What you can do",
      headline: "Free, unbiased help in North Carolina",
      big: { v: "1-855-408-1212", label: "SHIIP, NC Department of Insurance · Mon–Fri 8am–5pm", k: "Fact" },
      bullets: [
        { k: "Fact", t: "Open Enrollment, Oct 15 – Dec 7: switch plans or go back to Original Medicare." },
        { k: "Fact", t: "Already in MA? One change Jan 1 – Mar 31." },
        { k: "Fact", t: "Medigap is guaranteed only in certain situations. Ask SHIIP before you leave MA." }
      ],
      source: "Medicare.gov, Understanding Medicare Advantage Plans; ncdoi.gov/shiip (checked Nov 9, 2026)", updated: "2026-11-13" },

    { id: "sources", layout: "sources", visual: null,
      kicker: "Sources",
      headline: "Sources, checked November 2026",
      list: [
        "MedPAC, Reports to the Congress, Mar 15, 2024 and Mar 2026",
        "CMS, 2027 Medicare Advantage rate announcement; CY 2025 Part C standards",
        "Medicare Trustees Report, Jun 9, 2026",
        "KFF: Aug 17, 2021; Feb 28, 2023; Feb 2, 2023; Jul 2, 2024; Aug 8, 2024; Dec 6, 2024",
        "AMA Prior Authorization Physician Surveys, 2022 and 2023 (released Jun 18, 2024)",
        "Joiner, Lin & Pantano, Health Economics Review, Jan 2, 2024",
        "Meyers, Trivedi et al., JAMA Health Forum, Oct 21, 2022; JAMA, 2026",
        "AJMC, Jun 24, 2024; CEPR, Mar 14 and Nov 13, 2024",
        "Better Medicare Alliance, State of MA 2024 (Sep 16, 2024; industry-supported)",
        "UnitedHealth Group, Jan 12, 2024; Humana CFO via Becker’s, Sep 4, 2024",
        "W. Potter, HEALTH CARE un-covered, Aug 8, 2024; HealthCare Dive, Jun 6, 2024",
        "HFMA & Eliciting Insights, 2024; Becker’s, Oct 2023 and Dec 26, 2024",
        "Wall Street Journal analysis, via AHCJ, Dec 2024",
        "Medicare.gov; NC SHIIP (ncdoi.gov/shiip); Public Law 108-173"
      ],
      updated: "2026-11-13" }
  ]
};
