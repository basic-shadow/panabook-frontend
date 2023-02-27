import * as yup from "yup";

export const generalInfoSchema = yup.object().shape({
  property_name: yup.string().required("Обязательное поле"),
  stars_rating: yup.number().required("Обязательное поле"),
  contact_name: yup.string().required("Обязательное поле"),
  contact_phone1: yup.string().required("Обязательное поле"),
  contact_phone2: yup.string().notRequired(),
  property_address: yup.string().required("Обязательное поле"),
  property_city: yup.number().required("Обязательное поле"),
  property_post_code: yup.string().required("Обязательное поле"),
});

export const roomsInfoSchema = yup.object().shape({
  room_type: yup.number().required("Обязательное поле"),
  room_name: yup.number().required("Обязательное поле"),
  allowed_smoking: yup.number().required("Обязательное поле"),
  similar_rooms_quantity: yup.number().required("Обязательное поле"),
  max_guest_size: yup.number().required("Обязательное поле"),
  room_surface: yup.number().required("Обязательное поле"),
  non_resident_price: yup.number().required("Обязательное поле"),
  room_beds: yup.array().of(
    yup.object().shape({
      bed_type: yup.number().required("Обязательное поле"),
      quantity: yup.number().required("Обязательное поле"),
    })
  ),
});

export const servicesInfoSchema = yup.object().shape({
  property_languages: yup
    .array()
    .of(yup.object().shape({ value: yup.number() }))
    .required("Обязательное поле"),
  property_services: yup.array().of(yup.number()).required("Обязательное поле"),
});

export const facilitiesInfoSchema = yup.object().shape({
  extra_beds: yup.boolean().required("Обязательное поле"),
  extra_beds_type: yup
    .array()
    .of(
      yup.object().shape({
        bed_type: yup.number().required("Обязательное поле"),
        quantity: yup.number().required("Обязательное поле"),
      })
    )
    .when("extra_bed", (extraBeds, field) => {
      return extraBeds ? field.required("Обязательное поле") : field;
    }),
});

// export type GeneralInfoType = yup.InferType<typeof generalInfoSchema>;
