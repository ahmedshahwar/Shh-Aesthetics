import LegalLayout from '../components/layout/LegalLayout';

const EMAIL = <a href="mailto:kelly@shhaestheticswellness.com">kelly@shhaestheticswellness.com</a>;
const PHONE = <a href="tel:+16092212734">(609) 221-2734</a>;

const SECTIONS = [
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    content: (
      <p>
        We collect information you give us directly, such as your name, email address, mobile phone
        number, and any message you send through the chat feature on our website, our booking page,
        or intake forms. We may also collect basic technical information when you visit our website,
        such as browser type and pages visited.
      </p>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How we use your information',
    content: (
      <ul>
        <li>To respond to your questions and requests</li>
        <li>To schedule, confirm, and remind you about appointments</li>
        <li>To send text messages you have agreed to receive</li>
        <li>To send occasional updates and offers, if you have opted in</li>
        <li>To operate and improve our website and services</li>
      </ul>
    ),
  },
  {
    id: 'sms',
    title: 'SMS / text messaging',
    content: (
      <>
        <p>
          If you opt in to receive text messages, we use your mobile number only to send the types
          of messages you agreed to. Message frequency varies. Message and data rates may apply. You
          can reply <strong>STOP</strong> at any time to opt out, or <strong>HELP</strong> for
          assistance.
        </p>
        <p>
          No mobile information will be shared with third parties or affiliates for marketing or
          promotional purposes. All the above categories exclude text messaging originator opt-in
          data and consent; this information will not be shared with any third parties.
        </p>
      </>
    ),
  },
  {
    id: 'sharing',
    title: 'Sharing your information',
    content: (
      <p>
        We do not sell or rent your personal information. We may share information with service
        providers who help us run our business, such as our scheduling, website, and text messaging
        platforms, only as needed to provide those services and never for their own marketing. We
        may also disclose information when required by law.
      </p>
    ),
  },
  {
    id: 'health-information',
    title: 'Health information',
    content: (
      <p>
        Protected health information collected as part of your care is handled according to
        applicable federal and Florida law and is covered by our separate Notice of Privacy
        Practices, available at our office. Please do not send medical details through our website
        chat or by text message.
      </p>
    ),
  },
  {
    id: 'data-security',
    title: 'Data security',
    content: (
      <p>
        We use reasonable safeguards to protect your information. No method of transmission over the
        internet is completely secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: 'your-choices',
    title: 'Your choices',
    content: (
      <p>
        You can opt out of text messages by replying <strong>STOP</strong>, unsubscribe from emails
        using the link in any email, or contact us to request access to, correction of, or deletion
        of your personal information.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    content: (
      <p>
        Our website and services are not directed to anyone under 18, and we do not knowingly
        collect information from children.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    content: (
      <p>
        We may update this policy from time to time. Changes will be posted on this page with a new
        "Last updated" date.
      </p>
    ),
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

export default function PrivacyPage({ ready }) {
  return (
    <LegalLayout
      ready={ready}
      seoPage="privacy"
      eyebrow="Privacy Policy"
      titleLines={['Your secrets,', <em key="e" className="accent">kept private.</em>]}
      intro={
        'SHH AESTHETICS AND WELLNESS LLC ("Shh Aesthetics," "we," "us," or "our") respects your privacy. This policy explains what information we collect through our website and text messaging program, how we use it, and the choices you have.'
      }
      updated="September 16, 2026"
      sections={SECTIONS}
    />
  );
}
