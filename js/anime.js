(async () => {
  const API = 'https://api.bgm.tv/v0';

  // 从 infobox 里尽量捞“制作/动画制作/制作公司”
  function pickStudioFromInfobox(infobox) {
    if (!Array.isArray(infobox)) return '';
    const keys = ['动画制作', '制作', '制作公司', '动画制作会社', '製作', '制作协力', '制作協力'];
    for (const k of keys) {
      const hit = infobox.find(x => (x?.key || x?.k) === k);
      const v = hit?.value ?? hit?.v;
      if (!v) continue;
      if (typeof v === 'string') return v;
      if (Array.isArray(v)) {
        // 可能是 [{v:"xxx"}, ...] 或 ["xxx", ...]
        const s = v.map(it => (typeof it === 'string' ? it : it?.v || it?.value || '')).filter(Boolean).join(' / ');
        if (s) return s;
      }
    }
    return '';
  }

  async function getJson(url) {
    const res = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  }

  const cards = Array.from(document.querySelectorAll('.js-ani'));
  if (!cards.length) return;

  // 并发 3 个，避免打太快
  const CONCURRENCY = 3;
  let idx = 0;

  async function worker() {
    while (idx < cards.length) {
      const card = cards[idx++];
      const id = Number(card.dataset.aniId);
      if (!Number.isFinite(id)) continue;

      const presetTitle = card.dataset.aniTitle || '';
      const presetStudio = card.dataset.aniStudio || '';

      const titleEl = card.querySelector('.anime-title');
      const studioEl = card.querySelector('.anime-studio');
      const imgEl = card.querySelector('.anime-cover');

      // 封面：直接用 image endpoint（302 到图片链接；无图给默认图）
      // 注意：这是 <img>，不吃 CORS
      if (imgEl) imgEl.src = `${API}/subjects/${id}/image?type=large`;

      try {
        const subject = await getJson(`${API}/subjects/${id}`);

        // 标题：优先中文名 name_cn，再退回 name（Bangumi 条目常见字段）:contentReference[oaicite:2]{index=2}
        const title = presetTitle || subject?.name_cn || subject?.name || '';
        if (title && titleEl && !titleEl.textContent.trim()) titleEl.textContent = title;

        // 制作公司：先 infobox 里找；没有的话再试 /persons（有些条目这里会给“动画制作”等关系）
        let studio = presetStudio || pickStudioFromInfobox(subject?.infobox);

        if (!studio) {
          try {
            const persons = await getJson(`${API}/subjects/${id}/persons`);
            if (Array.isArray(persons)) {
              const hit = persons.find(p => String(p?.relation || '').includes('动画制作') || String(p?.relation || '').includes('制作'));
              studio = hit?.name || hit?.person?.name || hit?.person?.name_cn || '';
            }
          } catch (e) {}
        }

        if (studio && studioEl && !studioEl.textContent.trim()) studioEl.textContent = studio;
      } catch (e) {
        // 有的条目网页有，但 API 可能 404/未收录，遇到这种就手填 title/studio 就行 :contentReference[oaicite:3]{index=3}
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
})();