import React,{useState} from "react";
import axios from "axios";

const Login = ({setToken}) => {

    const [user, setUser] = useState({
        email: "",
        password: "",
        
    });

    const [message, setMessage] = useState(""); 
     

    let {email, password} = user;

    function updateUser(event){
       let key = event.target.name;
        let value = event.target.value;
        setUser({...user, [key]: value});
    }


    function implementLogin(event){
        event.preventDefault();
        // validations: 
        // if(user.name === "" || user.email === "" || user.password === "" || user.confirmPassword === ""){
        if( !email || !password ){
            alert("All fields are required!");
            return;
        }
     
        // signup logic
        axios.post("https://instagram-express-app.vercel.app/api/auth/login",{
            email:email, 
            password:password
        })
        .then(res => {
            setMessage(res.data.message);
            setToken(res.data.data.token);  
            setUser({
              
                email: "",
                password: "",
               
            })
        })
        .catch(err => {
            setMessage(err.response.data.message)
            setUser({
               ...user, 
                password: "",
              
            })
        });
        
    }
    
    return(
        <div>
            <h1>Login</h1>
            {
                message && <p>{message}</p>
            }

            <form onSubmit={implementLogin}>
                
                <input type="email" placeholder="Enter Email"
                value={email} name="email"
                onChange={updateUser} />
                <input type="password" placeholder="Enter Password"
                value={password} name="password"
                onChange={updateUser} />
                
            
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;