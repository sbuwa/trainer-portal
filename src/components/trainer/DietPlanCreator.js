import React from 'react';
import 'handsontable/dist/handsontable.full.min.css';
import { registerAllModules } from 'handsontable/registry';
import { HotTable } from '@handsontable/react';
import 'jspdf-autotable';
import './Trainer.scss';
// const handleDownloadPDF = () => {
// 	// const pdf = new jsPDF({ format: 'a4', orientation: 'p' });
// 	const pdf = new jsPDF('landscape', 'pt', 'letter');

// 	const table = document.getElementById('hot');
// 	pdf.autoTable({ html: table });
// 	pdf.save('table.pdf');
// };

registerAllModules();

const DietPlanCreator = () => {
	return (
		<div className="diet-plan-container">
			{/* <button onClick={handleDownloadPDF}>Download PDF</button> */}
			<h1>Diet Plan Creator</h1>
			<div className="diet-table-container">
				<HotTable
					className="handson-table"
					columns={[
						{ width: 100 }, // column options for the first (by physical index) column
						{ width: 100 }, // column options for the second (by physical index) column
						{ width: 100 }, // column options for the third (by physical index) column
						{ width: 100 }, // column options for the third (by physical index) column
						{ width: 100 }, // column options for the third (by physical index) column
					]}
					data={[
						['', 'Morning', 'Lunch', 'Dinner', 'Snacks'],
						['Monday', , , ,],
						['Tuesday', , , ,],
						['Wednesday', , , ,],
						['Thursday', , , ,],
						['Friday', , , ,],
						['Saturday', , , ,],
						['Sunday', , , ,],
					]}
					// rowHeaders={true}
					// colHeaders={true}
					height="auto"
					licenseKey="non-commercial-and-evaluation" // for non-commercial use only
				/>
			</div>
		</div>
	);
};

export default DietPlanCreator;
