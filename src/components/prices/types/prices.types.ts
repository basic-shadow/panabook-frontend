import * as yup from "yup";

const requiredField = "Обязательное поле";
const positive = "Число должно быть положительным";

export type PriceProperty = {
  selectedRoom: number;
  selectedRate: number;
  dateFrom: string;
  dateTo: string;
  price: number;
  activeRange: number[];
};

export const pricePropertySchema = yup.object().shape({
  selectedRoom: yup
    .number()
    .typeError("Должно быть числом")
    .positive(positive)
    .required(requiredField),
  selectedRate: yup
    .number()
    .typeError("Должно быть числом")
    .positive(positive)
    .required(requiredField),
  dateFrom: yup.string().required(requiredField),
  dateTo: yup.string().required(requiredField),
  price: yup
    .number()
    .typeError("Должно быть числом")
    .positive(positive)
    .required(requiredField),
  activeRange: yup.array().of(yup.number()).required(requiredField),
});
