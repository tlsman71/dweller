// Dweller Campaign data. Every rule, limit, date and figure here cites an official source.
// No document, no entry: when no official source has an item, the page says so and links the office.
// Checked dates are when the source was last read word for word.
window.CAMPAIGN_DATA = {
checked: "2026-11-21",
src: {
  fec_reg: {label:"FEC: House, Senate and President candidate registration", url:"https://www.fec.gov/help-candidates-and-committees/registering-candidate/house-senate-president-candidate-registration/"},
  fec_reg2:{label:"FEC: Registering a candidate", url:"https://www.fec.gov/help-candidates-and-committees/filing-reports/registering-candidate/"},
  fec_guide:{label:"FEC Campaign Guide for Congressional Candidates (Oct 2021)", url:"https://www.fec.gov/resources/cms-content/documents/policy-guidance/candgui.pdf"},
  fec_pg:  {label:"FEC: Post-general election reports", url:"https://www.fec.gov/help-candidates-and-committees/filing-reports/post-general-election-reports/"},
  fec_d26: {label:"FEC: 2026 pre- and post-general reports", url:"https://www.fec.gov/help-candidates-and-committees/dates-and-deadlines/2026-reporting-dates/pre-and-post-general-reports-2026/"},
  fec_wd:  {label:"FEC: Winding down the campaign (2024 workshop outline)", url:"https://www.fec.gov/resources/cms-content/documents/2024_winding_down_30G_webinar_outline.pdf"},
  fec_lim: {label:"FEC: Contribution limits", url:"https://www.fec.gov/help-candidates-and-committees/candidate-taking-receipts/contribution-limits/"},
  fec_lim26:{label:"FEC Record: Contribution limits for 2025–2026", url:"https://www.fec.gov/updates/contribution-limits-for-2025-2026/"},
  fec_q26: {label:"FEC: 2026 quarterly filers", url:"https://www.fec.gov/help-candidates-and-committees/dates-and-deadlines/2026-reporting-dates/2026-quarterly-filers/"},
  m1:      {label:"FPPC Manual 1 (state candidates), ch. 2", url:"https://www.fppc.ca.gov/siteassets/documents/tad/manuals/campaign/manual_1/Manual_1_Ch_02_Getting_Started.pdf"},
  m2:      {label:"FPPC Manual 2 (local candidates), ch. 2", url:"https://www.fppc.ca.gov/siteassets/documents/tad/manuals/campaign/manual_2/Manual_2_Ch_02_Getting_Started.pdf"},
  ck:      {label:"FPPC local candidate checklist (10-2022)", url:"https://www.fppc.ca.gov/siteassets/documents/tad/fact_sheets/campaigns_committees/local_candidate_committee_checklist_final.pdf"},
  ca_as:   {label:"CA Secretary of State: 2026 State Assembly qualifications (Rev. 08/2025)", url:"https://elections.cdn.sos.ca.gov/statewide-elections/2026-primary/qualifications-requirements/2026-state-assembly.pdf"},
  ca_lim:  {label:"FPPC: State contribution limits", url:"https://www.fppc.ca.gov/learn/campaign-rules/state-contribution-limits-and-voluntary-expenditure-ceilings/"},
  ca_sov_ad:{label:"CA SOS: Statement of Vote, Nov 5, 2024, State Assembly", url:"https://elections.cdn.sos.ca.gov/sov/2024-general/sov/42-state-assembly.pdf"},
  ca_sov:  {label:"CA SOS: Statement of Vote, Nov 5, 2024 (complete)", url:"https://elections.cdn.sos.ca.gov/sov/2024-general/sov/complete-sov.pdf"},
  ca_ror_ad:{label:"CA SOS: Report of Registration as of Oct 21, 2024, by Assembly district", url:"https://elections.cdn.sos.ca.gov/ror/15day-gen-2024/assembly.pdf"},
  census:  {label:"US Census Geocoder", url:"https://geocoding.geo.census.gov/geocoder/"},
},
// Election offices to point to when we have no checked entry. Only offices whose pages we have read are listed.
offices: {
  federal: {name:"Federal Election Commission", url:"https://www.fec.gov/help-candidates-and-committees/"},
  CA: {name:"California Secretary of State, Elections", url:"https://www.sos.ca.gov/elections", ethics:{name:"Fair Political Practices Commission", url:"https://www.fppc.ca.gov/"}},
},
// Node types for the campaign map (approved by Tom, Nov 21, 2026). Colors live in index.html as --t-* tokens.
types: [
  ["person","People","circle"],["committee","Committees","hex"],["organization","Organizations","square"],["donor","Donors","diamond"],
  ["vendor","Vendors","down"],["office","Offices","house"],["filing","Filings","page"],["deadline","Deadlines","up"]],
// Ladder steps by level (approved Nov 21, 2026). "live": the step's date is filled from the candidate's location.
ladders: {
 federal: {model:"House and Senate (FEC)", steps:[
  {id:"exploring", name:"Exploring", say:"Testing the waters: you can raise and spend money to decide whether to run without registering.", quote:["Money raised and spent to test the waters does not count toward this dollar threshold until the individual decides to run for federal office"], src:["fec_reg","fec_guide"]},
  {id:"candidate", name:"Became a candidate", say:"You became a candidate when you raised or spent more than $5,000.", quote:["becomes a candidate when he or she raises or spends more than $5,000 in contributions or expenditures"], src:["fec_reg"]},
  {id:"filed", name:"Filed to run", say:"Statement of Candidacy (Form 2) and principal campaign committee named, within 15 days of becoming a candidate.", due:{after:"candidate",days:15}, quote:["Candidates must register using a Statement of Candidacy (Form 2) within 15 days after becoming a candidate."], src:["fec_reg2","fec_reg"]},
  {id:"committee", name:"Committee registered", say:"Statement of Organization (Form 1), within 10 days after the committee is named.", due:{after:"filed",days:10}, quote:["the committee must file a new Statement of Organization (Form 1) within 10 days after being designated."], src:["fec_reg"]},
  {id:"ballot", name:"On the ballot", live:true, say:"Ballot access is set by your state's election office, not the FEC. Dates and requirements come from your location.", quote:["Congressional campaign committees have to comply with other laws outside the FEC's jurisdiction"], src:["fec_guide"]},
  {id:"reports", name:"Reports during the race", say:"Quarterly and pre-election reports on the FEC calendar.", quote:["Pre-General Reports include all activity from the close of books on the committee's last report through 20 days before the election."], src:["fec_d26"]},
  {id:"election", name:"Election day", live:true, say:"The general election date for your race, from the official calendar for your location."},
  {id:"postgeneral", name:"Post-election report", say:"Covers through 20 days after the general election and is due 30 days after it.", quote:["30 days after the general election"], src:["fec_pg","fec_d26"]},
  {id:"closed", name:"Closed out", say:"A termination report once the committee won't raise or spend again and its debts are settled.", quote:["selecting the \"Termination Report\" box on FEC Form 3/3P, Line 4 of the Summary Page"], src:["fec_wd"], note:"Source is a 2024 FEC workshop outline; to be replaced by a current FEC page."}]},
 state: {model:"California State Assembly", stateOnly:"CA", steps:[
  {id:"exploring", name:"Exploring", say:"Deciding whether to run. No money raised or spent yet, because Form 501 has to come first.", quote:["The Form 501 must be filed prior to a candidate raising or spending any money"], src:["m1"]},
  {id:"intention", name:"Intention filed", say:"Candidate Intention Statement (Form 501) with the Secretary of State, before asking for or taking any contribution.", quote:["must file Form 501 with the Secretary of State before soliciting or receiving any contributions"], src:["m1","ca_as"]},
  {id:"committee", name:"Committee formed", say:"Form 410 within 10 days of raising or spending $2,000 in a calendar year (personal funds count), $50 annual fee, and a separate account at a California bank for each election.", quote:["File the original Form 410 with the Secretary of State within 10 days of raising or spending $2,000 or more","pay a $50 annual committee fee to the Secretary of State"], src:["m1"]},
  {id:"filed", name:"Filed to run", say:"Declaration of Candidacy and nomination papers (40 to 60 signatures) with your county elections official, the filing fee or signatures in lieu, and the Statement of Economic Interests.", quote:["Gather between 40 and 60 signatures for filing the nomination papers.","Currently, the filing fee for Member of the Assembly is $1,346.94.","a minimum of 857 valid signatures for Member of the Assembly on petitions in lieu of filing fee."], src:["ca_as"]},
  {id:"ballot", name:"On the ballot", live:true, say:"Your name is certified for the ballot. The date comes from the Secretary of State's calendar for your election."},
  {id:"primary", name:"Primary", say:"The statewide primary.", quote:["June 2, 2026, Statewide Direct Primary Election"], src:["ca_as"]},
  {id:"election", name:"Election day", live:true, say:"The general election, from the Secretary of State's election calendar."},
  {id:"post", name:"Post-election reports and close-out", live:true, say:"Reports after the election, then terminate the committee. Dates from the FPPC filing schedule."}]},
 local: {model:"California city and county offices", stateOnly:"CA", steps:[
  {id:"exploring", name:"Exploring", say:"Deciding whether to run. No money raised or spent yet.", quote:["You must file Form 501 before soliciting, raising or spending any money in connection with your election."], src:["ck"]},
  {id:"intention", name:"Intention filed", say:"Form 501 with the filing officer who will receive your campaign statements (City Clerk or County Elections Office).", quote:["must file the Form 501 with the filing officer who will receive the candidate's original campaign statements"], src:["m2"]},
  {id:"committee", name:"Committee formed", say:"Form 410 within 10 days of reaching $2,000 (original and a copy to the Secretary of State, a copy to your local filing officer), a campaign bank account and a treasurer. Under $2,000: Form 470 instead.", quote:["you must file a Form 410 as a recipient committee within 10 days of qualifying.","The Act requires that every committee appoint a treasurer."], src:["ck","m2"]},
  {id:"filed", name:"Filed to run", live:true, say:"Declaration of candidacy with the city clerk or county elections office, plus Form 700. Signatures, fees and dates are set by each city or county.", quote:["most candidates must also file a Statement of Economic Interests (Form 700)."], src:["m2"]},
  {id:"ballot", name:"On the ballot", live:true, say:"Your name is certified for the ballot, from your county or city election calendar."},
  {id:"election", name:"Election day", live:true, say:"Election day. In the 90 days before it, 24-hour reports (Form 497) are due for big contributions.", quote:["Within 90 days before the election, including the date of the election","the Form 497 must be filed within 24 hours."], src:["ck"]},
  {id:"reports", name:"Post-election reports", say:"Form 460 campaign statements, including semi-annual ones, until the committee closes.", quote:["as well as other reports including semi-annual campaign statements until the committee terminates."], src:["ck"]},
  {id:"closed", name:"Closed out", say:"A final Form 460 showing a zero balance with your local filing officer, and Form 410 marked terminated with the Secretary of State.", quote:["you must file a Form 460 with your local filing officer reporting a zero balance"], src:["ck"]}]}
},
// Dated deadlines read word for word from the source. Past ones stay, marked (passed).
dates: [
  {level:"federal", date:"2026-04-15", what:"April Quarterly report due (closes 03/31/2026)", who:"FEC", src:"fec_q26"},
  {level:"federal", date:"2026-07-15", what:"July Quarterly report due (closes 06/30/2026)", who:"FEC", src:"fec_q26"},
  {level:"federal", date:"2026-10-15", what:"October Quarterly report due (closes 09/30/2026)", who:"FEC", src:"fec_q26"},
  {level:"federal", date:"2026-11-03", what:"General election (end of the 2025–2026 limits cycle)", who:"FEC", src:"fec_lim26", election:true},
  {level:"federal", date:"2027-01-31", what:"Year-End report due (closes 12/31/2026)", who:"FEC", src:"fec_q26"},
  {level:"federal", date:"2026-10-22", what:"Pre-General report due (covers 10/01–10/14/2026)", who:"FEC", src:"fec_d26"},
  {level:"federal", date:"2026-12-03", what:"Post-General report due (covers 10/15–11/23/2026)", who:"FEC", src:"fec_d26"},
  {level:"state", state:"CA", date:"2026-02-04", what:"Last day to circulate petitions in lieu of the filing fee (2026 Assembly primary)", who:"County elections official", src:"ca_as"},
  {level:"state", state:"CA", date:"2026-03-06", what:"Declaration of Candidacy and nomination papers due, 5:00 p.m. (2026 Assembly primary)", who:"County elections official", src:"ca_as"},
  {level:"state", state:"CA", date:"2026-06-02", what:"Statewide Direct Primary Election", who:"CA Secretary of State", src:"ca_as"},
  {level:"state", state:"CA", date:"2026-12-07", what:"Terms of office begin (Assembly)", who:"CA Secretary of State", src:"ca_as"}
],
// Contribution limits, filled from the official pages (see limits below). Empty means not yet read.
limits: {
  federal: {cycle:"2025–2026 cycle", note:"The FEC says these per-election limits apply from November 6, 2024 to November 3, 2026. The FEC indexes them for inflation in odd-numbered years; the 2027–2028 figures will be added when the FEC publishes them.", src:["fec_lim","fec_lim26"],
    rows:[["Individual to your committee","$3,500 per election"],["Multicandidate PAC to your committee","$5,000 per election"],["Party committee to your committee","$5,000 per election"]]},
  state: {state:"CA", cycle:"2025–2026, State Senate and Assembly", note:"Per election. Voluntary expenditure ceilings for Assembly: $784,000 primary, $1,373,000 general (elections held January 1, 2025 to December 31, 2026).", src:["ca_lim"],
    rows:[["A person to your committee","$5,900 per election"],["Small contributor committee to your committee","$11,800 per election"],["Political party to your committee","No limit"]]},
  local: {state:"CA", cycle:"Set by each city or county", note:"The FPPC checklist says: “Make sure you are aware of any local contribution limits before accepting contributions.” Ask your city clerk or county elections office.", src:["ck"], rows:[]}
},
// Last election snapshots, keyed by state:office:district. Every figure copied from the cited report.
results: {
  "CA:assembly:1": {
    office:"State Assembly, 1st District", election:"November 5, 2024, General Election",
    candidates:[{name:"Heather Hadwick", party:"REP", votes:125387, pct:"59.8%"},{name:"Tenessa Audette", party:"REP", votes:84167, pct:"40.2%"}],
    candidates_src:"ca_sov_ad",
    registration:{asof:"October 21, 2024", total:336401, parties:[["Democratic",97288,"28.92%"],["Republican",145991,"43.40%"],["American Independent",19432,"5.78%"],["Green",2112,"0.63%"],["Libertarian",5777,"1.72%"],["Peace and Freedom",1560,"0.46%"],["Unknown",426,"0.13%"],["Other",4792,"1.42%"],["No Party Preference",59023,"17.55%"]], src:"ca_ror_ad"},
    ballots:null, mail:null,
    missing:"The Secretary of State doesn't publish ballots cast, turnout or mail ballots by Assembly district in the Statement of Vote; it reports them by county and statewide.",
    statewide:{registered:22595659, voters:16140044, turnout:"71.43%", mail:13034378, mail_pct:"80.76%", src:"ca_sov"},
    counties:"Alpine, Amador, El Dorado, Lassen, Modoc, Nevada, Placer, Plumas, Shasta, Sierra and Siskiyou"
  }
}
};
