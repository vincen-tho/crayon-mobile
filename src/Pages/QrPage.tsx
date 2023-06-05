import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { Button } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";
import { useEffect } from "react";

const QrPage = () => {
  const navigate = useNavigate();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : null;

  useEffect(() => {
    console.log(user.phoneNumber);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
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
          <h1>QR Code</h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20vh",
          }}
        >
          <h2>
            {user.name} - {user.phoneNumber}
          </h2>
          {user?.phoneNumber ? <QRCode value={user?.phoneNumber} /> : "No user"}
        </div>
      </div>
    </>
  );
};
export default QrPage;
