import mongoose, { Schema } from "mongoose";

const ForestDataStorageSchema = new Schema({
  state: {
    type: String,
    required: true,
  },
  Reserved_forests: {
    type: Number,
    required: true,
  },
  Unclassified_forests: {
    type: Number,
    required: true,
  },
  National_parks: {
    type: Number,
    required: true,
  },
  Protected_forests: {
    type: Number,
    required: true,
  },  
});

// Export model
export default mongoose.model("ForestDataStorage", ForestDataStorageSchema);
