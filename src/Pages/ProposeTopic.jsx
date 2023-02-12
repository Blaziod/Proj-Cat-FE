import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ProposeTopic = (props) => {
  const [matricNo, setMatricNo] = useState("");
  const [topic1, setTopic1] = useState("");
  const [topic2, setTopic2] = useState("");
  const [topic3, setTopic3] = useState("");

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(matricNo, topic1, topic2, topic3);

    axios
      .post("https://project-catalog.onrender.com/api/topic/add", {
        matricNo,
        topics: [topic1, topic2, topic3],
      })

      .then((response) => {
        console.log(response);
        toast(response.data.message);
        navigate("/LecturerLogin");
      })
      .catch((error) => {
        console.log(error);
        toast(error.response.data.message);
      });
  };

  return (
    <div className="auth-form-container">
      <h2 className="app-container">Project Topic Area</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="matric"> Matric Number </label>
        <input
          value={matricNo}
          onChange={(e) => setMatricNo(e.target.value)}
          type="matric"
          placeholder="cp/program/department/number"
          id="matric"
          name="matric"
        />

        <label htmlFor="topic1"> Project Topic 1</label>
        <input
          value={topic1}
          onChange={(e) => setTopic1(e.target.value)}
          type="topic1"
          placeholder="Type in your first project topic"
          id="topic1"
          name="topic1"
        />

        <label htmlFor="topic2"> Project Topic 2</label>
        <input
          value={topic2}
          onChange={(e) => setTopic2(e.target.value)}
          type="topic2"
          placeholder="Type in your first project topic"
          id="topic2"
          name="topic2"
        />

        <label htmlFor="topic3"> Project Topic 3</label>
        <input
          value={topic3}
          onChange={(e) => setTopic3(e.target.value)}
          type="topic3"
          placeholder="Type in your first project topic"
          id="topic3"
          name="topic3"
        />

        <button className="register-submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
