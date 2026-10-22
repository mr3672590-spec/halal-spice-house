
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  ShoppingBasket,
  Tag,
} from "lucide-react";

import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  // Checkout.jsx-এ delivery charge-এর নিয়মের সঙ্গে মিলিয়ে নিও।
  const freeDeliveryMinimum = 3000;
  const deliveryCharge = subtotal === 0 || subtotal >= freeDeliveryMinimum ? 0 : 100;
  const total = subtotal + deliveryCharge;

  const formatPrice = (price) =>
    `৳${Number(price || 0).toLocaleString("en-BD")}`;

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#fffdf8] px-4 py-12">
        <div className="w-full max-w-lg rounded-3xl border border-amber-100 bg-white px-6 py-12 text-center shadow-sm sm:px-12">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-50">
            <ShoppingBag size={42} className="text-amber-800" />
          </div>

          <h1 className="mt-6 text-2xl font-black text-stone-900 sm:text-3xl">
            আপনার কার্ট খালি!
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-stone-500">
            আপনার পছন্দের মসলা ও প্রয়োজনীয় পণ্য কার্টে যোগ করে কেনাকাটা শুরু করুন।
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-amber-900"
          >
            <ShoppingBasket size={19} />
            কেনাকাটা শুরু করুন
            <ArrowRight size={17} />
          </Link>

          <div className="mt-5">
            <Link
              to="/"
              className="text-sm font-semibold text-stone-500 transition hover:text-amber-800"
            >
              <span className="inline-flex items-center gap-1">
                <ArrowLeft size={15} />
                হোম পেজে ফিরে যান
              </span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffdf8]">
      {/* Page Header */}
      <section className="border-b border-amber-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <Link
            to="/shop"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-amber-800"
          >
            <ArrowLeft size={17} />
            কেনাকাটা চালিয়ে যান
          </Link>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                SPICE HOUSE
              </p>

              <h1 className="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">
                আপনার শপিং কার্ট
              </h1>

              <p className="mt-2 text-sm text-stone-500">
                আপনার পছন্দের পণ্যগুলো এক জায়গায়।
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-900">
              <ShoppingBag size={17} />
              {cart.reduce(
                (count, item) => count + (Number(item.quantity) || 1),
                0
              )}{" "}
              টি পণ্য
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_370px]">
          {/* Cart Items */}
          <div className="min-w-0">
            <div className="mb-4 hidden grid-cols-[minmax(0,1fr)_110px_130px] gap-4 rounded-xl bg-amber-50 px-5 py-4 text-xs font-bold uppercase tracking-wide text-stone-600 sm:grid">
              <span>পণ্যের বিবরণ</span>
              <span className="text-center">পরিমাণ</span>
              <span className="text-right">মোট দাম</span>
            </div>

            <div className="space-y-4">
              {cart.map((item) => {
                const quantity = Number(item.quantity) || 1;
                const price = Number(item.price) || 0;
                const itemTotal = price * quantity;

                return (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-amber-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_110px_130px] sm:items-center sm:gap-4">
                      {/* Product */}
                      <div className="flex min-w-0 items-start gap-4">
                        <Link
                          to={`/product/${item.id}`}
                          className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-amber-50 sm:h-28 sm:w-28"
                        >
                          <img
                            src={item.image || "/images/hero-1.jpg"}
                            alt={item.name}
                            className="h-full w-full object-cover transition duration-300 hover:scale-105"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = "/images/hero-1.jpg";
                            }}
                          />
                        </Link>

                        <div className="min-w-0 flex-1">
                          {item.category && (
                            <span className="inline-block rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800 sm:text-xs">
                              {item.category}
                            </span>
                          )}

                          <Link
                            to={`/product/${item.id}`}
                            className="mt-2 block break-words text-sm font-extrabold leading-6 text-stone-900 transition hover:text-amber-800 sm:text-base"
                          >
                            {item.name}
                          </Link>

                          {item.weight && (
                            <p className="mt-1 text-xs text-stone-500">
                              ওজন: {item.weight}
                            </p>
                          )}

                          <p className="mt-2 text-sm font-bold text-amber-900">
                            {formatPrice(price)}
                          </p>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 transition hover:text-red-800"
                          >
                            <Trash2 size={14} />
                            পণ্য সরান
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-between gap-3 sm:justify-center">
                        <span className="text-xs font-semibold text-stone-500 sm:hidden">
                          পরিমাণ
                        </span>

                        <div className="inline-flex items-center overflow-hidden rounded-lg border border-amber-200">
                          <button
                            type="button"
                            onClick={() => {
                              if (quantity <= 1) {
                                removeFromCart(item.id);
                              } else {
                                updateQuantity(item.id, quantity - 1);
                              }
                            }}
                            aria-label={`${item.name} এর পরিমাণ কমান`}
                            className="flex h-9 w-9 items-center justify-center text-stone-700 transition hover:bg-amber-50"
                          >
                            <Minus size={14} />
                          </button>

                          <span
                            className="flex h-9 min-w-9 items-center justify-center border-x border-amber-100 px-2 text-sm font-bold text-stone-900"
                            aria-live="polite"
                          >
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, quantity + 1)
                            }
                            disabled={quantity >= 99}
                            aria-label={`${item.name} এর পরিমাণ বাড়ান`}
                            className="flex h-9 w-9 items-center justify-center text-stone-700 transition hover:bg-amber-50 disabled:opacity-40"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="flex items-center justify-between border-t border-dashed border-amber-100 pt-3 sm:block sm:border-0 sm:pt-0 sm:text-right">
                        <span className="text-xs font-semibold text-stone-500 sm:hidden">
                          পণ্যের মোট দাম
                        </span>

                        <span className="text-base font-black text-stone-900">
                          {formatPrice(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm font-bold text-amber-900 transition hover:bg-amber-50"
              >
                <ArrowLeft size={17} />
                আরও পণ্য কিনুন
              </Link>

              <p className="text-xs text-stone-500">
                পণ্যের পরিমাণ পরিবর্তন করলে দাম আপডেট হবে।
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <aside className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-xl font-black text-stone-900">
              অর্ডারের সারাংশ
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Checkout-এর আগে আপনার মোট দাম দেখে নিন।
            </p>

            <div className="my-5 h-px bg-amber-100" />

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-stone-600">পণ্যের দাম</span>
                <span className="font-bold text-stone-900">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <span className="text-stone-600">ডেলিভারি চার্জ</span>

                <div className="text-right">
                  <span
                    className={`font-bold ${
                      deliveryCharge === 0
                        ? "text-emerald-700"
                        : "text-stone-900"
                    }`}
                  >
                    {deliveryCharge === 0
                      ? "ফ্রি"
                      : formatPrice(deliveryCharge)}
                  </span>

                  {deliveryCharge > 0 && (
                    <p className="mt-1 max-w-40 text-[11px] leading-5 text-stone-500">
                      ৳3,000 বা তার বেশি কেনাকাটায় ফ্রি ডেলিভারি।
                    </p>
                  )}
                </div>
              </div>

              {deliveryCharge === 0 && subtotal >= freeDeliveryMinimum && (
                <div className="flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-xs leading-5 text-emerald-800">
                  <Tag size={16} className="mt-0.5 shrink-0" />
                  অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন।
                </div>
              )}
            </div>

            <div className="my-5 h-px bg-amber-100" />

            <div className="flex items-center justify-between gap-3">
              <span className="text-base font-bold text-stone-900">
                সর্বমোট
              </span>

              <span className="text-2xl font-black text-amber-900">
                {formatPrice(total)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-800 px-5 py-4 text-sm font-bold text-white shadow-md shadow-amber-900/10 transition hover:bg-amber-900 active:scale-[0.99]"
            >
              Checkout করুন
              <ArrowRight size={18} />
            </button>

            <div className="mt-4 flex items-start gap-2 rounded-xl bg-stone-50 p-3 text-xs leading-5 text-stone-600">
              <ShieldCheck
                size={17}
                className="mt-0.5 shrink-0 text-amber-800"
              />
              পরবর্তী ধাপে আপনার ঠিকানা ও পেমেন্ট পদ্ধতি নির্বাচন করুন।
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-500">
              <Truck size={16} />
              <span>ডেলিভারির তথ্য Checkout-এ নিশ্চিত করুন</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
