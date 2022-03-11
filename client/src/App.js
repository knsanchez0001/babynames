import React from 'react';
import InterestForms from './components/InterestForms/InterestForms';
import IntroSection from './components/IntroSection';
import PopularityCategories from './components/PopularityCategories/PopularityCategories';
import TopNamesTable from './components/TopNamesTable/TopNamesTable';

function App() {
	const github = <a className='a-top' href='https://github.com/knsanchez0001/babynames'>GitHub Code</a>;
	return (
		<div>
			<IntroSection child={github}/>
			<TopNamesTable/>
			<PopularityCategories/>
			<InterestForms/>
		</div>
	);
}

export default App;