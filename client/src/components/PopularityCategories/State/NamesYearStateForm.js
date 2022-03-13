import React from 'react';
import PropTypes from 'prop-types';

const tableHeading = [
	{ label: 'Rank', color: '#eeeeee' },
	{ label: 'Male Name', color: '#99ccff' }, { label: 'Number of Males', color: '#99ccff' },
	{ label: 'Female Name', color: 'pink' }, { label: 'Number of Females', color: 'pink' }];

const NamesYearStateForm = ({ parentCallback }) => {

	function handleSubmit(e) {
		e.preventDefault();
		const state = document.getElementById('state').value;
		const birthYear = document.getElementById('birth-year').value;
		parentCallback({ state, birthYear, tableHeading });
	}

	return (
		<div className='interest-div'>
			<h3>Top 100 names for a selected State and year of birth</h3>
			<form name='popnamestate' className='interest-form' onSubmit={handleSubmit}>
				<p>
					<select id='state' name='state'>
						<option value="AL">Alabama</option>
						<option value="AK">Alaska</option>
						<option value="AZ">Arizona</option>
						<option value="AR">Arkansas</option>
						<option value="CA">California</option>
						<option value="CO">Colorado</option>
						<option value="CT">Connecticut</option>
						<option value="DE">Delaware</option>
						<option value="DC">District of Columbia</option>
						<option value="FL">Florida</option>
						<option value="GA">Georgia</option>
						<option value="HI">Hawaii</option>
						<option value="ID">Idaho</option>
						<option value="IL">Illinois</option>
						<option value="IN">Indiana</option>
						<option value="IA">Iowa</option>
						<option value="KS">Kansas</option>
						<option value="KY">Kentucky</option>
						<option value="LA">Louisiana</option>
						<option value="ME">Maine</option>
						<option value="MD">Maryland</option>
						<option value="MA">Massachusetts</option>
						<option value="MI">Michigan</option>
						<option value="MN">Minnesota</option>
						<option value="MS">Mississippi</option>
						<option value="MO">Missouri</option>
						<option value="MT">Montana</option>
						<option value="NE">Nebraska</option>
						<option value="NV">Nevada</option>
						<option value="NH">New Hampshire</option>
						<option value="NJ">New Jersey</option>
						<option value="NM">New Mexico</option>
						<option value="NY">New York</option>
						<option value="NC">North Carolina</option>
						<option value="ND">North Dakota</option>
						<option value="OH">Ohio</option>
						<option value="OK">Oklahoma</option>
						<option value="OR">Oregon</option>
						<option value="PA">Pennsylvania</option>
						<option value="RI">Rhode Island</option>
						<option value="SC">South Carolina</option>
						<option value="SD">South Dakota</option>
						<option value="TN">Tennessee</option>
						<option value="TX">Texas</option>
						<option value="UT">Utah</option>
						<option value="VA">Virginia</option>
						<option value="VT">Vermont</option>
						<option value="WA">Washington</option>
						<option value="WV">West Virginia</option>
						<option value="WI">Wisconsin</option>
						<option value="WY">Wyoming</option>
					</select>
					<label htmlFor='state'>State</label>
				</p>
				<p>
					<input id='birth-year' type='number' min='1960' max='2020' className='interest-input' title="Birth year: Must be four numbers" required />
					<label htmlFor='birth-year'>Birth Year</label>
				</p>
				<p>
					<input type='submit' value='Go' />
				</p>
			</form>
		</div>
	);
};

NamesYearStateForm.propTypes = {
	parentCallback: PropTypes.func
};

export default NamesYearStateForm;