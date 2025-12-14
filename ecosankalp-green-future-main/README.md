# EcoSankalp — Green Future

An interactive community platform to report, manage and reduce urban waste — educational modules, a green marketplace, request tracking, and a simple admin dashboard for managing reports and orders.

Demo: [Live Preview](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) (replace with your published project URL)

Tags: React · TypeScript · Vite · Tailwind · shadcn-ui · Community · Sustainability

---

## Suggested repository names

- **eco-sankalp** — short, brandable and language-agnostic (recommended)
- **ecosankalp-green** — descriptive and SEO-friendly
- **green-champion** — friendly consumer-facing name
- **eco-guardian** — concise, action-oriented
- **greenpulse** — modern and memorable

Pick one and use it as your GitHub repo name.

---

## Features

- Report litter and waste with images and geolocation
- Admin dashboard for verifying reports, handling citizen queries, and managing orders
- Green learning modules and quizzes with progress tracking
- Small e-commerce prototype with cart and demo payment flow
- Orders, tracking numbers and in-app query management
- Local development admin sign-in (for demo/testing)

---

## Quick start (local)

1. Clone the repository and open it:

```bash
git clone <YOUR_GIT_URL>
cd ecosankalp-green-future-main/ecosankalp-green-future-main
```

2. Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Note: the project contains a nested frontend folder — be sure to `cd` into `ecosankalp-green-future-main` as shown above before running `npm install` / `npm run dev`.

---

## Admin (local development)

- Default admin email: `admin@ecosankalp.gov`
- Default admin password: `admin123`

Set a custom admin secret in an env file by copying `.env.example` to `.env` and editing `VITE_ADMIN_SECRET`.

Visit `/admin-auth` to sign in as admin.

---

## Development notes

- State is currently kept in-memory and persisted to `localStorage` for demo purposes.
- Replace the mock auth and in-memory state with a real backend for production readiness.

---

## Contributing

Contributions are welcome! Open an issue to discuss new features or improvements, or submit a pull request.

---

## License

This project is MIT licensed. Replace or update the license as appropriate for your project.

---

If you'd like, I can:

- Create the GitHub repository and push this code for you
- Add CI workflows and a deployment pipeline
- Add a README screenshot and badges (e.g., GitHub Actions, license, build)

Which of these would you like me to do next?
