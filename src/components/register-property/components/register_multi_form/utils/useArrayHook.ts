import { useState } from "react";

export default function useArrayHook<T>(
  initState: T[] = [],
  options: T[] = []
) {
  //   const bedTypesList = useMemo(() => {
  //     return bedTypeS.map((bedType) => ({
  //       label: bedType.label,
  //       value: bedType.value,
  //       disabled: !!getValues().roomBeds.find(
  //         (prevBeds) => prevBeds.bedType === bedType.value
  //       ),
  //     }));
  //   }, [getValues().roomBeds]);
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
