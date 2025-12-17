import { selectCurrentUser } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  roles: Role[];
}

const AdminRoutes = ({ children }: { children: React.ReactNode }) => {
  // Recuperation du state user
  // const user: User | null = useSelector(selectCurrentUser);
  const user = JSON.parse(localStorage.getItem("user"))
  let isAdmin = false;

  // Return true si l'utlisateur a un role Admin
  user?.roles?.map((role) => {
    if (role.name == "Admin") {
      isAdmin = true;
    }
  });

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoutes;
