import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowUpRight,
  Star,
  Check,
  Tag,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const cart = useCart();
  const addToCart = cart?.addToCart;

  if (!product) return null;

  const {
    id,
    name,
    category,
    price,
    oldPrice,
    image,
    rating,
    weight,
    description,
  } = product;

  const productId = id ?? name;
  const productImage = image || "/images/hero-1.jpg";

  const discount =
    oldPrice && Number(oldPrice) > Number(price)
      ? Math.round(
          ((Number(oldPrice) - Number(price)) / Number(oldPrice)) * 100
        )
      : 0;

  const handleAddToCart = () => {
    if (typeof addToCart !== "function") {
      console.error("CartContext-এ addToCart function পাওয়া যায়নি।");
      return;
    }

    addToCart(
      {
        ...product,
        id: productId,
        name: name || "পণ্য",
        price: Number(price) || 0,
        image: productImage,
      },
      1
    );
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-amber-100/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-950/10 sm:rounded-3xl">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-[#f8f4eb]">
        <Link
          to={`/product/${encodeURIComponent(productId)}`}
          aria-label={`${name || "পণ্য"} বিস্তারিত দেখুন`}
          className="block aspect-square overflow-hidden"
        >
          <img
            src={productImage}
            alt={name || "পণ্য"}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/images/hero-1.jpg";
            }}
          />
        </Link>

        {discount > 0 && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm sm:text-xs">
            <Tag size={12} />
            {discount}% ছাড়
          </span>
        )}

        {category && (
          <span className="absolute bottom-3 left-3 max-w-[75%] truncate rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[10px] font-semibold text-amber-900 shadow-sm backdrop-blur sm:text-xs">
            {category}
          </span>
        )}

        <Link
          to={`/product/${encodeURIComponent(productId)}`}
          aria-label={`${name || "পণ্য"} বিস্তারিত`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-stone-700 shadow-sm transition hover:bg-amber-800 hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <div className="mb-2 flex min-h-5 items-center justify-between gap-2">
          {rating != null ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              {rating}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 sm:text-xs">
              <Check size={13} />
              নির্বাচিত পণ্য
            </span>
          )}

          {weight && (
            <span className="truncate text-[10px] text-stone-500 sm:text-xs">
              {weight}
            </span>
          )}
        </div>

        <Link to={`/product/${encodeURIComponent(productId)}`} className="block">
          <h3 className="line-clamp-2 min-h-11 text-sm font-bold leading-5 text-stone-900 transition group-hover:text-amber-800 sm:text-base sm:leading-6">
            {name || "নামহীন পণ্য"}
          </h3>
        </Link>

        {description && (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-stone-500">
            {description}
          </p>
        )}

        {/* Price */}
        <div className="mt-auto pt-4">
          <div className="mb-3 flex flex-wrap items-baseline gap-2">
            <span className="text-lg font-extrabold text-amber-900 sm:text-xl">
              ৳{Number(price || 0).toLocaleString("en-BD")}
            </span>

            {oldPrice && Number(oldPrice) > Number(price) && (
              <span className="text-xs text-stone-400 line-through sm:text-sm">
                ৳{Number(oldPrice).toLocaleString("en-BD")}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-800 px-3 py-3 text-xs font-bold text-white transition hover:bg-amber-900 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:text-sm"
          >
            <ShoppingBag size={17} />
            কার্টে যোগ করুন
          </button>
        </div>
      </div>
    </article>
  );
}
