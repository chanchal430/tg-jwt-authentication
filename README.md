# 🚀 Telegram Mini App: JWT Authentication + Protected Routes

Welcome to the second guide in the **Telegram Mini App** series!  
This project shows how to integrate **JWT authentication** and **protected routing** in a Telegram Mini App using **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

---

## 📌 Features

✅ Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**  
✅ Secure **JWT-based authentication** for Telegram users  
✅ **Middleware-protected routes**  
✅ Automatic session revalidation (no forced logout!)  
✅ Strong typing and structure for scalable apps

---

## 🔧 Prerequisites

Before you begin, make sure you have:

- [Node.js](https://nodejs.org/) v14 or higher
- A [Telegram account](https://telegram.org/)
- A [Telegram Bot](https://t.me/BotFather) + Bot Token
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account
- PostgreSQL database (e.g., from [Railway](https://railway.app))

---

## 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/chanchal430/tg-jwt-authentication.git
   cd tg-jwt-authentication
   ```

2. **🛠 Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create a .env.local file in the root of your project:

```
BOT_TOKEN=your_telegram_bot_token
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_postgres_connection_url
NEXT_PUBLIC_BASE_URL=https://your-vercel-app-url.vercel.app
```

## 📲 Deploying to Vercel

Since Telegram Mini Apps require a secure HTTPS endpoint, deploy the app before using it in Telegram.

### Steps:

1. Push your code to GitHub
2. Connect the repository to [Vercel](https://vercel.com/)
3. Set your environment variables in Vercel:
   - `BOT_TOKEN`
   - `JWT_SECRET`
   - `DATABASE_URL`
   - `NEXT_PUBLIC_BASE_URL`
4. Deploy your project

---

## 🤖 Setting Up Telegram Mini App

1. Open [@BotFather](https://t.me/BotFather) on Telegram
2. Run `/newapp` or edit an existing bot
3. When prompted, provide the following:

   - **Web App URL**:  
     `https://your-vercel-app-url.vercel.app`

   - **Short Name**
   - **Description**

✅ Once set , your Mini App will be available on Telegram mobile or web!

## 🗂 Project Structure

app/
├─ api/
│ ├─ auth/route.ts # Handles Telegram JWT authentication
│ ├─ session/route.ts # Returns session data from JWT cookie
│ ├─ save-user/route.ts # Saves authenticated user to PostgreSQL
├─ page.tsx # Main landing page
├─ profile/page.tsx # Example protected page
components/
├─ TelegramAuth.tsx # Telegram authentication logic (client-side)
middleware.ts # JWT session validation middleware
utils/
├─ session.ts # JWT encryption/decryption helpers
├─ telegramAuth.ts # Telegram data verification logic
