interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    image: string;
  };
  onClick: () => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <a 
      href="#" 
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
    >
      <img 
        src={category.image} 
        alt={category.name} 
        className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-bold">{category.name}</h3>
      </div>
    </a>
  );
}
