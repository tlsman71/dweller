# Dweller Health · Story Recorder (prototype)

Started Nov 15, 2026 at Tom's request ("start building now"), ahead of the phase order. This is an organizing tool for the "What you can do" section: Medicare beneficiaries put their experience on the record and choose who should hear it.

- **View:** https://health.dwellerapp.org/story/.  It needs a real web page, not a claude.ai artifact, because the microphone is blocked inside artifacts.
- **One file:** `index.html`. There's no server and nothing is sent anywhere.

## Flow
1. **Who's telling it:** the person, or a helper (family member, SHIIP volunteer, partner org) who confirms the person's consent.
2. **Six guided questions,** each optional: about you (name, town, county), coverage and topic, what happened, what it cost, what you did next, what decision-makers should know. Each question has **Read the question aloud** (speech synthesis) and **Speak my answer** (a recording you can replay, plus the browser's speech-to-text where available, with a notice that Chrome sends the audio to Google for that step). Typing always works.
3. **Check your story:** the original words beside a tidied version. The tidy-up runs on the device and only changes wording: it removes fillers and stutters and fixes capital letters and punctuation. It never adds opinions or facts. A **medical-details check (R7)** flags words like diagnoses and medications and suggests leaving them out. The person ticks "these are my words" before going on.
4. **Where should it go** (dropdown, add as many as you like): U.S. Representative, U.S. Senators, an open federal comment period, NC State Senator, NC House Member, county commissioners, a local organization the person names, local newspaper, or keep it private.
5. **Ready to send** (R11/R12, Dweller prepares and the person sends): one card per place, in the right format (letter, email/web form, phone script, public comment, letter to the editor), with Copy, Print, an "Open in my email" link where an address was given, the official lookup link, and a status tracker (Not sent yet / I sent it / I got a reply, dated). Public comments carry a warning that they're published with the person's name.
6. **My saved stories:** kept in this browser only, with options to download everything as a file or delete it.

## Rules followed
Nonpartisan: every official is listed whatever their party, and no position is suggested. Every field is optional. Data stays on the device, can be exported and deleted, and is never sold. Pencil-line icons only (D7). Dweller dark panels, gold primary buttons, green and amber status pills, large type (21px and up).

## Not built yet
- The Dweller Health AI assistant for editing. The tidy-up is local rules for now. A real assistant needs a server with a key, kept in `health/.env` and never committed.
- Address → official lookup. It uses the official finder links for now.
- A call-in phone line for people without smartphones (FreePBX/VoIP).
- An open-comment-period tracker linked to the dockets, group "story session" kit, testimony prep, and an anonymized story-themes view (self-reported, not a sample).
- The lookup links still need a check in the browser pane before the pilot.
