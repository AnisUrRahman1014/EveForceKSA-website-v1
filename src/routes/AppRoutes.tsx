import { Routes, Route, Navigate } from "react-router-dom";
import CreateOrganizerAccount from "../pages/CreateOrganizerAccount";
import SignIn from "../pages/SignIn";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup/organizer" replace />} />
      <Route path="/signup/organizer" element={<CreateOrganizerAccount />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/signup/organizer" replace />} />
    </Routes>
  );
};

export default AppRoutes;
