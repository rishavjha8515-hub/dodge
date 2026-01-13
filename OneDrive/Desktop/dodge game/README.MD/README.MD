# Dodge! — Quick Hackathon Game

Dodge! is a tiny, single-file HTML5 canvas game you can fork and hack on in minutes — perfect for hackathons and portfolio demos. Move the player left and right to avoid falling blocks. No build tools required.

Live demo
- If this repository is published with GitHub Pages, the site will be served from Settings → Pages after the included workflow finishes.

Quick features
- Single-page static game: index.html + style.css + game.js
- Touch and keyboard controls
- Simple scoring and restart
- GitHub Actions workflow included to auto-deploy to GitHub Pages

Contents
- index.html — game container and UI
- style.css — minimal styling
- game.js — game logic (player, obstacles, input, scoring)
- README.md — this file
- LICENSE — project license
- .nojekyll — prevents Jekyll processing on Pages
- .github/workflows/pages.yml — deploy workflow for GitHub Pages

Run locally (two quick ways)
- Quick (may be limited by some browsers): double-click `index.html`.
- Recommended (serves files over HTTP; best for mobile/touch):
  - Python 3: `python -m http.server 8000` then open `http://localhost:8000`
  - Node: `npx serve .` then open the shown URL

Create the repo and push (one-line using GitHub CLI)
1. Ensure `gh` is installed and authenticated (gh auth login).
2. From the project folder:
```bash
git init
git add .
git commit -m "Initial commit: Dodge game + Pages workflow"
git branch -M main
gh repo create rishavjha8515-hub/dodge --public --description "Dodge! — tiny HTML5 hackathon game" --source=. --remote=origin --push
```
This will create the repo, push `main`, and trigger the Pages workflow.

GitHub Pages (workflow)
- The workflow `.github/workflows/pages.yml` runs on pushes to `main`. It uploads the repository root as a Pages artifact and deploys it.
- After the Actions run completes successfully, the Pages URL will appear in Settings → Pages. If it doesn't show immediately, give GitHub a minute and check the Actions run output.

Ideas to iterate fast (use GitHub Copilot prompts)
- "Add a local high-scores table that stores the top 5 scores in localStorage and displays it on game over."
- "Add sound effects for collisions and a short intro jingle, using Web Audio API with a mute toggle button."
- "Add a 'slow time' power-up with 3 second duration and 15 second cooldown, plus a UI button."

Contributing
- Fork this repo, make changes on a branch, and open a pull request.
- For small suggestions, open an issue describing the idea.
- If you'd like me to scaffold features (leaderboard, power-ups, React conversion, Vite setup) tell me which and I'll generate the exact files and commands.

License
- This project is released under the MIT License. See the LICENSE file for details.

Author
- Maintained by rishavjha8515-hub

Acknowledgments
- Built as a hackathon-ready starter to get you from zero to demo fast. Use Copilot to iterate on polish and new features — prompts included above.

Enjoy hacking!