import { render, screen } from "@testing-library/react";
import { Form } from "antd";
import React from "react";
import ContactForm from "./ContactForm";

// match media error fixes
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
};

const ContactFormWrapper = (props: any) => {
  const [form] = Form.useForm();

  return <ContactForm {...props} form={form} />;
};

describe("Testing Contact Form Component", () => {
  const mockProps = {
    editMode: false,
    loading: false,
    onSubmit: jest.fn(),
  };

  it("should render the the form and it's elements properly", () => {
    render(<ContactFormWrapper {...mockProps} />);

    const formTitle = screen.getByText(/Contact Form/i);
    expect(formTitle).toBeInTheDocument();

    const nameInputField = screen.getByLabelText(/Name/i);
    expect(nameInputField).toBeInTheDocument();

    const emailInputField = screen.getByLabelText(/Email/i);
    expect(emailInputField).toBeInTheDocument();

    const messageInputField = screen.getByLabelText(/Message/i);
    expect(messageInputField).toBeInTheDocument();

    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
  });
});
