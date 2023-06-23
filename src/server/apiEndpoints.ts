export const authEndpoints = {
  signup: "/auth/register",
  login: "/auth/login",
  getUser: "/user/me",
  updateUser: "/user/me",
  logout: "/auth/logout",
};

export const propertyEndpoints = {
  registerProperty: "/property",
  uploadPhotos: "/image",
};

export const objectsEndpoints = {
  getObjects: "/user/property",
  getSingleObject: "/user/property/:id",
  getFirstObject: "/user/property/first",
  singleRoom: "/user/room/:id",
  editProperty: "/property/:id",
  editRoom: "/room/:id",
  getRates: "/property/:id/rate-plans",
  createPrice: "/price",
};

export const adminEndpoints = {
  deleteObject: "/property/:id",
  getObjects: "/property",
};
