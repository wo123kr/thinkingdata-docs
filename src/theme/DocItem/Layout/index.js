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
      <div style={{ position: 'relative' }}>
        <DocItemLayout {...props} />
        <AskButton onAskAssistant={handleAskAssistant} />
      </div>
      <AiAssistantPanel
        isOpen={aiPanelOpen}
        onClose={() => setAiPanelOpen(false)}
        initialQuery={aiQuery}
      />
    </>
  );
} 