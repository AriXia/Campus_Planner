\# 🎓 CCNY Campus Planner



A unified web platform for CCNY students to manage academic assignments and discover campus events.



Built with \*\*React + Flask\*\*.



\---



\## 📸 What It Does



\- \*\*Landing Page\*\* — Welcome screen with Get Started button

\- \*\*Dashboard\*\* — See your pending assignments and upcoming events at a glance

\- \*\*Assignments\*\* — Add, complete, and delete assignments by course and due date

\- \*\*Events\*\* — Create, view, and delete campus events



\---



\## 🛠️ Tech Stack



| Layer | Technology |

|-------|-----------|

| Frontend | React + Vite |

| Backend | Flask (Python) |

| Styling | Custom CSS |

| Routing | React Router |



\---



\## 🚀 How To Run This Project



\### Step 1 — Download the code



1\. Go to \[https://github.com/AriXia/Campus\_Planner](https://github.com/AriXia/Campus\_Planner)

2\. Click the branch dropdown (says \*\*main\*\*) and select \*\*abrahams-features\*\*

3\. Click the green \*\*Code\*\* button → \*\*Download ZIP\*\*

4\. Extract the ZIP file and open the folder



\### Step 2 — Install requirements (first time only)



Make sure you have these installed:

\- Python: \[https://python.org/downloads](https://python.org/downloads)

\- Node.js: \[https://nodejs.org](https://nodejs.org)



\### Step 3 — Run the Backend



Open a terminal and run:



```bash

cd Campus\_Planner-main

pip install flask flask-cors

python run.py

```



You should see: Running on http://127.0.0.1:5000



\### Step 4 — Run the Frontend



Open a \*\*second\*\* terminal and run:



```bash

cd Campus\_Planner-main/frontend

npm install

npm run dev

```



You should see: VITE ready on http://localhost:5173/



\### Step 5 — Open the App



Go to your browser and visit: http://localhost:5173/



\---



\## 📁 Project Structure



Campus\_Planner-main/

├── run.py              ← starts the Flask backend

├── events.py           ← events API routes

├── assignments.py      ← assignments API routes

└── frontend/

└── src/

├── App.jsx

├── pages/

│   ├── LandingPage.jsx

│   ├── DashboardPage.jsx

│   ├── AssignmentsPage.jsx

│   └── EventsPage.jsx

└── components/

├── Navbar.jsx

├── AssignmentForm.jsx

├── AssignmentCard.jsx

├── EventForm.jsx

└── EventCard.jsx



\---



\## 🔗 API Routes



| Method | Route | Description |

|--------|-------|-------------|

| GET | /events | Get all events |

| POST | /events | Create an event |

| DELETE | /events/:id | Delete an event |

| GET | /assignments | Get all assignments |

| POST | /assignments | Create an assignment |

| POST | /assignments/:id/complete | Mark assignment complete |

| DELETE | /assignments/:id | Delete an assignment |



\---



\## 👥 Team



\- Abraham — Assignments, Dashboard, Landing Page, Frontend Theme

\- Ari and Selina — Project setup, Events API, Backend structure



\---



\## ⚠️ Notes



\- Data is stored in memory — it resets when the backend restarts

\- Both the backend and frontend must be running at the same time

\- Backend runs on port 5000, frontend runs on port 5173

