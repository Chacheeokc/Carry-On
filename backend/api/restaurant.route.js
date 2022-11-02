import express from "express";
import RestaurantsCtrl from "./restaurant.controller.js";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router();

router.route("/").get(RestaurantsCtrl.apiGetRestaurants);
// specific restaurant with a specific id
router.route('/id/:id').get(RestaurantsCtrl.apiGetRestaurantById);
//used to populate a drop down menu of cuisines
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines);

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router;