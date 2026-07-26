import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Input, Select, Button, message } from "antd";
import { PlusOutlined, LinkOutlined } from "@ant-design/icons";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import UploadBox from "../../components/Profile/UploadBox";
import SocialIcon from "../../components/Profile/SocialIcon";
import { useOrganizationProfile } from "../../context/OrganizationProfileContext";
import {
  YEAR_OPTIONS,
  CITY_OPTIONS,
  COUNTRY_OPTIONS,
  INDUSTRY_OPTIONS,
} from "../../types/organization";
import type { OrganizationProfileData, SocialLinks } from "../../types/organization";
import "../../components/Profile/profile.css";
import "../../components/CreateEvent/create-event.css";

const { TextArea } = Input;

interface CustomLink {
  id: string;
  url: string;
}

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { profile, setProfile, setSocial } = useOrganizationProfile();
  const [messageApi, contextHolder] = message.useMessage();

  const [draft, setDraft] = useState<OrganizationProfileData>(profile);
  const [customLinks, setCustomLinks] = useState<CustomLink[]>([]);

  const patch = (fields: Partial<OrganizationProfileData>) =>
    setDraft((prev) => ({ ...prev, ...fields }));

  const patchSocial = (fields: Partial<SocialLinks>) =>
    setDraft((prev) => ({ ...prev, social: { ...prev.social, ...fields } }));

  const addCustomLink = () => {
    setCustomLinks((prev) => [...prev, { id: `link-${Date.now()}`, url: "" }]);
  };

  const updateCustomLink = (id: string, url: string) => {
    setCustomLinks((prev) => prev.map((l) => (l.id === id ? { ...l, url } : l)));
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleSave = () => {
    setProfile(draft);
    setSocial(draft.social);
    messageApi.success(t("profileEdit.savedSuccess") ?? undefined);
    navigate("/profile");
  };

  const socialFields: { key: keyof SocialLinks; placeholder: string }[] = [
    { key: "x", placeholder: "https://x.com/yourorganization" },
    { key: "instagram", placeholder: "https://instagram.com/yourorganization" },
    { key: "facebook", placeholder: "https://facebook.com/yourorganization" },
    { key: "linkedin", placeholder: "https://linkedin.com/company/yourorganization" },
    { key: "youtube", placeholder: "https://youtube.com/@yourorganization" },
    { key: "vimeo", placeholder: "https://vimeo.com/yourorganization" },
  ];

  return (
    <DashboardLayout>
      <Helmet>
        <title>{t("profileEdit.title")} | EveForce</title>
      </Helmet>
      {contextHolder}

      <div className="page-header" style={{ marginBottom: 8 }}>
        <h1>{t("profileEdit.title")}</h1>
        <p>{t("profileEdit.subtitle")}</p>
      </div>

      <div className="form-card" style={{ marginTop: 24 }}>
        <h2>{t("profileEdit.overviewTitle")}</h2>
        <p className="form-card__desc">{t("profileEdit.overviewDesc")}</p>

        <div style={{ marginBottom: 20 }}>
          <p className="form-label">{t("profileEdit.orgName")}</p>
          <Input
            size="large"
            placeholder={t("profileEdit.orgNamePlaceholder") ?? undefined}
            value={draft.organizationName}
            onChange={(e) => patch({ organizationName: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <p className="form-label">{t("profileEdit.tagline")}</p>
          <Input
            size="large"
            placeholder={t("profileEdit.taglinePlaceholder") ?? undefined}
            value={draft.tagline}
            onChange={(e) => patch({ tagline: e.target.value })}
          />
        </div>

        <div className="profile-edit__row">
          <div>
            <p className="form-label">{t("profileEdit.orgLogo")}</p>
            <UploadBox
              variant="logo"
              value={draft.logoDataUrl}
              onChange={(val) => patch({ logoDataUrl: val })}
              hint={t("profileEdit.logoHint")}
            />
          </div>
          <div>
            <p className="form-label">{t("profileEdit.coverPhoto")}</p>
            <UploadBox
              variant="cover"
              value={draft.coverDataUrl}
              onChange={(val) => patch({ coverDataUrl: val })}
              hint={t("profileEdit.coverHint")}
            />
          </div>
        </div>

        <div>
          <p className="form-label">{t("profileEdit.about")}</p>
          <TextArea
            rows={6}
            maxLength={500}
            showCount
            placeholder={t("profileEdit.aboutPlaceholder") ?? undefined}
            value={draft.about}
            onChange={(e) => patch({ about: e.target.value })}
          />
        </div>
      </div>

      <div className="form-card">
        <h2>{t("profileEdit.detailsTitle")}</h2>
        <p className="form-card__desc">{t("profileEdit.detailsDesc")}</p>

        <div className="form-row">
          <div>
            <p className="form-label">{t("profileEdit.website")}</p>
            <Input
              size="large"
              placeholder={t("profileEdit.websitePlaceholder") ?? undefined}
              value={draft.website}
              onChange={(e) => patch({ website: e.target.value })}
            />
          </div>
          <div>
            <p className="form-label">{t("profileEdit.yearEstablished")}</p>
            <Select
              size="large"
              placeholder={t("profileEdit.select") ?? undefined}
              style={{ width: "100%" }}
              value={draft.yearEstablished || undefined}
              onChange={(val) => patch({ yearEstablished: val })}
              options={YEAR_OPTIONS.map((y) => ({ value: y, label: y }))}
            />
          </div>
        </div>

        <div className="form-row">
          <div>
            <p className="form-label">{t("profileEdit.city")}</p>
            <Select
              size="large"
              placeholder={t("profileEdit.select") ?? undefined}
              style={{ width: "100%" }}
              value={draft.city || undefined}
              onChange={(val) => patch({ city: val })}
              options={CITY_OPTIONS.map((c) => ({ value: c, label: c }))}
            />
          </div>
          <div>
            <p className="form-label">{t("profileEdit.country")}</p>
            <Select
              size="large"
              placeholder={t("profileEdit.select") ?? undefined}
              style={{ width: "100%" }}
              value={draft.country || undefined}
              onChange={(val) => patch({ country: val })}
              options={COUNTRY_OPTIONS.map((c) => ({ value: c, label: c }))}
            />
          </div>
        </div>

        <div>
          <p className="form-label">{t("profileEdit.industry")}</p>
          <Select
            size="large"
            placeholder={t("profileEdit.select") ?? undefined}
            style={{ width: "100%" }}
            value={draft.industry || undefined}
            onChange={(val) => patch({ industry: val })}
            options={INDUSTRY_OPTIONS.map((i) => ({ value: i, label: i }))}
          />
        </div>
      </div>

      <div className="form-card">
        <h2>{t("profileEdit.socialTitle")}</h2>
        <p className="form-card__desc">{t("profileEdit.socialDesc")}</p>

        <div className="social-links-grid" style={{ marginBottom: 16 }}>
          {socialFields.map((field) => (
            <div className="social-link-row" key={field.key}>
              <SocialIcon platform={field.key} />
              <Input
                size="large"
                placeholder={field.placeholder}
                value={draft.social[field.key]}
                onChange={(e) => patchSocial({ [field.key]: e.target.value } as Partial<SocialLinks>)}
              />
            </div>
          ))}
        </div>

        {customLinks.map((link) => (
          <div className="social-link-row" key={link.id} style={{ marginBottom: 12 }}>
            <span className="social-icon social-icon--round" style={{ background: "#667085" }}>
              <LinkOutlined />
            </span>
            <Input
              size="large"
              placeholder="https://"
              value={link.url}
              onChange={(e) => updateCustomLink(link.id, e.target.value)}
            />
          </div>
        ))}

        <button type="button" className="add-custom-link-btn" onClick={addCustomLink}>
          <PlusOutlined /> {t("profileEdit.addCustomLink")}
        </button>
      </div>

      <div className="wizard-footer">
        <Button size="large" onClick={handleCancel}>
          {t("common.cancel")}
        </Button>
        <Button size="large" type="primary" onClick={handleSave}>
          {t("profileEdit.saveProfile")}
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default ProfileEdit;
