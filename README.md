# 🏓 Lifetime Pickleball Auto-Booker Bot

This project automatically logs into your Lifetime Fitness account, navigates to the Centreville Pickleball Open Play schedule, and reserves a specific session the moment registration opens.  

It uses **Node.js**, **Playwright**, and **dotenv** to automate the browser and authenticate securely.

---

## 🚀 Features

- Automatically logs into Lifetime Fitness  
- Navigates to the Pickleball Open Play schedule  
- Moves to the correct week  
- Finds the exact day + time slot (e.g., Tuesday 8:30 PM – 10:00 PM)  
- Instantly clicks “Sign Up” the moment registration opens  
- Can be scheduled to run via cron / Windows Task Scheduler / GitHub Actions  
- Zero manual clicking needed

---

## 📦 Tech Stack

- **Node.js**
- **Playwright** (browser automation)
- **dotenv** (environment variables)
- **npm scripts** (to simplify running the project)

---


## 🛠️ Setup Instructions

Follow these steps to get the project running locally:

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/pickleball-autobooker.git
cd pickleball-autobooker

After cloning the repo, run the following commands to fully set up your local environment:

1. Install dependencies
npm install

2. Install Playwright browsers
npx playwright install

3. Create your .env file and add in these two properties

LIFETIME_USERNAME={your email}
LIFETIME_PASSWORD={your password}

4. Run the bot
npm start



