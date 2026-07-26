import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Button, Input, message } from "antd";
import {
  StarOutlined,
  SafetyOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
  TagOutlined,
} from "@ant-design/icons";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import StepIndicator from "../../components/CreateEvent/StepIndicator";
import { useEventForm } from "../../context/EventFormContext";
import type { HiringMode } from "../../context/EventFormContext";
import "../../components/CreateEvent/create-event.css";
import PP from "../../assets/Profile-payment.svg";
import HR from "../../assets/Hiring-payment.svg";
import vector from "../../assets/Vector.svg";
import userLogo from "../../assets/User-Logo.svg";
import Faster from "../../assets/Faster.svg";
import Replace from "../../assets/Replace.svg";
const SERVICE_FEE_FLAT = 200;
const PLATFORM_FEE_RATE = 0.1;
const VAT_RATE = 0.15;

const dayCount = (days: string[]) => Math.max(days.length, 1);

const PaymentPublish = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { roles, hiringMode, setHiringMode, referenceNumber, setReferenceNumber } = useEventForm();

  const payrollRows = useMemo(
    () =>
      roles.map((role) => {
        const days = dayCount(role.days);
        return {
          id: role.id,
          roleType: role.roleType,
          staffCount: role.staffCount,
          days,
          ratePerDay: role.ratePerDay,
          amount: days * role.ratePerDay * role.staffCount,
        };
      }),
    [roles]
  );

  const subtotal = payrollRows.reduce((sum, r) => sum + r.amount, 0);
  const platformFee = subtotal * PLATFORM_FEE_RATE;
  const serviceFee = hiringMode === "eveforce" ? SERVICE_FEE_FLAT : 0;
  const vat = (subtotal + platformFee + serviceFee) * VAT_RATE;
  const grandTotal = subtotal + platformFee + serviceFee + vat;

  const handlePublish = () => {
    if (!referenceNumber.trim()) {
      message.warning(t("payment.referenceMissing") ?? undefined);
      return;
    }
    message.success(t("payment.publishSuccess") ?? undefined);
    navigate("/my-listings");
  };

  const selectMode = (mode: HiringMode) => setHiringMode(mode);

  return (
    <DashboardLayout>
      <Helmet>
        <title>{t("payment.title")} | EveForce</title>
      </Helmet>

      <div className="page-header">
        <h1>{t("payment.title")}</h1>
        <p>{t("payment.subtitle")}</p>
      </div>

      <StepIndicator current={4} maxReached={4} />

      <div className="form-card">
        <h2>{t("payment.payrollBreakdown")}</h2>
        <p className="form-card__desc" style={{ marginBottom: 8 }}>
          &nbsp;
        </p>
        {payrollRows.length === 0 ? (
          <p className="review-table__label">{t("payment.noRoles")}</p>
        ) : (
          payrollRows.map((row) => (
            <div className="payroll-row" key={row.id}>
              <div>
                <p className="payroll-row__title">
                  {row.roleType} ×{row.staffCount}
                </p>
                <p className="payroll-row__sub">
                  {row.days} days × SAR {row.ratePerDay}
                </p>
              </div>
              <span className="payroll-row__amount">{row.amount.toLocaleString()} SAR</span>
            </div>
          ))
        )}
      </div>

      <div className="form-card">
        <h2>{t("payment.hiringMode")}</h2>
        <p className="form-card__desc" style={{ marginBottom: 8 }}>
          &nbsp;
        </p>
        <div className="hiring-mode-grid">
          <div
            className={`hiring-card${hiringMode === "self" ? " hiring-card--active" : ""}`}
            onClick={() => selectMode("self")}
          >
            <div className="hiring-card__top">
              <span>
                <TagOutlined /> {t("payment.noAdditionalFee")}
              </span>
              <span className={`hiring-card__check${hiringMode === "self" ? " hiring-card__check--active" : ""}`}>
                <CheckOutlined />
              </span>
            </div>
            <div className="hiring-card__body">
              <span className="hiring-card__icon">
              <img src={PP} alt="Profile" width={40} height={40} />
              </span>
              <div>
                <h3>{t("payment.selfTitle")}</h3>
                <p>{t("payment.selfDesc")}</p>
              </div>
            </div>
            <div className="hiring-card__features">
              <div>
                <p className="hiring-card__feature-title">{t("payment.selfFeature1Title")}</p>
                <p className="hiring-card__feature-desc">{t("payment.selfFeature1Desc")}</p>
              </div>
              <div>
                <p className="hiring-card__feature-title">{t("payment.selfFeature2Title")}</p>
                <p className="hiring-card__feature-desc">{t("payment.selfFeature2Desc")}</p>
              </div>
              <div>
                <p className="hiring-card__feature-title">{t("payment.selfFeature3Title")}</p>
                <p className="hiring-card__feature-desc">{t("payment.selfFeature3Desc")}</p>
              </div>
            </div>
          </div>

          <div
            className={`hiring-card${hiringMode === "eveforce" ? " hiring-card--active" : ""}`}
            onClick={() => selectMode("eveforce")}
          >
            <div className="hiring-card__top">
            <span className="hiring-card__fee">
              <TagOutlined /> {t("payment.additionalServiceFee")}:{" "}
              <img
                src={vector}
                alt=""
                style={{ width: 14, height: 14, margin: "0 2px 0 4px", verticalAlign: "middle" }}
              />
              <span style={{ color: "#2563eb", fontWeight: 600 }}>{SERVICE_FEE_FLAT}</span>
            </span>
              <span
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  borderRadius: 999,
                  padding: "2px 10px",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {t("payment.recommended")}
              </span>
            </div>
            <div className="hiring-card__body">
              <span className="hiring-card__icon">
                <img src={HR} alt="Profile" width={40} height={40} />
              </span>
              <div>
                <h3>{t("payment.eveforceTitle")}</h3>
                <p>{t("payment.eveforceDesc")}</p>
              </div>
            </div>
          <div className="hiring-card__features">
            <div className="hiring-card__feature">
              <img
                src={userLogo}
                alt=""
                className="hiring-card__feature-icon"
              />
              <div className="hiring-card__feature-content">
                <p className="hiring-card__feature-title">
                  {t("payment.eveforceFeature1Title")}
                </p>
                <p className="hiring-card__feature-desc">
                  {t("payment.eveforceFeature1Desc")}
                </p>
              </div>
            </div>

            <div className="hiring-card__feature">
              <img
                src={Faster}
                alt=""
                className="hiring-card__feature-icon"
              />
              <div className="hiring-card__feature-content">
                <p className="hiring-card__feature-title">
                  {t("payment.eveforceFeature2Title")}
                </p>
                <p className="hiring-card__feature-desc">
                  {t("payment.eveforceFeature2Desc")}
                </p>
              </div>
            </div>

            <div className="hiring-card__feature">
              <img
                src={Replace}
                alt=""
                className="hiring-card__feature-icon"
              />
              <div className="hiring-card__feature-content">
                <p className="hiring-card__feature-title">
                  {t("payment.eveforceFeature3Title")}
                </p>
                <p className="hiring-card__feature-desc">
                  {t("payment.eveforceFeature3Desc")}
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="form-card">
        <h2>{t("payment.totalPayment")}</h2>
        <p className="form-card__desc" style={{ marginBottom: 8 }}>
          &nbsp;
        </p>
        <div className="total-payment-row">
          <span>{t("payment.subtotalPayroll")}</span>
          <strong>{subtotal.toLocaleString()} SAR</strong>
        </div>
        <div className="total-payment-row">
          <span>{t("payment.platformFee")}</span>
          <strong>{platformFee.toLocaleString(undefined, { maximumFractionDigits: 2 })} SAR</strong>
        </div>
        {hiringMode === "eveforce" && (
          <div className="total-payment-row">
            <span>{t("payment.eveforceFee")}</span>
            <strong>{serviceFee.toLocaleString()} SAR</strong>
          </div>
        )}
        <div className="total-payment-row">
          <span>{t("payment.vat")}</span>
          <strong>{vat.toLocaleString(undefined, { maximumFractionDigits: 2 })} SAR</strong>
        </div>
        <div className="total-payment-row total-payment-row--grand">
          <span>{t("payment.grandTotal")}</span>
          <strong>{grandTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })} SAR</strong>
        </div>
      </div>

      <div className="info-banner">
        <SafetyOutlined style={{ marginTop: 2 }} />
        {t("payment.escrowNotice")}
      </div>

      <div className="form-card">
        <h2>{t("payment.bankDetails")}</h2>
        <p className="form-card__desc" style={{ marginBottom: 8 }}>
          &nbsp;
        </p>
        <div className="review-table" style={{ marginBottom: 20 }}>
          <div className="review-table__row">
            <span className="review-table__label">{t("payment.accountName")}</span>
            <span className="review-table__value">EventForce Platform Services LLC</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("payment.iban")}</span>
            <span className="review-table__value">SA12 3456 7890 1234 5678 9012</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("payment.bankName")}</span>
            <span className="review-table__value">Al Rajhi Bank</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">{t("payment.reference")}</span>
            <span className="review-table__value" style={{ color: "#2563eb" }}>
              EF-2026-00842
            </span>
          </div>
        </div>

        <p className="form-label">
          {t("payment.referenceNumber")} <span style={{ color: "#e04f4f" }}>*</span>
        </p>
        <Input
          size="large"
          placeholder={t("payment.referencePlaceholder") ?? undefined}
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
        />
      </div>

      <div className="info-banner" style={{ background: "#fff7ed", borderColor: "#fed7aa", color: "#9a5b13" }}>
        <ExclamationCircleOutlined style={{ marginTop: 2 }} />
        <span>
          <StarOutlined /> {t("payment.publishedNotice")}
        </span>
      </div>

      <div className="wizard-footer">
        <Button size="large" onClick={() => navigate("/events/create/review")}>
          {t("common.back")}
        </Button>
        <Button size="large">{t("common.saveAsDraft")}</Button>
        <Button size="large" type="primary" onClick={handlePublish}>
          {t("common.publish")}
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default PaymentPublish;
