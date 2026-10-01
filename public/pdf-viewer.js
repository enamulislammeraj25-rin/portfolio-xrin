(() => {
  const PDF_NAME_PATTERN = /\.pdf$/i;
  const VIEWER_ID = 'project-pdf-viewer-overlay';
  const ENHANCED_ATTR = 'data-pdf-viewer-enhanced';

  const buttonStyle = [
    'margin-top:4px',
    'padding:7px 12px',
    'border-radius:8px',
    'border:1px solid rgba(20,184,166,.45)',
    'background:rgba(20,184,166,.10)',
    'color:inherit',
    'font-size:12px',
    'font-weight:700',
    'cursor:pointer',
    'transition:all .2s ease'
  ].join(';');

  const getCandidateUrls = (fileName) => {
    const encoded = fileName.split('/').map(encodeURIComponent).join('/');
    return [
      `/projects/plaxis3d/${encoded}`,
      `/projects/${encoded}`,
      `/${encoded}`
    ];
  };

  const findAvailablePdf = async (fileName) => {
    for (const url of getCandidateUrls(fileName)) {
      try {
        const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        const contentType = response.headers.get('content-type') || '';
        if (response.ok && (contentType.includes('pdf') || PDF_NAME_PATTERN.test(url))) {
          return url;
        }
      } catch (_) {
        // Try the next same-origin candidate.
      }
    }
    return null;
  };

  const closeViewer = () => {
    document.getElementById(VIEWER_ID)?.remove();
  };

  const createViewer = (fileName) => {
    closeViewer();

    const overlay = document.createElement('div');
    overlay.id = VIEWER_ID;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', `PDF viewer: ${fileName}`);
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:10000',
      'display:flex', 'align-items:center', 'justify-content:center',
      'padding:16px', 'background:rgba(0,0,0,.78)',
      'backdrop-filter:blur(6px)'
    ].join(';');

    const panel = document.createElement('div');
    panel.style.cssText = [
      'width:min(1180px,96vw)', 'height:min(900px,92vh)',
      'display:flex', 'flex-direction:column', 'overflow:hidden',
      'border-radius:14px', 'background:#111827', 'color:#fff',
      'border:1px solid rgba(255,255,255,.15)',
      'box-shadow:0 24px 80px rgba(0,0,0,.45)'
    ].join(';');

    const header = document.createElement('div');
    header.style.cssText = [
      'display:flex', 'align-items:center', 'justify-content:space-between',
      'gap:16px', 'padding:14px 16px',
      'border-bottom:1px solid rgba(255,255,255,.12)'
    ].join(';');

    const title = document.createElement('div');
    title.textContent = fileName;
    title.style.cssText = 'font-size:14px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap';

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;align-items:center;gap:8px;flex-shrink:0';

    const openTab = document.createElement('a');
    openTab.textContent = 'Open in new tab';
    openTab.target = '_blank';
    openTab.rel = 'noreferrer';
    openTab.style.cssText = 'display:none;padding:7px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.2);font-size:12px;color:#fff;text-decoration:none';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.textContent = 'Close';
    closeButton.style.cssText = 'padding:7px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:transparent;color:#fff;font-size:12px;cursor:pointer';
    closeButton.addEventListener('click', closeViewer);

    actions.append(openTab, closeButton);
    header.append(title, actions);

    const body = document.createElement('div');
    body.style.cssText = 'position:relative;flex:1;min-height:0;background:#e5e7eb';

    const status = document.createElement('div');
    status.textContent = 'Loading PDF…';
    status.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;color:#374151;font:600 14px/1.5 system-ui,sans-serif';
    body.appendChild(status);

    panel.append(header, body);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeViewer();
    });

    findAvailablePdf(fileName).then((url) => {
      if (!document.body.contains(overlay)) return;

      if (!url) {
        status.innerHTML = `PDF viewer is ready, but <strong>${fileName}</strong> is not in the deployed public assets yet.<br><br>Place it in <code>/public/projects/plaxis3d/</code> and this button will open it automatically.`;
        return;
      }

      openTab.href = url;
      openTab.style.display = 'inline-block';

      const iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.title = fileName;
      iframe.style.cssText = 'width:100%;height:100%;border:0;background:#fff';
      iframe.addEventListener('load', () => status.remove(), { once: true });
      body.appendChild(iframe);
    });
  };

  const enhancePdfCards = () => {
    document.querySelectorAll('span').forEach((nameEl) => {
      const fileName = (nameEl.textContent || '').trim();
      if (!PDF_NAME_PATTERN.test(fileName)) return;

      const card = nameEl.parentElement;
      if (!card || card.getAttribute(ENHANCED_ATTR) === 'true') return;

      card.setAttribute(ENHANCED_ATTR, 'true');

      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'View PDF';
      button.setAttribute('aria-label', `View ${fileName}`);
      button.style.cssText = buttonStyle;
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        createViewer(fileName);
      });
      button.addEventListener('mouseenter', () => {
        button.style.background = 'rgba(20,184,166,.20)';
        button.style.transform = 'translateY(-1px)';
      });
      button.addEventListener('mouseleave', () => {
        button.style.background = 'rgba(20,184,166,.10)';
        button.style.transform = 'translateY(0)';
      });

      card.appendChild(button);
    });
  };

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.getElementById(VIEWER_ID)) closeViewer();
  });

  const observer = new MutationObserver(enhancePdfCards);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhancePdfCards, { once: true });
  } else {
    enhancePdfCards();
  }
})();
