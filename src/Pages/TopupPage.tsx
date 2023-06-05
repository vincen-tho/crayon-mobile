import { useNavigate } from "react-router-dom";
import { LeftOutline } from "antd-mobile-icons";
import { Button, Input, Form, Toast, Divider, Card } from "antd-mobile";

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

    // redirect to dashboard
    setTimeout(() => {
      navigate(-1);
    }, 1000);
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
          <Button onClick={() => navigate(-1)} fill="none">
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
        <Card>
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
                  border: "1px solid rgba(0,0,0,0.2)",
                  height: "3rem",
                  borderRadius: "0.2rem",
                  paddingLeft: "1rem",
                  paddingRight: "0.2rem",
                  boxSizing: "border-box",
                }}
                placeholder="Please input amount"
              />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};
export default TopupPage;
