import { faFacebookSquare, faInstagram, faLinkedin, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faBriefcase,
  faCircleCheck,
  faHandHoldingHeart,
  faKey,
  faList, faMap,
  faTree,
  faUniversalAccess,
} from '@fortawesome/free-solid-svg-icons';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons/faMapMarker';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt';

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
      text: 'Instagram',
      icon: faInstagram,
      href: 'https://www.instagram.com/ridgetowncampus',
      classes: 'focus:text-[#e1306c] hover:text-[#e1306c]',
    },
    {
      text: 'LinkedIn',
      icon: faLinkedin,
      href: 'https://www.linkedin.com/company/university-of-guelph-ridgetown-campus',
      classes: 'focus:text-[#0077b5] hover:text-[#0077b5]',
    },
    {
      text: 'Facebook',
      icon: faFacebookSquare,
      href: 'https://www.facebook.com/UofGRidgetownCampus/',
      classes: 'focus:text-[#4267b2] hover:text-[#4267b2]',
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
    text: 'Land Acknowledgement',
    icon: faTree,
    href: 'https://www.uoguelph.ca/land-acknowledgement/',
    title:
      'The University of Guelph resides on the treaty lands and territory of the Mississaugas of the Credit. We recognize that today this gathering place is home to many First Nations, Inuit and Métis peoples and acknowledging them reminds us of our collective responsibility to the land where we learn and work.',
  },
  {
    text: 'Privacy',
    icon: faKey,
    href: 'https://www.uoguelph.ca/web/privacy/',
  },
  {
    text: 'Status Page',
    icon: faCircleCheck,
    href: 'https://uoguelph.statuspage.io/',
  },
  {
    text: 'Careers',
    icon: faBriefcase,
    href: 'https://careers.uoguelph.ca/',
  },
  {
    text: 'Give to U of G',
    icon: faHandHoldingHeart,
    href: 'https://www.alumni.uoguelph.ca/give-to-guelph/how-to-give',
  },
  {
    text: 'Visit Us',
    icon: faMapMarkerAlt,
    href: 'https://preview-ugconthub.netlify.app/ridgetown/campus-tour/',
  },
  {
    text: 'Programs',
    icon: faList,
    href: 'https://preview-ugconthub.netlify.app/ridgetown/programs/',
  },
  {
    text: 'Campus Map',
    icon: faMap,
    href: 'https://preview-ugconthub.netlify.app/ridgetown/about/directions',
  },
];

export const address = {
  title: 'University of Guelph, Ridgetown Campus',
  street: '120 Main Street East',
  city: 'Ridgetown',
  postalCode: 'N0P 2C0',
  phoneNumber: '519-674-1500',
};
