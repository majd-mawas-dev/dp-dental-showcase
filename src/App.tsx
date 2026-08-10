import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  ShieldCheck,
  Sparkles,
  SprayCan,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getProduct, products, type Product } from "./data/products";
import { appPath, assetPath, currentAppPath } from "./utils/paths";

function navigate(path: string) {
  window.history.pushState({}, "", appPath(path));
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function useRoute() {
  const [path, setPath] = useState(currentAppPath());

  useEffect(() => {
    const update = () => setPath(currentAppPath());
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return path;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const links: Array<[string, string]> = [
    ["Products", "/#products"],
    ["Technology", "/#technology"],
    ["About", "/#about"],
    ["Contact", "/#contact"],
  ];

  const follow = (href: string) => {
    setOpen(false);
    if (href.startsWith("/#")) {
      navigate("/");
      requestAnimationFrame(() => document.querySelector(href.slice(1))?.scrollIntoView({ behavior: "smooth" }));
      return;
    }
    navigate(href);
  };

  return (
    <header className={`site-header ${scrolled || open ? "is-solid" : ""}`}>
      <a className="brand" href={appPath("/")} onClick={(event) => (event.preventDefault(), navigate("/"))}>
        <img src={assetPath("assets/brand/dp-logo-transparent.png")} alt="DP Dental logo" />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => (
          <a key={label} href={href} onClick={(event) => (event.preventDefault(), follow(href))}>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="#contact" onClick={(event) => (event.preventDefault(), follow("/#contact"))}>
        Contact Us
      </a>
      <button
        className="icon-button mobile-toggle"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label="Toggle navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <div className={`mobile-nav-backdrop ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={`mobile-panel ${open ? "is-open" : ""}`} id="mobile-navigation" aria-hidden={!open}>
        <div className="mobile-panel-top">
          <img src={assetPath("assets/brand/dp-logo-transparent.png")} alt="" aria-hidden="true" />
          <button className="icon-button" aria-label="Close navigation" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={(event) => (event.preventDefault(), follow(href))}>
              {label}
            </a>
          ))}
        </nav>
        <a className="mobile-panel-cta" href="#contact" onClick={(event) => (event.preventDefault(), follow("/#contact"))}>
          Contact Us <ArrowRight size={17} />
        </a>
      </aside>
    </header>
  );
}

function SectionHeading({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <div className="section-heading">
      <p>{kicker}</p>
      <h2>{title}</h2>
      {copy ? <span>{copy}</span> : null}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const capabilityPreview = product.features.slice(0, 2);

  return (
    <article className="product-card" style={{ "--accent": product.accent } as React.CSSProperties}>
      <button className="card-hit" onClick={() => navigate(`/products/${product.slug}`)} aria-label={`View ${product.name}`} />
      <div className={`product-media ${product.images[0].tone ?? "isolated"}`}>
        <img src={product.images[0].src} alt={product.images[0].alt} loading="lazy" />
      </div>
      <div className="product-card-body">
        <div className="card-heading">
          <p className="model">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <p>{product.tagline}</p>
        <ul className="card-capabilities" aria-label={`${product.name} capabilities`}>
          {capabilityPreview.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="card-footer">
          <span>{product.model}</span>
          <a
            href={appPath(`/products/${product.slug}`)}
            onClick={(event) => (event.preventDefault(), navigate(`/products/${product.slug}`))}
          >
            Explore details <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}

function HomePage() {
  const featured = products.find((product) => product.slug === "a-45")!;

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Premium precision dental technology</p>
          <h1>DP Dental</h1>
          <p className="hero-line">Dental Quality You Can Trust</p>
          <p>
            Precision handpieces, air turbines, and low speed kits presented from the supplied DP catalogue and
            product photography.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#products">
              Explore Products <ArrowRight size={17} />
            </a>
            <a className="button secondary" href="#contact">
              Contact Us
            </a>
          </div>
        </div>
        <div className="hero-product" aria-label="Featured DP Dental product">
          <div className="hero-product-stage">
            <img src={assetPath("assets/products/a-45-main-cutout.png")} alt="A-45 DP Dental handpiece" />
            <span className="hero-spec top">45-degree head</span>
            <span className="hero-spec bottom">Triple water spray</span>
          </div>
        </div>
      </section>

      <section className="product-overview" id="products">
        <SectionHeading
          kicker="Product Collection"
          title="Precision handpiece portfolio"
          copy="A clean overview of DP Dental air turbines and low speed kits, organized for professional product evaluation."
        />
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="featured" style={{ "--accent": featured.accent } as React.CSSProperties}>
        <div className="featured-image">
          <img src={assetPath("assets/products/a-45-main-cutout.png")} alt="A-45 side profile product image" loading="lazy" />
        </div>
        <div className="featured-copy">
          <p className="eyebrow">Featured Product</p>
          <h2>{featured.name}</h2>
          <p>{featured.description}</p>
          <div className="feature-list compact">
            {featured.features.slice(0, 4).map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
          <button className="button primary" onClick={() => navigate("/products/a-45")}>
            View A-45 Details <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <section className="technology" id="technology">
        <SectionHeading
          kicker="Why DP"
          title="Technical cues from the catalogue"
          copy="A restrained system focused on supported claims: visibility, ceramic bearings, spray systems, and infection control design."
        />
        <div className="tech-grid">
          <Tech icon={<Sparkles />} title="LED visibility" copy="Ring LED and SMD LED designs are listed across the turbine range." />
          <Tech icon={<ShieldCheck />} title="Zero retraction" copy="Several air turbines list a 100% zero retraction head and double infection control system." />
          <Tech icon={<SprayCan />} title="Water spray systems" copy="Products include 3 water spray, 4 water spray, internal water, and external water variants." />
          <Tech icon={<Zap />} title="Ceramic bearings" copy="Catalogue pages reference NSK or Japanese ceramic bearings with dynamic balance." />
        </div>
      </section>

      <AboutSection />
      <CTASection />
    </>
  );
}

function Tech({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return (
    <article className="tech-item">
      <div>{icon}</div>
      <h3>{title}</h3>
      <p>{copy}</p>
    </article>
  );
}

function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const current = product.images[active];

  const move = (delta: number) => {
    setActive((index) => (index + delta + product.images.length) % product.images.length);
  };

  return (
    <div className="gallery" style={{ "--accent": product.accent } as React.CSSProperties}>
      <div className={`gallery-stage ${current.tone ?? "isolated"}`}>
        <img src={current.src} alt={current.alt} />
        {product.images.length > 1 ? (
          <>
            <button className="icon-button gallery-prev" aria-label="Previous image" onClick={() => move(-1)}>
              <ChevronLeft size={22} />
            </button>
            <button className="icon-button gallery-next" aria-label="Next image" onClick={() => move(1)}>
              <ChevronRight size={22} />
            </button>
          </>
        ) : null}
      </div>
      {product.images.length > 1 ? (
        <div className="thumbs" role="tablist" aria-label={`${product.name} image gallery`}>
          {product.images.map((image, index) => (
            <button
              key={image.src}
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
              role="tab"
              aria-selected={index === active}
              aria-label={`Show ${image.alt}`}
            >
              <img src={image.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SpecificationsTable({ product }: { product: Product }) {
  return (
    <div className="spec-wrap">
      <h2>Technical Specifications</h2>
      <dl className="spec-grid">
        {product.specifications.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ProductPage({ product }: { product: Product }) {
  const related = product.relatedProducts.map((slug) => getProduct(slug)).filter(Boolean) as Product[];

  useEffect(() => {
    document.title = `${product.name} | DP Dental`;
    return () => {
      document.title = "DP Dental | Dental Quality You Can Trust";
    };
  }, [product]);

  return (
    <>
      <section className="detail-hero" style={{ "--accent": product.accent } as React.CSSProperties}>
        <div className="breadcrumb">
          <a href={appPath("/")} onClick={(event) => (event.preventDefault(), navigate("/"))}>
            Products
          </a>
          <span>/</span>
          <span>{product.name}</span>
        </div>
        <div className="detail-grid">
          <ProductGallery product={product} />
          <div className="detail-copy">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="hero-line">{product.tagline}</p>
            <p>{product.description}</p>
            <div className="detail-meta">
              <span>Model: {product.model}</span>
              {product.kitType ? <span>{product.kitType}</span> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div>
          <SectionHeading kicker="Core Features" title="Built for precise clinical handling" />
          <div className="feature-list">
            {product.features.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
        </div>
        <SpecificationsTable product={product} />
      </section>

      <section className="related-products">
        <SectionHeading kicker="Related Products" title="Continue exploring DP Dental" />
        <div className="product-grid three">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}

function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="about-content">
        <p className="eyebrow">About DP Dental</p>
        <h2>Precision handpieces for professional clinical workflows.</h2>
        <p>
          DP Dental product material emphasizes dental handpieces with precision-machined forms, clean metallic
          finishes, LED visibility, spray systems, and compact low speed kit options.
        </p>
      </div>
      <div className="about-points" aria-label="DP Dental product focus">
        <span>Air turbines</span>
        <span>Low speed kits</span>
        <span>LED visibility</span>
        <span>Ceramic bearings</span>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cta" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Interested in DP Dental products?</h2>
        <p>Request product information, availability, and catalogue support for the DP handpiece collection.</p>
      </div>
      <a className="button primary" href="mailto:info@example.com?subject=DP%20Dental%20Product%20Information">
        Request Product Information <ArrowRight size={17} />
      </a>
    </section>
  );
}

function NotFound() {
  return (
    <main className="not-found">
      <h1>Product not found</h1>
      <p>The requested DP Dental product route does not exist.</p>
      <button className="button primary" onClick={() => navigate("/")}>
        Back to Products
      </button>
    </main>
  );
}

export default function App() {
  const path = useRoute();
  const product = useMemo(() => {
    const match = path.match(/^\/products\/([^/]+)$/);
    return match ? getProduct(match[1]) : undefined;
  }, [path]);

  return (
    <>
      <Header />
      <main>{path.startsWith("/products/") ? product ? <ProductPage product={product} /> : <NotFound /> : <HomePage />}</main>
      <footer className="footer">
        <img src={assetPath("assets/brand/dp-logo-transparent.png")} alt="DP Dental logo" />
        <p>Dental Quality You Can Trust</p>
        <nav aria-label="Footer navigation">
          {products.map((productItem) => (
            <a
              key={productItem.slug}
              href={appPath(`/products/${productItem.slug}`)}
              onClick={(event) => (event.preventDefault(), navigate(`/products/${productItem.slug}`))}
            >
              {productItem.name}
            </a>
          ))}
        </nav>
      </footer>
    </>
  );
}
