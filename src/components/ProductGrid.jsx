
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Flame,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

import ProductCard from "./ProductCard";
import products from "../data/products";

export default function ProductGrid({
  title = "আমাদের জনপ্রিয় মসলা",
  subtitle = "আপনার রান্নাঘরের জন্য বেছে নিন পছন্দের মসলা।",
  limit,
  showFilters = true,
  showViewAll = true,
}) {
  const [activeCategory, setActiveCategory] = useState("সব পণ্য");

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products.map((product) => product.category).filter(Boolean)
      ),
    ];

    return ["সব পণ্য", ...uniqueCategories];
  }, []);

  const filteredProducts = useMemo(() => {
    const filtered =
      activeCategory === "সব পণ্য"
        ? products
        : products.filter(
            (product) => product.category === activeCategory
          );

    return typeof limit === "number"
      ? filtered.slice(0, limit)
      : filtered;
  }, [activeCategory, limit]);

  return (
    <section className="bg-[#fffdf8] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900">
              <Sparkles size={14} />
              SPICE HOUSE COLLECTION
            </div>

            <h2 className="text-2xl font-black tracking-tight text-stone-900 sm:text-3xl lg:text-4xl">
              {title}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
              {subtitle}
            </p>
          </div>

          {showViewAll && (
            <Link
              to="/shop"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-amber-800 px-5 py-3 text-sm font-bold text-amber-900 transition hover:bg-amber-800 hover:text-white"
            >
              সব পণ্য দেখুন
              <ArrowRight size={17} />
            </Link>
          )}
        </div>

        {/* Category Filter */}
        {showFilters && categories.length > 1 && (
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-stone-500">
              <SlidersHorizontal size={15} />
              ক্যাটাগরি অনুযায়ী পণ্য বেছে নিন
            </div>

            <div className="flex gap-2 overflow-x-auto pb-3">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                      isActive
                        ? "border-amber-800 bg-amber-800 text-white shadow-sm"
                        : "border-amber-200 bg-white text-stone-700 hover:border-amber-700 hover:text-amber-900"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Product Count */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-stone-600">
            মোট{" "}
            <span className="font-bold text-amber-900">
              {filteredProducts.length}
            </span>{" "}
            টি পণ্য
          </p>

          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
            <Flame size={15} />
            রান্নার প্রয়োজনীয় পণ্য
          </span>
        </div>

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-amber-200 bg-white px-5 py-16 text-center">
            <p className="text-lg font-bold text-stone-800">
              এই ক্যাটাগরিতে কোনো পণ্য নেই
            </p>

            <p className="mt-2 text-sm text-stone-500">
              অন্য ক্যাটাগরি নির্বাচন করে দেখুন।
            </p>

            <button
              type="button"
              onClick={() => setActiveCategory("সব পণ্য")}
              className="mt-5 rounded-xl bg-amber-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-900"
            >
              সব পণ্য দেখুন
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
