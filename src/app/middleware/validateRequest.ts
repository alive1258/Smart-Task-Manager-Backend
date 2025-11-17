import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodEffects } from "zod";

const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse body, query, params, cookies separately
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errorMessages: err.errors.map((e: any) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    }
  };

export default validateRequest;
