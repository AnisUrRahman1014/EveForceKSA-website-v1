import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CreateOrganizerAccount from "../pages/CreateOrganizerAccount";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
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
  const { t } = useTranslation();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup/organizer" replace />} />
      <Route path="/signup/organizer" element={<CreateOrganizerAccount />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route element={<CreateEventWizard />}>
        <Route path="/events/create/details" element={<EventDetails />} />
        <Route path="/events/create/roles" element={<RolesStaffing />} />
        <Route path="/events/create/review" element={<ReviewListing />} />
        <Route path="/events/create/payment" element={<PaymentPublish />} />
      </Route>

      <Route
        path="/my-listings"
        element={<PlaceholderPage title={t("sidebar.myListings")} description={t("placeholders.myListingsDesc") ?? undefined} />}
      />
      <Route
        path="/applications"
        element={<PlaceholderPage title={t("sidebar.applications")} description={t("placeholders.applicationsDesc") ?? undefined} />}
      />
      <Route
        path="/messages"
        element={<PlaceholderPage title={t("sidebar.messages")} description={t("placeholders.messagesDesc") ?? undefined} />}
      />
      <Route
        path="/payments"
        element={<PlaceholderPage title={t("sidebar.payments")} description={t("placeholders.paymentsDesc") ?? undefined} />}
      />
      <Route
        path="/analytics"
        element={<PlaceholderPage title={t("sidebar.analytics")} description={t("placeholders.analyticsDesc") ?? undefined} />}
      />
      <Route
        path="/profile"
        element={<PlaceholderPage title={t("sidebar.profile")} description={t("placeholders.profileDesc") ?? undefined} />}
      />
      <Route
        path="/settings"
        element={<PlaceholderPage title={t("sidebar.settings")} description={t("placeholders.settingsDesc") ?? undefined} />}
      />

      <Route path="*" element={<Navigate to="/signup/organizer" replace />} />
    </Routes>
  );
};

export default AppRoutes;
