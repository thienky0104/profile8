import { useEffect, useRef } from 'react';

interface CitySectionProps {
  id: string;
  cityLabel: string;
  cityName: string;
  cityNameItalic: string;
  cityKey: string;
}

interface Model {
  name: string;
  age: number;
  district: string;
  price: number;
  height: number;
  weight: number;
  views: number;
  tags: string[];
  vip: boolean;
  image?: string;
}

const cityModels: Record<string, Model[]> = {
  sg: [
    { name: 'Mai Linh', age: 22, district: 'Quận 1', price: 16, height: 162, weight: 50, views: 185.4, tags: ['Nhiệt tình', 'Chiều chuộng'], vip: true, image: 'https://pbs.twimg.com/media/HCK99-YaoAAn-jQ?format=jpg&name=large' },
    { name: 'Thùy Tiên', age: 20, district: 'Quận 3', price: 15, height: 165, weight: 52, views: 172.1, tags: ['Tính cảm', 'Lắng nghe'], vip: true, image: 'https://pbs.twimg.com/media/HCK-MlwaYAAi1lD?format=jpg&name=large' },
    { name: 'Hà Mỹ', age: 19, district: 'Quận 10', price: 13.5, height: 160, weight: 48, views: 165.3, tags: ['Hài hước', 'Dễ thương'], vip: true, image: 'https://pbs.twimg.com/media/HCK-V3VakAA1w36?format=jpg&name=medium' },
    { name: 'Khánh Huyền', age: 23, district: 'Bình Thạnh', price: 13, height: 163, weight: 51, views: 158.9, tags: ['Qua đêm'], vip: false, image: 'https://pbs.twimg.com/media/HCK-cgjacAAaftq?format=jpg&name=large' },
    { name: 'Mỹ Linh', age: 21, district: 'Quận 7', price: 11.5, height: 168, weight: 54, views: 149.8, tags: ['Vui vẻ'], vip: true, image: 'https://pbs.twimg.com/media/HCK-kxHbAAEsvWD?format=jpg&name=medium' },
    { name: 'Phương Anh', age: 24, district: 'Quận 2', price: 8, height: 155, weight: 46, views: 145.2, tags: ['Chiều chuộng'], vip: false, image: 'https://pbs.twimg.com/media/HCK-u7QaAAAnu2v?format=jpg&name=medium' },
    { name: 'Ngọc Trinh', age: 22, district: 'Phú Nhuận', price: 12, height: 164, weight: 50, views: 141.1, tags: ['Nhiệt tình'], vip: true, image: 'https://pbs.twimg.com/media/HCK_Ac_boAAcWPI?format=jpg&name=medium' },
    { name: 'Bảo Châu', age: 21, district: 'Quận 5', price: 14, height: 166, weight: 53, views: 138, tags: ['Sang trọng', 'Lịch sự'], vip: false, image: 'https://pbs.twimg.com/media/HCK_oIuagAE2wi6?format=jpg&name=large' },
    { name: 'Lan Anh', age: 23, district: 'Gò Vấp', price: 10, height: 158, weight: 47, views: 132, tags: ['Thân thiện'], vip: false, image: 'https://pbs.twimg.com/media/HCK_4jkbQAA_EI8?format=jpg&name=large' },
    { name: 'Thu Hà', age: 20, district: 'Tân Bình', price: 9, height: 162, weight: 49, views: 128, tags: ['Nhẹ nhàng', 'Dịu dàng'], vip: false, image: 'https://pbs.twimg.com/media/HCLANcNaAAEeOkJ?format=jpg&name=large' },
    { name: 'Minh Thư', age: 25, district: 'Quận 12', price: 11, height: 167, weight: 52, views: 124, tags: ['Năng động'], vip: true, image: 'https://pbs.twimg.com/media/HCLCyN8akAAJxD2?format=jpg&name=large' },
    { name: 'Hồng Ngọc', age: 24, district: 'Quận 9', price: 13, height: 160, weight: 48, views: 119, tags: ['Bí ẩn', 'Tinh tế'], vip: false, image: 'https://pbs.twimg.com/media/HCK_NmSbIAAFXoE?format=jpg&name=large' },
  ],
  hn: [
    { name: 'Hồng Thắm', age: 21, district: 'Hoàn Kiếm', price: 15, height: 163, weight: 49, views: 178.2, tags: ['Dịu dàng', 'Lắng nghe'], vip: true, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Diệu Nhi', age: 23, district: 'Ba Đình', price: 14, height: 160, weight: 51, views: 164.5, tags: ['Nhiệt tình', 'Vui vẻ'], vip: true, image: 'https://pbs.twimg.com/media/HCYKfzqawAEXa3Z?format=jpg&name=4096x4096' },
    { name: 'Ngọc Thảo', age: 19, district: 'Cầu Giấy', price: 12, height: 165, weight: 47, views: 158.1, tags: ['Chiều chuộng'], vip: true, image: 'https://pbs.twimg.com/media/HCXQ8pKb0AAjRnD?format=jpg&name=large' },
    { name: 'Thanh Hà', age: 25, district: 'Đống Đa', price: 16, height: 158, weight: 52, views: 143.7, tags: ['Sang trọng', 'Tinh tế'], vip: false, image: 'https://pbs.twimg.com/media/HCXREcLaoAAbuxn?format=jpg&name=large' },
    { name: 'Bích Phương', age: 22, district: 'Hai Bà Trưng', price: 10, height: 166, weight: 53, views: 136.9, tags: ['Thân thiện', 'Hài hước'], vip: false, image: 'https://pbs.twimg.com/media/HCXd4N9bIAAvMuP?format=jpg&name=4096x4096' },
    { name: 'Quỳnh Anh', age: 20, district: 'Tây Hồ', price: 9, height: 162, weight: 48, views: 129.4, tags: ['Qua đêm'], vip: true, image: 'https://pbs.twimg.com/media/HCXeJMpa4AA5h_1?format=jpg&name=4096x4096' },
    { name: 'Trà My', age: 24, district: 'Thanh Xuân', price: 13, height: 159, weight: 50, views: 122.8, tags: ['Nhẹ nhàng'], vip: false, image: 'https://pbs.twimg.com/media/HCXeRBXbMAEH_nT?format=jpg&name=4096x4096' },
    { name: 'Hải Yến', age: 27, district: 'Hà Đông', price: 11, height: 167, weight: 54, views: 118.3, tags: ['Tình cảm', 'Lãng mạn'], vip: false, image: 'https://pbs.twimg.com/media/HCXeaKkbYAArNz6?format=jpg&name=4096x4096' },
    { name: 'Vân Anh', age: 21, district: 'Long Biên', price: 8, height: 161, weight: 46, views: 112.6, tags: ['Năng động'], vip: false, image: 'https://pbs.twimg.com/media/HCXeiHWagAAUQXJ?format=jpg&name=4096x4096' },
    { name: 'Phương Linh', age: 23, district: 'Nam Từ Liêm', price: 12, height: 164, weight: 51, views: 108.9, tags: ['Bí ẩn'], vip: false, image: 'https://pbs.twimg.com/media/HCXeuk7awAAGFtJ?format=jpg&name=4096x4096' },
    { name: 'Thúy Nga', age: 19, district: 'Hoàng Mai', price: 14, height: 156, weight: 47, views: 104.2, tags: ['Chiều chuộng', 'Dễ thương'], vip: false, image: 'https://pbs.twimg.com/media/HCXe1IpacAAex_N?format=jpg&name=4096x4096' },
    { name: 'Mỹ Duyên', age: 26, district: 'Bắc Từ Liêm', price: 10, height: 168, weight: 55, views: 98.7, tags: ['Vui vẻ', 'Nhiệt tình'], vip: false, image: 'https://pbs.twimg.com/media/HCXfA2PakAAv1Sk?format=jpg&name=4096x4096' },
  ],
  dn: [
    { name: 'Hoài Thương', age: 20, district: 'Hải Châu', price: 13, height: 161, weight: 48, views: 162.3, tags: ['Vui vẻ', 'Năng động'], vip: true, image: 'https://pbs.twimg.com/media/HCYLoKGaUAAT6A7?format=jpg&name=large' },
    { name: 'Cẩm Ly', age: 22, district: 'Thanh Khê', price: 11, height: 164, weight: 52, views: 151.8, tags: ['Chiều chuộng'], vip: true, image: 'https://pbs.twimg.com/media/HCYL8goakAEdzSB?format=jpg&name=4096x4096' },
    { name: 'Thiên Kim', age: 25, district: 'Sơn Trà', price: 15, height: 158, weight: 50, views: 144.2, tags: ['Lãng mạn', 'Tinh tế'], vip: true, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Bảo Ngọc', age: 19, district: 'Ngũ Hành Sơn', price: 9, height: 166, weight: 46, views: 138.6, tags: ['Nhiệt tình'], vip: false, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Yến Nhi', age: 23, district: 'Liên Chiểu', price: 12, height: 160, weight: 51, views: 131.4, tags: ['Thân thiện', 'Dễ thương'], vip: true, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Khánh Phương', age: 21, district: 'Cẩm Lệ', price: 10, height: 163, weight: 49, views: 124.9, tags: ['Qua đêm'], vip: false, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Hà Phương', age: 27, district: 'Hòa Vang', price: 16, height: 167, weight: 53, views: 118.7, tags: ['Sang trọng'], vip: false, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Kim Ngân', age: 24, district: 'Bắc Mỹ An', price: 14, height: 155, weight: 47, views: 113.2, tags: ['Tình cảm', 'Lắng nghe'], vip: true, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Tuyết Mai', age: 20, district: 'Mỹ Khê', price: 8, height: 162, weight: 50, views: 107.5, tags: ['Bí ẩn'], vip: false, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Linh Chi', age: 22, district: 'An Hải', price: 11, height: 165, weight: 54, views: 102.8, tags: ['Nhẹ nhàng', 'Dịu dàng'], vip: true, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Nhã Uyên', age: 26, district: 'Hòa Xuân', price: 13, height: 159, weight: 48, views: 97.4, tags: ['Hài hước'], vip: false, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Phúc An', age: 19, district: 'Phước Mỹ', price: 9, height: 168, weight: 46, views: 91.6, tags: ['Chiều chuộng', 'Vui vẻ'], vip: false, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
  ],
  nt: [
    { name: 'Ngọc Hân', age: 23, district: 'Lộc Thọ', price: 14, height: 165, weight: 51, views: 171.5, tags: ['Lãng mạn', 'Chiều chuộng'], vip: true, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Hương Giang', age: 19, district: 'Phương Sài', price: 10, height: 160, weight: 48, views: 159.3, tags: ['Vui vẻ', 'Năng động'], vip: true, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Thảo Nguyên', age: 21, district: 'Phương Sơn', price: 12, height: 163, weight: 50, views: 148.7, tags: ['Nhẹ nhàng'], vip: true, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Minh Châu', age: 26, district: 'Vĩnh Hải', price: 16, height: 158, weight: 53, views: 141.2, tags: ['Sang trọng', 'Tinh tế'], vip: true, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Lan Phương', age: 20, district: 'Vĩnh Nguyên', price: 9, height: 167, weight: 47, views: 135.6, tags: ['Nhiệt tình', 'Dễ thương'], vip: false, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Nhã Di', age: 24, district: 'Vĩnh Phước', price: 13, height: 161, weight: 52, views: 128.4, tags: ['Qua đêm'], vip: false, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Quỳnh Như', age: 22, district: 'Vĩnh Thọ', price: 11, height: 164, weight: 49, views: 121.9, tags: ['Tình cảm'], vip: true, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Hồng Loan', age: 27, district: 'Xương Huân', price: 15, height: 156, weight: 54, views: 116.3, tags: ['Bí ẩn', 'Hấp dẫn'], vip: false, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Bảo Trân', age: 19, district: 'Tân Lập', price: 8, height: 162, weight: 46, views: 110.8, tags: ['Thân thiện'], vip: false, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Ánh Nguyệt', age: 25, district: 'Phước Long', price: 12, height: 168, weight: 51, views: 105.2, tags: ['Chiều chuộng', 'Dịu dàng'], vip: false, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Kim Anh', age: 21, district: 'Vĩnh Trường', price: 10, height: 159, weight: 48, views: 99.7, tags: ['Hài hước', 'Vui vẻ'], vip: true, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
    { name: 'Thùy Dương', age: 23, district: 'Phước Tiến', price: 14, height: 166, weight: 53, views: 94.1, tags: ['Lắng nghe', 'Chia sẻ'], vip: false, image: 'https://pbs.twimg.com/media/HCXQeYlaAAAZlRl?format=jpg&name=large' },
  ],
};

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

    const models = cityModels[cityKey] || [];

    track.innerHTML = models.map((model, index) => {
      const rank = index < 3 ? index + 1 : 0;
      const rankClass = rank > 0 ? `rank-${rank}` : '';

      return `
        <div class="model-card">
          <div class="card-img-wrap">
            ${model.image ? `<img src="${model.image}" alt="${model.name}" class="card-img" />` : `<div class="card-img-placeholder">${String(index + 1).padStart(2, '0')}</div>`}
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
            <button class="card-btn" onclick="window.open('/profile?city=${cityKey}&name=${encodeURIComponent(model.name)}', '_blank')">Xem chi tiết</button>
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

      const friction = 0.92;
      let velocity = dragStateRef.current.velocity * 0.8;

      const animate = () => {
        if (Math.abs(velocity) < 0.1) {
          dragStateRef.current.velocity = 0;
          return;
        }

        velocity *= friction;
        track.scrollLeft -= velocity;
        dragStateRef.current.animationId = requestAnimationFrame(animate);
      };

      if (Math.abs(velocity) > 0.1) {
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
      const deltaTime = Math.max(now - dragStateRef.current.lastTime, 1);
      const deltaX = clientX - dragStateRef.current.lastX;

      if (Math.abs(clientX - dragStateRef.current.startX) > 3) {
        dragStateRef.current.hasMoved = true;
        if (e.cancelable) {
          e.preventDefault();
        }
      }

      dragStateRef.current.velocity = (deltaX / deltaTime) * 10;
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
