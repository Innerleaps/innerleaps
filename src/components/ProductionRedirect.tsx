import { Navigate } from "react-router-dom";

interface ProductionRedirectProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProductionRedirect = ({ 
  children, 
  redirectTo = "/" 
}: ProductionRedirectProps) => {
  // In production, redirect to the specified path
  if (import.meta.env.PROD) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // In development, render the children normally
  return <>{children}</>;
};
