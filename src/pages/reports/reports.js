import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
//layout
import Navbar from '../../layout/navbar/navbar';
//actions
import ReportsActions from '../../actions/reports';

const Reports = () => {
	const location = useLocation();
	const { ContentComponent } = ReportsActions;
	var query = location.search.split('=')[1];

	return (
		<Fragment>
			<div className="flex flex-col sm:flex-row">
				<Navbar />
				<div
					id="content-wrapper"
					className="h-100vh w-full overflow-auto whitespace-normal bg-gray-200"
				>
					{/* content here */}
					<ContentComponent locationQuery={query} />
				</div>
			</div>
		</Fragment>
	);
};

export default Reports;
