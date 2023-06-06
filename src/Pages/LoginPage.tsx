import { Form, Button, Input, Toast, Image } from "antd-mobile";
import { useNavigate, Link } from "react-router-dom";
// import LoginPicture from '/src/assets/login.avif'
import LoginPicture from '/src/assets/login.png'

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
          alignItems: "left",
          flexDirection: "column",
          verticalAlign: "middle",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          height: "100vh",
          margin: "0 1rem",
        }}
      >
        <Image src={LoginPicture} width={"100%"} alt="Login Picture" fit="cover" />
        <h1 style={{
          marginTop: "1rem",
          marginBottom: "1rem",
        }}>Login</h1>

        <p style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row", width: "100%",
          fontStyle: "normal",
          fontSize: "14px",
        }}

        >
          Don't Have an Account Yet?
          <span          >
            <Link color="#ea2629" style={{
              color: "#ea2629",
            }} to="/register">Register Here</Link>
          </span>
        </p>
        <Form
          style={{
            padding: "0px",
            margin: "0px",
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <div style={{
            paddingTop: "1rem",
          }}>
            <div>
              <h4 style={{ margin: 0 }}>
                Phone Number
              </h4>

            </div>
            <Form.Item
              name="phoneNumber"
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
              style={{ padding: 0 }}
            >
              <Input style={{ borderBottom: "0.5px solid #ea2629" }} placeholder="08123456789" />
            </Form.Item>
          </div>
          <Button block type="submit" color="primary" size="large">
            Login
          </Button>

        </Form>

      </div>
    </>
  );
};
export default LoginPage;
