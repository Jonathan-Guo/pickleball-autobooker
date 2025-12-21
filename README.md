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
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Create your .env file and add in these two properties

```bash
LIFETIME_USERNAME={your email}
LIFETIME_PASSWORD={your password}
```

### 5. Run the bot

```bash
npm start
```




## Cron Job Setup 🕰️
To take advantage of signing up for the desired session immediately after signups open, you will need to add your Lifetime username and password as secrets to Github Action Settings. This can be done via 2 ways: 

1) Admin privilege adds secrets via console
2) User with write access to repo with the following commands: 

`gh secret set USER_<X>_USERNAME --body "<example_username>"`

`gh secret set USER_<X>_PASSWORD --body "<example_password>"`


Replace `X` with the appropriate number. If you are the second person adding their creds, the number is `2`. 


