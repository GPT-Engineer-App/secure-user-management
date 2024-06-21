import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import Index from "./pages/Index.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import ErrorFallback from "./components/ErrorFallback.jsx";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
    </ErrorBoundary>
  );
}

export default App;
