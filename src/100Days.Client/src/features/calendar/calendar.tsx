import { EntryDto } from "@/types/dtos/EntryDto";
import CalendarTable from "./calendar-table";
import { columns } from "./columns";

interface CalendarProps {
  entries: EntryDto[];
}

export default function Calendar({ entries }: CalendarProps) {
  return (
    <div className="p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold dark:text-gray-300 text-gray-800 mb-4">
        📅 Your Progress Calendar
      </h1>
      <p className="dark:text-gray-400 text-gray-600 mb-6">
        This is different from your usual calendar. Here, you can view your
        entries day by day to reflect on your progress. Remember, it's not about
        adding up every day but about staying consistent over time. 🎉
      </p>
      <p className="dark:text-gray-400 text-gray-600 mb-6">
        Eventually you'll see this grow into a full 100 days of hardwork.
      </p>
      <div>
        <CalendarTable data={entries} columns={columns} />
      </div>
    </div>
  );
}
