import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [username, setUserName] = useState("");
  const [myData, setMyData] = useState([]);
  const [myData2, setMyData2] = useState("");
  let newData = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, message };

    await axios.post("http://localhost:7800/", data);

    setUserName("");
    setMessage("");
  };

  const getData = async () => {
    const res = await axios.get("http://localhost:7800/");

    if (res) {
      setMyData(res.data.data);
    }
  };

  useEffect(() => {
    getData();

    // Pusher.logToConsole = true;

    var pusher = new Pusher("0570e20cb7c689d942b5", {
      cluster: "eu"
    });

    var channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      // alert(JSON.stringify(data));
      console.log(data);
      newData.push(data);
      setMyData2(newData);
      console.log(myData2);
    });

    console.log(myData2);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          paddingTop: "60px",
          paddingBottom: "30px"
        }}
      >
        <input
          placeholder="name"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          placeholder="email"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit">Enter</button>
      </form>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {myData2 &&
          myData2?.map((props, i) => (
            <div key={i} style={{ margin: "10px" }}>
              <div>{props.username}</div>
              <div>{props.message}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
