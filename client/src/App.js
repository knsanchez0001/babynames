import InterestForms from './components/InterestForms';
import IntroSection from './components/IntroSection';
import PopularityCategories from './components/PopularityCategories';
import TopNamesTable from './components/TopNamesTable';

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