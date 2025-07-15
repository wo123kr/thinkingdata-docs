import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import styles from './AskButton.module.css';

export default function AskButton({ onAskAssistant }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // 현재 페이지 정보 가져오기
  const getCurrentPageInfo = () => {
    const currentPath = location.pathname;
    const pageTitle = document.title || 'ThinkingData 문서';
    const pageContent = document.querySelector('.markdown')?.innerText || 
                       document.querySelector('main')?.innerText || 
                       '페이지 내용을 가져올 수 없습니다.';
    
    return {
      title: pageTitle,
      url: window.location.href,
      content: pageContent.slice(0, 3000) // 처음 3000자만
    };
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAskClick = () => {
    const pageInfo = getCurrentPageInfo();
    const query = `${pageInfo.title}에 대해 설명해주세요.`;
    onAskAssistant(query);
  };

  const handleCopyAsMarkdown = () => {
    const pageInfo = getCurrentPageInfo();
    const markdown = `# ${pageInfo.title}\n\n${pageInfo.content}\n\n출처: ${pageInfo.url}`;
    navigator.clipboard.writeText(markdown);
    alert('페이지가 마크다운으로 클립보드에 복사되었습니다!');
    setIsDropdownOpen(false);
  };

  const handleViewAsMarkdown = () => {
    const pageInfo = getCurrentPageInfo();
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head><title>${pageInfo.title} - Markdown</title></head>
        <body style="font-family: monospace; white-space: pre-wrap; padding: 20px;">
# ${pageInfo.title}

${pageInfo.content}

출처: ${pageInfo.url}
        </body>
      </html>
    `);
    setIsDropdownOpen(false);
  };

  const handleOpenInChatGPT = () => {
    const pageInfo = getCurrentPageInfo();
    const prompt = encodeURIComponent(`다음 문서에 대해 질문하고 싶습니다:\n\n제목: ${pageInfo.title}\n내용: ${pageInfo.content.slice(0, 1000)}\n\n이 문서에 대해 설명해주세요.`);
    window.open(`https://chat.openai.com/?q=${prompt}`, '_blank');
    setIsDropdownOpen(false);
  };

  const handleOpenInClaude = () => {
    const pageInfo = getCurrentPageInfo();
    const prompt = encodeURIComponent(`다음 문서에 대해 질문하고 싶습니다:\n\n제목: ${pageInfo.title}\n내용: ${pageInfo.content.slice(0, 1000)}\n\n이 문서에 대해 설명해주세요.`);
    window.open(`https://claude.ai/chat?q=${prompt}`, '_blank');
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.askButtonContainer} ref={dropdownRef}>
      <div className={styles.askButtonGroup}>
        {/* Ask 버튼 */}
        <button 
          className={styles.askButton} 
          onClick={handleAskClick}
          title="AI Assistant에게 이 페이지에 대해 질문"
        >
          <span className={styles.askIcon}>🤖</span>
          <span>Ask</span>
        </button>
        
        {/* 드롭다운 화살표 */}
        <button 
          className={styles.dropdownArrow}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          title="더 많은 옵션"
        >
          <span>▼</span>
        </button>
      </div>

      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownItem} onClick={handleAskClick}>
            <span className={styles.itemIcon}>🤖</span>
            <div>
              <div className={styles.itemTitle}>Ask Tiki Assistant</div>
              <div className={styles.itemDesc}>Ask Tiki Assistant about this page</div>
            </div>
          </div>
          
          <div className={styles.dropdownItem} onClick={handleCopyAsMarkdown}>
            <span className={styles.itemIcon}>📋</span>
            <div>
              <div className={styles.itemTitle}>Copy page</div>
              <div className={styles.itemDesc}>Copy page as Markdown for LLMs</div>
            </div>
          </div>
          
          <div className={styles.dropdownItem} onClick={handleViewAsMarkdown}>
            <span className={styles.itemIcon}>📝</span>
            <div>
              <div className={styles.itemTitle}>View as Markdown</div>
              <div className={styles.itemDesc}>View this page as plain text</div>
            </div>
          </div>
          
          <div className={styles.dropdownItem} onClick={handleOpenInChatGPT}>
            <span className={styles.itemIcon}>🧠</span>
            <div>
              <div className={styles.itemTitle}>Open in ChatGPT</div>
              <div className={styles.itemDesc}>Ask ChatGPT about this page</div>
            </div>
          </div>
          
          <div className={styles.dropdownItem} onClick={handleOpenInClaude}>
            <span className={styles.itemIcon}>✨</span>
            <div>
              <div className={styles.itemTitle}>Open in Claude</div>
              <div className={styles.itemDesc}>Ask Claude about this page</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 