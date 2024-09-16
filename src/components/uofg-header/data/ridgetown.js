import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

export const primaryLinks = [
  {
    text: 'About',
    href: 'https://preview-ugconthub.netlify.app/ridgetown/about/',
  },
  {
    text: 'Academics',
    href: 'https://preview-ugconthub.netlify.app/ridgetown/programs/',
  },
  {
    text: 'Discover Us',
    href: 'https://preview-ugconthub.netlify.app/ridgetown/discover/',
  },
  {
    text: 'Student Life',
    href: 'https://preview-ugconthub.netlify.app/ridgetown/student-life/',
  },
  {
    text: 'Search the University of Guelph',
    href: 'https://uoguelph.ca/search',
    icon: faSearch,
    excludeFromMainMenu: true,
  },
];

export const topLinks = [
  {
    text: 'Give',
    href: 'https://preview-ugconthub.netlify.app/ridgetown/alumni/',
  },
  {
    text: 'News',
    href: 'https://news.uoguelph.ca/',
  },
  {
    text: 'Visit Us',
    href: 'https://preview-ugconthub.netlify.app/ridgetown/campus-tour/'
  },
  {
    text: 'Research',
    href: 'https://preview-ugconthub.netlify.app/ridgetown/about/research/'
  },
  {
    text: 'Quick Links',
    links: [
      {
        text: 'Future Students',
        href: 'https://preview-ugconthub.netlify.app/ridgetown/discover/',
      },
      {
        text: 'Current Students',
        href: 'https://www.ridgetownc.com/current/academic-support/',
      },
      {
        text: 'Alumni',
        href: 'https://preview-ugconthub.netlify.app/ridgetown/alumni/',
      },
      {
        text: 'Business Development Centre',
        href: 'https://bdc.ridgetownc.com/',
      },
    ],
  },
  {
    text: 'APPLY NOW',
    href: 'https://preview-ugconthub.netlify.app/ridgetown/apply/',
    highlight: true,
  },
  {
    text: 'Account Menu',
    links: [
      {
        text: 'Intranet',
        href: 'https://uoguelphca.sharepoint.com/sites/Ridgetown/SitePages/CollabHome.aspx',
      },
      {
        text: 'WebAdvisor',
        href: 'https://www.uoguelph.ca/webadvisor/',
      },
      {
        text: 'GryphMail',
        href: 'https://mail.uoguelph.ca/',
      },
      {
        text: 'CourseLink',
        href: 'https://courselink.uoguelph.ca/',
      },
    ],
    icon: faUser,
    excludeFromMainMenu: true,
  },
];
