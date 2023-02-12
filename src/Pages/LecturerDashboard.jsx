import React, { useEffect, useState } from "react";
import data from "../mock-data.json";
import "../Table.css";

const LecturerDashboard = () => {
  const [contacts, setContacts] = useState(data);
  //   useEffect(() => {
  //     Axios.get;
  //   }, []);
  return (
    <div className="app-container">
      <h2 className="app-container">Lecturer Dashboard</h2>
      <table>
        <thead>
          <th>S/NO</th>
          {/* <th>Student Name</th> */}
          <th>Student Matric Number</th>
          <th>Semester</th>
          <th>Department</th>
          <th>Project Topic</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr>
              <td>{contact.id}</td>
              {/* <td>{contact.FullName}</td> */}
              <td>{contact.Matric}</td>
              <td>{contact.Sem}</td>
              <td>{contact.Dept}</td>
              <td>
                <div>
                  <input
                    type="radio"
                    name="react-tips"
                    value="Topic1"
                    checked={true}
                    className="form-check-input"
                  />
                  {contact.Topic1}
                </div>{" "}
                <div>
                  <input
                    type="radio"
                    name="react-tips"
                    value="Topic1"
                    checked={true}
                    className="form-check-input"
                  />
                  {contact.Topic2}
                </div>
                <div>
                  <input
                    type="radio"
                    name="react-tips"
                    value="Topic1"
                    checked={true}
                    className="form-check-input"
                  />
                  {contact.Topic3}
                </div>
              </td>
              <td>
                <button> Accept </button>
                <p></p>
                <button> Reject </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LecturerDashboard;
