import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import AuthLayout from "../components/Layout/AuthLayout";
import "../components/SignupForm/SignupForm.css";

interface SignInValues {
  email: string;
  password: string;
  remember: boolean;
}

const SIGNIN_SUBTITLE =
  "Manage your entire event workforce from one powerful platform. Recruit verified freelancers, oversee live attendance, and streamline payroll with confidence.";

const SignIn = () => {
  const [form] = Form.useForm<SignInValues>();
  const [submitting, setSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (_values: SignInValues) => {
    setSubmitting(true);
    try {
      // TODO: wire up to real auth endpoint, e.g. axiosClient.post('/auth/login', values)
      await new Promise((resolve) => setTimeout(resolve, 800));
      messageApi.success("Signed in successfully.");
    } catch (error) {
      messageApi.error(
        error instanceof Error ? error.message : "Unable to sign in."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In | EveForce</title>
        <meta
          name="description"
          content="Sign in to your EveForce organizer account to continue managing your events and workforce."
        />
        <link rel="canonical" href="https://www.eveforce.com/sign-in" />
        <meta property="og:title" content="Sign In | EveForce" />
        <meta
          property="og:description"
          content="Sign in to your organizer account to continue managing your events and workforce."
        />
      </Helmet>

      <AuthLayout subtitle={SIGNIN_SUBTITLE}>
        {contextHolder}
        <section className="signup-form" aria-labelledby="signin-heading">
          <h1 id="signin-heading" className="signup-form__title">
            Wecome Back!
          </h1>
          <p className="signup-form__subtitle">
            Sign in to your organizer account to continue managing your
            events and workforce.
          </p>

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
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Enter a valid email address" },
              ]}
            >
              <Input
                size="large"
                prefix={<MailOutlined className="signup-form__icon" />}
                placeholder="Enter your business email"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="signup-form__icon" />}
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </Form.Item>

            <div className="signin-form__row">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember this device</Checkbox>
              </Form.Item>
              <Link to="/forgot-password" className="signin-form__forgot">
                Forgot Password?
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
              Login
            </Button>

            <Divider className="signup-form__divider">OR</Divider>

            <div className="signup-form__social">
              <Button size="large" icon={<GoogleOutlined />} block>
                Continue with Google
              </Button>
              <Button
                size="large"
                icon={<LinkedinFilled style={{ color: "#0A66C2" }} />}
                block
              >
                Continue with Linkedin
              </Button>
            </div>
          </Form>

          <p className="signup-form__footer">
            🔒 Secure login protected with encrypted authentication
          </p>

          <p className="signin-form__signup-link">
            Don't have an account?{" "}
            <Link to="/signup/organizer">Sign Up</Link>
          </p>
        </section>
      </AuthLayout>
    </>
  );
};

export default SignIn;
