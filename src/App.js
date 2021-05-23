import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/main';
import authStore from './store/store';

function App() {
	const isStillAuthenticated = authStore((state) => state.isStillAuthenticatedAction);
	const getCsrfToken = authStore((state) => state.getCsrfToken);

	useEffect(() => {
        isStillAuthenticated();
		getCsrfToken();
    })

	return (
		<div
			id="page-container"
			className="w-full h-full m-0 p-0 bg-gray-200 grid grid-cols-1"
		>
			<Router>
				<Routes />
			</Router>
		</div>
	);
}

export default App;
