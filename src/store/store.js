import create from "zustand";
import { devtools } from 'zustand/middleware'
import AuthenticationController from '../controllers/authentication';

const { userLogin, getCsrf, isStillAuthenticated } = AuthenticationController;


let authStore = (set)=> ({
    isAuthenticated: false,
    authenticateFalseAction: () => set((state) => ({
        isAuthenticated: false
    })),
    authenticateAction: async (username, userpassword, history) => {
        let { from } = { from: { pathname: "/home" } };
        let csrf = await getCsrf();
        let isLoggedIn = await userLogin(username, userpassword, csrf);
        if(isLoggedIn){
            set({ isAuthenticated: true })
            history.replace(from);
        }
    },
    isStillAuthenticatedAction: async () => {
        let csrf = await getCsrf();
        const data = await isStillAuthenticated(csrf);
        if(data && data.authenticated){
            set({ isAuthenticated: true })
            return;
        }
        set({ isAuthenticated: false })
    },
    csrfToken: '',
    getCsrfToken: async () => {
        const csrf = await getCsrf();
        set({ csrfToken: csrf });
    }
});

authStore= devtools(authStore)

export default authStore = create(authStore);