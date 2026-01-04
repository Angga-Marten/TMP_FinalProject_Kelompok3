import "./config/loadenv.js";
import connectDB from "./config/database.js"
import app from "./app.js";

const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running at port: ${PORT}`);
        });
    } catch (error) {
        console.error("Server failed to start :<", error);
        process.exit(1);
    }
};

startServer();

