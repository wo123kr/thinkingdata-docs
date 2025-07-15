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
    component: ComponentCreator('/thinkingdata-docs/docs', 'ff4'),
    routes: [
      {
        path: '/thinkingdata-docs/docs',
        component: ComponentCreator('/thinkingdata-docs/docs', 'c08'),
        routes: [
          {
            path: '/thinkingdata-docs/docs',
            component: ComponentCreator('/thinkingdata-docs/docs', '9f5'),
            routes: [
              {
                path: '/thinkingdata-docs/docs/api/reference',
                component: ComponentCreator('/thinkingdata-docs/docs/api/reference', '7ff'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs/api/sdk',
                component: ComponentCreator('/thinkingdata-docs/docs/api/sdk', '786'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs/getting-started',
                component: ComponentCreator('/thinkingdata-docs/docs/getting-started', '641'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs/guides/configuration',
                component: ComponentCreator('/thinkingdata-docs/docs/guides/configuration', '101'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs/guides/data-modeling',
                component: ComponentCreator('/thinkingdata-docs/docs/guides/data-modeling', '1a8'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs/guides/installation',
                component: ComponentCreator('/thinkingdata-docs/docs/guides/installation', '6c1'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs/guides/performance',
                component: ComponentCreator('/thinkingdata-docs/docs/guides/performance', 'de8'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs/guides/security',
                component: ComponentCreator('/thinkingdata-docs/docs/guides/security', 'e77'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs/intro',
                component: ComponentCreator('/thinkingdata-docs/docs/intro', '940'),
                exact: true,
                sidebar: "docs2Sidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/thinkingdata-docs/docs2',
    component: ComponentCreator('/thinkingdata-docs/docs2', 'a1c'),
    routes: [
      {
        path: '/thinkingdata-docs/docs2',
        component: ComponentCreator('/thinkingdata-docs/docs2', '5e6'),
        routes: [
          {
            path: '/thinkingdata-docs/docs2',
            component: ComponentCreator('/thinkingdata-docs/docs2', 'd13'),
            routes: [
              {
                path: '/thinkingdata-docs/docs2/api/reference',
                component: ComponentCreator('/thinkingdata-docs/docs2/api/reference', 'dbb'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs2/api/sdk',
                component: ComponentCreator('/thinkingdata-docs/docs2/api/sdk', '9ce'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs2/getting-started',
                component: ComponentCreator('/thinkingdata-docs/docs2/getting-started', 'ec9'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs2/guides/configuration',
                component: ComponentCreator('/thinkingdata-docs/docs2/guides/configuration', 'f5a'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs2/guides/data-modeling',
                component: ComponentCreator('/thinkingdata-docs/docs2/guides/data-modeling', 'f7a'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs2/guides/installation',
                component: ComponentCreator('/thinkingdata-docs/docs2/guides/installation', 'e68'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs2/guides/performance',
                component: ComponentCreator('/thinkingdata-docs/docs2/guides/performance', '9d6'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs2/guides/security',
                component: ComponentCreator('/thinkingdata-docs/docs2/guides/security', 'e3e'),
                exact: true,
                sidebar: "docs2Sidebar"
              },
              {
                path: '/thinkingdata-docs/docs2/intro',
                component: ComponentCreator('/thinkingdata-docs/docs2/intro', '733'),
                exact: true,
                sidebar: "docs2Sidebar"
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
