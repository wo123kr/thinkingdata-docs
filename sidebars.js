/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: '시작하기',
      items: ['intro', 'getting-started'],
    },
    {
      type: 'category',
      label: 'API 참조',
      items: ['api/reference', 'api/sdk'],
    },
    {
      type: 'category',
      label: '개발 가이드',
      items: [
        'guides/installation', 
        'guides/configuration',
        'guides/data-modeling',
        'guides/performance',
        'guides/security'
      ],
    },
  ],
  // 문서2 사이드바
  docs2Sidebar: [
    {
      type: 'category',
      label: '문서2 시작하기',
      items: ['intro', 'getting-started'],
    },
    {
      type: 'category',
      label: '문서2 API 참조',
      items: ['api/reference', 'api/sdk'],
    },
    {
      type: 'category',
      label: '문서2 운영 가이드',
      items: [
        'guides/installation',
        'guides/configuration', 
        'guides/data-modeling',
        'guides/performance',
        'guides/security'
      ],
    },
  ],
};

module.exports = sidebars; 