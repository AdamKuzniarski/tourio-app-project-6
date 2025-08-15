import mongoose from "mongoose";
import "./Comments";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String }, // required eintragen!!
  mapURL: { type: String },
  description: { type: String },
  comments: { type: [Schema.Types.ObjectId], ref: "Comments" },
});

const Places =
  mongoose.models.Places || mongoose.model("Places", productSchema);

export default Places;
