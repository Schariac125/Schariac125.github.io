(async () => {
  // 建议：把你自己部署的 API 放在第一个（最稳定）
  const API_BASES = [
    'https://netease-cloud-music-api.vercel.app',
  ];

  const PLACEHOLDER =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
  <rect width="100%" height="100%" fill="#f3f4f6"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        fill="#9ca3af" font-size="28" font-family="system-ui, -apple-system, Segoe UI, Roboto">
    Loading…
  </text>
</svg>`);

  async function fetchSongDetail(id) {
    let lastErr;
    for (const base of API_BASES) {
      try {
        const url = `${base}/song/detail?ids=${encodeURIComponent(id)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        const song = json?.songs?.[0];
        if (!song) throw new Error('No song in response');
        return song;
      } catch (e) {
        lastErr = e;
      }
    }
    throw lastErr || new Error('All API_BASES failed');
  }

  const cards = document.querySelectorAll('.js-ncm');
  if (!cards.length) return;

  await Promise.allSettled(
    Array.from(cards).map(async (card) => {
      const id = card.dataset.ncmId;
      const presetTitle = card.dataset.ncmTitle || '';
      const presetArtist = card.dataset.ncmArtist || '';

      const titleEl = card.querySelector('.music-title');
      const artistEl = card.querySelector('.music-artist');
      const imgEl = card.querySelector('.music-cover');

      if (imgEl && (!imgEl.src || imgEl.src.startsWith('http'))) {
        imgEl.src = PLACEHOLDER;
      }

      try {
        const song = await fetchSongDetail(id);

        const title = presetTitle || song.name || '';
        const artist =
          presetArtist ||
          (song.ar || song.artists || []).map((a) => a.name).filter(Boolean).join(' / ');
        const cover = song.al?.picUrl || song.album?.picUrl || '';

        if (title && titleEl && !titleEl.textContent.trim()) titleEl.textContent = title;
        if (artist && artistEl && !artistEl.textContent.trim()) artistEl.textContent = artist;
        if (cover && imgEl) imgEl.src = cover;
      } catch (e) {
        // 失败就保持占位图 + 你手填的歌名/歌手（如果有）
        if (presetTitle && titleEl && !titleEl.textContent.trim()) titleEl.textContent = presetTitle;
        if (presetArtist && artistEl && !artistEl.textContent.trim()) artistEl.textContent = presetArtist;
      }
    })
  );
})();
