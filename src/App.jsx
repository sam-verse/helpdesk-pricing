import React from "react";
import Navbar from "./components/Navbar";
import PlansPricing from "./components/PlansPricing";
import CompareHelpDeskPlans from "./components/CompareHelpDeskPlans";
import FAQ from "./components/FAQ";
import MoreFromHappyFox from "./components/MoreFromHappyFox";
import Footer from "./components/Footer";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('agent');

  return (
    <>
      <Navbar />
      <PlansPricing activeTab={activeTab} setActiveTab={setActiveTab} />
      <CompareHelpDeskPlans pricingType={activeTab} />
      <FAQ />
      <MoreFromHappyFox />
      <Footer />
    </>
  );
}

export default App;
