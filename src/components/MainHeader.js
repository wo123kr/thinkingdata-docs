import React, { useState, useRef, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './MainHeader.module.css';
import AiButton from './AiButton';
import Fuse from 'fuse.js';
import { docsIndex } from '../utils/searchIndex';
import AiAskModal from './AiAskModal';

function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i} style={{background:'#ffe082',color:'#222',padding:'0 2px',borderRadius:'2px'}}>{part}</mark> : part
  );
}

export default function MainHeader() {
  const { colorMode, setColorMode } = useColorMode();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1); // 키보드 네비게이션용
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiModalQuery, setAiModalQuery] = useState('');
  const inputRef = useRef();
  const resultsRef = useRef([]);

  // Fuse.js 옵션
  const fuse = new Fuse(docsIndex, {
    keys: ['title', 'content'],
    threshold: 0.3,
    minMatchCharLength: 2,
  });

  useEffect(() => {
    if (query.trim().length > 0) {
      const res = fuse.search(query).map(r => r.item);
      setResults(res);
      setShowDropdown(true);
      setActiveIdx(-1);
    } else {
      setResults([]);
      setShowDropdown(false);
      setActiveIdx(-1);
    }
  }, [query]);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClick(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // 키보드 네비게이션
  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(idx => Math.min(idx + 1, results.length)); // 0: AI, 1~: 문서
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(idx => Math.max(idx - 1, 0));
    } else if (e.key === 'Enter') {
      if (activeIdx === 0) {
        handleAIAsk();
      } else if (activeIdx > 0 && results[activeIdx-1]) {
        handleResultClick(results[activeIdx-1].path);
      }
    }
  };

  const handleAIAsk = () => {
    setAiModalQuery(query);
    setAiModalOpen(true);
    setShowDropdown(false);
  };

  const handleResultClick = (path) => {
    window.location.href = path;
  };

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
        <div className={styles.searchAiWrap} ref={inputRef} style={{position:'relative'}}>
          <input
            className={styles.search}
            type="text"
            placeholder="검색어를 입력하세요..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => query && setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            aria-label="문서 검색"
          />
          {showDropdown && (
            <div style={{
              position:'absolute',
              top:'110%',
              left:0,
              width:'100%',
              background:'var(--gitbook-bg)',
              boxShadow:'0 4px 16px rgba(0,0,0,0.08)',
              borderRadius:8,
              zIndex:999,
              border:'1px solid #e1e5e9',
              padding:'8px 0',
              minWidth:320,
              maxWidth:'95vw',
              maxHeight:'70vh',
              overflowY:'auto'
            }}>
              <div
                style={{padding:'8px 20px',cursor:'pointer',fontWeight:600,color:'#1976d2',background:activeIdx===0?'#e3f2fd':'transparent',borderRadius:6}}
                onClick={handleAIAsk}
                tabIndex={0}
                onMouseEnter={()=>setActiveIdx(0)}
              >
                <span style={{marginRight:6}}>🤖</span>AI에게 "{query}" 질문하기
              </div>
              <hr style={{margin:'6px 0',border:'none',borderTop:'1px solid #eee'}}/>
              {results.length === 0 ? (
                <div style={{padding:'8px 20px',color:'#888'}}>검색 결과가 없습니다</div>
              ) : results.map((doc, i) => (
                <div
                  key={doc.path}
                  ref={el => resultsRef.current[i] = el}
                  style={{padding:'8px 20px',cursor:'pointer',background:activeIdx===i+1?'#e3f2fd':'transparent',borderRadius:6}}
                  onClick={()=>handleResultClick(doc.path)}
                  tabIndex={0}
                  onMouseEnter={()=>setActiveIdx(i+1)}
                >
                  <div style={{fontWeight:500}}>{highlightText(doc.title, query)}</div>
                  <div style={{fontSize:'0.92em',color:'#888'}}>{highlightText(doc.content.slice(0,40)+'...', query)}</div>
                </div>
              ))}
            </div>
          )}
          <AiButton />
        </div>
        <nav className={styles.nav}>
          <button onClick={toggleColorMode} className={styles.themeToggle}>
            {colorMode === 'dark' ? '🌞' : '🌙'}
          </button>
          <a href="https://github.com/wo123kr/thinkingdata-docs" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>
      <AiAskModal open={aiModalOpen} onClose={()=>setAiModalOpen(false)} initialQuery={aiModalQuery} />
    </>
  );
} 