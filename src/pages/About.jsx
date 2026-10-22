
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Heart,
  Award,
  Sprout,
  Truck,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  HandHeart,
} from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "স্বাদ ও সুগন্ধ",
    description:
      "আপনার প্রতিদিনের রান্নায় মসলার স্বাদ ও সুগন্ধকে গুরুত্ব দিয়ে পণ্য নির্বাচন করি।",
  },
  {
    icon: ShieldCheck,
    title: "মানের প্রতি যত্ন",
    description:
      "পণ্যের মান, সঠিক প্যাকেজিং এবং সংরক্ষণের বিষয়ে যত্নশীল থাকার চেষ্টা করি।",
  },
  {
    icon: Heart,
    title: "ক্রেতাই অগ্রাধিকার",
    description:
      "আপনার কেনাকাটার অভিজ্ঞতা সহজ, পরিষ্কার ও স্বাচ্ছন্দ্যময় করাই আমাদের লক্ষ্য।",
  },
];

const benefits = [
  {
    icon: Sprout,
    title: "বাছাই করা পণ্য",
    description:
      "রান্নাঘরের প্রয়োজনীয় মসলা ও অন্যান্য পণ্য এক জায়গায় খুঁজে নিন।",
  },
  {
    icon: ShieldCheck,
    title: "যত্নসহকারে প্যাকেজিং",
    description:
      "পণ্য প্যাক করার সময় পরিচ্ছন্নতা ও সুরক্ষার দিকে গুরুত্ব দেওয়া হয়।",
  },
  {
    icon: Truck,
    title: "সহজ অর্ডার",
    description:
      "ওয়েবসাইট থেকে পছন্দের পণ্য বেছে নিয়ে সহজেই অর্ডার করতে পারবেন।",
  },
  {
    icon: HandHeart,
    title: "ক্রেতা সহায়তা",
    description:
      "পণ্য বা অর্ডার সম্পর্কে প্রশ্ন থাকলে আমাদের সঙ্গে যোগাযোগ করুন।",
  },
];

