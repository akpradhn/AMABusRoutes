# Deploying to Vercel

This project is a static HTML, CSS and JavaScript site. Vercel can publish it directly; it does not require a framework, dependency installation or a build step.

## Vercel dashboard settings

When importing the current Git repository, use:

- **Root Directory:** `AMABusRoutes`
- **Framework Preset:** Other
- **Build Command:** leave empty
- **Output Directory:** leave empty
- **Install Command:** leave empty

The root-directory setting matters because this project currently sits inside a parent Git repository. If `AMABusRoutes` is moved into its own repository, leave Root Directory at the repository root instead.

`vercel.json` enables extension-free page URLs, removes trailing slashes, redirects `/index` to `/`, and applies baseline browser security headers. No environment variables are required.

## Optional CLI deployment

From this directory, sign in and create a preview deployment:

```bash
vercel
```

After checking the preview, publish it to production:

```bash
vercel --prod
```

## Production checks

After deployment, verify:

- `/`, `/about`, `/privacy` and `/terms` load successfully.
- `/ads.txt` and `/robots.txt` are served as plain text.
- the OpenStreetMap tiles and route data load on the planner.
- station search, map selection and route recommendations work on mobile and desktop.
- a custom domain is connected before the site is submitted to AdSense.

AdSense remains disabled until a real publisher ID is configured. Follow `ADSENSE_SETUP.md` before requesting review.
