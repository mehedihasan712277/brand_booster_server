import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
    res.json({ message: "server is running ok" });
};
