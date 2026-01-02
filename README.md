# FreeStream 🎵

**FreeStream** is a full-stack, modern music and podcast streaming platform designed to provide a seamless audio experience. Built with a robust **Node.js/Express** backend and a sleek **React/Tailwind** frontend, it leverages **Supabase** for secure authentication, database management, and scalable file storage.

![FreeStream Banner](https://placehold.co/1200x400/10b981/ffffff?text=FreeStream+Project)

## 🚀 Key Features

* **🎧 Universal Audio Player:** A persistent, glassmorphism-styled player that follows you across the app with Queue support (Next/Previous).
* **📂 Content Library:** specialized support for both Music tracks and Podcast episodes.
* **🔍 Smart Search:** Instantly find songs, artists, and podcasts.
* **👤 Personalization:** User authentication, custom Playlists, and "Recently Played" history.
* **🛠️ Admin Dashboard:** Built-in interface for authorized users to upload MP3s and cover art directly to cloud storage.
* **📱 Responsive Design:** Fully optimized for desktop, tablet, and mobile.

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS, React Context API, Lucide/Heroicons |
| **Backend** | Node.js, Express.js, REST API |
| **Database** | Supabase (PostgreSQL) |
| **Storage** | Supabase Storage (for Audio & Images) |
| **Auth** | Supabase Auth |

## 📂 Repository Structure

This monorepo is divided into two main directories:

* **[`/frontend`](./frontend)**: The React client application. Contains the UI, Player logic, and user-facing pages.
* **[`/backend`](./backend)**: The Node.js server. Handles API requests, business logic, and database communication.

> *Please check the `README.md` inside each folder for specific installation and setup instructions.*

## ⚡ Quick Start Guide

To get this project running locally, you need to set up both the server and the client.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/FreeStream.git]
cd FreeStream

```

### 2. Setup Backend

```bash
cd backend
npm install
# Create .env file with Supabase credentials (see backend/README.md)
npm start

```

### 3. Setup Frontend

Open a new terminal terminal:

```bash
cd frontend
npm install
# Create .env.local file with Supabase credentials (see frontend/README.md)
npm run dev

```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
Built with ❤️ by Siddharth Bhattacharya
</p>
