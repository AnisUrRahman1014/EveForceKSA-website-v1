import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  CalendarOutlined,
  TeamOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo.svg";
import heroCrowd from "../../assets/images/hero-crowd.jpg";
import "./AuthLayout.css";

interface AuthLayoutProps {
  children: ReactNode;
  subtitle?: string;
  footerLink?: ReactNode;
}

const features = [
  {
    icon: <CalendarOutlined />,
    title: "Post & manage Events",
    description: "Publish events and manage staffing requirements effortlessly.",
  },
  {
    icon: <TeamOutlined />,
    title: "Hire Trusted Freelancers",
    description: "Browse verified professionals and build your event workforce.",
  },
  {
    icon: <QrcodeOutlined />,
    title: "Attendance & Payroll",
    description: "Track attendance with QR check-ins and release payments securely.",
  },
];

const DEFAULT_SUBTITLE =
  "Join EveForce and connect with thousands of skilled freelancers for your events";

const AuthLayout = ({
  children,
  subtitle = DEFAULT_SUBTITLE,
  footerLink,
}: AuthLayoutProps) => {
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
          <Link to="/" className="auth-layout__logo">
            <img src={logo} alt="EveForce logo" height={26} />
          </Link>

          <h1 className="auth-layout__heading">
            Build Your Event
            <br />
            Workforce
          </h1>

          <p className="auth-layout__subheading">{subtitle}</p>

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
