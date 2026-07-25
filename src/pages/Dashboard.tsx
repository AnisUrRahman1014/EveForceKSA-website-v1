import { Helmet } from "react-helmet-async";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/Layout/DashboardLayout";
import "../components/CreateEvent/create-event.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <Helmet>
        <title>Dashboard | EveForce</title>
      </Helmet>

      <div className="page-header" style={{ marginBottom: 24 }}>
        <h1>Dashboard</h1>
        <p>Welcome back, here's an overview of your organizer account.</p>
      </div>

      <div className="form-card">
        <h2>Get started</h2>
        <p className="form-card__desc">
          Create your first event listing and start staffing your workforce in minutes.
        </p>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => navigate("/events/create/details")}
        >
          Create New Event
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
