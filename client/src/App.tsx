import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import DefaultLayout from "./layouts/DefaultLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={DefaultLayout}>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
      </Route>

      <Route Component={AuthLayout}>
        <Route path="/dashboard" Component={DashboardHome} />
      </Route>

      <Route path="*" Component={NotFound} />
    </Routes>
  );
};

export default App;
