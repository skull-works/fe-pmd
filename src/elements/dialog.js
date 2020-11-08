import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Dialog = {
	confirm: (callback, args, message1, message2) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="custom-ui px-10 py-4 rounded-md bg-gray-200 shadow-md text-md">
						<div className="py-4">
							<h1>{message1}</h1>
							<p>{message2}</p>
						</div>
						<button
							className="rounded-lg px-6 py-1 bg-gray-700 hover:bg-green-500 text-gray-300 text-sm focus:outline-none"
							onClick={() => {
								onClose();
								callback(...args);
							}}
						>
							Yes
						</button>
						<button
							className="rounded-lg px-6 py-1 bg-gray-700 hover:bg-green-500 text-gray-300 text-sm focus:outline-none ml-2"
							onClick={onClose}
						>
							No
						</button>
					</div>
				);
			},
		});
	},
	filterDialog: (callback, args, ContentComponent) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="custom-ui px-10 py-4 rounded-md bg-gray-200 shadow-md text-md">
						<div className="py-8">
							<h1 className="font-Nunito text-lg pb-6">Pick and Input filters:</h1>
							<ContentComponent />
						</div>
						<button
							className="rounded-lg px-6 py-1 bg-gray-700 hover:bg-green-500 text-gray-300 text-sm focus:outline-none"
							onClick={() => {
								onClose();
								callback(...args);
							}}
						>
							Filter
						</button>
						<button
							className="rounded-lg px-6 py-1 bg-gray-700 hover:bg-green-500 text-gray-300 text-sm focus:outline-none ml-2"
							onClick={onClose}
						>
							Close
						</button>
					</div>
				);
			},
		});
	},
};

export default Dialog;
