import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'


const Navbar = () => {
    const [Nav, setNav] = useReducer(Nav => !Nav, false)
    return(
        <div id="navbar-wrapper" className="w-auto">
            <div id="nav" className={Nav?'block h-full pb-8 sm:pb-0 sm:w-20vh bg-gray-200 shadow-inner overflow-auto whitespace-normal':'hidden h-full w-20vh '}>
                <ul className="text-center pt-8">
                    <li className="py-1 hover:text-red-400">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="py-1 hover:text-red-400">
                        <Link to="/application">Application</Link>
                    </li >
                    <li className="py-1 hover:text-red-400">
                        <Link to="/customer">Customer</Link>
                    </li >
                    <li className="py-1 hover:text-red-400">
                        <Link to="/reports">Reports</Link>
                    </li>
                    <li className="py-1 hover:text-red-400">
                        <Link to="/logout">Logout</Link>
                    </li>
                </ul>
            </div>
            <div id="button" className="fixed top-0 left-0 m-2">
                <button className="focus:outline-none" onClick={setNav}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="24" viewBox="0 0 24 24">
                    <path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z"/></svg>
                </button>
            </div>
        </div>  
    )
}
 
 export default Navbar;