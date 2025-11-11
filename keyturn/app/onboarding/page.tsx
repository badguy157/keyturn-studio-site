'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

// Type for window with gtag
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params: Record<string, string>) => void;
    calendlyEventListener?: (e: MessageEvent) => void;
  }
}

export default function OnboardingPage() {
  const step1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen for postMessage from Google Form for form submission
    const handlePostMessage = (event: MessageEvent) => {
      // Google Forms sends a message when submitted
      if (event.data && typeof event.data === 'string' && event.data.includes('formResponse')) {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'onboarding_form_submit', {
            event_category: 'onboarding',
            event_label: 'google_form_submitted'
          });
        }
      }
    };

    window.addEventListener('message', handlePostMessage);
    
    // Initialize Calendly event listener
    if (typeof window !== 'undefined') {
      window.calendlyEventListener = function(e: MessageEvent) {
        if (e.data.event && e.data.event.indexOf('calendly') === 0) {
          if (e.data.event === 'calendly.event_scheduled') {
            if (window.gtag) {
              window.gtag('event', 'onboarding_calendly_booked', {
                event_category: 'onboarding',
                event_label: 'calendly_booking_completed'
              });
            }
          }
        }
      };
      window.addEventListener('message', window.calendlyEventListener);
    }

    return () => {
      window.removeEventListener('message', handlePostMessage);
      if (typeof window !== 'undefined' && window.calendlyEventListener) {
        window.removeEventListener('message', window.calendlyEventListener);
      }
    };
  }, []);

  const scrollToStep1 = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (step1Ref.current) {
      step1Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div className="container">
        <div className="hero">
          <h1>How onboarding works</h1>
          <p>Simple, fast, and built around lifting <strong>website-direct</strong> share.</p>
          <div className="hero-ctas">
            <a href="#step-1" onClick={scrollToStep1} className="btn primary">
              Start onboarding
            </a>
          </div>
        </div>
      </div>

      <main id="main">
        {/* 3-Step Onboarding Hub */}
        <section className="container section">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Onboarding Journey</h2>
          <div className="grid" style={{ marginBottom: '3rem' }}>
            {/* Step 1: Google Form */}
            <article 
              ref={step1Ref} 
              id="step-1" 
              className="card" 
              style={{ scrollMarginTop: 'calc(var(--header-h) + 24px)' }}
            >
              <h3>Step 1: Tell us about your property</h3>
              <p style={{ marginBottom: '1rem' }}>Fill out this quick form so we can understand your needs and goals.</p>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '600px', 
                border: '1px solid var(--line)', 
                borderRadius: '12px', 
                overflow: 'hidden',
                background: 'var(--card)'
              }}>
                <iframe
                  src="https://docs.google.com/forms/d/e/PLACEHOLDER_FORM_ID/viewform?embedded=true"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="Onboarding Form"
                  onLoad={() => {
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'onboarding_form_view', {
                        event_category: 'onboarding',
                        event_label: 'google_form_loaded'
                      });
                    }
                  }}
                >
                  Loading…
                </iframe>
              </div>
            </article>

            {/* Step 2: Secure Access */}
            <article className="card">
              <h3>Step 2: Provide secure access</h3>
              <p style={{ marginBottom: '1rem' }}>We&apos;ll need the following to get started on your makeover:</p>
              <ul className="bullets">
                <li><strong>Booking engine link</strong> — Direct URL to your booking system</li>
                <li><strong>GA4 access</strong> — View permissions for analytics (email: <code>team@keyturn.studio</code>)</li>
                <li><strong>Brand assets</strong> — Logo files, photos, menus (PDF), brand guidelines</li>
                <li><strong>Domain/DNS access</strong> — For launch and setup (we&apos;ll guide you)</li>
                <li><strong>Decision maker</strong> — One point of contact for weekly approvals</li>
              </ul>
              <div className="banner" style={{ marginTop: '1rem' }}>
                <p className="small" style={{ margin: 0 }}>
                  <strong>Security note:</strong> All credentials are stored securely and only shared with team members working on your project. We never store payment info.
                </p>
              </div>
            </article>

            {/* Step 3: Calendly */}
            <article className="card">
              <h3>Step 3: Schedule your kickoff call</h3>
              <p style={{ marginBottom: '1rem' }}>Book a 20-minute intro call to finalize scope and timeline.</p>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '600px', 
                border: '1px solid var(--line)', 
                borderRadius: '12px', 
                overflow: 'hidden',
                background: 'var(--card)'
              }}>
                <iframe
                  src="https://calendly.com/PLACEHOLDER_USERNAME/onboarding-kickoff?embed=true&hide_gdpr_banner=1"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule Kickoff Call"
                >
                  Loading…
                </iframe>
              </div>
            </article>
          </div>
        </section>

        {/* Existing Content: Process Details */}
        <section className="container grid section">
          <article className="card">
            <h3>1) Discovery → Audit</h3>
            <ul>
              <li>Quick audit request (<a href="/audit.html">form</a>)</li>
              <li>We send a 2–3 min Loom with 3 fixes + ROI estimate</li>
              <li>20-minute intro call (optional) to scope fit</li>
            </ul>
          </article>

          <article className="card">
            <h3>2) Makeover Sprint (≈3 weeks)</h3>
            <ul>
              <li>Core pages: Home, Rooms, Eat &amp; Drink, What&apos;s On, Story/FAQ</li>
              <li>Unified &quot;Book direct — best rate&quot; CTAs (sticky + hero)</li>
              <li>GA4 events (<code>book_click</code>, <code>booking_outbound</code>) + JSON-LD</li>
              <li>Speed &amp; accessibility pass; Digital Asset Pack</li>
            </ul>
          </article>

          <article className="card">
            <h3>3) Launch → Polish → Growth</h3>
            <ul>
              <li>Go-live + 30-day polish window for small tweaks</li>
              <li>Optional Care/Growth plan for CRO nudge & reporting</li>
              <li>Monthly KPI line: website-direct share (weighted), booking CTR, search clicks/CTR</li>
            </ul>
          </article>
        </section>

        <section className="container section">
          <div className="grid">
            <article className="card">
              <h3>What we need from you</h3>
              <ul>
                <li>Booking engine link (direct URL) &amp; PMS/engine name</li>
                <li>GA4 access; optional GSC access</li>
                <li>Logo, photos, menus (PDF), brand notes/voice</li>
                <li>Domain/DNS access for launch</li>
                <li>One decision-maker for weekly approvals</li>
              </ul>
            </article>

            <article className="card">
              <h3>Approvals cadence</h3>
              <ul>
                <li>Kickoff &amp; copy outline</li>
                <li>Design review (round 1)</li>
                <li>Build review (round 2)</li>
                <li>Pre-launch check</li>
              </ul>
              <p className="tiny">Guarantees &amp; cancellation terms are listed on the homepage.</p>
            </article>

            <article className="card">
              <h3>How we measure success</h3>
              <ul>
                <li><strong>Website-direct share (seasonally-weighted)</strong></li>
                <li>Outbound booking CTR &amp; funnel events</li>
                <li>Search clicks/CTR (GSC)</li>
              </ul>
              <p className="tiny">Pre-launch website-direct baseline currently: <strong>7.65%</strong>. Post-launch seasonal projection mid-case: <strong>~21.7%</strong>.</p>
            </article>
          </div>
        </section>

        <section className="container section">
          <div className="grid">
            <article className="card">
              <h3>Pricing & payment</h3>
              <ul>
                <li><strong>Core:</strong> $7,500 (0% 4-pay available)</li>
                <li><strong>Pro:</strong> $12,000</li>
                <li><strong>Care/Growth:</strong> $300–$900/mo</li>
              </ul>
              <p className="tiny">Work starts after first payment. You own domain, content, images, and code.</p>
            </article>

            <article className="card">
              <h3>FAQs</h3>
              <ul>
                <li><strong>ADR?</strong> <abbr title="Average Daily Rate — typical nightly room price before taxes/fees">Average Daily Rate</abbr>.</li>
                <li><strong>ALOS?</strong> <abbr title="Average Length of Stay">Average Length of Stay</abbr>.</li>
                <li><strong>Will this change my PMS/engine?</strong> No — we link to your existing engine.</li>
                <li><strong>Photos?</strong> Use yours or we can source/guide; we label staged/AI shots.</li>
                <li><strong>Data?</strong> GA4 only; no resale pixels.</li>
              </ul>
            </article>
          </div>
          <div className="buttons" style={{marginTop:'12px'}}>
            <a className="btn primary" href="/audit.html">Request your audit</a>
            <Link className="btn" href="/#results">See results</Link>
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <a href="/audit.html#audit" className="sticky-cta" aria-label="Request an audit">Request audit</a>
    </>
  );
}
