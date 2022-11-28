import mongoose from 'mongoose';

const UserDetailsSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,
    packingItems: [String],
    expenseItems: [{
      expenseItem : String, 
      price : Number, 
      date : Date,
    }],
    expenseTotal: Number,
    agendaItems: [{
      title : String,
      start : Date,
      end: Date,
    }],
    destinations: [[]]
  },
  {
    collection: "UserInfo",
  }
);
mongoose.model("UserInfo", UserDetailsSchema);

export default UserDetailsSchema;