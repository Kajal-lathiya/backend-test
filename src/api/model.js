import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: "String" },
  age: { type: "Number" },
  addresses: [
    {
      country: { type: "String", required: true },
      city: { type: "String", required: true }
    }
  ]
});

export default model("User", userSchema);
