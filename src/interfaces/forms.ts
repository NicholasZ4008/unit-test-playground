import { FormInstance } from "antd";

export interface ContactFormProps {
  form: FormInstance;
  editMode: boolean;
  loading: boolean;
  onSubmit: (values: ContactFormData) => void;
}

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export enum ContactFormFields {
  name = "name",
  email = "email",
  message = "message",
}
