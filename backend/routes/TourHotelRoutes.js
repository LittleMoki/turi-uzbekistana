import { Router } from 'express'
import {
	CreateHotel,
	DeleteHotel, DeleteHotelPhoto, DeleteHotelRooms,
	EditHotel,
	ShowAllHotels,
	ShowHotel,
} from '../controller/TourHotel.js'

const router = Router()

router.post('/', CreateHotel)
router.get('/', ShowAllHotels)
router.get('/:id', ShowHotel)
router.put('/:id', EditHotel)
router.delete('/:id', DeleteHotel)
router.delete('/:id/rooms', DeleteHotelRooms)
router.delete('/:id/photo', DeleteHotelPhoto)

export default router
