import { X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Checkout from "./Checkout";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative flex flex-col ml-auto w-full max-w-md bg-white h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <button 
                onClick={onClose}
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex space-x-4 border-b border-gray-100 pb-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded" 
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-primary font-bold">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                          className="bg-gray-100 text-gray-700 w-8 h-8 rounded-l flex items-center justify-center hover:bg-gray-200"
                        >
                          <span className="text-xs">-</span>
                        </button>
                        <span className="bg-gray-100 w-8 h-8 flex items-center justify-center text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)} 
                          className="bg-gray-100 text-gray-700 w-8 h-8 rounded-r flex items-center justify-center hover:bg-gray-200"
                        >
                          <span className="text-xs">+</span>
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.productId)} 
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-bold">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={handleCheckout}
                  className="bg-primary text-white py-3 px-4 rounded-md w-full font-medium hover:bg-opacity-90 transition-colors"
                >
                  Proceed to Checkout
                </button>
                <button 
                  onClick={onClose}
                  className="border border-gray-300 text-gray-700 py-3 px-4 rounded-md w-full font-medium mt-2 hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isCheckoutOpen && (
        <Checkout 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
        />
      )}
    </div>
  );
}
