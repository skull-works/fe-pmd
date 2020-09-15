import { useState, useEffect } from 'react';
import AuthenticationController from '../../controllers/authentication';
import { useHistory } from 'react-router-dom';

const { userLogin, getCsrf, isStillLoggedIn } = AuthenticationController;

 export const MainHooks = () => {
    const [inputs, setInputs] = useState({});

    return {inputs, setInputs };
}


 export const AuthUser =  {
    loginUser: async function(username, userpassword, csrf, history){
        let { from } = { from: { pathname: "/home" } };
        let isLoggedIn = await userLogin(username, userpassword, csrf);
        if(isLoggedIn)
            history.replace(from);
    }
}


 export const GetCsrfToken = () => {
    const [csrf, setCSRF] = useState(null);
    let history = useHistory();
    
    useEffect(() => {
        const getCSRF = async () => {
            let data = await isStillLoggedIn();
            if(data && data.isLoggedIn){
                setCSRF(data.csrfToken);
                history.replace({ pathname: "/Home" });
                return;
            }
            let newCSRF = await getCsrf();
            setCSRF(newCSRF);
        }

        getCSRF();
    },[setCSRF, history]);

    return { csrf };
 }

  export const IsUserStillLoggedIn = () => {
    const [csrf, setCSRF] = useState(null);
    let history = useHistory();

    useEffect(() => {
        const checkUserLogin = async () => {
            let data = await isStillLoggedIn();
            if(data && data.isLoggedIn){
                setCSRF(data.csrfToken);
                return;
            }
            history.replace({ pathname: "/notAuthenticated" });
            return
        }

        checkUserLogin();
    },[setCSRF, history]);

    return { csrf };
 }

 