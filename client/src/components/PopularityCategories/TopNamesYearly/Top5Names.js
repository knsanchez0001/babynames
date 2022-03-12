import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IntroSection from '../../IntroSection';
import Table from '../../Table';

const Top5Names = () => {
	let [tableBody, setTableBody] = useState(null);

	useEffect(() => {
		getTopNames(setTableBody);
	});

	const tableHeading = [
		{ label: 'Year', color: '#eeeeee' },
		{ label: '1', color: 'pink' }, { label: '2', color: 'pink' }, { label: '3', color: 'pink' }, { label: '4', color: 'pink' }, { label: '5', color: 'pink' }, 
		{ label: '1', color: '#99ccff' }, { label: '2', color: '#99ccff' }, { label: '3', color: '#99ccff' }, { label: '4', color: '#99ccff' }, { label: '5', color: '#99ccff' }
	];

	const back = <Link className='a-top' to={'/'}>Back</Link>;
	return (
		<>
			<IntroSection child={back} />
			<section>
				<h3 className='header-c'>
					<span className='header-c-text'>Top Five Names for Births in 1880-2020</span>
				</h3>
				<Table heading={tableHeading} body={tableBody} />
			</section>
		</>
	);
};

async function getTopNames(setTableBody) {
	const response = await fetch('/api/top_five_yearly');
	if (response.ok) {
		const json = JSON.parse(await response.text());
		const females = json.females;
		const males = json.males;

		const body = [];
		for (let i = 0; i < 141; i++) {
			body.push([males[i]._id, ...females[i].names, ...males[i].names]);
		}
		setTableBody(body);
	}
}

export default Top5Names;