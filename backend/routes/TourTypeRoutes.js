
import { Router } from 'express'
import {
	tourCreate,
	tourDelete, tourEdit,
	tourShow, tourShowAll, tourTypeShowUrl,
} from '../controller/TourTypeController.js'

const router = Router()

router.post('/', tourCreate)
router.get('/', tourShowAll)
router.get('/:id', tourShow)
router.get('/:url/url', tourTypeShowUrl)
router.put('/:id', tourEdit)
router.delete('/:id', tourDelete)

export default router