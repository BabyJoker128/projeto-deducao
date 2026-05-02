import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard';
import CaseDetails from './pages/caseDetails/CaseDetails'; // Atenção ao 'c' minúsculo
import AuthPage from './pages/Auth/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/acesso" element={<AuthPage />} />
        <Route path="/painel" element={<Dashboard />} />
        <Route path="/caso/:id" element={<CaseDetails />} />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

// ESTA LINHA É A QUE ESTÁ FALTANDO:
export default App;