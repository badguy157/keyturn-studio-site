export const metadata = {
  title: 'Privacy Policy — Keyturn Studio',
};

export default function PrivacyPage() {
  return (
    <main id="main">
      <div className="container" style={{maxWidth:'820px', padding:'32px 20px'}}>
        <h1>Privacy Policy</h1>
        <p className="muted" style={{color:'var(--muted)', fontSize:'14px'}}>Effective 2025-11-07</p>
        <p>Keyturn Studio builds and maintains marketing websites for privately owned hospitality businesses. We keep data collection minimal and transparent.</p>
        
        <h2>What we collect</h2>
        <ul>
          <li><strong>Site analytics:</strong> We use Google Analytics 4 to measure anonymous usage. We do not use cross-site advertising pixels.</li>
          <li><strong>Contact info you send us:</strong> If you email us, we receive your name, email, and message.</li>
        </ul>
        
        <h2>How we use data</h2>
        <ul>
          <li>To respond to messages and provide services.</li>
          <li>To understand aggregate site performance and improve UX.</li>
        </ul>
        
        <h2>Sharing</h2>
        <p>We do not sell personal data. We may share limited information with service providers (e.g., hosting, analytics) under confidentiality terms.</p>
        
        <h2>Retention</h2>
        <p>Contact emails are kept as long as needed to deliver services. Aggregate analytics are retained per the provider&apos;s default windows.</p>
        
        <h2>Your choices</h2>
        <p>Contact us to request changes or deletion of messages you&apos;ve sent. You can also use browser-level tracking protection.</p>
        
        <h2>Contact</h2>
        <p>Email: <a href="mailto:keyturnstudio@proton.me">keyturnstudio@proton.me</a></p>
        
        <p className="muted" style={{color:'var(--muted)', fontSize:'14px'}}>Operated by Ridgeway Labs LLC.</p>
      </div>
    </main>
  );
}
