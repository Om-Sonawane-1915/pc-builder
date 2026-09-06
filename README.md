# PC Builder

A full-stack PC Builder application to select compatible components, auto-generate builds based on budget and purpose, compare CPUs and GPUs, and export build reports to PDF.

---

## Tech Stack

* **Frontend:** React, Vite, CSS, jsPDF
* **Backend:** Python, FastAPI, Uvicorn

---

## How to Run the Project

Make sure you have **Python** and **Node.js** installed on your system.

### 1. Clone the repository

```bash
git clone [https://github.com/Om-Sonawane-1915/pc-builder.git](https://github.com/Om-Sonawane-1915/pc-builder.git)
cd pc-builder
2. Run the Backend
Open a terminal in the pc-builder root directory:

Windows (PowerShell):

//PowerShell
python -m venv .venv
.venv\Scripts\activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload
macOS / Linux:

//Bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload
Backend runs at: http://127.0.0.1:8000

API documentation: http://127.0.0.1:8000/docs

3. Run the Frontend
Open a second terminal window in the pc-builder root directory:

//Bash
cd frontend
npm install
npm run dev
Open the local URL shown in the terminal (usually http://localhost:5173) in your browser.

//Features
Build PC: Select CPU, GPU, Motherboard, RAM, Storage, and PSU with real-time specs.

Auto Generate: Automatically pick compatible parts based on budget and target purpose.

Compatibility & Power: Flags incompatible parts and calculates required wattage.

Compare Components: Side-by-side comparison for CPUs and GPUs.

Save & Load: Save custom builds to review or load later.

Export PDF: Download a full summary report of your build.

//License
MIT