
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Leaf,
} from "lucide-react";

const slides = [
  {
    image: "/images/hero-1.jpg",
    eyebrow: "SPICE HOUSE COLLECTION",
    title: "প্রতিটি রান্নায়\nখাঁটি স্বাদের ছোঁয়া",
    description:
      "আপনার রান্নাঘরের জন্য বেছে নিন সুগন্ধি মসলা। প্রতিটি খাবারে আনুন স্বাদ ও ঐতিহ্যের সুন্দর মেলবন্ধন।",
    button: "সব মসলা দেখুন",
    badge: "স্বাদের বিশ্বস্ত ঠিকানা",
  },
  {
    image: "/images/hero-2.jpg",
    eyebrow: "PURE FLAVOUR, EVERY DAY",
    title: "মসলার সুবাসে\nরান্না হোক আনন্দময়",
    description:
      "হলুদ, মরিচ, জিরা, ধনিয়া থেকে শুরু করে পছন্দের মসলা—সব এক জায়গায়।",
    button: "পছন্দের মসলা কিনুন",
    badge: "আপনার রান্নাঘরের সঙ্গী",
  },
  {
    image: "/images/hero-3.jpg",
    eyebrow: "BRING HOME THE TASTE",
    title: "ঐতিহ্যের স্বাদ\nথাকুক প্রতিটি পদে",
    description:
      "প্রতিদিনের রান্নায় স্বাদের নতুন মাত্রা যোগ করতে ঘুরে দেখুন Spice House-এর কালেকশন।",
    button: "এখনই কেনাকাটা করুন",
    badge: "Spice House — Taste of Tradition",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  const activeSlide = slides[activeIndex];
  const imageFailed = failedImages.includes(activeSlide.image);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#21170f]"
      aria-label="Spice House featured collection"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {!imageFailed && (
          <img
            key={activeSlide.image}
            src={activeSlide.image}
            alt="Spice House মসলা কালেকশন"
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={() => {
              console.error(
                "Hero image failed to load:",
                activeSlide.image
              );

              setFailedImages((current) =>
                current.includes(activeSlide.image)
                  ? current
                  : [...current, activeSlide.image]
              );
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#1b120c]/90 via-[#21170f]/65 to-[#21170f]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#21170f]/45 via-transparent to-black/10" />
      </div>

      {/* Hero content */}
      <div className="mx-auto flex min-h-[520px] max-w-7xl items-center px-5 py-20 sm:min-h-[570px] sm:px-8 md:min-h-[620px] lg:min-h-[650px] lg:px-12">
        <div className="max-w-2xl text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-black/20 px-4 py-2 backdrop-blur-sm">
            <Leaf size={15} className="text-amber-300" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200 sm:text-xs">
              {activeSlide.eyebrow}
            </span>
          </div>

          <p className="mb-4 text-sm font-medium text-amber-200 sm:text-base">
            {activeSlide.badge}
          </p>

          <h1 className="whitespace-pre-line text-4xl font-black leading-[1.25] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {activeSlide.title}
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-stone-200 sm:text-base sm:leading-8">
            {activeSlide.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-amber-500 sm:px-7 sm:text-base"
            >
              {activeSlide.button}
              <ArrowUpRight size={19} />
            </Link>

            <Link
              to="/about"
              className="rounded-xl border border-white/35 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 sm:px-6"
            >
              আমাদের সম্পর্কে
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs text-stone-300">
            <span className="h-px w-10 bg-amber-400" />
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </span>
            <span className="uppercase tracking-[0.15em]">
              Discover Our Flavours
            </span>
          </div>
        </div>
      </div>

      {/* Previous */}
      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:border-amber-400 hover:bg-amber-700 sm:flex lg:left-6"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur-sm transition hover:border-amber-400 hover:bg-amber-700 sm:flex lg:right-6"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-7">
        {slides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-9 bg-amber-400"
                : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
