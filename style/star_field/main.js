document.addEventListener('DOMContentLoaded', function () {
  const starField = document.getElementById('star_field');
  const footer = document.querySelector('footer');
  let resizeTimer = null;

  function buildStarField() {
    // 清除舊的星星
    starField.innerHTML = '';

    // 暫時取消 starField 對高度的影響
    const prevHeight = starField.style.height;
    starField.style.height = '0px';

    // 正確取得整個頁面高度（不被 starField 自己影響）
    const pageHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );

    // 把容器高度設為 pageHeight
    const totalDiamonds = pageHeight * 0.1;
    starField.style.height = pageHeight + 'px';

    // 再產生星星（計算 Y 時以 footerTop 為上限）
    const footerTop = footer.getBoundingClientRect().top + window.scrollY;
    const maxY = Math.max(0, footerTop);

    for (let i = 0; i < totalDiamonds; i++) {
      const diamond = document.createElement('div');
      diamond.className = 'diamond';

      const sizePx = 2 + Math.random() * 10;
      const leftPercent = Math.random() * 100;
      const topPx = Math.random() * Math.max(0, maxY - sizePx);

      diamond.style.width = `${sizePx}px`;
      diamond.style.height = `${sizePx}px`;
      diamond.style.left = `${leftPercent}%`;
      diamond.style.top = `${topPx}px`;

      const randomDelay = Math.random() * 2;
      diamond.style.animationDelay = randomDelay + 's';
      // 或完整 shorthand（若需要改其他屬性）：
      diamond.style.animation = `flicker 4s linear ${randomDelay}s infinite alternate`;

      starField.appendChild(diamond);
    }
  }

  // 初次建立（等待下一個 frame 以確保完整排版）
  requestAnimationFrame(buildStarField);

  // resize 時用 debounce，並在下一個 frame 執行建構，避免中間排版尚未完成造成錯誤
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // 等一個 frame 再重建，確保 CSS 與 DOM 都已穩定
      requestAnimationFrame(buildStarField);
    }, 120);
  });

  // 如果頁面內容會動態變化（例如 footer 高度改變），在必要時呼叫 buildStarField() 手動更新
});