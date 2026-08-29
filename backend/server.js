const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// ============================================================
// SCENARIO 1 DATA
// ============================================================

const scenario1 = {
  productName: "iPhone 15",
  recommendedQuantity: 800,
  currentInventory: 300,
  expectedDemand: 900,
  openPurchaseOrders: 200,

  supplier: {
    name: "ABC Electronics",
    leadTimeDays: 5,
    minimumOrderQuantity: 100
  },

  unitCost: 2000,
  budgetAvailable: 1000000,
  storageCapacity: 1000
};


// ============================================================
// SCENARIO 2 DATA
// ============================================================

const scenario2 = {
  productName: "iPhone 15",

  purchaseOrder: {
    purchaseOrderId: "PO-2001",
    orderedQuantity: 500
  },

  primarySupplier: {
    name: "ABC Electronics",
    availableQuantity: 250,
    unitCost: 2000,
    leadTimeDays: 5
  },

  currentInventory: 100,
  expectedDemand: 600,

  alternateSupplier: {
    name: "TechWorld Supplies",
    availableQuantity: 300,
    unitCost: 2200,
    leadTimeDays: 3,
    minimumOrderQuantity: 50
  },

  availableBudget: 700000
};


// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/", (req, res) => {
  res.json({
    message: "PurchaseAI Backend is running",
    status: "online",
    service: "AI Purchasing Agent"
  });
});


// ============================================================
// SCENARIO 1 - INVESTIGATE
// ============================================================

app.get("/api/purchasing-situation", (req, res) => {
  res.json(scenario1);
});


// Compatibility
app.get("/api/investigation", (req, res) => {
  res.json(scenario1);
});


// ============================================================
// SCENARIO 1 - ANALYZE
// ============================================================

app.get("/api/agent/analyze", (req, res) => {

  const totalAvailable =
    scenario1.currentInventory +
    scenario1.openPurchaseOrders;

  const shortfall =
    Math.max(
      scenario1.expectedDemand - totalAvailable,
      0
    );

  const quantity = shortfall;

  const cost =
    quantity * scenario1.unitCost;

  const budgetValid =
    cost <= scenario1.budgetAvailable;

  const storageValid =
    totalAvailable + quantity <=
    scenario1.storageCapacity;

  const minimumOrderValid =
    quantity === 0 ||
    quantity >=
    scenario1.supplier.minimumOrderQuantity;


  let decision;

  if (!budgetValid) {
    decision = "REJECT";
  } else if (!storageValid) {
    decision = "REJECT";
  } else if (!minimumOrderValid) {
    decision = "INVESTIGATE FURTHER";
  } else if (
    quantity !== scenario1.recommendedQuantity
  ) {
    decision = "MODIFY";
  } else {
    decision = "ACCEPT";
  }


  const reason =
    `The system recommended ${scenario1.recommendedQuantity} units. ` +
    `Current inventory is ${scenario1.currentInventory} units and ` +
    `${scenario1.openPurchaseOrders} units are already on open purchase orders. ` +
    `Therefore ${totalAvailable} units are already available or incoming. ` +
    `Expected demand is ${scenario1.expectedDemand} units, ` +
    `leaving a shortfall of only ${shortfall} units. ` +
    `The agent therefore recommends ${quantity} units.`;


  res.json({

    decision,

    originalRecommendation: {
      quantity: scenario1.recommendedQuantity,
      cost:
        scenario1.recommendedQuantity *
        scenario1.unitCost
    },

    agentRecommendation: {
      quantity,
      cost
    },

    reason,

    investigation: {
      currentInventory:
        scenario1.currentInventory,

      openPurchaseOrders:
        scenario1.openPurchaseOrders,

      totalAvailable,

      expectedDemand:
        scenario1.expectedDemand,

      shortfall
    },

    constraintChecks: {

      budgetValid,

      storageValid,

      minimumOrderValid

    },

    confidence: 96

  });

});


// ============================================================
// SCENARIO 1 - EXECUTE PURCHASE
// ============================================================

