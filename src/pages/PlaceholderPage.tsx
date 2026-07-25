import { Helmet } from "react-helmet-async";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardLayout from "../components/Layout/DashboardLayout";
import "../components/CreateEvent/create-event.css";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <Helmet>
        <title>{title} | EveForce</title>
      </Helmet>
      <div className="page-header" style={{ marginBottom: 24 }}>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <div
        style={{
          background: "#fff",
          border: "1px solid #eef0f3",
          borderRadius: 14,
          padding: "64px 32px",
          textAlign: "center",
          color: "#667085",
        }}
      >
        <p style={{ marginBottom: 20 }}>{t("common.comingSoon")}</p>
        <Button type="primary" onClick={() => navigate("/events/create/details")}>
          {t("common.createNewEvent")}
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default PlaceholderPage;
