import { Router } from 'express'
import {
	FAQCreate,
	FAQDelete,
	FAQEdit,
	FAQShow,
	FAQShowAll,
} from '../controller/TourFAQController.js'

const router = Router()

router.post('/', FAQCreate)
router.get('/', FAQShowAll)
router.get('/:id', FAQShow)
router.put('/:id', FAQEdit)
router.delete('/:id', FAQDelete)

export default router
