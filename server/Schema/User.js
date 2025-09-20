import mongoose, { Schema } from "mongoose";

let profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
let profile_imgs_collections_list = ["notionists-neutral", "adventurer-neutral", "fun-emoji"];

const UserSchema = new Schema({
  personal_info: {

    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        maxlength: [20, 'username should not exceed 20 characters'],
    },
    password: {
        type: String
    },
    dob: {
        type: String,
        maxlength: [20, 'dob should be in format of YYYY-MM-DD'],
        default: "",
    },
    profile_img: {
            type: String,
            default: () => {
                return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
            } 
    },

    mobile_no: {
        type: Number,
        maxlength: [10, 'Mobile number should be of 10 digits'],
    },
    role: {
        type: String,
    },
    state: {
        type: String,
        default: "",
    },
    district: {
        type: String,
        default: "",
    },


  },


  
});

// Export model
export default mongoose.model("UserSchema", UserSchema);
