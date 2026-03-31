"use client";

import { useEffect, useState, useRef } from "react";
import { Moon, Sun, Menu, X, ChevronDown, Truck, MapPin, Heart, PhoneCall, Box, Layers, Phone, Mail } from "lucide-react";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Theme
    const root = document.documentElement;
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    // Scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Scroll Reveals
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    }, { threshold: 0.15 });

    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const openLightbox = (src: string) => {
    setLightboxImg(src);
  };

  const closeLightbox = () => {
    setLightboxImg(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    if (!name || !phone || !email || !email.includes("@")) {
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");

    try {
      const res = await fetch("https://formspree.io/f/xreokrbw", {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form),
      });

      if (res.ok) {
        setFormStatus("success");
        form.reset();
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
      {/* SECTION: Nav */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#hero" className="logo">
          <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a02337f7-74cf-470c-9cdf-0f830b350d00/Cool-rain-concrete-1774903499437.png" alt="Coolrain Concrete Logo" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
          <span>COOLRAIN CONCRETE</span>
        </a>

        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#quote">Quote</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-actions">
          <button className="theme-toggle" aria-label="Toggle dark mode" onClick={toggleTheme}>
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
          <a href="tel:0872568365" className="btn btn-primary">Call Now</a>
          <button className="mobile-menu-btn" aria-label="Menu" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? "open" : ""}`} id="mobile-nav">
        <a href="#hero" className="mobile-nav-link" onClick={closeMobileMenu}>Home</a>
        <a href="#about" className="mobile-nav-link" onClick={closeMobileMenu}>About</a>
        <a href="#services" className="mobile-nav-link" onClick={closeMobileMenu}>Services</a>
        <a href="#gallery" className="mobile-nav-link" onClick={closeMobileMenu}>Gallery</a>
        <a href="#quote" className="mobile-nav-link" onClick={closeMobileMenu}>Quote</a>
        <a href="#contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</a>
        <button className="theme-toggle" aria-label="Toggle dark mode" onClick={toggleTheme} style={{ marginTop: "2rem" }}>
          Toggle Theme ({theme === "light" ? "Dark" : "Light"})
        </button>
      </div>

      {/* SECTION: Hero */}
      <section id="hero" className="hero">
          <div className="container container-wide hero-content">
            <h1 className="hero-title reveal">COOLRAIN CONCRETE</h1>
            <p className="hero-subtitle reveal" style={{ transitionDelay: "100ms" }}>Ready Mix Concrete & Concrete Products — Laois & Nationwide</p>
            <div className="hero-ctas reveal" style={{ transitionDelay: "200ms" }}>
            <a href="#quote" className="btn btn-primary">Get a Free Quote</a>
            <a href="tel:0872568365" className="btn btn-secondary">Call 087 256 8365</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <ChevronDown />
        </div>
      </section>

        {/* SECTION: About */}
        <section id="about" className="about">
          <div className="container about-grid">
              <div className="about-image reveal">
                <img src="/concrete-truck.jpg" alt="Coolrain Concrete mixer truck on the road" />
              </div>
          <div className="about-text reveal" style={{ transitionDelay: "150ms" }}>
            <span className="section-tag">WHO WE ARE</span>
            <h2 className="section-title">A Laois Family. A National Reputation.</h2>
            <p>Coolrain Concrete delivers concrete products and ready mix all over the country and further afield. We are a small family run business with trusted customers and expanding all the time.</p>
            <p>Based in Windsor, Coolrain, Portlaoise, Co. Laois, our reputation is built on quality, reliability, and personal service that only a local family business can provide.</p>
            
            <div className="trust-badges">
              <div className="badge">
                <Truck />
                <span>Ready Mix</span>
              </div>
              <div className="badge">
                <MapPin />
                <span>Nationwide Delivery</span>
              </div>
              <div className="badge">
                <Heart />
                <span>Family Run</span>
              </div>
              <div className="badge">
                <PhoneCall />
                <span>Laois Based</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Services */}
      <section id="services" className="services">
        <div className="container">
          <div className="reveal">
            <span className="section-tag">WHAT WE DELIVER</span>
            <h2 className="section-title">Our Services</h2>
          </div>
          
          <div className="services-grid">
            <div className="service-card full-width reveal">
              <div className="service-icon">
                <Truck size={32} />
              </div>
              <div className="service-content">
                <h3 className="service-title">Ready Mix Concrete</h3>
                <p className="service-desc">Supplied fresh, mixed to exact specifications, and delivered direct to your site efficiently.</p>
                <a href="#quote" className="btn btn-ghost">Enquire Now &rarr;</a>
              </div>
            </div>
            
            <div className="service-card reveal" style={{ transitionDelay: "100ms" }}>
              <div className="service-icon">
                <Box size={32} />
              </div>
              <h3 className="service-title">Concrete Products</h3>
              <p className="service-desc">Precast blocks, posts, pipes, and more durable products for your construction needs.</p>
              <a href="#quote" className="btn btn-ghost">Learn More &rarr;</a>
            </div>

            <div className="service-card reveal" style={{ transitionDelay: "200ms" }}>
              <div className="service-icon">
                <Layers size={32} />
              </div>
              <h3 className="service-title">Mortar Ready Mixed</h3>
              <p className="service-desc">Ready-to-use premium mix tailored for masonry and brickwork applications.</p>
              <a href="#quote" className="btn btn-ghost">Learn More &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Gallery */}
      <section id="gallery" className="gallery">
        <div className="container container-wide">
          <div className="reveal text-center">
            <span className="section-tag">OUR WORK</span>
            <h2 className="section-title">Gallery</h2>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item tall reveal" onClick={() => openLightbox("https://a.mktgcdn.com/p/ef3_XcEKgVS7-L2zsU9CodD9LqJBqHkJZVkaiLiSiz8/480x370.png")}>
              <img src="https://a.mktgcdn.com/p/ef3_XcEKgVS7-L2zsU9CodD9LqJBqHkJZVkaiLiSiz8/480x370.png" alt="Concrete Works" />
              <div className="gallery-overlay"><span className="gallery-caption">Concrete Works</span></div>
            </div>
            <div className="gallery-item reveal" style={{ transitionDelay: "100ms" }} onClick={() => openLightbox("https://a.mktgcdn.com/p/-TTLBYJNSc3THd7K5pu3MNw61Wk4SBJpiHMlsQ3zshY/480x370.png")}>
              <img src="https://a.mktgcdn.com/p/-TTLBYJNSc3THd7K5pu3MNw61Wk4SBJpiHMlsQ3zshY/480x370.png" alt="Recent Project" />
              <div className="gallery-overlay"><span className="gallery-caption">Recent Project</span></div>
            </div>
            <div className="gallery-item reveal" style={{ transitionDelay: "150ms" }} onClick={() => openLightbox("https://a.mktgcdn.com/p/-KjMjUCAzJ03W6Fv_V4fi9L65O_RTb8ixt4JqzKoLuU/480x370.png")}>
              <img src="https://a.mktgcdn.com/p/-KjMjUCAzJ03W6Fv_V4fi9L65O_RTb8ixt4JqzKoLuU/480x370.png" alt="Site Delivery" />
              <div className="gallery-overlay"><span className="gallery-caption">Site Delivery</span></div>
            </div>
            <div className="gallery-item tall reveal" style={{ transitionDelay: "200ms" }} onClick={() => openLightbox("https://a.mktgcdn.com/p/BdQ9BR5YcyBWyAOefXJP7_MlWk7hqMtqOhORzwjWkBo/480x370.png")}>
              <img src="https://a.mktgcdn.com/p/BdQ9BR5YcyBWyAOefXJP7_MlWk7hqMtqOhORzwjWkBo/480x370.png" alt="Structural Progress" />
              <div className="gallery-overlay"><span className="gallery-caption">Structural Progress</span></div>
            </div>
            <div className="gallery-item reveal" style={{ transitionDelay: "50ms" }} onClick={() => openLightbox("https://a.mktgcdn.com/p/hyoCW8dZwkbUFZU2S3qnTfg04hLj507s3Iugvudbamg/480x370.png")}>
              <img src="https://a.mktgcdn.com/p/hyoCW8dZwkbUFZU2S3qnTfg04hLj507s3Iugvudbamg/480x370.png" alt="Finished Installation" />
              <div className="gallery-overlay"><span className="gallery-caption">Finished Installation</span></div>
            </div>
            <div className="gallery-item reveal" style={{ transitionDelay: "100ms" }} onClick={() => openLightbox("https://a.mktgcdn.com/p/Yl6zN8QDUnrLMDRu_2px03cCyjZG4HysY9BLJ4aLrt0/330x273.png")}>
              <img src="https://a.mktgcdn.com/p/Yl6zN8QDUnrLMDRu_2px03cCyjZG4HysY9BLJ4aLrt0/330x273.png" alt="Coolrain Team" />
              <div className="gallery-overlay"><span className="gallery-caption">Coolrain Team</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div className={`lightbox ${lightboxImg ? "active" : ""}`} onClick={(e) => {
        if ((e.target as HTMLElement).tagName !== 'IMG') closeLightbox();
      }}>
        <button className="lightbox-close" aria-label="Close lightbox">
          <X />
        </button>
        {lightboxImg && <img src={lightboxImg} alt="Gallery Full" />}
      </div>

      {/* SECTION: Quote */}
      <section id="quote" className="quote">
        <div className="container quote-container reveal">
          <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
            <span className="section-tag">GET A FREE QUOTE</span>
            <h2 className="section-title">Let&apos;s Discuss Your Project</h2>
            <p style={{ color: "var(--color-text-muted)" }}>We&apos;ll get back to you within one business day.</p>
          </div>

          <form action="https://formspree.io/f/xreokrbw" method="POST" onSubmit={handleSubmit} noValidate>
            {formStatus === "success" && (
              <div className="form-success" style={{ display: "block" }}>
                Thanks! We&apos;ll be in touch shortly.
              </div>
            )}
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" className="form-control" required />
                {formStatus === "error" && <div className="form-error" style={{ display: "block" }}>Please fill in all required fields or try again.</div>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" className="form-control" required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" className="form-control" required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="service">Service Required</label>
              <select id="service" name="service" className="form-control">
                <option value="Ready Mix Concrete">Ready Mix Concrete</option>
                <option value="Concrete Products">Concrete Products</option>
                <option value="Mortar Ready Mixed">Mortar Ready Mixed</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message / Project Details</label>
              <textarea id="message" name="message" className="form-control" rows={4}></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "var(--space-4)" }} disabled={formStatus === "submitting"}>
              {formStatus === "submitting" ? "SENDING..." : "SEND ENQUIRY →"}
            </button>
          </form>
        </div>
      </section>

      {/* SECTION: Contact */}
      <section id="contact" className="contact">
        <div className="container contact-grid">
          <div className="contact-info reveal">
            <span className="section-tag">GET IN TOUCH</span>
            <h2 className="section-title">Contact Us</h2>
            <p style={{ marginBottom: "var(--space-4)" }}>Have a question or need a quote? Reach out to us directly.</p>
            
            <div className="contact-item">
              <div className="contact-item-icon"><Phone /></div>
              <div className="contact-item-text">
                <strong>Call Us</strong>
                <a href="tel:0872568365">087 256 8365</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-item-icon"><Mail /></div>
                <div className="contact-item-text">
                  <strong>Email Us</strong>
                  <a href="mailto:gerjimbennette@gmail.com">gerjimbennette@gmail.com</a>
                </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon"><MapPin /></div>
              <div className="contact-item-text">
                <strong>Location</strong>
                Windsor, Coolrain,<br />Portlaoise, Co. Laois
              </div>
            </div>
          </div>

          <div className="map-container reveal" style={{ transitionDelay: "150ms" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152502!2d-7.58!3d52.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485d0334b7dd069d%3A0x51f8efec89e2def8!2sCoolrain%20Concrete!5e0!3m2!1sen!2sie!4v1"
              width="100%" height="400" style={{ border: 0 }} allowFullScreen={false} loading="lazy">
            </iframe>
          </div>
        </div>
      </section>

      {/* SECTION: Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#hero" className="logo" style={{ fontSize: "var(--text-lg)", marginBottom: "var(--space-4)" }}>
                <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/a02337f7-74cf-470c-9cdf-0f830b350d00/Cool-rain-concrete-1774903499437.png" alt="Coolrain Concrete Logo" style={{ height: "32px", width: "auto", objectFit: "contain" }} />
                <span>COOLRAIN CONCRETE</span>
              </a>
              <p>Built on trust. Poured with precision.</p>
            </div>
            
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#quote">Get a Quote</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Contact</h4>
              <ul style={{ color: "var(--color-text-muted)", listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                <li>087 256 8365</li>
                <li>Windsor, Coolrain,<br />Portlaoise, Co. Laois</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div>&copy; 2026 Coolrain Concrete. All rights reserved.</div>
            <div>Windsor, Coolrain, Portlaoise, Co. Laois</div>
          </div>
        </div>
      </footer>
    </>
  );
}
