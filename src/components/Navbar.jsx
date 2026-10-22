
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  ChevronRight,
  Leaf,
  ArrowRight,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import products from "../data/products";

const navLinks = [
  { name: "হোম", path: "/" },
  { name: "সকল পণ্য", path: "/shop" },
  { name: "আমাদের সম্পর্কে", path: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { cart = [] } = useCart();
  const navigate = useNavigate();

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  const normalizedSearch = search.trim().toLowerCase();

  const matchedProducts = normalizedSearch
    ? products
        .filter((product) =>
          `${product.name || ""} ${product.description || ""}`
            .toLowerCase()
            .includes(normalizedSearch)
        )
        .slice(0, 5)
    : [];

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (event) => {
    event.preventDefault();

    if (!search.trim()) return;

    navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
    setSearchOpen(false);
    setSearch("");
    closeMenu();
  };

  const openProduct = (product) => {
    setSearchOpen(false);
    setSearch("");
    closeMenu();

    if (product.id !== undefined && product.id !== null) {
      navigate(`/product/${product.id}`);
    } else {
      navigate(`/shop?search=${encodeURIComponent(product.name || "")}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-amber-100 bg-[#fffdf8]/95 shadow-sm backdrop-blur-xl">
      {/* Announcement Bar */}
      <div className="bg-amber-900 px-3 py-2 text-center text-xs font-medium text-white sm:text-sm">
        🌿 খাঁটি মসলায় প্রতিদিনের রান্না হোক আরও সুস্বাদু
        <span className="hidden sm:inline"> — Halal Spice</span>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6 lg:px-8">
        {/* Logo - Same as Footer */}
        <Link
          to="/"
          onClick={() => {
            closeMenu();
            setSearchOpen(false);
          }}
          className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
          aria-label="Halal Spice Home"
        >
          <img
            src="/images/logo.png"
            alt="Halal Spice Logo"
            className="h-10 w-10 shrink-0 rounded-2xl object-contain sm:h-12 sm:w-12"
          />

          <div className="min-w-0">
            <h1 className="text-base font-extrabold leading-tight tracking-tight text-amber-950 sm:text-2xl">
              Halal <span className="text-green-600">Spice</span>
            </h1>

            <p className="text-[8px] tracking-widest text-gray-500 sm:text-[10px]">
              PURE TASTE, PURE TRUST
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-9">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `relative py-2 text-sm font-semibold transition ${
                  isActive
                    ? "text-amber-800"
                    : "text-stone-600 hover:text-amber-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-amber-700" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Search Toggle */}
          <button
            type="button"
            onClick={() => {
              setSearchOpen((value) => !value);
              setMenuOpen(false);
            }}
            aria-label="Search products"
            aria-expanded={searchOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-amber-100 hover:text-amber-900"
          >
            {searchOpen ? <X size={21} /> : <Search size={21} />}
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={`Cart with ${cartCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-amber-100 hover:text-amber-900"
          >
            <ShoppingBag size={22} />

            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-800 px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Shop Button */}
          <Link
            to="/shop"
            className="hidden items-center gap-1 rounded-full bg-amber-800 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-amber-900 sm:inline-flex"
          >
            কিনুন <ChevronRight size={16} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen((value) => !value);
              setSearchOpen(false);
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-800 transition hover:bg-amber-100 md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Panel */}
      {searchOpen && (
        <div className="border-t border-amber-100 bg-white px-3 py-4 sm:px-4">
          <div className="mx-auto max-w-2xl">
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 rounded-xl border border-amber-200 bg-orange-50 px-3 py-2 focus-within:border-amber-600"
            >
              <Search size={20} className="shrink-0 text-amber-800" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="মসলার নাম লিখে খুঁজুন..."
                aria-label="পণ্য খুঁজুন"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm text-stone-800 outline-none placeholder:text-stone-400"
              />

              <button
                type="submit"
                disabled={!search.trim()}
                className="rounded-lg bg-amber-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:opacity-50 sm:px-4"
              >
                খুঁজুন
              </button>
            </form>

            {/* Live Product Suggestions */}
            {normalizedSearch && (
              <div className="mt-2 overflow-hidden rounded-xl border border-amber-100 bg-white shadow-lg">
                {matchedProducts.length > 0 ? (
                  matchedProducts.map((product) => (
                    <button
                      key={product.id ?? product.name}
                      type="button"
                      onClick={() => openProduct(product)}
                      className="flex w-full items-center gap-3 border-b border-stone-100 p-3 text-left transition last:border-b-0 hover:bg-orange-50"
                    >
                      <img
                        src={product.image}
                        alt={product.name || "পণ্য"}
                        className="h-12 w-12 shrink-0 rounded-lg bg-stone-50 object-contain"
                        onError={(event) => {
                          event.currentTarget.style.visibility = "hidden";
                        }}
                      />

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-stone-800">
                          {product.name}
                        </span>

                        <span className="mt-1 block text-xs text-stone-500">
                          {product.description || "Halal Spice Collection"}
                        </span>
                      </span>

                      <ArrowRight
                        size={17}
                        className="shrink-0 text-amber-800"
                      />
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-5 text-center text-sm text-stone-500">
                    এই নামে কোনো পণ্য পাওয়া যায়নি।
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={!search.trim()}
                  className="w-full border-t border-amber-100 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900 transition hover:bg-amber-100 disabled:opacity-50"
                >
                  সব ফলাফল দেখুন →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="border-t border-amber-100 bg-white px-4 py-3 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-amber-50 text-amber-900"
                      : "text-stone-700 hover:bg-orange-50 hover:text-amber-900"
                  }`
                }
              >
                {item.name}
                <ChevronRight size={17} />
              </NavLink>
            ))}

            {/* Mobile Cart */}
            <Link
              to="/cart"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-between rounded-xl bg-amber-800 px-4 py-3.5 font-semibold text-white transition hover:bg-amber-900"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag size={19} />
                আমার কার্ট
              </span>

              <span>{cartCount} টি পণ্য</span>
            </Link>

            {/* All Products */}
            <Link
              to="/shop"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-amber-200 px-4 py-3 font-semibold text-amber-900 transition hover:bg-amber-50"
            >
              <Leaf size={18} />
              সব মসলা দেখুন
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
