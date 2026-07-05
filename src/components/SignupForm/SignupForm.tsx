import { useState } from "react";
import { Form, Input, Select, Checkbox, Button, message, Divider } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GlobalOutlined,
  GoogleOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { createOrganizerAccount } from "../../api/auth";
import type { CreateOrganizerAccountPayload } from "../../types/auth";
import "./SignupForm.css";

interface FormValues extends CreateOrganizerAccountPayload {
  confirmPassword: string;
  agree: boolean;
}

const countryOptions = [
  { value: "pk", label: "Pakistan" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "ca", label: "Canada" },
  { value: "other", label: "Other" },
];

const SignupForm = () => {
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (values: FormValues) => {
    setSubmitting(true);
    try {
      await createOrganizerAccount({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        organizationEmail: values.organizationEmail,
        password: values.password,
        companyOrigin: values.companyOrigin,
      });
      messageApi.success("Account created! Check your email to verify.");
      form.resetFields();
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
        Create Organizer Account
      </h1>
      <p className="signup-form__subtitle">
        Create your organization account to start hiring freelancers and
        managing events.
      </p>

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
            label="First name"
            rules={[{ required: true, message: "Please enter your first name" }]}
            className="signup-form__field"
          >
            <Input
              size="large"
              prefix={<UserOutlined className="signup-form__icon" />}
              placeholder="Enter your first name"
              autoComplete="given-name"
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last name"
            rules={[{ required: true, message: "Please enter your last name" }]}
            className="signup-form__field"
          >
            <Input
              size="large"
              prefix={<UserOutlined className="signup-form__icon" />}
              placeholder="Enter your last name"
              autoComplete="family-name"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Enter a valid email address" },
          ]}
          extra="Business email preferred. You can also use your personal email"
        >
          <Input
            size="large"
            prefix={<MailOutlined className="signup-form__icon" />}
            placeholder="Enter your business email"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="organizationEmail"
          label="Organization Email"
          rules={[
            { required: true, message: "Please enter your organization email" },
            { type: "email", message: "Enter a valid email address" },
          ]}
          extra="Use company email to help us verify your organization"
        >
          <Input
            size="large"
            prefix={<MailOutlined className="signup-form__icon" />}
            placeholder="Enter your organization email"
            autoComplete="off"
          />
        </Form.Item>

        <div className="signup-form__row">
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please create a password" },
              { min: 8, message: "Password should be 8 characters long" },
            ]}
            className="signup-form__field"
            extra="Password should be 8 characters long"
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="signup-form__icon" />}
              placeholder="Create password"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            className="signup-form__field"
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="signup-form__icon" />}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="companyOrigin"
          label="Company Origin"
          rules={[{ required: true, message: "Please select your company origin" }]}
        >
          <Select
            size="large"
            placeholder="Please Select"
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
                  : Promise.reject(new Error("Please accept the terms to continue")),
            },
          ]}
        >
          <Checkbox>
            I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
            <Link to="/privacy">Privacy Policy</Link>.
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
          Create Account
        </Button>

        <Divider className="signup-form__divider">OR</Divider>

        <div className="signup-form__social">
          <Button size="large" icon={<GoogleOutlined />} block>
            Continue with Google
          </Button>
          <Button size="large" icon={<LinkedinFilled style={{ color: "#0A66C2" }} />} block>
            Continue with Linkedin
          </Button>
        </div>
      </Form>

      <p className="signup-form__footer">
        🔒 Your information is securely encrypted and used only for account
        verification.
      </p>
    </section>
  );
};

export default SignupForm;
