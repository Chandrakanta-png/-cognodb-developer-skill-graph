import { useEffect, useState } from "react";
import { getHealth } from "../services/api";
import React from "react";

export default function Health() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      setLoading(true);

      const data = await getHealth();

      setHealth(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to connect to Django backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="health-card">
        <h1>Backend Health</h1>

        {loading && <p>Checking backend...</p>}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {health && (
          <>
            <div className="status">
              <span>Status</span>
              <strong>{health.status}</strong>
            </div>

            <div className="status">
              <span>CognoDB</span>

              <strong
                className={
                  health.cognodb ? "success-text" : "error-text"
                }
              >
                {health.cognodb ? "Connected" : "Disconnected"}
              </strong>
            </div>

            {health.message && (
              <div className="message">
                {health.message}
              </div>
            )}

            <button onClick={checkHealth}>
              Check Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}