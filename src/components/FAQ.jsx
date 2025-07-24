import React, { useState } from 'react';
import './FAQ.css';

const Faq = () => {
  const [openQuestions, setOpenQuestions] = useState([]);

  const faqData = [
    {
      question: "Who are help desk agents?",
      answer: "Support agents (help desk staff) who will be actively managing and responding to tickets raised by contacts."
    },
    {
      question: "What are Categories?",
      answer: "Categories help organize tickets by type, department, or topic, making it easier to route and manage customer inquiries efficiently."
    },
    {
      question: "How can I change my plan?",
      answer: "You can upgrade or downgrade your plan at any time from your account settings. Changes take effect immediately and billing is prorated."
    },
    {
      question: "Do you offer a trial?",
      answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start your trial."
    },
    {
      question: "Do you offer discounts for non-profits or educational institutes?",
      answer: "Yes, we provide special pricing for non-profit organizations and educational institutions. Contact our sales team for more information."
    },
    {
      question: "What are the available billing cycles?",
      answer: "We offer monthly, annual, and 2-year plans come with significant discounts compared to monthly billing."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestions(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${openQuestions.includes(index) ? 'active' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleQuestion(index)}
              >
                <span className="question-text">{item.question}</span>
                <span className={`faq-icon ${openQuestions.includes(index) ? 'open' : ''}`}>
                  <img 
                    src="//assets.www.happyfox.com/v2/images/down-arrow.svg" 
                    alt="Toggle FAQ" 
                    className="arrow-icon"
                  />
                </span>
              </button>

              <div className={`faq-answer ${openQuestions.includes(index) ? 'open' : ''}`}>
                <div className="answer-content">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;