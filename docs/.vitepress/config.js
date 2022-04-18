export default {
  lang: 'zh-CN',
  title: 'Zeesuu',
  description: 'Tools & Components for developing web applications(CMS)',
  lastUpdated: true,
  base: '/zeesuu-v3/',

  themeConfig: {
    repo: 'lanbin/zeesuu-v3',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    sidebar: {
      '/': getGuideSidebar(),
    },
  },
};

function getGuideSidebar() {
  return [
    {
      text: '简介',
      children: [{ text: 'Zeesuu 是什么', link: '/' }],
    },
  ];
}