app.post("/api/purchase", (req, res) => {

  const quantity =
    Number(req.body.quantity);

  if (!quantity || quantity <= 0) {

    return res.status(400).json({
      success: false,
      message: "Invalid purchase quantity."
    });

  }


  const totalCost =
    quantity * scenario1.unitCost;


  if (
    totalCost >
    scenario1.budgetAvailable
  ) {

    return res.status(400).json({
      success: false,
      message: "Purchase exceeds available budget."
    });

  }


  if (
    scenario1.currentInventory +
    scenario1.openPurchaseOrders +
    quantity >
    scenario1.storageCapacity
  ) {

    return res.status(400).json({
      success: false,
      message: "Purchase exceeds storage capacity."
    });

  }


  if (
    quantity <
    scenario1.supplier.minimumOrderQuantity
  ) {

    return res.status(400).json({
      success: false,
      message:
        "Purchase quantity is below supplier minimum order quantity."
    });

  }


  const purchaseOrder = {

    purchaseOrderId:
      "PO-" + Date.now(),

    product:
      scenario1.productName,

    supplier:
      scenario1.supplier.name,

    quantity,

    unitCost:
      scenario1.unitCost,

    totalCost,

    status: "CREATED"

  };


  res.json({

    success: true,

    message:
      `Purchase order created successfully for ${quantity} units.`,

    purchaseOrder

  });

});


// ============================================================
// SCENARIO 1 - VALIDATE
// ============================================================

app.post("/api/validate-purchase", (req, res) => {

  const quantity =
    Number(req.body.quantity);

  const purchaseOrderId =
    req.body.purchaseOrderId;


  if (
    !quantity ||
    !purchaseOrderId
  ) {

    return res.status(400).json({

      valid: false,

      message:
        "Purchase order information is incomplete."

    });

  }


  const totalCost =
    quantity * scenario1.unitCost;


  const budgetValid =
    totalCost <=
    scenario1.budgetAvailable;


  const storageValid =
    scenario1.currentInventory +
    scenario1.openPurchaseOrders +
    quantity <=
    scenario1.storageCapacity;


  const minimumOrderValid =
    quantity >=
    scenario1.supplier.minimumOrderQuantity;


  const valid =
    budgetValid &&
    storageValid &&
    minimumOrderValid;


  res.json({

    valid,

    status:
      valid
        ? "VALIDATED"
        : "REQUIRES_REVIEW",

    message:
      valid
        ? "Purchase successfully validated. All purchasing constraints are satisfied."
        : "Purchase requires review because one or more constraints failed.",

    purchaseOrderId,

    product:
      scenario1.productName,

    quantity,

    totalCost,

    checks: {

      budgetValid,

      storageValid,

      minimumOrderValid

    }

  });

});


// ============================================================
// SCENARIO 2 - INVESTIGATE
// ============================================================

app.get(
  "/api/scenario2/investigate",
  (req, res) => {

    const ordered =
      scenario2.purchaseOrder.orderedQuantity;

    const primaryAvailable =
      scenario2.primarySupplier.availableQuantity;

    const remaining =
      ordered - primaryAvailable;

    const availableAfterPrimary =
      scenario2.currentInventory +
      primaryAvailable;

    const demandGap =
      Math.max(
        scenario2.expectedDemand -
        availableAfterPrimary,
        0
      );


    res.json({

      scenario:
        "Scenario 2 - Supplier Cannot Fulfil the Purchase",

      productName:
        scenario2.productName,

      purchaseOrder:
        scenario2.purchaseOrder,

      primarySupplier:
        scenario2.primarySupplier,

      remainingQuantity:
        remaining,

      currentInventory:
        scenario2.currentInventory,

      expectedDemand:
        scenario2.expectedDemand,

      availableAfterPrimary,

      demandGap,

      alternateSupplier:
        scenario2.alternateSupplier,

      availableBudget:
        scenario2.availableBudget

    });

  }
);


// ============================================================
// SCENARIO 2 - ANALYZE
// ============================================================

