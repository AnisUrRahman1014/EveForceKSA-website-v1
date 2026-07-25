import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/Layout/AuthLayout";
import "../components/SignupForm/SignupForm.css";

interface SignInValues {
  email: string;
  password: string;
  remember: boolean;
}

const SignIn = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<SignInValues>();
  const [submitting, setSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleFinish = async (_values: SignInValues) => {
    setSubmitting(true);
    try {
      // TODO: wire up to real auth endpoint, e.g. axiosClient.post('/auth/login', values)
      await new Promise((resolve) => setTimeout(resolve, 800));
      messageApi.success(t("auth.login") + " ✓");
      navigate("/dashboard");
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("auth.signIn")} | EveForce</title>
        <meta
          name="description"
          content="Sign in to your EveForce organizer account to continue managing your events and workforce."
        />
        <link rel="canonical" href="https://www.eveforce.com/sign-in" />
        <meta property="og:title" content="Sign In | EveForce" />
      </Helmet>

      <AuthLayout subtitle={t("auth.signInSubtitle") ?? undefined}>
        {contextHolder}
        <section className="signup-form" aria-labelledby="signin-heading">
          <h1 id="signin-heading" className="signup-form__title">
            {t("auth.welcomeBack")}
          </h1>
          <p className="signup-form__subtitle">{t("auth.signInDesc")}</p>

          <Form<SignInValues>
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleFinish}
            initialValues={{ remember: true }}
            className="signup-form__form"
          >
            <Form.Item
              name="email"
              label={t("auth.email")}
              rules={[
                { required: true, message: t("auth.emailRequired") ?? undefined },
                { type: "email", message: t("auth.emailInvalid") ?? undefined },
              ]}
            >
              <Input
                size="large"
                prefix={<MailOutlined className="signup-form__icon" />}
                placeholder={t("auth.emailPlaceholder") ?? undefined}
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={t("auth.password")}
              rules={[{ required: true, message: t("auth.passwordRequired") ?? undefined }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="signup-form__icon" />}
                placeholder={t("auth.passwordPlaceholder") ?? undefined}
                autoComplete="current-password"
              />
            </Form.Item>

            <div className="signin-form__row">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t("auth.rememberDevice")}</Checkbox>
              </Form.Item>
              <Link to="/forgot-password" className="signin-form__forgot">
                {t("auth.forgotPassword")}
              </Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={submitting}
              className="signup-form__submit signin-form__submit"
            >
              {t("auth.login")}
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

          <p className="signup-form__footer">{t("auth.secureLogin")}</p>

          <p className="signin-form__signup-link">
            {t("auth.noAccount")} <Link to="/signup/organizer">{t("auth.signUp")}</Link>
          </p>
        </section>
      </AuthLayout>
    </>
  );
};

export default SignIn;
