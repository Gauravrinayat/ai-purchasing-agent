# PurchaseAI - Intelligent Purchasing Agent

PurchaseAI is an autonomous procurement decision-support system that investigates purchasing situations, evaluates inventory and purchasing constraints, makes a purchasing decision, creates mock purchase orders, and validates the final procurement action.

The project demonstrates how an agent can avoid blindly following a purchasing system recommendation and instead make a decision based on available business information.

---

## Features

- Purchasing situation investigation
- Inventory analysis
- Expected demand analysis
- Open purchase order analysis
- Supplier evaluation
- Supplier lead-time consideration
- Minimum order quantity (MOQ) validation
- Budget validation
- Storage capacity validation
- Purchase recommendation modification
- Alternate supplier evaluation
- Mock purchase order creation
- Purchase order validation
- Explainable agent decisions

---

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- REST APIs

### Development

- Git
- GitHub
- VS Code

---

# Architecture

The complete system architecture is documented in:

**[ARCHITECTURE.md](./ARCHITECTURE.md)**

The main flow is:

```text
User
  |
  v
React + Vite Frontend
  |
  | HTTP API Requests
  v
Node.js + Express Backend
  |
  v
Investigation
  |
  v
Agent Analysis
  |
  v
Purchase Decision
  |
  v
Constraint Validation
  |
  +---- Budget Check
  |
  +---- Storage Check
  |
  +---- Minimum Order Check
  |
  v
Purchase Order
  |
  v
Purchase Validation
  |
  v
Frontend
```

---

# Project Structure

```text
ai-purchasing-agent/
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── ARCHITECTURE.md
├── README.md
├── .env.example
└── .gitignore
```

---

# Setup Instructions

## Prerequisites

Install the following before running the project:

- Node.js
- npm
- Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/Gauravrinayat/ai-purchasing-agent.git
```

```bash
cd ai-purchasing-agent
```

---

## 2. Install Backend Dependencies

Open a terminal in the project root and run:

```bash
cd backend
npm install
```

---

## 3. Start the Backend

From the `backend` directory:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

The backend health endpoint can be checked at:

```text
http://localhost:5000
```

---

## 4. Install Frontend Dependencies

Open another terminal and run:

```bash
cd frontend
npm install
```

---

## 5. Start the Frontend

```bash
npm run dev
```

Vite will provide the local frontend URL, normally:

```text
http://localhost:5173
```

Open that URL in a browser.

---

# Environment Configuration

A `.env.example` file is included in the repository.

It provides the example configuration required by the application without exposing credentials or confidential values.

Example:

```text
PORT=5000
VITE_API_URL=http://localhost:5000
```

Do not commit private API keys, passwords, tokens, or other credentials.

---

# API Endpoints

The backend exposes APIs for the main purchasing workflow.

### Health Check

```text
GET /
```

Used to confirm that the backend is running.

### Purchasing Situation

```text
GET /api/purchasing-situation
```

Returns the purchasing information required for analysis.

### Agent Analysis

```text
GET /api/agent/analyze
```

Analyzes the purchasing situation and produces an agent recommendation.

### Investigation

The investigation workflow uses the purchasing situation data to collect and evaluate relevant purchasing information.

### Purchase Decision

The decision stage uses the agent analysis to determine the appropriate purchase quantity and decision.

### Purchase Validation

The validation stage checks whether the proposed procurement action satisfies the purchasing constraints.

---

# Implemented Scenarios

## Scenario 1 - Purchase Recommendation Review

The purchasing system recommends buying **800 units of iPhone 15**.

The agent receives the following information:

| Information | Value |
|---|---:|
| Product | iPhone 15 |
| System Recommendation | 800 units |
| Current Inventory | 300 units |
| Expected Demand | 900 units |
| Open Purchase Orders | 200 units |
| Supplier | ABC Electronics |
| Lead Time | 5 days |
| Minimum Order | 100 units |
| Unit Cost | ₹2,000 |
| Available Budget | ₹10,00,000 |
| Storage Capacity | 1,000 units |

### Agent Calculation

Current inventory and incoming purchase orders:

```text
300 + 200 = 500 units
```

Expected demand:

```text
900 units
```

Available or incoming inventory:

```text
500 units
```

Shortfall:

```text
900 - 500 = 400 units
```

Therefore, the agent recommends:

```text
Purchase Quantity = 400 units
```

Estimated purchase cost:

```text
400 × ₹2,000 = ₹8,00,000
```

The original system recommendation was:

```text
800 units
```

Estimated cost:

```text
800 × ₹2,000 = ₹16,00,000
```

The agent therefore modifies the original recommendation from **800 units to 400 units**.

### Decision

```text
Original Recommendation: 800 units

Agent Recommendation: 400 units

Decision: MODIFY
```

### Constraint Validation

The agent checks:

- Budget availability
- Storage capacity
- Minimum order quantity

For Scenario 1:

```text
Budget:
400 × ₹2,000 = ₹8,00,000
Available budget = ₹10,00,000
Result = Valid
```

```text
Minimum Order:
Required = 400 units
Minimum order = 100 units
Result = Valid
```

```text
Storage:
Current inventory = 300 units
Purchase quantity = 400 units
Total = 700 units
Storage capacity = 1,000 units
Result = Valid
```

The decision therefore passes the purchasing constraints.

---

# Scenario 2 - Purchasing Decision Evaluation

Scenario 2 demonstrates the same agent workflow under a different purchasing situation.

The agent evaluates the available purchasing information instead of blindly accepting the system recommendation.

The workflow consists of:

```text
Investigation
     ↓
