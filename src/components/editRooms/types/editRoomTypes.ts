import * as yup from "yup";

const requiredField = "Обязательное поле";

export type EditRoom = {
  type: number;
  name: number;
  maxGuests: number;
  maxChildren: number;
  surfaceArea: number;
  allowedSmoking: boolean;
  beds: {
    type: number;
    quantity: number;
  }[];
  facilities: number[];
};

export const editRoomSchema = yup.object().shape({
  type: yup.number().required(requiredField),
  name: yup.number().required(requiredField),
  maxGuests: yup.number().typeError(requiredField).required(requiredField),
  maxChildren: yup.number().typeError(requiredField).required(requiredField),
  surfaceArea: yup.number().typeError(requiredField).required(requiredField),
  allowedSmoking: yup.boolean().required(requiredField),
  beds: yup.array().of(
    yup.object().shape({
      type: yup.number().required(requiredField),
      quantity: yup.number().required(requiredField),
    })
  ),
  facilities: yup.array().of(yup.number()).required(requiredField),
});
