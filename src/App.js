import React from "react";
import logo from "./logo.svg";
import "./App.css";
import moment from "moment";
import Input from "./Input";
import axios from "axios";

const Subjects = ["Angular", "React", "Golang", "GOGOO"];
const targetDate = moment("12/21/2019 18:00:00");
function App() {
  const [name, setName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [selectSubject, setselectSubject] = React.useState("");
  const [isCheck, setIsChecked] = React.useState(false);
  const [time, setTimer] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isloading, setisLoadig] = React.useState(false);

  const handleSubmit = () => {
    setisLoadig(true);
    axios
      .get("http://www.mocky.io/v2/5dfde8a6310000551ec96e5b")
      .then(response => {
        const { data } = response;
        setMessage(data.response);
        setisLoadig(false);
        console.log(data.response);
      });
  };

  const updateTimer = () => {
    const diffHours = targetDate.diff(moment(), "hours");
    const diffMinute = targetDate.diff(moment(), "Minute") % 60;
    const diffSecond = targetDate.diff(moment(), "second") % 60;
    setTimer(`${diffHours} hour ${diffMinute} minute ${diffSecond} second`);
  };
  console.log("State", { name, Email, selectSubject, isCheck });

  React.useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    axios
      .get("http://www.mocky.io/v2/5dfde8a6310000551ec96e5b")
      .then(response => {
        setselectSubject(response.data.Subjects);
      });
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App box">
      <header className="App-header">
        <div className="title">Seasons Change Registration Form</div>
        <p>Form ends in</p>
        <p>{time}</p>
        <Input
          label="Name"
          value={name}
          onChangeFromComponent={value => setName(value)}
        />

        <Input
          label="Email"
          value={Email}
          onChangeFromComponent={value => setEmail(value)}
        />

        <div className="field">
          <label className="label">Subject</label>
          <div className="control">
            <div className="select">
              <select onChange={event => setselectSubject(event.target.value)}>
                {Subjects.map(Subjects => (
                  <option key={Subjects}>{Subjects}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                onChange={event => setIsChecked(event.target.checked)}
              />
              I agree to the <a href="#">terms and conditions</a>
            </label>
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              className={`button is-link ${isloading && "is-loading"}`}
              onClick={handleSubmit}
              disabled={isloading}
            >
              Submit
            </button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
