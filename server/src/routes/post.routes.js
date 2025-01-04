import express from 'express';
import { AddPost, DeletePost, getAllpost } from '../controllers/PostController.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();    

router.route("/addpost").post(upload.single('image'),verifyJwt, AddPost);
router.route("/getallpost").get(verifyJwt,getAllpost);
router.route("/deletepost/:id").post(DeletePost);

export default router;          