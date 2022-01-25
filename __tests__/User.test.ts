import request from "supertest";
import { app } from "../src/app";
import { getConnection, createConnection } from "typeorm";
import { user, admin } from "./factories"

// DADO DO USUÁRIO GERADO
var userFactory = user
var newPassword = "123456789"
var adminFactory = admin
var token = null

describe("Users", () => {

    beforeAll(async (done) => {
        const connection = await createConnection();
        await connection.runMigrations();
        done()
    });

    afterAll(async (done) => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
        done()
    });

    // CRIAR USUÁRIO
    it("Should be able to create a new user", async () => {
        // FUNÇÃO CONTROLLER - CRIAR USUÁRIO 
        const response = await request(app).post("/users").send(userFactory);
        userFactory.id = response.body.id
        // ESPERA SER STATUS 200
        expect(response.status).toBe(200)
    });

    // NÃO PODE CRIAR USUÁRIO COM E-MAIL DUPLICADO
    it("Should not be able to create a new user with same email", async () => {
        // FUNÇÃO CONTROLLER - CRIAR USUÁRIO 
        const response = await request(app).post("/users").send(userFactory);
        // ESPERA SER STATUS 200
        expect(response.status).toBe(400)
    });

    // CRIAR USUÁRIO ADMIN
    it("Should be able to create a new admin", async () => {
        // FUNÇÃO CONTROLLER - CRIAR USUÁRIO 
        const response = await request(app).post("/users").send(adminFactory);
        // ESPERA SER STATUS 200
        expect(response.status).toBe(200)
    });

    // AUTENTICAR ADMIN
    it("Should be able to authenticate admin", async () => {
        // PEGAR USUÁRIO CADASTRADO
        const response = await request(app).post("/login").send({
            email: adminFactory.email,
            password: adminFactory.password
        });
        token = response.body.token
        // ATUALIZAR ADMIN COM TOKEN
        adminFactory = { ...adminFactory, token: response.body.token }
        // ESPERA SER STATUS 200
        expect(response.status).toBe(200)
    });

    // NÃO AUTENTICAR USUÁRIO
    it("Should not be able to authenticate user", async () => {
        // PEGAR USUÁRIO CADASTRADO
        const response = await request(app).post("/login").send({
            email: userFactory.email,
            password: "password wrong"
        });
        // ESPERA SER STATUS 200
        expect(response.status).toBe(400)
    });

    // LISTAR USUÁRIOS
    it("Should be able to list users", async () => {
        // PEGAR USUÁRIO CADASTRADO
        const response = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${token}`);
        // ESPERA SER STATUS 200
        expect(response.status).toBe(200)
    });

    // FILTRAR USUÁRIO
    it("Should be able to filter user", async () => {
        // PEGAR USUÁRIO CADASTRADO
        const response = await request(app)
            .post("/users-filter")
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: userFactory.email,
                name: userFactory.name,
            });
        // ESPERA SER STATUS 200
        expect(response.body[0].email).toBe(userFactory.email)
    });

    // PEGAR USUÁRIO
    it("Should be able to get user", async () => {
        // PEGAR USUÁRIO CADASTRADO
        const response = await request(app)
            .get("/users/"+userFactory.id)
            .set("Authorization", `Bearer ${token}`)
        // ESPERA SER STATUS 200
        expect(response.body.email).toBe(userFactory.email)
    });

    // ALTERAR USUÁRIO
    it("Should be able to update a user", async () => {
        // ALTERAR USUÁRIO
        const updated = await request(app)
            .patch("/users/"+userFactory.id)
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: "mail@mail.com",
                password: newPassword
            });
        // ATUALIZAR DADOS DO USUÁRIO
        userFactory.email = updated.body.email
        // ESPERA SER STATUS 200
        expect(userFactory.email).toBe("mail@mail.com")
    });

    // RETONAR JWT QUANDO AUTENTICADO
    it("Should return jwt token when authenticated", async () => {
        // PEGAR USUÁRIO CADASTRADO
        const response = await request(app)
            .post("/login")
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: userFactory.email,
                password: newPassword
            });
        // ESPERA SER STATUS 200
        expect(response.body).toHaveProperty('token')
    });

});
