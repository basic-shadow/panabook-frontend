import { useState } from "react";

export default function useArrayHook<T>(
  initState: T[] = [],
  options: T[] = []
) {
  //   const bedTypesList = useMemo(() => {
  //     return BED_TYPES.map((bedType) => ({
  //       label: bedType.label,
  //       value: bedType.value,
  //       disabled: !!getValues().room_beds.find(
  //         (prevBeds) => prevBeds.bed_type === bedType.value
  //       ),
  //     }));
  //   }, [getValues().room_beds]);
  //   const add = (value) => {
  //     setArray([...array, value]);
  //   };
  //   const remove = (index) => {
  //     setArray(array.filter((_, i) => i !== index));
  //   };
  //   const update = (index, value) => {
  //     setArray(array.map((item, i) => (i === index ? value : item)));
  //   };
  //   return {
  //     array,
  //     add,
  //     remove,
  //     update,
  //   };
}
