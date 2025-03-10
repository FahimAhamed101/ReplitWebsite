import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import SearchResults from "@/components/SearchResults";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all products
  const { 
    data: products, 
    isLoading: isProductsLoading, 
    error: productsError 
  } = useQuery({
    queryKey: ["/api/products"],
  });

  // Fetch all categories
  const { 
    data: categories, 
    isLoading: isCategoriesLoading, 
    error: categoriesError 
  } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Fetch search results when searchQuery changes
  const { 
    data: searchResults, 
    isLoading: isSearchResultsLoading,
    error: searchError
  } = useQuery({
    queryKey: ["/api/search", searchQuery],
    enabled: isSearching && searchQuery.length > 1,
  });

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchQuery("");
    setIsSearching(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products?.filter((product: any) => product.categoryId === activeCategory);

  const isLoading = isProductsLoading || isCategoriesLoading || (isSearching && isSearchResultsLoading);
  const hasError = productsError || categoriesError || searchError;

  if (hasError) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-red-500 mb-4 text-2xl">Error loading data</div>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Summer Collection 2023</h1>
              <p className="text-gray-600 text-lg mb-6">Discover the latest trends for your everyday needs.</p>
              <div className="space-x-3">
                <a href="#featured" className="bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-block">Shop Now</a>
                <a href="#categories" className="border border-gray-300 bg-white text-gray-800 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors inline-block">Explore</a>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Summer Collection" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
              <div className="absolute top-4 right-4 bg-[#ffa41c] text-white text-sm font-bold py-1 px-3 rounded-full">NEW</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary bg-opacity-10 p-3 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-xl">
                  <circle cx="8" cy="21" r="1"/>
                  <circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over $50</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary bg-opacity-10 p-3 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-xl">
                  <path d="M9 14 4 9l5-5"/>
                  <path d="m15 14 5-5-5-5"/>
                  <path d="M1 9h22"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Easy Returns</h3>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary bg-opacity-10 p-3 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-xl">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Secure Payments</h3>
              <p className="text-gray-600 text-sm">Protected by encryption</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary bg-opacity-10 p-3 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-xl">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Support 24/7</h3>
              <p className="text-gray-600 text-sm">Customer service support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Display search results if searching */}
      {isSearching && searchQuery && (
        <SearchResults 
          searchQuery={searchQuery} 
          searchResults={searchResults || []} 
          isLoading={isSearchResultsLoading} 
          onClearSearch={() => {
            setSearchQuery("");
            setIsSearching(false);
          }}
        />
      )}

      {/* Only show categories and featured products if not searching */}
      {!isSearching && (
        <>
          {/* Categories Section */}
          <section id="categories" className="py-10 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mb-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Shop By Category</h2>
                <p className="text-gray-600">Browse our categories and find what you need</p>
              </div>
              
              {isCategoriesLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories?.map((category: any) => (
                    <CategoryCard 
                      key={category.id} 
                      category={category} 
                      onClick={() => handleCategoryChange(category.id)} 
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
          
          {/* Featured Products Section */}
          <section id="featured" className="py-10">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mb-10 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Products</h2>
                <p className="text-gray-600">Discover our most popular items</p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap justify-center mb-8">
                <button 
                  onClick={() => handleCategoryChange("all")}
                  className={`py-2 px-4 mx-1 mb-2 rounded-md transition-colors ${
                    activeCategory === "all" 
                      ? "bg-primary text-white" 
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  All Products
                </button>
                {categories?.map((category: any) => (
                  <button 
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`py-2 px-4 mx-1 mb-2 rounded-md transition-colors ${
                      activeCategory === category.id 
                        ? "bg-primary text-white" 
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              {/* Loading Indicator */}
              {isLoading ? (
                <div className="text-center py-10">
                  <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
              ) : (
                <>
                  {/* Products Grid */}
                  {filteredProducts?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredProducts.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-300 mb-4">
                        <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"/>
                        <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z"/>
                        <line x1="12" y1="22" x2="12" y2="13"/>
                        <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5"/>
                      </svg>
                      <h3 className="text-xl font-bold mb-2">No products found</h3>
                      <p className="text-gray-600 mb-4">We couldn't find any products in this category.</p>
                      <button 
                        onClick={() => handleCategoryChange("all")} 
                        className="bg-primary text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
                      >
                        View All Products
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </>
      )}

      {/* Newsletter Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Subscribe to Our Newsletter</h2>
            <p className="mb-6 opacity-90">Stay updated with our latest products and exclusive offers.</p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow w-full sm:w-auto py-3 px-4 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ffa41c]"
              />
              <button className="w-full sm:w-auto bg-[#ffa41c] text-white py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
