import {
  faFacebookSquare,
  faInstagram,
  faSquareXTwitter,
  faTiktok,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faBriefcase,
  faCalendar,
  faCircleCheck,
  faHandHoldingHeart,
  faKey,
  faList,
  faSitemap,
  faTree,
  faUniversalAccess,
} from '@fortawesome/free-solid-svg-icons';

export const social = {
  directory: 'https://www.ridgetownc.com/about/contactus/#socials',
  links: [
    {
      text: 'X',
      icon: faSquareXTwitter,
      href: 'https://twitter.com/RidgetownCampus',
      classes: 'focus:text-[#1da1f2] hover:text-[#1da1f2]',
    },
    {
      text: 'Facebook',
      icon: faFacebookSquare,
      href: 'https://www.facebook.com/UofGRidgetownCampus/',
      classes: 'focus:text-[#4267b2] hover:text-[#4267b2]',
    },
    {
      text: 'Instagram',
      icon: faInstagram,
      href: 'https://www.instagram.com/ridgetowncampus/?hl=en',
      classes: 'focus:text-[#e1306c] hover:text-[#e1306c]',
    },
    {
      text: 'Youtube',
      icon: faYoutube,
      href: 'https://www.youtube.com/user/RidgetownCampus/',
      classes: 'focus:text-[#f00] hover:text-[#f00]',
    },
    {
      text: 'TikTok',
      icon: faTiktok,
      href: 'https://www.tiktok.com/@experienceridgetown',
      classes: 'focus:text-[#f00] hover:text-[#f00]',
    },
  ],
};

export const primaryLinks = [
  {
    text: 'Accessibility',
    icon: faUniversalAccess,
    href: 'https://www.uoguelph.ca/diversity-human-rights/accessibility-u-g',
  },
  {
    text: 'Privacy',
    icon: faKey,
    href: 'https://www.uoguelph.ca/web/privacy/',
  },
  {
    text: 'Site Map',
    icon: faSitemap,
    href: 'https://www.uoguelph.ca/sitemap',
  },
  {
    text: 'Status Page',
    icon: faCircleCheck,
    href: 'https://uoguelph.statuspage.io/',
  },
  {
    text: 'Land Acknowledgement',
    icon: faTree,
    href: 'https://www.uoguelph.ca/land-acknowledgement/',
    title:
      'The University of Guelph resides on the treaty lands and territory of the Mississaugas of the Credit. We recognize that today this gathering place is home to many First Nations, Inuit and Métis peoples and acknowledging them reminds us of our collective responsibility to the land where we learn and work.',
  },
  {
    text: 'Careers',
    icon: faBriefcase,
    href: 'https://careers.uoguelph.ca/',
  },
  {
    text: 'Undergraduate Calendar',
    icon: faCalendar,
    href: 'https://www.uoguelph.ca/registrar/calendars/undergraduate/current/',
  },
  {
    text: 'Graduate Calendar',
    icon: faCalendar,
    href: 'https://www.uoguelph.ca/registrar/calendars/graduate/current/',
  },
  {
    text: 'Program Plans',
    icon: faList,
    href: 'https://admission.uoguelph.ca/programs',
  },
  {
    text: 'Give to U of G',
    icon: faHandHoldingHeart,
    href: 'https://www.alumni.uoguelph.ca/give-to-guelph/how-to-give',
  },
];

export const address = {
  title: 'University of Guelph - Ridgetown Campus',
  street: '120 Main Street East',
  city: 'Ridgetown',
  postalCode: 'N0P 2C0',
  phoneNumber: '519-674-1500',
};
