import apartments from "@/assets/images/property_category/apartments.jpeg";
import boutique_hotel from "@/assets/images/property_category/boutique_hotel.jpeg";
import guest_house from "@/assets/images/property_category/guest_house.jpeg";
import hostel from "@/assets/images/property_category/hostel.jpg";
import hotel from "@/assets/images/property_category/hotel.jpeg";
import resort_area from "@/assets/images/property_category/resort_area.jpeg";
import sanatorium from "@/assets/images/property_category/sanatorium.jpeg";
import glamping from "@/assets/images/property_category/glamping.jpeg";

export const YES_NO_CHOICES = [
  { label: "Да", value: true },
  { label: "Нет", value: false },
];

export const SMOKING_CATEGORY = [
  { label: "Курящие", value: 0 },
  { label: "Некурящие", value: 1 },
  { label: "Обе категории", value: 2 },
];

export const PROPERTY_CATEGORIES_HEADER_TEXT =
  "Какой категории ваш объект размещения больше всего подходит?";

export const PROPERTY_CATEGORIES = [
  {
    label: "Отель",
    description:
      "Средство размещения, состоящее из определённого количества номеров.",
    img: hotel,
    value: 0,
  },
  {
    label: "Бутик отель",
    description:
      "Представляет собой небольшой отель обычно от 10 до 100 номеров в уникальном оформлении каждого из номеров.",
    img: boutique_hotel,
    value: 1,
  },
  {
    label: "Хостел",
    description:
      "Европейская система размещения, предоставляющая своим постояльцам жильё.",
    img: hostel,
    value: 2,
  },
  {
    label: "Гостевой дом",
    description:
      "Условия проживания приближённо к домашним, дом разделен на небольшие номера, но количество их небольшое.",
    img: guest_house,
    value: 3,
  },
  {
    label: "Апартаменты",
    description:
      "Средство размещения, состоящее из номеров квартирного типа, по условиям схожих с условиями меблированных комнат.",
    img: apartments,
    value: 4,
  },
  {
    label: "Курортная зона",
    description:
      "Территория, подлежащая специальной охране, характеризующаяся особо благоприятными природными условиями и лечебными факторами.",
    img: resort_area,
    value: 5,
  },
  {
    label: "Санаторий",
    description:
      "Санаторий — лечебно-профилактическое учреждение, в котором для лечения и профилактики заболеваний используют главным образом природные факторы (климат, минеральные воды, лечебные грязи, морские купания и т. п.) в сочетании с лечебной физкультурой, физиотерапией и рациональным питанием (диетой) при соблюдении определённого режима лечения и отдыха.",
    img: sanatorium,
    value: 6,
  },

  {
    label: "Глэмпинг",
    description:
      "Глэмпинг представляет собой роскошный вариант кемпинга, сочетающий в себе комфорт и близость к природе. Глэмпинг-места часто предлагают шатры, палатки, юрты, домики на дереве или воде, роскошные автодома и другие необычные и стильные варианты размещения.",
    img: glamping,
    value: 7,
  },
];
