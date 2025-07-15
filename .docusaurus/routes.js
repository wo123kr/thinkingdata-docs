import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/thinkingdata-docs/blog',
    component: ComponentCreator('/thinkingdata-docs/blog', 'a8f'),
    exact: true
  },
  {
    path: '/thinkingdata-docs/blog/archive',
    component: ComponentCreator('/thinkingdata-docs/blog/archive', 'a84'),
    exact: true
  },
  {
    path: '/thinkingdata-docs/blog/tags',
    component: ComponentCreator('/thinkingdata-docs/blog/tags', 'd71'),
    exact: true
  },
  {
    path: '/thinkingdata-docs/blog/tags/introduction',
    component: ComponentCreator('/thinkingdata-docs/blog/tags/introduction', '9a2'),
    exact: true
  },
  {
    path: '/thinkingdata-docs/blog/tags/welcome',
    component: ComponentCreator('/thinkingdata-docs/blog/tags/welcome', 'b72'),
    exact: true
  },
  {
    path: '/thinkingdata-docs/blog/welcome',
    component: ComponentCreator('/thinkingdata-docs/blog/welcome', 'd05'),
    exact: true
  },
  {
    path: '/thinkingdata-docs/docs',
    component: ComponentCreator('/thinkingdata-docs/docs', '858'),
    routes: [
      {
        path: '/thinkingdata-docs/docs',
        component: ComponentCreator('/thinkingdata-docs/docs', 'c97'),
        routes: [
          {
            path: '/thinkingdata-docs/docs',
            component: ComponentCreator('/thinkingdata-docs/docs', '970'),
            routes: [
              {
                path: '/thinkingdata-docs/docs/api/reference',
                component: ComponentCreator('/thinkingdata-docs/docs/api/reference', '29a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/thinkingdata-docs/docs/api/sdk',
                component: ComponentCreator('/thinkingdata-docs/docs/api/sdk', '570'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/thinkingdata-docs/docs/getting-started',
                component: ComponentCreator('/thinkingdata-docs/docs/getting-started', '0b4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/thinkingdata-docs/docs/guides/configuration',
                component: ComponentCreator('/thinkingdata-docs/docs/guides/configuration', '657'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/thinkingdata-docs/docs/guides/data-modeling',
                component: ComponentCreator('/thinkingdata-docs/docs/guides/data-modeling', '6a4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/thinkingdata-docs/docs/guides/installation',
                component: ComponentCreator('/thinkingdata-docs/docs/guides/installation', 'ce6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/thinkingdata-docs/docs/guides/performance',
                component: ComponentCreator('/thinkingdata-docs/docs/guides/performance', '53b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/thinkingdata-docs/docs/guides/security',
                component: ComponentCreator('/thinkingdata-docs/docs/guides/security', 'd12'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/thinkingdata-docs/docs/intro',
                component: ComponentCreator('/thinkingdata-docs/docs/intro', 'f33'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/thinkingdata-docs/',
    component: ComponentCreator('/thinkingdata-docs/', 'fd6'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
