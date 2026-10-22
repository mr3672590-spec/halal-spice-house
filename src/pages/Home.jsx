import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowRight,
  Leaf,
  PackageCheck,
  Truck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const categories = [
  {
    name: "সব পণ্য",
    image: "/images/hero-1.jpg",
    description: "আমাদের সম্পূর্ণ কালেকশন",
  },
  {
    name: "হলুদ",
    image: "/images/turmeric.jpg",
    description: "হলুদের প্রাকৃতিক রং",
  },
  {
    name: "মরিচ",
    image: "/images/chili.jpg",
    description: "ঝাল ও স্বাদের ছোঁয়া",
  },
  {
    name: "জিরা",
    image: "/images/cumin.jpg",
    description: "সুগন্ধি জিরার স্বাদ",
  },
  {
    name: "ধনিয়া",
    image: "/images/coriander.jpg",
    description: "প্রতিদিনের রান্নার সঙ্গী",
  },

  {
  name: "সরিষার তেল",
  image: "/images/mustard-oil.jpg",
  description: "খাঁটি সরিষার তেল, রান্নায় ঐতিহ্যবাহী স্বাদ",
},
  {
    name: "গরম মসলা",
    image: "/images/garam-masala.jpg",
    description: "মসলার দারুণ মিশ্রণ",
  },
];

const benefits = [
  {
    icon: Leaf,
    title: "বাছাই করা পণ্য",
    description: "আপনার পছন্দের মসলা এক জায়গায়",
  },
  {
    icon: PackageCheck,
    title: "সহজ অর্ডার",
    description: "সহজেই পছন্দের পণ্য অর্ডার করুন",
  },
  {
    icon: Truck,
    title: "ডেলিভারি সুবিধা",
    description: "আপনার ঠিকানায় পণ্য পৌঁছে দেওয়ার ব্যবস্থা",
  },
  {
    icon: ShieldCheck,
    title: "নিরাপদ কেনাকাটা",
    description: "সহজ ও সুবিধাজনক অর্ডার প্রক্রিয়া",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("সব পণ্য");

  const productList = Array.isArray(products) ? products : [];

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return productList.filter((product) => {
      const matchesCategory =
        activeCategory === "সব পণ্য" ||
        product.category === activeCategory;

      const searchableText = [
        product.name,
        product.category,
        product.description,
        product.weight,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        (!query || searchableText.includes(query))
      );
    });
  }, [productList, search, activeCategory]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fffdf8]">
      {/* Hero Banner / Slider */}
      <HeroSlider />

      {/* Benefits */}
      <section className="border-b border-amber-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 py-7 sm:px-6 md:grid-cols-4 lg:px-8">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
                <Icon size={21} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  {title}
                </h3>
                <p className="mt-1 text-xs leading-5 text-stone-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900">
                <Leaf size={14} />
                EXPLORE CATEGORIES
              </div>
              <h2 className="text-2xl font-black text-stone-900 sm:text-3xl lg:text-4xl">
                মসলার ক্যাটাগরি
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-600 sm:text-base">
                আপনার প্রয়োজন অনুযায়ী পছন্দের ক্যাটাগরি বেছে নিন।
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex w-fit items-center gap-2 text-sm font-bold text-amber-900 transition hover:text-amber-600"
            >
              সব পণ্য দেখুন <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => {
              const isActive = activeCategory === category.name;

              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.name);
                    setSearch("");
                    document.getElementById("products")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  aria-pressed={isActive}
                  className={`group overflow-hidden rounded-2xl border bg-white text-left transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:rounded-3xl ${
                    isActive
                      ? "border-amber-700 ring-2 ring-amber-700/15"
                      : "border-amber-100 hover:border-amber-300"
                  }`}
                >
                  <div className="aspect-square overflow-hidden bg-amber-50">
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/images/hero-1.jpg";
                      }}
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm font-bold text-stone-900 transition group-hover:text-amber-800 sm:text-base">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-[10px] leading-4 text-stone-500 sm:text-xs">
                      {category.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="scroll-mt-24 border-t border-amber-100 bg-[#faf6ee] px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-7">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900">
              <Sparkles size={14} />
              FIND YOUR FAVOURITES
            </div>

            <h2 className="text-2xl font-black text-stone-900 sm:text-3xl lg:text-4xl">
              {search.trim()
                ? "সার্চের ফলাফল"
                : activeCategory === "সব পণ্য"
                  ? "আমাদের সকল পণ্য"
                  : `${activeCategory} পণ্য`}
            </h2>

            <p className="mt-3 text-sm leading-6 text-stone-600 sm:text-base">
              {filteredProducts.length} টি পণ্য পাওয়া গেছে। পছন্দের মসলা খুঁজে নিন।
            </p>
          </div>

          {/* Search */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              document.getElementById("products")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="mb-8 flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-amber-200 bg-white p-2 shadow-sm focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-600/10"
          >
            <Search className="ml-2 shrink-0 text-amber-800" size={22} />
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setActiveCategory("সব পণ্য");
              }}
              placeholder="মসলার নাম লিখে খুঁজুন..."
              aria-label="মসলা খুঁজুন"
              className="min-w-0 flex-1 bg-transparent px-1 py-3 text-sm text-stone-800 outline-none placeholder:text-stone-400 sm:text-base"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-stone-500 hover:bg-amber-50 hover:text-amber-900"
              >
                মুছুন
              </button>
            )}
          </form>

          {/* Product Cards */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
              {filteredProducts.slice(0, 8).map((product, index) => (
                <ProductCard
                  key={product.id ?? product.name ?? index}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-amber-200 bg-white px-5 py-16 text-center">
              <Search className="mx-auto mb-4 text-amber-700" size={36} />
              <h3 className="text-lg font-bold text-stone-900">
                কোনো পণ্য পাওয়া যায়নি
              </h3>
              <p className="mt-2 text-sm text-stone-500">
                অন্য নামে সার্চ করুন অথবা সব পণ্য দেখুন।
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("সব পণ্য");
                }}
                className="mt-5 rounded-xl bg-amber-800 px-5 py-3 text-sm font-bold text-white hover:bg-amber-900"
              >
                সব পণ্য দেখুন
              </button>
            </div>
          )}

          {filteredProducts.length > 8 && (
            <div className="mt-9 text-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-800 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-amber-900"
              >
                আরও পণ্য দেখুন <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 rounded-3xl bg-[#21170f] p-7 text-white sm:p-10 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              Spice House
            </p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              রান্নার প্রয়োজনীয় মসলা এক জায়গায়
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-300">
              আপনার পছন্দের পণ্য বেছে নিন আমাদের কালেকশন থেকে।
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-amber-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-amber-500"
          >
            শপে যান <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}