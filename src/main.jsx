import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import {
  Phone,
  MessageCircle,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  Menu,
  Compass,
  ShieldCheck,
  Utensils,
  Car,
  Wind,
  Zap,
  Users,
  FileText,
  Sparkles,
  ArrowUp,
} from 'lucide-react';
import { BUSINESS, whatsappUrl } from './config';
import './styles.css';

// Project Photos & Tailored Event Execution Visuals
const photos = {
  cover: '/images/cover-hero.jpg',
  coverAlt: '/images/cover-hero-alt.jpg',
  hall: '/images/convention-hall.jpg',
  entrance: '/images/entrance.jpg',
  poolDay: '/images/pool-day.jpg',
  poolNight: '/images/pool-night.jpg',
  reception: '/images/reception.jpg',
  // Specific real event execution visuals
  marriageEvent: '/images/events/marriage_event.jpg',
  birthdayEvent: '/images/events/birthday_event.jpg',
  engagementEvent: '/images/events/engagement_event.jpg',
  officeMeetingEvent: '/images/events/office_meeting_event.jpg',
  sangeetEvent: '/images/events/sangeet_event.jpg',
  receptionEvent: '/images/events/reception_event.jpg',
};

const fadeIn = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

/* ==========================================================================
   1. OPENING FULL-SCREEN COVER PAGE
   Only High-Quality Image, Convention Name, and Unique Tagline.
   No scroll-to-explore text or mouse animation.
   ========================================================================== */
function CoverPage() {
  return (
    <section className="cover-hero" id="home">
      <div
        className="cover-bg-image"
        style={{ backgroundImage: `url(${photos.cover})` }}
      />
      <div className="cover-vignette" />

      <div className="cover-content">
        <motion.div
          className="cover-crest"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>RR</span>
        </motion.div>

        <motion.h1
          className="cover-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
        >
          R R Gardens
        </motion.h1>

        <motion.span
          className="cover-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.4 }}
        >
          Convention Centre & Villa Resort
        </motion.span>

        <motion.div
          className="cover-divider-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />

        <motion.p
          className="cover-tagline"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.7 }}
        >
          "Where Timeless Traditions Meet Regal Celebrations."
        </motion.p>
      </div>
    </section>
  );
}

/* ==========================================================================
   2. SITE HEADER (MATCHING USER'S SECOND PHOTO EXACTLY)
   Hidden on cover page; smoothly slides down when user scrolls past cover
   ========================================================================== */
function Header() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.25;
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'The Convention', href: '#the-convention' },
    { name: 'Spaces & Lawns', href: '#spaces' },
    { name: 'Services', href: '#services' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`site-header ${visible ? 'visible' : ''}`}>
      <div className="nav-container">
        {/* Brand logo matching screenshot */}
        <a href="#home" className="brand" aria-label="R R Gardens & Convention Centre">
          <div className="brand-crest">
            <span>RR</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">R R Gardens</span>
            <span className="brand-sub">Convention Centre & Villa</span>
          </div>
        </a>

        {/* Navigation Links matching screenshot */}
        <nav className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-cta-btn"
            onClick={() => setMobileOpen(false)}
          >
            Check Dates <ArrowUpRight size={14} />
          </a>
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

/* ==========================================================================
   3. ANIMATED NUMBER COUNTER COMPONENT
   ========================================================================== */
