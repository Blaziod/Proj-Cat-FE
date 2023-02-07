import React, { useState } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { Link } from "react-router-dom";


export const ProposeTopic = (props) => {
   
    const [topic1, setTopic1] = useState('');
    const [topic2, setTopic2] = useState('');
    const [topic3, setTopic3] = useState('');
    const [topics, setTopics] = useState([]);


  

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(matric, topics);


    }

    return (
        <div className="auth-form-container">

            <h2 className="app-container">Project Topic Area</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                

                <label htmlFor="topic1"> Project Topic 1</label>
                <input value={topics} onChange={(e) => setTopics(e.target.value)} type="topic1" placeholder="Type in your first project topic" id="topic1" name="topic1" />

                <label htmlFor="topic2"> Project Topic 2</label>
                <input value={topics} onChange={(e) => setTopics(e.target.value)} type="topic2" placeholder="Type in your second project topic" id="topic2" name="topic2" />
              

                <label htmlFor="topic3"> Project Topic 3</label>
                <input value={topics} onChange={(e) => setTopics(e.target.value)} type="topic3" placeholder="Type in your third project topic" id="topic3" name="topic3" />

             
                <Link to="/"><button className="register-submit-btn" type="submit">Submit</button></Link>
            </form>

        </div>
    )


}