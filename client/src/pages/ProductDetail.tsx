import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Loader2, 
  Star, 
  Truck, 
  RefreshCw, 
  ShieldCheck,
  ShoppingCart,
  Heart,
  Minus,
  Plus
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function ProductDetail() {
  const [_, params] = useRoute("https://replit-website.vercel.app/product/:id");
  const productId = params?.id ? parseInt(params.id, 10) : null;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
  }, [productId]);

  const { 
    data: product, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: [`https://replit-website.vercel.app/api/products/${productId}`],
    enabled: productId !== null,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-red-500 mb-4 text-2xl">
          {error ? "Error loading product" : "Product not found"}
        </div>
        <p className="text-gray-600 mb-6">
          {error ? "Please try again later." : "The requested product does not exist."}
        </p>
        <a 
          href="/"
          className="bg-primary text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Return to Home
        </a>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const discountPercentage = Math.round(
    ((product.discount - product.price) / product.discount) * 100
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-96 object-contain"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 mr-1 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            </div>
            
            {/* Price */}
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary mr-2">
                ${parseFloat(product.price).toFixed(2)}
              </span>
              <span className="text-gray-500 line-through text-sm">
                ${parseFloat(product.discount).toFixed(2)}
              </span>
              <span className="ml-2 bg-[#ffa41c] text-white text-xs font-bold py-1 px-2 rounded">
                -{discountPercentage}%
              </span>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center">
                <button 
                  onClick={decrementQuantity}
                  className="bg-gray-100 text-gray-700 w-10 h-10 rounded-l flex items-center justify-center hover:bg-gray-200"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="bg-gray-100 w-12 h-10 flex items-center justify-center text-sm border-l border-r border-gray-200">
                  {quantity}
                </span>
                <button 
                  onClick={incrementQuantity}
                  className="bg-gray-100 text-gray-700 w-10 h-10 rounded-r flex items-center justify-center hover:bg-gray-200"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={handleAddToCart}
                className="bg-primary text-white py-3 px-4 rounded-md w-full font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
              </button>
              
              <button className="border border-gray-300 text-gray-700 py-3 px-4 rounded-md w-full font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Heart className="h-5 w-5 mr-2" /> Add to Wishlist
              </button>
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Truck className="h-4 w-4 mr-2" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <RefreshCw className="h-4 w-4 mr-2" />
                <span>30-day return policy</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <ShieldCheck className="h-4 w-4 mr-2" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
