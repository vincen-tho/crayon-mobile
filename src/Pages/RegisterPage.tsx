import { Button, Form, Input, Image } from "antd-mobile";
import { useNavigate, Link } from "react-router-dom";
import RegisterPicture from '/src/assets/register.jpg'


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
          alignItems: "left",
          flexDirection: "column",
          verticalAlign: "middle",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          height: "100vh",
          margin: "0 1rem",
        }}
      >
        <Image src={RegisterPicture} width={"100%"} alt="Register Picture" fit="cover" />
        <h1 style={{
          marginTop: "1rem",
          marginBottom: "1rem",
        }}>Register</h1>

        <p style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row", width: "100%",
          fontStyle: "normal",
          fontSize: "14px",
        }}

        >
          Already Have Account?
          <span          >
            <Link color="#ea2629" style={{
              color: "#ea2629",
            }} to="/">Login Here</Link>
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
          <div
            style={{
              paddingTop: "1rem",

            }}
          >
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
              <Input style={{
                borderBottom: "0.5px solid",
                color: "#ea2629",
              }} placeholder="08123456789" />
            </Form.Item>
          </div>
          <div
          >
            <div>

              <h4 style={{ margin: 0 }}>
                Name
              </h4>
            </div>
            <Form.Item
              name="name"
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
              style={{ padding: 0 }}
            >
              <Input style={{
                borderBottom: "0.5px solid",
                color: "#ea2629",
              }} placeholder="John Doe" />
            </Form.Item>
          </div>

        </Form>

        <Button block type="submit" color="primary" size="large">
          Register
        </Button>

      </div>
    </>
  );
};
export default RegisterPage;
