import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Divider, Button } from "antd-mobile";

const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    alert("OTP Verified");
    console.log(otp);
    navigate("/dashboard");
  };

  const clearOtp = () => setOtp("");

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 1rem",
        }}
      >
        <h1>OTP</h1>

        <Divider
          style={{
            color: "#000",
            borderColor: "#000",
            borderStyle: "solid",
            margin: "0",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "70vh",
          }}
        >
          <form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h2>Enter Verification Code</h2>
              <OtpInput
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  margin: "0 1rem",
                  fontSize: "2rem",
                  borderRadius: "4px",
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                }}
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                shouldAutoFocus
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                  marginTop: "2rem",
                }}
              >
                <Button
                  fill="outline"
                  disabled={otp.trim() === ""}
                  onClick={clearOtp}
                >
                  Clear
                </Button>
                <Button
                  onClick={(e) => handleSubmit(e)}
                  color="primary"
                  fill="solid"
                  disabled={otp.length < 4}
                  type="submit"
                >
                  Verify OTP
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default OtpPage;
