
import React,{useState} from "react";
import axios from "axios";


const Dashboard = ({token}) => {
    // props ={token: "some} ,  // {a:x} = token
    let [name, setName] = useState("");
    let [message, setMessage] = useState("");

    console.log(token);


    function getJoke(){
       axios.get("https://instagram-express-app.vercel.app/api/auth/zuku", {
          headers:{
            Authorization: `Bearer ${token}`
          }
       })
         .then(res => {
              setMessage(res.data.data.message);
              setName(res.data.data.user.name)
         })
            .catch(err => {
                console.log(err.response.data.message);
            })
    }



    return (
        <div>
            <h1>Good Morning, {name}</h1>
            <button onClick={getJoke}>Get Joke</button>
            <p>{message}</p>
        </div>
    );
}

export default Dashboard;