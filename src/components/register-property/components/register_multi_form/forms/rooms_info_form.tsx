import AppButton from "@/shared/UI/AppButton/AppButton";
import React, { memo, useMemo, useState } from "react";
import { TbSofa } from "react-icons/tb";
import { BsPlusCircle, BsPlusLg } from "react-icons/bs";
import AppDropdown from "@/shared/UI/AppDropdown/AppDropdown";
import {
  BED_NUMBERS,
  BED_TYPES,
  ROOM_NAMES,
  ROOM_TYPES,
} from "../utils/const_data";
import RadioGroup from "@/shared/UI/RadioGroup/RadioGroup";
import { SMOKING_CATEGORY } from "@/components/register-property/utils/const_data";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { type IPropertyRoomWithFacilities } from "@/components/register-property/types/register_property_types";
import { yupResolver } from "@hookform/resolvers/yup";
import { roomsInfoSchema } from "@/components/register-property/types/validations";
import { useRegisterPropertyStore } from "@/components/register-property/store/store";
import RegisterPropertyButtons from "../buttons_box";

const NO_ROOM_TEXT =
  "Номера не добавлены. Добавьте номера и заполните информацию о кроватях, количестве гостей и цене.";

export default memo(function RoomsInfoFrom({
  onGoBack,
  onNextStep,
}: {
  onGoBack: () => void;
  onNextStep: () => void;
}) {
  // MULTIFORM STATE
  const propertyRooms = useRegisterPropertyStore(
    (state) => state.property_rooms
  );

  const [rooms, setRooms] =
    useState<IPropertyRoomWithFacilities[]>(propertyRooms);
  const [addingRoom, setAddingRoom] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const {
    register,
    setValue,
    watch,
    getValues,
    reset,
    formState: { isValid, errors },
  } = useForm<IPropertyRoomWithFacilities>({
    resolver: yupResolver(roomsInfoSchema),
    defaultValues: {
      room_name: 0,
      room_type: 0,
      allowed_smoking: 0,
      room_beds: [{ bed_type: 0, quantity: 1 }],
    },
  });

  const getRoomNames = useMemo(() => {
    return ROOM_NAMES.slice(
      ROOM_TYPES[getValues().room_type]!.namespaceOffset,
      ROOM_TYPES[getValues().room_type]!.namespaceLength +
        ROOM_TYPES[getValues().room_type]!.namespaceOffset
    );
  }, [getValues().room_type]);

  const onAddNewBed = () => {
    const roomBeds = getValues("room_beds");
    if (roomBeds.length === BED_TYPES.length) return;

    const unSelectedBedType = BED_TYPES.find(
      (val) => !roomBeds.find((prevBeds) => prevBeds.bed_type === val.value)
    );
    const bed_type = unSelectedBedType?.value || 1;
    setValue("room_beds", [...roomBeds, { bed_type, quantity: 1 }]);
  };

  const onDeleteBed = (index: number) => {
    const roomBeds = getValues("room_beds");
    roomBeds.splice(index, 1);
    setValue("room_beds", roomBeds, { shouldValidate: true });
  };

  const bedTypesList = useMemo(() => {
    return BED_TYPES.map((bedType) => ({
      label: bedType.label,
      value: bedType.value,
      disabled: !!getValues().room_beds.find(
        (prevBeds) => prevBeds.bed_type === bedType.value
      ),
    }));
  }, [getValues().room_beds]);

  function onSaveRoom() {
    if (isValid) {
      const values = getValues();
      if (editingIndex === -1) {
        setRooms((prev) => [...prev, values]);
      } else {
        setRooms((prev) => {
          prev[editingIndex] = values;
          return [...prev];
        });
      }
      setAddingRoom(false);
      reset();
    }
  }

  function onEditRoom(index: number) {
    reset(rooms[index]);
    setAddingRoom(true);
    setEditingIndex(index);
  }

  function onDeleteRoom(index: number) {
    setRooms((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  }

  function cancelSaveRoom() {
    setAddingRoom(false);
    reset();
  }

  function onAddRoom() {
    setEditingIndex(-1);
    setAddingRoom(true);
  }

  function onSubmit() {
    if (rooms.length === 0) return;
    useRegisterPropertyStore.setState({ property_rooms: rooms });
    onNextStep();
  }

  return (
    <div>
      {/* NO ROOMS BOX */}
      {!addingRoom && rooms.length === 0 && (
        <div className="mb-6 flex flex-col items-center bg-white py-4 sm:py-6 lg:py-8">
          <p className="mt-2 text-center text-sm text-gray-600">
            {NO_ROOM_TEXT}
          </p>
          <div className="relative mt-6 rounded-full border border-gray-400 p-4">
            <div className="absolute top-0 right-0 z-10 h-8 w-8 rounded-full border-2 border-gray-400 bg-white">
              <div className="flex h-full items-center justify-center">
                <BsPlusLg color="#198AE1" />
              </div>
            </div>
            <TbSofa color="gray" size={82} />
          </div>
          <AppButton
            onClick={onAddRoom}
            text="Добавить номер"
            className="mt-8 px-12"
          />
        </div>
      )}
      {/* ADD ROOM FORM */}
      {addingRoom && (
        <form>
          {/* FIRST FORM BOX */}
          <div className="bg-white py-4 sm:py-6 lg:py-8">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                Номер
              </h2>
              {/* ROOM TYPE INPUT */}
              <div className="flex gap-6">
                <div className="mb-6 flex flex-col">
                  <label
                    htmlFor="room_type"
                    className="mb-2 inline-flex text-sm text-gray-800"
                  >
                    Тип номера
                  </label>
                  <AppDropdown
                    name="room_type"
                    selectedValue={{
                      label: ROOM_TYPES[watch().room_type]!.label,
                      value: watch().room_type,
                    }}
                    options={ROOM_TYPES}
                    onSelect={(val) => {
                      setValue("room_type", val as number, {
                        shouldValidate: true,
                      });
                      setValue(
                        "room_name",
                        ROOM_NAMES[
                          ROOM_TYPES[val as number]!.namespaceOffset + 1
                        ]!.value - 1,
                        { shouldValidate: true }
                      );
                    }}
                  />
                </div>
                {/* ROOM NAME INPUT */}
                <div className="mb-6 flex flex-col">
                  <label
                    htmlFor="room_name"
                    className="mb-2 inline-flex text-sm text-gray-800"
                  >
                    Название номера
                  </label>
                  <AppDropdown
                    name="room_name"
                    selectedValue={{
                      label: ROOM_NAMES[watch().room_name]!.label,
                      value: watch().room_name,
                    }}
                    options={getRoomNames}
                    onSelect={(val) =>
                      setValue("room_name", val as number, {
                        shouldValidate: true,
                      })
                    }
                  />

                  <p className="mt-2 text-start text-sm text-gray-400">
                    Это названия появится на сайте Kaz-booking.kz
                  </p>
                </div>
              </div>
              {/* SMOKING INPUT */}
              <div className="mb-6">
                <RadioGroup
                  name="allowed_smoking"
                  options={SMOKING_CATEGORY}
                  selectedValue={{
                    label: SMOKING_CATEGORY[watch().allowed_smoking]!.label,
                    value: watch().allowed_smoking,
                  }}
                  onSelect={(value) => {
                    setValue("allowed_smoking", value as number, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
              {/* ADDRESS CITY INPUT */}
              <div className="mb-6 flex flex-col">
                <label
                  htmlFor="similar_rooms_quantity"
                  className="mb-2 inline-flex text-gray-800"
                >
                  Количество номеров этого типа
                </label>
                <input
                  {...register("similar_rooms_quantity", {
                    required: "This is required.",
                  })}
                  type="number"
                  onWheel={(e) => e.currentTarget?.blur()}
                  className="w-fit rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
                />

                {errors.similar_rooms_quantity && (
                  <p className="mt-2 text-start text-sm text-red-500">
                    {errors.similar_rooms_quantity.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* SECOND FORM BOX */}
          <div className="mt-4 bg-white py-4 sm:py-6 lg:py-8">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                Количество кроватей в данном номере
              </h2>
              <p className="-mx-8 mb-6 mt-4 bg-blue-100 py-4 px-8 text-sm text-gray-600">
                Расскажите нам о кроватях в вашем номере, не включая
                дополнительные кровати.
              </p>
              <div className="border py-4 px-8">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  Кровати
                </h2>
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="name"
                    className="inline-flex text-sm text-gray-800"
                  >
                    Кровати какого типа доступны в данном номере?
                  </label>
                  {/* ROOM BEDS INPUT */}
                  {watch().room_beds.map((bed, i) => (
                    <div
                      key={"bed" + bed.bed_type + i}
                      className="mb-2 flex items-center gap-4"
                    >
                      <AppDropdown
                        selectedValue={{
                          label: BED_TYPES[bed.bed_type]!.label,
                          value: bed.bed_type,
                        }}
                        options={bedTypesList}
                        onSelect={(val) => {
                          const room_beds = getValues().room_beds;
                          room_beds[i]!.bed_type = val as number;
                          room_beds[i]!.quantity = 1;

                          setValue("room_beds", room_beds, {
                            shouldValidate: true,
                          });
                        }}
                      />
                      <span>X</span>
                      {/* BED NUMBER INPUT */}
                      <AppDropdown
                        selectedValue={{
                          label: bed.quantity,
                          value: bed.quantity,
                        }}
                        options={BED_NUMBERS}
                        onSelect={(val) => {
                          const room_beds = getValues().room_beds;
                          room_beds[i]!.quantity = val as number;
                          room_beds[i]!.bed_type = bed.bed_type;

                          setValue("room_beds", room_beds, {
                            shouldValidate: true,
                          });
                        }}
                      />
                      {watch().room_beds.length > 1 && (
                        <AiOutlineMinusCircle
                          onClick={() => onDeleteBed(i)}
                          size={24}
                          className="cursor-pointer text-indigo-500"
                        />
                      )}
                    </div>
                  ))}

                  {/* ADD NEW ROOM BED */}
                  {watch("room_beds").length !== BED_TYPES.length && (
                    <div
                      className="mb-4 flex w-fit cursor-pointer items-center gap-2 rounded-md border border-indigo-500 px-2 py-2 text-indigo-500"
                      onClick={onAddNewBed}
                    >
                      <IoAddCircleOutline size={24} />
                      Добавить кровать
                    </div>
                  )}
                </div>
                {/* ROOMS NUMBER INPUT */}
                <div className="mb-6 flex flex-col">
                  <label
                    htmlFor="max_guest_size"
                    className="mb-2 inline-flex text-gray-800"
                  >
                    Как много гостей может остановиться в данном номере?
                  </label>
                  <input
                    {...register("max_guest_size")}
                    type="number"
                    onWheel={(e) => e.currentTarget?.blur()}
                    className="w-20 rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
                    placeholder="1"
                  />

                  {errors.max_guest_size && (
                    <p className="mt-2 text-start text-sm text-red-500">
                      {errors.max_guest_size.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* THIRD FORM BOX */}
          <div className="mt-4 bg-white py-4 sm:py-6 lg:py-8">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <label
                htmlFor="room_surface"
                className="mb-2 inline-flex text-lg font-semibold text-gray-800 "
              >
                Площадь номера, квадратные метры
              </label>
              <input
                {...register("room_surface")}
                type="number"
                onWheel={(e) => e.currentTarget?.blur()}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
              />

              {errors.room_surface && (
                <p className="mt-2 text-start text-sm text-red-500">
                  {errors.room_surface.message}
                </p>
              )}
            </div>
          </div>
          {/* FOURTH FORM BOX */}
          <div className="mt-4 bg-white py-4 sm:py-6 lg:py-8">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                Базовая цена
              </h2>
              <p className="-mx-8 mb-6 mt-4 bg-blue-100 py-4 px-8 text-sm text-gray-600">
                Это цена за номер при стандартном размещении, которая будет
                автоматически применена для всех дней на год вперед. Вы сможете
                настроить цены в разделе шахматка перед тем, как ваш объект
                размещения появится на сайте.
              </p>
              <label
                htmlFor="non_resident_price"
                className="mb-2 inline-flex text-gray-800 "
              >
                Цена за ночь, тенге
              </label>
              <input
                {...register("non_resident_price")}
                type="number"
                onWheel={(e) => e.currentTarget?.blur()}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
              />

              {errors.non_resident_price && (
                <p className="mt-2 text-start text-sm text-red-500">
                  {errors.non_resident_price.message}
                </p>
              )}
            </div>
          </div>
        </form>
      )}
      {/* ROOMS LIST */}
      {!addingRoom &&
        rooms.map((room, i) => (
          <div
            className="mb-2 flex justify-between gap-2 bg-white px-6 py-10"
            key={"room" + i}
          >
            <h3 className="text-lg font-semibold">
              {ROOM_NAMES[room.room_name]!.label}
            </h3>
            <span>
              Количество номеров этого типа:{" "}
              <strong>{room.similar_rooms_quantity}</strong>
            </span>
            <div className="flex">
              <span
                className="mr-8 cursor-pointer text-blue-500"
                onClick={() => onEditRoom(i)}
              >
                Изменить
              </span>
              <span
                className="cursor-pointer text-red-400"
                onClick={() => onDeleteRoom(i)}
              >
                Удалить
              </span>
            </div>
          </div>
        ))}

      {/* BUTTONS */}
      {!addingRoom && rooms.length > 0 && (
        <div className="my-8 flex justify-center">
          <AppButton
            text={"Добавить еще номер"}
            styleType="outlined"
            onClick={onAddRoom}
            prefixIcon={<BsPlusCircle />}
          />
        </div>
      )}
      <RegisterPropertyButtons
        onGoBack={addingRoom ? cancelSaveRoom : onGoBack}
        onNextStep={addingRoom ? onSaveRoom : onSubmit}
        cancelText={addingRoom ? "Отменить" : "Назад"}
        submitText={addingRoom ? "Сохранить" : "Продолжить"}
      />
    </div>
  );
});
