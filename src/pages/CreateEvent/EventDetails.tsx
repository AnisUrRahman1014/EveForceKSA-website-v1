import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Input, Select, DatePicker, Checkbox, Button } from "antd";
import {
  GiftOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import StepIndicator from "../../components/CreateEvent/StepIndicator";
import { useEventForm } from "../../context/EventFormContext";
import {
  CATEGORY_OPTIONS,
  CITY_OPTIONS,
  EVENT_PERK_OPTIONS,
  EVENT_REQUIREMENT_OPTIONS,
  LANGUAGE_OPTIONS,
  TIME_OPTIONS,
} from "../../types/event";
import dashBoardCrowd from "../../assets/images/Dashboard-image.png";
import "../../components/CreateEvent/create-event.css";
import workForce from "..//..//assets/WorkForce.svg";
import Freelance from "..//..//assets/Freelance.svg";
import realTime from "..//..//assets/Realtime.svg";
import Support from "..//..//assets/Support.svg";
import locationIcon from "..//..//assets/images/Location.png";
const { TextArea } = Input;

const EventDetails = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { details, setDetails } = useEventForm();

  const toggleRequirement = (label: string) => {
    setDetails({
      requirements: details.requirements.includes(label)
        ? details.requirements.filter((r) => r !== label)
        : [...details.requirements, label],
    });
  };

  const togglePerk = (label: string) => {
    setDetails({
      perks: details.perks.includes(label)
        ? details.perks.filter((p) => p !== label)
        : [...details.perks, label],
    });
  };

  const handleContinue = () => {
    navigate("/events/create/roles");
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>{t("eventDetails.title")} | EveForce</title>
      </Helmet>

      <div className="page-header">
        <h1>{t("eventDetails.title")}</h1>
        <p>{t("eventDetails.subtitle")}</p>
      </div>

      <StepIndicator current={1} maxReached={1} />

      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${dashBoardCrowd})` }}
      >
        <div className="hero-banner__content">
          <span className="hero-banner__badge">
            <GiftOutlined /> {t("eventDetails.heroBadge")}
          </span>
          <h2 className="hero-banner__title">{t("eventDetails.heroTitle")}</h2>
          <p className="hero-banner__subtitle">{t("eventDetails.heroSubtitle")}</p>
          <p className="hero-banner__desc">{t("eventDetails.heroDesc")}</p>
          <div className="hero-banner__features">
          <div className="hero-banner__feature">
            <img src={workForce} alt="" className="hero-banner__feature-icon" />
            {t("eventDetails.heroFeature1")}
          </div>
            <div className="hero-banner__feature">
              <img src={Freelance} alt="" className="hero-banner__feature-icon" />
              {t("eventDetails.heroFeature2")}
            </div>
            <div className="hero-banner__feature">
              <img src={realTime} alt="" className="hero-banner__feature-icon" />
              {t("eventDetails.heroFeature3")}
            </div>
            <div className="hero-banner__feature">
              <img src={Support} alt="" className="hero-banner__feature-icon" />
              {t("eventDetails.heroFeature4")}
            </div>
          </div>
        </div>
      </div>

      <div className="form-card">
        <h2>{t("eventDetails.sectionTitle")}</h2>
        <p className="form-card__desc">{t("eventDetails.sectionDesc")}</p>

        <div className="form-row">
          <div>
            <p className="form-label">{t("eventDetails.eventName")}</p>
            <Input
              size="large"
              placeholder={t("eventDetails.eventNamePlaceholder") ?? undefined}
              value={details.eventName}
              onChange={(e) => setDetails({ eventName: e.target.value })}
            />
          </div>
          <div>
            <p className="form-label">{t("eventDetails.category")}</p>
            <Select
              size="large"
              placeholder={t("eventDetails.select") ?? undefined}
              style={{ width: "100%" }}
              value={details.category || undefined}
              onChange={(val) => setDetails({ category: val })}
              options={CATEGORY_OPTIONS.map((c) => ({ value: c, label: c }))}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <p className="form-label">{t("eventDetails.city")}</p>
            <Select
              size="large"
              placeholder={t("eventDetails.select") ?? undefined}
              style={{ width: "100%" }}
              value={details.city || undefined}
              onChange={(val) => setDetails({ city: val })}
              options={CITY_OPTIONS.map((c) => ({ value: c, label: c }))}
            />
          </div>
          <div>
            <p className="form-label">{t("eventDetails.location")}</p>

            <Input
              size="large"
              placeholder={t("eventDetails.locationPlaceholder") ?? undefined}
              suffix={
                <img
                  src={locationIcon}
                  alt="Location"
                />
              }
              value={details.location}
              onChange={(e) =>
                setDetails({ location: e.target.value })
              }
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <p className="form-label">{t("eventDetails.startDate")}</p>
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              format="DD/MM/YY"
              placeholder="dd/mm/yy"
              value={details.startDate ? dayjs(details.startDate) : null}
              onChange={(d) => setDetails({ startDate: d ? d.format("YYYY-MM-DD") : "" })}
            />
          </div>
          <div>
            <p className="form-label">{t("eventDetails.endDate")}</p>
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              format="DD/MM/YY"
              placeholder="dd/mm/yy"
              value={details.endDate ? dayjs(details.endDate) : null}
              onChange={(d) => setDetails({ endDate: d ? d.format("YYYY-MM-DD") : "" })}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <p className="form-label">{t("eventDetails.startTime")}</p>
            <Select
              size="large"
              placeholder={t("eventDetails.select") ?? undefined}
              style={{ width: "100%" }}
              value={details.startTime || undefined}
              onChange={(val) => setDetails({ startTime: val })}
              options={TIME_OPTIONS.map((time) => ({ value: time, label: time }))}
            />
          </div>
          <div>
            <p className="form-label">{t("eventDetails.endTime")}</p>
            <Select
              size="large"
              placeholder={t("eventDetails.select") ?? undefined}
              style={{ width: "100%" }}
              value={details.endTime || undefined}
              onChange={(val) => setDetails({ endTime: val })}
              options={TIME_OPTIONS.map((time) => ({ value: time, label: time }))}
            />
          </div>
        </div>

        <div style={{ marginBottom: 0 }}>
          <p className="form-label">{t("eventDetails.language")}</p>
          <Select
            mode="multiple"
            size="large"
            placeholder={t("eventDetails.select") ?? undefined}
            style={{ width: "100%" }}
            value={details.languages}
            onChange={(val) => setDetails({ languages: val })}
            options={LANGUAGE_OPTIONS.map((l) => ({ value: l, label: l }))}
          />
        </div>

        <div>
          <p className="form-label">{t("eventDetails.description")}</p>
          <TextArea
            rows={4}
            maxLength={500}
            showCount
            placeholder={t("eventDetails.descriptionPlaceholder") ?? undefined}
            value={details.description}
            onChange={(e) => setDetails({ description: e.target.value })}
          />
        </div>
      </div>

      <div className="form-card">
        <h2>{t("eventDetails.expiryTitle")}</h2>
        <p className="form-card__desc">{t("eventDetails.expiryDesc")}</p>

        <div className="form-row" style={{ marginBottom: 16 }}>
          <div>
            <p className="form-label">{t("eventDetails.expirationDate")}</p>
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              format="DD/MM/YY"
              placeholder="dd/mm/yy"
              value={details.expirationDate ? dayjs(details.expirationDate) : null}
              onChange={(d) => setDetails({ expirationDate: d ? d.format("YYYY-MM-DD") : "" })}
            />
          </div>
          <div>
            <p className="form-label">{t("eventDetails.expirationTime")}</p>
            <Select
              size="large"
              placeholder={t("eventDetails.select") ?? undefined}
              style={{ width: "100%" }}
              value={details.expirationTime || undefined}
              onChange={(val) => setDetails({ expirationTime: val })}
              options={TIME_OPTIONS.map((time) => ({ value: time, label: time }))}
            />
          </div>
        </div>

        <div className="info-banner" style={{ marginBottom: 0 }}>
          <ExclamationCircleOutlined style={{ marginTop: 2 }} />
          {t("eventDetails.expiryNotice")}
        </div>
      </div>

      <div className="form-card">
        <h2>{t("eventDetails.requirementsTitle")}</h2>

        <p className="form-card__desc">
          {t("eventDetails.requirementsDesc")}
        </p>

        <div className="checkbox-grid">
          {EVENT_REQUIREMENT_OPTIONS.map((req) => (
            <Checkbox
              key={req}
              checked={details.requirements.includes(req)}
              onChange={() => toggleRequirement(req)}
            >
              {req}
            </Checkbox>
          ))}
        </div>

        <Button
          size="middle"
          icon={<PlusOutlined />}
          className="add-requirement-btn"
        >
          {t("eventDetails.addRequirement")}
        </Button>
      </div>

      <div className="form-card">
        <h2>{t("eventDetails.perksTitle")}</h2>

        <p className="form-card__desc">
          {t("eventDetails.perksDesc")}
        </p>

        <div className="perk-grid">
          {EVENT_PERK_OPTIONS.map((perk) => (
            <button
              key={perk}
              type="button"
              className={`perk-chip${
                details.perks.includes(perk)
                  ? " perk-chip--active"
                  : ""
              }`}
              onClick={() => togglePerk(perk)}
            >
              {perk}
            </button>
          ))}
        </div>

        <Button
          size="middle"
          icon={<PlusOutlined />}
          className="add-perk-btn"
        >
          {t("eventDetails.addPerks")}
        </Button>
      </div>

      <div className="wizard-footer">
        <Button size="large">{t("common.saveAsDraft")}</Button>
        <Button size="large" type="primary" onClick={handleContinue}>
          {t("common.continue")}
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default EventDetails;
