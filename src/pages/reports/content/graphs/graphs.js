import React from 'react';
//hooks
import { Hooks } from './hooks';
//elements
import Input from '../../../../elements/input';
import Date from '../../../../elements/date';
import Dialog from '../../../../elements/dialog';
//component
import GraphContent from './content';
//controller
import ReportsController from '../../../../controllers/reports';
//Authentication
import { IsUserStillLoggedIn } from '../../../mainHooks/AuthHooks';

const GraphReports = () => {
	let { csrf } = IsUserStillLoggedIn();
	const store = Hooks();

	const ShowDialogContent = () => {
		return (
			<React.Fragment>
				<div className="font-Nunito text-md">
					<Input label="Area Group:" name="area_code" store={store} />
				</div>
				<div className="font-Nunito text-md">
					<Date label="From:" name="start_date" store={store} />
					<Date label="To:" name="end_date" store={store} />
				</div>
			</React.Fragment>
		);
	};

	return (
		<div id="content-wrapper">
			{/* button to show inputs */}
			<div className="w-11/12 pb-4 mt-20 mx-auto border-b-2 border-gray-500 flex justify-end">
				<button
					className="bg-teal-400 px-2 py-2 text-white rounded-md focus:outline-none hover:bg-green-500"
					onClick={() =>
						Dialog.filterDialog(
							ReportsController.getLineGraphValues,
							[store.inputs, csrf, store.setLineGraph],
							ShowDialogContent
						)
					}
				>
					Show Filters
				</button>
			</div>
			{/* inputs and customer information */}
			<div className={store.filterShow ? 'darken' : 'invisible'}>
				<div className="bg-gray-200 px-10 center">showing</div>
			</div>

			{/* content */}
			<GraphContent lineGraph={store.lineGraph} />
		</div>
	);
};

export default GraphReports;
