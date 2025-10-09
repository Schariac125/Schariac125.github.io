// sakura.js - Hexo 适用版
document.addEventListener('DOMContentLoaded', function() {
    const petals = [];
    const petalCount = 30; // 花瓣数量
    const body = document.body;

    // 创建一个花瓣元素
    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'sakura';
        const size = Math.random() * 10 + 10; // 花瓣大小 10-20px
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.position = 'fixed';
        petal.style.top = '-20px';
        petal.style.left = Math.random() * window.innerWidth + 'px';
        petal.style.background = 'pink';
        petal.style.borderRadius = '50%';
        petal.style.opacity = Math.random();
        petal.style.pointerEvents = 'none';
        petal.style.zIndex = 9999;

        body.appendChild(petal);
        petals.push({el: petal, speed: Math.random() * 2 + 1, angle: Math.random() * 360});
    }

    // 更新花瓣位置
    function animatePetals() {
        for (let i = petals.length - 1; i >= 0; i--) {
            const p = petals[i];
            const el = p.el;
            let top = parseFloat(el.style.top);
            top += p.speed;
            el.style.top = top + 'px';
            el.style.left = parseFloat(el.style.left) + Math.sin(p.angle * Math.PI / 180) * 1 + 'px';
            p.angle += 0.5;

            // 超出屏幕移除
            if (top > window.innerHeight) {
                body.removeChild(el);
                petals.splice(i, 1);
            }
        }
        requestAnimationFrame(animatePetals);
    }

    // 初始化花瓣
    for (let i = 0; i < petalCount; i++) {
        createPetal();
    }

    // 持续生成新的花瓣
    setInterval(createPetal, 500);

    // 启动动画
    animatePetals();
});