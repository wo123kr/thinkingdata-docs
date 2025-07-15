import React, { useState, useRef, useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { docsIndex } from '../utils/searchIndex';
import Fuse from 'fuse.js';

export default function AiAssistantPanel({ isOpen, onClose, initialQuery }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Fuse.js for document search
  const fuse = new Fuse(docsIndex, {
    keys: ['title', 'content'],
    threshold: 0.4,
    minMatchCharLength: 2,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && initialQuery && messages.length === 0) {
      setInputValue(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findRelatedDocs = (query) => {
    if (!query.trim()) return [];
    const results = fuse.search(query);
    return results.slice(0, 3).map(r => r.item);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const query = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Find related documents
    const relatedDocs = findRelatedDocs(query);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: `"${query}"에 대해 답변드리겠습니다.

관련 문서를 검색한 결과, 다음과 같은 정보를 찾았습니다:

${relatedDocs.length > 0 
  ? relatedDocs.map(doc => `• **${doc.title}**: ${doc.content.slice(0, 80)}...`).join('\n')
  : '직접적으로 관련된 문서를 찾지 못했지만, 일반적인 가이드를 참고해보세요.'
}

더 자세한 정보가 필요하시면 아래 관련 문서들을 확인해보세요!`,
        timestamp: new Date(),
        relatedDocs
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.1)',
          zIndex: 1500,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        onClick={onClose}
      />
      
      {/* AI Panel */}
      <div className="ai-panel" style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '420px',
        height: '100vh',
        background: '#fff',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
        zIndex: 1600,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid #e1e5e9'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e1e5e9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🤖</span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>GitBook Assistant</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Working...</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#666',
              padding: '4px'
            }}
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.length === 0 && (
            <div style={{
              textAlign: 'center',
              color: '#666',
              padding: '40px 20px'
            }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🤖</span>
              <h4 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>AI Assistant에 오신 것을 환영합니다</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>ThinkingData 문서에 대해 궁금한 점을 질문해보세요!</p>
            </div>
          )}

          {messages.map(message => (
            <div key={message.id} style={{
              display: 'flex',
              flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
              gap: '8px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: message.type === 'user' ? '#1976d2' : '#f1f3f4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                flexShrink: 0
              }}>
                {message.type === 'user' ? '👤' : '🤖'}
              </div>
              
              <div style={{
                background: message.type === 'user' ? '#1976d2' : '#f8fafc',
                color: message.type === 'user' ? '#fff' : '#222',
                padding: '12px 16px',
                borderRadius: '12px',
                maxWidth: '75%',
                fontSize: '0.9rem',
                lineHeight: '1.4',
                whiteSpace: 'pre-wrap'
              }}>
                {message.content}
                
                {/* Related docs for AI messages */}
                {message.type === 'assistant' && message.relatedDocs && message.relatedDocs.length > 0 && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e1e5e9' }}>
                    <p style={{ margin: '0 0 8px', fontSize: '0.8rem', fontWeight: 600, color: '#666' }}>관련 문서:</p>
                    {message.relatedDocs.map(doc => (
                      <a
                        key={doc.path}
                        href={useBaseUrl(doc.path)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'block',
                          padding: '6px 0',
                          color: '#1976d2',
                          textDecoration: 'none',
                          fontSize: '0.85rem',
                          borderBottom: '1px solid transparent'
                        }}
                        onMouseEnter={e => e.target.style.borderBottomColor = '#1976d2'}
                        onMouseLeave={e => e.target.style.borderBottomColor = 'transparent'}
                      >
                        📄 {doc.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#f1f3f4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px'
              }}>
                🤖
              </div>
              <div style={{
                background: '#f8fafc',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '0.9rem'
              }}>
                <span style={{ color: '#666' }}>입력 중...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #e1e5e9'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            padding: '8px',
            border: '1px solid #e1e5e9',
            borderRadius: '8px',
            background: '#fff'
          }}>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask, search, or take action..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                minHeight: '20px',
                maxHeight: '80px'
              }}
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              style={{
                background: inputValue.trim() ? '#1976d2' : '#e1e5e9',
                color: inputValue.trim() ? '#fff' : '#999',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 12px',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              Send
            </button>
          </div>
          <p style={{
            margin: '8px 0 0',
            fontSize: '0.75rem',
            color: '#999',
            textAlign: 'center'
          }}>
            AI Based on your context
          </p>
        </div>
      </div>
    </>
  );
} 