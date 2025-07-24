import React, { useState, useEffect } from 'react';
import './CompareHelpDeskPlans.css';

import comparisonData from '../data/compareData.json';
import comparisonDatau from '../data/compareData-u.json';



const CompareHelpDeskPlans = ({ pricingType = 'agent' }) => {
  const [data, setData] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [fadeIn, setFadeIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (pricingType === 'agent') {
      setData(comparisonData.categories);
    } else {
      setData(comparisonDatau.categories);
    }
    setTimeout(() => setFadeIn(true), 100); // trigger fade-in after mount
    // Mobile detection
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pricingType]);

  const renderCell = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className="checkmark">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20">
            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="arrow">
                <rect id="Rectangle-3" x="0" y="0" width="20" height="20"/>
                <path d="M16.66983,6.89507105 L8.59505595,14.6814237 C8.15092589,15.1101054 7.4200347,15.1055546 6.97065901,14.671412 L6.96978474,14.671412 C6.90451448,14.6069845 6.84456154,14.5369596 6.79055903,14.462077 L3.34068264,10.4373837 C3.12585383,10.2390538 3.00202551,9.95508673 3.00002463,9.65617586 C2.99802374,9.35726499 3.11803851,9.07152895 3.33019138,8.87010147 C3.77432144,8.4423299 4.5060869,8.44688066 4.95546259,8.88011314 L7.95071766,11.2856456 L15.0349418,5.31868733 C15.4790718,4.89000562 16.209963,4.89455638 16.6593387,5.32778886 C17.1095887,5.76193149 17.11396,6.46638934 16.66983,6.89507105 Z" id="Arrow" fill="#17B978" fillRule="nonzero"/>
              </g>
            </g>
          </svg>
        </span>
      ) : (
        <span className="dash">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20">
            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="arrow-dash">
                <g>
                  <rect id="Rectangle-3" x="0" y="0" width="20" height="20"/>
                  <path d="M3,10 L17,10" id="dash" stroke="#E2E2E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </g>
            </g>
          </svg>
        </span>
      );
    }
    return value;
  };

  const toggleCategory = (categoryIndex) => {
    const newExpandedCategories = new Set(expandedCategories);
    if (newExpandedCategories.has(categoryIndex)) {
      newExpandedCategories.delete(categoryIndex);
    } else {
      newExpandedCategories.add(categoryIndex);
    }
    setExpandedCategories(newExpandedCategories);
  };

  const renderFeatures = (features, categoryIndex, isExtra = false) => {
    return features.map((feature, featureIndex) => (
      <tr
        key={`${isExtra ? 'extra-' : ''}${featureIndex}`}
        className={`feature-row ${isExtra ? 'extra-feature fade-in' : ''}`}
      >
        <td className="feature-name">
          {feature.isLink ? (
            <a href="#" className="feature-link">{feature.name}</a>
          ) : (
            feature.name
          )}
        </td>
        {pricingType === 'agent' ? (
          <>
            <td data-pro-value={typeof feature.pro === 'boolean' ? (feature.pro ? '✓' : 'no') : feature.pro}>
              {renderCell(feature.basic)}
            </td>
            <td>{renderCell(feature.team)}</td>
            <td>{renderCell(feature.pro)}</td>
            <td data-team-value={typeof feature.team === 'boolean' ? (feature.team ? '✓' : 'no') : feature.team}>
              {renderCell(feature.enterprise)}
            </td>
          </>
        ) : (
          <>
            <td>{renderCell(feature.growth)}</td>
            <td>{renderCell(feature.scale)}</td>
            <td>{renderCell(feature.scalePlus)}</td>
            <td>{renderCell(feature.ultimate)}</td>
          </>
        )}
      </tr>
    ));
  };

  // Custom 2x2 grid for mobile view (only for agent pricing)
  const renderMobile2x2Grid = () => {
    if (pricingType !== 'agent') return null;
    return (
      <div className="compare-mobile-2x2-grid">
        {/* Plan header 2x2 vertical with wrapper for sticky full width */}
        <div className="compare-mobile-2x2-header-wrapper">
          <div className="compare-mobile-2x2-header-vertical">
            <div className="compare-mobile-2x2-header-vertical-col">
              <div className="compare-mobile-2x2-header-vertical-cell">Basic</div>
              <div className="compare-mobile-2x2-header-vertical-cell">Team</div>
            </div>
            <div className="compare-mobile-2x2-header-vertical-col">
              <div className="compare-mobile-2x2-header-vertical-cell">Pro</div>
              <div className="compare-mobile-2x2-header-vertical-cell">Enterprise PRO</div>
            </div>
          </div>
        </div>
        {/* Features */}
        {data.map((category, catIdx) => (
          <div key={catIdx} className="compare-mobile-2x2-category">
            {category.category && (
              <div className="compare-mobile-2x2-category-title">{category.category}</div>
            )}
            {category.features.map((feature, fIdx) => (
              <div className={`compare-mobile-2x2-feature feature-bg-${fIdx % 2 === 0 ? 'white' : 'grey'}`} key={fIdx}>
                <div className="compare-mobile-2x2-feature-name">
                  {feature.isLink ? (
                    <a href="#" className="feature-link">{feature.name}</a>
                  ) : feature.name}
                </div>
                <div className="compare-mobile-2x2-checkmark-grid">
                  <div className="checkmark-cell">{renderCell(feature.basic)}</div>
                  <div className="checkmark-cell">{renderCell(feature.team)}</div>
                  <div className="checkmark-cell">{renderCell(feature.pro)}</div>
                  <div className="checkmark-cell">{renderCell(feature.enterprise)}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Custom 2x2 grid for mobile view (for unlimited pricing)
  const renderMobileUnlimitedGrid = () => {
    if (pricingType !== 'unlimited') return null;
    return (
      <div className="compare-mobile-2x2-grid">
        <div className="compare-mobile-2x2-header-wrapper">
          <div className="compare-mobile-2x2-header-vertical">
            <div className="compare-mobile-2x2-header-vertical-col">
              <div className="compare-mobile-2x2-header-vertical-cell">Growth</div>
              <div className="compare-mobile-2x2-header-vertical-cell">Scale</div>
            </div>
            <div className="compare-mobile-2x2-header-vertical-col">
              <div className="compare-mobile-2x2-header-vertical-cell">Scale Plus</div>
              <div className="compare-mobile-2x2-header-vertical-cell">Ultimate</div>
            </div>
          </div>
        </div>
        {/* Features */}
        {data.map((category, catIdx) => (
          <div key={catIdx} className="compare-mobile-2x2-category">
            {category.category && (
              <div className="compare-mobile-2x2-category-title">{category.category}</div>
            )}
            {category.features.map((feature, fIdx) => (
              <div className={`compare-mobile-2x2-feature feature-bg-${fIdx % 2 === 0 ? 'white' : 'grey'}`} key={fIdx}>
                <div className="compare-mobile-2x2-feature-name">
                  {feature.isLink ? (
                    <a href="#" className="feature-link">{feature.name}</a>
                  ) : feature.name}
                </div>
                <div className="compare-mobile-2x2-checkmark-grid">
                  <div className="checkmark-cell">{renderCell(feature.growth)}</div>
                  <div className="checkmark-cell">{renderCell(feature.scale)}</div>
                  <div className="checkmark-cell">{renderCell(feature.scalePlus)}</div>
                  <div className="checkmark-cell">{renderCell(feature.ultimate)}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`compare-fade-in${fadeIn ? ' visible' : ''}`}>
      <h2 className="compare-title">Compare Help Desk Plans</h2>
      <div className="compare-container">
        {/* Desktop Table */}
        <div className="comparison-table-wrapper" style={{ display: isMobile ? 'none' : 'block' }}>
          <div className="header-table-container">
            <table className={`header-table${pricingType !== 'agent' ? ' unlimited-table' : ' agent-table'}`}>
              <thead>
                <tr>
                  <th className="feature-column"></th>
                  {pricingType === 'agent' ? (
                    <>
                      <th className="plan-header-spacing mobile-combined-left basic-column">
                        <div className="mobile-plan-group">
                          <span className="plan-name">Basic</span>
                        </div>
                      </th>
                      <th className="plan-header-spacing desktop-only team-column">Team</th>
                      <th className="plan-header-spacing desktop-only pro-column">Pro</th>
                      <th className="mobile-combined-right enterprise-column">
                        <div className="desktop-plan-name">Enterprise PRO</div>
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="plan-header-spacing mobile-combined-left growth-column">
                        <div className="mobile-plan-group">
                          <span className="plan-name">Growth</span>
                        </div>
                      </th>
                      <th className="plan-header-spacing desktop-only scale-column">Scale</th>
                      <th className="plan-header-spacing desktop-only scaleplus-column">Scale Plus</th>
                      <th className="mobile-combined-right ultimate-column">
                        <div className="desktop-plan-name">Ultimate</div>
                      </th>
                    </>
                  )}
                </tr>
              </thead>
            </table>
          </div>
          <div className="body-table-container">
            <table className="body-table">
              <tbody>
                {data.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    {category.category && (
                      <tr className="category-row">
                        <td className="category-name" colSpan="5">{category.category}</td>
                      </tr>
                    )}
                    {renderFeatures(category.features, categoryIndex)}
                    {expandedCategories.has(categoryIndex) && category.extraFeatures &&
                      renderFeatures(category.extraFeatures, categoryIndex, true)
                    }
                    {category.extraFeatures && category.extraFeatures.length > 0 && !expandedCategories.has(categoryIndex) && (
                      <tr className="view-all-row">
                        <td colSpan="5" className="view-all-container">
                          <button
                            className="view-all-button"
                            onClick={() => toggleCategory(categoryIndex)}
                          >
                            VIEW ALL +
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Mobile 2x2 grid */}
        {isMobile && pricingType === 'agent' && renderMobile2x2Grid()}
        {isMobile && pricingType === 'unlimited' && renderMobileUnlimitedGrid()}
        <div className="comparison-footnotes">
          <p className="footnote">* Planned</p>
          <p className="footnote"># Only with custom domain</p>
        </div>
      </div>
    </div>
  );
};

export default CompareHelpDeskPlans;