import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/common/auth/ProtectedRoute";
import Principal from "./pages/principal";
import Agendamentos from "./pages/Agendamentos";
import LoginForm from "./components/common/auth/LoginForm";
import Garantias from "./pages/Garantias";
import OrdensServico from "./pages/OrdensServico";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Principal />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
        <Route path="/garantias" element={<Garantias />} />
        <Route path="/ordens-servico" element={<OrdensServico />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
