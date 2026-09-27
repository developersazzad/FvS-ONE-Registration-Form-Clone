# FvS ONE – Registration Form Clone

A pixel-focused rebuild of the **Flossbach von Storch ONE** customer registration / investor-profiling form, built from scratch with plain **HTML, CSS and JavaScript**.

The original lives at `flossbachvonstorch.de/de/registrierung/#/guest/one/profiler/milestones?workflow=personal` — a multi-step, hash-routed SPA that walks a user through their personal data and an 11-question investor profile before account creation and identity verification. This project reproduces that experience: the layout, the step-by-step wizard, the validation behaviour and the submission flow.

> **Demo:** _add your live demo / GitHub Pages / Vercel link here_

![screenshot](docs/screenshot.svg)

---

## ⚠️ Disclaimer

This is an **independent, non-commercial clone built for learning purposes only**.

- It is **not** affiliated with, endorsed by, or sponsored by **Flossbach von Storch SE**.
- The name *Flossbach von Storch* and the *ONE* brand are trademarks of their respective owner. All rights belong to Flossbach von Storch SE.
- **No real personal or financial data is collected, transmitted or stored.** The submission endpoint is a stub.
- Do **not** use this project to impersonate a financial service provider.

---

## ✨ Features

- **Multi-step wizard** — the registration is split into milestone steps (personal data → contact → investor profile → summary → submit), matching the original's `#/…/profiler/milestones` routing.
- **Hash-based client routing** — each step has its own URL fragment, so the browser back button and direct links work.
- **Per-step validation** — required-field checks, German-style input formats (date `DD.MM.YYYY`, IBAN, postal code, phone), inline error messages, and a step cannot be completed with invalid data.
- **Investor profile questionnaire** — the risk / financial-situation / investment-goals questions that map to one of the seven ONE strategies (`ONE 25` … `ONE 85`), with a result screen.
- **Progress indicator** — milestone stepper that highlights the current step and marks completed ones.
- **Summary & review step** — all entered data is shown for confirmation before submission.
- **Consent & legal checkboxes** — GDPR-style consent blocks that must be ticked explicitly.
- **Draft persistence** — the form state is kept in `localStorage`, so a refresh does not lose the user's input.
- **Responsive layout** — works down to mobile widths.
- **Accessible markup** — semantic `<form>`, `<fieldset>`/`<legend>`, labels tied to inputs, keyboard navigation, and focus handling on step change.

---

## 🧱 Tech Stack

| Layer      | Technology                                   |
| ---------- | -------------------------------------------- |
| Markup     | HTML5                                        |
| Styling    | CSS3 (custom properties, Grid, Flexbox)      |
| Logic      | Vanilla JavaScript (ES modules, no build step) |
| Backend    | Node.js + Express (stub API)                 |
| Persistence| `localStorage` (client) · in-memory JSON (server) |

No framework, no bundler, no dependencies on the client side — open `index.html` and it runs.

---

## 📁 Project Structure

> Adjust the tree below to match your actual folders.

```
.
├── index.html              # App shell / entry point
├── assets
│   ├── css
│   │   └── style.css       # Layout, components, form controls, responsive rules
│   └── img                 # Logo, icons, illustrations
├── js
│   ├── app.js              # Bootstrap: router init, state hydration
│   ├── router.js           # Hash-based step routing
│   ├── store.js            # Form state + localStorage persistence
│   ├── validation.js       # Field rules & error rendering
│   ├── api.js              # fetch() wrapper for the backend
│   └── steps               # One module per wizard step
│       ├── personal.js
│       ├── contact.js
│       ├── profile.js
│       ├── summary.js
│       └── done.js
├── server
│   ├── index.js            # Express server
│   └── routes
│       └── registration.js # POST /api/registration
├── docs
│   └── screenshot.svg      # Replace with your own screenshot
├── package.json
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Frontend only (no backend needed)

```bash
# Option A – just open the file
open index.html

# Option B – serve it (recommended, ES modules need http://)
npx serve .
# or
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

### Frontend + backend

