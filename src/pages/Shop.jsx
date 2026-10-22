
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ShoppingBag,
  X,
  Leaf,
  ArrowRight,
  PackageSearch,
  ShieldCheck,
  Truck,
} from "lucide-react";

import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );
  const [activeCategory, setActiveCategory] = useState("সব পণ্য");
  const [sortBy, setSortBy] = useState("featured");

  const productList = Array.isArray(products) ? products : [];

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        productList
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return ["সব পণ্য", ...uniqueCategories];
  }, [productList]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = productList.filter((product) => {
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

    if (sortBy === "price-low") {
      result = [...result].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else if (sortBy === "price-high") {
      result = [...result].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        String(a.name || "").localeCompare(
          String(b.name || ""),
          "bn"
        )
      );
    }

    return result;
  }, [productList, search, activeCategory, sortBy]);

  const handleSearch = (value) => {
    setSearch(value);

    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("সব পণ্য");
    setSortBy("featured");
    setSearchParams({});
  };

  return (
    <main className="min-h-screen bg-[#fffdf8]">
      {/* Full Background Image Hero Banner */}
      <section className="relative isolate flex min-h-[480px] items-center overflow-hidden bg-[#21170f] sm:min-h-[560px] lg:min-h-[620px]">
        <img
          src="/images/hero-2.jpg"
          alt="Spice House খাঁটি মসলা সংগ্রহ"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        {/* Dark overlay for readable text */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/10" />

        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-black/25 px-4 py-2 text-xs font-bold tracking-widest text-amber-300 backdrop-blur-sm">
              <Leaf size={16} />
              SPICE HOUSE COLLECTION
            </div>

            <h1 className="text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">
              প্রতিটি রান্নায়
              <span className="mt-2 block text-amber-400">
                খাঁটি স্বাদের ছোঁয়া
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-stone-200 sm:text-base sm:leading-8">
              আপনার রান্নাঘরের জন্য বেছে নিন মানসম্মত মসলা
              ও প্রয়োজনীয় পণ্য। প্রতিটি রান্নায় যোগ করুন
              সুগন্ধ, স্বাদ আর ভালোবাসা।
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#shop-products"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-extrabold text-stone-950 shadow-lg transition hover:bg-amber-300"
              >
                এখনই কিনুন
                <ArrowRight size={18} />
              </a>

              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                হোম পেজ
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4 text-xs text-white/90 sm:text-sm">
              <div className="flex items-center gap-2">
                <Leaf size={19} className="text-amber-400" />
                মানসম্মত পণ্য
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck size={19} className="text-amber-400" />
                নিরাপদ কেনাকাটা
              </div>

              <div className="flex items-center gap-2">
                <Truck size={19} className="text-amber-400" />
                সহজ ডেলিভারি
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section
        id="shop-products"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
      >
        {/* Search and Sort */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex w-full items-center gap-3 rounded-2xl border border-amber-200 bg-white px-4 py-2 shadow-sm transition focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-600/10 md:max-w-xl"
          >
            <Search
              size={21}
              className="shrink-0 text-amber-800"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              placeholder="পণ্যের নাম বা ক্যাটাগরি লিখুন..."
              aria-label="পণ্য খুঁজুন"
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-stone-800 outline-none placeholder:text-stone-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => handleSearch("")}
                aria-label="সার্চ মুছুন"
                className="cursor-pointer rounded-lg p-2 text-stone-500 hover:bg-amber-50 hover:text-amber-900"
              >
                <X size={17} />
              </button>
            )}
          </form>

          <label className="flex items-center gap-3 rounded-xl border border-amber-200 bg-white px-4 py-3">
            <ArrowUpDown
              size={18}
              className="shrink-0 text-amber-800"
            />

            <span className="shrink-0 text-sm font-semibold text-stone-700">
              সাজান:
            </span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="min-w-0 flex-1 cursor-pointer bg-transparent text-sm text-stone-800 outline-none"
            >
              <option value="featured">জনপ্রিয় পণ্য</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
              <option value="name">নাম অনুযায়ী</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
          {/* Category Sidebar */}
          <aside className="h-fit rounded-2xl border border-amber-100 bg-white p-5 shadow-sm lg:sticky lg:top-28">
            <div className="flex items-center gap-2 border-b border-amber-100 pb-4">
              <SlidersHorizontal
                size={19}
                className="text-amber-800"
              />
              <h2 className="font-bold text-stone-900">
                পণ্য ফিল্টার
              </h2>
            </div>

            <div className="pt-5">
              <h3 className="mb-3 text-sm font-bold text-stone-800">
                ক্যাটাগরি
              </h3>

              <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
                {categories.map((category) => {
                  const isActive = activeCategory === category;

                  const count =
                    category === "সব পণ্য"
                      ? productList.length
                      : productList.filter(
                          (product) =>
                            product.category === category
                        ).length;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={isActive}
                      className={`flex shrink-0 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition lg:w-full ${
                        isActive
                          ? "bg-amber-800 text-white"
                          : "bg-[#fffdf8] text-stone-700 hover:bg-amber-50 hover:text-amber-900"
                      }`}
                    >
                      <span>{category}</span>
                      <span
                        className={`text-xs ${
                          isActive
                            ? "text-amber-100"
                            : "text-stone-400"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-amber-200 px-4 py-3 text-sm font-bold text-amber-900 transition hover:bg-amber-50"
            >
              <X size={16} />
              সব ফিল্টার মুছুন
            </button>
          </aside>

          {/* Products Area */}
          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-stone-900 sm:text-2xl">
                  {activeCategory === "সব পণ্য"
                    ? "সব পণ্য"
                    : activeCategory}
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                  {filteredProducts.length} টি পণ্য পাওয়া গেছে
                </p>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                <ShoppingBag size={15} />
                আপনার পছন্দ বেছে নিন
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id ?? product.name ?? index}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-amber-200 bg-white px-5 py-16 text-center">
                <PackageSearch
                  size={42}
                  className="mx-auto mb-4 text-amber-700"
                />

                <h3 className="text-xl font-bold text-stone-900">
                  কোনো পণ্য পাওয়া যায়নি
                </h3>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                  অন্য নাম দিয়ে খুঁজুন অথবা ক্যাটাগরি পরিবর্তন করুন।
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 cursor-pointer rounded-xl bg-amber-800 px-6 py-3 font-bold text-white transition hover:bg-amber-900"
                >
                  সব পণ্য দেখুন
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
