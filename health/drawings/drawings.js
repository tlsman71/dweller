// Dweller Health · node illustrations for the centerpiece slide show.
// Only Tom approves (docs/node-illustrations-protocol.md in the claude.ai project).
// image.status "approved"   -> the slide appears (image + share card are built by health/tools/build_drawings.py)
// caption.status "approved" -> the caption appears: headline + Fact/Estimate/Forecast label + short source (link).
//   "fact" keeps the full sourced sentence for reviewers; "scene" is the image's alt text; otherwise "Caption under review"
// share_base: where shares and QR codes point; change it when Dweller Health gets its own domain, then rebuild.
window.DH_DRAWINGS = {
 "share_base": "https://tlsman71.github.io/dweller/health/mockup/",
 "updated": "2026-11-15",
 "slides": [
  {
   "id": "medpac",
   "label": "MedPAC",
   "scene": "Commissioners at a curved dais in a Washington hearing room review thick reports while a screen compares Original Medicare and Medicare Advantage payments. Older residents and staff watch.",
   "kind": "Estimate",
   "fact": "MedPAC projects Part B premiums will be about $11 billion higher in 2026 because Medicare pays more for Medicare Advantage enrollees (MedPAC, March 2026).",
   "source": {
    "label": "MedPAC, March 2026 Report to the Congress, ch. 12 (MA status report)",
    "url": "https://www.medpac.gov/wp-content/uploads/2026/03/Mar26_Ch12_MedPAC_Report_To_Congress_SEC.pdf"
   },
   "image": {
    "status": "approved",
    "approved_on": "2026-11-15",
    "review_id": "illus-node-medpac-v1"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-medpac-v2"
   },
   "headline": "Advantage pay adds $11 billion to Part B premiums",
   "source_short": "MedPAC, Mar 2026"
  },
  {
   "id": "hi",
   "label": "Part A trust fund",
   "scene": "An older woman looks up at an hourglass running low beside a vault marked 'Part A', with a 2033 calendar on the wall at night.",
   "kind": "Forecast",
   "fact": "The Part A trust fund can pay full benefits until mid-2033. After that, incoming money would cover about 89% of scheduled benefits (Medicare Trustees, June 2026).",
   "source": {
    "label": "Social Security and Medicare Trustees, 2026 summary (June 2026)",
    "url": "https://www.ssa.gov/oact/TRSUM/"
   },
   "image": {
    "status": "approved",
    "approved_on": "2026-11-15",
    "review_id": "illus-node-hi-v1"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-hi-v2"
   },
   "headline": "Part A pays in full until 2033. Then 89%.",
   "source_short": "Medicare Trustees, Jun 2026"
  },
  {
   "id": "oig",
   "label": "HHS Inspector General",
   "scene": "A federal auditor reviews insurer letters stamped 'Denied' for rehab and nursing-home care, with Dec 7 circled on the calendar and a skilled-nursing building across the street.",
   "kind": "Fact",
   "fact": "The HHS Inspector General found the three largest Medicare Advantage companies denied requests for long-term acute care and inpatient rehab at some of the highest rates (HHS OIG, June 2026). CMS's response is due Dec 7, 2026.",
   "source": {
    "label": "HHS OIG, OEI-09-24-00330 (June 2026)",
    "url": "https://oig.hhs.gov/reports/all/2026/the-three-largest-medicare-advantage-organizations-denied-requests-for-long-term-acute-care-and-inpatient-rehabilitation-at-some-of-the-highest-rates/"
   },
   "image": {
    "status": "approved",
    "approved_on": "2026-11-15",
    "review_id": "illus-node-oig-v1"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-oig-v2"
   },
   "headline": "Top 3 insurers: some of the highest rehab-care denial rates",
   "source_short": "HHS Inspector General, Jun 2026"
  },
  {
   "id": "tax",
   "label": "Taxpayers & payroll taxes",
   "scene": "A giant pay stub towers over a city sidewalk; its 'Medicare' line peels off and pours coins into a steel vault marked 'Part A' as three workers look up.",
   "kind": "Fact",
   "fact": "Part A gets most of its money from a 2.9% payroll tax, split equally between workers and employers (Medicare Trustees Report, 2026).",
   "source": {
    "label": "Center for Retirement Research, brief on the 2026 Trustees Report (July 2026)",
    "url": "https://crr.bc.edu/medicare-finances-a-perspective-on-the-2026-trustees-report/"
   },
   "image": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "node-tax-v2"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-tax-v2"
   },
   "headline": "Your paycheck funds Part A: 2.9%, split with your employer",
   "source_short": "Medicare Trustees, 2026"
  },
  {
   "id": "benes",
   "label": "People with Medicare",
   "scene": "Three older neighbors at a kitchen table at night (an East Asian woman, a white man, a Native American man) read letters saying their plan is changing, next to a Medicare premium notice.",
   "kind": "Fact",
   "fact": "About 2.9 million people, roughly 1 in 10 Medicare Advantage enrollees, had to change coverage for 2026 because their plan left the market (JAMA, 2026).",
   "source": {
    "label": "JAMA, March 2026 (Viewpoint citing Meiselbach et al., Feb 18, 2026)",
    "url": "https://jamanetwork.com/journals/jama/fullarticle/2845239"
   },
   "image": {
    "status": "approved",
    "approved_on": "2026-11-15",
    "review_id": "illus-node-benes-v1"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-benes-v2"
   },
   "headline": "1 in 10 Advantage members lost their plan for 2026",
   "source_short": "JAMA, 2026"
  },
  {
   "id": "r_jama",
   "label": "JAMA study",
   "scene": "An older man with a tablet plays hide-and-seek for 'new plan' cards around his living room; his old card on the table reads 'Ended 2026'.",
   "kind": "Fact",
   "fact": "About 2.9 million people, roughly 1 in 10 Medicare Advantage enrollees, had to change coverage for 2026 because their plan left the market (JAMA, 2026).",
   "source": {
    "label": "JAMA, March 2026 (Viewpoint citing Meiselbach et al., Feb 18, 2026)",
    "url": "https://jamanetwork.com/journals/jama/fullarticle/2845239"
   },
   "image": {
    "status": "approved",
    "version": 3,
    "approved_on": "2026-11-15",
    "review_id": "node-r_jama-v3"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "node-r_jama-v3"
   },
   "headline": "2.9 million had to find a new plan for 2026",
   "source_short": "JAMA, 2026"
  },
  {
   "id": "smi",
   "label": "Part B & D trust fund",
   "scene": "A gold vault marked 'Part B & D' stands in a marble hall between a doctor's office and a pharmacy counter, with residents of many backgrounds looking on.",
   "kind": "Fact",
   "fact": "Parts B and D (doctor visits and drugs) are paid from a separate trust fund, financed mostly by general tax revenue (73% of Part B, 81% of Part D) plus enrollee premiums (26% of Part B, 8% of Part D) (Medicare Trustees Report, 2026).",
   "source": {
    "label": "Center for Retirement Research brief on the 2026 Trustees Report (July 2026), Table 1",
    "url": "https://crr.bc.edu/wp-content/uploads/2026/07/IB_26-14.pdf"
   },
   "image": {
    "status": "approved",
    "approved_on": "2026-11-15",
    "review_id": "illus-node-smi-v1"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-smi-v2"
   },
   "headline": "Taxes pay 73% of Part B and 81% of Part D",
   "source_short": "Medicare Trustees, 2026"
  },
  {
   "id": "cms",
   "label": "CMS · Original Medicare",
   "scene": "CMS staff at a long counter send paper checks down two chutes: a larger one marked 'Medicare Advantage' and a smaller one marked 'Original Medicare'.",
   "kind": "Estimate",
   "fact": "Medicare will spend about 14% more, a projected $76 billion, on Medicare Advantage enrollees in 2026 than it would in Original Medicare (MedPAC, March 2026).",
   "source": {
    "label": "MedPAC, March 2026 Report to the Congress, ch. 12",
    "url": "https://www.medpac.gov/wp-content/uploads/2026/03/Mar26_Ch12_MedPAC_Report_To_Congress_SEC.pdf"
   },
   "image": {
    "status": "approved",
    "approved_on": "2026-11-15",
    "review_id": "illus-node-cms-v1"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-cms-v2"
   },
   "headline": "Advantage costs Medicare $76 billion more than Original would",
   "source_short": "MedPAC, Mar 2026"
  },
  {
   "id": "ma",
   "label": "Medicare Advantage plans",
   "scene": "At a community-center enrollment fair, two agents walk older residents through Medicare Advantage plan brochures under generic insurer banners.",
   "kind": "Fact",
   "fact": "About 34.9 million people, 55% of those with Parts A and B, were in Medicare Advantage plans in 2025 (MedPAC, March 2026).",
   "source": {
    "label": "MedPAC, March 2026, ch. 12 (primary)",
    "url": "https://www.medpac.gov/wp-content/uploads/2026/03/Mar26_Ch12_MedPAC_Report_To_Congress_SEC.pdf"
   },
   "image": {
    "status": "approved",
    "approved_on": "2026-11-15",
    "review_id": "illus-node-ma-v1"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-ma-v2"
   },
   "headline": "34.9 million in Advantage: 55% of those eligible",
   "source_short": "MedPAC, Mar 2026"
  },
  {
   "id": "unh",
   "label": "UnitedHealth Group",
   "scene": "A glass tower marked 'UnitedHealth Group' is topped by a stack of gold coins rising into the clouds, above the city skyline.",
   "kind": "Fact",
   "fact": "UnitedHealth Group reported $22.4 billion in net earnings for 2023 across all its businesses, not Medicare Advantage alone (UnitedHealth Group, Jan 12, 2024).",
   "source": {
    "label": "UnitedHealth Group 2023 results (SEC Form 8-K, Jan 12, 2024)",
    "url": "https://www.sec.gov/Archives/edgar/data/731766/000073176624000023/a2023q4exhibit991.htm"
   },
   "image": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "node-unh-v2"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "node-unh-v2"
   },
   "headline": "UnitedHealth: $22.4 billion in 2023 earnings",
   "source_short": "UnitedHealth Group, Jan 2024"
  },
  {
   "id": "hum",
   "label": "Humana",
   "scene": "On a suburban street at dusk, a mail carrier delivers letters and neighbors read that their Humana plan is ending.",
   "kind": "Fact",
   "fact": "Humana said about 560,000 members, 10% of its individual Medicare Advantage members, would need a new plan for 2025. Most had another Humana plan available (Humana CFO, Sept 4, 2024).",
   "source": {
    "label": "Fierce Healthcare, Sept 2024 (Humana CFO at Wells Fargo conference)",
    "url": "https://www.fiercehealthcare.com/payers/humana-exiting-medicare-advantage-13-markets"
   },
   "image": {
    "status": "approved",
    "approved_on": "2026-11-15",
    "review_id": "illus-node-hum-v1"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-hum-v2"
   },
   "headline": "Humana: 560,000 members had to find a new plan",
   "source_short": "Humana, Sep 2024"
  },
  {
   "id": "cvs",
   "label": "CVS Health / Aetna",
   "scene": "In an Aetna conference room, staff of several backgrounds point to plan areas on a wall map during a planning meeting.",
   "kind": "Estimate",
   "fact": "CVS Health said in February 2025 it expected Aetna's Medicare Advantage membership to fall by a \"high single-digit percentage\" in 2025, after earlier saying it could lose up to 10% (CVS executives, Feb 12, 2025).",
   "source": {
    "label": "Becker's Payer, Feb 2025 (CVS Q4 2024 investor call)",
    "url": "https://www.beckerspayer.com/payer/cvs-working-tirelessly-to-improve-aetna-7-notes/"
   },
   "image": {
    "status": "approved",
    "approved_on": "2026-11-15",
    "review_id": "illus-node-cvs-v1"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-cvs-v2"
   },
   "headline": "Aetna: Advantage members to drop by high single digits",
   "source_short": "CVS Health, Feb 2025"
  },
  {
   "id": "cen",
   "label": "Centene / WellCare",
   "scene": "In a WellCare office, a Native American manager and an East Asian analyst study a whiteboard map with six states shaded.",
   "kind": "Estimate",
   "fact": "Centene's WellCare left Medicare Advantage in six states for 2025 (Alabama, Massachusetts, New Hampshire, New Mexico, Rhode Island and Vermont), affecting about 37,300 members, about 3% of its MA members (Stephens research note, via Fierce Healthcare, Aug 2024).",
   "source": {
    "label": "Fierce Healthcare, Aug 2024",
    "url": "https://www.fiercehealthcare.com/payers/centene-subsidiary-wellcare-retreats-six-states-2025"
   },
   "image": {
    "status": "approved",
    "approved_on": "2026-11-15",
    "review_id": "illus-node-cen-v1"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-cen-v2"
   },
   "headline": "WellCare left 6 states: about 37,300 members",
   "source_short": "Stephens, Aug 2024"
  },
  {
   "id": "prov",
   "label": "Hospitals & doctors' groups",
   "scene": "At a rural hospital's front desk, two older patients hold their Medicare Advantage cards under a sign reading 'This plan no longer accepted' as a clerk explains.",
   "kind": "Estimate",
   "fact": "In a 2024 survey of 135 health-system finance chiefs, 16% said they planned to stop accepting one or more Medicare Advantage plans within two years (HFMA and Eliciting Insights, 2024).",
   "source": {
    "label": "Becker's Hospital Review on the HFMA / Eliciting Insights CFO survey (2024)",
    "url": "https://www.beckershospitalreview.com/finance/nearly-half-of-health-systems-are-considering-dropping-ma-plans/"
   },
   "image": {
    "status": "approved",
    "version": 3,
    "approved_on": "2026-11-15",
    "review_id": "node-prov-v3"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "node-prov-v3"
   },
   "headline": "16% of health systems plan to drop an Advantage plan",
   "source_short": "HFMA survey, 2024"
  },
  {
   "id": "left",
   "label": "People who left MA",
   "scene": "A counselor at a free Medicare help desk assists two older residents with forms to return to Original Medicare, with a Medicare card on the desk.",
   "kind": "Estimate",
   "fact": "In 2022, Medicare spent 27% more, about $2,585 per person, on people who had just left Medicare Advantage than on similar people who stayed in Original Medicare (KFF, Dec 6, 2024).",
   "source": {
    "label": "KFF issue brief, Dec 6, 2024",
    "url": "https://www.kff.org/medicare/medicare-spending-was-27-percent-more-for-people-who-disenrolled-from-medicare-advantage-than-for-similar-people-in-traditional-medicare/"
   },
   "image": {
    "status": "approved",
    "approved_on": "2026-11-15",
    "review_id": "illus-node-left-v1"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-left-v2"
   },
   "headline": "Left Advantage? Medicare then spent 27% more",
   "source_short": "KFF, Dec 2024"
  },
  {
   "id": "inv",
   "label": "Shareholders",
   "scene": "A golden pipe pours coins into executives' briefcases while older Medicare members watch from behind a velvet rope.",
   "kind": "Fact",
   "fact": "In 2023, UnitedHealth Group returned $14.8 billion to shareholders through dividends and share buybacks, across all its businesses (UnitedHealth Group, Jan 12, 2024).",
   "source": {
    "label": "UnitedHealth Group 2023 results (SEC Form 8-K)",
    "url": "https://www.sec.gov/Archives/edgar/data/731766/000073176624000023/a2023q4exhibit991.htm"
   },
   "image": {
    "status": "approved",
    "version": 3,
    "approved_on": "2026-11-15",
    "review_id": "node-inv-v3"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "node-inv-v3"
   },
   "headline": "$14.8 billion back to UnitedHealth shareholders",
   "source_short": "UnitedHealth Group, Jan 2024"
  },
  {
   "id": "congress",
   "label": "Congress",
   "scene": "Older Americans crowd the House gallery, watching a vote board that reads 220 to 215.",
   "kind": "Fact",
   "fact": "Congress passed the Medicare Modernization Act in November 2003, by 220 to 215 in the House and 54 to 44 in the Senate (Congressional Research Service).",
   "source": {
    "label": "Congressional Research Service, RL31966 (Dec 2004)",
    "url": "https://www.congress.gov/crs_external_products/RL/PDF/RL31966/RL31966.3.pdf"
   },
   "image": {
    "status": "approved",
    "version": 3,
    "approved_on": "2026-11-15",
    "review_id": "node-congress-v3"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "node-congress-v3"
   },
   "headline": "2003: passed the House by 5 votes, 220 to 215",
   "source_short": "Congressional Research Service"
  },
  {
   "id": "trustees",
   "label": "Medicare Trustees",
   "scene": "Young workers pour coins into a Part A tank marked $255.7 billion (2025) while an older woman draws from its tap; dials read 2033 and 89%.",
   "kind": "Forecast",
   "fact": "Part A's trust fund held $255.7 billion at the end of 2025. Payroll taxes paid 87% of its income. The Trustees project it runs short in the second quarter of 2033, one quarter earlier than last year, when it could pay about 89% of benefits (Medicare Trustees Report, June 9, 2026).",
   "source": {
    "label": "Social Security and Medicare Trustees, 2026 summary",
    "url": "https://www.ssa.gov/oact/TRSUM/"
   },
   "image": {
    "status": "approved",
    "version": 3,
    "approved_on": "2026-11-15",
    "review_id": "node-trustees-v3"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-trustees-v2"
   },
   "headline": "Part A's shortfall date moved up: mid-2033",
   "source_short": "Medicare Trustees, Jun 2026"
  },
  {
   "id": "mma",
   "label": "Medicare Modernization Act 2003",
   "scene": "A bound copy of the Medicare Modernization Act rests on a signing desk with pens, a flag and the Capitol dome beyond, with staff in the background.",
   "kind": "Fact",
   "fact": "The Medicare Modernization Act, signed Dec 8, 2003, replaced Medicare+Choice with Medicare Advantage and created the Part D drug benefit (Public Law 108-173).",
   "source": {
    "label": "Congressional Research Service, RL31966",
    "url": "https://www.everycrsreport.com/files/20040421_RL31966_ecece104c7fb91aaae4cc85b80e6de8320d8a521.html"
   },
   "image": {
    "status": "approved",
    "approved_on": "2026-11-15",
    "review_id": "illus-node-mma-v1"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "caption-node-mma-v2"
   },
   "headline": "2003: the law that created Medicare Advantage",
   "source_short": "Public Law 108-173"
  },
  {
   "id": "r_kff",
   "label": "KFF analyses",
   "scene": "Two coin stacks on a desk: 'Medicare Advantage' stands more than twice as tall as 'other markets' while researchers measure it.",
   "kind": "Fact",
   "fact": "In 2021, Medicare Advantage insurers averaged $1,730 in gross margin per enrollee, at least double the $689 to $768 in other markets (KFF, Feb 28, 2023).",
   "source": {
    "label": "KFF news release, Feb 28, 2023",
    "url": "https://www.kff.org/medicare/press-release/medicare-advantage-insurers-report-much-higher-gross-margins-per-enrollee-than-insurers-in-other-markets/"
   },
   "image": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "node-r_kff-v2"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "node-r_kff-v2"
   },
   "headline": "Advantage margins: $1,730 a member, double other markets",
   "source_short": "KFF, Feb 2023"
  },
  {
   "id": "r_her",
   "label": "Health Economics Review study",
   "scene": "A medical coder changes a code field on one screen and the payment amount jumps on the other, as older patients look on.",
   "kind": "Estimate",
   "fact": "A 2024 Health Economics Review paper reports estimates that 'upcoding' in Medicare Advantage costs $10 billion to $15 billion a year (Joiner, Lin and Pantano, Jan 2, 2024).",
   "source": {
    "label": "Joiner, Lin & Pantano, Health Economics Review 14:1 (2024)",
    "url": "https://doi.org/10.1186/s13561-023-00465-4"
   },
   "image": {
    "status": "waiting",
    "version": 3,
    "review_id": "node-r_her-v3"
   },
   "caption": {
    "status": "waiting",
    "version": 2
   },
   "headline": "Coding estimates: $10–15 billion a year in Advantage",
   "source_short": "Health Economics Review, 2024"
  },
  {
   "id": "r_hfma",
   "label": "HFMA survey",
   "scene": "Beside a stack of denial letters, a hospital administrator cuts the rope to a Medicare Advantage plan sign while older plan members hold their cards.",
   "kind": "Estimate",
   "fact": "19% of health systems surveyed had already dropped at least one Medicare Advantage plan, and 16% planned to within two years (HFMA and Eliciting Insights, March 2024).",
   "source": {
    "label": "HFMA press release, March 6, 2024",
    "url": "https://hfma.org/?p=79659"
   },
   "image": {
    "status": "approved",
    "version": 3,
    "approved_on": "2026-11-15",
    "review_id": "node-r_hfma-v3"
   },
   "caption": {
    "status": "approved",
    "version": 2,
    "approved_on": "2026-11-15",
    "review_id": "node-r_hfma-v3"
   },
   "headline": "19% of health systems already dropped an Advantage plan",
   "source_short": "HFMA survey, Mar 2024"
  }
 ]
};
