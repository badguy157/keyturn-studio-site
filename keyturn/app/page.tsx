import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* ===== New compact hero ===== */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            More <span className="accent">direct bookings</span>, fewer OTA fees.
          </h1>
          <p className="hero-lede">We rebuild <strong>8–40 room inns &amp; small hotels</strong> so more guests book direct.</p>

          <div className="chip-row" aria-label="Capabilities">
            <span className="chip" title="Google Analytics 4">GA4 events</span>
            <span className="chip" title="Structured data for search engines">JSON-LD</span>
            <span className="chip" title="Core Web Vitals">CWV</span>
            <span className="chip" title="Accessible to screen readers & keyboard users">Accessibility pass</span>
          </div>

          <div className="hero-ctas">
            <a className="btn btn-primary" href="#services">How it works</a>
            <a className="btn btn-ghost" href="#results">See proof</a>
          </div>

          <p className="hero-subtext">
            Ready now? <Link href="/onboarding">Start onboarding</Link> (3-week build, fixed fee).
          </p>
        </div>
      </section>

      <main id="main">
        <section id="services" className="container grid section">
          <article className="card">
            <h3>Makeover Sprint</h3>
            <p>3–4 weeks to rebuild your site on modern tech with clear CTAs, GA4 tracking, and speed tuned for mobile.</p>
            <ul>
              <li>Home, Rooms, Food/Bar, Story/FAQ</li>
              <li>Sticky &quot;Best Rate&quot; CTA + unified booking link</li>
              <li>GA4 events + JSON-LD schema</li>
              <li>Digital Asset Pack & handover</li>
            </ul>
          </article>

          <article className="card">
            <h3>Growth Care Plan</h3>
            <p>Keep it fast & improving: hosting, updates, monthly CRO nudge, GBP hygiene, and a simple report.</p>
            <ul>
              <li>Monitoring, backups, edits</li>
              <li>Monthly report with commission-savings line</li>
              <li>Quarterly content block</li>
            </ul>
          </article>

          <article className="card">
            <h3>Why it pays</h3>
            <p>Each booking moved off OTAs saves roughly <strong><abbr title="Average Daily Rate">ADR</abbr> × <abbr title="Average Length of Stay">ALOS</abbr> × 18%</strong>.</p>
            <p className="small">Example: ADR $100, ALOS 2 → ~$36 saved per booking.</p>

            <div className="roi-box">
              <strong>ROI at a glance</strong>
              <p>Move just <strong>10–20 bookings/month</strong> to direct and save about <strong>$4.3k–$8.6k/yr</strong> — often enough to repay a Core project inside 12 months.</p>

              <details className="tiny">
                <summary>Show the math</summary>
                <div>
                  <p>Saved/booking = ADR × ALOS × commission. Using example values: 100 × 2 × 0.18 = <strong>$36</strong>.</p>
                  <p>Annual savings ≈ moved_bookings_per_month × $36 × 12.</p>
                </div>
              </details>
            </div>
          </article>
        </section>

        {/* Pilot banner */}
        <section className="container banner">
          <p><strong>Founders&apos; Pilot (2 slots/month):</strong> Reduced setup for properties that let us <strong>publish a case study with metrics</strong> (GA4 + bookings). <strong>Includes first 2 months of Care free, then $300/mo.</strong> Same deliverables, same 3-week timeline.</p>
          <div className="buttons">
            <a className="btn primary" href="#audit" aria-label="Apply for Founders' Pilot">Apply for Pilot</a>
          </div>
        </section>

        <section className="container specialists section" aria-labelledby="specialists-title">
          <h2 id="specialists-title">Our Specialist Network</h2>
          <p className="small">We&apos;re a lean studio with a vetted bench. When a project needs extra hands, we bring in <strong>Top Rated</strong> designers and builders who follow our Keyturn playbook. You meet them; we manage the work.</p>
          <ul className="specialist-list">
            <li><div className="spec-name">Jane D.</div><div className="spec-meta">UI/UX for hospitality — Top Rated Plus, 500+ ★ reviews</div></li>
            <li><div className="spec-name">Leo P.</div><div className="spec-meta">Next.js/Tailwind implementer — Top Rated, 300+ ★ reviews</div></li>
            <li><div className="spec-name">Ava K.</div><div className="spec-meta">Technical SEO & schema — Top Rated, 200+ ★ reviews</div></li>
          </ul>
          <p className="tiny">Partner badges and prior experience shown with permission. Listed individuals are independent collaborators, not employees.</p>
        </section>

        <section id="results" className="container section">
          <h2>Results</h2>

          <div className="result">
            <div className="result-copy">
              <h4>The Anchor Hotel — Haydon Bridge</h4>
              <ul>
                <li>Direct share lifted from ~3–4% to 22–25%+</li>
                <li>Outbound booking CTR up with sticky CTA</li>
                <li>Faster, cleaner UX + GA4 event tracking</li>
              </ul>

              <div className="buttons">
                <a className="btn" href="/anchor-case.html">Read case study</a>
                <a className="btn" href="https://www.theanchorhotelhaydonbridge.com" target="_blank" rel="noopener noreferrer">View live site</a>
                <a className="btn" href="/screenshot.png" target="_blank" rel="noopener noreferrer">Open screenshot</a>
              </div>

              <p className="disclaimer"><em>Independent studio. &quot;The Anchor Hotel&quot; case study shown with permission.
                <strong>No affiliation or ownership.</strong></em></p>
            </div>

            <figure className="result-visual">
              <Image className="zoomable" src="/screenshot.png" alt="The Anchor Hotel homepage after the makeover" width={800} height={600} loading="lazy" />
              <figcaption>Homepage after the makeover</figcaption>
            </figure>
          </div>

          <div className="proof-grid">
            <article className="proof-card"><h5>Direct share ↑</h5><p>From single digits to <strong>22–25%+</strong> (seasonal).</p></article>
            <article className="proof-card"><h5>PageSpeed / <abbr title="Core Web Vitals">CWV</abbr></h5><p>Homepage into the <strong>green</strong>; faster, cleaner UX.</p></article>
            <article className="proof-card"><h5>Tracked funnel</h5><p><code>book_click</code> &amp; <code>booking_outbound</code> GA4 events live.</p></article>
          </div>

          <div className="metrics-grid">
            <article className="metric-card">
              <h5>Website-direct (annual, weighted)</h5>
              <p><strong>21.7%</strong> website-direct</p>
              <p className="tiny">Off-peak snapshot: 18.8% (3/16). Annual weighting uses off-peak ≈9.8% of yearly bookings. In-season assumption: 22% website-direct.</p>
            </article>
            <article className="metric-card">
              <h5>Post-launch snapshot</h5>
              <p><strong>18.8%</strong> website-direct (3 of 16)</p>
              <p className="tiny">Oct 28 → Nov 9 • off-peak</p>
            </article>
            <article className="metric-card">
              <h5><abbr title="Average Daily Rate">ADR</abbr> &amp; <abbr title="Average Length of Stay">ALOS</abbr></h5>
              <p><strong>$90.65 ADR</strong> • <strong>1.51 nights</strong></p>
              <p className="tiny">Occupancy ~26.3% (8 rooms)</p>
            </article>
            <article className="metric-card">
              <h5>Saved per moved booking</h5>
              <p><strong>~$24.60</strong> per booking</p>
              <p className="tiny">ADR × ALOS × 18% commission</p>
            </article>
            <article className="metric-card">
              <h5>Search lift after launch</h5>
              <p>Clicks <strong>+107%</strong>; CTR <strong>5.1% vs 2.3%</strong></p>
              <p className="tiny">Avg pos. <strong>15.7 vs 23.7</strong> (GSC)</p>
            </article>
          </div>
        </section>

        <section id="pricing" className="container section">
          <h2>Pricing</h2>
          <p className="small">Built for owner-operated inns &amp; small hotels (<strong>8–40 rooms</strong>)</p>

          <div className="pay-toggle" role="group" aria-label="Payment options">
            <label className="switch">
              <input type="checkbox" id="payToggle" role="switch" aria-checked="false" aria-label="Pay monthly (0% 4-pay)" disabled />
              <span className="slider" aria-hidden="true"></span>
              <span id="switchLabel" className="switch-label">Pay monthly (0% 4-pay)</span>
            </label>
          </div>

          <div className="grid">
            <article className="card">
              <h3 className="card-title">Makeover Sprint (Core)</h3>
              <div className="price" data-upfront="$7,500" data-monthly="$1,875/mo × 4">$7,500</div>
              <p className="who small">Best for: 12–25 rooms, single-property owners.</p>
              <ul className="features">
                <li>Core pages: Home, Rooms, Eat &amp; Drink, What&apos;s On, Story/FAQ</li>
                <li>Unified &quot;Book direct — best rate&quot; CTAs (sticky + hero)</li>
                <li>GA4 events (booking_outbound/book_click) + quick dashboard</li>
                <li>JSON-LD: Hotel/Restaurant/FAQ • Speed &amp; accessibility pass</li>
                <li>eviivo branding/config touch-ups • 2 revision rounds</li>
              </ul>
              <a className="btn primary" href="#audit">Get a 10-min audit</a>
            </article>
            
            <article className="card">
              <h3 className="card-title">Makeover + CRO (Pro)</h3>
              <div className="price" data-upfront="$12,000" data-monthly="$3,000/mo × 4">$12,000</div>
              <p className="who small">Best for: 20–40 rooms or high-demand boutique stays.</p>
              <ul className="features">
                <li>Everything in Core</li>
                <li>Copy polish + structured FAQs + review badges</li>
                <li>Events strip &amp; menu presentation upgrades</li>
                <li>A/B-ready CTA variants &amp; experiment hooks</li>
                <li>Seasonal landing blocks (e.g., cyclists, walkers, weddings)</li>
              </ul>
              <a className="btn" href="#audit">Book discovery</a>
            </article>
            
            <article className="card">
              <h3 className="card-title">Ongoing Plans</h3>
              <div className="price">$300–$900/mo</div>
              <p className="who small">Best for: properties investing in steady CRO/SEO momentum.</p>
              <ul className="features">
                <li><strong>Care ($300/mo):</strong> updates, backups, small edits, GA4 sanity checks</li>
                <li><strong>Growth ($900/mo):</strong> 1 meaningful CRO/SEO win + GBP posts + KPI line</li>
                <li>Monthly change log &amp; direct-booking click tracking</li>
              </ul>
              <p className="tiny perk">Pilot perk: <strong>first 2 months of Care free</strong>, then $300/mo.</p>
              <a className="btn" href="#audit">See plan details</a>
              <p className="tiny">Alt: $4,500 + $499/mo × 12</p>
            </article>      
          </div>

          <div className="card footnote">
            <p><strong>Who each tier fits</strong></p>
            <ul>
              <p className="tiny">Founders&apos; Pilot: case-study partners who meet criteria (data access, showcase permission, and basic volume fit). Includes first 2 months of Care free, then $300/mo.</p>
              <li><strong>Core ($7.5k):</strong> 8–20 rooms; typically repays in ~12–18 months from saved commission alone.</li>
              <li><strong>Pro ($12k):</strong> 20–40 rooms or smaller properties with strong year-round demand/F&amp;B.</li>
              <li><strong>Growth (from $900/mo):</strong> select high-volume properties; target +20–30 direct bookings/month and track it.</li>
            </ul>
            <p className="tiny">0% 4-pay spreads your setup across 4 equal monthly payments; work begins after first payment. Care/Growth are separate.</p>

            <details className="tiny" style={{marginTop:'8px'}}>
              <summary>Payback estimator (try it)</summary>
              <div className="est" aria-labelledby="estLbl">
                <label id="estLbl" className="sr-only">Payback estimator inputs</label>
                <label htmlFor="estADR">ADR ($)
                  <input id="estADR" type="number" min="30" step="1" defaultValue="100" autoComplete="off" inputMode="decimal" disabled />
                </label>
                <label htmlFor="estALOS">ALOS (nights)
                  <input id="estALOS" type="number" min="1" step="0.1" defaultValue="2" autoComplete="off" inputMode="decimal" disabled />
                </label>
                <label htmlFor="estMoved">Bookings moved / month
                  <input id="estMoved" type="number" min="1" step="1" defaultValue="15" autoComplete="off" inputMode="numeric" disabled />
                </label>
                <label htmlFor="estComm">Commission (%)
                  <input id="estComm" type="number" min="0" max="100" step="1" defaultValue="18" autoComplete="off" inputMode="numeric" disabled />
                </label>
                <label htmlFor="estCost">Project cost ($)
                  <input id="estCost" type="number" min="1000" step="100" defaultValue="7500" autoComplete="off" inputMode="numeric" disabled />
                </label>
                <button className="btn secondary" type="button" id="estBtn" aria-label="Calculate payback estimate" disabled>Calculate</button>
                <p id="estOut" className="small" role="status" aria-live="polite"></p>
              </div>
            </details>

            <div className="buttons" style={{marginTop:'10px'}}>
              <Link className="btn" href="/onboarding">Start onboarding</Link>
            </div>
          </div>
        </section>

        <section id="principles" className="container section">
          <h2>How we work</h2>
          <ul className="bullets">
            <li><strong>Independent studio.</strong> No affiliation with the properties shown unless stated.</li>
            <li><strong>Hospitality-first.</strong> Owner-operated inns, small hotels, and boutique stays.</li>
            <li><strong>You own everything.</strong> Domain, content, images, and code are handed over in a Digital Asset Pack.</li>
            <li><strong>Transparent fees.</strong> Fixed-fee makeover sprint + simple monthly care plan.</li>
            <li><strong>Privacy-minded.</strong> GA4 only; no guest data resale pixels.</li>
            <li><strong>Truth in imagery.</strong> Lifestyle shots may be staged or AI-assisted — we label them.</li>
          </ul>
        </section>
        
        <section id="portfolio" className="container section">
          <h2>Portfolio components</h2>
          <p className="small">A few example blocks from recent work.</p>
          <div className="gallery">
            <figure><Image className="zoomable" src="/portfolio/Hero_Desktop.png" alt="Hero (desktop)" width={600} height={400} loading="lazy" /><figcaption>Hero (desktop)</figcaption></figure>
            <figure><Image className="zoomable" src="/portfolio/Hero_Mobile.png" alt="Hero (mobile)" width={400} height={600} loading="lazy" /><figcaption>Hero (mobile)</figcaption></figure>
            <figure><Image className="zoomable" src="/portfolio/Rooms_Grid.png" alt="Rooms grid" width={600} height={400} loading="lazy" /><figcaption>Rooms grid</figcaption></figure>
            <figure><Image className="zoomable" src="/portfolio/RoomCard_Full.png" alt="Room detail" width={600} height={400} loading="lazy" /><figcaption>Room detail</figcaption></figure>
            <figure><Image className="zoomable" src="/portfolio/Menu_Page.png" alt="Menu section" width={600} height={400} loading="lazy" /><figcaption>Menu section</figcaption></figure>
            <figure><Image className="zoomable" src="/portfolio/Trust_Line.png" alt="Direct benefits / trust line" width={600} height={200} loading="lazy" /><figcaption>Trust line</figcaption></figure>
            <figure><Image className="zoomable" src="/portfolio/Sticky_CTA_Mobile.png" alt="Sticky booking bar (mobile)" width={400} height={100} loading="lazy" /><figcaption>Sticky CTA (mobile)</figcaption></figure>
            <figure><Image className="zoomable" src="/portfolio/Events_Strip.png" alt="What's On events strip" width={600} height={200} loading="lazy" /><figcaption>Events strip</figcaption></figure>
            <figure><Image className="zoomable" src="/portfolio/Booking_CTA_Click.png" alt="Booking CTA" width={400} height={200} loading="lazy" /><figcaption>Booking CTA</figcaption></figure>
          </div>
        </section>
        
        <section id="audit" className="container contact section">
          <h2>Get a quick audit</h2>
          <p className="small">Share a few details and we&apos;ll send a 2–3 minute Loom with 3 suggested fixes and an ROI estimate.</p>

          <form id="auditForm"
                className="audit-form"
                action="https://formspree.io/f/mvgdpyay"
                method="POST">
            <div className="form-row">
              <label htmlFor="property">Property name</label>
              <input id="property" type="text" name="property" required autoComplete="organization" />
            </div>

            <div className="form-row">
              <label htmlFor="website">Website URL</label>
              <input id="website" type="url" name="website" placeholder="https://example.com" required autoComplete="url" />
            </div>

            <div className="form-row two">
              <div>
                <label htmlFor="rooms">Rooms</label>
                <input id="rooms" type="number" name="rooms" min="1" max="100" required inputMode="numeric" autoComplete="off" />
              </div>
              <div>
                <label htmlFor="adr">
                  <abbr title="Average Daily Rate — typical nightly room price before taxes/fees">ADR</abbr> (approx.)
                </label>
                <input id="adr" type="number" name="adr" min="40" step="1" inputMode="decimal"
                       placeholder="e.g., 100" aria-describedby="adrHelp" required autoComplete="off" />
                <p id="adrHelp" className="tiny">Use your average nightly room price before taxes/fees.</p>
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="booking">Booking engine link</label>
              <input id="booking" type="url" name="booking" placeholder="Direct booking URL" autoComplete="url" />
            </div>

            <div className="form-row">
              <label htmlFor="email">Your email</label>
              <input id="email" type="email" name="email" required autoComplete="email" />
            </div>

            <div className="form-row">
              <label className="check">
                <input type="checkbox"
                       id="pilot"
                       name="pilot"
                       value="yes"
                       aria-controls="pilotFields"
                       aria-expanded="false"
                       disabled />
                Apply for Founders&apos; Pilot (case-study partner pricing)
              </label>
              <p className="tiny" id="pilotHelp">If selected, share a public rooms link and confirm the conditions below.</p>
            </div>

            <input type="hidden" name="program" id="program" value="Standard" />
            <input type="hidden" name="pilot_benchmarks" id="pilot_benchmarks" value="" />

            <div className="form-row">
              <label htmlFor="notes">Notes (optional)</label>
              <textarea id="notes" name="notes" rows={4} placeholder="Anything we should know?" autoComplete="off"></textarea>
            </div>

            <input type="hidden" name="_subject" id="fsSubject" value="" />
            <input type="hidden" name="_replyto"  id="fsReply"   value="" />
            <input type="text"   name="_gotcha"   style={{display:'none'}} />

            <button className="btn primary" type="submit" id="auditSubmit">Request audit</button>
            <p className="tiny">Prefer email? <a href="mailto:vinnie@keyturn.studio">vinnie@keyturn.studio</a></p>
            <p id="auditMsg" className="tiny" role="status" aria-live="polite" style={{marginTop:'6px'}}></p>
          </form>
        </section>
      </main>

      {/* Sticky mobile CTA (kept as audit request) */}
      <a href="#audit" className="sticky-cta" aria-label="Request an audit">Request audit</a>
    </>
  );
}
