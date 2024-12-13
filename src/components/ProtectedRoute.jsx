import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/role.utils";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await getUserRole();
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (isLoading) {
    // Você pode exibir um spinner ou mensagem enquanto carrega
    return <p>Carregando...</p>;
  }

  if (!userRole) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/page-not-found" replace />;
  }

  return children;
};

export default ProtectedRoute;
