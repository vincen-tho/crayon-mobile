import { useNavigate } from "react-router-dom";
import { Button, Divider, Card, List } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";

const HistoryPage = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "");
  console.log("user", user.history);

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
          <h1>History</h1>
        </div>
        <Divider
          style={{
            color: "#000",
            borderColor: "#000",
            borderStyle: "solid",
            margin: "0",
            marginBottom: "1rem",
          }}
        />

        <List
          header="
        Transaction History
        "
        >
          {user.history.map((item: { type: string; nominal: string }) => (
            <List.Item>
              <span
                style={{
                  fontWeight: "bold",
                  display: "inline-block",
                  width: "5rem",
                }}
              >
                {item.type === "topup" ? "Top Up" : "Transfer"}
              </span>
              {" | "}
              <span
                style={{
                  color: item.type === "topup" ? "green" : "red",
                  fontWeight: "bold",
                  marginLeft: "1rem",
                }}
              >
                {item.nominal}
              </span>
            </List.Item>
          ))}
        </List>
      </div>
    </>
  );
};
export default HistoryPage;
