# FreeStream Frontend 🎧

The modern, responsive client-side interface for **FreeStream**, a music and podcast streaming application built with React and Tailwind CSS. It features a sleek glassmorphism UI, real-time audio playback, and seamless integration with the FreeStream backend.

## ✨ Features

* **Global Audio Player:** Persistent player with seek bar, volume control, and queue management (Next/Previous).
* **Glassmorphism UI:** Modern, transparent aesthetics with neon accents and smooth animations.
* **Music Discovery:** Trending songs, recently played history, and search functionality.
* **Library Management:** Create and manage custom playlists.
* **Podcast Support:** Dedicated section for browsing and listening to podcast episodes.
* **Admin Dashboard:** Interface for uploading new tracks and cover art directly to Supabase Storage.
* **Authentication:** User login and registration powered by Supabase Auth.
* **Responsive Design:** Fully optimized for desktop and mobile devices.

## 🛠️ Tech Stack

* **Framework:** [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **State Management:** React Context API
* **Icons:** Heroicons / SVG
* **HTTP Client:** Fetch API

## 📂 Project Structure

```bash
frontend/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and icons
│   ├── components/     # Reusable UI components (AudioPlayer, Navbar, Cards)
│   ├── context/        # Global state (PlayerContext)
│   ├── pages/          # Application views (Home, Search, Admin, etc.)
│   ├── services/       # API integration functions
│   ├── App.jsx         # Main application root
│   └── main.jsx        # Entry point with Error Boundary
└── index.html          # HTML template

```

## 🚀 Installation & Setup

### 1. Prerequisites

Ensure you have **Node.js** and **npm** installed.

### 2. Install Dependencies

Navigate to the frontend directory and install the required packages:

```bash
cd frontend
npm install

```

### 3. Environment Configuration

Create a `.env.local` file in the root of the `frontend` folder to connect to your Supabase instance.
*(Note: These keys are safe to expose on the client-side if Row Level Security is configured correctly).*

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

```

### 4. Run the Application

Start the development server:

```bash
npm run dev

```

The app will typically run at `http://localhost:5173`.

## 📜 Scripts

* `npm run dev`: Starts the development server.
* `npm run build`: Builds the app for production.
* `npm run preview`: Locally preview the production build.
* `npm run lint`: Runs ESLint to check for code quality issues.

## 🎨 UI Design System

The application uses a custom **Emerald Green** color palette consistent with the FreeStream brand:

* **Primary:** `text-green-500`, `bg-green-500`
* **Background:** `bg-gray-900` (Dark Mode default)
* **Player:** `bg-black/80` with `backdrop-blur-md` (Glass Effect)

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add NewFeature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.
