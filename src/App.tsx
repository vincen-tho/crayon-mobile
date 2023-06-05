import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  DashboardPage,
  RegisterPage,
  OtpPage,
  QrPage,
  TopupPage,
  TransferPage,
  ScanQrPage,
  HistoryPage,
  LogoutPage,
} from "./Pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/qr" element={<QrPage />} />
        <Route path="/topup" element={<TopupPage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/scan" element={<ScanQrPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>
    </>
  );
}

export default App;
