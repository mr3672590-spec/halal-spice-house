
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Minus,
  Plus,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Leaf,
  Home,
} from "lucide-react";

import products from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#fffdf8] px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-amber-100 bg-white p-8 text-center shadow-lg sm:p-12">
          <ShoppingBag
            size={48}
            className="mx-auto mb-5 text-amber-700"
          />

          <h1 className="text-2xl font-black text-stone-900">
            পণ্যটি পাওয়া যায়নি
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            পণ্যটি মুছে ফেলা হয়ে থাকতে পারে অথবা লিংকটি সঠিক নয়।
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-800 px-6 py-3 font-bold text-white transition hover:bg-amber-900"
          >
            <ArrowLeft size={18} />
            সব পণ্য দেখুন
          </Link>
        </div>
      </main>
    );
  }

  const price = Number(product.price) || 0;
  const oldPrice = Number(product.oldPrice) || 0;

  const discount =
    oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  const image = product.image || "/images/hero-1.jpg";

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        price,
        image,
      },
      quantity
    );

    setAdded(true);
  };

  const relatedProducts = products
    .filter(
      (item) =>
        String(item.id) !== String(product.id) &&
        item.category === product.category
    )
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#fffdf8]">
      {/* Breadcrumb */}
      <div className="border-b border-amber-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-stone-500 sm:px-6 sm:text-sm lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1 transition hover:text-amber-800"
          >
            <Home size={15} />
            হোম
          </Link>

          <span>/</span>

          <Link
            to="/shop"
            className="transition hover:text-amber-800"
          >
            সকল পণ্য
          </Link>

          <span>/</span>

          <span className="max-w-[180px] truncate font-semibold text-amber-900 sm:max-w-xs">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          to="/shop"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-stone-600 transition hover:text-amber-800"
        >
          <ArrowLeft size={17} />
          শপে ফিরে যান
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-3xl border border-amber-100 bg-white">
            <div className="aspect-square overflow-hidden bg-[#f8f4eb]">
              <img
                src={image}
                alt={product.name}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/images/hero-1.jpg";
                }}
              />
            </div>

            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-md">
                {discount}% ছাড়
              </span>
            )}

            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-4 py-2 text-xs font-bold text-amber-900 shadow-sm backdrop-blur">
              <Leaf size={15} />
              Spice House Collection
            </span>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            {product.category && (
              <span className="mb-4 w-fit rounded-full bg-amber-100 px-4 py-2 text-xs font-bold text-amber-900">
                {product.category}
              </span>
            )}

            <h1 className="text-3xl font-black leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            {product.rating != null && (
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-800">
                  <Star
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                  {product.rating}
                </span>

                <span className="text-xs text-stone-500">
                  ক্রেতাদের রেটিং
                </span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-black text-amber-900 sm:text-4xl">
                ৳{price.toLocaleString("en-BD")}
              </span>

              {oldPrice > price && (
                <span className="text-lg text-stone-400 line-through">
                  ৳{oldPrice.toLocaleString("en-BD")}
                </span>
              )}

              {discount > 0 && (
                <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
                  সাশ্রয় {`৳${(oldPrice - price).toLocaleString("en-BD")}`}
                </span>
              )}
            </div>

            {product.weight && (
              <p className="mt-3 text-sm text-stone-600">
                প্যাকেটের ওজন:{" "}
                <span className="font-bold text-stone-900">
                  {product.weight}
                </span>
              </p>
            )}

            <div className="my-6 h-px bg-amber-100" />

            <h2 className="text-base font-bold text-stone-900">
              পণ্যের বিবরণ
            </h2>

            <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-base">
              {product.description ||
                `${product.name} সম্পর্কে বিস্তারিত জানতে আমাদের সঙ্গে যোগাযোগ করুন।`}
            </p>

            {/* Quantity Selector */}
            <div className="mt-7">
              <p className="mb-3 text-sm font-bold text-stone-800">
                পরিমাণ নির্বাচন করুন
              </p>

              <div className="inline-flex items-center overflow-hidden rounded-xl border border-amber-200 bg-white">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  disabled={quantity <= 1}
                  aria-label="পরিমাণ কমান"
                  className="flex h-12 w-12 items-center justify-center text-stone-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={17} />
                </button>

                <span
                  className="flex h-12 min-w-12 items-center justify-center border-x border-amber-100 px-3 text-base font-bold text-stone-900"
                  aria-live="polite"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.min(99, current + 1))
                  }
                  disabled={quantity >= 99}
                  aria-label="পরিমাণ বাড়ান"
                  className="flex h-12 w-12 items-center justify-center text-stone-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={17} />
                </button>
              </div>

              <p className="mt-3 text-sm text-stone-500">
                মোট মূল্য:{" "}
                <span className="font-bold text-amber-900">
                  ৳{(price * quantity).toLocaleString("en-BD")}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-800 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-amber-900 active:scale-[0.98]"
              >
                {added ? <Check size={19} /> : <ShoppingBag size={19} />}
                {added ? "কার্টে যোগ হয়েছে" : "কার্টে যোগ করুন"}
              </button>

              <button
                type="button"
                onClick={() => {
                  handleAddToCart();
                  navigate("/cart");
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-amber-800 px-5 py-3.5 text-sm font-bold text-amber-900 transition hover:bg-amber-50 active:scale-[0.98]"
              >
                এখনই কিনুন
                <ArrowRight size={18} />
              </button>
            </div>

            {added && (
              <div
                role="status"
                className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
              >
                ✓ {product.name} — {quantity} টি কার্টে যোগ করা হয়েছে।
                <Link
                  to="/cart"
                  className="ml-1 font-bold underline underline-offset-2"
                >
                  কার্ট দেখুন
                </Link>
              </div>
            )}

            {/* Service Benefits */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-amber-100 pt-6 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <Truck size={21} className="shrink-0 text-amber-800" />
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    ডেলিভারি সুবিধা
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-stone-500">
                    ডেলিভারির তথ্য Checkout-এ দেখুন
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={21}
                  className="shrink-0 text-amber-800"
                />
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    সহজ অর্ডার
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-stone-500">
                    সহজে অর্ডার সম্পন্ন করুন
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RotateCcw
                  size={21}
                  className="shrink-0 text-amber-800"
                />
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    অর্ডার সহায়তা
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-stone-500">
                    প্রয়োজন হলে যোগাযোগ করুন
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-amber-100 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                  YOU MAY ALSO LIKE
                </p>

                <h2 className="text-2xl font-black text-stone-900 sm:text-3xl">
                  একই ক্যাটাগরির পণ্য
                </h2>
              </div>

              <Link
                to="/shop"
                className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-amber-900 hover:text-amber-600"
              >
                সব পণ্য
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  onClick={() => {
                    setQuantity(1);
                    setAdded(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group overflow-hidden rounded-2xl border border-amber-100 bg-[#fffdf8] transition hover:-translate-y-1 hover:shadow-lg sm:rounded-3xl"
                >
                  <div className="aspect-square overflow-hidden bg-amber-50">
                    <img
                      src={item.image || "/images/hero-1.jpg"}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="line-clamp-2 text-sm font-bold text-stone-900 group-hover:text-amber-800">
                      {item.name}
                    </h3>

                    <p className="mt-2 font-extrabold text-amber-900">
                      ৳{(Number(item.price) || 0).toLocaleString("en-BD")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
