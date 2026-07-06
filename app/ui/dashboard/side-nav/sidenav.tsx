import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-link/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import styles from './side-nav.module.scss'; 
import { signOut } from '@/auth';


export default function SideNav() {
  return (
    <div className={styles.container}>
      <Link className={styles.logoWrapper} href="/">
        <div className={styles.logoContent}>
          <AcmeLogo />
        </div>
      </Link>
      <div className={styles.navWrapper}>
        <NavLinks />
        <div className={styles.spacer}></div>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className={styles.signOutButton}>
            <PowerIcon className="w-6" />
            <div className={styles.signOutText}>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}


