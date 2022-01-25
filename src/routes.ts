import { Router } from "express";
const router = Router();

// CONSTROLLERS
import { UserController } from "./controllers/UserController";

const userController = new UserController();

// MIDDLEWARE
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

// USUÁRIOS
router.post("/users", userController.store);
router.get("/users", ensureAuthenticated, userController.all);
router.post("/users-filter", ensureAuthenticated, userController.filter);
router.get("/users/:id", ensureAuthenticated, userController.get);
router.patch("/users/:id", ensureAuthenticated, userController.update);
// LOGIN
router.post("/login", userController.login);
router.post("/me", userController.me);

export { router };
