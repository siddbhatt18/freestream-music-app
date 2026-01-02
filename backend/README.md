# FreeStream Backend API 🎵

The backend server for **FreeStream**, a modern music and podcast streaming application. This RESTful API handles data management, search functionality, audio streaming logic, and integration with Supabase for database and storage solutions.

## 🚀 Tech Stack

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database & Storage:** [Supabase](https://supabase.com/) (PostgreSQL + Object Storage)
* **Middleware:** CORS, Dotenv

## 📂 Project Structure

```bash
backend/
├── package.json        # Dependencies and scripts
├── server.js           # Main entry point and API routes
├── supabase.js         # Supabase client configuration
└── .env                # Environment variables (Ignored by Git)

```

## 🛠️ Installation & Setup

### 1. Prerequisites

Ensure you have **Node.js** installed on your machine.

### 2. Install Dependencies

Navigate to the backend directory and install the required packages:

```bash
cd backend
npm install

```

### 3. Environment Configuration

Create a `.env` file in the root of the `backend` folder. Add your Supabase credentials and server port:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=5000

```

### 4. Run the Server

Start the development server:

```bash
npm start

```

The server will start running at `http://localhost:5000`.

## 📡 API Endpoints

### 🎵 Music & Tracks

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/tracks` | Fetch all available music tracks. |
| `POST` | `/tracks` | Upload metadata for a new track (Admin). |

### 🎙️ Podcasts

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/podcasts` | Fetch all podcast shows. |
| `GET` | `/podcasts/:id` | Fetch a specific podcast show and its episodes. |

### 📂 Playlists

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/playlists` | Fetch all user playlists. |
| `POST` | `/playlists` | Create a new playlist. |
| `GET` | `/playlists/:id` | Get details and songs of a specific playlist. |
| `POST` | `/playlists/:id/add` | Add a track to a specific playlist. |

### 🕒 History & Search

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/history` | Get the last 5 recently played songs. |
| `POST` | `/history` | Add a song to the recently played history. |
| `GET` | `/search?q=query` | Search for songs and podcasts by title. |

## 🗄️ Database Schema (Supabase)

The application uses the following tables in Supabase (PostgreSQL):

* **`tracks`**: Stores song metadata (title, artist, audio_url, cover_image).
* **`podcasts`**: Stores podcast show details.
* **`episodes`**: Stores podcast episodes linked to shows.
* **`playlists`**: Stores playlist names and descriptions.
* **`playlist_tracks`**: Junction table linking tracks to playlists.
* **`recently_played`**: Logs user listening history with timestamps.

## 🛡️ Security Note

This repository does not contain the `.env` file. You must generate your own Supabase project and API keys to run this backend locally.
