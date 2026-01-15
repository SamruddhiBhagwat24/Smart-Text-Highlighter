✨ Smart Text Highlighter ✨

Smart highlights. Instant insights.

Smart Text Highlighter is a minimal and modern web application that extracts the **most important ideas** from any paragraph using AI.  
It helps users quickly understand content without reading the entire text.

---

🔗 Live Links

🌐 Frontend  
👉 https://smart-text-highlighter.vercel.app

⚙️ Backend API  
👉 https://smart-text-highlighter-api.vercel.app

---

🚀 Features

🧠 AI-powered extraction of essential insights  
✍️ Multiple highlight styles: Marker, Box, Underline  
🌓 Light & Dark mode support  
📊 Live word and character counter  
📋 One-click copy of highlights  
⚡ Fast UI with loader & debounce protection  
🛡️ Graceful fallback when AI quota is exceeded  

---

🧩 Tech Stack

Frontend  
• HTML  
• CSS  
• JavaScript  

Backend  
• Node.js  
• Express.js  
• Gemini API  

Deployment  
• Vercel (Frontend & Backend)  
• GitHub  

---

📁 Project Structure

Smart-Text-Highlighter  
├── client  
│   ├── index.html  
│   ├── style.css  
│   └── script.js  
│  
├── server  
│   ├── server.js  
│   ├── package.json  
│   └── package-lock.json  
│  
├── .gitignore  
└── README.md  

---

▶️ Run Locally (Quick)

1. Clone the repository  
git clone https://github.com/SamruddhiBhagwat24/Smart-Text-Highlighter.git
cd Smart-Text-Highlighter

2. Start backend  
cd server
npm install

Create `.env` inside `server`  
GEMINI_API_KEY=your_gemini_api_key
Run server  
node server.js

3. Open frontend  
Open `client/index.html` in browser  
(or use VS Code Live Server)

---

☁️ Deployment (GitHub + Vercel)

Frontend  
• Import repo in Vercel  
• Root Directory → client  
• Deploy  

Backend  
• Create new Vercel project  
• Root Directory → server  
• Add environment variable  

GEMINI_API_KEY=your_api_key
• Deploy  

---

🧪 How to Use

• Paste any paragraph  
• Click Highlight  
• View essential insights  
• Change style or copy instantly  

---

👩‍💻 Author

Samruddhi Bhagwat  
🔗 GitHub: https://github.com/SamruddhiBhagwat24