app.get(
  "/api/scenario2/analyze",
  (req, res) => {

    const ordered =
      scenario2.purchaseOrder.orderedQuantity;

    const primaryAvailable =
      scenario2.primarySupplier.availableQuantity;

    const remaining =
      ordered - primaryAvailable;

    const alternate =
      scenario2.alternateSupplier;


    const alternateAvailable =
      alternate.availableQuantity >=
      remaining;

    const alternateCost =
      remaining *
      alternate.unitCost;

    const budgetValid =
      alternateCost <=
      scenario2.availableBudget;

    const minimumOrderValid =
      remaining >=
      alternate.minimumOrderQuantity;


    let decision;
    let action;
    let reason;


    if (remaining <= 0) {

      decision = "ACCEPT";

      action =
        "Proceed with the primary supplier.";

      reason =
        "The primary supplier can fulfil the complete order.";

    }

    else if (
      alternateAvailable &&
      budgetValid &&
      minimumOrderValid
    ) {

      decision =
        "SOURCE FROM ALTERNATE SUPPLIER";

      action =
        `Accept ${primaryAvailable} units from ` +
        `${scenario2.primarySupplier.name} and source ` +
        `the remaining ${remaining} units from ` +
        `${alternate.name}.`;

      reason =
        `The original order was for ${ordered} units, ` +
        `but the primary supplier can supply only ` +
        `${primaryAvailable} units. The remaining ` +
        `${remaining} units can be sourced from the ` +
        `alternate supplier within the available budget.`;

    }

    else {

      decision =
        "INVESTIGATE FURTHER";

      action =
        "Investigate additional suppliers or escalate for human approval.";

      reason =
        "The remaining quantity cannot currently be sourced while satisfying all known constraints.";

    }


    res.json({

      decision,

      originalOrder:
        ordered,

      primarySupplierQuantity:
        primaryAvailable,

      remainingQuantity:
        remaining,

      alternateSupplier:
        alternate,

      estimatedAlternateCost:
        alternateCost,

      constraintChecks: {

        alternateSupplierAvailable:
          alternateAvailable,

        budgetValid,

        minimumOrderValid

      },

      action,

      reason

    });

  }
);


// ============================================================
// SCENARIO 2 - PURCHASE ALTERNATE
// ============================================================

app.post(
  "/api/scenario2/purchase",
  (req, res) => {

    const quantity =
      Number(req.body.quantity);


    if (!quantity || quantity <= 0) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid purchase quantity."

      });

    }


    const supplier =
      scenario2.alternateSupplier;


    if (
      quantity >
      supplier.availableQuantity
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Alternate supplier does not have enough stock."

      });

    }


    if (
      quantity <
      supplier.minimumOrderQuantity
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Quantity is below supplier minimum order."

      });

    }


    const totalCost =
      quantity * supplier.unitCost;


    if (
      totalCost >
      scenario2.availableBudget
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Purchase exceeds available budget."

      });

    }


    const purchaseOrder = {

      purchaseOrderId:
        "PO-ALT-" + Date.now(),

      product:
        scenario2.productName,

      supplier:
        supplier.name,

      quantity,

      unitCost:
        supplier.unitCost,

      totalCost,

      status:
        "CREATED"

    };


    res.json({

      success: true,

      message:
        "Alternate supplier purchase order created successfully.",

      purchaseOrder

    });

  }
);


// ============================================================
// SCENARIO 2 - VALIDATE
// ============================================================

app.post(
  "/api/scenario2/validate",
  (req, res) => {

    const quantity =
      Number(req.body.quantity);

    const purchaseOrderId =
      req.body.purchaseOrderId;


    if (
      !quantity ||
      !purchaseOrderId
    ) {

      return res.status(400).json({

        valid: false,

        message:
          "Purchase order information is incomplete."

      });

    }


    const supplier =
      scenario2.alternateSupplier;


    const quantityValid =
      quantity <=
      supplier.availableQuantity;

    const minimumOrderValid =
      quantity >=
      supplier.minimumOrderQuantity;

    const totalCost =
      quantity *
      supplier.unitCost;

    const budgetValid =
      totalCost <=
      scenario2.availableBudget;


    const valid =
      quantityValid &&
      minimumOrderValid &&
      budgetValid;


    res.json({

      valid,

      status:
        valid
          ? "VALIDATED"
          : "REQUIRES_REVIEW",

      purchaseOrderId,

      message:
        valid
          ? "Alternate supplier purchase validated successfully."
          : "Alternate supplier purchase failed validation.",

      checks: {

        quantityValid,

        minimumOrderValid,

        budgetValid

      }

    });

  }
);


// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {

  console.log("");
  console.log("========================================");
  console.log("       PURCHASEAI BACKEND");
  console.log("========================================");
  console.log(
    `Server running on http://localhost:${PORT}`
  );
  console.log("");
  console.log("SCENARIO 1");
  console.log("GET  /api/purchasing-situation");
  console.log("GET  /api/agent/analyze");
  console.log("POST /api/purchase");
  console.log("POST /api/validate-purchase");
  console.log("");
  console.log("SCENARIO 2");
  console.log("GET  /api/scenario2/investigate");
  console.log("GET  /api/scenario2/analyze");
  console.log("POST /api/scenario2/purchase");
  console.log("POST /api/scenario2/validate");
  console.log("========================================");

});