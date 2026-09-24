import { Link } from 'react-router-dom';
import LegalLayout from '../components/layout/LegalLayout';

const EMAIL = <a href="mailto:kelly@shhaestheticswellness.com">kelly@shhaestheticswellness.com</a>;
const PHONE = <a href="tel:+16092212734">(609) 221-2734</a>;

const SECTIONS = [
  {
    id: 'sms-program',
    title: 'SMS / text messaging program',
    content: (
      <dl>
        <div>
          <dt>Program name</dt>
          <dd>Shh Aesthetics Appointment &amp; Offer Alerts</dd>
        </div>
        <div>
          <dt>Program description</dt>
          <dd>
            When you opt in, you may receive text messages from Shh Aesthetics about appointment
            reminders and confirmations, scheduling updates, appointment availability, and, if you
            opted in to marketing messages, occasional promotional offers.
          </dd>
        </div>
        <div>
          <dt>How you opt in</dt>
          <dd>
            You may opt in by providing your mobile number and agreeing to receive text messages
            through the chat feature on our website, our online booking page, or our client intake
            form. Consent to receive text messages is not a condition of purchasing any goods or
            services.
          </dd>
        </div>
        <div>
          <dt>Message frequency</dt>
          <dd>Message frequency varies. Marketing messages are sent up to 4 times per month.</dd>
        </div>
        <div>
          <dt>Cost</dt>
          <dd>
            Message and data rates may apply. Contact your wireless provider for details about your
            plan.
          </dd>
        </div>
        <div>
          <dt>Opting out</dt>
          <dd>
            You can cancel the SMS service at any time by replying <strong>STOP</strong> to any
            message. After you send STOP, we will send one final message confirming that you have
            been unsubscribed. To rejoin, sign up again the same way you did originally, or reply{' '}
            <strong>START</strong>.
          </dd>
        </div>
        <div>
          <dt>Help</dt>
          <dd>
            Reply <strong>HELP</strong> for assistance, or contact us at {EMAIL} or {PHONE}.
          </dd>
        </div>
        <div>
          <dt>Carrier liability</dt>
          <dd>Carriers are not liable for delayed or undelivered messages.</dd>
        </div>
        <div>
          <dt>Eligibility</dt>
          <dd>
            You must be at least 18 years old and the account holder or authorized user of the
            mobile number you provide.
          </dd>
        </div>
        <div>
          <dt>Health information</dt>
          <dd>
            Text messages are for scheduling and general communication only. Do not send medical
            information by text. For medical questions, call our office. In an emergency, call 911.
          </dd>
        </div>
      </dl>
    ),
  },
  {
    id: 'privacy',
    title: 'Privacy',
    content: (
      <p>
        See our <Link to="/privacy">Privacy Policy</Link> for how we collect, use, and protect your
        information. No mobile information will be shared with third parties or affiliates for
        marketing or promotional purposes. Text messaging opt-in data and consent will not be shared
        with any third parties.
      </p>
    ),
  },
  {
    id: 'website-use',
    title: 'Use of our website',
    content: (
      <p>
        Content on this website is for general information only and is not medical advice.
        Treatment results vary. A consultation is required before any treatment, and services are
        provided at the discretion of our licensed provider. You agree not to use this website for
        any unlawful purpose.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    content: (
      <p>
        To the fullest extent permitted by law, Shh Aesthetics is not liable for any indirect,
        incidental, or consequential damages arising from your use of this website or our text
        messaging program.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to these terms',
    content: (
      <p>
        We may update these terms from time to time. Changes will be posted here with a new "Last
        updated" date.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    content: <p>These terms are governed by the laws of the State of Florida.</p>,
  },
  {
    id: 'contact',
    title: 'Contact us',
    content: (
      <address>
        <strong>SHH AESTHETICS AND WELLNESS LLC</strong>
        7901 4th St N, Ste 300, St. Petersburg, FL 33702
        <br />
        Phone: {PHONE}
        <br />
        Email: {EMAIL}
      </address>
    ),
  },
];

export default function TermsPage({ ready }) {
  return (
    <LegalLayout
      ready={ready}
      seoPage="terms"
      eyebrow="Terms & Conditions"
      titleLines={['The fine print,', <em key="e" className="accent">in plain English.</em>]}
      intro={
        'These Terms & Conditions apply to your use of the website and text messaging program operated by SHH AESTHETICS AND WELLNESS LLC ("Shh Aesthetics," "we," "us," or "our"). By using our website or opting in to receive text messages, you agree to these terms.'
      }
      updated="September 16, 2026"
      sections={SECTIONS}
    />
  );
}
