import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  SafetyCertificateFilled,
} from "@ant-design/icons";
import { Badge } from "antd";
import logo from "../../assets/logo.png";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children: ReactNode;
}

const mainNav = [
  { to: "/dashboard", label: "Dashboard", icon: <AppstoreOutlined /> },
];

const operationsNav = [
  { to: "/my-listings", label: "My Listings", icon: <CalendarOutlined /> },
  { to: "/applications", label: "Applications", icon: <FileTextOutlined />, badge: 8 },
  { to: "/messages", label: "Messages", icon: <MailOutlined /> },
  { to: "/payments", label: "Payments", icon: <CreditCardOutlined /> },
  { to: "/analytics", label: "Analytics", icon: <BarChartOutlined /> },
];

const accountNav = [
  { to: "/profile", label: "Profile", icon: <UserOutlined /> },
  { to: "/settings", label: "Settings", icon: <SettingOutlined /> },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div>
          <button
            type="button"
            className="dashboard-sidebar__logo"
            onClick={() => navigate("/dashboard")}
          >
            <img src={logo} alt="EveForce" height={22} />
          </button>

          <nav className="dashboard-sidebar__nav">
            <p className="dashboard-sidebar__section-label">Main</p>
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
                  <PlusOutlined /> Create New Event
                </NavLink>
              </li>
            </ul>

            <p className="dashboard-sidebar__section-label">Operations</p>
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
                    {item.badge ? (
                      <Badge count={item.badge} size="small" color="#2563eb" />
                    ) : null}
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="dashboard-sidebar__section-label">Account</p>
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
          <span className="dashboard-sidebar__org-avatar">
            <SafetyCertificateFilled />
          </span>
          <div>
            <p className="dashboard-sidebar__org-name">MDLBEAST</p>
            <p className="dashboard-sidebar__org-sub">MDLBeast Events</p>
          </div>
        </div>
      </aside>

      <main className="dashboard-content">{children}</main>
    </div>
  );
};

export default DashboardLayout;
