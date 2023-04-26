import { Button, Form, Input, Spin } from "antd";
import { ContactFormFields, ContactFormProps } from "interfaces/forms";

const MAX_CHARS = 256;

export default function ContactForm({
  form,
  editMode,
  loading,
  onSubmit,
}: ContactFormProps) {
  const LABEL_NAME = "Name";
  const LABEL_EMAIL = "Email";
  const LABEL_MESSAGE = "Message";

  return (
    <div>
      <h1 className="text-xl mb-2">Contact Form</h1>

      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            name={ContactFormFields.name}
            label={LABEL_NAME}
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input disabled={!editMode} maxLength={MAX_CHARS} />
          </Form.Item>
          <Form.Item
            name={ContactFormFields.email}
            label={LABEL_EMAIL}
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input disabled={!editMode} type="email" maxLength={MAX_CHARS} />
          </Form.Item>
          <Form.Item
            name={ContactFormFields.message}
            label={LABEL_MESSAGE}
            rules={[{ required: true, message: "Message is required" }]}
          >
            <Input.TextArea disabled={!editMode} maxLength={MAX_CHARS} />
          </Form.Item>
          <Button disabled={!editMode} htmlType="submit">
            Submit
          </Button>
        </Form>
      </Spin>
    </div>
  );
}
