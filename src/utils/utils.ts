export const checkPath = (path: string) => {
  const params = path.split("/");
  return params.length === 4 && params[1] === "api" && params[2] === "users";
};

export const getId = (req: any) => req.url.split("/")[3];

export const checkIfValidUUID = (str: string) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(str);
};
