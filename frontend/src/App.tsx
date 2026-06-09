import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import UserProfilePage from "./pages/UserProfilePage";

const App = () => {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/users/me" element={<UserProfilePage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
