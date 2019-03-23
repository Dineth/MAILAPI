import express from "express";
import * as bodyParser from "body-parser";
import { EmailRoutes } from "./routes/EmailRoutes";
import AppProps from './ApplicationProperties'
import mongoose from "mongoose";

class App {
    public mongoUrl: string = AppProps.DB_URL;
    public app: express.Application;
    public routesList: EmailRoutes = new EmailRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.routesList.setRoutesToApp(this.app);  
        this.mongoSetup();      
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl,{ useNewUrlParser: true });    
    }

}

export default new App().app;