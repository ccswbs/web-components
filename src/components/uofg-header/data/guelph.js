import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

export const primaryLinks = [
  {
    text: 'About',
    href: 'https://uoguelph.ca/about',
  },
  {
    text: 'Academics',
    href: 'https://www.uoguelph.ca/programs/undergraduate',
  },
  {
    text: 'Admission',
    href: 'https://uoguelph.ca/admissions',
  },
  {
    text: 'Research',
    href: 'https://uoguelph.ca/research',
  },
  {
    text: 'Student Life',
    href: 'https://www.uoguelph.ca/studentexperience/',
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
    href: 'https://bbis.alumni.uoguelph.ca/BBIS_Cannon/give/uofg',
  },
  {
    text: 'News',
    href: 'https://news.uoguelph.ca/',
  },
  {
    text: 'Quick Links',
    links: [
      {
        text: 'Future Students',
        href: 'https://uoguelph.ca/future-ready',
      },
      {
        text: 'Current Students',
        href: 'https://www.uoguelph.ca/students',
      },
      {
        text: 'Alumni & Donors',
        href: 'https://alumni.uoguelph.ca/',
      },
      {
        text: 'Faculty & Staff',
        href: 'https://www.uoguelph.ca/faculty',
      },
      {
        text: 'Employers & Partners',
        href: 'https://cecs.uoguelph.ca/employers-institutions',
      },
    ],
  },
  {
    text: 'Apply Now',
    href: 'https://uoguelph.ca/apply/',
    highlight: true,
  },
  {
    text: 'Account Menu',
    links: [
      {
        text: 'U of G Insider',
        href: 'https://uoguelphca.sharepoint.com/',
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
      {
        text: 'GryphLife',
        href: 'https://gryphlife.uoguelph.ca/',
      },
    ],
    icon: faUser,
    excludeFromMainMenu: true,
  },
];
