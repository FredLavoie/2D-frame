import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
// import { readFile, writeFile } from "fs";
// import { execFile } from "child_process";
// import { validateForm } from "./lib/validate-form-server.js";
// import { createInputObject } from "./lib/create-input-object.js";
// import { createInputString } from "./lib/create-input-string.js";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.info(`2D Frame application listening on port ${PORT}`);
});

/************************************************** GET REQUEST ******************************************************/
/*********************************************************************************************************************/

app.get("/api/:userId/models/", async (req: Request, res: Response) => {
    const { userId } = req.params;
    const models = await prisma.model.findMany({
        where: { authorId: Number(userId) },
    });
    return res.json({
        models: models,
    });
});

app.get("/api/:userId/models/:modelId/", async (req: Request, res: Response) => {
    const { userId, modelId } = req.params;
    const model = await prisma.model.findMany({
        where: { id: Number(modelId), authorId: Number(userId) },
    });
    return res.json({
        models: model,
    });
});

app.get("/api/users/:userId/", async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await prisma.user.findMany({
        where: { id: Number(userId) },
        include: {
            models: true,
        },
    });
    return res.json({
        models: user,
    });
});

/************************************************* POST REQUEST ******************************************************/
/*********************************************************************************************************************/

app.post("/api/models/new/", async (req: Request, res: Response) => {
    const { userId } = req.params;
    const models = await prisma.model.findMany({
        where: { authorId: Number(userId) },
    });
    return res.json({
        models: models,
    });
});
