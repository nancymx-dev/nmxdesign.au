# Lock all case studies with one password

This setup uses a Cloudflare Worker as the gatekeeper. Visitors enter the password once, Cloudflare saves a secure browser cookie, and that cookie unlocks every protected case study plus its images, PDFs, and videos.

The code lives in:

- [cloudflare/case-study-lock/src/index.ts](/Users/nancy/.codex/worktrees/163d/nmxdesign.au/cloudflare/case-study-lock/src/index.ts)
- [cloudflare/case-study-lock/wrangler.toml](/Users/nancy/.codex/worktrees/163d/nmxdesign.au/cloudflare/case-study-lock/wrangler.toml)

## What this protects

The Worker is already configured to protect these URL groups:

- `/case-studies`
- `/case-study`
- `/portfolio`
- `/uplinked/`
- `/jiraplaybook/`
- `/perftooldesigns/`

That means:

- the case studies landing page is locked
- every case study route is locked
- every image, PDF, and video inside those asset folders is locked
- visitors only enter the password once

## Before you start

You need:

- a Cloudflare account
- your domain connected to Cloudflare
- your site already deployed somewhere
- the real origin hostname behind your site

The real origin hostname is important. It is usually not your public domain. Examples:

- Cloudflare Pages: `your-site.pages.dev`
- Netlify: `your-site.netlify.app`
- Vercel: `your-site.vercel.app`

Do not set `ORIGIN_HOST` to the same public hostname that the Worker is protecting, or the Worker will call itself in a loop.

## Step 1: Install Wrangler

Wrangler is Cloudflare's command line tool.

From your terminal:

```bash
npm install -g wrangler
```

If you do not want a global install:

```bash
npx wrangler --version
```

## Step 2: Log into Cloudflare

```bash
wrangler login
```

This opens your browser so you can connect Wrangler to your Cloudflare account.

## Step 3: Open the Worker folder

```bash
cd cloudflare/case-study-lock
```

## Step 4: Edit `wrangler.toml`

Open [cloudflare/case-study-lock/wrangler.toml](/Users/nancy/.codex/worktrees/163d/nmxdesign.au/cloudflare/case-study-lock/wrangler.toml) and change this line:

```toml
ORIGIN_HOST = "REPLACE_WITH_YOUR_REAL_ORIGIN_HOST"
```

Replace it with the real host where your site lives. Example:

```toml
ORIGIN_HOST = "nmxdesign-au.pages.dev"
```

Leave `PROTECTED_PREFIXES` as-is unless your URLs change.

## Step 5: Add your password as a Cloudflare secret

Run this command:

```bash
wrangler secret put CASE_STUDY_PASSWORD
```

Cloudflare will ask you to type the password you want people to use.

## Step 6: Add a cookie signing secret

Run:

```bash
wrangler secret put COOKIE_SECRET
```

When prompted, paste a long random string.

If you want to generate one in the terminal:

```bash
openssl rand -base64 32
```

Copy the output and paste it into the `wrangler secret put COOKIE_SECRET` prompt.

## Step 7: Test locally

Run:

```bash
wrangler dev
```

Then open the local URL Wrangler gives you.

What to check:

- `/` should still load publicly
- `/aboutme` should still load publicly
- `/case-studies` should show a password screen
- after entering the password once, `/case-studies/apex-wrapped` should open
- images and videos inside `/uplinked/`, `/jiraplaybook/`, and `/perftooldesigns/` should also work after login

## Step 8: Deploy the Worker

Run:

```bash
wrangler deploy
```

Cloudflare will publish the Worker.

## Step 9: Attach the Worker to your domain

In the Cloudflare dashboard:

1. Open `Workers & Pages`
2. Open your Worker
3. Open `Settings`
4. Open `Triggers`
5. Add a route for your production domain

Recommended route:

```text
nmxdesign.au/*
```

This sends all requests through the Worker. The Worker itself only password-protects the case study paths and lets everything else pass through untouched.

If you use `www`, add that too:

```text
www.nmxdesign.au/*
```

## Step 10: Test production carefully

Open an incognito window and test these in order:

1. Visit `/`
2. Visit `/case-studies`
3. Enter the password
4. Open each case study
5. Open a direct asset URL from one case study
6. Confirm the password is only needed once

## Step 11: Optional logout link

The Worker includes a logout route:

```text
/_case-study-logout
```

Example:

```text
https://nmxdesign.au/_case-study-logout?redirect=/
```

That clears the saved access cookie and sends the visitor back to your homepage.

## Why the React app was updated

The router now lazy-loads the case study pages from [src/main.tsx](/Users/nancy/.codex/worktrees/163d/nmxdesign.au/src/main.tsx). That keeps protected case study code out of the first public homepage bundle, which is a cleaner setup for password-locked content.

## Notes for your developer

- The Worker stores the password in Cloudflare secrets, not in your front-end.
- The Worker remembers access with a secure `HttpOnly` cookie.
- The cookie currently lasts 30 days.
- You can shorten or lengthen that by changing `SESSION_TTL_SECONDS` in `wrangler.toml`.
- If you add a new case study asset folder later, add its URL prefix to `PROTECTED_PREFIXES`.
