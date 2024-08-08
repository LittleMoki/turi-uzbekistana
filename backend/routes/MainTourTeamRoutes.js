import {Router} from "express";
import {
    createMainTourTeam, deleteMainTourTeam,
    editMainTourTeam,
    showAllMainTourTeam,
    showMainTourTeam
} from "../controller/MainTourTeamController.js";

const router = Router()

router.post('/', createMainTourTeam)
router.get('/', showAllMainTourTeam)
router.get('/:id', showMainTourTeam)
router.put(':id', editMainTourTeam)
router.delete('/:id', deleteMainTourTeam)

export default router