import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppstoreOutlined,
  PlusOutlined,
  CalendarOutlined,
  FileTextOutlined,
  MailOutlined,
  CreditCardOutlined,
  BarChartOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import dashboardLogo from "../../assets/DashboardLogo.svg";
import mldLogo from "../../assets/MLD.svg";
import verifyIcon from "../../assets/Verified.svg";
import LanguageSwitcher from "../common/LanguageSwitcher";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mainNav = [{ to: "/dashboard", label: t("sidebar.dashboard"), icon: <AppstoreOutlined /> }];

  const operationsNav = [
    { to: "/my-listings", label: t("sidebar.myListings"), icon: <CalendarOutlined /> },
    { to: "/applications", label: t("sidebar.applications"), icon: <FileTextOutlined />, badge: 8 },
    { to: "/messages", label: t("sidebar.messages"), icon: <MailOutlined /> },
    { to: "/payments", label: t("sidebar.payments"), icon: <CreditCardOutlined /> },
    { to: "/analytics", label: t("sidebar.analytics"), icon: <BarChartOutlined /> },
  ];

  const accountNav = [
    { to: "/profile", label: t("sidebar.profile"), icon: <UserOutlined /> },
    { to: "/settings", label: t("sidebar.settings"), icon: <SettingOutlined /> },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div>
          <div className="dashboard-sidebar__top">
            <button
              type="button"
              className="dashboard-sidebar__logo"
              onClick={() => navigate("/dashboard")}
            >
              <img
                src={dashboardLogo}
                alt="EveForce"
                className="dashboard-sidebar__logo-image"
              />
            </button>
            <LanguageSwitcher compact />
          </div>

          <nav className="dashboard-sidebar__nav">
            <p className="dashboard-sidebar__section-label">{t("sidebar.main")}</p>
            <ul>
              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `dashboard-sidebar__link${isActive ? " dashboard-sidebar__link--active" : ""}`
                    }
                  >
                    <span className="dashboard-sidebar__icon">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}

              <li>
                <NavLink
                  to="/events/create/details"
                  className={({ isActive }) =>
                    `dashboard-sidebar__cta${isActive ? " dashboard-sidebar__cta--active" : ""}`
                  }
                >
                  <PlusOutlined /> {t("sidebar.createNewEvent")}
                </NavLink>
              </li>
            </ul>

            <p className="dashboard-sidebar__section-label">{t("sidebar.operations")}</p>
            <ul>
              {operationsNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `dashboard-sidebar__link${isActive ? " dashboard-sidebar__link--active" : ""}`
                    }
                  >
                    <span className="dashboard-sidebar__icon">{item.icon}</span>

                    <span className="dashboard-sidebar__link-label">{item.label}</span>

                    {item.badge ? <Badge count={item.badge} size="small" color="#2563eb" /> : null}
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="dashboard-sidebar__section-label">{t("sidebar.account")}</p>
            <ul>
              {accountNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `dashboard-sidebar__link${isActive ? " dashboard-sidebar__link--active" : ""}`
                    }
                  >
                    <span className="dashboard-sidebar__icon">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="dashboard-sidebar__org">
          <img src={mldLogo} alt="MDLBEAST" className="dashboard-sidebar__org-logo" />

          <div className="dashboard-sidebar__org-content">
            <div className="dashboard-sidebar__org-header">
              <h4 className="dashboard-sidebar__org-name">
                {t("sidebar.orgName")}
                <img src={verifyIcon} alt="Verified" className="dashboard-sidebar__verify" />
              </h4>
            </div>

            <p className="dashboard-sidebar__org-sub">{t("sidebar.orgSub")}</p>
          </div>
        </div>
      </aside>

      <main className="dashboard-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
