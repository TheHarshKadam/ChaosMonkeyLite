# Chaos Monkey Lite

## 📉 Backend Failure Simulator for APIs

Built a Chaos Engineering tool that injects controlled failures at the middleware level to simulate real production outages like latency, partial failures, and timeouts without modifying business logic.

Crash Rhino helps backend developers **test system resilience locally** before these issues hit production.

## 🧠 Core Idea

> **Chaos is injected at the middleware layer** — before requests reach controllers.

This means:
- Business logic remains clean and unchanged
- Chaos can be enabled/disabled dynamically
- Any API can be chaos-tested without rewriting code

<img width="1000" height="900" alt="screencapture-localhost-3000-2025-12-29-20_44_21" src="https://github.com/user-attachments/assets/d15e0820-d8d9-4375-9b39-3cf28cbd5d0a" />


## ⚙️ Features

###  Chaos Injection Types
- ⏳ **Random Delay Injection** (simulate slow APIs)
- 💥 **Forced 500 Errors** (simulate crashes)
- 🎯 **Probability-based execution** (realistic randomness)
- ☠️ **Kill Switch** to instantly disable chaos

## 💥 Types of Chaos -
- ⏱️ **Delay** — Randomly injects network latency to simulate slow APIs and real-world response delays.
  
  ``Status: 200 | Duration: 2899ms``
  
- 💥 **Error (500)** — Forces internal server errors to test client-side and retry/error-handling logic.

  ``Status: 500 | Duration: 4ms
{
  "error": "CHAOS 500 ERROR"
}``

- ⏳ **Timeout** — Simulates hanging requests that never respond, mimicking upstream service timeouts.
- 🔥 **CPU Spike** — Blocks the event loop with heavy computation to emulate CPU exhaustion scenarios.
- 🎲 **Random Status** — Returns random HTTP error codes (400–503) to test resilience against unpredictable failures.

  ``Status: 403 | Duration: 5ms
  {
    "error": "CHAOS 403"
  }``

- 🧩 **Partial Response** — Sends incomplete or null response data to simulate corrupted or partial API responses.

  ``Status: 200 | Duration: 6ms
{
  "data": null
}``

- 🧠 **Memory Leak** — Gradually consumes memory to mimic memory leaks and long-running process degradation.

### Each chaos type is injected at the middleware layer, ensuring business logic remains untouched while simulating production-grade failure scenarios.

## How to run the project - 

1) Make sure you have installed **Node.js (v16+ recommended) and npm (comes with Node.js)** :  `node -v npm -v`
   
2) Clone the Repository : `git clone https://github.com/TheHarshKadam/ChaosMonkeyLite`

3) Install dependencies : `npm install`

4) Start the Server : `node server.js`
   
   You should see logs like:
   ``CRASH RHINO IS RUNNING ON PORT: 3000
⏱ DELAY INJECTED: 837ms``

5) Test the Chaos APIs

   By default, the API runs at: `http://localhost:3000`
   Example endpoint with chaos injection: `GET http://localhost:3000/api/users`

### TECH STACK USED -
- [NODE.JS](https://nodejs.org/en) - Runtime environment for building the backend service.
- [Express JS](https://expressjs.com/) - Web framework used to create APIs and middleware-based chaos injection.
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Core language for implementing chaos logic, middleware, and controllers.
- [ReactJs](https://react.dev/) - Functional Components, Toggles, Notifications etc...
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling, animations, better UI
- [Lucide Icons](https://lucide.dev/) - Lightweight SVG icon system
- [REST APIs (JSON over HTTP)](https://docs.github.com/en/rest?apiVersion=2022-11-28) - Frontend - Backend communication and Endpoints
- [Custom Chaos Middleware](https://github.com/TheHarshKadam/ChaosMonkeyLite/tree/main/src/chaos) - To inject failures before business logic, my own implementation (not a default library!)
