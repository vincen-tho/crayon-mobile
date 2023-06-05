import { useNavigate, useSearchParams } from "react-router-dom";
import { LeftOutline } from "antd-mobile-icons";
import { Button, Form, Input, Toast, Divider } from "antd-mobile";

const TransferPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const phoneNumber = searchParams.get("phoneNumber");

  const [form] = Form.useForm();

  const handleTransfer = (values: {
    phoneNumber: string;
    transfer: string;
  }) => {
    const user = JSON.parse(localStorage.getItem("user") || "");

    const newBalance = parseInt(user.balance) - parseInt(values.transfer);

    if (newBalance > 0) {
      const updatedUser = {
        ...user,
        balance: newBalance,
        history: [
          ...user.history,
          {
            type: "transfer",
            nominal: values.transfer,
          },
        ],
      };

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
        content: "Transfer Successful",
      });
    } else {
      Toast.show({
        icon: "fail",
        content: "Insufficient balance",
      });
    }

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
          <Button onClick={() => navigate(-1)} fill="none">
            <LeftOutline />
          </Button>
          <h1>Transfer</h1>
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
          onFinish={handleTransfer}
          footer={
            <Button block type="submit" color="primary" size="large">
              Transfer
            </Button>
          }
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
                message: "Please input the phone number!",
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
              defaultValue={phoneNumber || undefined}
            />
          </Form.Item>

          <Form.Item
            name="transfer"
            label="Transfer Amount"
            rules={[
              {
                pattern: new RegExp(/^[0-9]+$/),
                message: "Please input a valid number!",
              },
              {
                required: true,
                message: "Please input your transfer amount!",
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
export default TransferPage;
