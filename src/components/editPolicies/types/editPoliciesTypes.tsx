import * as yup from "yup";

const requiredField = "Обязательное поле";

export type PropertyPolicies = {
  checkIn: {
    from: string;
    to: string;
  };
  checkOut: {
    from: string;
    to: string;
  };
  allowPets: boolean;
};

export const policiesSchema = yup.object().shape({
  checkIn: yup.object().shape({
    from: yup.string().required(requiredField),
    to: yup.string().required(requiredField),
  }),
  checkOut: yup.object().shape({
    from: yup.string().required(requiredField),
    to: yup.string().required(requiredField),
  }),
  allowPets: yup.boolean().required(requiredField),
});
