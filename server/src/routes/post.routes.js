import express from 'express'
const router = express.Router();
import {AddPost,DeletePost,getAllpost} from '../controllers/PostController.js';

router.route("/addpost").post(AddPost)
router.route("/getallpost").get(getAllpost)
router.route("/deletepost/:id").post(DeletePost)

export default router