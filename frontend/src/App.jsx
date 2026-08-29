import { useState } from "react";
import "./App.css";

const API = "http://localhost:5000";

function App() {

  const [scenario, setScenario] = useState(1);

  const [situation, setSituation] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [purchase, setPurchase] = useState(null);
  const [validation, setValidation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // ==========================================================
  // RESET
  // ==========================================================

  const reset = () => {

    setSituation(null);
    setAnalysis(null);
    setPurchase(null);
    setValidation(null);
    setError("");

  };


  // ==========================================================
  // CHANGE SCENARIO
  // ==========================================================

  const changeScenario = (number) => {

    setScenario(number);
    reset();

  };


  // ==========================================================
  // SAFE JSON RESPONSE
  // ==========================================================

  const getJson = async (response) => {

    const text = await response.text();

    try {

      return JSON.parse(text);

    } catch {

      throw new Error(
        "Backend returned an invalid response."
      );

    }

  };


  // ==========================================================
  // SCENARIO 1 - INVESTIGATE
  // ==========================================================

  const investigate1 = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${API}/api/purchasing-situation`
      );

      const data =
        await getJson(response);

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Investigation failed."
        );

      }

      setSituation(data);
      setAnalysis(null);
      setPurchase(null);
      setValidation(null);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // SCENARIO 1 - ANALYZE
  // ==========================================================

  const analyze1 = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${API}/api/agent/analyze`
      );

      const data =
        await getJson(response);

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Agent analysis failed."
        );

      }

      setAnalysis(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // SCENARIO 1 - PURCHASE
  // ==========================================================

  const purchase1 = async () => {

    try {

      setLoading(true);
      setError("");

      const quantity =
        analysis?.agentRecommendation?.quantity;

      if (!quantity || quantity <= 0) {

        throw new Error(
          "No valid purchase quantity available."
        );

      }


      const response = await fetch(
        `${API}/api/purchase`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            quantity
          })
        }
      );


      const data =
        await getJson(response);


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Purchase failed."
        );

      }


      setPurchase(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // SCENARIO 1 - VALIDATE
  // ==========================================================

  const validate1 = async () => {

    try {

      setLoading(true);
      setError("");

      if (!purchase?.purchaseOrder) {

        throw new Error(
          "No purchase order found."
        );

      }


      const response = await fetch(
        `${API}/api/validate-purchase`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            quantity:
              purchase.purchaseOrder.quantity,

            purchaseOrderId:
              purchase.purchaseOrder.purchaseOrderId

          })
        }
      );


      const data =
        await getJson(response);


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Validation failed."
        );

      }


      setValidation(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // SCENARIO 2 - INVESTIGATE
  // ==========================================================

  const investigate2 = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${API}/api/scenario2/investigate`
      );

      const data =
        await getJson(response);


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Scenario 2 investigation failed."
        );

      }


      setSituation(data);
      setAnalysis(null);
      setPurchase(null);
      setValidation(null);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // SCENARIO 2 - ANALYZE
  // ==========================================================

  const analyze2 = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${API}/api/scenario2/analyze`
      );

      const data =
        await getJson(response);


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Scenario 2 analysis failed."
        );

      }


      setAnalysis(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // SCENARIO 2 - PURCHASE
  // ==========================================================

  const purchase2 = async () => {

    try {

      setLoading(true);
      setError("");

      const quantity =
        analysis?.remainingQuantity;


      if (!quantity || quantity <= 0) {

        throw new Error(
          "No valid remaining quantity."
        );

      }


      const response = await fetch(
        `${API}/api/scenario2/purchase`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            quantity
          })
        }
      );


      const data =
        await getJson(response);


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Alternate purchase failed."
        );

      }


      setPurchase(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // SCENARIO 2 - VALIDATE
  // ==========================================================

  const validate2 = async () => {

    try {

      setLoading(true);
      setError("");

      if (!purchase?.purchaseOrder) {

        throw new Error(
          "No purchase order found."
        );

      }


      const response = await fetch(
        `${API}/api/scenario2/validate`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            quantity:
              purchase.purchaseOrder.quantity,

            purchaseOrderId:
              purchase.purchaseOrder.purchaseOrderId

          })
        }
      );


      const data =
        await getJson(response);


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Validation failed."
        );

      }


      setValidation(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // CURRENT FUNCTIONS
  // ==========================================================

  const investigate =
    scenario === 1
      ? investigate1
      : investigate2;


  const analyze =
    scenario === 1
      ? analyze1
      : analyze2;


  const executePurchase =
    scenario === 1
      ? purchase1
      : purchase2;


  const validatePurchase =
    scenario === 1
      ? validate1
      : validate2;


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div className="brand">

          <div className="brand-icon">
            ✦
          </div>

          <div>

            <h2>
              PurchaseAI
            </h2>

            <span>
              Autonomous Procurement Agent
            </span>

          </div>

        </div>


        <div className="status">

          <span className="status-dot"></span>

          Agent Online

        </div>

      </header>


      {/* HERO */}

      <section className="hero">

        <div className="badge">
          ✦ AI-POWERED PROCUREMENT
        </div>

        <h1>
          Intelligent Purchasing Agent
        </h1>

        <p>
          Investigate purchasing situations,
          evaluate constraints, make decisions
          and validate procurement actions
          automatically.
        </p>


        {/* SCENARIO BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginTop: "30px"
          }}
        >

          <button
            className={
              scenario === 1
                ? "primary-button"
                : "secondary-button"
            }
            onClick={() => changeScenario(1)}
          >
            Scenario 1
          </button>


          <button
            className={
              scenario === 2
                ? "primary-button"
                : "secondary-button"
            }
            onClick={() => changeScenario(2)}
          >
            Scenario 2
          </button>

        </div>


        <div className="scenario-label">

          SCENARIO 0{scenario}

        </div>


        <h3>

          {scenario === 1
            ? "Purchase Recommendation Review"
            : "Supplier Cannot Fulfil the Purchase"}

        </h3>

      </section>


      {/* WORKFLOW */}

      <section className="workflow">

        <Step
          number="01"
          label="INVESTIGATE"
          active={!!situation}
        />

        <div className="line"></div>

        <Step
          number="02"
          label="ANALYZE"
          active={!!analysis}
        />

        <div className="line"></div>

        <Step
          number="03"
          label="DECIDE"
          active={!!analysis}
        />

        <div className="line"></div>

        <Step
          number="04"
          label="PURCHASE"
          active={!!purchase}
        />

        <div className="line"></div>

        <Step
          number="05"
          label="VALIDATE"
          active={!!validation}
        />

      </section>


      <main className="main-content">


        {/* ERROR */}

        {error && (

          <div className="error-box">

            <strong>
              ⚠ Error
            </strong>

            <span>
              {error}
            </span>

          </div>

        )}


        {/* INVESTIGATION */}

        <section className="section">

          <div className="section-header">

            <div>

              <span className="eyebrow">
                INVESTIGATION
              </span>

              <h2>
                Purchasing Situation
              </h2>

              <p>
                Relevant purchasing information
                collected before making a decision.
              </p>

            </div>


            <button
              className="primary-button"
              onClick={investigate}
              disabled={loading}
            >

              {loading
                ? "Investigating..."
                : "⌕ Investigate Situation"}

            </button>

          </div>


          {situation && (

            <div className="data-card">

              <div className="product-header">

                <div className="product-icon">
                  📱
                </div>

                <div>

                  <span className="small-label">
                    PRODUCT
                  </span>

                  <h2>
                    {situation.productName}
                  </h2>

                </div>

              </div>


              {scenario === 1 ? (

                <div className="metrics-grid">

                  <Metric
                    label="System Recommendation"
                    value={`${situation.recommendedQuantity} units`}
                    highlight
                  />

                  <Metric
                    label="Current Inventory"
                    value={`${situation.currentInventory} units`}
                  />

                  <Metric
                    label="Expected Demand"
                    value={`${situation.expectedDemand} units`}
                  />

                  <Metric
                    label="Open Purchase Orders"
                    value={`${situation.openPurchaseOrders} units`}
                  />

                  <Metric
                    label="Supplier"
                    value={situation.supplier.name}
                  />

                  <Metric
                    label="Lead Time"
                    value={`${situation.supplier.leadTimeDays} days`}
                  />

                  <Metric
                    label="Minimum Order"
                    value={`${situation.supplier.minimumOrderQuantity} units`}
                  />

                  <Metric
                    label="Unit Cost"
                    value={`₹${situation.unitCost.toLocaleString()}`}
                  />

                  <Metric
                    label="Available Budget"
                    value={`₹${situation.budgetAvailable.toLocaleString()}`}
                  />

                  <Metric
                    label="Storage Capacity"
                    value={`${situation.storageCapacity} units`}
                  />

                </div>

              ) : (

                <div className="metrics-grid">

                  <Metric
                    label="Purchase Order"
                    value={
                      situation.purchaseOrder.purchaseOrderId
                    }
                  />

                  <Metric
                    label="Ordered Quantity"
                    value={
                      `${situation.purchaseOrder.orderedQuantity} units`
                    }
                  />

                  <Metric
                    label="Primary Supplier"
                    value={
                      situation.primarySupplier.name
                    }
                  />

                  <Metric
                    label="Supplier Can Supply"
                    value={
                      `${situation.primarySupplier.availableQuantity} units`
                    }
                  />

                  <Metric
                    label="Remaining Quantity"
                    value={
                      `${situation.remainingQuantity} units`
                    }
                  />

                  <Metric
                    label="Current Inventory"
                    value={
                      `${situation.currentInventory} units`
                    }
                  />

                  <Metric
                    label="Expected Demand"
                    value={
                      `${situation.expectedDemand} units`
                    }
                  />

                  <Metric
                    label="Alternate Supplier"
                    value={
                      situation.alternateSupplier.name
                    }
                  />

                  <Metric
                    label="Alternate Stock"
                    value={
                      `${situation.alternateSupplier.availableQuantity} units`
                    }
                  />

                  <Metric
                    label="Alternate Unit Cost"
                    value={
                      `₹${situation.alternateSupplier.unitCost.toLocaleString()}`
                    }
                  />

                </div>

              )}

            </div>

          )}

        </section>


        {/* ANALYZE BUTTON */}

        {situation && !analysis && (

          <div className="center-action">

            <button
              className="analyze-button"
              onClick={analyze}
              disabled={loading}
            >

              {loading
                ? "Analyzing..."
                : "✦ Run Agent Analysis"}

            </button>

          </div>

        )}


        {/* ANALYSIS */}

        {analysis && (

          <section className="section decision-section">

            <div className="section-header">

              <div>

                <span className="eyebrow">
                  AGENT DECISION
                </span>

                <h2>
                  {scenario === 1
                    ? "Recommended Purchase"
                    : "Supplier Decision"}
                </h2>

                <p>
                  The agent evaluated the
                  available information and
                  purchasing constraints.
                </p>

              </div>


              <div className="decision-badge">

                {analysis.decision}

              </div>

            </div>


            <div className="decision-card">


              {/* SCENARIO 1 ANALYSIS */}

              {scenario === 1 && (

                <>

                  <div className="decision-top">

                    <div>

                      <span className="small-label">
                        AI RECOMMENDATION
                      </span>

                      <h1>

                        {
                          analysis.agentRecommendation.quantity
                        }

                        <span>
                          {" "}units
                        </span>

                      </h1>

                      <p>

                        Estimated Cost:{" "}

                        <strong>

                          ₹
                          {
                            analysis.agentRecommendation.cost.toLocaleString()
                          }

                        </strong>

                      </p>

                    </div>


                    <div className="ai-icon">
                      ✦
                    </div>

                  </div>


                  <div className="comparison">

                    <div className="comparison-item">

                      <span>
                        Original System Recommendation
                      </span>

                      <strong>

                        {
                          analysis.originalRecommendation.quantity
                        }
                        {" "}units

                      </strong>

                      <small>

                        ₹
                        {
                          analysis.originalRecommendation.cost.toLocaleString()
                        }

                      </small>

                    </div>


                    <div className="comparison-arrow">
                      →
                    </div>


                    <div className="comparison-item recommended">

                      <span>
                        Agent Recommendation
                      </span>

                      <strong>

                        {
                          analysis.agentRecommendation.quantity
                        }
                        {" "}units

                      </strong>

                      <small>

                        ₹
                        {
                          analysis.agentRecommendation.cost.toLocaleString()
                        }

                      </small>

                    </div>

                  </div>


                  <div className="reason-box">

                    <div className="reason-icon">
                      ✓
                    </div>

                    <div>

                      <strong>
                        Why this decision?
                      </strong>

                      <p>
                        {analysis.reason}
                      </p>

                    </div>

                  </div>


                  <div className="factor-grid">

                    <Factor
                      label="Inventory"
                      value={`${analysis.investigation.currentInventory} units`}
                    />

                    <Factor
                      label="Incoming PO"
                      value={`${analysis.investigation.openPurchaseOrders} units`}
                    />

                    <Factor
                      label="Total Available"
                      value={`${analysis.investigation.totalAvailable} units`}
                    />

                    <Factor
                      label="Demand"
                      value={`${analysis.investigation.expectedDemand} units`}
                    />

                    <Factor
                      label="Shortfall"
                      value={`${analysis.investigation.shortfall} units`}
                    />

                    <Factor
                      label="Budget"
                      value={
                        analysis.constraintChecks.budgetValid
                          ? "✓ Within limit"
                          : "✕ Exceeds limit"
                      }
                    />

                    <Factor
                      label="Storage"
                      value={
                        analysis.constraintChecks.storageValid
                          ? "✓ Available"
                          : "✕ Insufficient"
                      }
                    />

                    <Factor
                      label="Supplier MOQ"
                      value={
                        analysis.constraintChecks.minimumOrderValid
                          ? "✓ Satisfied"
                          : "✕ Not satisfied"
                      }
                    />

                  </div>


                  <div className="confidence">

                    <span>
                      Agent Confidence
                    </span>

                    <strong>
                      {analysis.confidence}%
                    </strong>

                  </div>


                  {analysis.agentRecommendation.quantity > 0 && (

                    <div className="action-area">

                      <button
                        className="purchase-button"
                        onClick={executePurchase}
                        disabled={loading}
                      >

                        {loading
                          ? "Creating Purchase..."
                          : "🛒 Execute Purchase Decision"}

                      </button>

                      <p>
                        The agent will create a
                        mock purchase order using
                        the recommended quantity.
                      </p>

                    </div>

                  )}

                </>

              )}


              {/* SCENARIO 2 ANALYSIS */}

              {scenario === 2 && (

                <>

                  <div className="decision-top">

                    <div>

                      <span className="small-label">
                        REMAINING QUANTITY
                      </span>

                      <h1>

                        {analysis.remainingQuantity}

                        <span>
                          {" "}units
                        </span>

                      </h1>

                      <p>

                        Alternate Cost:{" "}

                        <strong>

                          ₹
                          {
                            analysis.estimatedAlternateCost.toLocaleString()
                          }

                        </strong>

                      </p>

                    </div>


                    <div className="ai-icon">
                      ✦
                    </div>

                  </div>


                  <div className="reason-box">

                    <div className="reason-icon">
                      ✓
                    </div>

                    <div>

                      <strong>
                        Agent Decision
                      </strong>

                      <p>
                        {analysis.reason}
                      </p>

                    </div>

                  </div>


                  <div className="factor-grid">

                    <Factor
                      label="Original Order"
                      value={`${analysis.originalOrder} units`}
                    />

                    <Factor
                      label="Primary Supplier"
                      value={`${analysis.primarySupplierQuantity} units`}
                    />

                    <Factor
                      label="Remaining"
                      value={`${analysis.remainingQuantity} units`}
                    />

                    <Factor
                      label="Alternate Stock"
                      value={
                        analysis.constraintChecks.alternateSupplierAvailable
                          ? "✓ Available"
                          : "✕ Not Available"
                      }
                    />

                    <Factor
                      label="Budget"
                      value={
                        analysis.constraintChecks.budgetValid
                          ? "✓ Within limit"
                          : "✕ Exceeds limit"
                      }
                    />

                    <Factor
                      label="Supplier MOQ"
                      value={
                        analysis.constraintChecks.minimumOrderValid
                          ? "✓ Satisfied"
                          : "✕ Not satisfied"
                      }
                    />

                  </div>


                  <div className="reason-box">

                    <div className="reason-icon">
                      →
                    </div>

                    <div>

                      <strong>
                        Recommended Action
                      </strong>

                      <p>
                        {analysis.action}
                      </p>

                    </div>

                  </div>


                  {analysis.decision ===
                    "SOURCE FROM ALTERNATE SUPPLIER" && (

                    <div className="action-area">

                      <button
                        className="purchase-button"
                        onClick={executePurchase}
                        disabled={loading}
                      >

                        {loading
                          ? "Creating Purchase..."
                          : "🛒 Purchase Remaining Quantity"}

                      </button>

                      <p>
                        This will create a purchase
                        order with the alternate supplier
                        for the remaining quantity.
                      </p>

                    </div>

                  )}

                </>

              )}

            </div>

          </section>

        )}


        {/* PURCHASE RESULT */}

        {purchase && (

          <section className="result-card success-card">

            <div className="result-icon">
              ✓
            </div>

            <div className="result-content">

              <span className="eyebrow">
                PURCHASE ACTION
              </span>

              <h2>
                Purchase Order Created
              </h2>

              <p>
                {purchase.message}
              </p>


              <div className="po-details">

                <div>

                  <span>
                    PO ID
                  </span>

                  <strong>
                    {
                      purchase.purchaseOrder.purchaseOrderId
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    Product
                  </span>

                  <strong>
                    {
                      purchase.purchaseOrder.product
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    Supplier
                  </span>

                  <strong>
                    {
                      purchase.purchaseOrder.supplier
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    Quantity
                  </span>

                  <strong>
                    {
                      purchase.purchaseOrder.quantity
                    }{" "}
                    units
                  </strong>

                </div>


                <div>

                  <span>
                    Total Cost
                  </span>

                  <strong>
                    ₹
                    {
                      purchase.purchaseOrder.totalCost.toLocaleString()
                    }
                  </strong>

                </div>


                <div>

                  <span>
                    Status
                  </span>

                  <strong className="status-created">
                    CREATED
                  </strong>

                </div>

              </div>


              {!validation && (

                <button
                  className="validate-button"
                  onClick={validatePurchase}
                  disabled={loading}
                >

                  {loading
                    ? "Validating..."
                    : "✓ Validate Purchase Order"}

                </button>

              )}

            </div>

          </section>

        )}


        {/* VALIDATION */}

        {validation && (

          <section
            className={
              `validation-card ${
                validation.valid
                  ? "validation-success"
                  : "validation-failed"
              }`
            }
          >

            <div className="validation-icon">

              {validation.valid
                ? "✓"
                : "!"}

            </div>


            <div>

              <span className="eyebrow">
                VALIDATION
              </span>

              <h2>

                {validation.valid
                  ? "Purchase Successfully Validated"
                  : "Purchase Requires Review"}

              </h2>

              <p>
                {validation.message}
              </p>


              <div className="validation-checks">

                <Check
                  label="Budget"
                  valid={
                    validation.checks.budgetValid
                  }
                />


                <Check
                  label={
                    scenario === 1
                      ? "Storage"
                      : "Quantity"
                  }
                  valid={
                    scenario === 1
                      ? validation.checks.storageValid
                      : validation.checks.quantityValid
                  }
                />


                <Check
                  label="Supplier MOQ"
                  valid={
                    scenario === 1
                      ? validation.checks.minimumOrderValid
                      : validation.checks.minimumOrderValid
                  }
                />

              </div>

            </div>

          </section>

        )}

      </main>


      <footer>

        <div>

          <strong>
            PurchaseAI
          </strong>

          <span>
            Autonomous Procurement System
          </span>

        </div>

        <span>
          React • Node.js • Express
        </span>

      </footer>

    </div>

  );

}


// ============================================================
// COMPONENTS
// ============================================================

function Step({
  number,
  label,
  active
}) {

  return (

    <div
      className={
        `step ${active ? "active" : ""}`
      }
    >

      <div className="step-number">
        {number}
      </div>

      <span>
        {label}
      </span>

    </div>

  );

}


function Metric({
  label,
  value,
  highlight
}) {

  return (

    <div
      className={
        `metric ${
          highlight ? "highlight" : ""
        }`
      }
    >

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>

  );

}


function Factor({
  label,
  value
}) {

  return (

    <div className="factor">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>

  );

}


function Check({
  label,
  valid
}) {

  return (

    <div
      className={
        `check ${
          valid ? "valid" : "invalid"
        }`
      }
    >

      <span>
        {valid ? "✓" : "✕"}
      </span>

      {label}

    </div>

  );

}


export default App;