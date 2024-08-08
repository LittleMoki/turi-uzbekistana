import { Router } from 'express'
import {
	CreateTeams,
	DeleteTeams,
	EditTeams,
	ShowAllTeams,
	ShowTeams,
} from '../controller/TourTeamController.js'

const router = Router()

router.get('/', ShowAllTeams)
router.post('/', CreateTeams)
router.get('/:id', ShowTeams)
router.delete('/:id', DeleteTeams)
router.put('/:id', EditTeams)

export default router
