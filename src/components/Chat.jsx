import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';
import BOT_AVATAR_WHITE from '../assets/happyfox-white.png';
import BOT_AVATAR_LOGO from '../assets/favicon.svg';

const BOT_NAME = 'HappyBot';
const BOT_AVATAR = '/src/assets/favicon.svg';
const USER_AVATAR = 'https://ui-avatars.com/api/?name=You&background=ff6b35&color=fff&rounded=true&size=48';

function getBotReply(msg, faqs) {
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
  const [faqs, setFaqs] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetch('/src/data/questions.json')
      .then(res => res.json())
      .then(setFaqs);
  }, []);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !faqs) return;
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setTimeout(() => {
      const botReply = getBotReply(input, faqs);
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
              placeholder={faqs ? "Ask me anything..." : "Loading..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              maxLength={200}
              disabled={!faqs}
            />
            <button className="chat-send" type="submit" aria-label="Send" disabled={!faqs}>➤</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chat;
