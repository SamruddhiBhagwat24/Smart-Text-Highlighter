✨ Smart Text Highlighter ✨

**Smart highlights. Instant insights.**

Smart Text Highlighter is a minimal and modern web application that extracts the **most important ideas** from any paragraph using AI.  
It helps users quickly understand content without reading the entire text.

---

🔗 Live Links

- 🌐 **Frontend:**  
  👉 https://smart-text-highlighter.vercel.app  

- ⚙️ **Backend API:**  
  👉 https://smart-text-highlighter-api.vercel.app  

---

🚀 Features

- 🧠 AI-powered extraction of **essential insights**
- ✍️ Multiple highlight styles: **Marker, Box, Underline**
- 🌓 Light & Dark mode support
- 📊 Live word and character counter
- 📋 One-click copy of highlights
- ⚡ Fast UI with loader & debounce protection
- 🛡️ Graceful fallback when AI quota is exceeded

---

🧩 Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Express.js
- Gemini API

**Deployment**
- Vercel (Frontend & Backend)
- GitHub (Version Control)

---

📁 Project Structure

Smart-Text-Highlighter/
├── client/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── server/
│ ├── server.js
│ ├── package.json
│ └── package-lock.json
│
├── .gitignore
└── README.md

---

▶️ Run Locally

1️⃣ Clone the repository
```bash
git clone https://github.com/SamruddhiBhagwat24/Smart-Text-Highlighter.git
cd Smart-Text-Highlighter
2️⃣ Start Backend
cd server
npm install
Create a .env file inside server/:
GEMINI_API_KEY=your_gemini_api_key
Run server:
node server.js
3️⃣ Run Frontend
Open client/index.html in your browser
(or use VS Code Live Server)
☁️ Deployment (GitHub + Vercel)
🚀 Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main
🚀 Deploy Frontend on Vercel
Go to https://vercel.com
Import this GitHub repository
Set Root Directory → client
Click Deploy
🚀 Deploy Backend on Vercel
Create a new Vercel project
Import the same repository
Set Root Directory → server
Add Environment Variable:
GEMINI_API_KEY = your_api_key
Deploy
🔁 Update the backend API URL in client/script.js after deployment.
🧪 How to Use
Paste any paragraph into the input box
Click Highlight
View the most important insights
Change highlight style or copy results instantly
👩‍💻 Author
Samruddhi Bhagwat
🔗 GitHub: https://github.com/SamruddhiBhagwat24