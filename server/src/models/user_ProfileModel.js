import mongoose, { Schema } from "mongoose";

const UserProfileSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    profilePicture: {
      publicId: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    contactInfo: {
      phone: {
        type: String,
        trim: true,
      },
      location: {
        type: String,
        trim: true,
      },
    },
    liveLocation: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

export default UserProfile;
