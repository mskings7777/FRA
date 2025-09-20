import mongoose, { Schema } from "mongoose";

const ClaimsManagementSchema = new Schema({
  state: {
    type: String,
  },

  receivedClaims: {
    ir1: {type: Number},
    cr1: {type: Number},
    total1: {type: Number}
  },

  titlesDistributed: {
    ir2: {type: Number},
    cr2: {type: Number},
    total2: {type: Number},
  },

  rejectedCliams: {
    type: Number,
  },

  disposedOffCliams: {
    type: Number,
  },

  pendingClaims: {
    type: Number,
  },

});

// Export model
export default mongoose.model("ClaimsManagement", ClaimsManagementSchema);
