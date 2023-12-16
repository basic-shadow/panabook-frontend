import * as yup from "yup";

export const generalInfoSchema = yup.object().shape({
  propertyName: yup.string().required("Обязательное поле"),
  starsRating: yup.number().required("Обязательное поле"),
  contactName: yup.string().required("Обязательное поле"),
  contactPhone1: yup
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .min(11, "Введите действующий номер телефона")
    .required("Обязательное поле"),
  contactPhone2: yup.string().notRequired(),
  propertyAddress: yup.string().required("Обязательное поле"),
  propertyCity: yup
    .number()
    .min(0, "Обязательное поле")
    .required("Обязательное поле"),
  propertyPostCode: yup.string().required("Обязательное поле"),
});

export const roomsInfoSchema = yup.object().shape({
  roomType: yup.number().required("Обязательное поле"),
  roomName: yup.number().required("Обязательное поле"),
  allowedSmoking: yup.number().required("Обязательное поле"),
  similarRoomsQuantity: yup
    .number()
    .typeError("Введите число")
    .positive("Число не может быть отрицательным")
    .required("Обязательное поле"),
  maxGuestSize: yup
    .number()
    .typeError("Введите число")
    .positive("Число не может быть отрицательным")
    .required("Обязательное поле"),
  roomSurface: yup
    .number()
    .typeError("Введите число")
    .positive("Число не может быть отрицательным")
    .required("Обязательное поле"),
  nonResidentPrice: yup
    .number()
    .typeError("Введите число")
    .positive("Число не может быть отрицательным")
    .required("Обязательное поле"),
  roomBeds: yup.array().of(
    yup.object().shape({
      bedType: yup.number().required("Обязательное поле"),
      quantity: yup
        .number()
        .typeError("Введите число")
        .positive("Число не может быть отрицательным")
        .required("Обязательное поле"),
    })
  ),
});

export const servicesInfoSchema = yup.object().shape({
  propertyLanguages: yup
    .array()
    .of(yup.object().shape({ value: yup.number() }))
    .required("Обязательное поле"),
  propertyServices: yup.array().of(yup.number()).required("Обязательное поле"),
});

export const facilitiesInfoSchema = yup.object().shape({
  extraBeds: yup.boolean().required("Обязательное поле"),
  extraBedsType: yup
    .array()
    .of(
      yup.object().shape({
        bedType: yup.number().required("Обязательное поле"),
        quantity: yup.number().required("Обязательное поле"),
      })
    )
    .when("extra_bed", (extraBeds, field) => {
      return extraBeds ? field.required("Обязательное поле") : field;
    }),
});

// export type GeneralInfoType = yup.InferType<typeof generalInfoSchema>;
