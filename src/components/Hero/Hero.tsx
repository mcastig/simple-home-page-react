import { asset } from '../../utils/asset';
import './Hero.css';

interface HeroProps {
  isDark: boolean;
}

export default function Hero({ isDark: _isDark }: HeroProps) {
  return (
    <main className="hero" id="main-content">
      <div className="hero__inner">
        {/* Left column — text content */}
        <div className="hero__content">
          {/* Badge */}
          <div className="hero__badge" aria-label="Simple way to communicate">
            <span className="hero__badge-text">
              😎 Simple way to communicate
            </span>
          </div>

          {/* H1 Heading */}
          <h1 className="hero__heading">
            Actions for
            <br />
            Accessibility
            <br />
            in Design
          </h1>

          {/* Body paragraph */}
          <p className="hero__body">
            The fastest way to build and deploy websites with reusable components.
          </p>

          {/* CTA row */}
          <div className="hero__cta">
            <a href="#" className="hero__btn-primary">Get Started</a>
            <a href="#" className="hero__btn-demo">Get live demo</a>
          </div>

          {/* Trust badges */}
          <ul className="hero__trust" role="list" aria-label="No commitments needed">
            <li className="hero__trust-item">
              <img
                src={asset('Done_ring_round_fill.svg')}
                alt=""
                aria-hidden="true"
                className="hero__trust-icon"
                width={18}
                height={18}
              />
              <span className="hero__trust-text">No credit card required</span>
            </li>
            <li className="hero__trust-item">
              <img
                src={asset('Done_ring_round_fill.svg')}
                alt=""
                aria-hidden="true"
                className="hero__trust-icon"
                width={18}
                height={18}
              />
              <span className="hero__trust-text">No software to install</span>
            </li>
          </ul>
        </div>

        {/* Right column — hero image */}
        <div className="hero__image-col">
          <img
            src={asset('hero-image-simple-homepage.png')}
            srcSet={`${asset('hero-image-simple-homepage@2x.png')} 2x`}
            alt="Alarado dashboard illustration"
            className="hero__image"
            width={580}
            height={480}
          />
        </div>
      </div>
    </main>
  );
}
