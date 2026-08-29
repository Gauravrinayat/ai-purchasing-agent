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

# Implemented Scenarios

## Scenario 1 - Purchase Recommendation Review

The purchasing system recommends buying 800 units of iPhone 15.

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