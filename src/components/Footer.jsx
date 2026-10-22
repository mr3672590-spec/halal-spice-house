
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Heart,
} from "lucide-react";

const quickLinks = [
  { name: "হোম", path: "/" },
  { name: "সকল পণ্য", path: "/shop" },
  { name: "আমাদের সম্পর্কে", path: "/about" },
  { name: "শপিং কার্ট", path: "/cart" },
  { name: "অর্ডার করুন", path: "/checkout" },
];

const categories = [
  "মরিচের গুঁড়া",
  "হলুদের গুঁড়া",
  "ধনিয়ার গুঁড়া",
  "জিরার গুঁড়া",
  "গরম মসলা",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#11140f] text-white">
      <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Halal Spice Logo"
                className="h-12 w-12 rounded-2xl object-contain"
              />

              <div>
                <h2 className="text-2xl font-extrabold">
                  Halal <span className="text-green-400">Spice</span>
                </h2>

                <p className="text-xs tracking-widest text-gray-400">
                  PURE TASTE, PURE TRUST
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-gray-400">
              আপনার রান্নাঘরের প্রতিটি মুহূর্তে খাঁটি স্বাদ ও
              বিশুদ্ধতার ছোঁয়া পৌঁছে দেওয়াই আমাদের লক্ষ্য।
              বেছে নিন মানসম্মত মসলা ও নিত্যপ্রয়োজনীয় পণ্য।
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg transition hover:bg-green-600"
              >
                f
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg transition hover:bg-green-600"
              >
                ◎
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg transition hover:bg-green-600"
              >
                ▶
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold">
              গুরুত্বপূর্ণ লিংক
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-2 text-sm text-gray-400 transition hover:text-green-400"
                  >
                    <ArrowUpRight
                      size={15}
                      className="text-green-400 transition group-hover:translate-x-1"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-6 text-lg font-bold">
              আমাদের পণ্য
            </h3>

            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    to="/shop"
                    className="flex items-center gap-3 text-sm text-gray-400 transition hover:text-green-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-bold">
              যোগাযোগ করুন
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-1 shrink-0 text-green-400"
                  size={20}
                />

                <div>
                  <p className="text-sm font-semibold">ঠিকানা</p>
                  <p className="mt-1 text-sm text-gray-400">
                    বাংলাদেশ
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone
                  className="mt-1 shrink-0 text-green-400"
                  size={20}
                />

                <div>
                  <p className="text-sm font-semibold">ফোন</p>
                  <p className="mt-1 text-sm text-gray-400">
                    আপনার ফোন নম্বর
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail
                  className="mt-1 shrink-0 text-green-400"
                  size={20}
                />

                <div>
                  <p className="text-sm font-semibold">ইমেইল</p>
                  <p className="mt-1 break-all text-sm text-gray-400">
                    আপনার ইমেইল ঠিকানা
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-center sm:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Halal Spice.
            সর্বস্বত্ব সংরক্ষিত।
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-500">
            ভালোবাসা দিয়ে তৈরি
            <Heart
              size={15}
              className="fill-red-500 text-red-500"
            />
            বাংলাদেশে
          </p>

          <Link
            to="/shop"
            className="text-sm font-semibold text-green-400 hover:text-green-300"
          >
            এখনই কেনাকাটা করুন →
          </Link>
        </div>
      </div>
    </footer>
  );
}
