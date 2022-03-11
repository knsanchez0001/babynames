import React from 'react';
import PopularityCategory from './PopularityCategory';

const PopularityCategories = () => {
	return (
		<section>
			<div className='wrapper icons-wrapper'>
				<h3>View Popularity of Names By:</h3>
				<div className='icons-div'>
					<PopularityCategory link='/rankchange' name={'Change in popularity'} pic={'https://www.ssa.gov/OACT/babynames/assets/images/popularity.svg'} />
					<PopularityCategory link='/top5names' name={'Top 5 names'} pic={'https://www.ssa.gov/OACT/babynames/assets/images/top5.svg'} />
					<PopularityCategory link='/timespan' name={'Time span'} pic={'https://www.ssa.gov/OACT/babynames/assets/images/decade.svg'} />
					<PopularityCategory link='/state' name={'State'} pic={'https://www.ssa.gov/OACT/babynames/assets/images/state.svg'} />
					<PopularityCategory link='/territories' name={'U.S. territories'} pic={'https://www.ssa.gov/OACT/babynames/assets/images/territory.svg'} />
				</div>

			</div>
		</section>
	);
};

export default PopularityCategories;