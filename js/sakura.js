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
    const repelRadius = 185;
    const repelStrength = 1.05;
    const repelActiveDuration = 220;
    const mouse = {
        x: -9999,
        y: -9999,
        vx: 0,
        vy: 0,
        lastX: 0,
        lastY: 0,
        lastTime: 0,
        lastMove: 0
    };

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
        const x = Math.random() * window.innerWidth;
        const y = -20;
        flake.style.width = size + 'px';
        flake.style.height = size + 'px';
        flake.style.position = 'fixed';
        flake.style.top = y + 'px';
        flake.style.left = x + 'px';
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
        flakes.push({
            el: flake,
            x,
            y,
            vx: 0,
            vy: 0,
            speed: Math.random() * 1.5 + 0.8,
            drift: Math.random() * 1.5 + 0.5,
            angle: Math.random() * 360
        });
    }

    function updateMouseState(event) {
        const now = performance.now();
        if (mouse.lastTime) {
            const dt = Math.max(now - mouse.lastTime, 16);
            mouse.vx = (event.clientX - mouse.lastX) / dt;
            mouse.vy = (event.clientY - mouse.lastY) / dt;
        }

        mouse.x = event.clientX;
        mouse.y = event.clientY;
        mouse.lastX = event.clientX;
        mouse.lastY = event.clientY;
        mouse.lastTime = now;
        mouse.lastMove = now;
    }

    // 更新雪花位置
    function animateFlakes() {
        const now = performance.now();
        const isMouseActive = now - mouse.lastMove < repelActiveDuration;

        for (let i = flakes.length - 1; i >= 0; i--) {
            const f = flakes[i];
            const el = f.el;
            f.vx *= 0.92;
            f.vy *= 0.9;
            f.y += f.speed;
            f.x += Math.sin(f.angle * Math.PI / 180) * f.drift;

            if (isMouseActive) {
                const dx = f.x - mouse.x;
                const dy = f.y - mouse.y;
                const distance = Math.hypot(dx, dy);

                if (distance < repelRadius) {
                    const ratio = 1 - distance / repelRadius;
                    const influence = ratio * ratio;
                    const safeDistance = distance || 1;
                    const nx = dx / safeDistance;
                    const ny = dy / safeDistance;
                    const directionalBoost = (mouse.vx * nx + mouse.vy * ny) * 8.5;
                    const push = Math.max(0.22, repelStrength + directionalBoost) * influence;

                    // 鼠标划过时，花瓣会被轻轻荡开
                    f.vx += nx * push;
                    f.vy += ny * push * 0.58;
                    f.angle += influence * 0.95;
                }
            }

            f.angle += 0.4;
            f.x += f.vx;
            f.y += f.vy;
            el.style.top = f.y + 'px';
            el.style.left = f.x + 'px';

            // 超出屏幕移除
            if (f.y > window.innerHeight + 30 || f.x < -40 || f.x > window.innerWidth + 40) {
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

    window.addEventListener('pointermove', updateMouseState, { passive: true });
    window.addEventListener('pointerleave', function() {
        mouse.x = -9999;
        mouse.y = -9999;
        mouse.vx = 0;
        mouse.vy = 0;
        mouse.lastMove = 0;
    }, { passive: true });

    // 启动动画
    animateFlakes();
});