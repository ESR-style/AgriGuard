import React, { useState } from 'react';
import { HfInference } from '@huggingface/inference';

const inference = new HfInference('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'); 

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const limitWords = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
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

  return (
    <div className='flex flex-col items-center w-full h-screen bg-green-100'>
      <nav className='w-full bg-green-700 text-white p-4'>
        <h1
          className='text-xl cursor-pointer'
          onClick={() => window.location.href = '/'}
        >
          Agriculture Chatbot
        </h1>
      </nav>
      <div className='flex flex-col w-full max-w-2xl h-full p-4 overflow-y-auto bg-white shadow-lg rounded-lg mt-4'>
        <div className='flex flex-col space-y-4'>
          {chat.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}
            >
              {message.content}
            </div>
          ))}
        </div>
      </div>
      <div className='flex w-full max-w-2xl mt-4'>
        <input
          className='flex-grow border-2 border-gray-300 rounded-l-md p-2'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type your message...'
        />
        <button
          className='bg-green-700 text-white p-2 rounded-r-md'
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;