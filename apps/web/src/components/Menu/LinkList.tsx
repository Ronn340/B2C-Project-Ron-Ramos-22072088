import type { PropsWithChildren } from "react";

export function LinkList(props: PropsWithChildren<{ title: string }>) {
  return <div className="flex flex-col gap-3 pt-8">
  <h3 className="text-gray-500 font-bold text-xs">{props.title}</h3>
  {props.children}
  </div>;
}
