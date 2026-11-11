import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Visible diagnostics: never fail silently on the customer's machine.
function showCrashBanner(msg: string) {
  if (document.getElementById('fb-crash-banner')) return;
  const el = document.createElement('div');
  el.id = 'fb-crash-banner';
  el.style.cssText =
    'position:fixed;bottom:12px;left:12px;right:12px;z-index:99999;background:#7a1f1f;color:#fff;' +
    'padding:10px 14px;border-radius:12px;font:13px/1.4 system-ui;box-shadow:0 8px 24px rgba(0,0,0,.35)';
  el.textContent = 'Fresh Batch hit an error: ' + msg.slice(0, 200);
  document.body.appendChild(el);
}
window.addEventListener('error', (e) => showCrashBanner(e.message));
window.addEventListener('unhandledrejection', (e) => showCrashBanner(String(e.reason)));