export default function About() {
  return (
    <main className="overflow-hidden bg-[#fffdf8] text-stone-800">
      {/* Hero */}
      <section className="relative isolate bg-[#21160f]">
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/hero-1.jpg"
            alt=""
            className="h-full w-full object-cover opacity-25"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#21160f] via-[#21160f]/95 to-[#21160f]/65" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-amber-200">
              <Sparkles size={15} />
              আমাদের সম্পর্কে
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              রান্নার প্রতিটি স্বাদে
              <span className="mt-2 block text-amber-300">
                Spice House
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-stone-300 sm:text-base">
              আপনার রান্নাঘরের প্রয়োজনীয় মসলা ও পণ্য সহজে খুঁজে পাওয়ার
              একটি নির্ভরযোগ্য অনলাইন শপ গড়ে তোলাই Spice House-এর লক্ষ্য।
              আমরা চাই প্রতিটি কেনাকাটা হোক সহজ ও স্বাচ্ছন্দ্যময়।
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-700 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-amber-600"
              >
                পণ্য দেখুন
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                হোম পেজ
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-[2rem] border border-amber-200/20" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm">
              <img
                src="/images/hero-2.jpg"
                alt="Spice House মসলা সংগ্রহ"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/images/hero-1.jpg";
                }}
              />

              <div className="flex items-center gap-3 p-4 sm:p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300">
                  <Leaf size={25} />
                </div>

                <div>
                  <p className="font-bold text-white">
                    আপনার রান্নাঘরের সঙ্গী
                  </p>
                  <p className="mt-1 text-xs leading-5 text-stone-300">
                    প্রয়োজনীয় পণ্য, সহজ অনলাইন কেনাকাটা।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-amber-100 bg-amber-50">
            <img
              src="/images/hero-3.jpg"
              alt="Spice House পণ্য"
              loading="lazy"
              className="aspect-[5/4] w-full object-cover"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/images/hero-1.jpg";
              }}
            />
          </div>

          <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl border border-amber-100 bg-white p-4 shadow-xl sm:right-8 sm:p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <ShoppingBag size={23} />
            </div>
            <div>
              <p className="text-sm font-extrabold text-stone-900">
                Spice House
              </p>
              <p className="mt-1 text-xs text-stone-500">
                আপনার অনলাইন মসলা শপ
              </p>
            </div>
          </div>
        </div>

        <div className="pt-5 lg:pt-0">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-800">
            OUR STORY
          </p>

          <h2 className="text-3xl font-black leading-tight text-stone-900 sm:text-4xl">
            প্রতিটি রান্নায় থাকুক
            <span className="text-amber-800"> পছন্দের স্বাদ</span>
          </h2>

          <p className="mt-5 text-sm leading-8 text-stone-600 sm:text-base">
            Spice House এমন একটি অনলাইন শপ, যেখানে দৈনন্দিন রান্নার
            প্রয়োজনীয় মসলা ও অন্যান্য পণ্য সহজে খুঁজে পাওয়ার অভিজ্ঞতা
            তৈরি করার চেষ্টা করা হয়।
          </p>

          <p className="mt-4 text-sm leading-8 text-stone-600 sm:text-base">
            আমাদের উদ্দেশ্য শুধু পণ্য বিক্রি করা নয়; বরং পণ্যের তথ্য
            পরিষ্কারভাবে উপস্থাপন করা, সহজে অর্ডার করার সুবিধা দেওয়া
            এবং ক্রেতাদের সঙ্গে ভালো সম্পর্ক গড়ে তোলা।
          </p>

          <div className="mt-7 space-y-4">
            {[
              "সহজে পণ্য খুঁজে পাওয়ার সুবিধা",
              "পরিষ্কার পণ্যের বিবরণ ও মূল্য",
              "সহজ কার্ট ও অর্ডার প্রক্রিয়া",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-amber-700"
                />
                <p className="text-sm font-semibold text-stone-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-amber-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-800">
              OUR VALUES
            </p>

            <h2 className="text-3xl font-black text-stone-900 sm:text-4xl">
              আমাদের কাজের মূলনীতি
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-500 sm:text-base">
              পণ্যের মান থেকে শুরু করে কেনাকাটার অভিজ্ঞতা—প্রতিটি
              ক্ষেত্রে যত্নশীল থাকার চেষ্টা করি।
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="group rounded-2xl border border-amber-100 bg-[#fffdf8] p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl sm:p-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 transition group-hover:bg-amber-800 group-hover:text-white">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-5 text-xl font-extrabold text-stone-900">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-stone-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-800">
              WHY SPICE HOUSE
            </p>

            <h2 className="text-3xl font-black leading-tight text-stone-900 sm:text-4xl">
              কেন Spice House বেছে নেবেন?
            </h2>

            <p className="mt-5 text-sm leading-8 text-stone-600 sm:text-base">
              আমরা চাই আপনার প্রয়োজনীয় পণ্য খুঁজে পাওয়া থেকে শুরু করে
              অর্ডার সম্পন্ন করা পর্যন্ত পুরো প্রক্রিয়াটি সহজ ও
              সুবিধাজনক হোক।
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-800 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-amber-900"
            >
              কেনাকাটা করুন
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-amber-100 bg-white p-5 transition hover:border-amber-300 hover:shadow-lg sm:p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-4 font-extrabold text-stone-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-stone-500">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#2b1b11] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-amber-600/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200/20 bg-white/5 text-amber-300">
              <Award size={29} />
            </div>

            <h2 className="mt-6 text-3xl font-black leading-tight text-white sm:text-4xl">
              আপনার পছন্দের পণ্য খুঁজে নিন
            </h2>

            <p className="mt-4 text-sm leading-7 text-stone-300 sm:text-base">
              Spice House-এর সংগ্রহ ঘুরে দেখুন এবং আপনার রান্নাঘরের
              প্রয়োজনীয় পণ্য বেছে নিন।
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-3.5 text-sm font-extrabold text-stone-950 transition hover:bg-amber-300"
            >
              সব পণ্য দেখুন
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
