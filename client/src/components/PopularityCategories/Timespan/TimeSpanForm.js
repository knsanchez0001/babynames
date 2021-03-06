import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TimeSpanForm = ({ parentCallback }) => {
	let [startYear, setStartYear] = useState(null);

	/**
	 * 
	 * @param {Event} e 
	 */
	function handleSubmit(e) {
		e.preventDefault();
		const endYear = document.getElementById('end-year').value;
		parentCallback({ startYear, endYear });
	}

	return (
		<div className='interest-div'>
			<h3>Select Time Span</h3>
			<form name='popname' className='interest-form' onSubmit={handleSubmit}>
				<p>
					<input id='start-year' type='number' min='1880' max='2020' onChange={(e) => setStartYear(e.target.value)}
						className='interest-input' title="start year: Must be four numbers" required />
					<label htmlFor='start-year'>Start Year</label>
				</p>
				<p>
					<input id='end-year' type='number' min={startYear ? Math.max(startYear, 1880) : 1880} max='2020' className='interest-input' title="end year: Must be four numbers" required />
					<label htmlFor='end-year'>End Year</label>
				</p>
				<p>
					<input type='submit' value='Go' />
				</p>
			</form>
		</div>
	);
};

TimeSpanForm.propTypes = {
	parentCallback: PropTypes.func
};

export default TimeSpanForm;