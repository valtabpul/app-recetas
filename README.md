# 🍰 Recipe Master

Welcome to Recipe Master! A web application designed for cooking lovers to discover, explore, and save their favorite recipes. All of this wrapped in a modern, clean interface with a carefully designed pastel pink style.

## ✨ What does this project contain?

This application has several key features:

- **Recipe Catalog:** A main page where you can explore different dishes, see their preparation time, difficulty, and more details.
- **Secure Authentication:** Registration and login system. We use JWT (JSON Web Tokens) saved in cookies to keep your session active securely.
- **Favorites System:** Did you like a recipe? You can mark it as a favorite. These are saved in your account and you can easily access them from the "My Favorites" section.
- **Welcome Emails:** Upon registering, you will receive an automatic welcome email with a beautiful design (configured using Nodemailer).
- **Responsive Design:** Adapts perfectly to both desktop computers and mobile devices.

## 🛠️ Technologies we use

- **Frontend:** Next.js (App Router), React, Tailwind CSS (to give it that pastel pink touch), and HeroUI components.
- **Backend:** Next.js Server Actions and API Routes.
- **Database:** MongoDB with Mongoose to manage users, recipes, and favorites.
- **Security and Utilities:** `bcryptjs` for encrypting passwords, `jsonwebtoken` for handling sessions, and `nodemailer` for sending emails.

## 🚀 How to run the project on your computer

Follow these steps to have the application running locally:

### Prerequisites

Make sure you have installed:
- **Node.js** (version 18 or higher recommended).
- A **MongoDB Atlas** account (or MongoDB running locally) for the database.
- An email account (e.g., Gmail) to configure sending emails.

### Installation steps

1. **Clone the repository** or download the files to your computer.
2. Open a terminal in the project folder and **download the dependencies** by running the following command:
   ```bash
   npm install
   ```

3. **Configure the environment variables:**
   Create a file named `.env` in the root of the project based on `.env.local` if it exists. It should contain the following:

   ```env
   # Database connection
   MONGODB_URI=your_mongodb_connection_url

   # Secret to sign tokens (you can put any secure text string)
   JWT_SECRET=your_super_secure_secret

   # Email configuration (for welcome messages)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password

   # URL of your app (useful for links in emails)
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
   *Note: If you use Gmail, remember to generate an "App Password" in Google's security settings.*

4. **Start the local server!**
   Once everything is configured, start the development environment with:
   ```bash
   npm run dev
   ```

5. **Open your browser** and go to `http://localhost:3000`. Done! You can now start exploring recipes.

## 💡 Additional notes
- **Test recipes:** If your database is empty, make sure you have some way to insert test recipes into the `recipes` collection in MongoDB so the catalog doesn't appear empty, or create them directly from the database.
