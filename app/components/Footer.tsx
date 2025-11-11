'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="container footer">
      <p>© <span id="y">{year}</span> Keyturn Studio • Marketing websites for hospitality</p>
      <p className="small">
        <Link href="/privacy">Privacy</Link> ·{' '}
        <Link href="/terms">Terms</Link> ·{' '}
        <Link href="/onboarding">Start onboarding</Link> ·{' '}
        <Link href="/tools/roi.html">Estimate ROI</Link>
        <span style={{paddingLeft:'16px'}}>
          <a 
            href="https://calendly.com/vinnie-keyturn/intro"
            style={{
              background:'#0a1220',
              color:'#e6ebf5',
              textDecoration:'none',
              borderRadius:'12px',
              padding:'10px 14px',
              display:'inline-block',
              fontWeight:'700'
            }}
          >
            Book a 15-min intro
          </a>
        </span>
      </p>
    </footer>
  );
}
