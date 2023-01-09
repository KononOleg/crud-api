export const checkPath = (path: string) => {
  const params = path.split("/");
  return params.length === 4 && params[1] === "api" && params[2] === "users";
};
