(() => {
  // 用 class 控制动画状态
  const onSend = () => {
    document.documentElement.classList.add('pjax-is-changing', 'pjax-leave');
  };

  const onComplete = () => {
    document.documentElement.classList.remove('pjax-leave');
    // 让进入动画生效
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('pjax-is-changing');
    });
  };

  // 兼容：Butterfly 自带 PJAX / 或你自己引入的 Pjax
  document.addEventListener('pjax:send', onSend);
  document.addEventListener('pjax:complete', onComplete);

  // 首次加载保证是“正常态”
  window.addEventListener('load', () => {
    document.documentElement.classList.remove('pjax-is-changing', 'pjax-leave');
  });
})();
