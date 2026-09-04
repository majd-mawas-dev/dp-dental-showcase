import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
  SprayCan,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getProduct, products, type Product } from "./data/products";
import { appPath, assetPath, currentAppPath } from "./utils/paths";

// const contactPhone = "+8613250247401";
const contactEmail = "info@dp-dental.com";
const contactEmail2 = "support@dp-dental.com";
const contactLocation = "Tianhe District, Guangzhou, Guangdong, China";
const whatsappNumber = "8613250247401";
const formspreeEndpoint = "https://formspree.io/f/meaqjgry";
const productGroups = [
  {
    title: "High-speed handpieces",
    copy: "High speed air turbines for visibility, access, spray control, and efficient clinical handling.",
    slugs: ["a-ring", "a-mup", "a-pro", "a-45"],
  },
  {
    title: "Low-speed handpieces",
    copy: "Coordinated internal and external water low speed kits with contra angle, straight handpiece, and air motor options.",
    slugs: ["gold-ln", "b-l"],
  },
  {
    title: "Endo Activator",
    copy: "Activation technology for irrigation, sealer delivery, and controlled endodontic workflow support.",
    slugs: ["a1-pro"],
  },
  {
    title: "Implant Locator",
    copy: "A compact locating device designed to support implant identification during clinical workflows.",
    slugs: ["implant-locator"],
  },
];

function groupId(title: string) {
  return title.toLowerCase().replaceAll(" ", "-");
}

function getGroupProducts(group: (typeof productGroups)[number]) {
  return group.slugs
    .map((slug) => getProduct(slug))
    .filter(Boolean) as Product[];
}

