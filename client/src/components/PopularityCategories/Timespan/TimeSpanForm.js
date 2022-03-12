import React from 'react';
import PropTypes from 'prop-types';

const TimeSpanForm = ({parentCallback}) => {
	function handleSubmit(e) {
		e.preventDefault();
		const startYear = document.getElementById('start-year').value;
		const endYear = document.getElementById('end-year').value;
		parentCallback({startYear, endYear});
	}

	function getStartYear(){
		return document.getElementById('start-year') ? document.getElementById('start-year').value : 1880;
	}

	return (
		<div className='interest-div'>
			<h3>Select Time Span</h3>
			<form name='popname' className='interest-form' onSubmit={handleSubmit}>
				<p>
					<input id='start-year' type='number' min='1880' max='2020'
						className='interest-input' title="start year: Must be four numbers" required />
					<label htmlFor='start-year'>Start Year</label>
				</p>
				<p>
					<input id='end-year' type='number' min={getStartYear()} max='2020' className='interest-input' title="end year: Must be four numbers" required />
					<label htmlFor='end-year'>End Year</label>
				</p>
				<p>
					<input type='submit' value='Go'/>
				</p>
			</form>
		</div>
	);
};

TimeSpanForm.propTypes = {
	parentCallback: PropTypes.func
};

export default TimeSpanForm;