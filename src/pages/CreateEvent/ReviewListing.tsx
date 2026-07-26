import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { EditOutlined } from "@ant-design/icons";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import StepIndicator from "../../components/CreateEvent/StepIndicator";
import { getRoleIcon } from "../../components/CreateEvent/roleIcons";
import { useEventForm } from "../../context/EventFormContext";
import { SCHEDULE_DAYS } from "../../types/event";
import "../../components/CreateEvent/create-event.css";

const dayRangeLabel = (days: string[]) => {
  if (days.length === 0) return "—";
  const ordered = SCHEDULE_DAYS.filter((d) => days.includes(d.key));
  if (ordered.length === 1) return `${ordered[0].month} ${ordered[0].date}`;
  const first = ordered[0];
  const last = ordered[ordered.length - 1];
  return `${first.month} ${first.date}-${last.month} ${last.date}`;
};

const formatDate = (val: string) => {
  if (!val) return "—";
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return val;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const ReviewListing = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { details, roles } = useEventForm();

  const openPositions = useMemo(
    () => roles.reduce((sum, r) => sum + r.staffCount, 0),
    [roles]
  );

  const editMenu = (path: string): MenuProps["items"] => [
    { key: "edit", label: t("common.editSection"), onClick: () => navigate(path) },
  ];

  const handleContinue = () => {
    navigate("/events/create/payment");
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>{t("reviewListing.title")} | EveForce</title>
      </Helmet>

      <div className="page-header">
        <h1>{t("reviewListing.title")}</h1>
        <p>{t("reviewListing.subtitle")}</p>
      </div>

      <StepIndicator current={3} maxReached={3} />

      <div className="form-card">
        <div className="section-head">
          <h2>{t("reviewListing.eventDetails")}</h2>
          <Dropdown menu={{ items: editMenu("/events/create/details") }} trigger={["click"]}>
            <button type="button">
              <EditOutlined />
            </button>
          </Dropdown>
        </div>
        <div className="review-table">
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.eventTitle")}</span>
            <span className="review-table__value">{details.eventName || "—"}</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.eventCategory")}</span>
            <span className="review-table__value">{details.category || "—"}</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.city")}</span>
            <span className="review-table__value">{details.city || "—"}</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.location")}</span>
            <span className="review-table__value" style={{ color: "#2563eb" }}>
              {details.location || "—"}
            </span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.startTime")}</span>
            <span className="review-table__value">{details.startTime || "—"}</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.endTime")}</span>
            <span className="review-table__value">{details.endTime || "—"}</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.startDate")}</span>
            <span className="review-table__value">{formatDate(details.startDate)}</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.endDate")}</span>
            <span className="review-table__value">{formatDate(details.endDate)}</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.language")}</span>
            <span className="review-table__value">
              {details.languages.length ? details.languages.join(", ") : "—"}
            </span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.expirationDate")}</span>
            <span className="review-table__value">{formatDate(details.expirationDate)}</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.expirationTime")}</span>
            <span className="review-table__value">{details.expirationTime || "—"}</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.selectedRoles")}</span>
            <span className="review-table__value">{roles.length}</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("reviewListing.openPositions")}</span>
            <span className="review-table__value">{openPositions}</span>
          </div>
        </div>
      </div>

      <div className="form-card">
        <div className="section-head">
          <h2>{t("reviewListing.requirements")}</h2>
          <Dropdown menu={{ items: editMenu("/events/create/details") }} trigger={["click"]}>
            <button type="button">
              <EditOutlined />
            </button>
          </Dropdown>
        </div>
        <div className="tag-grid">
          {details.requirements.length ? (
            details.requirements.map((req) => (
              <span className="tag-grid__item" key={req}>
                • {req}
              </span>
            ))
          ) : (
            <span className="review-table__label">{t("reviewListing.noRequirements")}</span>
          )}
        </div>
      </div>

      <div className="form-card">
        <div className="section-head">
          <h2>{t("reviewListing.perks")}</h2>
          <Dropdown menu={{ items: editMenu("/events/create/details") }} trigger={["click"]}>
            <button type="button">
              <EditOutlined />
            </button>
          </Dropdown>
        </div>
        <div className="perk-pill-grid">
          {details.perks.length ? (
            details.perks.map((perk) => (
              <span className="perk-pill" key={perk}>
                {perk}
              </span>
            ))
          ) : (
            <span className="review-table__label">{t("reviewListing.noPerks")}</span>
          )}
        </div>
      </div>

      <div className="form-card">
        <div className="section-head">
          <h2>{t("reviewListing.rolesOverview")}</h2>
          <Dropdown menu={{ items: editMenu("/events/create/roles") }} trigger={["click"]}>
            <button type="button">
              <EditOutlined />
            </button>
          </Dropdown>
        </div>
        {roles.length === 0 ? (
          <p className="review-table__label">{t("reviewListing.noRoles")}</p>
        ) : (
          <div className="role-builder-grid">
            {roles.map((role, idx) => (
              <div className="role-card" key={role.id}>
                <div className="role-card__head">
                  <span className="role-card__icon">{getRoleIcon(role.roleType)}</span>
                  <div>
                    <p className="role-card__title">{role.roleType}</p>
                    <p className="role-card__subtitle">Role #{idx + 1}</p>
                  </div>
                </div>
                <div className="role-card__row">
                  <span className="role-card__row-label">{t("rolesStaffing.noOfStaff")}</span>
                  <span className="role-card__row-value">{role.staffCount}</span>
                </div>
                <div className="role-card__row">
                  <span className="role-card__row-label">{t("rolesStaffing.days")}</span>
                  <span className="role-card__row-value">{dayRangeLabel(role.days)}</span>
                </div>
                <div className="role-card__row">
                  <span className="role-card__row-label">{t("rolesStaffing.time")}</span>
                  <span className="role-card__row-value">
                    {role.startTime}-{role.endTime}
                  </span>
                </div>
                <div className="role-card__row">
                  <span className="role-card__row-label">{t("rolesStaffing.ratePerDay")}</span>
                  <span className="role-card__row-value" style={{ color: "#2563eb" }}>
                    {role.ratePerDay} SAR
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="wizard-footer">
        <Button size="large" onClick={() => navigate("/events/create/roles")}>
          {t("common.back")}
        </Button>
        <Button size="large">{t("common.saveAsDraft")}</Button>
        <Button size="large" type="primary" onClick={handleContinue}>
          {t("common.continue")}
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default ReviewListing;