function whatsappHref(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function navigate(path: string) {
  window.history.pushState({}, "", appPath(path));
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToSection(selector: string) {
  if (selector === "#about") {
    const target = document.querySelector(selector);
    const headerHeight =
      document.querySelector(".site-header")?.getBoundingClientRect().height ??
      0;

    if (target instanceof HTMLElement) {
      window.scrollTo({
        top: target.offsetTop - headerHeight + 24,
        behavior: "smooth",
      });
    }

    return;
  }

  const block =
    selector === "#contact" || selector === "#about" ? "center" : "start";
  document
    .querySelector(selector)
    ?.scrollIntoView({ behavior: "smooth", block });
}

function navigateToCategory(categoryId: string) {
  navigate(`/products?category=${categoryId}`);
  requestAnimationFrame(() =>
    document
      .getElementById("catalogue-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" }),
  );
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
  const [productsOpen, setProductsOpen] = useState(false);
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
        setProductsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const links: Array<[string, string]> = [
    ["Technology", "/#technology"],
    ["About", "/#about"],
    ["Contact", "/#contact"],
  ];

  const follow = (href: string) => {
    setOpen(false);
    setProductsOpen(false);
    if (href.startsWith("/#")) {
      navigate("/");
      requestAnimationFrame(() => scrollToSection(href.slice(1)));
      return;
    }
    navigate(href);
  };

  return (
    <header className={`site-header ${scrolled || open ? "is-solid" : ""}`}>
      <a
        className="brand"
        href={appPath("/")}
        onClick={(event) => (event.preventDefault(), navigate("/"))}
      >
        <img
          src={assetPath("assets/brand/dp-logo-transparent.png")}
          alt="DP Dental logo"
        />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <div className="nav-dropdown">
          <a
            className="nav-dropdown-trigger"
            href={appPath("/products")}
            onClick={(event) => {
              event.preventDefault();
              setProductsOpen((current) => !current);
            }}
            aria-haspopup="true"
            aria-expanded={productsOpen}
          >
            Products <ChevronDown size={14} />
          </a>
          <div
            className={`products-dropdown ${productsOpen ? "is-open" : ""}`}
            aria-label="Product categories"
          >
            {productGroups.map((group) => (
              <div className="products-dropdown-group" key={group.title}>
                <a
                  className="products-dropdown-title"
                  href={appPath(`/products?category=${groupId(group.title)}`)}
                  onClick={(event) => {
                    event.preventDefault();
                    setOpen(false);
                    setProductsOpen(false);
                    navigateToCategory(groupId(group.title));
                  }}
                >
                  {group.title}
                </a>
                {getGroupProducts(group).map((product) => (
                  <a
                    key={product.slug}
                    href={appPath(`/products/${product.slug}`)}
                    onClick={(event) => (
                      event.preventDefault(),
                      follow(`/products/${product.slug}`)
                    )}
                  >
                    {product.name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        {links.map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={(event) => (event.preventDefault(), follow(href))}
          >
            {label}
          </a>
        ))}
      </nav>
      <a
        className="header-cta"
        href="#contact"
        onClick={(event) => (event.preventDefault(), follow("/#contact"))}
      >
        <Phone size={17} />
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
      <div
        className={`mobile-nav-backdrop ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`mobile-panel ${open ? "is-open" : ""}`}
        id="mobile-navigation"
        aria-hidden={!open}
      >
        <div className="mobile-panel-top">
          <img
            src={assetPath("assets/brand/dp-logo-transparent.png")}
            alt=""
            aria-hidden="true"
          />
          <button
            className="icon-button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            <X size={22} />
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <a
            href={appPath("/products")}
            onClick={(event) => (event.preventDefault(), follow("/products"))}
          >
            Products
          </a>
          <div className="mobile-product-menu">
            {productGroups.map((group) => (
              <div key={group.title}>
                <a
                  className="mobile-product-category"
                  href={appPath(`/products?category=${groupId(group.title)}`)}
                  onClick={(event) => {
                    event.preventDefault();
                    setOpen(false);
                    navigateToCategory(groupId(group.title));
                  }}
                >
                  {group.title}
                </a>
                {getGroupProducts(group).map((product) => (
                  <a
                    key={product.slug}
                    href={appPath(`/products/${product.slug}`)}
                    onClick={(event) => (
                      event.preventDefault(),
                      follow(`/products/${product.slug}`)
                    )}
                  >
                    {product.name}
                  </a>
                ))}
              </div>
            ))}
          </div>
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={(event) => (event.preventDefault(), follow(href))}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          className="mobile-panel-cta"
          href="#contact"
          onClick={(event) => (event.preventDefault(), follow("/#contact"))}
        >
          Contact Us <ArrowRight size={17} />
        </a>
      </aside>
    </header>
  );
}

function SectionHeading({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy?: string;
}) {
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
    <article
      className="product-card"
      style={{ "--accent": product.accent } as React.CSSProperties}
    >
      <button
        className="card-hit"
        onClick={() => navigate(`/products/${product.slug}`)}
        aria-label={`View ${product.name}`}
      />
      <div className={`product-media ${product.images[0].tone ?? "isolated"}`}>
        <img
          src={product.images[0].src}
          alt={product.images[0].alt}
          loading="lazy"
        />
      </div>
      <div className="product-card-body">
        <div className="card-heading">
          <p className="model">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <p>{product.tagline}</p>
        <ul
          className="card-capabilities"
          aria-label={`${product.name} capabilities`}
        >
          {capabilityPreview.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="card-footer">
          <span>{product.name}</span>
          <a
            href={appPath(`/products/${product.slug}`)}
            onClick={(event) => (
              event.preventDefault(),
              navigate(`/products/${product.slug}`)
            )}
          >
            Explore details <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}

function HomePage() {
  const featured = products.find((product) => product.slug === "a1-pro")!;
  const [heroSlide, setHeroSlide] = useState(0);
  const heroProduct = products[heroSlide % products.length];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroSlide((slide) => (slide + 1) % products.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, []);

  const moveHeroSlide = (delta: number) => {
    setHeroSlide(
      (slide) => (slide + delta + products.length) % products.length,
    );
  };

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Premium precision dental technology</p>
          <h1>DP Dental</h1>
          <p className="hero-line">Dental Quality You Can Trust</p>
          <p>
            Precision handpieces, air turbines, low speed kits, and endodontic
            activation technology presented for clear professional evaluation.
          </p>
          <div className="hero-actions">
            <a
              className="button primary"
              href={appPath("/products")}
              onClick={(event) => (
                event.preventDefault(),
                navigate("/products")
              )}
            >
              Explore Products <ArrowRight size={17} />
            </a>
            <a
              className="button secondary"
              href="#contact"
              onClick={(event) => (
                event.preventDefault(),
                scrollToSection("#contact")
              )}
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="hero-product" aria-label="Featured DP Dental product">
          <div className="hero-product-stage">
            <img
              key={heroProduct.slug}
              src={heroProduct.images[0].src}
              alt={heroProduct.images[0].alt}
            />
            <span className="hero-spec bottom">{heroProduct.name}</span>
            <button
              className="hero-slider-control previous"
              aria-label="Show previous product"
              onClick={() => moveHeroSlide(-1)}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="hero-slider-control next"
              aria-label="Show next product"
              onClick={() => moveHeroSlide(1)}
            >
              <ChevronRight size={22} />
            </button>
            <div className="hero-slider-dots" aria-label="Homepage product slider">
              {products.map((product, index) => (
                <button
                  key={product.slug}
                  className={index === heroSlide ? "is-active" : ""}
                  aria-label={`Show ${product.name}`}
                  aria-current={index === heroSlide ? "true" : undefined}
                  onClick={() => setHeroSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="product-overview" id="products">
        <SectionHeading
          kicker="Product Collection"
          title="Dental equipment portfolio"
          copy="A clean overview of DP Dental air turbines, low speed kits, and endo activation products organized for professional product evaluation."
        />
        <div className="product-categories">
          {productGroups.map((group) => (
            <section
              className="product-category"
              key={group.title}
              aria-labelledby={`${groupId(group.title)}-title`}
            >
              <h3 id={`${groupId(group.title)}-title`}>{group.title}</h3>
              <div className="product-grid">
                {getGroupProducts(group).map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section
        className="featured"
        style={{ "--accent": featured.accent } as React.CSSProperties}
      >
        <div className="featured-image">
          <img
            src={featured.images[0].src}
            alt={featured.images[0].alt}
            loading="lazy"
          />
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
          <button
            className="button primary"
            onClick={() => navigate("/products/a1-pro")}
          >
            View A1 pro Details <ArrowRight size={17} />
          </button>
        </div>
      </section>

      <section className="technology" id="technology">
        <SectionHeading
          kicker="Product Technology"
          title="Clinical performance highlights"
          copy="Specific DP product capabilities across air turbines, low speed kits, and the A1 pro Endo Activator."
        />
        <div className="tech-grid">
          <Tech
            icon={<Sparkles />}
            title="Visibility"
            copy="A-RING and A-PRO use ring LED or SMD LED lighting for clearer operating visibility."
          />
          <Tech
            icon={<ShieldCheck />}
            title="Infection control"
            copy="Selected turbines list zero-retraction head systems and autoclavable construction."
          />
          <Tech
            icon={<SprayCan />}
            title="Spray options"
            copy="The range covers triple spray, 4 water spray, internal water, and external water kits."
          />
          <Tech
            icon={<Zap />}
            title="Endo activation"
            copy="A1 pro adds brushless motor activation, rechargeable battery power, and LCD mode feedback."
          />
        </div>
      </section>

      <AboutSection />
      <CTASection />
    </>
  );
}

function ProductsPage({ selectedCategoryId }: { selectedCategoryId?: string }) {
  const matchedGroups = productGroups.filter(
    (group) =>
      !selectedCategoryId || groupId(group.title) === selectedCategoryId,
  );
  const visibleGroups =
    matchedGroups.length > 0 ? matchedGroups : productGroups;
  const visibleProductsCount = visibleGroups.reduce(
    (count, group) => count + getGroupProducts(group).length,
    0,
  );

  useEffect(() => {
    document.title = "Products | DP Dental";
    return () => {
      document.title = "DP Dental | Dental Quality You Can Trust";
    };
  }, []);

  return (
    <>
      <section className="products-page-hero">
        <div className="products-page-copy">
          <p className="eyebrow">Product Catalogue</p>
          <h1>Products</h1>
          <p className="hero-line">
            Explore DP Dental equipment by clinical category.
          </p>
          <div className="catalogue-stats" aria-label="Catalogue summary">
            <span>
              <strong>{visibleProductsCount}</strong>
              {selectedCategoryId ? "Shown" : "Products"}
            </span>
            <span>
              <strong>{visibleGroups.length}</strong>
              {selectedCategoryId ? "Category" : "Categories"}
            </span>
            <span>
              <strong>4</strong>
              Workflows
            </span>
          </div>
        </div>
        <div
          className="products-hero-board"
          aria-label="Product category shortcuts"
        >
          {productGroups.map((group) => {
            const groupProducts = getGroupProducts(group);
            return (
              <a
                key={group.title}
                href={appPath(`/products?category=${groupId(group.title)}`)}
                onClick={(event) => {
                  event.preventDefault();
                  navigateToCategory(groupId(group.title));
                }}
              >
                <span>{group.title}</span>
                <strong>{groupProducts.length} products</strong>
              </a>
            );
          })}
        </div>
      </section>

      <section className="catalogue-layout">
        <aside className="catalogue-sidebar" aria-label="Product categories">
          <p>Categories</p>
          <a
            className={!selectedCategoryId ? "is-active" : ""}
            href={appPath("/products")}
            onClick={(event) => (event.preventDefault(), navigate("/products"))}
          >
            All products
          </a>
          {productGroups.map((group) => (
            <a
              className={
                selectedCategoryId === groupId(group.title) ? "is-active" : ""
              }
              key={group.title}
              href={appPath(`/products?category=${groupId(group.title)}`)}
              onClick={(event) => {
                event.preventDefault();
                navigateToCategory(groupId(group.title));
              }}
            >
              {group.title}
            </a>
          ))}
        </aside>

        <div className="catalogue-sections" id="catalogue-results">
          {visibleGroups.map((group, index) => {
            const groupProducts = getGroupProducts(group);
            const featureProduct = groupProducts[0];

            return (
              <section
                className="catalogue-category"
                id={groupId(group.title)}
                key={group.title}
                style={
                  {
                    "--accent": featureProduct?.accent ?? "var(--gold)",
                  } as React.CSSProperties
                }
              >
                <div className="catalogue-category-header">
                  <div>
                    <p className="eyebrow">Category {index + 1}</p>
                    <h2>{group.title}</h2>
                    <span>{group.copy}</span>
                  </div>
                  <div
                    className="category-metrics"
                    aria-label={`${group.title} summary`}
                  >
                    <span>
                      <PackageCheck size={18} />
                      {groupProducts.length} products
                    </span>
                    <span>
                      <Gauge size={18} />
                      Professional range
                    </span>
                  </div>
                </div>

                <div className="catalogue-product-list">
                  {groupProducts.map((product) => (
                    <article className="catalogue-product" key={product.slug}>
                      <button
                        className="catalogue-hit"
                        onClick={() => navigate(`/products/${product.slug}`)}
                        aria-label={`View ${product.name}`}
                      />
                      <div
                        className={`catalogue-product-image ${product.images[0].tone ?? "isolated"}`}
                      >
                        <img
                          src={product.images[0].src}
                          alt={product.images[0].alt}
                          loading="lazy"
                        />
                      </div>
                      <div className="catalogue-product-copy">
                        <p>{product.category}</p>
                        <h3>{product.name}</h3>
                        <span>{product.tagline}</span>
                        <dl>
                          <div>
                            <dt>Model</dt>
                            <dd>{product.name}</dd>
                          </div>
                          <div>
                            <dt>Focus</dt>
                            <dd>{product.features[0]}</dd>
                          </div>
                        </dl>
                      </div>
                      <div className="catalogue-product-actions">
                        <a
                          href={appPath(`/products/${product.slug}`)}
                          onClick={(event) => (
                            event.preventDefault(),
                            navigate(`/products/${product.slug}`)
                          )}
                        >
                          Details <ArrowRight size={16} />
                        </a>
                        <a
                          href={whatsappHref(
                            `Hello DP Dental, I am interested in ${product.name}. Please send product details and availability.`,
                          )}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Ask <MessageCircle size={16} />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <CTASection />
    </>
  );
}

function Tech({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
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
    setActive(
      (index) =>
        (index + delta + product.images.length) % product.images.length,
    );
  };

  return (
    <div
      className="gallery"
      style={{ "--accent": product.accent } as React.CSSProperties}
    >
      <div className={`gallery-stage ${current.tone ?? "isolated"}`}>
        <img src={current.src} alt={current.alt} />
        {product.images.length > 1 ? (
          <>
            <button
              className="icon-button gallery-prev"
              aria-label="Previous image"
              onClick={() => move(-1)}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="icon-button gallery-next"
              aria-label="Next image"
              onClick={() => move(1)}
            >
              <ChevronRight size={22} />
            </button>
          </>
        ) : null}
      </div>
      {product.images.length > 1 ? (
        <div
          className="thumbs"
          role="tablist"
          aria-label={`${product.name} image gallery`}
        >
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
  const related = product.relatedProducts
    .map((slug) => getProduct(slug))
    .filter(Boolean) as Product[];

  useEffect(() => {
    document.title = `${product.name} | DP Dental`;
    return () => {
      document.title = "DP Dental | Dental Quality You Can Trust";
    };
  }, [product]);

  return (
    <>
      <section
        className="detail-hero"
        style={{ "--accent": product.accent } as React.CSSProperties}
      >
        <div className="breadcrumb">
          <a
            href={appPath("/products")}
            onClick={(event) => (event.preventDefault(), navigate("/products"))}
          >
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
              <span>Model: {product.name}</span>
              <span>{product.category}</span>
              {product.kitType ? <span>{product.kitType}</span> : null}
            </div>
            <a
              className="button primary detail-contact"
              href={whatsappHref(
                `Hello DP Dental, I am interested in ${product.name} (${product.name}). Please send product details, availability, and catalogue support.`,
              )}
              target="_blank"
              rel="noreferrer"
            >
              Ask about {product.name} <MessageCircle size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <div>
          <SectionHeading kicker="Core Features" title={`${product.name}`} />
          <div className="feature-list">
            {product.features.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
        </div>
        <SpecificationsTable product={product} />
      </section>

      <section className="related-products">
        <SectionHeading
          kicker="Related Products"
          title="Continue exploring DP Dental"
        />
        <div className="product-grid three">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
      <CTASection key={product.slug} selectedProduct={product} />
    </>
  );
}

function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="about-content">
        <p className="eyebrow">About DP Dental</p>
        <h2>Precision engineering for modern dentistry.</h2>
        <p>
          Founded in 2024, DP is a specialized dental equipment brand that
          combines precision engineering, high-quality manufacturing, and modern
          design to deliver reliable performance for the demands of modern
          dentistry.
        </p>
      </div>
      <div className="about-points" aria-label="DP Dental product focus">
        <span>Air turbines</span>
        <span>Low speed kits</span>
        <span>Endo Activator</span>
        <span>Clinical precision</span>
      </div>
    </section>
  );
}

function CTASection({ selectedProduct }: { selectedProduct?: Product }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    product: selectedProduct
      ? `${selectedProduct.name} (${selectedProduct.name})`
      : "",
    message: selectedProduct
      ? `I am interested in ${selectedProduct.name} (${selectedProduct.name}). Please send product details and availability.`
      : "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFormStatus("idle");
  };

  const buildMessageLines = () =>
    [
      "Hello DP Dental, I would like product information.",
      form.name ? `Name: ${form.name}` : "",
      form.phone ? `Phone / WhatsApp: ${form.phone}` : "",
      form.email ? `Email: ${form.email}` : "",
      form.product ? `Interested product: ${form.product}` : "",
      form.message ? `Message: ${form.message}` : "",
    ].filter(Boolean);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");

    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        product: form.product,
        message: form.message,
        _subject: `DP Dental inquiry${form.product ? ` - ${form.product}` : ""}`,
      }),
    });

    if (!response.ok) {
      setFormStatus("error");
      return;
    }

    setFormStatus("success");
  };

  const whatsAppMessage = buildMessageLines().join("\n");

  return (
    <section className="cta" id="contact">
      <div className="cta-copy">
        <p className="eyebrow">Contact</p>
        <h2>Interested in DP Dental products?</h2>
        <p>
          Request product information, availability, and catalogue support for
          the DP dental equipment collection.
        </p>
        <div className="contact-methods" aria-label="DP Dental contact methods">
          <a href={`mailto:${contactEmail}`}>
            <Mail size={18} />
            {contactEmail}
          </a>
          <a href={`mailto:${contactEmail2}`}>
            <Mail size={18} />
            {contactEmail2}
          </a>
          <div>
            <MapPin size={18} />
            {contactLocation}
          </div>
        </div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <label>
          <span>Name</span>
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            name="name"
            autoComplete="name"
          />
        </label>
        <label>
          <span>Phone or WhatsApp</span>
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            name="phone"
            autoComplete="tel"
          />
        </label>
        <label>
          <span>Email</span>
          <input
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <label>
          <span>Interested product</span>
          <select
            value={form.product}
            onChange={(event) => updateField("product", event.target.value)}
            name="product"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option
                key={product.slug}
                value={`${product.name} (${product.name})`}
              >
                {product.name} ({product.name})
              </option>
            ))}
          </select>
        </label>
        <label className="message-field">
          <span>Message</span>
          <textarea
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            name="message"
            rows={4}
          />
        </label>
        {formStatus === "success" ? (
          <p className="form-status success">
            Thanks. Your inquiry was sent to {contactEmail}.
          </p>
        ) : null}
        {formStatus === "error" ? (
          <p className="form-status error">
            The email could not be sent. Please try again or use WhatsApp.
          </p>
        ) : null}
        <button
          className="button primary"
          type="submit"
          disabled={formStatus === "submitting"}
        >
          {formStatus === "submitting" ? "Sending..." : "Send Email Inquiry"}{" "}
          <ArrowRight size={17} />
        </button>
        <a
          className="button whatsapp-secondary"
          href={whatsappHref(whatsAppMessage)}
          target="_blank"
          rel="noreferrer"
        >
          Send WhatsApp Message <MessageCircle size={17} />
        </a>
      </form>
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
  const routePath = path.split("?")[0];
  const selectedCategoryId =
    new URLSearchParams(path.split("?")[1] ?? "").get("category") ?? undefined;
  const product = useMemo(() => {
    const match = routePath.match(/^\/products\/([^/]+)$/);
    return match ? getProduct(match[1]) : undefined;
  }, [routePath]);

  return (
    <>
      <Header />
      <main>
        {routePath.startsWith("/products/") ? (
          product ? (
            <ProductPage product={product} />
          ) : (
            <NotFound />
          )
        ) : routePath === "/products" ? (
          <ProductsPage selectedCategoryId={selectedCategoryId} />
        ) : (
          <HomePage />
        )}
      </main>
      <footer className="footer">
        <img
          src={assetPath("assets/brand/dp-logo-transparent.png")}
          alt="DP Dental logo"
        />
        <p>Dental Quality You Can Trust</p>
        <p className="footer-legal">
          &copy; 2026 DP Dental. All rights reserved.
        </p>
        <nav aria-label="Footer navigation">
          {productGroups.map((group) => (
            <div className="footer-product-group" key={group.title}>
              <h2>{group.title}</h2>
              <div>
                {getGroupProducts(group).map((productItem) => (
                  <a
                    key={productItem.slug}
                    href={appPath(`/products/${productItem.slug}`)}
                    onClick={(event) => (
                      event.preventDefault(),
                      navigate(`/products/${productItem.slug}`)
                    )}
                  >
                    {productItem.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </footer>
    </>
  );
}
