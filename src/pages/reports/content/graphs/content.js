import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const GraphContent = ({ lineGraph }) => {
	let totalReleased = 0;
	let totalRecieved = 0;

	for (const item of lineGraph) {
		totalRecieved += item.recieved;
		totalReleased += item.released;
	}

	return (
		<React.Fragment>
			<div className="flex flex-col mt-2 pb-12 w-11/12 mx-auto">
				<div className="mt-12 flex flex-col lg:flex-row">
					<div className="w-full sm:w-12/12 lg:pb-4 lg:w-8/12 bg-gray-100 rounded-lg shadow-md">
						<div className="flex flex-row justify-between">
							<div className="w-6/12 mt-5 ml-5 font-Nunito text-xs sm:w-34vh sm:text-sm">
								<h1>Money Recieved and Released</h1>
							</div>
							<div className="w-6/12 mt-5 ml-5 font-Nunito text-xs sm:w-34vh sm:text-sm">
								<h1>Total Money Released: {totalReleased}</h1>
								<h1>Total Money Recieved: {totalRecieved}</h1>
							</div>
						</div>

						<ResponsiveContainer width="100%" height={400}>
							<LineChart
								data={lineGraph}
								margin={{
									top: 40,
									right: 40,
									left: 5,
									bottom: 5,
								}}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line
									type="monotone"
									dataKey="released"
									stroke="#8884d8"
									activeDot={{ r: 8 }}
								/>
								<Line type="monotone" dataKey="recieved" stroke="#82ca9d" />
							</LineChart>
						</ResponsiveContainer>
					</div>
					<div className="w-full mt-5 sm:w-12/12 lg:ml-20 lg:mt-0 lg:w-4/12 bg-gray-100 rounded-lg shadow-md">
						<div className="w-5/12 mt-20vh ml-15vh font-Nunito text-xs sm:w-34vh sm:text-sm">
							<h1 className="lg:text-2xl">Under Construction</h1>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default GraphContent;
