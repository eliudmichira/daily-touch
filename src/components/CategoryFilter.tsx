import { categories } from "../data/products";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Categories</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md transform scale-105"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }
              hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          >
            <div className="flex items-center justify-between">
              <span>{category}</span>
              {selectedCategory === category && (
                <span className="text-white">→</span>
              )}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          Currently Viewing
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {selectedCategory === "All" 
            ? "All Products" 
            : `Products in ${selectedCategory}`}
        </p>
      </div>
    </div>
  );
} 