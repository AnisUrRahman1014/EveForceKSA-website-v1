import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

interface StaticPageProps {
  title: string;
  updated?: string;
  children: React.ReactNode;
}

const StaticPage = ({ title, updated = "July 2026", children }: StaticPageProps) => {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f6f8" }}>
      <Helmet>
        <title>{title} | EveForce</title>
      </Helmet>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 24px 80px" }}>
        <Link to="/signup/organizer" style={{ fontSize: 13, fontWeight: 600, color: "#2563eb" }}>
          ← Back to EveForce
        </Link>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: "20px 0 4px", color: "#101828" }}>
          {title}
        </h1>
        <p style={{ color: "#98a2b3", fontSize: 13, marginBottom: 32 }}>Last updated: {updated}</p>
        <div style={{ background: "#fff", border: "1px solid #eef0f3", borderRadius: 14, padding: "32px 36px", color: "#344054", fontSize: 14.5, lineHeight: 1.7 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
