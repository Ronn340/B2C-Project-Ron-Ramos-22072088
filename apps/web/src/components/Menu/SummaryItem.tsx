import { Bookmark, Server, Database, Cloud } from "lucide-react";
export function SummaryItem({
  name,
  link,
  count,
  isSelected,
  title,
}: {
  name: string;
  link: string;
  count: number;
  isSelected: boolean;
  title?: string;
}) {
  // TODO: Implement the summary item
  // must show the number of posts in that category and the name
  // if if is selected it must show in different color/background

  const categoryIcons: Record<string, React.ReactNode> = {
  React: <Bookmark className="w-4 h-4" />,
  Node: <Server className="w-4 h-4" />,
  Mongo: <Database className="w-4 h-4" />,
  DevOps: <Cloud className="w-4 h-4" />,
};

  return <a href={link} className={`flex list-none text-primary hover:text-wsu hover:bg-gray-200 rounded-lg ${isSelected ? 'selected text-wsu bg-gray-200 rounded-lg' : ''}`} title={title}>
      {categoryIcons[name] && title === "category" && <span className=" mr-2 flex items-center">{categoryIcons[name]}</span>}
        {
      /*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND
      - Logical AND (%%) - >(truthy expression) && (runs if true hence shows icon)
      */} 
     <span data-test-id="post-count" className="ml-3 flex items-center border border-gray-300 rounded-full px-3 py-1">{count}</span> <span className="flex items-center px-3"> {name}</span>
  </a>;
}
