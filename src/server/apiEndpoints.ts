export const authEndpoints = {
  signup: "/api/auth/register",
  login: "/api/auth/login",
  getUser: "/api/user/me",
  getObjects: "/api/property",
};

export const objectsEndpoints = {
  deleteObject: "api/property/:id",
};

export const propertyEndpoints = {
  registerProperty: "/api/property",
  uploadPhotos: "/api/image",
};
