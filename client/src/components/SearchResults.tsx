import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";

interface SearchResultsProps {
  searchQuery: string;
  searchResults: any[];
  isLoading: boolean;
  onClearSearch: () => void;
}

export default function SearchResults({ searchQuery, searchResults, isLoading, onClearSearch }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-gray-600">Searching products...</p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-300 mb-4">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
        <h2 className="text-2xl font-bold mb-2">No results found</h2>
        <p className="text-gray-600 mb-6">We couldn't find any products matching '{searchQuery}'</p>
        <button 
          onClick={onClearSearch} 
          className="bg-primary text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Clear Search
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Search Results</h2>
        <p className="text-gray-600">Showing results for '{searchQuery}'</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchResults.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
