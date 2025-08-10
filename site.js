// 自适应同源 iframe 高度，避免内滚动条与跳转空白感
(function () {
  const iframes = Array.from(document.querySelectorAll('iframe[data-autoresize]'));
  const header = document.querySelector('.site-header');

  function postSizeRequest(frame) {
    try {
      if (!frame.contentWindow) return;
      // 在子页加载完成后，尝试读取 scrollHeight
      const doc = frame.contentDocument || frame.contentWindow.document;
      if (!doc) return;
      const body = doc.body;
      const html = doc.documentElement;
      // 取最大高度作为内容高度
      const h = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      // 添加安全最小高度
      const min = Math.max(480, h);
      frame.style.height = min + 'px';
    } catch (e) {
      // 跨域或尚未可访问时静默失败，等待 onload 重试
    }
  }

  // 初次加载与 onload 回调
  iframes.forEach((f) => {
    // 防止 FOUC
    f.style.visibility = 'hidden';
    f.addEventListener('load', () => {
      postSizeRequest(f);
      // 显示已渲染内容
      f.style.visibility = 'visible';
    });
  });

  // 进入视口时再次尝试更新高度（应对延后渲染）
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        postSizeRequest(entry.target);
      }
    });
  }, { rootMargin: '200px' });

  iframes.forEach((f) => io.observe(f));

  // 锚点跳转时考虑顶部固定头部的遮挡
  function scrollToHash(hash) {
    const el = hash ? document.querySelector(hash) : null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const y = window.scrollY + rect.top - (header?.offsetHeight || 0) - 8;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  if (location.hash) {
    // 首次载入带 hash
    setTimeout(() => scrollToHash(location.hash), 0);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.length < 2) return;
    e.preventDefault();
    history.pushState(null, '', href);
    scrollToHash(href);
  });
})();