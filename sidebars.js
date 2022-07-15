/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  StrengthsFinder: [
    {
      type: 'category',
      label: '优势分析',
      items: [
        'strengths-finder/finding',
        'strengths-finder/applying',
        // 'strengths-finder/cliftonStrengths-themes',
      ],
    },
    'the-one-thing',
    {
      type: 'category',
      label: '逆向工作',
      items: [
        'working-backwards/intro',
        'working-backwards/buliding-blocks',
        'working-backwards/hiring',
        'working-backwards/organizing',
        'working-backwards/communicating',
      ],
    },
  ],

  Methodology: [{
    type: 'category',
    label: '沉淀方法论',
    items: [
      'methodology/performance',
    ],
  }]
};

module.exports = sidebars;
