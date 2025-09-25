import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router'
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Accueil', href: '/', icon: HomeIcon },
  {
    name: 'A propos',
    href: '/about',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Clients', href: '/createuser', icon: UserGroupIcon },
];

export default function NavLinks({ open }: { open: boolean }) {
  const location = useLocation();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            to={link.href}
            className={clsx(
              location.pathname === link.href ? 'bg-purple-500/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
              'flex h-[52px] grow items-center justify-center gap-2 bg-gray-800 p-3 text-md font-medium md:flex-none md:p-2 md:px-3 data-focus:bg-white/5 data-focus:outline-hidden',
              {
                
                'md:justify-center': open === false,
                'md:justify-start': open === true,
              },
            )}
          >
            <LinkIcon className="w-7 mx-3" />
            <p className={`${open ? 'block' : 'hidden'}`}>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
