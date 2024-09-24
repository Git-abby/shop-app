
# Shop App

![React](https://img.shields.io/badge/React-v18.2.0-blue) 
![Firebase](https://img.shields.io/badge/Firebase-Authentication-orange) 
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.0-blue) 
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-brightgreen)
![Firebase Hosting](https://img.shields.io/badge/Firebase%20Hosting-Live-brightgreen)

This project is a shop application where users can sign in, browse products, view product details, and logout. It is built using **React** for the frontend, **Firebase** for authentication. The app is styled using **Tailwind CSS** and uses **GitHub Actions** for CI/CD with deployment on **Firebase Hosting**.

## Features

- ✅ User authentication with Firebase (sign-up, login, Google login, logout).
- ✅ Products page with list of items fetched from Fake Store API.
- ✅ View individual product details.
- ✅ Secure routing: unauthenticated users cannot access the products page.
- ✅ Error page for invalid URLs.
- ✅ Continuous deployment via GitHub Actions.
- ✅ Responsive design with Tailwind CSS.
- ✅ Firebase Hosting for production deployment.

## User Flow

1. **Login Page**: Users can sign in using email/password or Google authentication. If the user doesn't have an account, they can navigate to the sign-up page.
    - **Validation**: Username and password are required, invalid email formats and Firebase authentication errors are handled.
2. **Sign-Up Page**: Users can create a new account with email and password.
3. **Products Page**: After successful login, users are redirected to the products page, where they can browse available products.
4. **Product Details**: Clicking on a product opens the product details page.
5. **Not Found Page**: Users entering an invalid URL will be redirected to the "Not Found" page.
6. **Secure Routing**: Users who are not logged in cannot directly access the products page.

## Tech Stack

- **Frontend**: ![React](https://img.shields.io/badge/React-v18.2.0-blue)
- **Authentication**: ![Firebase](https://img.shields.io/badge/Firebase-Authentication-orange)
- **Database**: ![Firestore](https://img.shields.io/badge/Firestore-NoSQL-yellow)
- **Styling**: ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3.0-blue)
- **Deployment**: ![Firebase Hosting](https://img.shields.io/badge/Firebase%20Hosting-Live-brightgreen)
- **CI/CD**: ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-brightgreen)

## Prerequisites

- Node.js (v16+)
- Firebase account (for Authentication and Firestore setup)
- Firebase CLI installed globally: `npm install -g firebase-tools`
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Git-abby/shop-app.git
cd shop-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Add Firebase Authentication (enable Email/Password and Google sign-in methods).
4. Create a Firestore database (choose "Start in Test mode" for ease of development).
5. Create a new web app in Firebase and get the configuration keys.

```plaintext
REACT_APP_API_KEY=your-firebase-api-key
REACT_APP_AUTH_DOMAIN=your-firebase-auth-domain
REACT_APP_PROJECT_ID=your-firebase-project-id
REACT_APP_STORAGE_BUCKET=your-firebase-storage-bucket
REACT_APP_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
REACT_APP_APP_ID=your-firebase-app-id
```

### 4. Running the Application

Once the Firebase configuration is set up, you can run the application:

```bash
npm start
```

This will start the development server at `http://localhost:3000`.

### 5. Deploying to Firebase

```bash
firebase login
firebase init
npm run build
firebase deploy
```

## Project Structure

```plaintext
shop-app/
├── public/                  # Public assets and index.html
├── src/                     # Application source code
│   ├── components/          # Reusable components like Login, Products, ProductDetails
│   ├── firebase.js          # Firebase configuration and initialization
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point of the React app
│   └── styles/              # Tailwind CSS styles for the app
├── .github/                 # GitHub Actions workflow configuration
│   └── workflows/
│       └── firebase-hosting-pull-request.yml
├── .gitignore               # Files and folders to be ignored by Git
├── package.json             # Dependencies and scripts
├── README.md                # Project documentation
└── firebase.json            # Firebase configuration for hosting
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
