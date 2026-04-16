import mongoose from "mongoose";

const dbConnect = async()=>{
    try {
        // await mongoose.connect("mongodb+srv://amanpreetkaur:preetkaur@cluster0.moo4y8l.mongodb.net/kaur");
        // console.log("Database is connected.")
        await mongoose.connect(process.env.MONGODB_URI); 
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect;
// username/password/databasename