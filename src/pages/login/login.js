import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return(
        <div>
            <h1>Login Page</h1>
            <p>Link to home page</p>
            <Link to="/home">Home</Link>
        </div>
    )
}

export default Login;