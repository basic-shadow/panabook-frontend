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
  getObjects: "/property",
};

export const adminEndpoints = {
  deleteObject: "/property/:id",
  getObjects: "/property",
};
