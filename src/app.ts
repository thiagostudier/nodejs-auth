require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "./database";
import { router } from "./routes";
import cors from "cors";

const app = express();

// HABILITAR CORS
app.use(cors());
// HABILITAR JSON
app.use(express.json());
// HABILITAR ROTAS
app.use(router);
// MIDDLEWARE DE ERRO
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

export { app };
