import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const CarSchema = new Schema({
  make: { type: String, required: true, minlength: 3, maxlength: 200 },
  model: { type: String, required: true, maxlength: 200 },
  year: { type: Number, default: 0, min: 0, max: new Date().getFullYear() },
  price: { type: Number, min: 0, required: true },
  description: { type: String, default: '' },
  imgUrl: { type: String, default: 'https://www.autolist.com/assets/listings/default_car.jpg' },

  // who is selling the car?????
  // RELATIONSHIPS                                  V magic string here
  sellerId: { type: ObjectId, required: true, ref: 'Account' }

}, { timestamps: true, toJSON: { virtuals: true } })

CarSchema.virtual('seller', {
  localField: 'sellerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account' // stupid magic string
})