Analysis
     ↓
Decision
     ↓
Purchase
     ↓
Validation
```

The agent considers:

- Current inventory
- Expected demand
- Incoming purchase orders
- Supplier information
- Lead time
- Minimum order quantity
- Unit cost
- Available budget
- Storage capacity

The final recommendation is validated before the purchasing action is completed.

---

# Agent Decision Logic

The agent follows a constraint-based decision process.

### Step 1 - Investigate

Collect purchasing information from the purchasing system.

### Step 2 - Analyze

Calculate the amount of inventory already available or incoming.

```text
Total Available = Current Inventory + Open Purchase Orders
```

### Step 3 - Calculate Shortfall

```text
Shortfall = Expected Demand - Total Available
```

If the shortfall is positive, additional inventory may be required.

### Step 4 - Evaluate Constraints

The proposed quantity is checked against:

```text
Budget
Storage Capacity
Minimum Order Quantity
Supplier Information
```

### Step 5 - Make Decision

The agent can modify the original system recommendation when the analysis indicates that a different quantity is more appropriate.

### Step 6 - Validate

The final procurement action is checked before completion.

---

# How Agent Decisions Are Validated

The system does not rely only on the agent's recommendation.

The decision is validated using deterministic business rules.

## Budget Validation

```text
Purchase Cost = Purchase Quantity × Unit Cost
```

The purchase is valid only when the purchase cost is within the available budget.

## Storage Validation

The system checks that the resulting inventory does not exceed storage capacity.

## Minimum Order Validation

The proposed purchase quantity must satisfy the supplier's minimum order quantity.

## Decision Consistency

The agent's recommendation is compared with the original purchasing-system recommendation.

This makes it possible to identify when the agent:

- Accepts the recommendation
- Modifies the recommendation
- Rejects the recommendation
- Requires further investigation

---

# Mock APIs and Data

The project uses backend APIs to provide the purchasing situation and agent decision workflow.

The application is designed so that the project can be run locally without requiring confidential external credentials.

The purchasing information used for the implemented scenarios includes mock business data such as:

- Product information
- Inventory
- Expected demand
- Open purchase orders
- Supplier information
- Lead time
- Minimum order quantity
- Unit cost
- Budget
- Storage capacity

---

# Test Scenarios

The application can be evaluated using different purchasing situations.

## Test 1 - System Recommendation Higher Than Requirement

Example:

```text
System Recommendation = 800
Current Inventory = 300
Open Orders = 200
Expected Demand = 900
```

Expected result:

```text
Total Available = 500
Shortfall = 400
Agent Recommendation = 400
Decision = MODIFY
```

---

## Test 2 - Budget Constraint

Provide a purchasing situation where the calculated purchase cost exceeds the available budget.

Expected behavior:

```text
Budget Validation = Invalid
```

The system should not approve an invalid purchase.

---

## Test 3 - Storage Constraint

Provide a purchasing situation where the resulting inventory exceeds storage capacity.

Expected behavior:

```text
Storage Validation = Invalid
```

The system should prevent an invalid procurement action.

---

## Test 4 - Minimum Order Constraint

Provide a required quantity that is lower than the supplier's minimum order quantity.

Expected behavior:

```text
Minimum Order Validation = Invalid
```

The system should account for the supplier's minimum order requirement.

---

# Evaluation Approach

The agent is evaluated by comparing its recommendation against independently calculated business constraints.

The evaluation checks:

1. Whether inventory and incoming orders are correctly considered.
2. Whether expected demand is correctly considered.
3. Whether the purchase shortfall is correctly calculated.
4. Whether the recommended quantity satisfies the minimum order requirement.
5. Whether the purchase cost is within the available budget.
6. Whether storage capacity is respected.
7. Whether the final decision is explainable.
8. Whether the final purchase action passes validation.

The purpose of the evaluation is to ensure that the agent makes a business-aware decision rather than simply copying the original system recommendation.

---

# Working Demo

The application can be demonstrated locally.

Start the backend:

```bash
cd backend
node server.js
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Then open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

The demo shows the purchasing workflow:

```text
Investigate
    ↓
Analyze
    ↓
Decide
    ↓
Purchase
    ↓
Validate
```

Scenario 1 demonstrates how the agent changes the original recommendation from **800 units to 400 units** after considering inventory, incoming purchase orders and expected demand.

---

# Explainability

The application provides an explanation for the purchasing decision.

For Scenario 1, the explanation is based on:

```text
Current Inventory = 300
Open Purchase Orders = 200

Total Available = 500

Expected Demand = 900

Shortfall = 400
```

Therefore:

```text
Agent Recommendation = 400 units
```

This allows the user to understand why the agent did not blindly follow the original 800-unit recommendation.

---

# Security

No credentials or confidential values should be committed to the repository.

Use:

```text
.env
```

for local private configuration when required.

Use:

```text
.env.example
```

to document the required environment variables without exposing their actual values.

The repository includes a `.gitignore` file to prevent unnecessary local files and dependencies from being committed.

---

# Git Commit History

The project keeps its Git commit history intact.

The repository contains separate commits for the initial project, README documentation and architecture documentation.

This makes the development history reviewable.

---

# Conclusion

PurchaseAI demonstrates an intelligent purchasing workflow in which an agent investigates purchasing information, analyzes business constraints, makes an explainable purchasing decision, creates a mock procurement action and validates the final decision.

The system is designed to support procurement decisions while ensuring that recommendations are checked against practical business constraints such as demand, inventory, budget, storage capacity and supplier minimum order requirements.