import { useEffect, useState } from "react";
import { checkHealth } from "./api/client";
import "./App.css";

function App() {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkHealth()
      .then((data) => {
        setStatus(data.status === "ok" ? "ok" : "error");
      })
      .catch((err: Error) => {
        setStatus("error");
        setError(err.message);
      });
  }, []);

  return (
    <main className="app">
      <h1>Nexus</h1>
      <p className="subtitle">React + Vite client</p>
      <section className="status-card">
        <h2>API Health</h2>
        {status === "loading" && <p>Checking server…</p>}
        {status === "ok" && <p className="ok">Server is healthy</p>}
        {status === "error" && (
          <p className="error">{error ?? "Server unreachable"}</p>
        )}
      </section>
    </main>
  );
}

export default App;
