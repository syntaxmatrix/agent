# 🤖 Agent (AI Agent Platform)

Agent is an **AI-powered agent platform** that executes natural language commands across multiple apps (Gmail, GitHub, Google Sheets, Notion, Slack, etc.).  
It’s inspired by **Bhindi AI** and built as a team project using a modular **monorepo** setup.

---

## 🚀 Features
- 🌐 **Frontend (Next.js)** → Chat-based UI.  
- ⚙️ **Backend (Node.js)** → Orchestrates agents and APIs.  
- 🤖 **Agents** → AI workers for tasks like email, GitHub, Slack.  
- 🔌 **Integrations** → Secure app connectors (OAuth 2.0).  
- 🗄️ **Database (MongoDB)** → Stores user data, tasks, and logs.  
- 🐳 **Dockerized** → Local development ready.  
- ✅ **CI/CD via GitHub Actions** → Auto testing + deployment.  

---

## 📂 Repository Structure

```
bhindi-clone/
├── frontend/          # Next.js UI
├── backend/           # API + agent orchestration
   ├── src/
      ├── agents/            # AI agents (Gmail, GitHub, etc.)
      ├── integrations/      # App connectors
├── docs/              # Documentation
<!-- ├── tests/             # Shared tests -->
└── .github/           # CI/CD workflows
```

---

## 🛠️ Tech Stack
- **Frontend:** Next.js + Tailwind  
- **Backend:** Node.js (Express)
- **Agents:** 
- **Database:** MongoDB  
- **Infra:** Docker + Docker Compose  
- **CI/CD:** GitHub Actions  

---

## ⚡ Getting Started

### 1. Clone Repo
```bash
git clone https://github.com/syntaxmatrix/agent.git
cd agent
```

### 2. Install Dependencies
We use **npm workspaces**:
```bash
npm install -
```

### 3. Run with Docker
```bash
docker-compose up --build
```

- Frontend → [http://localhost:3000](http://localhost:3000)  
- Backend → [http://localhost:8000](http://localhost:8000)  

---

## 🤝 Contributing

### Branching Strategy
- `main` → Production-ready  
- `dev` → Integration/testing  
- `feature/*` → New features  

### Workflow
1. Pick or open an issue  
2. Create feature branch:  
   ```bash
   git checkout -b feature/gmail-agent
   ```
3. Commit changes:  
   ```bash
   git commit -m "Add Gmail Agent"
   ```
4. Push branch:  
   ```bash
   git push origin feature/gmail-agent
   ```
5. Open a Pull Request 🚀  

---

## 🔒 Environment Variables
Each service needs its own `.env`. Example:

```env
# Common
PORT = 8000
OPENAI_API_KEY=sk-xxxx
MONGODB_URI = "mongodb+srv://<username>:<password>@<cluster-name>.<db_domain>/?retryWrites=true&w=majority&appName=<cluster-name>"


# Gmail Integration
GMAIL_CLIENT_ID=xxxx
GMAIL_CLIENT_SECRET=xxxx
GMAIL_REDIRECT_URI=http://localhost:8000/auth/callback
.....
.....
.....
...more..to..be..added.....

```

---

## 📘 Documentation
- Will be added soon
<!-- - [docs/architecture.md](./docs/architecture.md) → System Design  
- [docs/contributing.md](./docs/contributing.md) → Contribution Guide   -->

---

## 📌 Roadmap
- [ ] MVP: Frontend + Backend + Gmail Agent  
- [ ] Add Slack, GitHub, Sheets integrations  
- [ ] Background agent workflows  
- [ ] Deploy to production (Vercel + Render/AWS)  
- [ ] Launch Agent Marketplace  

---

## 📄 License
MIT License © 2025 [agentic-ai]