import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RankChange from './components/PopularityCategories/RankChange';
import Top5Names from './components/PopularityCategories/Top5Names';
import Timespan from './components/PopularityCategories/Timespan';
import State from './components/PopularityCategories/State';
import Territories from './components/PopularityCategories/Territories';
import NamePopularity from './components/InterestForms/NamePopularity';
import NamesByBirthYear from './components/InterestForms/NamesByBirthYear';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/rankchange' element={<RankChange />} />
      <Route path='/top5names' element={<Top5Names />} />
      <Route path='/timespan' element={<Timespan />} />
      <Route path='/state' element={<State />} />
      <Route path='/territories' element={<Territories />} />
      <Route path='/namepopularity/:name/:start/:sex' element={<NamePopularity />} />
      <Route path='/namesbirthyear/:year/:rank' element={<NamesByBirthYear />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
