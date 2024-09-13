import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { SurveyPage } from './components/pages/SurveyPage';
import { LandingPage } from './components/pages/LandingPage';
import { SearchPage } from './components/pages/SearchPage';
import { PlanPage } from './components/pages/PlanPage';
import { CompanionPage } from './components/pages/CompanionPage';
import { MyPage } from './components/pages/MyPage';
import { YourPage } from './components/pages/YourPage';
import { ScheduleDetail } from './components/pages/ScheduleDetail'
import { PocaPage } from './components/pages/PocaPage';
import { Navbar } from './components/organisms/Navbar';

const App: React.FC = () => {

  const location = useLocation();

  return (
    <>
      <div className='w-full h-full bg-[#F4F4EE] font-TheJamsil'>
      {location.pathname !== '/' && location.pathname != '/survey' && <Navbar className="fixed top-0 w-full" />}
      <Routes>
        <Route path="/" element={<LandingPage />} />          
        <Route path="/survey" element={<SurveyPage/>} />
        <Route path="/main" element={null} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/plan" element={<PlanPage/>} />
        <Route path="/companion" element={<CompanionPage/>} />
        <Route path="/my" element={<MyPage/>} /> 
        <Route path="/your" element={<YourPage/>} /> 
        <Route path="/schedule" element={<ScheduleDetail/>} /> 
        <Route path="/poca" element={<PocaPage/>} /> 
      </Routes>
      </div> 
    </>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
