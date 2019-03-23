import {Request, Response} from "express";
import { MailController } from "../controllers/MailController";

export class EmailRoutes {       

    public mailController: MailController = new MailController();

    // Setting Routes
    public setRoutesToApp(app :any): void {    
        app.route('/v1/emails')
            .post((this.mailController.sendMail));

        app.route('/v1/emails/:id')
            .get((this.mailController.getMail));

        app.route('/v1/emails/:id')
            .delete((this.mailController.deleteMail));
    }
}