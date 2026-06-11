import Logout from "@/components/auth/Logout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/stores/useAuthStore";

const HomePage = () => {
  const { user, profile } = useAuthStore();
  const handleOnclick = async () => {
    await profile();
  };
  return (
    <>
      <Label>{user?.username}</Label>
      <Logout />
      <Button onClick={handleOnclick}>Trang cá nhân</Button>
    </>
  );
};

export default HomePage;
