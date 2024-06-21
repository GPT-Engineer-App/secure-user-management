import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import Index from "./pages/Index.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import FAQ from "./pages/FAQ.jsx";
import ContactForm from "./pages/ContactForm.jsx";
import LiveChat from "./pages/LiveChat.jsx";
import TicketingSystem from "./pages/TicketingSystem.jsx";
import Navigation from "./components/Navigation.jsx";

import ErrorFallback from "./components/ErrorFallback.jsx";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/live-chat" element={<LiveChat />} />
          <Route path="/tickets" element={<TicketingSystem />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;