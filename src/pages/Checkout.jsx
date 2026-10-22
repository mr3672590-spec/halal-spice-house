
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  MapPin,
  Phone,
  ShoppingBag,
  ShieldCheck,
  Truck,
  UserRound,
  Wallet,
  PackageCheck,
  AlertCircle,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  division: "",
  district: "",
  address: "",
  note: "",
  paymentMethod: "cod",
  senderPhone: "",
  transactionId: "",
};

const divisions = [
  "ঢাকা",
  "চট্টগ্রাম",
  "রাজশাহী",
  "খুলনা",
  "বরিশাল",
  "সিলেট",
  "রংপুর",
  "ময়মনসিংহ",
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      (Number(item.price) || 0) *
        (Number(item.quantity) || 1),
    0
  );

  const freeDeliveryMinimum = 3000;
  const deliveryCharge =
    subtotal === 0 || subtotal >= freeDeliveryMinimum ? 0 : 100;

  const total = subtotal + deliveryCharge;

  const formatPrice = (amount) =>
    `৳${Number(amount || 0).toLocaleString("en-BD")}`;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      submit: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "আপনার নাম লিখুন।";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
    }

    if (!/^01[3-9]\d{8}$/.test(form.phone.trim())) {
      newErrors.phone =
        "সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন (যেমন 01712345678)।";
    }

    if (!form.division) {
      newErrors.division = "বিভাগ নির্বাচন করুন।";
    }

    if (!form.district.trim()) {
      newErrors.district = "জেলার নাম লিখুন।";
    }

    if (form.address.trim().length < 5) {
      newErrors.address = "সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন।";
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা লিখুন।";
    }

    if (form.paymentMethod !== "cod") {
      if (!/^01[3-9]\d{8}$/.test(form.senderPhone.trim())) {
        newErrors.senderPhone =
          "যে নম্বর থেকে পেমেন্ট করেছেন, সেটি লিখুন।";
      }

      if (form.transactionId.trim().length < 4) {
        newErrors.transactionId =
          "পেমেন্টের Transaction ID লিখুন।";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (submitting || cart.length === 0) return;

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);

    const orderId = `SH-${Date.now().toString().slice(-8)}`;

    const paymentNames = {
      cod: "Cash on Delivery",
      bkash: "bKash",
      nagad: "Nagad",
    };

    const order = {
      orderId,
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        division: form.division,
        district: form.district.trim(),
        address: form.address.trim(),
        note: form.note.trim(),
      },
      items: cart.map((item) => ({
        ...item,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
      })),
      subtotal,
      deliveryCharge,
      total,
      paymentMethod: paymentNames[form.paymentMethod],
      paymentDetails:
        form.paymentMethod === "cod"
          ? null
          : {
              senderPhone: form.senderPhone.trim(),
              transactionId: form.transactionId.trim(),
            },
      status: "অর্ডার গ্রহণ করা হয়েছে",
      createdAt: new Date().toISOString(),
    };

    // This frontend demo passes order details to the success page.
    // A backend/database is needed for permanent order storage.
    try {
      navigate("/order-success", {
        state: { order },
      });

      clearCart();
    } catch (error) {
      console.error("Checkout error:", error);
      setErrors({
        submit: "অর্ডার সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।",
      });
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/10 ${
      errors[field] ? "border-red-400" : "border-amber-100"
    }`;

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#fffdf8] px-4 py-12">
        <div className="w-full max-w-lg rounded-3xl border border-amber-100 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
            <ShoppingBag size={38} className="text-amber-800" />
          </div>

          <h1 className="mt-6 text-2xl font-black text-stone-900">
            আপনার কার্ট খালি
          </h1>

          <p className="mt-3 text-sm leading-7 text-stone-500">
            Checkout করার আগে আপনার পছন্দের পণ্য কার্টে যোগ করুন।
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-amber-900"
          >
            <ShoppingBag size={18} />
            পণ্য দেখুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffdf8]">
      {/* Header */}
      <section className="border-b border-amber-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <Link
            to="/cart"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition hover:text-amber-800"
          >
            <ArrowLeft size={17} />
            কার্টে ফিরে যান
          </Link>

          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-800">
            SPICE HOUSE
          </p>

          <h1 className="mt-2 text-3xl font-black text-stone-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-3 text-sm text-stone-500">
            আপনার তথ্য দিন এবং অর্ডার সম্পন্ন করুন।
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-stone-600 sm:gap-5">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-600" />
              কার্ট
            </span>

            <span className="h-px w-6 bg-amber-200" />

            <span className="flex items-center gap-2 text-amber-900">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-800 text-white">
                2
              </span>
              Checkout
            </span>

            <span className="h-px w-6 bg-amber-200" />

            <span className="flex items-center gap-2">
              <PackageCheck size={17} />
              অর্ডার নিশ্চিতকরণ
            </span>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[1fr_380px] lg:px-8">
          {/* Customer Information */}
          <div className="space-y-6">
            {/* Contact */}
            <section className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <UserRound size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-black text-stone-900">
                    কাস্টমারের তথ্য
                  </h2>
                  <p className="mt-1 text-xs text-stone-500">
                    আপনার যোগাযোগের তথ্য লিখুন।
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-bold text-stone-800"
                  >
                    সম্পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="আপনার নাম লিখুন"
                    className={inputClass("name")}
                    aria-invalid={Boolean(errors.name)}
                  />

                  {errors.name && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-bold text-stone-800"
                  >
                    মোবাইল নম্বর <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      placeholder="01712345678"
                      className={`${inputClass("phone")} pl-11`}
                      aria-invalid={Boolean(errors.phone)}
                    />
                  </div>

                  {errors.phone && (
                    <p className="mt-2 text-xs leading-5 text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-stone-800"
                  >
                    ইমেইল{" "}
                    <span className="font-normal text-stone-400">
                      (ঐচ্ছিক)
                    </span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass("email")}
                    aria-invalid={Boolean(errors.email)}
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Address */}
            <section className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <MapPin size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-black text-stone-900">
                    ডেলিভারির ঠিকানা
                  </h2>
                  <p className="mt-1 text-xs text-stone-500">
                    পণ্য পৌঁছে দেওয়ার সঠিক ঠিকানা দিন।
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="division"
                    className="text-sm font-bold text-stone-800"
                  >
                    বিভাগ <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="division"
                    name="division"
                    value={form.division}
                    onChange={handleChange}
                    className={inputClass("division")}
                    aria-invalid={Boolean(errors.division)}
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    {divisions.map((division) => (
                      <option key={division} value={division}>
                        {division}
                      </option>
                    ))}
                  </select>

                  {errors.division && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.division}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="district"
                    className="text-sm font-bold text-stone-800"
                  >
                    জেলা <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="district"
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    autoComplete="address-level2"
                    placeholder="জেলার নাম"
                    className={inputClass("district")}
                    aria-invalid={Boolean(errors.district)}
                  />

                  {errors.district && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.district}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="text-sm font-bold text-stone-800"
                  >
                    সম্পূর্ণ ঠিকানা{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    autoComplete="street-address"
                    rows={3}
                    placeholder="বাড়ি নম্বর, রাস্তা, এলাকা, থানা ইত্যাদি লিখুন"
                    className={`${inputClass("address")} resize-y`}
                    aria-invalid={Boolean(errors.address)}
                  />

                  {errors.address && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="note"
                    className="text-sm font-bold text-stone-800"
                  >
                    অর্ডার সম্পর্কে অতিরিক্ত নির্দেশনা{" "}
                    <span className="font-normal text-stone-400">
                      (ঐচ্ছিক)
                    </span>
                  </label>

                  <textarea
                    id="note"
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows={2}
                    placeholder="ডেলিভারি সম্পর্কে কোনো নির্দেশনা থাকলে লিখুন"
                    className={inputClass("note")}
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                  <CreditCard size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-black text-stone-900">
                    পেমেন্ট পদ্ধতি
                  </h2>
                  <p className="mt-1 text-xs text-stone-500">
                    আপনার পছন্দের পেমেন্ট পদ্ধতি বেছে নিন।
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                    form.paymentMethod === "cod"
                      ? "border-amber-700 bg-amber-50/70"
                      : "border-amber-100 hover:bg-amber-50/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="mt-1 accent-amber-800"
                  />

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-800">
                    <Truck size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-stone-900">
                      Cash on Delivery
                    </p>
                    <p className="mt-1 text-xs leading-5 text-stone-500">
                      পণ্য গ্রহণের সময় পেমেন্ট করুন।
                    </p>
                  </div>
                </label>

                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                    form.paymentMethod === "bkash"
                      ? "border-amber-700 bg-amber-50/70"
                      : "border-amber-100 hover:bg-amber-50/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bkash"
                    checked={form.paymentMethod === "bkash"}
                    onChange={handleChange}
                    className="mt-1 accent-amber-800"
                  />

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e2136e]/10 text-sm font-black text-[#e2136e]">
                    bK
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-stone-900">
                      bKash
                    </p>
                    <p className="mt-1 text-xs leading-5 text-stone-500">
                      আপনার bKash পেমেন্টের তথ্য দিন।
                    </p>
                  </div>
                </label>

                <label
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                    form.paymentMethod === "nagad"
                      ? "border-amber-700 bg-amber-50/70"
                      : "border-amber-100 hover:bg-amber-50/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="nagad"
                    checked={form.paymentMethod === "nagad"}
                    onChange={handleChange}
                    className="mt-1 accent-amber-800"
                  />

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f15a24]/10 text-sm font-black text-[#e84b16]">
                    N
                  </div>

                  <div>
                    <p className="text-sm font-extrabold text-stone-900">
                      Nagad
                    </p>
                    <p className="mt-1 text-xs leading-5 text-stone-500">
                      আপনার Nagad পেমেন্টের তথ্য দিন।
                    </p>
                  </div>
                </label>
              </div>

              {/* Manual Mobile Payment Details */}
              {form.paymentMethod !== "cod" && (
                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/50 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <Wallet
                      size={21}
                      className="mt-0.5 shrink-0 text-amber-800"
                    />

                    <div>
                      <h3 className="text-sm font-extrabold text-stone-900">
                        {form.paymentMethod === "bkash"
                          ? "bKash পেমেন্ট"
                          : "Nagad পেমেন্ট"}
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-stone-600">
                        আপনার ব্যবসার নির্ধারিত মার্চেন্ট/পেমেন্ট নম্বরে
                        পেমেন্ট করুন। এরপর নিচে পেমেন্ট করা নম্বর ও
                        Transaction ID লিখুন। সঠিক পেমেন্ট নম্বর এখানে
                        যোগ না করা পর্যন্ত customer-কে এই পদ্ধতিতে
                        পেমেন্ট করতে বলবেন না।
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="senderPhone"
                      className="text-sm font-bold text-stone-800"
                    >
                      যে নম্বর থেকে পেমেন্ট করেছেন{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="senderPhone"
                      name="senderPhone"
                      type="tel"
                      inputMode="numeric"
                      value={form.senderPhone}
                      onChange={handleChange}
                      placeholder="01712345678"
                      className={inputClass("senderPhone")}
                      aria-invalid={Boolean(errors.senderPhone)}
                    />

                    {errors.senderPhone && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.senderPhone}
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="transactionId"
                      className="text-sm font-bold text-stone-800"
                    >
                      Transaction ID{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="transactionId"
                      name="transactionId"
                      value={form.transactionId}
                      onChange={handleChange}
                      placeholder="আপনার Transaction ID"
                      className={inputClass("transactionId")}
                      aria-invalid={Boolean(errors.transactionId)}
                    />

                    {errors.transactionId && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.transactionId}
                      </p>
                    )}
                  </div>

                  <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-amber-900">
                    <ShieldCheck
                      size={16}
                      className="mt-0.5 shrink-0"
                    />
                    এই ফর্ম পেমেন্ট যাচাই করে না। অর্ডার নিশ্চিত করার
                    আগে Transaction ID যাচাই করতে হবে।
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Order Summary */}
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-black text-stone-900">
                আপনার অর্ডার
              </h2>

              <p className="mt-1 text-sm text-stone-500">
                {cart.reduce(
                  (count, item) =>
                    count + (Number(item.quantity) || 1),
                  0
                )}{" "}
                টি পণ্য
              </p>

              <div className="my-5 h-px bg-amber-100" />

              <div className="max-h-80 space-y-4 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const quantity = Number(item.quantity) || 1;
                  const price = Number(item.price) || 0;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 rounded-xl bg-amber-50">
                        <img
                          src={item.image || "/images/hero-1.jpg"}
                          alt={item.name}
                          className="h-full w-full rounded-xl object-cover"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src =
                              "/images/hero-1.jpg";
                          }}
                        />

                        <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-stone-800 px-1 text-[10px] font-bold text-white">
                          {quantity}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="break-words text-sm font-bold text-stone-900">
                          {item.name}
                        </p>

                        {item.weight && (
                          <p className="mt-1 text-xs text-stone-500">
                            {item.weight}
                          </p>
                        )}

                        <p className="mt-1 text-xs text-stone-500">
                          {formatPrice(price)} × {quantity}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-extrabold text-stone-900">
                        {formatPrice(price * quantity)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="my-5 h-px bg-amber-100" />

              <div className="space-y-4 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-stone-600">পণ্যের দাম</span>
                  <span className="font-bold text-stone-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-stone-600">ডেলিভারি চার্জ</span>
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
                </div>

                {deliveryCharge > 0 && (
                  <p className="text-xs leading-5 text-stone-500">
                    {formatPrice(freeDeliveryMinimum)} বা তার বেশি
                    কেনাকাটায় ফ্রি ডেলিভারি।
                  </p>
                )}
              </div>

              <div className="my-5 h-px bg-amber-100" />

              <div className="flex items-center justify-between gap-3">
                <span className="font-extrabold text-stone-900">
                  সর্বমোট
                </span>

                <span className="text-2xl font-black text-amber-900">
                  {formatPrice(total)}
                </span>
              </div>

              {errors.submit && (
                <p
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-xs leading-5 text-red-700"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {errors.submit}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-800 px-5 py-4 text-sm font-extrabold text-white shadow-md shadow-amber-900/10 transition hover:bg-amber-900 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  "অর্ডার প্রসেস হচ্ছে..."
                ) : (
                  <>
                    অর্ডার নিশ্চিত করুন
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-stone-500">
                অর্ডার নিশ্চিত করার আগে আপনার নাম, ঠিকানা ও মোট দাম
                যাচাই করে নিন।
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 border-t border-amber-100 pt-5 text-xs text-stone-500">
                <ShieldCheck size={16} className="text-amber-800" />
                আপনার তথ্য সঠিকভাবে পূরণ করুন।
              </div>
            </div>

            <Link
              to="/cart"
              className="mt-4 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-stone-500 transition hover:text-amber-800"
            >
              <ArrowLeft size={16} />
              কার্টে ফিরে যান
            </Link>
          </aside>
        </div>
      </form>
    </main>
  );
}
