import { useTranslation } from "react-i18next";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { CheckOutlined, GlobalOutlined, DownOutlined } from "@ant-design/icons";
import { SUPPORTED_LANGUAGES } from "../../i18n";
import "./LanguageSwitcher.css";

interface LanguageSwitcherProps {
  compact?: boolean;
  variant?: "light" | "dark";
}

const LanguageSwitcher = ({ compact, variant = "light" }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const current = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) ?? SUPPORTED_LANGUAGES[0];

  const items: MenuProps["items"] = SUPPORTED_LANGUAGES.map((lang) => ({
    key: lang.code,
    label: (
      <div className="language-switcher__option">
        <span className="language-switcher__option-flag">{lang.flag}</span>
        <span className="language-switcher__option-text">
          <span className="language-switcher__option-native">{lang.nativeLabel}</span>
          <span className="language-switcher__option-label">{lang.label}</span>
        </span>
        {lang.code === current.code && (
          <CheckOutlined className="language-switcher__option-check" />
        )}
      </div>
    ),
    onClick: () => i18n.changeLanguage(lang.code),
  }));

  return (
    <Dropdown
      menu={{ items, selectedKeys: [current.code] }}
      trigger={["click"]}
      placement="bottomRight"
      overlayClassName="language-switcher__menu"
    >
      <button
        type="button"
        className={`language-switcher-trigger${compact ? " language-switcher-trigger--compact" : ""} language-switcher-trigger--${variant}`}
      >
        <GlobalOutlined className="language-switcher-trigger__globe" />
        <span className="language-switcher-trigger__flag">{current.flag}</span>
        {!compact && <span className="language-switcher-trigger__code">{current.code.toUpperCase()}</span>}
        <DownOutlined className="language-switcher-trigger__chevron" />
      </button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
