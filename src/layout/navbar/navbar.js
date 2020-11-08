import React, { useReducer } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import './styles.css';
import AuthenticationController from '../../controllers/authentication';

async function logoutSession(history) {
	let isLogout = await AuthenticationController.willLogout();
	if (isLogout) history.replace({ pathname: '/' });
}

const Navbar = () => {
	const [Nav, setNav] = useReducer((Nav) => !Nav, false);
	let history = useHistory();
	return (
		<React.Fragment>
            <div className={Nav ? 'darken' : 'invisible'} />
			<div id="navbar-wrapper" data-testid="navbar-wrapper" className="w-auto">
				<div
					id={Nav ? 'nav' : 'navHide'}
					data-testid="navbar"
					className={
						'block h-full pb-8 sm:pb-0 sm:w-34vh bg-gray-300 sm:bg-gray-200 shadow-md sm:shadow-inner overflow-auto whitespace-normal'
					}
				>
					<button
						className={
							Nav
								? 'closebtn focus:outline-none'
								: 'invisible focus:outline-none'
						}
						onClick={setNav}
					>
						&times;
					</button>
					<div className="w-3/12 sm:w-8/12 mt-8 mx-auto rounded-full overflow-auto">
						<img alt="logo" src={require('../../images/logo.png')} />
					</div>
					<ul className="text-center pt-8">
						<li className="py-1 hover:text-red-400">
							<Link to="/home">Home</Link>
						</li>
						<li className="py-1 hover:text-red-400">
							<NavLink to="/application" activeStyle={{ color: 'blue' }}>
								Application
							</NavLink>
						</li>
						<li className="py-1 hover:text-red-400">
							<NavLink to="/customer" activeStyle={{ color: 'blue' }}>
								Customer
							</NavLink>
						</li>
						<li className="py-1 hover:text-red-400">
							<Link to="/reports">Reports</Link>
						</li>
						<li className="py-1 hover:text-red-400">
							<button
								className="focus:outline-none"
								onClick={() => logoutSession(history)}
							>
								Logout
							</button>
						</li>
					</ul>
				</div>
				<div id="button" className="fixed top-0 left-0 m-2">
					<button
						className="focus:outline-none"
						onClick={setNav}
						data-testid="nav-button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="24"
							viewBox="0 0 24 24"
						>
							<path d="M4 22h-4v-4h4v4zm0-12h-4v4h4v-4zm0-8h-4v4h4v-4zm3 0v4h17v-4h-17zm0 12h17v-4h-17v4zm0 8h17v-4h-17v4z" />
						</svg>
					</button>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Navbar;
