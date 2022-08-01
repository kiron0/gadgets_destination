import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const RequireUser = ({ children }) => {
  const [isAdmin, loading] = useAdmin();
  if (loading) return;
  if (isAdmin) {
    toast.success(`Please Admin Be noticed.`);
    return <Navigate to="/dashboard/" replace />;
  }
  return children;
};

export default RequireUser;