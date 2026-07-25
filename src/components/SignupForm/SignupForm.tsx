import { useState } from "react";
import { Form, Input, Select, Checkbox, Button, message, Divider } from "antd";
import { useTranslation } from "react-i18next";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GlobalOutlined,
  GoogleOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { createOrganizerAccount } from "../../api/auth";
import type { CreateOrganizerAccountPayload } from "../../types/auth";
import "./SignupForm.css";

interface FormValues extends CreateOrganizerAccountPayload {
  confirmPassword: string;
  agree: boolean;
}

const countryOptions = [
  { value: "af", label: "Afghanistan" },
  { value: "al", label: "Albania" },
  { value: "dz", label: "Algeria" },
  { value: "ad", label: "Andorra" },
  { value: "ao", label: "Angola" },
  { value: "ag", label: "Antigua and Barbuda" },
  { value: "ar", label: "Argentina" },
  { value: "am", label: "Armenia" },
  { value: "au", label: "Australia" },
  { value: "at", label: "Austria" },
  { value: "az", label: "Azerbaijan" },
  { value: "bs", label: "Bahamas" },
  { value: "bh", label: "Bahrain" },
  { value: "bd", label: "Bangladesh" },
  { value: "bb", label: "Barbados" },
  { value: "by", label: "Belarus" },
  { value: "be", label: "Belgium" },
  { value: "bz", label: "Belize" },
  { value: "bj", label: "Benin" },
  { value: "bt", label: "Bhutan" },
  { value: "bo", label: "Bolivia" },
  { value: "ba", label: "Bosnia and Herzegovina" },
  { value: "bw", label: "Botswana" },
  { value: "br", label: "Brazil" },
  { value: "bn", label: "Brunei" },
  { value: "bg", label: "Bulgaria" },
  { value: "bf", label: "Burkina Faso" },
  { value: "bi", label: "Burundi" },
  { value: "cv", label: "Cabo Verde" },
  { value: "kh", label: "Cambodia" },
  { value: "cm", label: "Cameroon" },
  { value: "ca", label: "Canada" },
  { value: "cf", label: "Central African Republic" },
  { value: "td", label: "Chad" },
  { value: "cl", label: "Chile" },
  { value: "cn", label: "China" },
  { value: "co", label: "Colombia" },
  { value: "km", label: "Comoros" },
  { value: "cd", label: "Congo (DRC)" },
  { value: "cg", label: "Congo (Republic)" },
  { value: "cr", label: "Costa Rica" },
  { value: "ci", label: "Côte d'Ivoire" },
  { value: "hr", label: "Croatia" },
  { value: "cu", label: "Cuba" },
  { value: "cy", label: "Cyprus" },
  { value: "cz", label: "Czech Republic" },
  { value: "dk", label: "Denmark" },
  { value: "dj", label: "Djibouti" },
  { value: "dm", label: "Dominica" },
  { value: "do", label: "Dominican Republic" },
  { value: "ec", label: "Ecuador" },
  { value: "eg", label: "Egypt" },
  { value: "sv", label: "El Salvador" },
  { value: "gq", label: "Equatorial Guinea" },
  { value: "er", label: "Eritrea" },
  { value: "ee", label: "Estonia" },
  { value: "sz", label: "Eswatini" },
  { value: "et", label: "Ethiopia" },
  { value: "fj", label: "Fiji" },
  { value: "fi", label: "Finland" },
  { value: "fr", label: "France" },
  { value: "ga", label: "Gabon" },
  { value: "gm", label: "Gambia" },
  { value: "ge", label: "Georgia" },
  { value: "de", label: "Germany" },
  { value: "gh", label: "Ghana" },
  { value: "gr", label: "Greece" },
  { value: "gd", label: "Grenada" },
  { value: "gt", label: "Guatemala" },
  { value: "gn", label: "Guinea" },
  { value: "gw", label: "Guinea-Bissau" },
  { value: "gy", label: "Guyana" },
  { value: "ht", label: "Haiti" },
  { value: "hn", label: "Honduras" },
  { value: "hu", label: "Hungary" },
  { value: "is", label: "Iceland" },
  { value: "in", label: "India" },
  { value: "id", label: "Indonesia" },
  { value: "ir", label: "Iran" },
  { value: "iq", label: "Iraq" },
  { value: "ie", label: "Ireland" },
  { value: "il", label: "Israel" },
  { value: "it", label: "Italy" },
  { value: "jm", label: "Jamaica" },
  { value: "jp", label: "Japan" },
  { value: "jo", label: "Jordan" },
  { value: "kz", label: "Kazakhstan" },
  { value: "ke", label: "Kenya" },
  { value: "ki", label: "Kiribati" },
  { value: "kw", label: "Kuwait" },
  { value: "kg", label: "Kyrgyzstan" },
  { value: "la", label: "Laos" },
  { value: "lv", label: "Latvia" },
  { value: "lb", label: "Lebanon" },
  { value: "ls", label: "Lesotho" },
  { value: "lr", label: "Liberia" },
  { value: "ly", label: "Libya" },
  { value: "li", label: "Liechtenstein" },
  { value: "lt", label: "Lithuania" },
  { value: "lu", label: "Luxembourg" },
  { value: "mg", label: "Madagascar" },
  { value: "mw", label: "Malawi" },
  { value: "my", label: "Malaysia" },
  { value: "mv", label: "Maldives" },
  { value: "ml", label: "Mali" },
  { value: "mt", label: "Malta" },
  { value: "mh", label: "Marshall Islands" },
  { value: "mr", label: "Mauritania" },
  { value: "mu", label: "Mauritius" },
  { value: "mx", label: "Mexico" },
  { value: "fm", label: "Micronesia" },
  { value: "md", label: "Moldova" },
  { value: "mc", label: "Monaco" },
  { value: "mn", label: "Mongolia" },
  { value: "me", label: "Montenegro" },
  { value: "ma", label: "Morocco" },
  { value: "mz", label: "Mozambique" },
  { value: "mm", label: "Myanmar" },
  { value: "na", label: "Namibia" },
  { value: "nr", label: "Nauru" },
  { value: "np", label: "Nepal" },
  { value: "nl", label: "Netherlands" },
  { value: "nz", label: "New Zealand" },
  { value: "ni", label: "Nicaragua" },
  { value: "ne", label: "Niger" },
  { value: "ng", label: "Nigeria" },
  { value: "kp", label: "North Korea" },
  { value: "mk", label: "North Macedonia" },
  { value: "no", label: "Norway" },
  { value: "om", label: "Oman" },
  { value: "pk", label: "Pakistan" },
  { value: "pw", label: "Palau" },
  { value: "pa", label: "Panama" },
  { value: "pg", label: "Papua New Guinea" },
  { value: "py", label: "Paraguay" },
  { value: "pe", label: "Peru" },
  { value: "ph", label: "Philippines" },
  { value: "pl", label: "Poland" },
  { value: "pt", label: "Portugal" },
  { value: "qa", label: "Qatar" },
  { value: "ro", label: "Romania" },
  { value: "ru", label: "Russia" },
  { value: "rw", label: "Rwanda" },
  { value: "kn", label: "Saint Kitts and Nevis" },
  { value: "lc", label: "Saint Lucia" },
  { value: "vc", label: "Saint Vincent and the Grenadines" },
  { value: "ws", label: "Samoa" },
  { value: "sm", label: "San Marino" },
  { value: "st", label: "São Tomé and Príncipe" },
  { value: "sa", label: "Saudi Arabia" },
  { value: "sn", label: "Senegal" },
  { value: "rs", label: "Serbia" },
  { value: "sc", label: "Seychelles" },
  { value: "sl", label: "Sierra Leone" },
  { value: "sg", label: "Singapore" },
  { value: "sk", label: "Slovakia" },
  { value: "si", label: "Slovenia" },
  { value: "sb", label: "Solomon Islands" },
  { value: "so", label: "Somalia" },
  { value: "za", label: "South Africa" },
  { value: "ss", label: "South Sudan" },
  { value: "kr", label: "South Korea" },
  { value: "es", label: "Spain" },
  { value: "lk", label: "Sri Lanka" },
  { value: "sd", label: "Sudan" },
  { value: "sr", label: "Suriname" },
  { value: "se", label: "Sweden" },
  { value: "ch", label: "Switzerland" },
  { value: "sy", label: "Syria" },
  { value: "tw", label: "Taiwan" },
  { value: "tj", label: "Tajikistan" },
  { value: "tz", label: "Tanzania" },
  { value: "th", label: "Thailand" },
  { value: "tl", label: "Timor-Leste" },
  { value: "tg", label: "Togo" },
  { value: "to", label: "Tonga" },
  { value: "tt", label: "Trinidad and Tobago" },
  { value: "tn", label: "Tunisia" },
  { value: "tr", label: "Turkey" },
  { value: "tm", label: "Turkmenistan" },
  { value: "tv", label: "Tuvalu" },
  { value: "ug", label: "Uganda" },
  { value: "ua", label: "Ukraine" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "gb", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "uy", label: "Uruguay" },
  { value: "uz", label: "Uzbekistan" },
  { value: "vu", label: "Vanuatu" },
  { value: "ve", label: "Venezuela" },
  { value: "vn", label: "Vietnam" },
  { value: "ye", label: "Yemen" },
  { value: "zm", label: "Zambia" },
  { value: "zw", label: "Zimbabwe" },
];

const SignupForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleFinish = async (values: FormValues) => {
    setSubmitting(true);
    try {
      await createOrganizerAccount({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        organizationName: values.organizationName,
        password: values.password,
        companyOrigin: values.companyOrigin,
      });
      messageApi.success(t("signup.successMessage") ?? undefined);
      form.resetFields();
      setTimeout(() => navigate("/sign-in"), 900);
    } catch (error) {
      messageApi.error(
        error instanceof Error ? error.message : "Could not create account."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="signup-form" aria-labelledby="signup-heading">
      {contextHolder}
      <h1 id="signup-heading" className="signup-form__title">
        {t("signup.title")}
      </h1>
      <p className="signup-form__subtitle">{t("signup.subtitle")}</p>

      <Form<FormValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleFinish}
        className="signup-form__form"
      >
        <div className="signup-form__row">
          <Form.Item
            name="firstName"
            label={t("signup.firstName")}
            rules={[{ required: true, message: t("signup.firstNameRequired") ?? undefined }]}
            className="signup-form__field"
          >
            <Input
              size="large"
              prefix={<UserOutlined className="signup-form__icon" />}
              placeholder={t("signup.firstNamePlaceholder") ?? undefined}
              autoComplete="given-name"
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            label={t("signup.lastName")}
            rules={[{ required: true, message: t("signup.lastNameRequired") ?? undefined }]}
            className="signup-form__field"
          >
            <Input
              size="large"
              prefix={<UserOutlined className="signup-form__icon" />}
              placeholder={t("signup.lastNamePlaceholder") ?? undefined}
              autoComplete="family-name"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          label={t("auth.email")}
          rules={[
            { required: true, message: t("auth.emailRequired") ?? undefined },
            { type: "email", message: t("auth.emailInvalid") ?? undefined },
          ]}
          extra={t("signup.emailExtra")}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="signup-form__icon" />}
            placeholder={t("auth.emailPlaceholder") ?? undefined}
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="organizationName"
          label={t("signup.organizationName")}
          rules={[{ required: true, message: t("signup.organizationNameRequired") ?? undefined }]}
          extra={t("signup.organizationNameExtra")}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="signup-form__icon" />}
            placeholder={t("signup.organizationNamePlaceholder") ?? undefined}
            autoComplete="organization"
          />
        </Form.Item>

        <div className="signup-form__row">
          <Form.Item
            name="password"
            label={t("signup.password")}
            rules={[
              { required: true, message: t("signup.passwordRequired") ?? undefined },
              { min: 8, message: t("signup.passwordMin") ?? undefined },
            ]}
            className="signup-form__field"
            extra={t("signup.passwordMin")}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="signup-form__icon" />}
              placeholder={t("signup.passwordPlaceholder") ?? undefined}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={t("signup.confirmPassword")}
            dependencies={["password"]}
            className="signup-form__field"
            rules={[
              { required: true, message: t("signup.confirmPasswordRequired") ?? undefined },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t("signup.passwordMismatch") ?? "Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="signup-form__icon" />}
              placeholder={t("signup.confirmPasswordPlaceholder") ?? undefined}
              autoComplete="new-password"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="companyOrigin"
          label={t("signup.companyOrigin")}
          rules={[{ required: true, message: t("signup.companyOriginRequired") ?? undefined }]}
        >
          <Select
            size="large"
            placeholder={t("signup.companyOriginPlaceholder") ?? undefined}
            showSearch
            allowClear
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            suffixIcon={<GlobalOutlined className="signup-form__icon" />}
            options={countryOptions}
          />
        </Form.Item>

        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error(t("signup.agreeRequired") ?? "Please accept the terms to continue")),
            },
          ]}
        >
          <Checkbox>
            {t("signup.agreePrefix")} <Link to="/terms">{t("signup.agreeTerms")}</Link>{" "}
            {t("signup.agreeAnd")} <Link to="/privacy">{t("signup.agreePrivacy")}</Link>.
          </Checkbox>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={submitting}
          className="signup-form__submit"
        >
          {t("signup.createAccount")}
        </Button>

        <Divider className="signup-form__divider">{t("auth.or")}</Divider>

        <div className="signup-form__social">
          <Button size="large" icon={<GoogleOutlined />} block>
            {t("auth.continueWithGoogle")}
          </Button>
          <Button size="large" icon={<LinkedinFilled style={{ color: "#0A66C2" }} />} block>
            {t("auth.continueWithLinkedin")}
          </Button>
        </div>
      </Form>

      <p className="signup-form__footer">{t("signup.secureFooter")}</p>
    </section>
  );
};

export default SignupForm;
