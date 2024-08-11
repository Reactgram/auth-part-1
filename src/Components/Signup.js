import React,{useState} from "react";
import axios from "axios";

const Signup = ({setToken}) => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState(""); 
   


    let {name, email, password, confirmPassword} = user;

    function updateUser(event){
       let key = event.target.name;
        let value = event.target.value;
        setUser({...user, [key]: value});
    }


    function implementSignup(event){
        event.preventDefault();
        // validations: 
        // if(user.name === "" || user.email === "" || user.password === "" || user.confirmPassword === ""){
        if(!name || !email || !password || !confirmPassword){
            alert("All fields are required!");
            return;
        }
        if(password !== confirmPassword){
            alert("Passwords do not match!");
            return;
        }
        // signup logic
        axios.post("https://instagram-express-app.vercel.app/api/auth/signup",{
            name:name, 
            email:email, 
            password:password
        })
        .then(res => {
            setMessage(res.data.message);
            setToken(res.data.data.token);  
            setUser({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
        })
        .catch(err => {
            setMessage(err.response.data.message)
            setUser({
               ...user, 
                password: "",
                confirmPassword: ""
            })
        });
        
    }
    

    return(
        <div>
            <h1>Signup</h1>
            {
                message && <p>{message}</p>
            }

            <form onSubmit={implementSignup}>
                <input type="text"  placeholder="Enter Name" 
                value={name} name="name"
                onChange={updateUser} />
                <input type="email" placeholder="Enter Email"
                value={email} name="email"
                onChange={updateUser} />
                <input type="password" placeholder="Enter Password"
                value={password} name="password"
                onChange={updateUser} />
                <input type="password" placeholder="Confirm Password" 
                value={confirmPassword} name="confirmPassword"
                onChange={updateUser}
                />
                <button type="submit">Signup</button>
            </form>
        </div>
    )
}

export default Signup;