(() => {
  const KEY = "bgm_open";
  const btn = document.getElementById("bgm-toggle");
  if (!btn) return;

  function setOpen(open) {
    document.documentElement.classList.toggle("bgm-open", open);
    localStorage.setItem(KEY, open ? "1" : "0");
  }

  // 找到 APlayer DOM（Meting 会动态插入）
  function getPlayerEl() {
    return document.querySelector(".aplayer.aplayer-fixed");
  }

  function clickPlay() {
    const playBtn =
      document.querySelector(".aplayer.aplayer-fixed .aplayer-icon-play") ||
      document.querySelector(".aplayer.aplayer-fixed .aplayer-icon-pause");
    // 如果是暂停按钮说明已经在播；如果是播放按钮点一下开播
    if (playBtn && playBtn.classList.contains("aplayer-icon-play")) {
      playBtn.click();
    }
  }

  function clickPause() {
    const pauseBtn = document.querySelector(".aplayer.aplayer-fixed .aplayer-icon-pause");
    if (pauseBtn) pauseBtn.click();
  }

  // 初始化：默认关闭（如果你想记住上次状态就用 localStorage）
  const saved = localStorage.getItem(KEY) === "1";
  setOpen(saved);

  // 如果记住的是开启，则尝试播放（仍可能被浏览器策略拦截，但用户之后点按钮就行）
  if (saved) {
    // 等 meting 初始化
    waitForPlayer(() => clickPlay());
  }

  btn.addEventListener("click", () => {
    const open = document.documentElement.classList.contains("bgm-open");
    if (open) {
      clickPause();
      setOpen(false);
    } else {
      setOpen(true);
      // 用户点按钮属于“交互”，此时播放一般不会被拦截
      waitForPlayer(() => clickPlay());
    }
  });

  function waitForPlayer(cb) {
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      const el = getPlayerEl();
      if (el) {
        clearInterval(timer);
        cb();
      } else if (tries > 60) {
        // 约 6 秒还没出现就放弃
        clearInterval(timer);
      }
    }, 100);
  }
})();