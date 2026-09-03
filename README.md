# JARVIS — Personal AI Assistant

A futuristic, browser-based JARVIS-style assistant designed to run on GitHub Pages.

## Features
- Voice input using the browser Web Speech API
- Text-to-speech responses
- Futuristic responsive HUD interface
- Time and date commands
- Open YouTube, GitHub, Google and Facebook
- Google search commands
- Jokes, status and assistant information
- No build tools required

## Run
Open `index.html` in a modern browser.

## GitHub Pages
1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md`.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save and wait for GitHub Pages to publish.

## Voice notes
Voice recognition depends on browser support and permission to use the microphone. HTTPS is recommended; GitHub Pages provides HTTPS automatically.

## Important
This is a browser assistant, not a full operating-system agent. It cannot safely access arbitrary files, control your PC, or keep a secret AI API key inside GitHub Pages. For real AI conversations, add a secure backend/API proxy rather than placing a private API key in `script.js`.
