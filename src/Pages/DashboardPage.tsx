import { Button, Card, Divider, Grid } from "antd-mobile";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  SystemQRcodeOutline,
  EyeInvisibleOutline,
  EyeOutline,
  UnorderedListOutline,
  AddCircleOutline,
  UploadOutline,
  ScanningOutline
} from "antd-mobile-icons";

const DashboardPage = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : null;

  const [visible, setVisible] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);

  const idr = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const fetchData = async () => {
    try {
      const result = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=10"
      );
      setPokemonData(result.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0 1rem",
          height: "100vh",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              margin: "1rem, 0",
              color: "#ea2629",
            }}
          >
            ESA Mobile
          </h1>

          <Link to="/logout">
            <Button color="danger" fill="outline">
              Logout
            </Button>
          </Link>
        </header>

        {/* <Divider
          style={{
            color: "#000",
            borderColor: "#000",
            borderStyle: "solid",
            margin: "0",
          }}
        /> */}



        <Card
          style={{
            margin: "1rem 0",
            marginTop: "0",
            backgroundColor: "#b61d20",
            boxShadow: "4px 2px 6px #8c8c8c, -4px 2px 6px #8c8c8c"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // margin: "0.5rem",
              color: "#fff",
            }}
          >
            <h2
              style={{
                color: "#fff",
                margin: "0",
              }}
            >
              {user?.name} ({user?.phoneNumber})
            </h2>
            <Link to="/qr">
              <SystemQRcodeOutline
                fontSize={35}
                style={{
                  padding: "0",
                  color: "#fff",
                }}
              />
            </Link>
          </div>
          <h3
            style={{
              fontWeight: "normal",
              color: "#fff",
            }}
          >
            Active Balance:{" "}
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h2
              style={{
                margin: "0",
                color: "#fff",
              }}
            >
              {visible ? idr(parseInt(user?.balance)) : "*****"}
            </h2>
            <div>
              {!visible ? (
                <EyeInvisibleOutline
                  fontSize={26}
                  onClick={() => setVisible(true)}
                  style={{
                    color: "#fff",
                  }}
                />
              ) : (
                <EyeOutline
                  fontSize={26}
                  onClick={() => setVisible(false)}
                  style={{
                    color: "#fff",
                  }}
                />
              )}
            </div>
          </div>

          <Card
            style={{
              backgroundColor: "#ea2629",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Link
                to="/topup"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                }}
              >
                <AddCircleOutline
                  fontSize={26}
                  style={{
                    marginBottom: "0.5rem",
                  }}
                />
                <span>Top Up</span>
              </Link>
              <Link
                to="/transfer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                }}
              >
                <UploadOutline
                  fontSize={26}
                  style={{
                    marginBottom: "0.5rem",
                  }}
                />
                <span>Transfer</span>
              </Link>
              <Link
                to="/history"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                }}
              >
                <UnorderedListOutline
                  fontSize={26}
                  style={{
                    marginBottom: "0.5rem",
                  }}
                />
                <span>History</span>
              </Link>
            </div>
          </Card>
        </Card>

        <Grid
          columns={2}
          style={{
            overflow: "scroll",
            maxHeight: "100%"
          }}
        >
          {pokemonData.map((pokemon: { name: string; url: string }) => (
            <Grid.Item>
              <div
                key={pokemon.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]
                    }.png`}
                  alt={pokemon.name}
                />
                <h2
                  style={{
                    marginTop: "0",
                    marginBottom: "2rem",
                  }}
                >
                  {pokemon.name}
                </h2>
              </div>
            </Grid.Item>
          ))}
        </Grid>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "absolute",
            bottom: "0",
            backgroundColor: "#ea2629",
            overflow: "hidden",
          }}
        >
          <Link to="/scan">
            <Button
              style={{
                width: "15vw",
                height: "15vw",
                position: "fixed",
                bottom: "0",
                margin: "1rem 0",
                borderRadius: "50%",
                backgroundColor: "#ea2629",
                left: "50%",
                marginTop: "-7.5vw",
                marginLeft: "-7.5vw"
              }}
            >
              <ScanningOutline style={{
                color: "white"
              }} />
            </Button >
          </Link >
        </div>
      </div>

      
    </>
  );
};
export default DashboardPage;
