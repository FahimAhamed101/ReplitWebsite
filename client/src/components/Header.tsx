import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Cart from "./Cart";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [location] = useLocation();
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch categories for navigation
  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length > 0) {
      window.location.href = `/?q=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="bg-white shadow">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="text-xs md:text-sm">
            <span className="hidden md:inline">Free shipping on orders over $50</span>
            <span className="md:hidden">Free shipping over $50</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-xs md:text-sm hover:underline">Help</a>
            <a href="#" className="text-xs md:text-sm hover:underline">Track Order</a>
            <a href="#" className="text-xs md:text-sm hover:underline">Sign In</a>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-primary font-bold text-xl md:text-2xl">
              Commerce<span className="text-[#ffa41c]">Hope</span>
            </span>
          </Link>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="relative w-full">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute left-0 top-0 mt-2 ml-3 text-gray-400"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
          
          {/* Navigation Icons */}
          <div className="flex items-center space-x-1 md:space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)} 
              className="md:hidden p-2 text-gray-600 hover:text-primary"
            >
              <Search className="h-5 w-5" />
            </button>
            <a href="#" className="p-2 text-gray-600 hover:text-primary hidden md:block">
              <Heart className="h-5 w-5" />
            </a>
            <div className="relative">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)} 
                className="p-2 text-gray-600 hover:text-primary relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#ffa41c] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden p-2 text-gray-600 hover:text-primary"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Search Bar - Mobile */}
        {isSearchOpen && (
          <div className="mt-4 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute left-0 top-0 mt-2 ml-3 text-gray-400"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>
        )}
      </div>
      
      {/* Desktop Navigation */}
      <nav className="bg-white border-t border-gray-200 hidden md:block">
        <div className="container mx-auto px-6">
          <ul className="flex">
            <li>
              <Link 
                href="/" 
                className={`block py-3 px-4 text-sm font-medium transition-colors ${
                  location === "/" ? "text-primary" : "hover:text-primary text-gray-700"
                }`}
              >
                All Products
              </Link>
            </li>
            {categories?.map((category: any) => (
              <li key={category.id}>
                <Link
                  href={`/?category=${category.id}`}
                  className={`block py-3 px-4 text-sm font-medium transition-colors ${
                    location === `/?category=${category.id}` ? "text-primary" : "hover:text-primary text-gray-700"
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <a href="#" className="block py-3 px-4 text-sm font-medium hover:text-primary text-gray-700 transition-colors">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="#" className="block py-3 px-4 text-sm font-medium hover:text-primary text-gray-700 transition-colors">
                Sale
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Sidebar */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories || []}
      />

      {/* Shopping Cart Sidebar */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </header>
  );
}
