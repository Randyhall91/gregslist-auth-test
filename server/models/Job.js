import mongoose from "mongoose"


const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId
export const JobSchema = new Schema({
  title: { type: String, required: true, minlength: 5, maxlength: 150 },
  company: { type: String, required: true, minlength: 5, maxlength: 150 },
  pay: { type: Number },
  hours: { type: Number },
  description: { type: String, required: true },

  employeerId: { type: ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

JobSchema.virtual('employeer', {
  localField: 'employeerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'

})