import { Form, Button, Input, Toast } from "antd-mobile";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const database = JSON.parse(localStorage.getItem("database") || "[]");

  const onFinish = (values: { phoneNumber: string }) => {
    console.log("Success:", values);

    const found = database.find(
      (data: {
        name: string;
        phoneNumber: string;
        balance: string;
        history: {
          type: string;
          nominal: string;
        }[];
      }) => data.phoneNumber === values.phoneNumber
    );

    if (found) {
      localStorage.setItem("user", JSON.stringify(found));
      navigate("/otp");
    } else {
      Toast.show({
        icon: "fail",
        content: "Phone number not registered!",
      });
    }
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
        <h1>Login</h1>
        <Form
          layout="horizontal"
          footer={
            <Button block type="submit" color="primary" size="large">
              Login
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
        </Form>
        <p>
          Don't Have Account?{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            <Link to="/register">Register Here</Link>
          </span>
        </p>
      </div>
    </>
  );
};
export default LoginPage;
