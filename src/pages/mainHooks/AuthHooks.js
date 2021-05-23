import { useState, useEffect } from 'react';
import AuthenticationController from '../../controllers/authentication';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const { userLogin, getCsrf, isStillLoggedIn } = AuthenticationController;

export const MainHooks = () => {
    const [inputs, setInputs] = useState({});

    return {inputs, setInputs };
}


export const AuthUser =  {
    loginUser: async function(username, userpassword, history) {
        let { from } = { from: { pathname: "/home" } };
        let csrf = await getCsrf();
        let isLoggedIn = await userLogin(username, userpassword, csrf);
        if(isLoggedIn){
            localStorage.setItem('IsAuthenticated', true);
            history.replace(from);
        }
    }
}


export const GetCsrfToken = () => {
    const [csrf, setCSRF] = useState(null);
    let history = useHistory();

    useEffect(() => {
        const getCSRF = async () => {
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
                setCSRF(data.csrfToken)
                return;
            }
            const errorMessage = data ? data.message : 'not authenticated';
            history.replace({ pathname: "/notAuthenticated", state: errorMessage });
            return
        }

        checkUserLogin();
    },[setCSRF, history]);

    return { csrf };
}

 