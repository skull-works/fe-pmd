import { toast } from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


const AuthenticationController = {
    getCsrf: async () => {
        try{
            let data = await fetch('/csrf-token')
                         .then(res => res.json()).catch(err => {throw new Error('error')});
            if(data.csrfToken) return data.csrfToken;
            throw new Error("something went wrong, no csrf token retrtieved");
        }catch(err){
            toast.error('Something went wrong with browser, call administrator ', { autoClose: 5000 });
        }
    },
    userLogin: async (username, password, csrf) => {
        try {
            let data = await fetch('/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                          'X-CSRF-TOKEN': csrf},
                body: JSON.stringify({username: username, password: password})
            }).then(res => res.json());
            
            if(data.error) {
                toast.error(data.error.message || 'Not able to login in try again', {autoClose: 5000});
                return false
             }
            else if(!data.isLoggedIn) 
                throw new Error('Something went wrong, not able to login, check connections');
            return true
        } catch (err){
            toast.error('Something went wrong, not able to login, check connections', {autoClose: 5000});
        }
    },
    isStillAuthenticated: async (csrf) => {
        try{
            let data = await fetch('/isStillAuthenticated', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf
                }
            })
            .then(res => res.json())
            .catch(err => err);
            if (data.error) 
                throw new Error('Something went wrong in checking the authentication');
            return data;
        }catch(err){
            toast.error('Something went wrong, not able to authenticate, contact administrator', {autoClose: 5000});
            return { authenticated: false };
        }
    },
    willLogout: async () => {
        try {
            let data = await fetch('/logout').then(res => res.json()).catch(err => err);
            if(data.warning) {
                toast.error(data.message, { autoClose: 10000 });
                return false;
            }
            else if(!data.logout){
                 toast.info(data.message, { autoClose: 5000 });
                return true;
            }
            else {
                toast.success(data.message, { autoClose: 5000 });
                return true;
            }
        } catch (err) {
            toast.error(err, { autoClose: 5000 });
        }
    }
}

export default AuthenticationController;