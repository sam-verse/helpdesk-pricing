import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';
import BOT_AVATAR_WHITE from '../assets/happyfox-white.png';
import BOT_AVATAR_LOGO from '../assets/favicon.svg';

const BOT_NAME = 'HappyBot';
const BOT_AVATAR = '/src/assets/favicon.svg';
const USER_AVATAR = 'https://ui-avatars.com/api/?name=You&background=ff6b35&color=fff&rounded=true&size=48';

// 1. Move your FAQ data here (copy from questions.json)
const faqs = [
  { "q": "pricing|cost|price|plan", "a": "We offer Agent-based and Unlimited Agents pricing. Want a quick comparison or a recommendation?" },
  { "q": "best.*plan|recommend", "a": "Tell me about your team size and needs, and I’ll suggest the best plan!" },
    
    {
      "q": "pricing|cost|price|plan",
      "a": "We offer Agent-based and Unlimited Agents pricing. Want a quick comparison or a recommendation?"
    },
    {
      "q": "best.*plan|recommend",
      "a": "Tell me about your team size and needs, and I’ll suggest the best plan!"
    },
    {
      "q": "unlimited",
      "a": "Unlimited Agents plans are perfect for large teams. Plans: Growth, Scale, Scale Plus, Ultimate."
    },
    {
      "q": "agent",
      "a": "Agent-based plans are great for smaller teams. Plans: Basic, Team, Pro, Enterprise PRO."
    },
    {
      "q": "feature|capability",
      "a": "You can compare all features in the comparison table above! Ask me about any specific feature."
    },
    {
      "q": "contact|support",
      "a": "You can reach us via the Contact Us section in the footer or ask me here!"
    },
    {
      "q": "hello|hi|hey",
      "a": "Hey there! 👋 I’m HappyBot. Ask me anything about HappyFox pricing or features."
    },
    { "q": "pricing|cost|price|plan", "a": "We offer Agent-based and Unlimited Agents pricing. Want a quick comparison or a recommendation?" },
    { "q": "all.*plans|what.*plans|plan.*types", "a": "We offer Agent-based plans (Basic, Team, Pro, Enterprise PRO) and Unlimited Agents plans (Growth, Scale, Scale Plus, Ultimate)." },
    { "q": "agent.*plan|agent-based", "a": "Agent-based pricing is charged per agent per month. Plans: Basic ($29), Team ($49), Pro ($69), Enterprise PRO ($89) per agent/month." },
    { "q": "unlimited|unlimited agents", "a": "Unlimited Agent plans are perfect for large teams. Plans: Growth, Scale, Scale Plus, Ultimate." },
    { "q": "compare.*plan|difference.*plan", "a": "Would you like a comparison of features or pricing between the plans? Let me know which ones!" },
    { "q": "best.*plan|recommend|which.*plan", "a": "Tell me about your team size and needs, and I’ll suggest the best plan!" },
    { "q": "suitable.*small team", "a": "For small teams, the Basic or Team agent-based plans are recommended." },
    { "q": "large.*organization", "a": "For large organizations, our Unlimited Agents plans or Enterprise PRO agent-based plan are ideal." },
    { "q": "startup.*plan", "a": "Startups typically start with the Basic or Team plan, depending on requirements." },
    { "q": "discount|annual.*discount", "a": "We offer a 10% discount on annual subscriptions for any plan." },
    { "q": "long term.*discount", "a": "2-year prepaid plans offer even more savings! Contact us for a custom quote." },
    { "q": "nonprofit|education.*discount", "a": "Contact us directly to discuss special pricing for nonprofits or educational institutions." },
    { "q": "volume.*discount", "a": "For large agent requirements, ask us about volume discounts or custom quotes." },
    { "q": "free trial|demo", "a": "Yes, we encourage booking a demo. After discussion, we’ll offer a trial account to fit your needs." },
    { "q": "how.*get.*trial", "a": "Request a demo and our team will set up the best trial experience based on your requirements." },
    { "q": "trial.*length|trial.*duration", "a": "Trial duration is flexible. Let us know your requirements, and we’ll accommodate as best as possible." },
    { "q": "upgrade|downgrade", "a": "You can upgrade your plan anytime. Downgrades are possible at billing cycle end. Contact support for changes." },
    { "q": "change plan", "a": "To change plans, contact support or your account executive, or use your account portal." },
    { "q": "add agent", "a": "Add agents anytime from your admin panel—charges apply based on plan type." },
    { "q": "remove agent", "a": "To remove agents, update your admin panel. Downgrades take effect at the end of the billing cycle." },
    { "q": "payment option|pay.*method", "a": "We accept credit cards and bank transfers. Pay monthly, yearly, or choose our 2-year plan." },
    { "q": "monthly billing", "a": "Yes, we offer monthly billing for all plans." },
    { "q": "annual billing", "a": "Annual billing options are available, with a 10% discount." },
    { "q": "invoice|billing|receipt", "a": "Invoices and receipts are automatically sent by email and are accessible from your account." },
    { "q": "currency", "a": "Pricing is in USD. Contact us for local currency options." },
    { "q": "feature.*plan|plan.*features", "a": "All plans include Ticket Management, Customer Management, Automation, Reports, Integrations, and Mobile access. Higher plans offer more advanced features." },
    { "q": "ticket management", "a": "Ticket Management is included in all plans, with advanced rules and automation in higher tiers." },
    { "q": "automation", "a": "Help Desk Automation is in all plans, but more customization is available in higher plans." },
    { "q": "mobile app", "a": "HappyFox mobile apps are available on all plans." },
    { "q": "integration", "a": "Third-party integrations are supported on all plans. Some advanced integrations are available in Pro and Enterprise tiers." },
    { "q": "security", "a": "We offer enterprise-level security including SSL, encryption, audit logs, and more. Advanced options are in higher plans." },
    { "q": "GDPR", "a": "HappyFox Help Desk is GDPR-ready and offers compliance tools across all plans." },
    { "q": "data residency", "a": "Contact us for options relating to data residency requirements." },
    { "q": "support included", "a": "All plans include email support. Higher plans offer faster response and dedicated account managers." },
    { "q": "phone support", "a": "Phone support is available in selected higher-tier plans." },
    { "q": "SLA", "a": "Service Level Agreements are available for enterprise and unlimited agent plans." },
    { "q": "custom support", "a": "Need special support? Talk to our team for a custom support arrangement." },
    { "q": "limit.*ticket", "a": "There are no limits on ticket volume, unless otherwise stated in the plan details." },
    { "q": "limit.*agent", "a": "Agent-based plans charge per agent. Unlimited agent plans have no agent limits." },
    { "q": "api.*limit", "a": "API access is included. Rate limits vary by plan—higher plans offer increased limits." },
    { "q": "migration", "a": "We offer easy migration from your current help desk. Ask about our migration tools and support." },
    { "q": "onboarding", "a": "Onboarding assistance is provided via documentation and webinars. Dedicated onboarding is available on higher plans." },
    { "q": "category|categories", "a": "Categories help organize tickets, assign to teams, and automate routing for efficient management." },
    { "q": "custom field", "a": "Custom fields are available on all plans for personalized ticketing." },
    { "q": "reporting|analytics", "a": "All plans include help desk reporting, with advanced analytics in higher plans." },
    { "q": "dashboard", "a": "Dashboards for ticket, agent, and customer metrics are available in all plans." },
    { "q": "user.*role", "a": "You can set up custom roles and permissions for agents. Available on all plans." },
    { "q": "collaboration", "a": "Internal collaboration tools are part of every plan, with advanced features in higher tiers." },
    { "q": "data export", "a": "Export data anytime from your admin panel." },
    { "q": "data retention", "a": "Retain tickets and customer data as long as you’re subscribed. For more details, see our retention policy." },
    { "q": "mobile", "a": "Manage support on the go. Our iOS/Android app is available for all users." },
    { "q": "api", "a": "REST API access is included in all plans." },
    { "q": "custom.*brand|branding", "a": "Customize your support portal logo, favicon, and colors. Branding options expand with higher plans." },
    { "q": "email notification", "a": "Automated email notifications are available in all plans." },
    { "q": "escalation", "a": "Auto-escalation rules are configurable, increasing with plan level." },
    { "q": "self-serve|self-service", "a": "Enable customer self-service with our Support Center (all plans)." },
    { "q": "help center", "a": "Every plan offers a Support Center for self-help tickets, FAQs, and knowledge base articles." },
    { "q": "knowledge base", "a": "Knowledge base is included, allowing you to create FAQs, guides, and articles for customers." },
    { "q": "article.*limit", "a": "No hard limit on knowledge base articles. Organize as needed for your team." },
    { "q": "customiz.*workflow", "a": "Build custom workflows for ticket assignments, SLAs, and automations in all plans. Pro/Enterprise plans offer advanced configs." },
    { "q": "custom.*field", "a": "Add custom fields for tickets, customers, or assets on all plans." },
    { "q": "asset management", "a": "Asset management is available, especially in higher plans. Contact sales for full details." },
    { "q": "multi-language|localization", "a": "HappyFox supports multiple languages and localization for customer-facing pages." },
    { "q": "integrate.*slack", "a": "Slack integration is available. Details depend on your plan tier." },
    { "q": "integrate.*Teams", "a": "Microsoft Teams integration is available to streamline your workflow." },
    { "q": "crm.*integration", "a": "Integrate with popular CRMs like Salesforce through native connectors or Zapier." },
    { "q": "backup", "a": "Data is regularly backed up. Detailed retention and backup schedules are available on request." },
    { "q": "restore data", "a": "Contact support to discuss point-in-time restore or backup options." },
    { "q": "cancel account", "a": "You can cancel anytime. Access continues through the end of your billing cycle." },
    { "q": "refund policy", "a": "Refunds are handled according to terms of service. Contact support for details." },
    { "q": "product update|new feature", "a": "We continually improve. Updates and new features are shared in the dashboard or by email." },
    { "q": "accessibility|ADA", "a": "HappyFox aims for high accessibility standards, including ADA compliance." },
    { "q": "contact support", "a": "Contact us via our support center, email, or your account manager." },
    { "q": "community", "a": "Join the HappyFox user community for peer support and best practices." },
  
      {
        "q": "agent-based.*plan|agent.*plan|agent.*pricing",
        "a": "We have four agent-based plans: Basic ($24/user/mo for up to 5 agents), Team ($49/user/mo), Pro ($99/user/mo), and Enterprise Pro (contact sales for pricing). Each adds increasing features like automation, asset management, and priority support."
      },
      {
        "q": "basic.*plan|basic.*feature|what.*basic.*plan",
        "a": "Basic costs $24 per agent per month (up to 5 agents), and includes unlimited tickets, SLA management, a knowledge base, SSO (e.g. SAML/GSuite), omnichannel ticketing, and ticket automations."
      },
      {
        "q": "team.*plan|team.*feature|what.*team.*plan",
        "a": "Team is $49/agent/mo and adds multi‑brand support, custom email/domain, custom roles & queues, 24×5 email support, and optional EU data hosting—on top of everything in Basic."
      },
      {
        "q": "pro.*plan|pro.*feature|what.*pro.*plan",
        "a": "Pro is $99/agent/mo and adds proactive agent collision detection, task & asset management, scheduled tickets, IP restrictions, load‑balanced routing, password policies, 24×7 email support, and uptime SLA."
      },
      {
        "q": "enterprise.*pro|enterprise.*plan|enterprise.*feature",
        "a": "Enterprise Pro (contact sales) builds on Pro with agent scripting, 2 TB attachment storage, unlimited reporting history, advanced audit logs, 24×7 phone support, and a dedicated customer success manager."
      },
      {
        "q": "unlimited.*agent.*pricing|unlimited.*plan|unlimited.*agents",
        "a": "Yes—Unlimited Agents pricing is available starting with the Growth plan at $1,499/mo (up to 150K tickets/yr), then Scale for $1,999/mo (150K tickets/yr), Scale Plus at $2,499/mo (300K tickets/yr), and Ultimate at $4,999/mo (1 M tickets/yr)."
      },
      {
        "q": "ticket.*limit.*unlimited|unlimited.*ticket.*limit|ticket.*overage",
        "a": "Growth supports 150K tickets/yr; Scale 150K; Scale Plus 300K; Ultimate 1 M. Overage rates are $0.03/ticket/mo for Growth, $0.02 for Scale, and $0.01 for Scale Plus & Ultimate."
      },
      {
        "q": "custom.*field.*unlimited|unlimited.*custom.*field",
        "a": "Growth includes 20 custom fields, Scale 100, Scale Plus 200, and Ultimate 300."
      },
      {
        "q": "ticket.*overage.*fee|overage.*fee|overage.*charge",
        "a": "Yes—there are per‑ticket overage fees: Growth $0.03/ticket/mo; Scale $0.02; Scale Plus & Ultimate $0.01."
      },
      {
        "q": "discount.*non.?profit|discount.*education|non.?profit.*discount|education.*discount",
        "a": "Absolutely—non-profit and educational organizations are eligible for discounts on agent‑based plans."
      },
      {
        "q": "billing.*option|payment.*option|how.*bill|how.*pay",
        "a": "Agent-based plans are available monthly or annually; Unlimited Agents require annual or 2‑year commitments. You can demo before deciding."
      },
      {
          "q": "pricing.*model|different.*pricing|pricing.*type",
          "a": "We offer two pricing models: Agent-Based Pricing (you pay per agent) and Unlimited Agents Pricing (flat fee based on ticket volume)."
        },
        {
          "q": "free.*trial|trial.*available|offer.*trial",
          "a": "Yes! You can start a free trial to explore the features before choosing a plan."
        },
        {
          "q": "agent-based.*pricing|what.*agent-based.*pricing",
          "a": "In agent-based pricing, you pay based on the number of agents using the system. There are four plans: Basic, Team, Pro, and Enterprise Pro."
        },
        {
          "q": "unlimited.*agents.*pricing|what.*unlimited.*agents.*pricing",
          "a": "Unlimited agent plans charge a fixed monthly fee and allow unlimited agents. Pricing depends on your expected ticket volume."
        },
        {
          "q": "setup.*fee|is.*there.*setup.*fee",
          "a": "No, there are no setup fees for any of the plans."
        },
        {
          "q": "long.*term.*contract|contract.*length|annual.*contract|2.?year.*contract",
          "a": "Unlimited Agent plans require annual or 2-year contracts. Agent-based plans can be billed monthly or annually."
        },
        {
          "q": "growth.*plan.*price|how.*much.*growth.*plan|growth.*plan.*cost",
          "a": "The Growth plan is $1,499/month and includes unlimited agents and 150,000 tickets per year."
        },
        {
          "q": "scale plus.*feature|scale plus.*plan|what.*scale plus",
          "a": "Scale Plus includes unlimited agents, 300,000 tickets/year, 200 custom fields, up to 5 brands, 1 TB attachment space, and more."
        },
        {
          "q": "ultimate.*cost|ultimate.*plan.*price|how.*much.*ultimate",
          "a": "The Ultimate plan costs $4,999/month. It includes 1 million tickets/year, 300 custom fields, 10 brands, 2 TB attachments, and dedicated customer success."
        },
        {
          "q": "support.*included|plan.*support|what.*support.*plan",
          "a": "Support varies: Basic gets 24×5 email support, Pro and above include 24×7 email support, while Ultimate includes 24×7 phone support and a dedicated success manager."
        },
        {
          "q": "switch.*plan|change.*plan|upgrade.*plan|downgrade.*plan",
          "a": "Yes, you can upgrade or change your plan as your needs grow."
        },
        {
          "q": "onboarding.*support|onboarding.*available|plan.*onboarding",
          "a": "Yes, onboarding support is included in higher-tier plans like Scale Plus and Ultimate."
        },
        {
          "q": "overage.*billing|overage.*charge|ticket.*overage",
          "a": "If you exceed your ticket limit on Unlimited plans, a per-ticket overage fee applies—ranging from $0.01 to $0.03 depending on the plan."
        },
        {
          "q": "payment.*method|accept.*payment|how.*pay",
          "a": "We accept credit cards and wire transfers for annual contracts."
        },
        {
          "q": "eu.*data.*hosting|data.*hosting.*eu|europe.*data.*hosting",
          "a": "Yes, EU data hosting is available starting from the Team plan and above."
        },
        {
          "q": "how.*many.*brand|brand.*limit|plan.*brand",
          "a": "Growth includes 1 brand, Scale 2, Scale Plus 5, and Ultimate allows up to 10 brands."
        },
        {
          "q": "api.*access|plan.*api|api.*available",
          "a": "Yes, API access is included in all plans, with advanced integrations available in higher tiers."
        }
    ]
    

