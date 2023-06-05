import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { Button, Toast, Divider } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

const ScanQrPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");

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
          <h1>Scan QR</h1>
        </div>

        <Divider
          style={{
            color: "#000",
            borderColor: "#000",
            borderStyle: "solid",
            marginTop: "0",
          }}
        />

        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (result) {
              setData(result?.text);
              Toast.show({
                icon: "success",
                content: "QR Scanned Successfuly",
              });
            }

            if (error) {
              console.info(error);
            }
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>{data}</h2>
          {data && (
            <Button
              onClick={() => navigate(`/transfer?phoneNumber=${data}`)}
              style={{ width: "100%" }}
              color="primary"
              fill="solid"
            >
              Transfer
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default ScanQrPage;
