import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountsPage from "./pages/AccountsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import TransactionPage from "./pages/TransactionsPage";
import Logout from "./pages/Logout";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/*" element={<h1>Page not found</h1>} />
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/logout" element={<Logout />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route
            path="/accounts"
            element={
              <ProtectedRoute allowedRoles={["USERS"]}>
                <AccountsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute allowedRoles={["USERS"]}>
                <TransactionPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
