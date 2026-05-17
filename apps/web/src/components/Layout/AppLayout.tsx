import type { PropsWithChildren } from "react";
import { Content } from "../Content";
import { TopMenu } from "./TopMenu";

export async function AppLayout({
  children,
  query,
  selectedCategory,
  selectedYear,
  selectedMonth,
  selectedTag
}: PropsWithChildren<{ 
  query?: string; 
  selectedCategory?: string; 
  selectedYear?: string; 
  selectedMonth?: string;
  selectedTag?: string;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopMenu query={query} />
        <Content>{children}</Content>
      </div>
    </div>
  );
}