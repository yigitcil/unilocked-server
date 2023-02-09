import { Router } from "express";
import BaseController from "./base-controller";
import { UserController } from "./user-controller"

export class UserProfileController extends BaseController {
    listen(router: Router): void {
        
    }
    
    public byId(id: string) {
      const userController = new UserController(this.db);
      const user = userController.byId(id);
      const userToReturn = {};
      
      const keys = ['posts', 'followers', 'university', 'projectsParticipated']

      Object.keys(user).forEach(key => {
        if (keys.includes(key))
          userToReturn[key] = user[key];
      });
    }
    
}