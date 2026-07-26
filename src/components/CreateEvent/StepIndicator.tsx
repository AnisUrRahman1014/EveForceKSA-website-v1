import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./StepIndicator.css";

export interface WizardStep {
  index: number;
  labelKey: string;
  path: string;
}

export const WIZARD_STEPS: WizardStep[] = [
  { index: 1, labelKey: "steps.eventDetails", path: "/events/create/details" },
  { index: 2, labelKey: "steps.rolesStaffing", path: "/events/create/roles" },
  { index: 3, labelKey: "steps.reviewListing", path: "/events/create/review" },
  { index: 4, labelKey: "steps.payAndPublish", path: "/events/create/payment" },
];

interface StepIndicatorProps {
  current: number;
  maxReached: number;
}

const StepIndicator = ({ current, maxReached }: StepIndicatorProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

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
                {t(step.labelKey)}
              </span>
            </button>
            {idx < WIZARD_STEPS.length - 1 && (
              <RightOutlined
                className="step-indicator__chevron"
                style={isRtl ? { transform: "rotate(180deg)" } : undefined}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
