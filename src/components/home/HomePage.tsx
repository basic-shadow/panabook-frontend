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
import { type ObjectsParsedInfo } from "@/types/objects.types";
import { normalizePropertyValues } from "@/shared/utils/normalizePropertyValues";
import { useInfiniteScroll } from "@/shared/hooks/useInfiniteScroll";

import { FiTrash } from "react-icons/fi";
import { useDeleteObject } from "./api/objects";

type ObjectsTableData = {
  name: string;
  stars: number;
  address: string;
  phone: string;
};

export default function HomePage({
  objects,
  fetchNextPage,
  objectsLoading,
}: {
  objects?: ObjectsInfo[];
  fetchNextPage: () => void;
  objectsLoading: boolean;
}) {
  const [deleteObjectId, setDeleteObjectId] = useState<number | null>(null);
  const [selectedObject, setSelectedObject] =
    useState<ObjectsParsedInfo | null>(null);
  const closeModal = useCallback(() => {
    setSelectedObject(null);
  }, []);

  // DELETE QUERY
  const {
    isLoading: deleteLoading,
    isSuccess: deleteSuccess,
    mutateAsync: deleteAsync,
  } = useDeleteObject();

  const closeDeleteModal = useCallback(() => {
    setDeleteObjectId(null);
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

  // custom hooks
  const observerElem = useInfiniteScroll(fetchNextPage);

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

  const displayObjectInfo = useCallback((value: any) => {
    if (typeof value === "string" || typeof value === "number") {
      return <p>{value}</p>;
    } else if (Array.isArray(value)) {
      return (
        <div>
          {value.map((value, i) => (
            <div key={i}>{valueBoxes("key", value)}</div>
          ))}
        </div>
      );
    } else if (typeof value === "object") {
      return (
        <div>
          {Object.entries(value).map(([key, value]) => (
            <div
              key={key}
              className={
                "flex justify-between" +
                (key === "extraBeds" ? " mb-2 border-b-2 pb-2" : "")
              }
            >
              <p className="mr-2">{key}:</p>
              {valueBoxes(key, value)}
            </div>
          ))}
        </div>
      );
    }
  }, []);

  const valueBoxes = useCallback((key: string, value: any) => {
    switch (key) {
      case "imageUrls":
        return imageBoxes(value);
      default:
        return displayObjectInfo(value);
    }
  }, []);

  // HANDLER
  const onDeleteObject = useCallback((index: number) => {
    return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      setDeleteObjectId(index);
    };
  }, []);

  const onDeleteConfirm = useCallback(async () => {
    if (deleteObjectId === null || objects === undefined || deleteLoading)
      return;
    await deleteAsync(objects[deleteObjectId]!.id);

    setDeleteObjectId(null);
  }, [deleteObjectId]);

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
                  {/* DELETE */}
                  <td>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={onDeleteObject(i)}
                    >
                      <FiTrash className="h-5 w-5" />
                    </button>
                  </td>
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
        <div
          className="ml-2"
          style={{ height: 1, display: "flex", justifyContent: "center" }}
          ref={observerElem}
        >
          {objectsLoading && <SpinnerLoader />}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={selectedObject !== null}
        onClose={closeModal}
        title={selectedObject !== null ? selectedObject.name : ""}
        className="h-screen overflow-y-auto"
      >
        {selectedObject !== null && (
          <div className="flex w-[800px] flex-col border py-4 px-6">
            {Object.entries(selectedObject).map(([key, value]) => {
              return (
                <div
                  key={key + value}
                  className="flex items-center justify-between border-b py-2"
                >
                  <p className="w-min">{key}:</p>
                  <div>{valueBoxes(key, value)}</div>
                </div>
              );
            })}
          </div>
        )}
      </Modal>

      <Modal
        open={deleteObjectId !== null}
        onClose={closeDeleteModal}
        title={
          objects && deleteObjectId !== null
            ? "Удаление отеля #" + objects[deleteObjectId]!.name
            : ""
        }
        className="w-[400px] overflow-y-auto"
      >
        <div className="flex w-full items-center justify-between">
          {/* CANCEL BUTTON */}
          <button
            className="rounded bg-gray-200 py-2 px-4 font-semibold text-gray-700 hover:bg-gray-300"
            onClick={closeDeleteModal}
          >
            Отмена
          </button>
          {/* DELETE BUTTON */}
          <button
            className="rounded bg-red-500 py-2 px-4 font-semibold text-white hover:bg-red-700"
            onClick={onDeleteConfirm}
          >
            {deleteLoading ? <SpinnerLoader /> : "Удалить"}
          </button>
        </div>
      </Modal>
    </MainDashboard>
  );
}