function getBotReply(msg) {
  for (const f of faqs) {
    if (new RegExp(f.q, 'i').test(msg)) return f.a;
  }
  if (/\d+/.test(msg) && /agent|team|people/i.test(msg)) {
    const n = parseInt(msg.match(/\d+/)[0]);
    if (n <= 5) return 'The Basic plan is perfect for up to 5 agents!';
    if (n <= 20) return 'The Team or Pro plan would be a great fit for your team size.';
    if (n > 20) return 'You might want to consider Unlimited Agents plans for large teams!';
  }
  return 'I’m not sure, but you can check the comparison table above or ask for a demo!';
}

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hey! 👋 I’m HappyBot. Ask me anything about HappyFox pricing or features.' }
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setTimeout(() => {
      const botReply = getBotReply(input);
      setMessages((msgs) => [...msgs, { from: 'bot', text: botReply }]);
    }, 700);
  };

  return (
    <>
      <button className="chat-fab" onClick={() => setOpen((o) => !o)} aria-label="Open chat">
        <img src={BOT_AVATAR_WHITE} alt="Chatbot" />
      </button>
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <img src={BOT_AVATAR_LOGO} alt="HappyBot" className="chat-bot-avatar" />
            <span className="chat-title">HappyBot</span>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.from}`}> 
                <img
                  src={msg.from === 'bot' ? BOT_AVATAR : USER_AVATAR}
                  alt={msg.from === 'bot' ? BOT_NAME : 'You'}
                  className="chat-avatar"
                />
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-input-row" onSubmit={sendMessage} autoComplete="off">
            <input
              className="chat-input"
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              maxLength={200}
            />
            <button className="chat-send" type="submit" aria-label="Send">
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chat;
