import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AuthLayout from "../components/Layout/AuthLayout";
import "../components/SignupForm/SignupForm.css";

interface ForgotPasswordValues {
  email: string;
}

const ForgotPassword = () => {
  const [form] = Form.useForm<ForgotPasswordValues>();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (values: ForgotPasswordValues) => {
    setSubmitting(true);
    try {
      // TODO: wire up to real auth endpoint, e.g. axiosClient.post('/auth/forgot-password', values)
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSent(true);
      messageApi.success(`Reset link sent to ${values.email}`);
    } catch (error) {
      messageApi.error(
        error instanceof Error ? error.message : "Unable to send reset link."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | EveForce</title>
      </Helmet>

      <AuthLayout
        subtitle="No worries — enter your email and we'll send you a link to reset your password."
        footerLink={
          <>
            Remembered your password? <Link to="/sign-in">Sign In</Link>
          </>
        }
      >
        {contextHolder}
        <section className="signup-form" aria-labelledby="forgot-heading">
          <Link to="/sign-in" className="signin-form__forgot" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            <ArrowLeftOutlined /> Back to Sign In
          </Link>

          <h1 id="forgot-heading" className="signup-form__title">
            Forgot Password?
          </h1>
          <p className="signup-form__subtitle">
            Enter the email associated with your account and we'll send a link to reset your
            password.
          </p>

          {sent ? (
            <p className="signup-form__footer" style={{ fontSize: 14 }}>
              ✅ If an account exists for that email, a reset link is on its way. Check your
              inbox (and spam folder).
            </p>
          ) : (
            <Form<ForgotPasswordValues>
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={handleFinish}
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

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={submitting}
                className="signup-form__submit"
              >
                Send Reset Link
              </Button>
            </Form>
          )}
        </section>
      </AuthLayout>
    </>
  );
};

export default ForgotPassword;
