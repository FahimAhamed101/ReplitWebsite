import { X } from "lucide-react";
import { Link } from "wouter";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: any[];
}

export default function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      ></div>
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pt-5 pb-4">
            <div className="flex items-center justify-between mb-5">
              <span className="text-primary font-bold text-xl">Commerce<span className="text-[#ffa41c]">Hope</span></span>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mt-4">
              <Link href="/" onClick={onClose}>
                <a className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 rounded">
                  All Products
                </a>
              </Link>
              
              {categories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/?category=${category.id}`}
                  onClick={onClose}
                >
                  <a className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 rounded">
                    {category.name}
                  </a>
                </Link>
              ))}
              
              <a href="#" className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 rounded">New Arrivals</a>
              <a href="#" className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 rounded">Sale</a>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <a href="#" className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 rounded">Sign In</a>
              <a href="#" className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 rounded">Create Account</a>
              <a href="#" className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 rounded">Track Order</a>
              <a href="#" className="block py-2 px-4 text-sm font-medium hover:bg-gray-100 rounded">Help Center</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
