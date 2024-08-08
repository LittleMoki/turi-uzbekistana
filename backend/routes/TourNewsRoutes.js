import { Router } from 'express'
import {
	CreateNews,
	DeleteNews,
	EditNews,
	ShowAllNews,
	ShowNews, ShowNewsUrl, ShowNewsUrlType,
} from '../controller/TourNewsController.js'

const router = Router()

router.post('/', CreateNews)
router.get('/', ShowAllNews)
router.get('/:id', ShowNews)
router.get('/:url/urlType', ShowNewsUrlType)
router.get('/:url/url', ShowNewsUrl)
router.put('/:id', EditNews)
router.delete('/:id', DeleteNews)

export default router
