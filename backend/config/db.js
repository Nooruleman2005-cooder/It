const mongoose = require ("mongoose");

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mogodb Chal gya....");
    }
    catch(error){
        console.log("Mongodb nhi chala....", error);
        process.exist(1);
    }
};

module.exports = connectDb;