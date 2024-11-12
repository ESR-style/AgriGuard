import React, { useState } from 'react';
import { HfInference } from '@huggingface/inference';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';


const inference = new HfInference('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');

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const limitWords = (text, maxWords) => {
    const words = text.split(' ');
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : text;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setChat([...chat, { role: 'user', content: input }]);
    setInput('');

    try {
      const chatStream = inference.chatCompletionStream({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [{ role: 'user', content: input }],
        max_tokens: 500,
      });

      let responseText = '';
      for await (const chunk of chatStream) {
        responseText += chunk.choices[0]?.delta?.content || '';
      }

      const limitedResponse = limitWords(responseText, 100);
      setChat([...chat, { role: 'user', content: input }, { role: 'ai', content: limitedResponse || 'No answer found' }]);
    } catch (error) {
      console.error('Error:', error);
      setChat([...chat, { role: 'user', content: input }, { role: 'ai', content: 'An error occurred. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <Navbar />
      
      <div className="container mx-auto px-4 h-[calc(100%-5rem)] pt-20 flex flex-col">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-4"
        >
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI Agriculture Assistant
          </h1>
          <p className="text-sm text-white/60">Ask me anything about farming and agriculture</p>
        </motion.div>

        <motion.div 
          className="flex-1 bg-gradient-to-br from-green-400/10 via-blue-500/10 to-purple-500/10 
                     backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg 
                     flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chat.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' 
                    : 'bg-white/10 text-white/90'
                }`}>
                  {message.content}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 bg-black/20 border-t border-white/10">
            <div className="flex gap-2">
              <input
                className="flex-grow bg-white/10 text-white border border-white/20 rounded-xl px-4 py-3
                           focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-xl
                           flex items-center gap-2 hover:shadow-lg hover:shadow-green-500/20 flex-shrink-0"
                onClick={sendMessage}
                disabled={loading}
              >
                {loading ? 'Sending...' : <FaPaperPlane />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Chatbot;