import { useNavigate } from "react-router-dom";
import { LeftOutline } from "antd-mobile-icons";
import { Button, Input, Form, Toast, Divider } from "antd-mobile";

const TopupPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleTopup = (values: { topup: string }) => {
    const user = JSON.parse(localStorage.getItem("user") || "");

    const newBalance = parseInt(user.balance) + parseInt(values.topup);

    console.log("topup", values.topup);
    const updatedUser = {
      ...user,
      balance: newBalance,
      history: [
        ...user.history,
        {
          type: "topup",
          nominal: values.topup,
        },
      ],
    };
    console.log("updatedUser", updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));

    const database = JSON.parse(localStorage.getItem("database") || "");
    const updatedDatabase = database.map(
      (item: {
        name: string;
        phoneNumber: string;
        balance: string;
        history: { type: string; nominal: string }[];
      }) => {
        if (item.phoneNumber === user.phoneNumber) {
          return updatedUser;
        }

        return item;
      }
    );

    localStorage.setItem("database", JSON.stringify(updatedDatabase));

    Toast.show({
      icon: "success",
      content: "Top Up Successful",
    });

    form.resetFields();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <Button onClick={() => navigate("/dashboard")} fill="none">
            <LeftOutline />
          </Button>
          <h1>Top Up</h1>
        </div>
        <Divider
          style={{
            color: "#000",
            borderColor: "#000",
            borderStyle: "solid",
            margin: "0",
            marginBottom: "2rem",
          }}
        />

        <Form
          form={form}
          onFinish={handleTopup}
          footer={
            <Button block type="submit" color="primary" size="large">
              Top Up
            </Button>
          }
        >
          <Form.Item
            name="topup"
            label="Top Up Amount"
            rules={[
              {
                pattern: new RegExp(/^[0-9]+$/),
                message: "Please input a valid number!",
              },
              {
                required: true,
                message: "Please input your top up amount!",
              },
            ]}
          >
            <Input
              clearable={true}
              style={{
                borderColor: "#000",
                borderStyle: "solid",
                height: "3rem",
              }}
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default TopupPage;
