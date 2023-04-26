export const authEndpoints = {
  signup: "/auth/register",
  login: "/auth/login",
  getUser: "/user/me",
  getObjects: "/property",
};

export const objectsEndpoints = {
  deleteObject: "/property/:id",
};

export const propertyEndpoints = {
  registerProperty: "/property",
  uploadPhotos: "/image",
};
