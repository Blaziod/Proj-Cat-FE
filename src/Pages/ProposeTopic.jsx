import React, { useState } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { Link } from "react-router-dom";


export const ProposeTopic = (props) => {
    const [matric, setMatric] = useState('');
    const [topic1, setTopic1] = useState('');
    const [topic2, setTopic2] = useState('');
    const [topic3, setTopic3] = useState('');


    const data = [
        { Department: 'Computer Science', id: 1 },
        { Department: 'Electrical Engineering', id: 2 }
    ]

    const sem = [
        { Semester: "One", id: 1 },
        { Semester: 'Two', id: 2 },
        { Semester: 'Three', id: 1 },
        { Semester: 'Four', id: 2 }

    ]

    const [options] = useState(data);
    const [ooptions] = useState(sem);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(matric);


    }

    return (
        <div className="topics-auth-container">

            <h2>Project Topic Area</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="matric"> Matric Number </label>
                <input value={matric} onChange={(e) => setMatric(e.target.value)} type="matric" placeholder="cp/program/department/number" id="matric" name="matric" />

                <label htmlFor="topic1"> Project Topic 1</label>
                <input value={topic1} onChange={(e) => setTopic1(e.target.value)} type="topic1" placeholder="Type in your first project topic" id="topic1" name="topic1" />

                <label htmlFor="topic2"> Project Topic 2</label>
                <input value={topic2} onChange={(e) => setTopic2(e.target.value)} type="topic2" placeholder="Type in your first project topic" id="topic2" name="topic2" />
                {/* <input value={topic} onChange={(e) => setTopic(e.target.value)} type="topic" placeholder="Type in your second project topic" id="topic" name="topic" /> */}

                <label htmlFor="topic3"> Project Topic 3</label>
                <input value={topic3} onChange={(e) => setTopic3(e.target.value)} type="topic3" placeholder="Type in your first project topic" id="topic3" name="topic3" />
              
                <div className="form-grid-layout">
                    <div className="input-group">

                        <label htmlFor='Department'> Select your department</label>
                        <Multiselect options={options} displayValue={'Department'} className="register-input" />

                    </div>
                    <div className="input-group">

                        <label htmlFor='Semester'> Select your semester</label>
                        <Multiselect options={ooptions} displayValue={'Semester'} className="register-input" />
                    </div>
                </div>
                <Link to="/"><button className="register-submit-btn" type="submit">Submit</button></Link>
            </form>

        </div>
    )


}