import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <img 
            src="https://s3.us-west-2.amazonaws.com/assets.www.happyfox.com/images/hf-logo-mini.svg" 
            alt="HappyFox" 
            className="footer__logo-img" 
          />
        </div>
        <div className="footer__columns">
          <div className="footer__column">
            <h3>FEATURES</h3>
            <ul>
              <li><a href="#">Email Ticketing</a></li>
              <li><a href="#">Knowledge Base</a></li>
              <li><a href="#">Help Desk Reporting</a></li>
              <li><a href="#">Help Desk Automation</a></li>
              <li><a href="#">Multilingual Help Desk</a></li>
              <li><a href="#">Self Service Portal</a></li>
              <li><a href="#">SLA Management</a></li>
              <li><a href="#">Satisfaction Survey</a></li>
              <li><a href="#">Email Notification</a></li>
              <li><a href="#">Help Desk Customization</a></li>
              <li><a href="#">Help Desk Ticket Features</a></li>
              <li><a href="#">Multilingual Knowledge Base</a></li>
              <li><a href="#">Internal Knowledge Base</a></li>
              <li><a href="#">HappyFox SMS</a></li>
              <li><a href="#">Asset Management</a></li>
              <li><a href="#">Task Management</a></li>
              <li><a href="#">Agent Scripting</a></li>
            </ul>
          </div>
          <div className="footer__column">
            <h3>FOR BUSINESSES</h3>
            <ul>
              <li><a href="#">Enterprise</a></li>
              <li><a href="#">Small-Business</a></li>
            </ul>
            <h3>FOR INDUSTRIES</h3>
            <ul>
              <li><a href="#">Education, Retail, Travel,</a></li>
              <li><a href="#">IT Services, Telecom, Government,</a></li>
              <li><a href="#">Non-Profit Organizations,</a></li>
              <li><a href="#">Healthcare, Real Estate, Airlines</a></li>
              <li><a href="#">Manufacturing, Shipping,</a></li>
            </ul>
            <h3>FOR TEAMS</h3>
            <ul>
              <li><a href="#">Customer Support, IT HR, Accounting,</a></li>
              <li><a href="#">Facilities, Marketing, Sales</a></li>
            </ul>
            <h3>SWITCH TO HAPPYFOX</h3>
            <ul>
              <li><a href="#">Switch from Zendesk</a></li>
              <li><a href="#">Switch from Kayako</a></li>
            </ul>
            <h3>COMPARE</h3>
            <ul>
              <li><a href="#">Zendesk vs HappyFox</a></li>
              <li><a href="#">Freshdesk vs HappyFox</a></li>
              <li><a href="#">Kayako vs HappyFox</a></li>
              <li><a href="#">Zohodesk vs HappyFox</a></li>
              <li><a href="#">Gmail Alternative for Support</a></li>
            </ul>
          </div>
          <div className="footer__column">
            <h3>USE CASES</h3>
            <ul>
              <li><a href="#">Help Desk Software</a></li>
              <li><a href="#">Ticketing System</a></li>
              <li><a href="#">Shared Inbox Software</a></li>
              <li><a href="#">Trouble Ticket Management</a></li>
              <li><a href="#">Issue Tracking Software</a></li>
              <li><a href="#">Customer Service</a></li>
              <li><a href="#">Email Support Software</a></li>
              <li><a href="#">Customer Complaint Management</a></li>
              <li><a href="#">Internal Help Desk Software</a></li>
              <li><a href="#">Ticket Tracking Software</a></li>
              <li><a href="#">Contact Center Software</a></li>
              <li><a href="#">IT Help Desk Software</a></li>
              <li><a href="#">Case Management Software</a></li>
              <li><a href="#">Cloud Help Desk</a></li>
              <li><a href="#">Mobile Help Desk</a></li>
              <li><a href="#">Remote Customer Support</a></li>
              <li><a href="#">Multi-Brand Helpdesk</a></li>
              <li><a href="#">Software Request Management System</a></li>
              <li><a href="#">Field Service Software</a></li>
              <li><a href="#">Work Order Management</a></li>
            </ul>
          </div>
          <div className="footer__column">
            <h3>RESOURCES</h3>
            <ul>
              <li><a href="#">E-Books & Guides</a></li>
              <li><a href="#">Webinars</a></li>
              <li><a href="#">Customer Stories</a></li>
              <li><a href="#">Videos</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help Desk API Docs</a></li>
            </ul>
            <h3>COMPANY</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Customers</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Press & Media</a></li>
              <li><a href="#">Partner program</a></li>
            </ul>
            <h3>CONTACT US</h3>
            <ul>
              <li><a href="#">Contact Sales</a></li>
              <li><a href="#">Get Support</a></li>
              <li><a href="#">1-949-535-2220</a></li>
              <li><a href="#">support@happyfox.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__products">
          <div className="footer__product-links">
            <a href="#" className="footer__product-link ">
              <img src="/footer-logo/helpdesk-logo.svg" alt="Help Desk" className="footer__product-icon" /> Help Desk
            </a>
            <a href="#" className="footer__product-link ">
              <img src="/footer-logo/service-desk.svg" alt="Service Desk" className="footer__product-icon" /> Service Desk
            </a>
            <a href="#" className="footer__product-link ">
              <img src="/footer-logo/happyfox-ai.svg" alt="HappyFox AI" className="footer__product-icon" /> HappyFox AI
            </a>
            <a href="#" className="footer__product-link ">
              <img src="/footer-logo/assist-ai-logo.svg" alt="Assist AI" className="footer__product-icon" /> Assist AI
            </a>
            <a href="#" className="footer__product-link f">
              <img src="/footer-logo/chatbot-logo.svg" alt="Chatbot" className="footer__product-icon" /> Chatbot
            </a>
            <a href="#" className="footer__product-link ">
              <img src="/footer-logo/workflows-logo.svg" alt="Workflows" className="footer__product-icon" /> Workflows
            </a>
            <a href="#" className="footer__product-link ">
              <img src="/footer-logo/bi-logo.svg" alt="Business Intelligence" className="footer__product-icon" /> Business Intelligence
            </a>
            <a href="#" className="footer__product-link ">
              <img src="/footer-logo/livechat-logo.svg" alt="Live Chat" className="footer__product-icon" /> Live Chat
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__legal">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Cookies Settings</a>
            <a href="#">Status</a>
            <a href="#">Security</a>
            <a href="#">GDPR</a>
            <a href="#">CCPA Request Form</a>
          </div>
          <div className="footer__social">
              <a href="#" ><img src="/footer-social/facebook-logo.svg" alt="Facebook" /></a>
              <a href="#" ><img src="/footer-social/twitter-logo.svg" alt="Twitter" /></a>
            <a href="#" ><img src="/footer-social/youtube-logo.svg" alt="Youtube" /></a>
            <a href="#" ><img src="/footer-social/linkedin-logo.svg" alt="Linkedin" /></a>
          </div>
          <div className="footer__copyright">
            <p>Copyright ©2025 HappyFox Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;