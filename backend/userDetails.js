import mongoose from 'mongoose';

const UserDetailsSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,
    packingItems: [String],
  },
  {
    collection: "UserInfo",
  }
);
mongoose.model("UserInfo", UserDetailsSchema);

export default UserDetailsSchema;