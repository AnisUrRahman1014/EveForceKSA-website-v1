import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button, Input, message } from "antd";
import {
  UserOutlined,
  StarOutlined,
  ThunderboltOutlined,
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

const SERVICE_FEE_FLAT = 200;
const PLATFORM_FEE_RATE = 0.1;
const VAT_RATE = 0.15;

const dayCount = (days: string[]) => Math.max(days.length, 1);

const PaymentPublish = () => {
  const navigate = useNavigate();
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
      message.warning("Please enter your bank transfer reference number.");
      return;
    }
    message.success("Event published! Your listings are now live.");
    navigate("/my-listings");
  };

  const selectMode = (mode: HiringMode) => setHiringMode(mode);

  return (
    <DashboardLayout>
      <Helmet>
        <title>Payment Summary | EveForce</title>
      </Helmet>

      <div className="page-header">
        <h1>Payment Summary</h1>
        <p>Review the payroll breakdown and complete the payment to publish this event.</p>
      </div>

      <StepIndicator current={4} maxReached={4} />

      <div className="form-card">
        <h2>Payroll Breakdown</h2>
        <p className="form-card__desc" style={{ marginBottom: 8 }}>
          &nbsp;
        </p>
        {payrollRows.length === 0 ? (
          <p className="review-table__label">No roles configured yet.</p>
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
        <h2>Hiring Mode</h2>
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
                <TagOutlined /> No Additional Fee
              </span>
              <span className={`hiring-card__check${hiringMode === "self" ? " hiring-card__check--active" : ""}`}>
                <CheckOutlined />
              </span>
            </div>
            <div className="hiring-card__body">
              <span className="hiring-card__icon">
                <UserOutlined />
              </span>
              <div>
                <h3>I'll handle hiring myself</h3>
                <p>You review all applicants and approve or reject each one. Best for clients who want full control.</p>
              </div>
            </div>
            <div className="hiring-card__features">
              <div>
                <p className="hiring-card__feature-title">Manage candidate selection</p>
                <p className="hiring-card__feature-desc">Maintain complete control over staffing.</p>
              </div>
              <div>
                <p className="hiring-card__feature-title">Review &amp; approve applications</p>
                <p className="hiring-card__feature-desc">Approve or reject applicants yourself.</p>
              </div>
              <div>
                <p className="hiring-card__feature-title">Coordinate hiring decisions</p>
                <p className="hiring-card__feature-desc">Choose who works at your event.</p>
              </div>
            </div>
          </div>

          <div
            className={`hiring-card${hiringMode === "eveforce" ? " hiring-card--active" : ""}`}
            onClick={() => selectMode("eveforce")}
          >
            <div className="hiring-card__top">
              <span>
                <TagOutlined /> Additional Service Fee: {SERVICE_FEE_FLAT}
              </span>
              <span style={{ background: "#2563eb", color: "#fff", borderRadius: 999, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
                Recommended
              </span>
            </div>
            <div className="hiring-card__body">
              <span className="hiring-card__icon">
                <ThunderboltOutlined />
              </span>
              <div>
                <h3>Let EVEFORCE handle hiring</h3>
                <p>We will source, screen, and assign the most suitable freelancers for your event.</p>
              </div>
            </div>
            <div className="hiring-card__features">
              <div>
                <p className="hiring-card__feature-title">Best Talent Match</p>
                <p className="hiring-card__feature-desc">We match you with the most suitable, reliable talent.</p>
              </div>
              <div>
                <p className="hiring-card__feature-title">Faster Staffing</p>
                <p className="hiring-card__feature-desc">Save time with our efficient screening and selection.</p>
              </div>
              <div>
                <p className="hiring-card__feature-title">Replacement Support</p>
                <p className="hiring-card__feature-desc">We provide replacements if needed, at no extra cost.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-card">
        <h2>Total Payment</h2>
        <p className="form-card__desc" style={{ marginBottom: 8 }}>
          &nbsp;
        </p>
        <div className="total-payment-row">
          <span>Subtotal Payroll</span>
          <strong>{subtotal.toLocaleString()} SAR</strong>
        </div>
        <div className="total-payment-row">
          <span>Platform Service Fee (10%)</span>
          <strong>{platformFee.toLocaleString(undefined, { maximumFractionDigits: 2 })} SAR</strong>
        </div>
        {hiringMode === "eveforce" && (
          <div className="total-payment-row">
            <span>EVEFORCE Hiring Fee</span>
            <strong>{serviceFee.toLocaleString()} SAR</strong>
          </div>
        )}
        <div className="total-payment-row">
          <span>Vat 15%</span>
          <strong>{vat.toLocaleString(undefined, { maximumFractionDigits: 2 })} SAR</strong>
        </div>
        <div className="total-payment-row total-payment-row--grand">
          <span>Grand Total (Escrow)</span>
          <strong>{grandTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })} SAR</strong>
        </div>
      </div>

      <div className="info-banner">
        <SafetyOutlined style={{ marginTop: 2 }} />
        Your payment is held securely in escrow by EveForce. Funds are released to freelancers
        only after event completion and your confirmation.
      </div>

      <div className="form-card">
        <h2>Bank Transfer Details</h2>
        <p className="form-card__desc" style={{ marginBottom: 8 }}>
          &nbsp;
        </p>
        <div className="review-table" style={{ marginBottom: 20 }}>
          <div className="review-table__row">
            <span className="review-table__label">Account Name</span>
            <span className="review-table__value">EventForce Platform Services LLC</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">IBAN</span>
            <span className="review-table__value">SA12 3456 7890 1234 5678 9012</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">Bank Name</span>
            <span className="review-table__value">Al Rajhi Bank</span>
          </div>
          <div className="review-table__row">
            <span className="review-table__label">Reference</span>
            <span className="review-table__value" style={{ color: "#2563eb" }}>
              EF-2026-00842
            </span>
          </div>
        </div>

        <p className="form-label">
          Reference Number <span style={{ color: "#e04f4f" }}>*</span>
        </p>
        <Input
          size="large"
          placeholder="Enter your bank transfer reference number"
          value={referenceNumber}
          onChange={(e) => setReferenceNumber(e.target.value)}
        />
      </div>

      <div className="info-banner" style={{ background: "#fff7ed", borderColor: "#fed7aa", color: "#9a5b13" }}>
        <ExclamationCircleOutlined style={{ marginTop: 2 }} />
        <span>
          <StarOutlined /> Once published, freelancers will be able to view and apply to your
          listings immediately.
        </span>
      </div>

      <div className="wizard-footer">
        <Button size="large" onClick={() => navigate("/events/create/review")}>
          Back
        </Button>
        <Button size="large">Save as Draft</Button>
        <Button size="large" type="primary" onClick={handlePublish}>
          Publish
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default PaymentPublish;
