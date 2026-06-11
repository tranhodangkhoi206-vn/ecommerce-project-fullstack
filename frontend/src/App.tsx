import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import UserProfilePage from "./pages/UserProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/users/me" element={<UserProfilePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
