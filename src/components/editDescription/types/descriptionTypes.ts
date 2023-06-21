import * as yup from "yup";

const requiredField = "Обязательное поле";

export type PropertyDescription = {
  name: string;
  commission: number;
  type: number;
  city: number;
  totalRooms: number;
  priceForResidents: number;
  priceForNonResidents: number;
  stars: number;
  address: string;
  contactName: string;
  contactPhone: string;
  contactPhone2?: string;
  language: number[];
};

export const descriptionSchema = yup.object().shape({
  name: yup.string().required(requiredField),
  type: yup.number().required(requiredField),
  city: yup.number().typeError(requiredField).required(requiredField),
  totalRooms: yup.number().typeError(requiredField).required(requiredField),
  priceForResidents: yup
    .number()
    .typeError(requiredField)
    .required(requiredField),
  priceForNonResidents: yup
    .number()
    .typeError(requiredField)
    .required(requiredField),
  stars: yup.number().typeError(requiredField).required(requiredField),
  language: yup.array().typeError(requiredField).required(requiredField),
  contactName: yup.string().required(requiredField),
  contactPhone: yup
    .string()
    .transform((value) => "+" + value.replace(/\D/g, ""))
    .min(12, "Введите действующий номер телефона")
    .required(requiredField),
  contactPhone2: yup.string().notRequired(),
  address: yup.string().required(requiredField),
});
