import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PlansPricing from "./components/PlansPricing";
import CompareHelpDeskPlans from "./components/CompareHelpDeskPlans";
import FAQ from "./components/FAQ";
import MoreFromHappyFox from "./components/MoreFromHappyFox";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
import Chat from "./components/Chat";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('agent');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen />}
      {!showSplash && (
        <>
          <Navbar />
          <PlansPricing activeTab={activeTab} setActiveTab={setActiveTab} />
          <CompareHelpDeskPlans pricingType={activeTab} />
          <FAQ />
          <MoreFromHappyFox />
          <Footer />
        </>
      )}
      <Chat />
    </>
  );
}

export default App;
