import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css'
import GeneralActions from '../../actions/general';
import { MainHooks, AuthUser, GetCsrfToken } from '../mainHooks/AuthHooks';




const Login = () => {
    let history = useHistory();
    let store = MainHooks();
    let { csrf } = GetCsrfToken();
    let { InputChange } = GeneralActions;

    return(
        <>
            <div className="flex flex-col md:flex-row">
                <div className="logoArea w-full md:w-6/12 h-30vh sm:h-30vh md:h-50vh lg:h-70vh md:rounded-br-full  overflow-hidden">
                    <div className="logoArea__image  mx-auto md:ml-8 lg:ml-16">
                        <img className="object-cover" alt="plantLogo" src={require('../../images/LogoPlantWhiteBG.png')} />
                    </div>
                </div>
                <div className="flex flex-wrap justify-center content-center relative w-full md:w-6/12 h-70vh md:h-100vh">
                    <div className="form flex flex-col w-11/12 sm:w-full">
                        <div className="text-center">
                            <h1 className="hidden sm:inline-block font-Nunito text-3xl"><span className="text-gray-600">SIGN IN</span> <span className="text-green-500">PMD</span></h1>
                        </div>
                        
                        <br /><br />

                        <div className="input__wrapper">
                            <div className="relative">
                                <label className="font-Nunito text-lg" htmlFor="username">Username:</label><br />
                                <svg className="absolute ml-2 mt-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"/></svg>
                                <input  className="h-10 rounded-sm shadow-sm border-b-2 border-gray-600 bg-gray-200 focus:outline-none hover:border-green-400    focus:border-green-400"
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Enter Username Here"
                                        onChange={e => InputChange(e.target.name, e.target.value, store)}/>
                            </div> <br /><br />

                            <div className="relative">
                                <label className="font-Nunito text-lg" htmlFor="password">Password:</label><br />
                                <svg className="absolute ml-2 mt-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 16c0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723v2.277h-2v-2.277c-.596-.347-1-.985-1-1.723zm11-6v14h-18v-14h3v-4c0-3.313 2.687-6 6-6s6 2.687 6 6v4h3zm-13 0h8v-4c0-2.206-1.795-4-4-4s-4 1.794-4 4v4zm11 2h-14v10h14v-10z"/></svg>
                                <input  className="h-10 rounded-sm shadow-sm border-b-2 border-gray-600 bg-gray-200 focus:outline-none hover:border-green-400         focus:border-green-400"
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter Password Here"
                                        onChange={e => InputChange(e.target.name, e.target.value, store)}/>
                            </div>
                        </div>

                        <button className="h-10 mt-12 mx-auto text-white rounded-sm bg-green-500 hover:bg-green-400 focus:outline-none" 
                                 onClick={() => AuthUser.loginUser(store.inputs.username, store.inputs.password, csrf, history)}> 
                                Sign In
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;