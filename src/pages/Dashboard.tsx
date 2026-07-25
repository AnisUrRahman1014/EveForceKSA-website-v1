import { Helmet } from "react-helmet-async";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardLayout from "../components/Layout/DashboardLayout";
import "../components/CreateEvent/create-event.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <Helmet>
        <title>{t("dashboard.title")} | EveForce</title>
      </Helmet>

      <div className="page-header" style={{ marginBottom: 24 }}>
        <h1>{t("dashboard.title")}</h1>
        <p>{t("dashboard.welcome")}</p>
      </div>

      <div className="form-card">
        <h2>{t("dashboard.getStarted")}</h2>
        <p className="form-card__desc">{t("dashboard.getStartedDesc")}</p>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => navigate("/events/create/details")}
        >
          {t("common.createNewEvent")}
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
