import { BrowserRouter, Route, Routes } from "react-router-dom";
import Membros from "./components/PaginaDeMembros/Membros";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Login from "./components/Login/Login";
import Cadastro from "./components/CadastroUser/Cadastro";
import Error404 from "./components/Error404/Error404";
import EscolhaCarro from "./components/EscolhaCarro/EscolhaCarro";
import RelatorioDiagnoscar from "./components/RelatorioDiagnoscar/RelatorioDiagnoscar";
import Guincho from "./components/Guincho/Guincho";
import ObrigadoPorUsar from "./components/ObrigadoPorUsar/ObrigadoPorUsar";
import Oficinas from "./components/Oficinas/Oficinas";

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* Header */}

      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/envioGuincho" element={<Guincho />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/membros" element={<Membros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/escolhaCarro" element={<EscolhaCarro />} />
        <Route path="/relatoriodiagnoscar" element={<RelatorioDiagnoscar />} />
        <Route path="/Obrigado" element={<ObrigadoPorUsar />} />
        <Route path="/OficinasPerto" element={<Oficinas />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;