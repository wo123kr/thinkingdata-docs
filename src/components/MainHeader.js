import React, { useState, useRef, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './MainHeader.module.css';
import AiButton from './AiButton';
import Fuse from 'fuse.js';
import { docsIndex } from '../utils/searchIndex';
import AiAssistantPanel from './AiAssistantPanel';

// 추천 질문들
const SUGGESTED_QUESTIONS = [
  "ThinkingData SDK를 어떻게 설치하나요?",
  "이벤트 데이터를 어떻게 전송하나요?",
  "사용자 속성은 어떻게 설정하나요?",
  "API 키는 어디서 발급받나요?",
  "대용량 데이터 처리를 위한 최적화 방법은?",
  "배치 처리로 여러 이벤트를 한번에 보내는 방법은?",
  "데이터 모델링 시 주의사항은 무엇인가요?",
  "REST API 엔드포인트 목록을 알려주세요",
  "보안을 위한 권장사항은 무엇인가요?",
  "성능 최적화를 위한 팁을 알려주세요"
];

function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

export default function MainHeader() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const { colorMode, setColorMode } = useColorMode();

  // Fuse.js 설정
  const fuse = new Fuse(docsIndex, {
    keys: ['title', 'content'],
    threshold: 0.3,
    includeMatches: true,
    minMatchCharLength: 2,
  });

  // 외부 클릭 감지
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target) &&
          dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // 검색 로직
  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSuggestions(false);
    
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const results = fuse.search(query);
    setSearchResults(results.slice(0, 5));
    setShowDropdown(true);
    setSelectedIndex(-1);
  };

  // 키보드 네비게이션
  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    const totalItems = searchResults.length + 1; // +1 for AI search option
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % totalItems);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex === 0) {
        // AI 검색 실행
        handleAISearch(searchQuery);
      } else if (selectedIndex > 0 && selectedIndex <= searchResults.length) {
        // 문서 이동
        const result = searchResults[selectedIndex - 1];
        handleResultClick(result.item.path);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      searchRef.current?.blur();
    }
  };

  // AI 검색 실행
  const handleAISearch = (query) => {
    setAiQuery(query);
    setAiPanelOpen(true);
    setShowDropdown(false);
    setShowSuggestions(false);
  };

  // 추천 질문 클릭
  const handleSuggestedQuestion = (question) => {
    setSearchQuery(question);
    setShowSuggestions(false);
    handleAISearch(question);
  };

  // 검색 결과 클릭
  const handleResultClick = (path) => {
    window.location.href = useBaseUrl(path);
  };

  // 검색바 포커스
  const handleSearchFocus = () => {
    if (!searchQuery.trim()) {
      setShowSuggestions(true);
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
      setShowSuggestions(false);
    }
  };

  // AI 버튼 클릭
  const handleAiButtonClick = () => {
    setAiQuery('');
    setAiPanelOpen(true);
  };

  // 테마 토글
  const toggleColorMode = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span>🔗</span>
          <span>ThinkingData Docs</span>
        </div>
        
        <div className={styles.searchAiWrap} style={{ position: 'relative' }}>
          <input
            ref={searchRef}
            type="text"
            className={styles.search}
            placeholder="검색어를 입력하세요..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={handleSearchFocus}
            onKeyDown={handleKeyDown}
            aria-label="문서 검색"
          />
          
          {/* 검색 드롭다운 */}
          {(showDropdown || showSuggestions) && (
            <div 
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--ifm-background-surface-color)',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                zIndex: 1000,
                maxHeight: '400px',
                overflowY: 'auto',
                marginTop: '4px'
              }}
            >
              {/* 추천 질문들 */}
              {showSuggestions && (
                <>
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                    background: 'var(--ifm-color-emphasis-100)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--ifm-color-emphasis-800)'
                  }}>
                    💡 추천 질문들
                  </div>
                  {SUGGESTED_QUESTIONS.map((question, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        borderBottom: index === SUGGESTED_QUESTIONS.length - 1 ? 'none' : '1px solid var(--ifm-color-emphasis-200)',
                        fontSize: '0.9rem',
                        color: 'var(--ifm-color-emphasis-700)',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--ifm-hover-overlay)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>🔍</span>
                        <span>{question}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* 검색 결과 */}
              {showDropdown && searchQuery && (
                <>
                  {/* AI 검색 옵션 (항상 맨 위) */}
                  <div
                    onClick={() => handleAISearch(searchQuery)}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      background: selectedIndex === 0 ? 'var(--ifm-color-primary-lightest)' : 'transparent',
                      borderBottom: '1px solid var(--ifm-color-emphasis-200)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: 'var(--ifm-color-primary)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>🤖</span>
                      <span>AI에게 "{searchQuery}" 질문하기</span>
                    </div>
                  </div>

                  {/* 문서 검색 결과 */}
                  {searchResults.map((result, index) => (
                    <div
                      key={result.item.path}
                      onClick={() => handleResultClick(result.item.path)}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        background: selectedIndex === index + 1 ? 'var(--ifm-hover-overlay)' : 'transparent',
                        borderBottom: index === searchResults.length - 1 ? 'none' : '1px solid var(--ifm-color-emphasis-200)'
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '4px' }}>
                        <span dangerouslySetInnerHTML={{ 
                          __html: highlightText(result.item.title, searchQuery) 
                        }} />
                      </div>
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: 'var(--ifm-color-emphasis-600)',
                        lineHeight: '1.3'
                      }}>
                        <span dangerouslySetInnerHTML={{ 
                          __html: highlightText(result.item.content.slice(0, 100) + '...', searchQuery) 
                        }} />
                      </div>
                    </div>
                  ))}

                  {searchResults.length === 0 && (
                    <div style={{ padding: '20px 16px', textAlign: 'center', color: 'var(--ifm-color-emphasis-600)' }}>
                      검색 결과가 없습니다. AI에게 질문해보세요!
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          
          <div>
            <AiButton onClick={handleAiButtonClick} />
          </div>
        </div>
        
        <nav className={styles.nav}>
          <button className={styles.themeToggle} onClick={toggleColorMode}>
            {colorMode === 'dark' ? '🌞' : '🌙'}
          </button>
          <a href="https://github.com/wo123kr/thinkingdata-docs" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>

      {/* AI Assistant Panel */}
      <AiAssistantPanel 
        isOpen={aiPanelOpen} 
        onClose={() => setAiPanelOpen(false)}
        initialQuery={aiQuery}
      />
    </>
  );
} 