import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../UI/AppToaster/AppToaster";

export const useDragAndDrop = (
  mutateAsync: any,
  imageList: any[],
  setImageList: any
) => {
  // NOTIFICATIONS
  const { notifyError } = useNotifications();
  // ARRANGE IMAGE LIST
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItem.current = position;
    setDragging(true);
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragOverItem.current = position;
  };

  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    setDragging(false);
    if (dragItem.current === null || dragOverItem.current === null) return;

    const copyListItems = [...imageList];
    const dragItemContent = copyListItems[dragItem.current];
    if (!dragItemContent) return;

    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setImageList(copyListItems);
  };

  // DRAG AND DROP IMAGE
  const [dropZoneVisible, setDropZoneVisible] = useState(false);

  async function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDropZoneVisible(false);
    const file = event.dataTransfer.files[0];
    if (file === null || file === undefined) return;

    await mutateAsync(file);
  }

  async function onUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files === null || event.target.files.length === 0) return;

    const image = event.target.files[0]!;
    if (image.size > 4 * 1024 * 1024) {
      notifyError("Изображение не должно превышать 4 МБ");
      return;
    }

    await mutateAsync(image);
  }

  function onDeleteImage(index: number) {
    setImageList((prev: any) =>
      prev.filter((_: any, i: number) => i !== index)
    );
  }

  // handle drag over and drag leave events
  useEffect(() => {
    function handleDragOver(event: DragEvent) {
      event.preventDefault();
      setDropZoneVisible(true);
    }
    function handleDragLeave(event: DragEvent) {
      event.preventDefault();
      setDropZoneVisible(false);
    }
    if (!dragging) {
      window.addEventListener("dragover", handleDragOver);
      window.addEventListener("dragleave", handleDragLeave);
    }

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
    };
  }, [dragging]);

  return {
    onUploadImage,
    onDeleteImage,
    dragStart,
    dragEnter,
    drop,
    dropZoneVisible,
    handleDrop,
    imageList,
  };
};
