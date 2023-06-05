import { Button, Form, Input } from "antd-mobile";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = (values: { phoneNumber: string; name: string }) => {
    const data = {
      ...values,
      balance: "0",
      history: [],
    };
    localStorage.setItem("user", JSON.stringify(data));

    const database = JSON.parse(localStorage.getItem("database") || "[]");
    database.push(data);
    localStorage.setItem("database", JSON.stringify(database));

    navigate("/otp");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "70vh",
          margin: "0 1rem",
        }}
      >
        <h1>Register</h1>
        <Form
          layout="horizontal"
          footer={
            <Button block type="submit" color="primary" size="large">
              Register
            </Button>
          }
          onFinish={onFinish}
        >
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                pattern: new RegExp(/^[0-9]+$/),
                message: "Please input a valid number!",
              },
              {
                required: true,
                message: "Please input your number!",
              },
            ]}
          >
            <Input placeholder="08123456789" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                type: "string",
                message: "Please input a valid name!",
              },
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>
        </Form>

        <p>
          Already Have Account?{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            <Link to="/">Login Here</Link>
          </span>
        </p>
      </div>
    </>
  );
};
export default RegisterPage;
