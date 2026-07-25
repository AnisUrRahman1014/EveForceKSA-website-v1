import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  PlusOutlined,
  TeamOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import StepIndicator from "../../components/CreateEvent/StepIndicator";
import AddRoleDrawer from "../../components/CreateEvent/AddRoleDrawer";
import { getRoleIcon } from "../../components/CreateEvent/roleIcons";
import { useEventForm } from "../../context/EventFormContext";
import { SCHEDULE_DAYS } from "../../types/event";
import type { EventRole } from "../../types/event";
import "../../components/CreateEvent/create-event.css";

const dayRangeLabel = (days: string[]) => {
  if (days.length === 0) return "—";
  const ordered = SCHEDULE_DAYS.filter((d) => days.includes(d.key));
  if (ordered.length === 1) return `${ordered[0].month} ${ordered[0].date}`;
  const first = ordered[0];
  const last = ordered[ordered.length - 1];
  return `${first.month} ${first.date}-${last.month} ${last.date}`;
};

const RolesStaffing = () => {
  const navigate = useNavigate();
  const { roles, addRole, updateRole, removeRole } = useEventForm();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<EventRole | null>(null);

  const openNewRole = () => {
    setEditingRole(null);
    setDrawerOpen(true);
  };

  const openEditRole = (role: EventRole) => {
    setEditingRole(role);
    setDrawerOpen(true);
  };

  const handleSave = (role: EventRole) => {
    if (roles.some((r) => r.id === role.id)) {
      updateRole(role.id, role);
    } else {
      addRole(role);
    }
    setDrawerOpen(false);
  };

  const cardMenu = (role: EventRole): MenuProps["items"] => [
    { key: "edit", label: "Edit", onClick: () => openEditRole(role) },
    { key: "remove", label: "Remove", danger: true, onClick: () => removeRole(role.id) },
  ];

  const handleContinue = () => {
    navigate("/events/create/review");
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Roles & Staffing | EveForce</title>
      </Helmet>

      <div className="page-header">
        <h1>Roles & Staffing</h1>
        <p>Select your event team and define staffing, schedules, pay rates, and role-specific requirements.</p>
      </div>

      <StepIndicator current={2} maxReached={2} />

      <div className="form-card">
        <h2>Role Builder</h2>
        <p className="form-card__desc">
          Add and configure roles for your event. Each selected role will generate an individual listing.
        </p>

        {roles.length > 0 && (
          <div className="role-builder-grid">
            {roles.map((role, idx) => (
              <div className="role-card" key={role.id}>
                <div className="role-card__head">
                  <span className="role-card__icon">{getRoleIcon(role.roleType)}</span>
                  <div>
                    <p className="role-card__title">{role.roleType}</p>
                    <p className="role-card__subtitle">Role #{idx + 1}</p>
                  </div>
                  <Dropdown menu={{ items: cardMenu(role) }} trigger={["click"]}>
                    <button type="button" className="role-card__more">
                      <MoreOutlined />
                    </button>
                  </Dropdown>
                </div>
                <div className="role-card__row">
                  <span className="role-card__row-label">
                    <TeamOutlined /> No. of Staff
                  </span>
                  <span className="role-card__row-value">{role.staffCount}</span>
                </div>
                <div className="role-card__row">
                  <span className="role-card__row-label">
                    <CalendarOutlined /> Days
                  </span>
                  <span className="role-card__row-value">{dayRangeLabel(role.days)}</span>
                </div>
                <div className="role-card__row">
                  <span className="role-card__row-label">
                    <ClockCircleOutlined /> Time
                  </span>
                  <span className="role-card__row-value">
                    {role.startTime}-{role.endTime}
                  </span>
                </div>
                <div className="role-card__row">
                  <span className="role-card__row-label">
                    <CreditCardOutlined /> Rate/day
                  </span>
                  <span className="role-card__row-value" style={{ color: "#2563eb" }}>
                    {role.ratePerDay} SAR
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <button type="button" className="add-role-btn" onClick={openNewRole}>
          <PlusOutlined /> {roles.length === 0 ? "Add a new role" : "Add another role"}
        </button>
      </div>

      <div className="wizard-footer">
        <Button size="large" onClick={() => navigate("/events/create/details")}>
          Back
        </Button>
        <Button size="large">Save as Draft</Button>
        <Button size="large" type="primary" disabled={roles.length === 0} onClick={handleContinue}>
          Continue
        </Button>
      </div>

      <AddRoleDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={handleSave}
        editingRole={editingRole}
      />
    </DashboardLayout>
  );
};

export default RolesStaffing;
