import { useState } from "react";
import { Link } from "wouter";
import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discountPercentage = Math.round(
    ((product.discount - product.price) / product.discount) * 100
  );

  return (
    <div 
      className="product-card bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
          <div 
            className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-medium transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            Quick View
          </div>
          <div className="absolute top-2 right-2 bg-[#ffa41c] text-white text-xs font-bold py-1 px-2 rounded">
            -{discountPercentage}%
          </div>
        </div>
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase">
              {product.categoryId}
            </span>
          </div>
          <h3 className="font-medium text-gray-800 mb-1 hover:text-primary cursor-pointer">
            {product.name}
          </h3>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 mr-1 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-primary">${parseFloat(product.price).toFixed(2)}</span>
              <span className="text-xs text-gray-500 line-through ml-1">${parseFloat(product.discount).toFixed(2)}</span>
            </div>
            <button 
              onClick={handleAddToCart} 
              className="bg-primary text-white p-2 rounded-full hover:bg-opacity-90 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
