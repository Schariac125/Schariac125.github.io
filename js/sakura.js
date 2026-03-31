// sakura.js - Hexo 适用版
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)
        || window.matchMedia('(max-width: 768px)').matches
        || window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    const flakes = [];
    const flakeCount = 40; // 樱花数量
    const body = document.body;
    const twinkleStyleId = 'snowflake-twinkle-style';

    function ensureTwinkleStyle() {
        if (document.getElementById(twinkleStyleId)) return;
        const style = document.createElement('style');
        style.id = twinkleStyleId;
        style.textContent = `@keyframes snowTwinkle {0%, 100% {opacity: var(--twinkle-min, 0.35);} 50% {opacity: var(--twinkle-max, 1);}}`;
        document.head.appendChild(style);
    }
    
    // 创建一个雪花元素
    function createFlake() {
        ensureTwinkleStyle();
        const flake = document.createElement('div');
        flake.className = 'snowflake';
        const size = Math.random() * 6 + 6; // 花瓣大小 6-12px
        flake.style.width = size + 'px';
        flake.style.height = size + 'px';
        flake.style.position = 'fixed';
        flake.style.top = '-20px';
        flake.style.left = Math.random() * window.innerWidth + 'px';
        flake.style.background = 'radial-gradient(circle at 30% 30%, #ffe9f3 0%, #ffb7d5 55%, #ff8fbe 100%)';
        flake.style.borderRadius = '70% 45% 70% 45%';
        flake.style.opacity = Math.random() * 0.6 + 0.4;
        flake.style.filter = 'blur(0.3px)';
        flake.style.pointerEvents = 'none';
        flake.style.zIndex = 9999;
        flake.style.transform = `rotate(${(Math.random() * 360).toFixed(0)}deg)`;
        const twinkleMin = (Math.random() * 0.2 + 0.2).toFixed(2);
        const twinkleMax = (Math.random() * 0.3 + 0.7).toFixed(2);
        flake.style.setProperty('--twinkle-min', twinkleMin);
        flake.style.setProperty('--twinkle-max', twinkleMax);
        const duration = (Math.random() * 1.5 + 1.2).toFixed(2);
        const delay = (Math.random() * 1.5).toFixed(2);
        flake.style.animation = `snowTwinkle ${duration}s ease-in-out ${delay}s infinite alternate`;

        body.appendChild(flake);
        flakes.push({el: flake, speed: Math.random() * 1.5 + 0.8, drift: Math.random() * 1.5 + 0.5, angle: Math.random() * 360});
    }

    // 更新雪花位置
    function animateFlakes() {
        for (let i = flakes.length - 1; i >= 0; i--) {
            const f = flakes[i];
            const el = f.el;
            let top = parseFloat(el.style.top);
            top += f.speed;
            el.style.top = top + 'px';
            el.style.left = parseFloat(el.style.left) + Math.sin(f.angle * Math.PI / 180) * f.drift + 'px';
            f.angle += 0.4;

            // 超出屏幕移除
            if (top > window.innerHeight) {
                body.removeChild(el);
                flakes.splice(i, 1);
            }
        }
        requestAnimationFrame(animateFlakes);
    }

    // 初始化雪花
    for (let i = 0; i < flakeCount; i++) {
        createFlake();
    }

    // 持续生成新的雪花
    setInterval(createFlake, 400);

    // 启动动画
    animateFlakes();
});