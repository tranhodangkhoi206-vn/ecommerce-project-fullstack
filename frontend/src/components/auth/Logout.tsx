import useAuthStore from "@/stores/useAuthStore";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthStore();
  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };
  return <Button onClick={handleLogout}>Đăng xuất</Button>;
};

export default Logout;
