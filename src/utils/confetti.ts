import gsap from 'gsap';

const COLORS = ['#FF2D78', '#BF5FFF', '#FFD93D', '#00D4FF', '#FF6B35', '#FF0099', '#FFF176'];
const SHAPES = ['♥', '★', '✦', '✿', '•'];

export function createConfettiBurst(
  x: number,
  y: number,
  count: number = 30,
  container?: HTMLElement
) {
  const parent = container || document.body;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.textContent = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    el.style.position = 'fixed';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = `${8 + Math.random() * 14}px`;
    el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    el.style.userSelect = 'none';
    el.style.willChange = 'transform, opacity';
    el.style.filter = `drop-shadow(0 0 4px ${el.style.color})`;
    parent.appendChild(el);

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const distance = 80 + Math.random() * 160;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - Math.random() * 100;

    gsap.fromTo(
      el,
      { scale: 0, opacity: 1, x: 0, y: 0, rotation: 0 },
      {
        x: dx,
        y: dy,
        scale: 0.6 + Math.random() * 0.8,
        opacity: 0,
        rotation: Math.random() * 720 - 360,
        duration: 1 + Math.random() * 1.5,
        ease: 'power2.out',
        onComplete: () => {
          el.remove();
        },
      }
    );
  }
}

export function createSparkleBurst(
  x: number,
  y: number,
  count: number = 6,
  container?: HTMLElement
) {
  const parent = container || document.body;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.textContent = '✦';
    el.style.position = 'fixed';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.fontSize = `${10 + Math.random() * 8}px`;
    el.style.color = ['#FFD93D', '#FFF176', '#00D4FF'][i % 3];
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    el.style.userSelect = 'none';
    el.style.willChange = 'transform, opacity';
    parent.appendChild(el);

    const angle = (Math.PI * 2 * i) / count;
    const distance = 30 + Math.random() * 40;

    gsap.fromTo(
      el,
      { scale: 0, opacity: 1, x: 0, y: 0 },
      {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 1.2,
        opacity: 0,
        duration: 0.5 + Math.random() * 0.3,
        ease: 'power2.out',
        onComplete: () => el.remove(),
      }
    );
  }
}

export function createConfettiRain(container: HTMLElement, count: number = 60) {
  const tweens: gsap.core.Tween[] = [];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.textContent = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    el.style.position = 'absolute';
    el.style.left = `${Math.random() * 100}%`;
    el.style.top = `-20px`;
    el.style.fontSize = `${6 + Math.random() * 10}px`;
    el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    el.style.pointerEvents = 'none';
    el.style.zIndex = '5';
    el.style.userSelect = 'none';
    el.style.opacity = '0.8';
    el.style.willChange = 'transform';
    container.appendChild(el);

    const tween = gsap.to(el, {
      y: window.innerHeight + 50,
      x: `+=${Math.random() * 80 - 40}`,
      rotation: Math.random() * 360,
      duration: 2.5 + Math.random() * 3,
      repeat: -1,
      delay: Math.random() * 4,
      ease: 'none',
    });
    tweens.push(tween);
  }

  return () => {
    tweens.forEach((t) => t.kill());
    const children = container.querySelectorAll('span');
    children.forEach((c) => c.remove());
  };
}
