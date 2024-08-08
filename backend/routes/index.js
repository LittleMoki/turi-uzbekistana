import {Router} from 'express'
import MainTourRoutes from './MainTourRoutes.js'
import TourAboutRoutes from './TourAboutRoutes.js'
import TourBannerRoutes from './TourBannerRoutes.js'
import TourCityRoutes from './TourCityRoutes.js'
import TourCountryRoutes from './TourCountryRoutes.js'
import TourExchange from './TourExchangeRoutes.js'
import TourFAQRoutes from './TourFAQRoutes.js'
import TourHotelRoutes from './TourHotelRoutes.js'
import TourNewsRoutes from './TourNewsRoutes.js'
import TourNewsTypeRoutes from './TourNewsTypeRoutes.js'
import TourOrdersRoutes from './TourOrdersRoutes.js'
import TourPageRoutes from './TourPageRoutes.js'
import TourPlaceRoutes from './TourPlaceRoutes.js'
import TourServicesRoutes from './TourServiceRoutes.js'
import TourTeamRoutes from './TourTeamRoutes.js'
import TourTypeRoutes from './TourTypeRoutes.js'
import TourUsersRoutes from './TourUsersRoutes.js'
import MainTourTeamRoutes from "./MainTourTeamRoutes.js";
import TourOrderRoutes from "./TourOrderRoutes.js";
import authRoutes from "./authRoutes.js";

const router = Router()

router.use('/tour_type', TourTypeRoutes)
router.use('/exchange', TourExchange)
router.use('/faq', TourFAQRoutes)
router.use('/page', TourPageRoutes)
router.use('/hotel', TourHotelRoutes)
router.use('/places', TourPlaceRoutes)
router.use('/country', TourCountryRoutes)
router.use('/city', TourCityRoutes)
router.use('/tour', MainTourRoutes)
router.use('/banner', TourBannerRoutes)
router.use('/news', TourNewsRoutes)
router.use('/news_type', TourNewsTypeRoutes)
router.use('/services', TourServicesRoutes)
router.use('/users', TourUsersRoutes)
router.use('/team', TourTeamRoutes)
router.use('/orders', TourOrdersRoutes)
router.use('/about', TourAboutRoutes)
router.use('/tour_team', MainTourTeamRoutes)
router.use('/orders', TourOrderRoutes)
router.use('/auth', authRoutes)

export default router
