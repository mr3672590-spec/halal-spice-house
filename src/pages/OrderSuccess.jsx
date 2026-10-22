
import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  ShoppingBag,
  ArrowRight,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  Home,
  ClipboardCheck,
} from "lucide-react";

export default function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order || location.state || {};

  const orderId =
    order.orderId ||
    order.orderNumber ||
    order.id ||
    null;

  const customer = order.customer || order;
  const items = Array.isArray(order.items)
    ? order.items
    : Array.isArray(order.cart)
      ? order.cart
      : [];

  const subtotal = Number(
    order.subtotal ??
      items.reduce(
        (sum, item) =>
          sum +
          (Number(item.price) || 0) *
            (Number(item.quantity) || 1),
        0
      )
  );

  const deliveryCharge = Number(
    order.deliveryCharge ?? order.delivery ?? 0
  );

  const total = Number(
    order.total ?? subtotal + deliveryCharge
  );

  const paymentMethod =
    order.paymentMethod ||
    order.payment ||
    "Cash on Delivery";

  const formatPrice = (amount) =>
    `৳${Number(amount || 0).toLocaleString("en-BD")}`;

  const formatPaymentMethod = (method) => {
    const normalized = String(method).toLowerCase();

    if (normalized.includes("bkash")) return "bKash";
    if (normalized.includes("nagad")) return "Nagad";

    if (
      normalized.includes("cod") ||
      normalized.includes("cash")
    ) {
      return "Cash on Delivery";
    }

    return method;
  };

  return (
    <main className="min-h-screen bg-[#fffdf8] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Success Header */}
        <section className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-[#2b1b11] px-5 py-10 text-center sm:px-10 sm:py-14">
            <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15 ring-8 ring-emerald-400/5">
              <CheckCircle2
                size={48}
                className="text-emerald-400"
                strokeWidth={1.8}
              />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-amber-300">
              SPICE HOUSE
            </p>

            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              {orderId
                ? "অর্ডার সফল হয়েছে!"
                : "অর্ডার কনফার্মেশন"}
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-stone-300 sm:text-base">
              {orderId
                ? "আপনার অর্ডারটি গ্রহণ করা হয়েছে। অর্ডারের তথ্য নিচে দেখে নিন।"
                : "আপনার অর্ডারের বিস্তারিত দেখতে নিচের তথ্যগুলো দেখুন। Checkout থেকে আসা অর্ডারের তথ্য এখানে দেখানো হবে।"}
            </p>

            {orderId && (
              <div className="relative mx-auto mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white">
                <ClipboardCheck
                  size={18}
                  className="text-amber-300"
                />
                <span className="text-stone-300">
                  অর্ডার আইডি:
                </span>
                <span className="font-extrabold">
                  {orderId}
                </span>
              </div>
            )}
          </div>

          <div className="p-5 sm:p-8">
            {/* Order Information */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-amber-100 bg-[#fffdf8] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                    <CreditCard size={22} />
                  </div>

                  <div>
                    <p className="text-xs text-stone-500">
                      পেমেন্ট পদ্ধতি
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-stone-900">
                      {formatPaymentMethod(paymentMethod)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-[#fffdf8] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                    <Truck size={22} />
                  </div>

                  <div>
                    <p className="text-xs text-stone-500">
                      অর্ডারের অবস্থা
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-emerald-700">
                      {order.status || "অর্ডার গ্রহণ করা হয়েছে"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            {(customer.name ||
              customer.phone ||
              customer.address) && (
              <section className="mt-8">
                <h2 className="flex items-center gap-2 text-lg font-black text-stone-900">
                  <MapPin size={20} className="text-amber-800" />
                  ডেলিভারির তথ্য
                </h2>

                <div className="mt-4 space-y-4 rounded-2xl border border-amber-100 p-5">
                  {customer.name && (
                    <div>
                      <p className="text-xs text-stone-500">
                        কাস্টমারের নাম
                      </p>
                      <p className="mt-1 text-sm font-bold text-stone-900">
                        {customer.name}
                      </p>
                    </div>
                  )}

                  {customer.phone && (
                    <div>
                      <p className="flex items-center gap-2 text-xs text-stone-500">
                        <Phone size={14} />
                        মোবাইল নম্বর
                      </p>
                      <p className="mt-1 text-sm font-bold text-stone-900">
                        {customer.phone}
                      </p>
                    </div>
                  )}

                  {customer.address && (
                    <div>
                      <p className="text-xs text-stone-500">
                        সম্পূর্ণ ঠিকানা
                      </p>
                      <p className="mt-1 whitespace-pre-line text-sm leading-7 text-stone-800">
                        {customer.address}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Ordered Products */}
            {items.length > 0 && (
              <section className="mt-8">
                <h2 className="flex items-center gap-2 text-lg font-black text-stone-900">
                  <Package size={20} className="text-amber-800" />
                  অর্ডার করা পণ্য
                </h2>

                <div className="mt-4 divide-y divide-amber-100 rounded-2xl border border-amber-100">
                  {items.map((item, index) => {
                    const quantity =
                      Number(item.quantity) || 1;
                    const price = Number(item.price) || 0;

                    return (
                      <div
                        key={item.id ?? `${item.name}-${index}`}
                        className="flex items-center gap-3 p-4 sm:gap-4"
                      >
                        <img
                          src={item.image || "/images/hero-1.jpg"}
                          alt={item.name || "অর্ডার করা পণ্য"}
                          className="h-16 w-16 shrink-0 rounded-xl bg-amber-50 object-cover"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src =
                              "/images/hero-1.jpg";
                          }}
                        />

                        <div className="min-w-0 flex-1">
                          <p className="break-words text-sm font-bold text-stone-900">
                            {item.name || "পণ্য"}
                          </p>

                          <p className="mt-1 text-xs text-stone-500">
                            {formatPrice(price)} × {quantity}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-extrabold text-amber-900">
                          {formatPrice(price * quantity)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Price Summary */}
            {(items.length > 0 || order.total != null) && (
              <section className="mt-6 rounded-2xl bg-amber-50/70 p-5">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-stone-600">
                      পণ্যের দাম
                    </span>
                    <span className="font-bold text-stone-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-stone-600">
                      ডেলিভারি চার্জ
                    </span>
                    <span className="font-bold text-stone-900">
                      {deliveryCharge === 0
                        ? "ফ্রি"
                        : formatPrice(deliveryCharge)}
                    </span>
                  </div>

                  <div className="h-px bg-amber-200" />

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-extrabold text-stone-900">
                      সর্বমোট
                    </span>
                    <span className="text-2xl font-black text-amber-900">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/* Next Steps */}
            <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
              <h3 className="font-extrabold text-stone-900">
                এরপর কী হবে?
              </h3>

              <p className="mt-2 text-sm leading-7 text-stone-600">
                আপনার অর্ডারের তথ্য সংরক্ষিত হয়েছে কি না এবং
                ডেলিভারির সময় নিশ্চিত করতে প্রয়োজনে Spice House-এর
                সঙ্গে যোগাযোগ করুন।
              </p>
            </div>

            {/* Navigation */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-800 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-amber-900"
              >
                <ShoppingBag size={18} />
                আরও কেনাকাটা করুন
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-white px-5 py-3.5 text-sm font-bold text-stone-800 transition hover:bg-amber-50"
              >
                <Home size={18} />
                হোম পেজে ফিরে যান
              </Link>
            </div>
          </div>
        </section>

        <p className="mt-6 text-center text-xs leading-6 text-stone-500">
          Spice House-কে বেছে নেওয়ার জন্য ধন্যবাদ। আপনার কেনাকাটা
          শুভ হোক!
        </p>
      </div>
    </main>
  );
}
