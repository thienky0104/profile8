import { useState, useEffect } from 'react';
import Marquee from './Marquee';
import CitySection from './CitySection';
import WhyChooseUs from './WhyChooseUs';
import Contact from './Contact';
import Footer from './Footer';

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCity, setActiveCity] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && ['saigon', 'hanoi', 'danang', 'nhatrang'].includes(hash)) {
      setActiveCity(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'auto' });
      }, 100);
    }
  }, []);

  const scrollToCity = (cityId: string) => {
    setActiveCity(cityId);
    const element = document.getElementById(cityId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={isScrolled ? 'scrolled' : ''}>
        <a href="#" className="logo">
          Lux<em>Date</em>
        </a>

        <div className="nav-cities">
          <button className={`city-pill ${activeCity === 'saigon' ? 'active' : ''}`} onClick={() => scrollToCity('saigon')}>
            Sài Gòn
          </button>
          <button className={`city-pill ${activeCity === 'hanoi' ? 'active' : ''}`} onClick={() => scrollToCity('hanoi')}>
            Hà Nội
          </button>
          <button className={`city-pill ${activeCity === 'danang' ? 'active' : ''}`} onClick={() => scrollToCity('danang')}>
            Đà Nẵng
          </button>
          <button className={`city-pill ${activeCity === 'nhatrang' ? 'active' : ''}`} onClick={() => scrollToCity('nhatrang')}>
            Nha Trang
          </button>
        </div>

        <div className="nav-right">
          <a href="tel:0776943965" className="nav-phone">
            ☎ 0776 943 965
          </a>
          <button
            className="nav-cta"
            onClick={() => window.open('https://t.me/hoahong8388', '_blank')}
          >
            Đặt lịch
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-video-wrap">
          <video autoPlay muted loop playsInline poster="https://images.pexels.com/photos/3171815/pexels-photo-3171815.jpeg?auto=compress&cs=tinysrgb&w=1920">
            <source src="/background-videoooo.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-lines"></div>

        <div className="hero-topleft">
          <div className="hero-eyebrow">Dịch vụ bạn đồng hành cao cấp</div>
        </div>

        <div className="hero-center">
          <h1 className="hero-title">
            Khoảnh khắc
            <br />
            <em>đáng nhớ</em>
          </h1>
          <p className="hero-sub">
            Hot TikToker, Hoa hậu, Tiếp viên hàng không — những nàng thơ đang chờ bạn.
            <br />
            Một cuộc hẹn đặc biệt, chỉ cần một cú chạm.
          </p>
          <div className="hero-actions">
            <button
              className="btn-hero-primary"
              onClick={() => window.open('https://t.me/hoahong8388', '_blank')}
            >
              Khám phá ngay
            </button>
          </div>
        </div>

        <div className="hero-bottom-bar">
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-num">200+</div>
              <div className="stat-desc">Người đẹp</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">4</div>
              <div className="stat-desc">Thành phố</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">5K+</div>
              <div className="stat-desc">Lượt đặt lịch</div>
            </div>
          </div>

          <div className="scroll-hint">
            <span>Cuộn xuống</span>
            <div className="scroll-line"></div>
          </div>

          <div className="hero-bottom-right">
            <span className="hero-bottom-label">Có mặt tại</span>
            <div className="hero-cities-row">
              <span>Sài Gòn</span>
              <span className="hcr-dot">·</span>
              <span>Hà Nội</span>
              <span className="hcr-dot">·</span>
              <span>Đà Nẵng</span>
              <span className="hcr-dot">·</span>
              <span>Nha Trang</span>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <CitySection
        id="saigon"
        cityLabel="Thành phố Hồ Chí Minh"
        cityName="Sài"
        cityNameItalic="Gòn"
        cityKey="sg"
      />

      <CitySection
        id="hanoi"
        cityLabel="Thủ đô Việt Nam"
        cityName="Hà"
        cityNameItalic="Nội"
        cityKey="hn"
      />

      <CitySection
        id="danang"
        cityLabel="Miền Trung Việt Nam"
        cityName="Đà"
        cityNameItalic="Nẵng"
        cityKey="dn"
      />

      <CitySection
        id="nhatrang"
        cityLabel="Thiên đường biển xanh"
        cityName="Nha"
        cityNameItalic="Trang"
        cityKey="nt"
      />

      <WhyChooseUs />

      <Contact />

      <Footer />
    </>
  );
}
