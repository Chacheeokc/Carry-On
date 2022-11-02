import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let reviews
export default class ReviewsDAO{
    // it's okay if it doesn't already exist, it'll just automatically be created?
    static async injectDB(conn){
        if(reviews){
            return
        }
        try{
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
        }catch(e){
            console.error("Unable to establish collection handles in userDAO" + e);
        }
    }

    static async addReview(restaurantId, user, review, date){
        try{
            // creating a review
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: review,
                restaurant_id: ObjectId(restaurantId),
            }
            // this insertOne inserts it right into the database
            return await reviews.insertOne(reviewDoc)
        }catch(e){
            console.error('Unable to post review ' + e);
            return {error: e};
        }
    }

    static async updateReview(reviewId, userId, text, date){
        try{
            const updateResponse = await reviews.updateOne(
                // looking for a review that has the right review id and right user id
                { user_id: userId, _id: ObjectId(reviewId)},
                { $set: {text: text, date:date}},
            )

            return updateResponse;
        }catch(e){
            console.error('Unable to update review: ' + e);
            return {error: e}
        }
    }

    static async deleteReview(reviewId, userId){
        try{
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id:userId,
            })
            return deleteResponse;
        }catch(e){
            console.error('Unable to delete review: ' + e);
            return {error: e}
        }
    }
}