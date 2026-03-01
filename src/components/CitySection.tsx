import { useEffect, useRef } from 'react';

interface CitySectionProps {
  id: string;
  cityLabel: string;
  cityName: string;
  cityNameItalic: string;
  cityKey: string;
}

const models = [
  { name: 'Mai Linh', age: 22, district: 'Quận 1', price: 16, height: 162, weight: 50, views: 185.4, tags: ['Nhiệt tình', 'Chiều chuộng'], vip: false },
  { name: 'Thùy Tiên', age: 20, district: 'Quận 3', price: 15, height: 165, weight: 52, views: 172.1, tags: ['Tính cảm', 'Lắng nghe'], vip: true },
  { name: 'Hà Mỹ', age: 19, district: 'Quận 10', price: 13.5, height: 160, weight: 48, views: 165.3, tags: ['Hài hước', 'Dễ thương'], vip: false },
  { name: 'Khánh Huyền', age: 23, district: 'Bình Thạnh', price: 13, height: 163, weight: 51, views: 158.9, tags: ['Qua đêm'], vip: false },
  { name: 'Mỹ Linh', age: 21, district: 'Quận 2', price: 11.5, height: 168, weight: 54, views: 149.8, tags: ['Vui vẻ'], vip: true },
  { name: 'Phương Anh', age: 24, district: 'Quận 2', price: 8, height: 155, weight: 46, views: 145.2, tags: ['Chiều chuộng'], vip: false },
  { name: 'Ngọc Hân', age: 20, district: 'Quận 5', price: 12, height: 161, weight: 49, views: 162.5, tags: ['Tính cảm'], vip: false },
  { name: 'Linh Đan', age: 22, district: 'Quận 7', price: 14, height: 167, weight: 53, views: 170.8, tags: ['Nhiệt tình'], vip: true },
  { name: 'Hoa Hương', age: 21, district: 'Quận 1', price: 9.5, height: 159, weight: 47, views: 155.6, tags: ['Dễ thương'], vip: false },
  { name: 'Vy Khanh', age: 23, district: 'Bình Thạnh', price: 11, height: 164, weight: 50, views: 168.3, tags: ['Qua đêm'], vip: false },
  { name: 'Tâm Nhi', age: 20, district: 'Quận 3', price: 10, height: 158, weight: 45, views: 152.1, tags: ['Hài hước'], vip: false },
  { name: 'Diễm My', age: 24, district: 'Quận 10', price: 15.5, height: 166, weight: 52, views: 174.9, tags: ['Lắng nghe', 'Vui vẻ'], vip: true },
];

