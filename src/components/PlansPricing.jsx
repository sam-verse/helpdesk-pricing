import React, { useState } from 'react';
import './PlansPricing.css';

// Spacer to push content below fixed navbar and sub-header
const HEADER_HEIGHT = 58; // px, main header
const SUB_HEADER_HEIGHT = 62; // px, sub-header (adjust if needed)
const TOTAL_HEADER_HEIGHT = HEADER_HEIGHT + SUB_HEADER_HEIGHT;
const PricingTab = ({ activeTab, setActiveTab }) => {
  const [billingCycle, setBillingCycle] = useState('annual');
  const arrowRight = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="plan-demo-button-arrow"
    >
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const agentBasedPricing = [
    {
      id: 'basic',
      name: 'Basic',
      pricing: {
        monthly: 29,
        annual: 24,
        '2year': 21
      },
      period: 'Per agent/mo',
      features: [
        'Unlimited Tickets',
        'Omnichannel Ticket Creation',
        'SLA Management',
        'Knowledge Base',
        'SSO (GSuite/SAML/Azure)',
        'Up to 5 Agents'
      ]
    },
    {
      id: 'team',
      name: 'Team',
      pricing: {
        monthly: 79,
        annual: 49,
        '2year': 39
      },
      period: 'Per agent/mo',
      features: [
        'Everything in Basic, and:',
        'Multi-brand Helpdesk',
        'Custom Email',
        'Custom Domain',
        'Custom Roles and Permissions',
        'Custom Ticket Queues',
        '24/5 Email Support',
        'Optional EU Data Center'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      pricing: {
        monthly: 119,
        annual: 99,
        '2year': 89
      },
      period: 'Per agent/mo',
      isPopular: true,
      features: [
        'Everything in Team, and:',
        'Proactive Agent Collision',
        'Task Management',
        'Asset Management',
        'Scheduled Tickets',
        'Load Balanced Ticket Assignment',
        'Password Policy Management',
        '24/7 Email Support',
        'Uptime SLA'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise PRO',
      isContactSales: true,
      features: [
        'Everything in Pro, and:',
        'Agent Scripting',
        '2 TB Attachment Store',
        'All-time Reporting History',
        'Advanced Audit Logs',
        '24/7 Phone Support',
        'Customer Success Manager'
      ]
    }
  ];

  const unlimitedAgentsPricing = [
    {
      id: 'growth',
      name: 'Growth',
      pricing: {
        annual: 1999,
        '2year': 1599
      },
      period: '/ month',
      features: [
        'Unlimited Agents',
        '20,000 Tickets / year',
        '20 Custom Fields'
      ]
    },
    {
      id: 'scale',
      name: 'Scale',
      pricing: {
        annual: 3999,
        '2year': 3199
      },
      period: '/ month',
      features: [
        'Unlimited Agents',
        '150,000 Tickets / year',
        '100 Custom Fields'
      ]
    },
    {
      id: 'scale-plus',
      name: 'Scale Plus',
      pricing: {
        annual: 5999,
        '2year': 4799
      },
      period: '/ month',
      isPopular: true,
      features: [
        'Unlimited Agents',
        '300,000 Tickets / year',
        '200 Custom Fields'
      ]
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      isContactSales: true,
      features: [
        'Unlimited Agents',
        '1,000,000 Tickets / year',
        '300 Custom Fields'
      ]
    }
  ];

  const getCurrentPricingData = () => {
    return activeTab === 'agent' ? agentBasedPricing : unlimitedAgentsPricing;
  };

  const getCurrentPrice = (plan) => {
    if (plan.isContactSales) return null;
    return plan.pricing[billingCycle];
  };

  const getAvailableBillingOptions = () => {
    if (activeTab === 'unlimited') {
      return ['annual', '2year']; 
    }
    return ['monthly', 'annual', '2year']; 
  };

  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'unlimited' && billingCycle === 'monthly') {
      setBillingCycle('annual');
    }
  };

  const availableBillingOptions = getAvailableBillingOptions();

  return (
    <div style={{ fontSize: '1.08em' }}>
      {/* Spacer to push content below fixed navbar and sub-header */}
      <div style={{  width: '100%' }} aria-hidden="true"></div>

      <div className="pricing-header-section">
        <div className="pricing-header-content">
          <h1 className="pricing-main-title">Plans & Pricing</h1>
          <div className="pricing-navigation-tabs">
            <button 
              className={`pricing-tab-button ${activeTab === 'agent' ? 'active' : ''}`}
              onClick={() => handleTabChange('agent')}
            >
              Agent-based pricing
            </button>
            <button 
              className={`pricing-tab-button ${activeTab === 'unlimited' ? 'active' : ''}`}
              onClick={() => handleTabChange('unlimited')}
            >
              Unlimited Agents
            </button>
          </div>
        </div>
      </div>

      <div className="pricing-content-section">
        <div className={`billing-cycle-toggle ${activeTab === 'unlimited' ? 'unlimited-layout' : ''}`}> 
          {availableBillingOptions.includes('monthly') && (
            <button 
              className={`billing-cycle-button ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => handleBillingCycleChange('monthly')}
            >
              Monthly
            </button>
          )}
          <button 
            className={`billing-cycle-button ${billingCycle === 'annual' ? 'active' : ''}`}
            onClick={() => handleBillingCycleChange('annual')}
          >
            Annual
          </button>
          <button 
            className={`billing-cycle-button ${billingCycle === '2year' ? 'active' : ''}`}
            onClick={() => handleBillingCycleChange('2year')}
          >
            <span className="savings-plan-text">2-Year Savings Plan</span>
            <span className="savings-plan-label">Paid Up-Front</span>
          </button>
        </div>

        <div className={`pricing-cards-grid ${activeTab === 'unlimited' ? 'unlimited-layout' : ''}`}>
          {getCurrentPricingData().map((plan, index) => (
            <div 
              key={plan.id} 
              className={`pricing-plan-card ${plan.isPopular ? 'featured' : ''}`}
            >
              {plan.isPopular && <div className="plan-popular-badge">Most Popular</div>}
              <h3 className="plan-name-title">{plan.name}</h3>
              {plan.isContactSales ? (
                <div className="plan-contact-sales">
                  <a href="#" className="plan-contact-link">Contact Sales</a>
                </div>
              ) : (
                <div className="plan-price-container">
                  <span className="plan-price-currency">$</span>
                  <span className="plan-price-amount">
                    {getCurrentPrice(plan)}
                  </span>
                  <span className="plan-price-period">{plan.period}</span>
                </div>
              )}
              <ul className="plan-features-list">
                {plan.features.map((feature, index) => {
                  const isHeaderFeature = (
                    (plan.id === 'team' || plan.id === 'pro' || plan.id === 'enterprise') && 
                    index === 0
                  );
                  if (isHeaderFeature) {
                    return (
                      <div key={index} className="plan-feature-header">
                        {feature}
                      </div>
                    );
                  }
                  return (
                    <li key={index} className="plan-feature-item">
                      {feature}
                    </li>
                  );
                })}
              </ul>
              <button className="plan-demo-button">
                 <span style={{ fontWeight: 550 }}>Get a Demo</span>
                <span className="plan-demo-button-arrow">{arrowRight}</span>
              </button>
            </div>
          ))}
        </div>
        <div className='pricing-note-section'>
          <div className='pricing-note-text'>
            <p>
              {activeTab === 'agent' 
                ? (
                    <>
                      Number of agents is capped at 5 for Basic plan. No limit on agents for other <br/> plans. Non-profit and educational organizations are eligible for a discount.
                    </>
                  )
                : (
                  <>
                  All plans come with SSL security, unlimited agents, smart rules, knowledge base, multilingual support, <br/> rich text formatting in tickets and iOS & Android apps.
                  </>
                )
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTab;