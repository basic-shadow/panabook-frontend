import React, { useCallback, useMemo, useState } from "react";
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import Modal from "@/shared/UI/Modal/Modal";
import MainDashboard from "@/entities/mainDashboard/mainDashboard";
import { type ObjectsInfo } from "@/server/user/objects.types";
import SpinnerLoader from "@/shared/UI/SpinnerLoader/SpinnerLoader";
import Image from "next/image";
import { PROPERTY_CATEGORIES } from "../register-property/utils/const_data";
import { type ObjectsParsedInfo } from "@/types/objects.types";
import { normalizePropertyValues } from "@/shared/utils/normalizePropertyValues";

type ObjectsTableData = {
  name: string;
  stars: number;
  address: string;
  phone: string;
};

export default function HomePage({
  objects,
  objectsLoading,
}: {
  objects?: ObjectsInfo[];
  objectsLoading: boolean;
}) {
  const [selectedObject, setSelectedObject] =
    useState<ObjectsParsedInfo | null>(null);
  const closeModal = useCallback(() => {
    setSelectedObject(null);
  }, []);

  const objectsTableData = useMemo(() => {
    if (!objects) return [];

    return objects.map((object) => ({
      name: object.name,
      stars: object.stars,
      address: object.address,
      phone: object.contactPhone1,
    }));
  }, [objects]);

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

  const { getHeaderGroups, getRowModel } = useReactTable({
    columns,
    data: objectsTableData,
    getCoreRowModel: getCoreRowModel(),
  });
  const { rows } = getRowModel();

  const openModal = useCallback(
    (index: number) => {
      if (objects !== undefined)
        return () =>
          setSelectedObject(normalizePropertyValues(objects[index]!));
    },
    [objects]
  );

  const imageBoxes = useCallback((imageUrl: string[]) => {
    return (
      <div className="flex flex-col items-center">
        {imageUrl.map((url, i) => (
          <div key={i} className="relative mb-4">
            <Image
              className="object-cover"
              src={process.env.NEXT_PHOTO_BASE_URL + url}
              alt={"object"}
              width={400}
              height={400}
            />
          </div>
        ))}
      </div>
    );
  }, []);

  const valueBoxes = useCallback((key: string, value: any) => {
    switch (key) {
      case "imageUrls":
        return imageBoxes(value);
      default:
        return <p>{value}</p>;
    }
  }, []);

  return (
    <MainDashboard>
      <div className="w-full px-8 py-8">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            {getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, i) => {
                    return (
                      <th
                        key={header.id}
                        scope="col"
                        className="px-6 py-3"
                        colSpan={header.colSpan}
                      >
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
                <tr
                  key={row.id}
                  className="border-b bg-white"
                  onClick={openModal(i)}
                >
                  {row.getVisibleCells().map((cell, i) => {
                    return (
                      <td
                        key={cell.id}
                        className={`cursor-pointer px-6 py-4 ${
                          i === 0
                            ? "whitespace-nowrap font-medium text-gray-900"
                            : ""
                        } `}
                      >
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
            {objectsLoading && (
              <tr>
                <td colSpan={columns.length} className="py-4 text-center">
                  <SpinnerLoader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal
        open={selectedObject !== null}
        onClose={closeModal}
        title={selectedObject !== null ? selectedObject.name : ""}
      >
        {selectedObject !== null && (
          <div className="flex w-[800px] flex-col border py-4 px-6">
            {Object.entries(selectedObject).map(([key, value]) => {
              return (
                <div
                  key={key + value}
                  className="flex items-center justify-between border-b py-2"
                >
                  <p className="">{key}:</p>
                  {valueBoxes(key, value)}
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </MainDashboard>
  );
}