export default function CitySection({ id, cityLabel, cityName, cityNameItalic, cityKey }: CitySectionProps) {
  const dragStateRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    velocity: 0,
    lastX: 0,
    lastTime: 0,
    animationId: null as number | null,
    hasMoved: false
  });

  useEffect(() => {
    const track = document.getElementById(`track-${cityKey}`);
    if (!track) return;

    track.innerHTML = models.map((model, index) => {
      const rank = index < 3 ? index + 1 : 0;
      const rankClass = rank > 0 ? `rank-${rank}` : '';

      return `
        <div class="model-card">
          <div class="card-img-wrap">
            <div class="card-img-placeholder">${String(index + 1).padStart(2, '0')}</div>
            ${rank > 0 ? `<div class="badge-rank ${rankClass}">${rank}</div>` : ''}
            ${model.vip ? '<div class="badge-vip">VIP</div>' : ''}
            <div class="card-gradient"></div>
          </div>
          <div class="card-info">
            <div class="card-name">${model.name}</div>
            <div class="card-age-area">${model.age} tuổi · ${model.district}</div>
            <div class="card-stats">
              <div class="card-stat-row">
                <span class="cs-label">Giá</span>
                <span class="cs-val gold">${model.price}tr</span>
              </div>
              <div class="card-stat-row">
                <span class="cs-label">Cao / Nặng</span>
                <span class="cs-val">${model.height}cm / ${model.weight}kg</span>
              </div>
              <div class="card-stat-row">
                <span class="cs-label">Lượt xem</span>
                <span class="cs-val gold">${model.views}k</span>
              </div>
            </div>
            <div class="card-tags">
              ${model.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}
            </div>
            <button class="card-btn">Xem chi tiết</button>
          </div>
        </div>
      `;
    }).join('');

    const stopAnimation = () => {
      if (dragStateRef.current.animationId !== null) {
        cancelAnimationFrame(dragStateRef.current.animationId);
        dragStateRef.current.animationId = null;
      }
    };

    const applyMomentum = () => {
      stopAnimation();

      const friction = 0.95;
      let velocity = dragStateRef.current.velocity;

      const animate = () => {
        velocity *= friction;
        track.scrollLeft -= velocity;

        if (Math.abs(velocity) > 0.5) {
          dragStateRef.current.animationId = requestAnimationFrame(animate);
        } else {
          dragStateRef.current.velocity = 0;
        }
      };

      if (Math.abs(velocity) > 0.5) {
        dragStateRef.current.animationId = requestAnimationFrame(animate);
      }
    };

    const getClientX = (e: MouseEvent | TouchEvent) => {
      return 'touches' in e ? e.touches[0].clientX : e.clientX;
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      stopAnimation();
      dragStateRef.current.isDown = true;
      dragStateRef.current.hasMoved = false;
      dragStateRef.current.velocity = 0;

      const clientX = getClientX(e);
      dragStateRef.current.startX = clientX;
      dragStateRef.current.lastX = clientX;
      dragStateRef.current.scrollLeft = track.scrollLeft;
      dragStateRef.current.lastTime = performance.now();

      track.style.cursor = 'grabbing';
      track.style.scrollBehavior = 'auto';
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragStateRef.current.isDown) return;

      const clientX = getClientX(e);
      const now = performance.now();
      const deltaTime = now - dragStateRef.current.lastTime || 1;
      const deltaX = clientX - dragStateRef.current.lastX;

      if (Math.abs(clientX - dragStateRef.current.startX) > 3) {
        dragStateRef.current.hasMoved = true;
        if (e.cancelable) {
          e.preventDefault();
        }
      }

      dragStateRef.current.velocity = deltaX / deltaTime * 16;
      dragStateRef.current.lastX = clientX;
      dragStateRef.current.lastTime = now;

      const walk = dragStateRef.current.startX - clientX;
      track.scrollLeft = dragStateRef.current.scrollLeft + walk;
    };

    const handleEnd = () => {
      if (!dragStateRef.current.isDown) return;

      dragStateRef.current.isDown = false;
      track.style.cursor = 'grab';

      if (dragStateRef.current.hasMoved) {
        const cards = track.querySelectorAll('.model-card');
        cards.forEach((card) => {
          const handleClick = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            card.removeEventListener('click', handleClick, true);
          };
          card.addEventListener('click', handleClick, true);
          setTimeout(() => card.removeEventListener('click', handleClick, true), 300);
        });

        applyMomentum();
      }

      track.style.scrollBehavior = 'smooth';
    };

    track.addEventListener('mousedown', handleStart as EventListener);
    track.addEventListener('touchstart', handleStart as EventListener, { passive: true });

    window.addEventListener('mousemove', handleMove as EventListener);
    window.addEventListener('touchmove', handleMove as EventListener, { passive: false });

    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);

    track.addEventListener('mouseleave', handleEnd);

    track.style.cursor = 'grab';
    track.style.webkitOverflowScrolling = 'touch';

    return () => {
      stopAnimation();
      track.removeEventListener('mousedown', handleStart as EventListener);
      track.removeEventListener('touchstart', handleStart as EventListener);
      window.removeEventListener('mousemove', handleMove as EventListener);
      window.removeEventListener('touchmove', handleMove as EventListener);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
      track.removeEventListener('mouseleave', handleEnd);
    };
  }, [cityKey]);

  const handleSlide = (direction: number) => {
    const track = document.getElementById(`track-${cityKey}`);
    if (!track) return;

    const scrollAmount = 230 * direction;
    track.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="city-section" id={id}>
      <div className="city-header reveal">
        <div className="city-name-wrap">
          <div className="city-label">{cityLabel}</div>
          <h2 className="city-name">
            {cityName} <em>{cityNameItalic}</em>
          </h2>
        </div>
        <div className="city-meta">
          <div className="city-nav-btns">
            <button className="cnav" onClick={() => handleSlide(-1)}>←</button>
            <button className="cnav" onClick={() => handleSlide(1)}>→</button>
          </div>
        </div>
      </div>
      <div className="carousel-outer">
        <div className="carousel-track" id={`track-${cityKey}`}>
        </div>
      </div>
    </section>
  );
}
