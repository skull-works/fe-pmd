import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const ReportsController = {
	getCalendarItems: async (inputs, csrf, setDates, setCustomerPayments) => {
		try {
			let data = await fetch(
				`/calendarReport/${inputs.area_code}/${inputs.start_date}/${inputs.end_date}`,
				{
					method: 'GET',
					headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
				}
			)
				.then((res) => res.json())
				.catch((err) => err);
			if (data.allDates && data.customerPayments) {
				setDates(data.allDates);
				setCustomerPayments(data.customerPayments);
			} else {
				toast.error(
					(data.error && data.error.message) ||
						'Something went wrong, contact system administrator',
					{ autoClose: 5000 }
				);
			}
		} catch (err) {
			console.log(err);
			toast.error('Something went wrong, contact system administrator', {
				autoClose: 5000,
			});
		}
	},
	getLineGraphValues: async (inputs, csrf, setLineGraph) => {
		const area_code = inputs.area_code || 'all_code';
		const start_date = inputs.start_date ||  new Date().toISOString().split('T')[0];
		const end_date = inputs.end_date ||  new Date().toISOString().split('T')[0];
		
		try {
			let response = await fetch(
				`/GraphReport/${area_code}/${start_date}/${end_date}`,
				{
					method: 'GET',
					headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
				}
			);
			let data = await response.json();

			if (data.length > 0) {
				setLineGraph(data);
			} else {
				toast.error(
					(data.error && data.error.message) ||
						'Something went wrong, contact system administrator',
					{ autoClose: 5000 }
				);
			}
		} catch (err) {
			console.log(err);
			toast.error('Something went wrong, contact system administrator', {
				autoClose: 5000,
			});
		}
	},
};

export default ReportsController;
