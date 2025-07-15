import React, { useState, useRef, useEffect } from 'react';

export default function AiAskModal({ open, onClose, initialQuery }) {
  const [question, setQuestion] = useState(initialQuery || '');
  const [answer, setAnswer] = useState('');
  const inputRef = useRef();
  const modalRef = useRef();

  useEffect(() => {
    if (open) {
      setQuestion(initialQuery || '');
      setAnswer('');
      setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
    }
  }, [open, initialQuery]);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape') onClose();
    }
    if (open) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [open, onClose]);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [open, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    // 가상 답변 (실제 AI 연동 전)
    setAnswer('ThinkingData Docs AI: 질문을 분석 중입니다...\n\n(이곳에 실제 AI 답변이 표시됩니다)');
    setTimeout(() => {
      setAnswer(`"${question}"에 대한 답변 예시입니다.\n\n- 관련 문서를 참고하세요!\n- 추가 질문이 있으면 언제든 입력해 주세요.`);
    }, 1200);
  };

  if (!open) return null;

  return (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.25)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
      <div ref={modalRef} style={{
        background:'#fff',
        borderRadius:12,
        padding:'24px 20px',
        boxShadow:'0 8px 32px rgba(0,0,0,0.18)',
        width:'100%',
        maxWidth:420,
        maxHeight:'90vh',
        overflowY:'auto',
        position:'relative'
      }}>
        <button onClick={onClose} style={{position:'absolute',top:12,right:12,fontSize:20,background:'none',border:'none',color:'#888',cursor:'pointer'}}>×</button>
        <h2 style={{margin:'0 0 16px',fontSize:'1.2rem',fontWeight:700,color:'#1976d2',paddingRight:'32px'}}>AI에게 질문하기</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            value={question}
            onChange={e=>setQuestion(e.target.value)}
            placeholder="궁금한 점을 입력하세요..."
            rows={3}
            style={{
              width:'100%',
              fontSize:'1rem',
              padding:'10px',
              borderRadius:6,
              border:'1.2px solid #bbb',
              resize:'none',
              marginBottom:12,
              boxSizing:'border-box'
            }}
            disabled={!!answer}
          />
          <div style={{textAlign:'right'}}>
            <button type="submit" style={{
              background:'#1976d2',
              color:'#fff',
              border:'none',
              borderRadius:6,
              padding:'8px 18px',
              fontWeight:600,
              fontSize:'0.95rem',
              cursor:'pointer'
            }} disabled={!!answer || !question.trim()}>질문하기</button>
          </div>
        </form>
        {answer && (
          <div style={{
            marginTop:20,
            background:'#f8fafc',
            borderRadius:8,
            padding:'14px',
            color:'#222',
            whiteSpace:'pre-line',
            fontSize:'0.95rem',
            minHeight:50,
            maxHeight:'30vh',
            overflowY:'auto'
          }}>
            {answer}
          </div>
        )}
      </div>
    </div>
  );
} 