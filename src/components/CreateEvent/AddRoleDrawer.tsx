import { useEffect, useState } from "react";
import { Drawer, Select, Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  ClockCircleOutlined,
  HolderOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AddRequirementModal from "./AddRequirementModal";
import { getRoleIcon } from "./roleIcons";
import {
  ROLE_TYPES,
  TIME_OPTIONS,
  SCHEDULE_DAYS,
} from "../../types/event";
import type { EventRole, RoleRequirement } from "../../types/event";

interface AddRoleDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (role: EventRole) => void;
  editingRole?: EventRole | null;
}

const emptyRole = (): EventRole => ({
  id: `role-${Date.now()}`,
  roleType: "",
  staffCount: 1,
  ratePerDay: 250,
  days: [],
  startTime: "1:00 PM",
  endTime: "4:00 PM",
  requirements: [],
});

const AddRoleDrawer = ({ open, onClose, onSave, editingRole }: AddRoleDrawerProps) => {
  const [role, setRole] = useState<EventRole>(emptyRole());
  const [reqModalOpen, setReqModalOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setRole(editingRole ? { ...editingRole } : emptyRole());
    }
  }, [open, editingRole]);

  const toggleDay = (dayKey: string) => {
    setRole((prev) => ({
      ...prev,
      days: prev.days.includes(dayKey)
        ? prev.days.filter((d) => d !== dayKey)
        : [...prev.days, dayKey],
    }));
  };

  const removeRequirement = (id: string) => {
    setRole((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((r) => r.id !== id),
    }));
  };

  const addRequirement = (req: RoleRequirement) => {
    setRole((prev) => ({ ...prev, requirements: [...prev.requirements, req] }));
  };

  const handleSave = () => {
    if (!role.roleType) return;
    onSave(role);
  };

  const requirementMenu = (id: string): MenuProps["items"] => [
    { key: "remove", label: "Remove", danger: true, onClick: () => removeRequirement(id) },
  ];

  return (
    <>
      <Drawer
        title="Add Role"
        open={open}
        onClose={onClose}
        width={460}
        destroyOnHidden
        footer={
          <div style={{ display: "flex", gap: 12 }}>
            <Button block size="large" onClick={onClose}>
              Cancel
            </Button>
            <Button block size="large" type="primary" onClick={handleSave} disabled={!role.roleType}>
              Add
            </Button>
          </div>
        }
      >
        <p className="form-section-title">1. Role Details</p>

        <div style={{ marginBottom: 20 }}>
          <p className="form-label">Role Type</p>
          <Select
            placeholder="Select"
            size="large"
            style={{ width: "100%" }}
            showSearch
            value={role.roleType || undefined}
            suffixIcon={undefined}
            prefix={role.roleType ? getRoleIcon(role.roleType) : <UserOutlined />}
            onChange={(val) => setRole((prev) => ({ ...prev, roleType: val }))}
            options={ROLE_TYPES.map((r) => ({ value: r, label: r }))}
            filterOption={(input, option) =>
              (option?.label as string).toLowerCase().includes(input.toLowerCase())
            }
          />
        </div>

        <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
          <div style={{ flex: 1 }}>
            <p className="form-label">No. of staff needed</p>
            <div className="stepper-input">
              <button
                type="button"
                onClick={() =>
                  setRole((prev) => ({ ...prev, staffCount: Math.max(1, prev.staffCount - 1) }))
                }
              >
                <MinusOutlined />
              </button>
              <span>{role.staffCount}</span>
              <button
                type="button"
                onClick={() => setRole((prev) => ({ ...prev, staffCount: prev.staffCount + 1 }))}
              >
                <PlusOutlined />
              </button>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <p className="form-label">Rate/ day (SAR)</p>
            <div className="stepper-input">
              <button
                type="button"
                onClick={() =>
                  setRole((prev) => ({ ...prev, ratePerDay: Math.max(0, prev.ratePerDay - 50) }))
                }
              >
                <MinusOutlined />
              </button>
              <span>{role.ratePerDay}</span>
              <button
                type="button"
                onClick={() => setRole((prev) => ({ ...prev, ratePerDay: prev.ratePerDay + 50 }))}
              >
                <PlusOutlined />
              </button>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <p className="form-label" style={{ marginBottom: 2 }}>
            Schedule
          </p>
          <p className="form-hint">Choose any available days</p>
        </div>
        <div className="schedule-days" style={{ marginBottom: 20 }}>
          {SCHEDULE_DAYS.map((day) => (
            <button
              type="button"
              key={day.key}
              className={`schedule-day${role.days.includes(day.key) ? " schedule-day--active" : ""}`}
              onClick={() => toggleDay(day.key)}
            >
              <span className="schedule-day__label">{day.label}</span>
              <span className="schedule-day__date">{day.date}</span>
              <span className="schedule-day__month">{day.month}</span>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <p className="form-label">Start Time</p>
            <Select
              size="large"
              style={{ width: "100%" }}
              value={role.startTime}
              suffixIcon={<ClockCircleOutlined />}
              onChange={(val) => setRole((prev) => ({ ...prev, startTime: val }))}
              options={TIME_OPTIONS.map((t) => ({ value: t, label: t }))}
            />
          </div>
          <div style={{ flex: 1 }}>
            <p className="form-label">End Time</p>
            <Select
              size="large"
              style={{ width: "100%" }}
              value={role.endTime}
              suffixIcon={<ClockCircleOutlined />}
              onChange={(val) => setRole((prev) => ({ ...prev, endTime: val }))}
              options={TIME_OPTIONS.map((t) => ({ value: t, label: t }))}
            />
          </div>
        </div>

        <p className="form-section-title">2. Specific Requirements</p>
        <p className="form-hint" style={{ marginBottom: 12 }}>
          Add requirement for this role
        </p>

        <Button
          block
          size="large"
          icon={<PlusOutlined />}
          onClick={() => setReqModalOpen(true)}
          style={{ marginBottom: 16 }}
        >
          Add Requirement
        </Button>

        {role.requirements.length > 0 && (
          <div className="requirement-list">
            {role.requirements.map((req) => (
              <div className="requirement-item" key={req.id}>
                <HolderOutlined className="requirement-item__handle" />
                <div className="requirement-item__body">
                  <p className="requirement-item__title">{req.type}</p>
                  {req.description && (
                    <p className="requirement-item__desc">{req.description}</p>
                  )}
                </div>
                <Dropdown menu={{ items: requirementMenu(req.id) }} trigger={["click"]}>
                  <button type="button" className="requirement-item__more">
                    <MoreOutlined />
                  </button>
                </Dropdown>
              </div>
            ))}
            <p className="form-hint" style={{ marginTop: 8 }}>
              Drag to reorder requirements
            </p>
          </div>
        )}
      </Drawer>

      <AddRequirementModal
        open={reqModalOpen}
        onClose={() => setReqModalOpen(false)}
        onAdd={addRequirement}
      />
    </>
  );
};

export default AddRoleDrawer;
