import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as dynamoose from "dynamoose"


// Route imports 
import courseRoutes from "./routes/courseRoutes"

//Configuration

dotenv.config();
const isProduction = process.env.NODE_ENV === "production";
if(!isProduction){
    dynamoose.aws.ddb.local();
}

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


app.get("/", (req,res) => {
    res.send("Shree Ganeshay Namah");

});

app.use("/courses",courseRoutes);

const port = process.env.PORT || 3000;
if(!isProduction){
    app.listen(port ,()=>{
        console.log(`Server is running on port ${port}`);
    });
}
