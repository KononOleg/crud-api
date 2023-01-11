const supertest = require("supertest");
require("dotenv").config();
const request = supertest(`http://localhost:4000`);

const url = "/api/users";
let id = "";
let user = {};

const testUser = {
  username: "Test",
  age: 54,
  hobbies: ["Test"],
};

const newTestUser = {
  username: "newTest",
  age: 55,
  hobbies: [],
};

describe("Scenario 1 - all operations", () => {
  it("should return 200 and all users for get users", async () => {
    const response = await request.get(url);
    expect(response.statusCode).toBe(200);
  });

  it("should return 201 and created user for create user", async () => {
    const response = await request.post(url).send(testUser);
    id = response.body.id;

    user = {
      id,
      ...testUser,
    };

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(user);
  });

  it("should return 200 and user for get user by id", async () => {
    const response = await request.get(`${url}/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(user);
  });

  it("should return 200 and updated user for update user", async () => {
    const response = await request.put(`${url}/${id}`).send(newTestUser);

    user = {
      id,
      ...newTestUser,
    };

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(user);
  });

  it("should return 204 for delete user", async () => {
    const response = await request.delete(`${url}/${id}`);
    expect(response.statusCode).toBe(204);
  });

  it("should return 404 on get non-exist user by id", async () => {
    const response = await request.get(`${url}/${id}`);
    expect(response.statusCode).toBe(404);
  });
});
describe("Scenario 2 - when userId is invalid (not uuid)", () => {
  const invalidId = "invalidId";

  it("should return 400 on invalid userId for get user by id", async () => {
    const response = await request.get(`${url}/${invalidId}`);
    expect(response.statusCode).toBe(400);
  });

  it("should return 400 on invalid userId for update user", async () => {
    const response = await request.put(`${url}/${invalidId}`).send(newTestUser);
    expect(response.statusCode).toBe(400);
  });

  it("should return 400 on invalid userId for delete user", async () => {
    const response = await request.delete(`${url}/${invalidId}`);
    expect(response.statusCode).toBe(400);
  });
});

describe("Scenario 3 - when no user for id and non-existing endpoints", () => {
  const wrongId = "75442486-0878-440c-9db1-a7006c25a40d";

  it("should return 404 on non-existing endpoints", async () => {
    const response = await request.get(`/some-non/existing/resource`);
    expect(response.statusCode).toBe(404);
  });

  it("should return 404 on get non-exist user by id", async () => {
    const response = await request.get(`${url}/${wrongId}`);
    expect(response.statusCode).toBe(404);
  });

  it("should return 404 on update non-exist user", async () => {
    const response = await request.put(`${url}/${wrongId}`).send(newTestUser);
    expect(response.statusCode).toBe(404);
  });

  it("should return 404 on delete non-exist user", async () => {
    const response = await request.delete(`${url}/${wrongId}`);
    expect(response.statusCode).toBe(404);
  });
});

describe("Scenario 4 - when wrong body data", () => {
  const wrongTestUser = {
    username: 54,
    age: "Test",
  };

  it("should return 400 on wrong body data for create user", async () => {
    const response = await request.post(url).send(wrongTestUser);
    id = response.body.id;

    expect(response.statusCode).toBe(400);
  });

  it("should return 400 on wrong body data for update user", async () => {
    const createResponse = await request.post(url).send(testUser);
    id = createResponse.body.id;

    const updateResponse = await request
      .put(`${url}/${id}`)
      .send(wrongTestUser);

    expect(updateResponse.statusCode).toBe(400);
  });
});
