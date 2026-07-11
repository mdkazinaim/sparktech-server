import express from "express";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../app/middleware/validateRequest";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post(
  "/create-user",
  upload.single("file"),
  (req, res, next) => {
    if (req.file) {
      req.body.profileImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }
    next();
  },
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get("/all-users", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);
router.get("/user-by-email/:email", UserController.getUserByEmail);

router.patch(
  "/:id",
  upload.single("file"),
  (req, res, next) => {
    if (req.file) {
      req.body.profileImage = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }
    next();
  },
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

router.delete("/:id", UserController.deleteUser);

export const UserRoutes = router;
