import React from 'react';
import { useNavigate } from 'react-router-dom';

const NamesByBirthYearForm = () => {
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		const birthYear = document.getElementById('birth-year').value;
		const topRanks = document.getElementById('top-ranks').value;
		navigate(`/namesbirthyear/${birthYear}/${topRanks}`);
	}

	return (
		<div className='interest-div'>
			<h3>Popular Names by Birth Year</h3>
			<p>Enter the Year and Popularity for a List of the Most Popular Names</p>
			<p>Any year after 1879</p>
			<form name='popname' className='interest-form' onSubmit={handleSubmit}>
				<p>
					<input id='birth-year' type='number' min='1880' max='2020' className='interest-input' title="Birth year: Must be four numbers" required />
					<label htmlFor='birth-year'>Birth Year</label>
				</p>
				<p>
					<select id='top-ranks' name='top-ranks'>
						<option value="20">Top 20</option>
						<option value="50">Top 50</option>
						<option value="100">Top 100</option>
						<option value="500">Top 500</option>
						<option value="1000">Top 1000</option>
					</select>
					<label htmlFor='top-ranks'>Popularity</label>
				</p>
				<p>
					<input type='submit' value='Go' />
				</p>
			</form>
		</div>
	);
};

export default NamesByBirthYearForm;