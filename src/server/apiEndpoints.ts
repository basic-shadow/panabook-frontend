export const authEndpoints = {
  signup: "/auth/register",
  login: "/auth/login",
  getUser: "/user/me",
};

export const propertyEndpoints = {
  registerProperty: "/property",
  uploadPhotos: "/image",
};

export const objectsEndpoints = {
  getObjects: "/user/property",
  singleObject: "/user/property/:id",
  getSingleObject: "/user/property",
  singleRoom: "/user/room/:id",
};

export const adminEndpoints = {
  deleteObject: "/property/:id",
  getObjects: "/property",
};
