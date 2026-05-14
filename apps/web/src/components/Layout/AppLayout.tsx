import type { PropsWithChildren } from "react";
import { Content } from "../Content";
import { LeftMenu } from "../Menu/LeftMenu";
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
      <div className="w-80 shrink-0 border-r scroll overflow-y-auto">
        <LeftMenu />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopMenu query={query} />
        <Content>{children}</Content>
      </div>
    </div>
  );
}