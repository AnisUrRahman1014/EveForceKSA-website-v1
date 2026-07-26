import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CalendarOutlined,
  TeamOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo.svg";
import heroCrowd from "../../assets/images/hero-crowd.jpg";
import LanguageSwitcher from "../common/LanguageSwitcher";
import "./AuthLayout.css";

interface AuthLayoutProps {
  children: ReactNode;
  subtitle?: string;
  footerLink?: ReactNode;
}

const AuthLayout = ({ children, subtitle, footerLink }: AuthLayoutProps) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <CalendarOutlined />,
      title: t("authLayout.feature1Title"),
      description: t("authLayout.feature1Desc"),
    },
    {
      icon: <TeamOutlined />,
      title: t("authLayout.feature2Title"),
      description: t("authLayout.feature2Desc"),
    },
    {
      icon: <QrcodeOutlined />,
      title: t("authLayout.feature3Title"),
      description: t("authLayout.feature3Desc"),
    },
  ];

  return (
    <div className="auth-layout">
      <aside className="auth-layout__brand" aria-label="EveForce introduction">
        <div
          className="auth-layout__hero-bg"
          style={{ backgroundImage: `url(${heroCrowd})` }}
          role="img"
          aria-label="Concert crowd under stage lighting"
        />
        <div className="auth-layout__brand-inner">
          <div className="auth-layout__brand-top">
            <Link to="/" className="auth-layout__logo">
              <img src={logo} alt="EveForce logo" height={26} />
            </Link>
            <LanguageSwitcher compact variant="dark" />
          </div>

          <h1 className="auth-layout__heading">
            {t("authLayout.headingLine1")}
            <br />
            {t("authLayout.headingLine2")}
          </h1>

          <p className="auth-layout__subheading">{subtitle ?? t("authLayout.defaultSubtitle")}</p>

          <ul className="auth-layout__features">
            {features.map((feature) => (
              <li key={feature.title} className="auth-layout__feature">
                <span className="auth-layout__feature-icon">{feature.icon}</span>
                <div>
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>

          {footerLink && <p className="auth-layout__signin">{footerLink}</p>}
        </div>
      </aside>

      <main className="auth-layout__content">{children}</main>
    </div>
  );
};

export default AuthLayout;
