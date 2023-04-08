import React, { useCallback, useMemo, useState } from "react";
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";
import Modal from "@/shared/UI/Modal/Modal";

type ObjectsTableData = {
  name: string;
  stars: number;
  address: string;
  contactName: string;
};

export default function HomePage({ objects }: { objects: any }) {
  const [selectedObjectIndex, setSelectedObjectIndex] = useState(-1);
  const closeModal = useCallback(() => {
    setSelectedObjectIndex(-1);
  }, []);

  const columns = useMemo<ColumnDef<ObjectsTableData>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Stars",
        accessorKey: "stars",
      },
      {
        header: "Address",
        accessorKey: "address",
      },
      {
        header: "Contact phone",
        accessorKey: "phone",
      },
    ],
    []
  );
  const data = useMemo(() => {
    return objects;
  }, [objects]);

  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const { rows } = getRowModel();

  return (
    <div className="flex">
      <div className="flex w-1/5 flex-col bg-indigo-500 text-white">
        <p>Список объектов</p>
      </div>

      {/* BODY */}
      <div className="px-4 py-4">
        <table className="app-table">
          <thead>
            {getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, i) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {
                          <p onClick={header.column.getToggleSortingHandler()}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </p>
                        }
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {rows.map((row, i) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, i) => {
                    return (
                      <td key={cell.id}>
                        <p>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </p>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal open={selectedObjectIndex !== -1} onClose={closeModal}>
        <div className="flex flex-col border py-4 px-6">
          {Object.entries(objects[selectedObjectIndex]).map(([key, value]) => {
            return (
              <div
                key={key + value}
                className="flex items-center justify-between"
              >
                <p className="border-r-2 border-indigo-500">{key}</p>
                <p>{value as any}</p>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
