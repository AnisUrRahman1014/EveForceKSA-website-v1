import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthLayout from "../components/Layout/AuthLayout";
import SignupForm from "../components/SignupForm/SignupForm";

const CreateOrganizerAccount = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Create Organizer Account | EveForce</title>
        <meta
          name="description"
          content="Create your free EveForce organizer account to post events, hire verified freelancers, and manage attendance & payroll in one place."
        />
        <link rel="canonical" href="https://www.eveforce.com/signup/organizer" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Create Organizer Account | EveForce" />
        <meta
          property="og:description"
          content="Join EveForce and connect with thousands of skilled freelancers for your events."
        />
        <meta property="og:url" content="https://www.eveforce.com/signup/organizer" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Create Organizer Account | EveForce" />
        <meta
          name="twitter:description"
          content="Build your event workforce. Post events, hire trusted freelancers, and track attendance & payroll with EveForce."
        />
      </Helmet>

      <AuthLayout
        footerLink={
          <>
            {t("auth.haveAccount")} <Link to="/sign-in">{t("auth.signIn")}</Link>
          </>
        }
      >
        <SignupForm />
      </AuthLayout>
    </>
  );
};

export default CreateOrganizerAccount;
