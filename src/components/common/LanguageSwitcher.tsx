import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { SUPPORTED_LANGUAGES } from "../../i18n";
import "./LanguageSwitcher.css";

interface LanguageSwitcherProps {
  compact?: boolean;
}

const LanguageSwitcher = ({ compact }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  return (
    <Select
      className={`language-switcher${compact ? " language-switcher--compact" : ""}`}
      value={i18n.language}
      size={compact ? "small" : "middle"}
      variant="borderless"
      suffixIcon={<GlobalOutlined />}
      onChange={(val) => i18n.changeLanguage(val)}
      options={SUPPORTED_LANGUAGES.map((l) => ({ value: l.code, label: l.label }))}
      popupMatchSelectWidth={false}
    />
  );
};

export default LanguageSwitcher;
