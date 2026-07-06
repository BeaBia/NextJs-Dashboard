import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
// A linha de import do styles foi deletada!
import { signOut } from '@/auth';

export default function SideNav() {
  return (
    <div className="sidenav-container">
      <Link className="sidenav-logo-wrapper" href="/">
        <div className="sidenav-logo-content">
          <AcmeLogo />
        </div>
      </Link>
      <div className="sidenav-nav-wrapper">
        <NavLinks />
        <div className="sidenav-spacer"></div>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="sidenav-signout-btn">
            <PowerIcon className="w-6" />
            <div className="sidenav-signout-text">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}