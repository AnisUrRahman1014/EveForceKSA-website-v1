import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import CreateOrganizerAccount from "../pages/CreateOrganizerAccount";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import PlaceholderPage from "../pages/PlaceholderPage";
import EventDetails from "../pages/CreateEvent/EventDetails";
import RolesStaffing from "../pages/CreateEvent/RolesStaffing";
import ReviewListing from "../pages/CreateEvent/ReviewListing";
import PaymentPublish from "../pages/CreateEvent/PaymentPublish";
import { EventFormProvider } from "../context/EventFormContext";

// Wraps the 4-step "Create New Event" wizard in a single shared form
// context instance so state persists as the organizer moves between steps.
const CreateEventWizard = () => (
  <EventFormProvider>
    <Outlet />
  </EventFormProvider>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup/organizer" replace />} />
      <Route path="/signup/organizer" element={<CreateOrganizerAccount />} />
      <Route path="/sign-in" element={<SignIn />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route element={<CreateEventWizard />}>
        <Route path="/events/create/details" element={<EventDetails />} />
        <Route path="/events/create/roles" element={<RolesStaffing />} />
        <Route path="/events/create/review" element={<ReviewListing />} />
        <Route path="/events/create/payment" element={<PaymentPublish />} />
      </Route>

      <Route
        path="/my-listings"
        element={<PlaceholderPage title="My Listings" description="All your published and draft event listings." />}
      />
      <Route
        path="/applications"
        element={<PlaceholderPage title="Applications" description="Review freelancer applications across your events." />}
      />
      <Route
        path="/messages"
        element={<PlaceholderPage title="Messages" description="Chat with freelancers and your on-site coordinator." />}
      />
      <Route
        path="/payments"
        element={<PlaceholderPage title="Payments" description="Track escrow payments and payout history." />}
      />
      <Route
        path="/analytics"
        element={<PlaceholderPage title="Analytics" description="Insights across your events and workforce spend." />}
      />
      <Route
        path="/profile"
        element={<PlaceholderPage title="Profile" description="Manage your organizer profile." />}
      />
      <Route
        path="/settings"
        element={<PlaceholderPage title="Settings" description="Manage account and notification preferences." />}
      />

      <Route path="*" element={<Navigate to="/signup/organizer" replace />} />
    </Routes>
  );
};

export default AppRoutes;
