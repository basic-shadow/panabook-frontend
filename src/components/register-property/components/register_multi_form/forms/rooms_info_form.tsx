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
    (state) => state.propertyRooms
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
      roomName: 1,
      roomType: 1,
      allowedSmoking: 0,
      roomBeds: [{ bedType: 1, quantity: 1 }],
    },
  });

  const getRoomNames = useMemo(() => {
    return ROOM_NAMES.slice(
      ROOM_TYPES[getValues().roomType - 1]!.namespaceOffset,
      ROOM_TYPES[getValues().roomType - 1]!.namespaceLength +
        ROOM_TYPES[getValues().roomType - 1]!.namespaceOffset
    );
  }, [getValues().roomType]);

  const onAddNewBed = () => {
    const roomBeds = getValues("roomBeds");
    if (roomBeds.length === BED_TYPES.length) return;

    const unSelectedBedType = BED_TYPES.find(
      (val) => !roomBeds.find((prevBeds) => prevBeds.bedType === val.value)
    );
    const bedType = unSelectedBedType?.value || 1;
    setValue("roomBeds", [...roomBeds, { bedType, quantity: 1 }]);
  };

  const onDeleteBed = (index: number) => {
    const roomBeds = getValues("roomBeds");
    roomBeds.splice(index, 1);
    setValue("roomBeds", roomBeds, { shouldValidate: true });
  };

  const bedTypesList = useMemo(() => {
    return BED_TYPES.map((bedType) => ({
      label: bedType.label,
      value: bedType.value,
      disabled: !!getValues().roomBeds.find(
        (prevBeds) => prevBeds.bedType === bedType.value
      ),
    }));
  }, [getValues().roomBeds]);

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
    useRegisterPropertyStore.setState({ propertyRooms: rooms });
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
                    htmlFor="roomType"
                    className="mb-2 inline-flex text-sm text-gray-800"
                  >
                    Тип номера
                  </label>
                  <AppDropdown
                    name="roomType"
                    selectedValue={{
                      label: ROOM_TYPES[watch().roomType - 1]!.label,
                      value: watch().roomType,
                    }}
                    options={ROOM_TYPES}
                    onSelect={(val) => {
                      setValue("roomType", val as number, {
                        shouldValidate: true,
                      });
                      setValue(
                        "roomName",
                        ROOM_NAMES[
                          ROOM_TYPES[(val as number) - 1]!.namespaceOffset + 1
                        ]!.value - 1,
                        { shouldValidate: true }
                      );
                    }}
                  />
                </div>
                {/* ROOM NAME INPUT */}
                <div className="mb-6 flex flex-col">
                  <label
                    htmlFor="roomName"
                    className="mb-2 inline-flex text-sm text-gray-800"
                  >
                    Название номера
                  </label>
                  <AppDropdown
                    name="roomName"
                    selectedValue={{
                      label: ROOM_NAMES[watch().roomName - 1]!.label,
                      value: watch().roomName,
                    }}
                    options={getRoomNames}
                    onSelect={(val) =>
                      setValue("roomName", val as number, {
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
                  name="allowedSmoking"
                  options={SMOKING_CATEGORY}
                  selectedValue={{
                    label: SMOKING_CATEGORY[watch().allowedSmoking]!.label,
                    value: watch().allowedSmoking,
                  }}
                  onSelect={(value) => {
                    setValue("allowedSmoking", value as number, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
              {/* ADDRESS CITY INPUT */}
              <div className="mb-6 flex flex-col">
                <label
                  htmlFor="similarRoomsQuantity"
                  className="mb-2 inline-flex text-gray-800"
                >
                  Количество номеров этого типа
                </label>
                <input
                  {...register("similarRoomsQuantity", {
                    required: "This is required.",
                  })}
                  type="number"
                  onWheel={(e) => e.currentTarget?.blur()}
                  className="w-fit rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
                />

                {errors.similarRoomsQuantity && (
                  <p className="mt-2 text-start text-sm text-red-500">
                    {errors.similarRoomsQuantity.message}
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
                  {watch().roomBeds.map((bed, i) => (
                    <div
                      key={"bed" + bed.bedType + i}
                      className="mb-2 flex items-center gap-4"
                    >
                      <AppDropdown
                        selectedValue={{
                          label: BED_TYPES[bed.bedType]!.label,
                          value: bed.bedType,
                        }}
                        options={bedTypesList}
                        onSelect={(val) => {
                          const roomBeds = getValues().roomBeds;
                          roomBeds[i]!.bedType = val as number;
                          roomBeds[i]!.quantity = 1;

                          setValue("roomBeds", roomBeds, {
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
                          const roomBeds = getValues().roomBeds;
                          roomBeds[i]!.quantity = val as number;
                          roomBeds[i]!.bedType = bed.bedType;

                          setValue("roomBeds", roomBeds, {
                            shouldValidate: true,
                          });
                        }}
                      />
                      {watch().roomBeds.length > 1 && (
                        <AiOutlineMinusCircle
                          onClick={() => onDeleteBed(i)}
                          size={24}
                          className="cursor-pointer text-indigo-500"
                        />
                      )}
                    </div>
                  ))}

                  {/* ADD NEW ROOM BED */}
                  {watch("roomBeds").length !== BED_TYPES.length && (
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
                    htmlFor="maxGuestSize"
                    className="mb-2 inline-flex text-gray-800"
                  >
                    Как много гостей может остановиться в данном номере?
                  </label>
                  <input
                    {...register("maxGuestSize")}
                    type="number"
                    onWheel={(e) => e.currentTarget?.blur()}
                    className="w-20 rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
                    placeholder="1"
                  />

                  {errors.maxGuestSize && (
                    <p className="mt-2 text-start text-sm text-red-500">
                      {errors.maxGuestSize.message}
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
                htmlFor="roomSurface"
                className="mb-2 inline-flex text-lg font-semibold text-gray-800 "
              >
                Площадь номера, квадратные метры
              </label>
              <input
                {...register("roomSurface")}
                type="number"
                onWheel={(e) => e.currentTarget?.blur()}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
              />

              {errors.roomSurface && (
                <p className="mt-2 text-start text-sm text-red-500">
                  {errors.roomSurface.message}
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
                htmlFor="nonResidentPrice"
                className="mb-2 inline-flex text-gray-800 "
              >
                Цена за ночь, тенге
              </label>
              <input
                {...register("nonResidentPrice")}
                type="number"
                onWheel={(e) => e.currentTarget?.blur()}
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 focus:ring"
              />

              {errors.nonResidentPrice && (
                <p className="mt-2 text-start text-sm text-red-500">
                  {errors.nonResidentPrice.message}
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
              {ROOM_NAMES[room.roomName]!.label}
            </h3>
            <span>
              Количество номеров этого типа:{" "}
              <strong>{room.similarRoomsQuantity}</strong>
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
