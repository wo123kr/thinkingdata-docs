import React, { useState } from 'react';
import DocItemLayout from '@theme-original/DocItem/Layout';
import AskButton from '../../../components/AskButton';
import AiAssistantPanel from '../../../components/AiAssistantPanel';

export default function DocItemLayoutWrapper(props) {
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');

  const handleAskAssistant = (query) => {
    setAiQuery(query);
    setAiPanelOpen(true);
  };

  return (
    <>
      <div style={{ 
        position: 'relative',
        maxWidth: '100%',
        margin: '0 auto'
      }}>
        <DocItemLayout {...props} />
        <div style={{
          position: 'absolute',
          top: '10px',
          right: 'calc(0% + 20px)',
          zIndex: 100,
          maxWidth: 'calc(100% - 300px)', // 사이드바와 TOC 공간 제외
          width: 'fit-content'
        }}>
          <AskButton onAskAssistant={handleAskAssistant} />
        </div>
      </div>
      <AiAssistantPanel
        isOpen={aiPanelOpen}
        onClose={() => setAiPanelOpen(false)}
        initialQuery={aiQuery}
      />
    </>
  );
} 