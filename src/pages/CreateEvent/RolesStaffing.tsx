import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
    { key: "edit", label: t("common.edit"), onClick: () => openEditRole(role) },
    { key: "remove", label: t("common.remove"), danger: true, onClick: () => removeRole(role.id) },
  ];

  const handleContinue = () => {
    navigate("/events/create/review");
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>{t("rolesStaffing.title")} | EveForce</title>
      </Helmet>

      <div className="page-header">
        <h1>{t("rolesStaffing.title")}</h1>
        <p>{t("rolesStaffing.subtitle")}</p>
      </div>

      <StepIndicator current={2} maxReached={2} />

      <div className="form-card">
        <h2>{t("rolesStaffing.builderTitle")}</h2>
        <p className="form-card__desc">{t("rolesStaffing.builderDesc")}</p>

        {roles.length > 0 && (
          <div className="role-builder-grid">
            {roles.map((role, idx) => (
              <div className="role-card" key={role.id}>
                <div className="role-card__head">
                  <span className="role-card__icon">{getRoleIcon(role.roleType)}</span>
                  <div>
                    <p className="role-card__title">{role.roleType}</p>
                    <p className="role-card__subtitle">
                      {t("rolesStaffing.role")} #{idx + 1}
                    </p>
                  </div>
                  <Dropdown menu={{ items: cardMenu(role) }} trigger={["click"]}>
                    <button type="button" className="role-card__more">
                      <MoreOutlined />
                    </button>
                  </Dropdown>
                </div>
                <div className="role-card__row">
                  <span className="role-card__row-label">
                    <TeamOutlined /> {t("rolesStaffing.noOfStaff")}
                  </span>
                  <span className="role-card__row-value">{role.staffCount}</span>
                </div>
                <div className="role-card__row">
                  <span className="role-card__row-label">
                    <CalendarOutlined /> {t("rolesStaffing.days")}
                  </span>
                  <span className="role-card__row-value">{dayRangeLabel(role.days)}</span>
                </div>
                <div className="role-card__row">
                  <span className="role-card__row-label">
                    <ClockCircleOutlined /> {t("rolesStaffing.time")}
                  </span>
                  <span className="role-card__row-value">
                    {role.startTime}-{role.endTime}
                  </span>
                </div>
                <div className="role-card__row">
                  <span className="role-card__row-label">
                    <CreditCardOutlined /> {t("rolesStaffing.ratePerDay")}
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
          <PlusOutlined /> {roles.length === 0 ? t("rolesStaffing.addNewRole") : t("rolesStaffing.addAnotherRole")}
        </button>
      </div>

      <div className="wizard-footer">
        <Button size="large" onClick={() => navigate("/events/create/details")}>
          {t("common.back")}
        </Button>
        <Button size="large">{t("common.saveAsDraft")}</Button>
        <Button size="large" type="primary" disabled={roles.length === 0} onClick={handleContinue}>
          {t("common.continue")}
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
