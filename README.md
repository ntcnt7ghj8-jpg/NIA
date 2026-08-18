# NIA AI Chat Bot

This version turns the NIA demo into a real AI chatbot.

## Architecture

- `index.html` — NIA web interface
- `style.css` — appearance
- `app.js` — browser chat logic
- `api/chat.js` — secure server-side OpenAI call
- `package.json` — OpenAI SDK dependency

## Important security rule

Never put `OPENAI_API_KEY` in `index.html`, `app.js`, or any browser-side code.

The API key must be stored as a Vercel Environment Variable named:

`OPENAI_API_KEY`

Vercel functions can read the variable on the server, keeping the secret out of the public browser code.

## Deploy

1. Push these files to the GitHub `NIA` repository.
2. Import the GitHub repository into Vercel.
3. In Vercel Project Settings → Environment Variables, add:
   - Name: `OPENAI_API_KEY`
   - Value: your OpenAI API key
   - Environment: Production
4. Redeploy after adding the variable.
5. Open the Vercel deployment URL and test NIA.

The same GitHub repository can remain the source of the project.
