import React, { useState } from "react";
import data from "./mock-data.json";
import './Table.css';

const LecturerDashboard = () => {
    const [contacts, setContacts] = useState(data);
    return (
        <div className="app-container">
            <h2>Lecturer Dashboard</h2>
            <table>
                <thead>
                    <th>S/NO</th>
                    {/* <th>Student Name</th> */}
                    <th>Student Matric Number</th>
                    <th>Semester</th>
                    <th>Department</th>
                    <th>Project Topic</th>


                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr>
                            <td>{contact.id}</td>
                            {/* <td>{contact.FullName}</td> */}
                            <td>{contact.Matric}</td>
                            <td>{contact.Sem}</td>
                            <td>{contact.Dept}</td>
                            <td>{contact.Topic1} <p>
                                </p>  {contact.Topic2} <p/>
                               {contact.Topic3} </td>

                        </tr>
                    ))}

                </tbody>

            </table>

            {/* <h2>Add a Contact</h2>
            <form className="Table-form">
                <div>
                    <input
                        type="text"
                        name="Matric"
                        required="required"
                        placeholder="Enter your matric number"
                    />

                    <input
                        type="text"
                        name="Sem"
                        required="required"
                        placeholder="Enter your semester"
                    />

                    <input
                        type="text"
                        name="Dept"
                        required="required"
                        placeholder="Enter your department"
                    />

                    <input
                        type="text"
                        name="Topic1"
                        required="required"
                        placeholder="Enter your first project topic "
                    />


                    <input
                        type="text"
                        name="Topic2"
                        required="required"
                        placeholder="Enter your second project topic"
                    />

                    <input
                        type="text"
                        name="Topic3"
                        required="required"
                        placeholder="Enter your third project topic"
                    />
                </div>
                <button type="submit"> Add details</button> */}
            {/* </form> */}


        </div>
    );
}

export default LecturerDashboard;