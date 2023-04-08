import { useUploadObject } from "@/components/register-property/api/useUploadObject";
import { useRegisterPropertyStore } from "@/components/register-property/store/store";
import { routeEndpoints } from "@/shared/routeEndpoint";
import { AppDropdown } from "@/shared/UI";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import RegisterPropertyButtons from "../buttons_box";
import {
  normalizeTimeSlots,
  normalizeTimeSlotsDropdown,
} from "../utils/normalize_models";
import { useNotifications } from "@/shared/UI/AppToaster/AppToaster";

const array = ["12:00", "14:00", "15:00", ""];

const skipTime = ["12:00", "14:00", "15:00"];
// time slots from 00:00 to 23:30 with 30 min step generate full array
const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";

  return `${hours > 9 ? hours : "0" + hours}:${minutes}`;
}).filter((val) => !skipTime.includes(val));

function TimeSlots({
  time,
  timeSlotIndex,
  selectTime,
  index,
  selectedDropdown,
  selectedTime,
}: {
  time: string;
  selectTime: (selectedTime: string, timeSlot: number, index: number) => void;
  timeSlotIndex: number;
  index: number;
  selectedDropdown?: boolean;
  selectedTime?: string;
}) {
  return (
    <>
      {index === 3 ? (
        <AppDropdown
          selectedValue={{
            label: time,
            value: time,
          }}
          onSelect={(sTime) => {
            selectTime(sTime as string, timeSlotIndex, index);
          }}
          options={timeSlots.map((time) => ({
            label: time,
            value: time,
          }))}
          active={selectedTime === time && selectedDropdown}
        />
      ) : (
        <div
          className={
            "text-md flex w-20 cursor-pointer items-center justify-center gap-1 border py-2 text-center " +
            (selectedTime === time
              ? "bg-indigo-500 text-white"
              : "text-gray-400")
          }
          onClick={() => selectTime(time, timeSlotIndex, index)}
        >
          {time}
        </div>
      )}
    </>
  );
}

export default function PoliciesInfoForm({
  onGoBack,
  onNextStep,
}: {
  onGoBack: () => void;
  onNextStep: () => void;
}) {
  // NOTIFICATIONS
  const { notifySuccess, notifyError } = useNotifications();
  // ROUTER
  const router = useRouter();

  const onSuccess = () => router.push(routeEndpoints.success);

  // SUBMIT HOOK
  const { mutateAsync, isLoading, error } = useUploadObject(onSuccess);

  const items = useRegisterPropertyStore();
  const [registerDate, setRegisterDate] = useState<string[]>(
    normalizeTimeSlots(items)
  );

  const [dropdownSelected, setDropdownSelected] = useState<boolean[]>(() => {
    return normalizeTimeSlotsDropdown(items);
  });
  // check-in-from: 0, check-in-to: 1, check-out-from: 2, check-out-to: 3

  const selectTime = (
    selectedTime: string,
    timeSlot: number,
    index: number
  ) => {
    setDropdownSelected((prev) => {
      const newDropdownSelected = [...prev];
      newDropdownSelected[timeSlot] = index === 3;
      return newDropdownSelected;
    });

    setRegisterDate((prev) => {
      const newRegisterDate = [...prev];
      newRegisterDate[timeSlot] = selectedTime;
      return newRegisterDate;
    });
  };

  useEffect(() => {
    if (error) {
      notifyError(error.message ?? "Ошибка при отправке данных");
    }
  }, [error]);

  async function onSubmit() {
    if (
      !isLoading &&
      registerDate.length === 4 &&
      !registerDate.find((val) => val === undefined || val === "")
    ) {
      const policyInfo = {
        checkInTime: {
          from: registerDate[0]!,
          to: registerDate[1]!,
        },
        checkOutTime: {
          from: registerDate[2]!,
          to: registerDate[3]!,
        },
      };
      useRegisterPropertyStore.setState((_) => policyInfo);

      await mutateAsync({ ...items, ...policyInfo });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-6">
        <div className="flex w-1/2 flex-col bg-white py-6 px-8">
          <h3 className="mb-4 text-lg font-semibold">Регистрация заезда</h3>
          <p className="mb-2 text-gray-500">с:</p>
          <div className="flex flex-wrap gap-2">
            {array.map((time, index) => (
              <TimeSlots
                key={"time" + time + index.toString}
                selectTime={selectTime}
                time={
                  time
                    ? time
                    : (dropdownSelected[0] && registerDate[0]) || "15:00"
                }
                timeSlotIndex={0}
                selectedDropdown={dropdownSelected[0]}
                index={index}
                selectedTime={registerDate[0]}
              />
            ))}
          </div>
          <p className="mb-2 mt-4 text-gray-500">до:</p>
          <div className="flex flex-wrap gap-2">
            {array.map((time, index) => (
              <TimeSlots
                key={"time" + time + (index + 4).toString}
                selectTime={selectTime}
                time={
                  time
                    ? time
                    : (dropdownSelected[1] && registerDate[1]) || "15:00"
                }
                timeSlotIndex={1}
                selectedDropdown={dropdownSelected[1]}
                selectedTime={registerDate[1]}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className="flex w-1/2 flex-col bg-white py-6 px-8">
          <h3 className="mb-4 text-lg font-semibold">Регистрация отъезда</h3>
          <p className="mb-2 text-gray-500">с:</p>
          <div className="flex flex-wrap gap-2">
            {array.map((time, index) => (
              <TimeSlots
                key={"time" + time + (index + 8).toString}
                selectTime={selectTime}
                time={
                  time
                    ? time
                    : (dropdownSelected[2] && registerDate[2]) || "15:00"
                }
                selectedDropdown={dropdownSelected[2]}
                timeSlotIndex={2}
                selectedTime={registerDate[2]}
                index={index}
              />
            ))}
          </div>
          <p className="mb-2 mt-4 text-gray-500">до:</p>
          <div className="flex flex-wrap gap-2">
            {array.map((time, index) => (
              <TimeSlots
                key={"time" + time + (index + 12).toString}
                selectTime={selectTime}
                time={
                  time
                    ? time
                    : (dropdownSelected[3] && registerDate[3]) || "15:00"
                }
                selectedDropdown={dropdownSelected[3]}
                timeSlotIndex={3}
                selectedTime={registerDate[3]}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <RegisterPropertyButtons
        onGoBack={onGoBack}
        onNextStep={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
