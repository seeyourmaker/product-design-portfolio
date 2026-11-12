import { FormEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowUpRight } from 'lucide-react';
import './ContactPage.css';

const emailAddress = 'saurabh.h@live.in';

export default function ContactPage() {
  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();
    const subject = `Let's connect I saw your portfolio${name ? ` — ${name}` : ''}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <header className="contact-nav">
          <a href="/" className="contact-back"><ArrowLeft size={18} aria-hidden="true" /> Back to portfolio</a>
          <span>GOOD THINGS START WITH A HELLO</span>
          <div className="contact-socials">
            <a href="https://x.com/SeeYourMaker" target="_blank" rel="noreferrer">X <ArrowUpRight size={14} aria-hidden="true" /></a>
            <a href="https://www.instagram.com/seeyourmaker/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </header>
        <div className="contact-orbit" aria-hidden="true">
          <span className="contact-orbit__halo" />
          <span className="contact-orbit__ring contact-orbit__ring--one" />
          <span className="contact-orbit__ring contact-orbit__ring--two" />
          <span className="contact-orbit__core" />
        </div>
        <div className="contact-hero-copy">
          <p className="contact-eyebrow">Open to thoughtful collaborations</p>
          <h1 id="contact-title">Let's make<br /><span>something matter.</span></h1>
          <a className="contact-poke" href="#contact-form">Poke <ArrowDown size={19} aria-hidden="true" /></a>
        </div>
        <span className="contact-hero-index" aria-hidden="true">01 / 02</span>
      </section>

      <section className="contact-form-section" id="contact-form" aria-labelledby="contact-form-title">
        <div className="contact-form-intro">
          <p className="contact-eyebrow">Your turn</p>
          <h2 id="contact-form-title">Tell me<br />what's on your mind.</h2>
          <p>Your note opens as a ready-to-send email, with your details and message included.</p>
        </div>
        <form className="contact-form" onSubmit={sendMessage}>
          <div className="contact-form-row">
            <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
            <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          </div>
          <label>Message<textarea name="message" rows={4} maxLength={1200} placeholder="A little about what you have in mind…" required /></label>
          <div className="contact-form-submit">
            <p>Usually reply within a couple of days.</p>
            <button type="submit">Shoot <ArrowUpRight size={18} aria-hidden="true" /></button>
          </div>
        </form>
        <footer className="contact-footer"><a href="/">Saurabh H</a><span>THANKS FOR STOPPING BY</span><a href="#contact-title">Back to top ↑</a></footer>
      </section>
    </main>
  );
}
