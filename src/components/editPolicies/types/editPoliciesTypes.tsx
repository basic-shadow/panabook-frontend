import * as yup from "yup";

const requiredField = "Обязательное поле";

export type PropertyPolicies = {
  checkInTime: {
    from: string;
    to: string;
  };
  checkOutTime: {
    from: string;
    to: string;
  };
  allowedPets?: boolean;
};

export const policiesSchema = yup.object().shape({
  checkInTime: yup.object().shape({
    from: yup.string().required(requiredField),
    to: yup.string().required(requiredField),
  }),
  checkOutTime: yup.object().shape({
    from: yup.string().required(requiredField),
    to: yup.string().required(requiredField),
  }),
  allowedPets: yup.boolean(),
});
