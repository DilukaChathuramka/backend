import mongoose from "mongoose";

const payementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  packageName: {
    type: mongoose.Schema.ObjectId,
    ref: "package",
  },
  customisePackage: {
    type: mongoose.Schema.ObjectId,
    ref: "CustomPackage",
  },

  payementType: {
    type: String,
    default: "card",
  },
  billDetails: [
    {
      name: {
        type: String,
        required: [true, "name"],
      },
      address: {
        type: String,
        required: [true, "enter your address"],
      },
      town: {
        type: String,
        required: [true, "enter the town"],
      },
      phoneNo: {
        type: Number,
        required: [true, "enter the phone number"],
      },
      email: {
        type: String,
        required: [true, "enter the email"],
      },
    },
  ],
  cardDetails: [
    {
      cardNumber: {
        type: Number,
        
      },
      expireMonth: {
        type: String,
        
      },
      expireDate: {
        type: String,
     
      },
      cvv: {
        type: Number,
      
      },
    },
  ],
 total:{
    type:String,
    required:true
  }
});


const Payement=mongoose.model("payement",payementSchema);
export default Payement