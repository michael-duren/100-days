import { EntryDto } from "@/types/dtos/EntryDto";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<EntryDto>[] = [
  {
    accessorFn: (_row, rowIndex) => rowIndex + 1,
    header: "Day",
    cell: (info) => <span>Day {info.getValue() as string}</span>,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "created",
    header: "Date",
  },
];
