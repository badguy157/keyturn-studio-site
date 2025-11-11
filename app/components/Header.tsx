'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-bar">
        <Link className="brand" href="/" aria-label="Keyturn Studio home">
          <Image src="/logo.svg" alt="Keyturn Studio" width={180} height={56} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop" aria-label="Primary">
          <ul className="nav-list">
            <li><Link href="#services">How it works</Link></li>
            <li><Link href="#results">Proof</Link></li>
            <li><Link href="#pricing">Pricing</Link></li>
          </ul>
          <div className="nav-ctas">
            <Link className="btn btn-ghost" href="/audit.html">Get a 10-min audit</Link>
            <Link className="btn btn-primary" href="/onboarding" aria-label="Skip audit and start onboarding">Start onboarding</Link>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button 
          className="menu-toggle" 
          aria-controls="mobileMenu" 
          aria-expanded={mobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Menu</span>☰
        </button>
      </div>

      {/* Mobile drawer */}
      <nav 
        id="mobileMenu" 
        className="mobile-drawer" 
        hidden={!mobileMenuOpen}
        aria-label="Mobile"
      >
        <Link href="#services" onClick={closeMobileMenu}>How it works</Link>
        <Link href="#results" onClick={closeMobileMenu}>Proof</Link>
        <Link href="#pricing" onClick={closeMobileMenu}>Pricing</Link>
        <Link className="btn btn-ghost w-full" href="/audit.html">Get a 10-min audit</Link>
        <Link className="btn btn-primary w-full" href="/onboarding">Start onboarding</Link>
      </nav>
    </header>
  );
}
