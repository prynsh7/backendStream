import mongoose from "mongoose";

const addOnSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        coupons: {
            type: String,
        },
        trial: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
);

const AddOn = mongoose.model("AddOn", addOnSchema);

export default AddOn;
