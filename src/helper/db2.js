import mongoose from "mongoose";

const config = {
    isConnected: 0,
}
export const connectDB = async () => {
    if (config.isConnected){
        return;
    }

    try {
        const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "auth"
        } )
        console.log("auth db connected")
        // console.log(connection.readyState);

        config.isConnected = connection.readyState;

    }catch(error){
        console.log(error.message);
        console.log("failed to connect with db")
    }
}