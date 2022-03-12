import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IntroSection from '../../IntroSection';
import Table from '../../Table';
import NamesYearStateForm from './NamesYearStateForm';

const State = () => {
	let [input, setInput] = useState(null);
	let [tableBody, setTableBody] = useState(null);
  
	const handleCallback = (childInput) =>{
		setInput(childInput);
	};

	useEffect(() => {
		if(input){
			getTopNamesByState(input, setTableBody);
		}
	}, [input]);

	const tableHeading = [
		{ label: 'Rank', color: '#eeeeee' },
		{ label: 'Male Name', color: '#99ccff' }, { label: 'Number of Males', color: '#99ccff' },
		{ label: 'Female Name', color: 'pink' }, { label: 'Number of Females', color: 'pink' }];

	const back = <Link className='a-top' to={'/'}>Back</Link>;
	return (
		<>
			<IntroSection child={back} />
			<section>
				<h3 className='header-c'>
					<span className='header-c-text'>Popular Names by State</span>
				</h3>
				<NamesYearStateForm parentCallback = {handleCallback}/>
				<Table heading={tableHeading} body={tableBody} />
			</section>
		</>
	);
};

/**
 * 
 * @param {object} input 
 * @param {function} setTableBody 
 */
async function getTopNamesByState(input, setTableBody){
	const response = await fetch(`/api/top_names_state/${input.state}/${input.birthYear}/100`);
	if (response.ok) {
		const json = JSON.parse(await response.text());
		const females = json.females;
		const males = json.males;

		const body = [];
		for (let i = 0; i < 100; i++) {
			body.push([(i + 1).toString(), males[i]._id, males[i].count.toLocaleString('en'), females[i]._id, females[i].count.toLocaleString('en')]);
		}
		setTableBody(body);
	}
}

export default State;