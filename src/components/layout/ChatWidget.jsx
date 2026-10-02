import { useEffect } from 'react';
import { CONTACT } from '../../constants/content';

const LOADER = 'https://widgets.leadconnectorhq.com/loader.js';
const RESOURCES = 'https://widgets.leadconnectorhq.com/chat-widget/loader.js';

/**
 * GoHighLevel chat bubble. Set CONTACT.chatWidgetId to switch it on.
 * It loads once the page is idle, so it never competes with the first paint.
 */
export default function ChatWidget() {
  useEffect(() => {
    const id = CONTACT.chatWidgetId;
    if (!id || document.querySelector(`script[src="${LOADER}"]`)) return;

    const inject = () => {
      const s = document.createElement('script');
      s.src = LOADER;
      s.async = true;
      s.dataset.resourcesUrl = RESOURCES;
      s.dataset.widgetId = id;
      document.body.appendChild(s);
    };

    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 2000));
    const start = () => idle(inject, { timeout: 4000 });
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  return null;
}