function Counter({ end, duration = 1600, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
      }
    }, { threshold: 0.25 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ==========================================================================
   3. CONVENTION AT-A-GLANCE METRICS STRIP
   ========================================================================== */
function ConventionMetrics() {
  const metrics = [
    {
      target: 1500,
      suffix: '+',
      label: 'Guest Capacity',
      desc: 'Seamless arrangements for mega weddings, conferences & galas'
    },
    {
      target: 15000,
      suffix: ' Sq.Ft.',
      label: 'Pillarless AC Hall',
      desc: 'Pillarless architectural expanse with 24ft high acoustic ceilings'
    },
    {
      target: 400,
      suffix: '+',
      label: 'Dining Seated',
      desc: 'Dedicated banquet hall ensuring continuous, unhurried hospitality'
    },
    {
      target: 4,
      suffix: '+ Acres',
      label: 'Lush Estate & Pool',
      desc: 'Serene landscape, bridal suites, private pool & villa accommodations'
    }
  ];

  return (
    <div className="convention-metrics-strip" id="the-convention">
      <div className="metrics-container">
        {metrics.map((m, idx) => (
          <div className="metric-card" key={idx}>
            <div className="metric-num">
              <Counter end={m.target} suffix={m.suffix} />
            </div>
            <div className="metric-label">{m.label}</div>
            <div className="metric-desc">{m.desc}</div>
          </div>
        ))}
      </div>

      {/* Brochure Request Action Row */}
      <div className="metrics-action-row">
        <a
          href={whatsappUrl("Hello, please share the official RR Gardens Convention Centre & Villa Resort digital brochure with floor plans and capacity chart.")}
          target="_blank"
          rel="noreferrer"
          className="brochure-download-link"
        >
          <FileText size={14} />
          <span>Request Digital Brochure & Floor Plans (PDF)</span>
          <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. EVENTS SECTION WITH REAL EVENT EXECUTION IMAGES
   Clean minimal title, no wordy section heads.
   Includes Marriages, Birthdays, Engagements, Office Meetings, Sangeet, Receptions.
   ========================================================================== */
function EventsSection() {
  const [filter, setFilter] = useState('all');

  const eventsData = [
    {
      id: 'wedding',
      category: 'wedding',
      title: 'Grand Weddings & Muhurthams',
      tagline: 'A Sacred Beginning in Royal Splendour',
      desc: 'Exchange sacred vows amidst grand floral mandaps, crystal chandeliers, and expansive pillarless seating for up to 1,500 guests with central AC and bridal green rooms.',
      space: '15,000 Sq.Ft. Main Pillarless AC Hall',
      image: photos.marriageEvent,
      badge: 'AUSPICIOUS MUHURTHAM',
      auspicious: true,
    },
    {
      id: 'birthday',
      category: 'social',
      title: 'Milestone Birthdays & Jubilees',
      tagline: 'Celebrating Life’s Greatest Milestones in Style',
      desc: 'From fairy-tale 1st birthday parties to 50th golden jubilees and 60th Shashtipoorti milestones, enjoy customized thematic decor, live entertainment, and poolside dining.',
      space: 'Poolside Greenery Lawn & Private Villa',
      image: photos.birthdayEvent,
      badge: 'CHERISHED MILESTONE',
      auspicious: false,
    },
    {
      id: 'engagement',
      category: 'social',
      title: 'Engagements & Ring Ceremonies',
      tagline: 'The First Promise of Forever',
      desc: 'Celebrate the intimate union of two families in an opulent setting. Elegant stage styling, photo-worthy entrance walkways, and curated multi-course dining.',
      space: 'Convention Grand Foyer & Crystal Lawn',
      image: photos.engagementEvent,
      badge: 'INTIMATE & OPULENT',
      auspicious: true,
    },
    {
      id: 'corporate',
      category: 'corporate',
      title: 'Office Meetings & Corporate Summits',
      tagline: 'Distinguished Ambience for Executive Excellence',
      desc: 'Engineered for executive impact: pillarless unobstructed sightlines, seamless audio-visual infrastructure, keynote podiums, and expansive seating for up to 1,500 delegates.',
      space: 'Main Convention Hall (1,200 Delegates)',
      image: photos.officeMeetingEvent,
      badge: 'ANNUAL CONVENTIONS',
      auspicious: false,
    },
    {
      id: 'sangeet',
      category: 'wedding',
      title: 'Sangeet & Mehendi Galas',
      tagline: 'Rhythms, Colors & Starlit Nights',
      desc: 'Electrifying dance performances, concert-grade acoustic sound, illuminated poolside decks, and vibrant cocktail gatherings under the starlit open sky.',
      space: '25,000 Sq.Ft. Celebration Lawn & Pool Deck',
      image: photos.sangeetEvent,
      badge: 'HIGH ENERGY & DANCE',
      auspicious: false,
    },
    {
      id: 'reception',
      category: 'wedding',
      title: 'Grand Wedding Receptions',
      tagline: 'An Evening of Majesty & Royal Feasting',
      desc: 'Host a magnificent post-wedding gala with red-carpet bridal entry, lavish multi-cuisine royal buffets, and effortless valet parking for 300+ cars.',
      space: 'Main Pillarless Hall + Banquet Dining Pavilion',
      image: photos.receptionEvent,
      badge: 'GALA BANQUETING',
      auspicious: true,
    },
  ];

  const filteredEvents = filter === 'all'
    ? eventsData
    : eventsData.filter(item => item.category === filter);

  return (
    <section className="events-section section-pad" id="events">
      {/* Clean minimal section title */}
      <h2 className="section-title-minimal">OUR EVENTS & CELEBRATIONS</h2>

      {/* Filter Tabs */}
      <div className="events-category-tabs">
        {[
          { id: 'all', label: 'All Celebrations' },
          { id: 'wedding', label: 'Weddings & Receptions' },
          { id: 'social', label: 'Birthdays & Engagements' },
          { id: 'corporate', label: 'Office Meetings & Summits' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`event-tab-btn ${filter === tab.id ? 'active' : ''}`}
            onClick={() => setFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Box Container with Rotated Image Container Hover Animation */}
      <div className="gallery-box-container">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="gallery-box"
          >
            {/* Top Badges */}
            <div className="gallery-box__badge-strip">
              <span className="gallery-box__pill">{event.badge}</span>
              {event.auspicious && (
                <span className="gallery-box__shubh">★ Shubh</span>
              )}
            </div>

            {/* Rotated Image Container (Straightens on Hover) */}
            <span className="gallery-box__img-container">
              <img
                src={event.image}
                alt={event.title}
                className="gallery-box__img"
                onError={(e) => {
                  e.currentTarget.src = photos.hall;
                }}
              />
            </span>

            {/* Text Wrapper with Event Name */}
            <span className="gallery-box__text-wrapper">
              <span className="gallery-box__desc">{event.tagline}</span>
              <span className="gallery-box__text">
                {event.title}
              </span>
              <span className="gallery-box__space">
                <Compass size={12} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
                {event.space}
              </span>
              <a
                href={whatsappUrl(`Hello, I would like to enquire about arrangements for a ${event.title} at RR Gardens Convention Centre.`)}
                target="_blank"
                rel="noreferrer"
                className="gallery-box__cta"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Enquire For This Event</span>
                <ArrowUpRight size={13} />
              </a>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   5. OUR SERVICES & VENUE SELECTION (OFFSET LAYERED PHOTO CARDS)
   Clean minimal title, no wordy headers.
   ========================================================================== */
function ServicesSection() {
  const serviceCards = [
    {
      num: '01 / VENUE SELECTION',
      title: 'The Grand Convention Hall',
      badge: 'PILLARLESS CONVENTION SPACE',
      image: photos.hall,
      desc: 'Our monumental pillarless convention hall is engineered for grand royal weddings, conventions, and high-profile receptions. Features soaring 24-foot ceilings, centralized climate control, royal chandeliers, grand elevated stage, and clear sightlines from every corner.',
      specs: [
        '15,000 Sq. Ft. Pillarless Area',
        'Central VRF Air Conditioning',
        'Grand 50ft Elevated Stage',
        'Dedicated AC Bridal Green Rooms'
      ],
      linkText: 'Check Hall Availability',
      linkHref: '#contact',
      reverse: false
    },
    {
      num: '02 / OPEN-AIR SPLENDOUR',
      title: 'The Royal Lawn & Amphitheatre',
      badge: 'STARLIT CELEBRATIONS',
      image: photos.poolNight,
      desc: 'Surrounded by towering palms and emerald landscaping, our expansive 25,000 sq.ft. lawn provides a magical open-air setting for Sangeet nights, Pheras under the starlit sky, and cocktail receptions with illuminating water fountains.',
      specs: [
        '25,000+ Sq. Ft. Manicured Turf',
        'Illuminated Garden Walkways',
        'Waterfront Poolside Deck',
        'Accommodates 1,500+ Floating Guests'
      ],
      linkText: 'Discover The Lawns',
      linkHref: '#spaces',
      reverse: true
    },
    {
      num: '03 / CATERING & BANQUETS',
      title: 'Grand Dining Enclave & Kitchens',
      badge: 'SEPARATE DINING HALL',
      image: photos.reception,
      desc: 'Hospitality is the heartbeat of every great celebration. Our dedicated dining pavilion accommodates 400+ seated guests simultaneously, supported by modern industrial kitchens ready for traditional South Indian plantain feasts or lavish multi-cuisine buffets.',
      specs: [
        '400+ Seated Capacity Per Batch',
        'Dedicated Live Counter Pavilions',
        'Hygienic Commercial Kitchens',
        'Separate Pure-Veg Prep Area'
      ],
      linkText: 'View Banqueting Options',
      linkHref: '#contact',
      reverse: false
    },
    {
      num: '04 / BESPOKE SCENOGRAPHY',
      title: 'Floral & Mandap Styling',
      badge: 'ARTISANAL DECOR',
      image: photos.entrance,
      desc: 'From traditional fragrant jasmine and marigold temple mandaps to contemporary crystal chandelier stage decor, our spaces provide the grand architecture for world-class floral designers and event decorators to bring your dream aesthetics to life.',
      specs: [
        'Grand Archways & Entrance Way',
        'Heavy Rigging Ceiling Points',
        'Bespoke Stage Illumination',
        'Flexible Stage Dimensions'
      ],
      linkText: 'Discuss Decor Concepts',
      linkHref: '#contact',
      reverse: true
    },
    {
      num: '05 / RESORT HOSPITALITY',
      title: 'Villa Stay & Bridal Retreat',
      badge: 'PRIVATE RESORT ESTATE',
      image: photos.poolDay,
      desc: 'Transform your wedding into an intimate destination getaway. Enjoy on-site air-conditioned villa accommodations for the family, lavish bridal dressing suites with vanity mirrors, and a sparkling private swimming pool to unwind before and after the festivities.',
      specs: [
        'Luxurious Air-Conditioned Villas',
        'Private Swimming Pool & Deck',
        'Vanity Dressing Mirror Stations',
        'Family Overnight Stay Available'
      ],
      linkText: 'Check Villa Availability',
      linkHref: '#contact',
      reverse: false
    }
  ];

  return (
    <section className="services-section section-pad" id="services">
      {/* Clean minimal section title */}
      <h2 className="section-title-minimal">OUR SPACES & SERVICES</h2>

      <div className="services-container" id="spaces">
        {serviceCards.map((card, idx) => (
          <motion.div
            key={idx}
            className={`service-row ${card.reverse ? 'reverse' : ''}`}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="service-photo-col">
              <span className="service-badge-pill">{card.badge}</span>
              <div className="service-image-frame">
                <img
                  src={card.image}
                  alt={card.title}
                  onError={(e) => {
                    e.currentTarget.src = photos.hall;
                  }}
                />
              </div>
            </div>

            <div className="service-content-col">
              <span className="service-number">{card.num}</span>
              <h3 className="service-title">{card.title}</h3>
              <p className="service-desc">{card.desc}</p>

              <div className="service-specs-list">
                {card.specs.map((spec, sIdx) => (
                  <div className="spec-bullet" key={sIdx}>
                    <CheckCircle2 size={14} />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <a href={card.linkHref} className="editorial-link">
                {card.linkText} <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   6. AMENITIES / CIRCULAR MEDALLIONS (FROM REFERENCE SCREENSHOT)
   Clean minimal title, no wordy headers.
   ========================================================================== */
function AmenitiesSection() {
  const amenities = [
    {
      icon: <Car size={26} />,
      title: '300+ Parking',
      detail: 'Spacious on-site car and bus parking with dedicated valet'
    },
    {
      icon: <Wind size={26} />,
      title: 'Central AC',
      detail: 'High-tonnage VRF cooling keeping guests comfortable'
    },
    {
      icon: <Zap size={26} />,
      title: '100% Power',
      detail: 'Dual synchronized heavy genset backup for zero interruption'
    },
    {
      icon: <Users size={26} />,
      title: 'Bridal Suites',
      detail: 'Luxury air-conditioned green rooms with private vanity'
    },
    {
      icon: <Utensils size={26} />,
      title: 'Banqueting',
      detail: 'Separate dining hall with large hygienic catering kitchen'
    },
    {
      icon: <ShieldCheck size={26} />,
      title: '24/7 Security',
      detail: 'CCTV surveillance and professional property staff'
    },
  ];

  return (
    <section className="amenities-section section-pad">
      {/* Clean minimal section title */}
      <h2 className="section-title-minimal">VENUE AMENITIES</h2>

      <div className="amenities-grid">
        {amenities.map((item, idx) => (
          <div className="amenity-card" key={idx}>
            <div className="amenity-circle">
              {item.icon}
            </div>
            <h4 className="amenity-title">{item.title}</h4>
            <p className="amenity-detail">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   8. INTERACTIVE BOOKING / DATE AVAILABILITY ENQUIRY FORM
   ========================================================================== */
function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: 'Traditional Wedding',
    date: '',
    guests: '800 - 1,200 Guests',
    requiredSpaces: 'Convention Hall + Lawns',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `*New Event Enquiry — R R Gardens & Convention Centre*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Event Type:* ${formData.eventType}\n` +
      `*Preferred Date:* ${formData.date || 'To be decided'}\n` +
      `*Expected Guests:* ${formData.guests}\n` +
      `*Spaces Required:* ${formData.requiredSpaces}\n` +
      `*Additional Details:* ${formData.message || 'None'}`;

    window.open(whatsappUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="booking-section section-pad" id="contact">
      <div className="booking-container">
        <div className="booking-info">
          <h2>
            Reserve Your<br />
            <em>Grand Celebration.</em>
          </h2>
          <p>
            Dates for prime wedding muhurthams and auspicious weekends fill up quickly. Speak directly with our event directors to check venue availability, arrange a private guided walkthrough, and receive our comprehensive wedding brochure.
          </p>

          <div className="booking-direct-strip">
            <a
              href={`tel:${BUSINESS.phoneLink}`}
              className="direct-method"
            >
              <div className="direct-icon">
                <Phone size={18} />
              </div>
              <div className="direct-text">
                <small>DIRECT PHONE CALL</small>
                <strong>{BUSINESS.phoneDisplay}</strong>
              </div>
            </a>

            <a
              href={whatsappUrl("Hello, I would like to schedule a private tour of RR Gardens Convention Centre.")}
              target="_blank"
              rel="noreferrer"
              className="direct-method"
            >
              <div className="direct-icon">
                <MessageCircle size={18} />
              </div>
              <div className="direct-text">
                <small>INSTANT WHATSAPP ENQUIRY</small>
                <strong>Chat with our Event Director</strong>
              </div>
            </a>

            <div className="direct-method">
              <div className="direct-icon">
                <MapPin size={18} />
              </div>
              <div className="direct-text">
                <small>PROPERTY LOCATION</small>
                <strong>{BUSINESS.address}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="booking-form-card">
          <div className="form-header-line">
            <h3>Check Venue Availability</h3>
            <span className="form-badge-auspicious">Priority Enquiry</span>
          </div>

          <div className="booking-notice-callout">
            <span className="notice-icon">★</span>
            <div className="notice-text">
              <strong>Auspicious Muhurtham Alert:</strong> Prime wedding muhurthams and reception weekends for 2026/2027 are reserved 6–12 months in advance. Early date reservations recommended.
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Your Full Name *</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. S. Rao"
                />
              </div>

              <div className="form-group">
                <label>Contact Phone Number *</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="form-group">
                <label>Event Type</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                >
                  <option>Traditional Wedding</option>
                  <option>Milestone Birthday / Jubilee</option>
                  <option>Engagement Ceremony</option>
                  <option>Office Meeting / Corporate Summit</option>
                  <option>Sangeet & Mehendi Celebration</option>
                  <option>Reception Gala</option>
                </select>
              </div>

              <div className="form-group">
                <label>Preferred Event Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Estimated Guest Count</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                >
                  <option>Below 500 Guests</option>
                  <option>500 – 800 Guests</option>
                  <option>800 – 1,200 Guests</option>
                  <option>1,200 – 1,500+ Guests</option>
                  <option>Not Finalized Yet</option>
                </select>
              </div>

              <div className="form-group">
                <label>Spaces Required</label>
                <select
                  name="requiredSpaces"
                  value={formData.requiredSpaces}
                  onChange={handleChange}
                >
                  <option>Convention Hall + Dining Pavilion</option>
                  <option>Convention Hall + Open Lawns</option>
                  <option>Full Estate (Hall + Lawns + Villa & Pool)</option>
                  <option>Open Lawn Only</option>
                  <option>Villa & Poolside Private Event</option>
                </select>
              </div>

              <div className="form-group full">
                <label>Specific Requests or Message (Optional)</label>
                <textarea
                  rows="3"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your wedding plans, catering preferences, or questions..."
                />
              </div>
            </div>

            <button type="submit" className="form-submit-btn">
              Submit & Enquire on WhatsApp <ArrowRight size={15} />
            </button>

            <small className="form-footnote">
              Your contact details are used solely to check availability and respond to your event request.
            </small>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   9. LUXURY EDITORIAL FOOTER
   ========================================================================== */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col-brand">
          <div className="brand" style={{ color: 'var(--jungle)' }}>
            <div className="brand-crest" style={{ background: 'var(--cream-pure)', borderColor: 'var(--peach)' }}>
              <span style={{ color: 'var(--myrtle)' }}>RR</span>
            </div>
            <div className="brand-text">
              <span className="brand-title">R R Gardens</span>
              <span className="brand-sub">Convention Centre & Villa</span>
            </div>
          </div>
          <p className="footer-tagline">
            An iconic luxury convention centre and villa resort estate designed for life’s grandest beginnings and timeless celebrations.
          </p>
        </div>

        <div>
          <h4 className="footer-col-title">Celebration Spaces</h4>
          <ul className="footer-links">
            <li><a href="#the-convention">Grand Convention Hall</a></li>
            <li><a href="#spaces">Royal Celebration Lawns</a></li>
            <li><a href="#services">Dedicated Dining Pavilion</a></li>
            <li><a href="#spaces">Bridal Dressing Suites</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Hosted Occasions</h4>
          <ul className="footer-links">
            <li><a href="#events">Traditional Weddings</a></li>
            <li><a href="#events">Milestone Birthdays</a></li>
            <li><a href="#events">Engagements & Roka</a></li>
            <li><a href="#events">Corporate Summits</a></li>
            <li><a href="#events">Sangeet & Mehendi</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-col-title">Contact & Location</h4>
          <div className="footer-contact-info">
            <p><Phone size={14} style={{ display: 'inline', marginRight: 6, color: 'var(--myrtle)' }} /> {BUSINESS.phoneDisplay}</p>
            <p><MessageCircle size={14} style={{ display: 'inline', marginRight: 6, color: 'var(--myrtle)' }} /> Direct WhatsApp Booking</p>
            <p><MapPin size={14} style={{ display: 'inline', marginRight: 6, color: 'var(--myrtle)' }} /> {BUSINESS.address}</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</span>
        <span>A Sanctuary for Regal Beginnings</span>
      </div>
    </footer>
  );
}

/* ==========================================================================
   10. FLOATING QUICK-ACTION BUTTONS & BACK TO TOP
   ========================================================================== */
function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showBackToTop && (
        <button
          className="back-to-top-btn"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      )}

      <div className="floating-pill">
        <a href={`tel:${BUSINESS.phoneLink}`}>
          <Phone size={14} /> Call
        </a>
        <span style={{ opacity: 0.3 }}>|</span>
        <a href={whatsappUrl()} target="_blank" rel="noreferrer">
          <MessageCircle size={14} /> WhatsApp
        </a>
      </div>

      <div className="mobile-nav-panel">
        <a href={`tel:${BUSINESS.phoneLink}`} className="mobile-call-btn">
          <Phone size={15} /> Call Property
        </a>
        <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="mobile-wa-btn">
          <MessageCircle size={15} /> WhatsApp
        </a>
      </div>
    </>
  );
}

/* ==========================================================================
   MAIN APP
   ========================================================================== */
function App() {
  return (
    <>
      {/* 1. Opening Cover Page (100% full screen, no mouse, only image, name, tagline) */}
      <CoverPage />

      {/* 2. Site Header (Slides down seamlessly on scroll, matching image 2) */}
      <Header />

      <main>
        {/* 3. Convention Metrics Strip */}
        <ConventionMetrics />

        {/* 4. Events Section (Birthdays, Marriages, Engagements, Office Meetings with dedicated photos) */}
        <EventsSection />

        {/* 5. Spaces & Services (Layered Offset Cards matching reference) */}
        <ServicesSection />

        {/* 6. World-Class Amenities Circular Grid */}
        <AmenitiesSection />

        {/* 7. Interactive Booking & WhatsApp Enquiry */}
        <BookingSection />
      </main>

      {/* 9. Luxury Editorial Footer */}
      <Footer />

      {/* 10. Quick Action Floating Buttons & Back to Top */}
      <FloatingActions />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
