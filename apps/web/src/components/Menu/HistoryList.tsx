import { history } from "@/functions/history";
import { type Post } from "@repo/db/data";
import { SummaryItem } from "./SummaryItem";
import { toUrlPath } from "@repo/utils/url";
import Link from "next/link";
import { LinkList } from "./LinkList";

const months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export async function HistoryList({
  selectedYear,
  selectedMonth,
  posts,
}: {
  selectedYear?: string;
  selectedMonth?: string;
  posts: Post[];
}) {
  const historyItems = history(posts);

  // TODO: use the "history" function on "functions" directory to get the history
  //       and render all history items using the SummaryItem component
  return (
      <>
      <LinkList title="History">
        {history(posts).map((item) => (
          <SummaryItem
            key={`${months[item.month]}-${item.year}`}
            count={item.count}
            name={`${months[item.month]}, ${item.year}`}
            isSelected={item.year.toString() === selectedYear && item.month.toString() === selectedMonth}
            link={`/history/${item.year}/${item.month}`}
            title={`History / ${months[item.month]}, ${item.year}`}

          />
        ))}
      </LinkList>
      </>
    );
}
