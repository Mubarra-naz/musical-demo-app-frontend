import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Main from "./layout/Main";
import Home from "./components/Home/Home";

function App() {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Home />} />
        {!isAuth && <Route path="/login" element={<Login />} />}
        {!isAuth && <Route path="/signup" element={<Signup />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Main>
  );
}

export default App;
