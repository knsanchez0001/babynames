import React from 'react';
import { Link } from 'react-router-dom';
import IntroSection from '../IntroSection';

const Top5Names = () => {
	const back = <Link className='a-top' to={'/'}>Back</Link>;
	return (
		<>
			<IntroSection child={back} />
			<section>
				<h3 className='header-c'>
					<span className='header-c-text'>TODO</span>
				</h3>
			</section>
		</>
	);
};

export default Top5Names;