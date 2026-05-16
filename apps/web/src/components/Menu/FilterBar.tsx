export function FilterBar() {
  return (
    <div className="flex items-center justify-center px-12 py-3 gap-4 bg-secondary">
      <button className="px-4 py-2 text-textSecondary hover:text-wsu transition-colors">
        Women
      </button>
      <button className="px-4 py-2 text-textSecondary hover:text-wsu transition-colors">
        Men
      </button>
      <button className="px-4 py-2 text-textSecondary hover:text-wsu transition-colors">
        Kids
      </button>
      <select className="px-4 py-2 text-textSecondary hover:text-wsu transition-colors">
        <option value="price-asc">Sort by: None</option>
        <option value="newest">Sort by: Best Reviews</option>
        <option value="price-desc">Sort by: Price Ascending</option>
        <option value="price-asc">Sort by: Price Descending</option>
        <option value="newest">Sort by: Name Ascending</option>
        <option value="oldest">Sort by: Name Descending</option>
      </select>
      <select className="px-4 py-2 text-textSecondary hover:text-wsu transition-colors">
        <option value="type-pants">Type: Pants</option>
        <option value="type-shirts">Type: T-Shirts</option>
        <option value="type-shorts">Type: Sweaters</option>
        <option value="type-shoes">Type: Jackets</option>
        <option value="type-hoodies">Type: Hoodies</option>
      </select>
    </div>
  );
}