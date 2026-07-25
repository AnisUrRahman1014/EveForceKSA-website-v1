import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./StepIndicator.css";

export interface WizardStep {
  index: number;
  label: string;
  path: string;
}

export const WIZARD_STEPS: WizardStep[] = [
  { index: 1, label: "Event Details", path: "/events/create/details" },
  { index: 2, label: "Roles & Staffing", path: "/events/create/roles" },
  { index: 3, label: "Review Listing", path: "/events/create/review" },
  { index: 4, label: "Pay & Publish", path: "/events/create/payment" },
];

interface StepIndicatorProps {
  current: number;
  maxReached: number;
}

const StepIndicator = ({ current, maxReached }: StepIndicatorProps) => {
  const navigate = useNavigate();

  return (
    <div className="step-indicator">
      {WIZARD_STEPS.map((step, idx) => {
        const isActive = step.index === current;
        const isDone = step.index < current;
        const isReachable = step.index <= maxReached;

        return (
          <div className="step-indicator__item" key={step.index}>
            <button
              type="button"
              disabled={!isReachable}
              onClick={() => isReachable && navigate(step.path)}
              className={`step-indicator__step${isActive || isDone ? " step-indicator__step--on" : ""}`}
            >
              <span
                className={`step-indicator__circle${
                  isActive || isDone ? " step-indicator__circle--on" : ""
                }`}
              >
                {step.index}
              </span>
              <span
                className={`step-indicator__label${
                  isActive ? " step-indicator__label--active" : isDone ? " step-indicator__label--done" : ""
                }`}
              >
                {step.label}
              </span>
            </button>
            {idx < WIZARD_STEPS.length - 1 && (
              <RightOutlined className="step-indicator__chevron" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
