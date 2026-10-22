
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import OrderSuccess from "./pages/OrderSuccess";

import { CartProvider } from "./context/CartContext";

function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-orange-50 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <div className="text-7xl font-black text-amber-800">404</div>

        <h1 className="mt-4 text-2xl font-bold text-stone-900">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mt-3 text-stone-500">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি এখানে নেই।
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex rounded-xl bg-amber-800 px-6 py-3 font-semibold text-white transition hover:bg-amber-900"
        >
          হোমপেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fffdf8]">
      <ScrollToTop />

      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout />
      </CartProvider>
    </BrowserRouter>
  );
}
