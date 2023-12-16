import * as yup from "yup";
const requiredField = "Обязательное поле";

export type EditUserProfileInfo = {
  email: string;
  firstName: string;
  lastName?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  // birthDate?: string;
  // gender?: string;
  contactPhone: string;
  // photo?: string;
};

export const profileSchema = yup.object().shape({
  email: yup.string().email("Некорректный email").required(requiredField),
  firstName: yup.string().required(requiredField),
  lastName: yup.string(),
  newPassword: yup.string(),
  confirmNewPassword: yup
    .string()
    .when("newPassword", (newPassword: any, schema: any) => {
      if (newPassword && newPassword[0].length > 0) {
        return schema
          .oneOf([yup.ref("newPassword")], "Пароли не совпадают")
          .required(requiredField);
      }
      return schema;
    }),
  // birthDate: yup.string(),
  // gender: yup.mixed().oneOf(["male", "female"]).notRequired(),
  contactPhone: yup.string(),
  // photo: yup.string(),
});
