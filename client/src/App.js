import React from 'react';
import InterestForms from './components/InterestForms/InterestForms';
import IntroSection from './components/IntroSection';
import PopularityCategories from './components/PopularityCategories/PopularityCategories';
import TopNamesTable from './components/TopNamesTable/TopNamesTable';

function App() {
	return (
		<div>
			<IntroSection/>
			<TopNamesTable/>
			<PopularityCategories/>
			<InterestForms/>
		</div>
	);
}

export default App;