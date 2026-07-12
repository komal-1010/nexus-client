import { Component, Suspense, use, type ReactNode } from "react";
import { checkHealth } from "./api/client";
import "./App.css";

function HealthStatus() {
  const data = use(checkHealth());

  return (
    <p className="ok">
      Server is healthy
      <span className="timestamp">
        {new Date(data.timestamp).toLocaleTimeString()}
      </span>
    </p>
  );
}

function HealthFallback() {
  return <p>Checking server…</p>;
}

function HealthError({ error }: { error: Error }) {
  return <p className="error">{error.message}</p>;
}

interface ErrorBoundaryProps {
  fallback: (error: Error) => ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render() {
    if (this.state.error) {
      return this.props.fallback(this.state.error);
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <main className="app">
      <h1>Nexus</h1>
      <p className="subtitle">React + Vite client</p>
      <section className="status-card">
        <h2>API Health</h2>
        <ErrorBoundary fallback={(error) => <HealthError error={error} />}>
          <Suspense fallback={<HealthFallback />}>
            <HealthStatus />
          </Suspense>
        </ErrorBoundary>
      </section>
    </main>
  );
}
