import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Input, Select, DatePicker, Checkbox, Button } from "antd";
import {
  GiftOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  SearchOutlined,
  CustomerServiceOutlined,
  EnvironmentOutlined,
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
import heroCrowd from "../../assets/images/hero-crowd.jpg";
import "../../components/CreateEvent/create-event.css";

const { TextArea } = Input;

const EventDetails = () => {
  const navigate = useNavigate();
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
        <title>Create New Event | EveForce</title>
      </Helmet>

      <div className="page-header">
        <h1>Create New Event</h1>
        <p>Create event and configure multiple freelancer roles under a single event</p>
      </div>

      <StepIndicator current={1} maxReached={1} />

      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${heroCrowd})` }}
      >
        <div className="hero-banner__content">
          <span className="hero-banner__badge">
            <GiftOutlined /> Included Organizer Benefit
          </span>
          <h2 className="hero-banner__title">On-site Event Coordinator</h2>
          <p className="hero-banner__subtitle">Included – At No Extra Cost</p>
          <p className="hero-banner__desc">
            Every event includes a professional on-site coordinator who oversees workforce
            operations, supports your team, and helps ensure smooth event execution from start
            to finish.
          </p>
          <div className="hero-banner__features">
            <div className="hero-banner__feature">
              <UsergroupAddOutlined /> On-site Workforce Supervision
            </div>
            <div className="hero-banner__feature">
              <TeamOutlined /> Freelancer Coordination
            </div>
            <div className="hero-banner__feature">
              <SearchOutlined /> Real-time issue resolution
            </div>
            <div className="hero-banner__feature">
              <CustomerServiceOutlined /> Direct support throughout the event
            </div>
          </div>
        </div>
      </div>

      <div className="form-card">
        <h2>Event Details</h2>
        <p className="form-card__desc">These details will be shared across every role created for this event</p>

        <div className="form-row">
          <div>
            <p className="form-label">Event Name</p>
            <Input
              size="large"
              placeholder="Enter event name"
              value={details.eventName}
              onChange={(e) => setDetails({ eventName: e.target.value })}
            />
          </div>
          <div>
            <p className="form-label">Category</p>
            <Select
              size="large"
              placeholder="Select"
              style={{ width: "100%" }}
              value={details.category || undefined}
              onChange={(val) => setDetails({ category: val })}
              options={CATEGORY_OPTIONS.map((c) => ({ value: c, label: c }))}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <p className="form-label">City</p>
            <Select
              size="large"
              placeholder="Select"
              style={{ width: "100%" }}
              value={details.city || undefined}
              onChange={(val) => setDetails({ city: val })}
              options={CITY_OPTIONS.map((c) => ({ value: c, label: c }))}
            />
          </div>
          <div>
            <p className="form-label">Location</p>
            <Input
              size="large"
              placeholder="Google maps link preferred"
              suffix={<EnvironmentOutlined style={{ color: "#98a2b3" }} />}
              value={details.location}
              onChange={(e) => setDetails({ location: e.target.value })}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <p className="form-label">Start Date</p>
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
            <p className="form-label">End Date</p>
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
            <p className="form-label">Start Time</p>
            <Select
              size="large"
              placeholder="Select"
              style={{ width: "100%" }}
              value={details.startTime || undefined}
              onChange={(val) => setDetails({ startTime: val })}
              options={TIME_OPTIONS.map((t) => ({ value: t, label: t }))}
            />
          </div>
          <div>
            <p className="form-label">End Time</p>
            <Select
              size="large"
              placeholder="Select"
              style={{ width: "100%" }}
              value={details.endTime || undefined}
              onChange={(val) => setDetails({ endTime: val })}
              options={TIME_OPTIONS.map((t) => ({ value: t, label: t }))}
            />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <p className="form-label">Language Proficiency (Select all that apply)</p>
          <Select
            mode="multiple"
            size="large"
            placeholder="Select"
            style={{ width: "100%" }}
            value={details.languages}
            onChange={(val) => setDetails({ languages: val })}
            options={LANGUAGE_OPTIONS.map((l) => ({ value: l, label: l }))}
          />
        </div>

        <div>
          <p className="form-label">Event Description</p>
          <TextArea
            rows={4}
            maxLength={500}
            showCount
            placeholder="Describe your event, objectives and other important details....."
            value={details.description}
            onChange={(e) => setDetails({ description: e.target.value })}
          />
        </div>
      </div>

      <div className="form-card">
        <h2>Listing Expiry</h2>
        <p className="form-card__desc">Set the deadline when this listing expires and freelancers can no longer apply.</p>

        <div className="form-row" style={{ marginBottom: 16 }}>
          <div>
            <p className="form-label">Expiration Date</p>
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
            <p className="form-label">Expiration Time</p>
            <Select
              size="large"
              placeholder="Select"
              style={{ width: "100%" }}
              value={details.expirationTime || undefined}
              onChange={(val) => setDetails({ expirationTime: val })}
              options={TIME_OPTIONS.map((t) => ({ value: t, label: t }))}
            />
          </div>
        </div>

        <div className="info-banner" style={{ marginBottom: 0 }}>
          <ExclamationCircleOutlined style={{ marginTop: 2 }} />
          We recommend setting the listing to expire at least 24–48 hours before your event
          starts to allow time for reviewing applications.
        </div>
      </div>

      <div className="form-card">
        <h2>Requirements</h2>
        <p className="form-card__desc">These apply to all freelancers for this event</p>

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
          block
          size="large"
          icon={<PlusOutlined />}
          style={{ marginTop: 18, borderStyle: "dashed" }}
        >
          Add additional requirement
        </Button>
      </div>

      <div className="form-card">
        <h2>Event Perks</h2>
        <p className="form-card__desc">Select all event perks that you'll be providing to the team</p>

        <div className="perk-grid">
          {EVENT_PERK_OPTIONS.map((perk) => (
            <button
              key={perk}
              type="button"
              className={`perk-chip${details.perks.includes(perk) ? " perk-chip--active" : ""}`}
              onClick={() => togglePerk(perk)}
            >
              {perk}
            </button>
          ))}
        </div>

        <Button
          block
          size="large"
          icon={<PlusOutlined />}
          style={{ marginTop: 18, borderStyle: "dashed" }}
        >
          Add additional perks
        </Button>
      </div>

      <div className="wizard-footer">
        <Button size="large">Save as Draft</Button>
        <Button size="large" type="primary" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default EventDetails;
