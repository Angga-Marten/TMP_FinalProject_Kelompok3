# Hackathon TPM – Website & Backend

Hackathon registration and admin website (Landing, Register, Login, User Dashboard, Admin Panel) with a unified Node.js backend.

---

## 1. Database

### 1.1 Create database and tables

1. Install MySQL (or use a cloud MySQL service).
2. Create a database, for example:
   ```sql
   CREATE DATABASE hackathon_tpm;
   ```
3. Run the schema script to create tables:
   - Open `database/schema.sql` in your MySQL client (MySQL Workbench, phpMyAdmin, or command line).
   - Execute the script against your database.
   - This creates: `user_groups`, `user_leaders`, `admins`.

### 1.2 Create admin user

1. Go to the backend folder and install dependencies (see Backend section below).
2. Create a `.env` file (copy from `backend/.env.example`) and set your database and JWT settings.
3. Run:
   ```bash
   cd backend
   node create_admin.js
   ```
   Default admin: **username** `admin`, **password** `admin123`.  
   To use another username/password:
   ```bash
   node create_admin.js your_username your_password
   ```

---

## 2. Backend

### 2.1 Setup

```bash
cd backend
npm install
```

### 2.2 Environment

Create `backend/.env` (use `backend/.env.example` as reference):

```env
PORT=8000
JWT_SECRET=your-secret-key-change-in-production

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hackathon_tpm
```

### 2.3 Run

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

Server runs at **http://localhost:8000** (or the `PORT` in `.env`).

### 2.4 API base URL
- Local: `http://localhost:8000`
---

## 3. Frontend (website)

### 3.1 Run locally

If the project uses **Vite**:

```bash
cd frontend
npm install
npm run dev
```

If it uses **Create React App**:

```bash
npm install
npm start
```

Open the URL shown in the terminal (e.g. http://localhost:5173 or http://localhost:3000).

### 3.2 Point frontend to backend

- By default, the app calls **http://localhost:8000**.
- For production/cloud, set the backend URL (see “API base URL” above) so login, register, dashboard, and admin all use your deployed API.

---

## 4. Try the flow

1. **Database**: Create DB, run `database/schema.sql`, then run `node create_admin.js` in `backend`.
2. **Backend**: `cd backend`, `npm install`, create `.env`, `npm start`.
3. **Frontend**: From project root, `npm install` and `npm run dev` (or `npm start`).
4. **Landing** → **Register** (multi-step: group then leader) → **Login** (team name + password) → **User Dashboard** (view team, leader, CV/ID, logout).
5. **Admin**: Open Admin Panel, login with admin username/password → see participants, view/edit/delete teams, search and sort.

