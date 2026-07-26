import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Button, message } from "antd";
import {
  EditOutlined,
  ShareAltOutlined,
  CheckCircleFilled,
  EnvironmentOutlined,
  LinkOutlined,
  BankOutlined,
  CheckCircleOutlined,
  StarFilled,
  StarOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import SocialIcon from "../../components/Profile/SocialIcon";
import type { SocialPlatform } from "../../components/Profile/SocialIcon";
import { useOrganizationProfile } from "../../context/OrganizationProfileContext";
import "../../components/Profile/profile.css";
import "../../components/CreateEvent/create-event.css";

type ProfileTab = "about" | "reviews";

const AVATAR_COLORS = ["#2563eb", "#0d9488", "#c2410c"];

const REVIEWS = [
  {
    id: "r1",
    name: "Omar Al-Harbi",
    roleKey: "profileSample.review1Role",
    rating: 4,
    timeKey: "profileSample.review1TimeAgo",
    quoteKey: "profileSample.review1Quote",
  },
  {
    id: "r2",
    name: "Muhammad Al-Amri",
    roleKey: "profileSample.review2Role",
    rating: 4,
    timeKey: "profileSample.review2TimeAgo",
    quoteKey: "profileSample.review2Quote",
  },
  {
    id: "r3",
    name: "Sarah Al-Habibi",
    roleKey: "profileSample.review3Role",
    rating: 5,
    timeKey: "profileSample.review3TimeAgo",
    quoteKey: "profileSample.review3Quote",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const StarRow = ({ rating, size = 14 }: { rating: number; size?: number }) => (
  <span style={{ display: "inline-flex", gap: 2, fontSize: size }}>
    {Array.from({ length: 5 }, (_, i) =>
      i < rating ? <StarFilled key={i} /> : <StarOutlined key={i} />
    )}
  </span>
);

const ProfileView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { profile } = useOrganizationProfile();
  const [tab, setTab] = useState<ProfileTab>("about");
  const [messageApi, contextHolder] = message.useMessage();

  const socialPlatforms: SocialPlatform[] = ["x", "instagram", "facebook", "linkedin", "youtube", "vimeo"];
  const activeSocials = socialPlatforms.filter((p) => profile.social[p]);

  const overviewParagraphs = profile.about
    ? profile.about.split("\n").filter(Boolean)
    : [t("profileSample.overviewP1"), t("profileSample.overviewP2"), t("profileSample.overviewP3")];

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`https://eveforce.com/org/${profile.organizationName.toLowerCase()}`);
    }
    messageApi.success(t("profileView.shareLinkCopied") ?? undefined);
  };

  const totalReviews = profile.ratingBreakdown.reduce((sum, r) => sum + r.count, 0) || 1;

  return (
    <DashboardLayout>
      <Helmet>
        <title>{profile.organizationName} | EveForce</title>
      </Helmet>
      {contextHolder}

      <img src={profile.coverDataUrl} alt="" className="profile-cover" />

      <div className="profile-header">
        <img src={profile.logoDataUrl} alt={profile.organizationName} className="profile-header__logo" />

        <div className="profile-header__name-row">
          <h1 className="profile-header__name">{profile.organizationName}</h1>
          <CheckCircleFilled className="profile-header__verified" />
        </div>

        {profile.tagline && <p className="profile-header__tagline">{profile.tagline}</p>}

        {(profile.city || profile.country) && (
          <div className="profile-header__meta">
            <EnvironmentOutlined />
            <span>
              {[profile.city, profile.country].filter(Boolean).join(", ")}
            </span>
          </div>
        )}

        {profile.website && (
          <div className="profile-header__meta">
            <LinkOutlined />
            <a href={`https://${profile.website.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer">
              {profile.website}
            </a>
          </div>
        )}

        <p className="profile-header__followers">
          {profile.followers} {t("profileView.followers")}
        </p>

        <div className="profile-header__actions">
          <Button type="primary" size="large" icon={<EditOutlined />} onClick={() => navigate("/profile/edit")}>
            {t("profileView.editProfile")}
          </Button>
          <Button size="large" icon={<ShareAltOutlined />} onClick={handleShare}>
            {t("profileView.shareProfile")}
          </Button>
        </div>

        <div className="profile-tabs">
          <button
            type="button"
            className={`profile-tab${tab === "about" ? " profile-tab--active" : ""}`}
            onClick={() => setTab("about")}
          >
            {t("profileView.about")}
          </button>
          <button
            type="button"
            className={`profile-tab${tab === "reviews" ? " profile-tab--active" : ""}`}
            onClick={() => setTab("reviews")}
          >
            {t("profileView.reviews")}
          </button>
        </div>
      </div>

      {tab === "about" ? (
        <>
          <div className="form-card">
            <h2>{t("profileView.overviewTitle")}</h2>
            <div className="profile-overview-text">
              {overviewParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="profile-details-grid">
            <div className="form-card" style={{ marginBottom: 0 }}>
              <h2>{t("profileView.detailsTitle")}</h2>
              <div className="detail-row-grid">
                {profile.website && (
                  <div className="detail-item">
                    <LinkOutlined className="detail-item__icon" />
                    <div>
                      <p className="detail-item__label">{t("profileView.website")}</p>
                      <p className="detail-item__value detail-item__value--link">{profile.website}</p>
                    </div>
                  </div>
                )}
                {profile.yearEstablished && (
                  <div className="detail-item">
                    <BankOutlined className="detail-item__icon" />
                    <div>
                      <p className="detail-item__label">{t("profileView.established")}</p>
                      <p className="detail-item__value detail-item__value--link">{profile.yearEstablished}</p>
                    </div>
                  </div>
                )}
                {(profile.city || profile.country) && (
                  <div className="detail-item">
                    <EnvironmentOutlined className="detail-item__icon" />
                    <div>
                      <p className="detail-item__label">{t("profileView.basedIn")}</p>
                      <p className="detail-item__value detail-item__value--link">
                        {[profile.city, profile.country].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  </div>
                )}
                <div className="detail-item">
                  <CheckCircleOutlined className="detail-item__icon" />
                  <div>
                    <p className="detail-item__label">{t("profileView.status")}</p>
                    <p className="detail-item__value detail-item__value--link">
                      {t("profileView.verifiedOrganizer")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-card" style={{ marginBottom: 0 }}>
              <h2>{t("profileView.industryTitle")}</h2>
              <p className="detail-item__value" style={{ marginBottom: 4 }}>
                {profile.industry || t("profileSample.industryLabel")}
              </p>
              <p className="industry-tags">{t("profileSample.industryTags")}</p>
            </div>
          </div>

          {activeSocials.length > 0 && (
            <div className="form-card">
              <h2>{t("profileView.socialTitle")}</h2>
              <div className="social-links-row">
                {activeSocials.map((platform) => (
                  <a
                    key={platform}
                    href={profile.social[platform]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={platform}
                  >
                    <SocialIcon platform={platform} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="form-card">
            <h2>{t("profileView.reviewsSummary")}</h2>
            <div className="reviews-summary">
              <div className="reviews-summary__score">
                <div className="reviews-summary__score-num">{profile.rating.toFixed(1)}</div>
                <div className="reviews-summary__stars">
                  <StarRow rating={Math.round(profile.rating)} size={18} />
                </div>
                <div className="reviews-summary__count">
                  ({profile.reviewCount} {t("profileView.reviewsCountSuffix")})
                </div>
              </div>
              <div className="reviews-summary__bars">
                {profile.ratingBreakdown.map((row) => (
                  <div className="reviews-summary__bar-row" key={row.stars}>
                    <span>
                      {row.stars} {row.stars === 1 ? t("profileView.star") : t("profileView.stars")}
                    </span>
                    <span className="reviews-summary__bar-track">
                      <span
                        className="reviews-summary__bar-fill"
                        style={{
                          width:
                            row.count > 0
                              ? `${Math.max((row.count / totalReviews) * 100, 2)}%`
                              : "0%",
                        }}
                      />
                    </span>
                    <span>{row.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="profile-view-all">
            <a href="#reviews">{t("profileView.viewAll")}</a>
          </div>

          {REVIEWS.map((review, idx) => (
            <div className="review-card" key={review.id}>
              <div className="review-card__head">
                <span
                  className="review-card__avatar"
                  style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                >
                  {initials(review.name)}
                </span>
                <div>
                  <p className="review-card__name">{review.name}</p>
                  <p className="review-card__role">{t(review.roleKey)}</p>
                  <div className="review-card__stars">
                    <StarRow rating={review.rating} />
                    <span className="review-card__time">{t(review.timeKey)}</span>
                  </div>
                </div>
                <button type="button" className="review-card__more" aria-label="More">
                  <MoreOutlined />
                </button>
              </div>
              <p className="review-card__quote">&ldquo;{t(review.quoteKey)}&rdquo;</p>
            </div>
          ))}
        </>
      )}
    </DashboardLayout>
  );
};

export default ProfileView;
