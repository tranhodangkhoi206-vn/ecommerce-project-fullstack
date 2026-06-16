import useAuthStore from "@/stores/useAuthStore";
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { accessToken, user, loading, profile, refresh } = useAuthStore();
  const [starting, setStarting] = useState(true);
  const profileLoading = useRef(false);
  useEffect(() => {
    const init = async () => {
      if (!accessToken) {
        await refresh();
      }

      if (accessToken && !user && !profileLoading.current) {
        profileLoading.current = true;
        await profile();
      }

      setStarting(false);
    };

    init();
  }, []);

  if (starting || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Đang tải trang...
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet></Outlet>;
};

export default ProtectedRoute;