```bash
# 1. Install server dependencies
npm install

# 2. Start the API (default port 3000)
npm run server

# 3. In a second terminal, serve the frontend
npm run dev
```

The client calls the API with a **relative** path (`/api/registration`); the dev server proxies it to the Express backend, so no CORS setup is required.

### Environment variables

Copy `.env.example` to `.env` if your server needs configuration:

| Variable    | Default | Description                    |
| ----------- | ------- | ------------------------------ |
| `PORT`      | `3000`  | Port the API listens on        |
| `NODE_ENV`  | `dev`   | `dev` logs payloads, `prod` doesn't |

---

## 🔌 API

| Method | Endpoint              | Description                                     |
| ------ | --------------------- | ----------------------------------------------- |
| `POST` | `/api/registration`   | Accepts the full form payload, validates it, returns `{ ok, referenceId }` |
| `GET`  | `/api/health`         | Liveness check                                  |

Example payload:

```json
{
  "personal": {
    "salutation": "Herr",
    "firstName": "Max",
    "lastName": "Mustermann",
    "dateOfBirth": "1985-04-12",
    "nationality": "DE"
  },
  "contact": {
    "email": "max.mustermann@example.com",
    "phone": "+49 170 1234567",
    "address": { "street": "Musterstraße 1", "zip": "50667", "city": "Köln" }
  },
  "profile": {
    "answers": { "q1": "b", "q2": "c" },
    "suggestedStrategy": "ONE 45",
    "investmentAmount": 150000
  },
  "consents": { "privacy": true, "marketing": false }
}
```

> The server does **not** write to a database — it validates and returns a fake reference ID. Swap in your own persistence layer if you need real storage.

---

## ✅ QA Checklist

Manual test cases worth running before each deploy:

- [ ] Every step is reachable via its URL fragment; back/forward navigation preserves state.
- [ ] Submitting an invalid step keeps the user on that step and focuses the first error.
- [ ] Refresh mid-wizard restores the entered values from `localStorage`.
- [ ] Layout holds at 360 px, 768 px and 1440 px.
- [ ] `POST /api/registration` returns `200` for a valid payload and `400` when a required field is missing.
- [ ] No console errors on a full end-to-end run of the wizard.

---

## 🗺️ Roadmap / Known limitations

- [ ] Real server-side validation schema (e.g. `zod` / `joi`)
- [ ] PDF generation of the submitted profile
- [ ] Identity-verification step (the original uses POSTIDENT) — currently mocked
- [ ] i18n — only the German (`de`) variant is implemented
- [ ] End-to-end tests (Playwright)

---

## 🤝 Contributing

Issues and pull requests are welcome. Keep the no-build-step constraint on the client side unless there is a strong reason to change it.

## 📄 License

Code: **MIT** — see [LICENSE](LICENSE).

Design, branding and trademarks of *Flossbach von Storch ONE* remain the property of **Flossbach von Storch SE** and are reproduced here solely to demonstrate the reimplementation.

## 🙋 Developer

| | |
| --- | --- |
| **Name** | Sazzad Hossain |
| **Role** | Full-Stack Web Developer — 7 years, 250+ projects |
| **Team** | wedevspro |
| **GitHub** | [`developersazzad`](https://github.com/developersazzad) |
| **Portfolio** | [ai.khatifoodbazar.com/wa/portfolio](https://ai.khatifoodbazar.com/wa/portfolio/) |
| **Email** | `[developer.sazzad.me@gmail.com]` _← add korar age ei line ta edit koro_ |
| **LinkedIn** | `[https://www.linkedin.com/in/developer-sazzad/]` _← add korte chaile_ |
| **Location** | Chattogram, Bangladesh 🇧🇩 |


Feedback, bug reports and collaboration ideas are welcome — open an [issue](../../issues) or reach out over email.

## 🙏 Credits

- Concept and visual reference: [Flossbach von Storch ONE](https://www.flossbachvonstorch.de/de/registrierung/)
- Built and maintained by **Sazzad Hossain** ([@developersazzad](https://github.com/developersazzad))
