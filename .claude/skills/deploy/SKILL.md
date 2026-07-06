---
name: deploy
description: Deploy the app - runs all tests, builds the production bundle, then pushes to staging. Use when the user asks to deploy, ship, or release the app.
---

# Deploy

Run the full deploy sequence, in order, stopping immediately if any step fails:

1. **Run all tests.**
   TODO: no test runner is configured in this repository yet (see CLAUDE.md).
   Once one exists, run it here (e.g. `npm test` / `npm run test`) and stop the
   deploy if it fails.

2. **Build the production bundle.**
   ```bash
   npm run build
   ```
   This outputs to `dist/`. Stop the deploy if the build fails.

3. **Push to staging.**
   TODO: no staging remote/deploy target is configured yet. Once one exists
   (e.g. a git remote, `rsync` target, or hosting CLI like `vercel`/`netlify`),
   run the actual push/deploy command here.

Do not skip a step to work around a failure — if tests or the build fail, stop
and report the failure instead of pushing a broken build to staging.
