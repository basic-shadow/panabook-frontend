import * as yup from "yup";

export const generalInfoSchema = yup.object().shape({
  propertyName: yup.string().required("Обязательное поле"),
  starsRating: yup.number().required("Обязательное поле"),
  contactName: yup.string().required("Обязательное поле"),
  contactPhone1: yup.string().required("Обязательное поле"),
  contactPhone2: yup.string().notRequired(),
  propertyAddress: yup.string().required("Обязательное поле"),
  propertyCity: yup.number().required("Обязательное поле"),
  propertyPostCode: yup.string().required("Обязательное поле"),
});

export const roomsInfoSchema = yup.object().shape({
  roomType: yup.number().required("Обязательное поле"),
  roomName: yup.number().required("Обязательное поле"),
  allowedSmoking: yup.number().required("Обязательное поле"),
  similarRoomsQuantity: yup.number().required("Обязательное поле"),
  maxGuestSize: yup.number().required("Обязательное поле"),
  roomSurface: yup.number().required("Обязательное поле"),
  nonResidentPrice: yup.number().required("Обязательное поле"),
  roomBeds: yup.array().of(
    yup.object().shape({
      bedType: yup.number().required("Обязательное поле"),
      quantity: yup.number().required("Обязательное поле"),
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
