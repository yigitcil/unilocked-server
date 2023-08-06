import { Router } from "express";
import BaseController from "./base-controller";
import mongoose from "mongoose";
import { UserModel } from "../../resolved-models";
import { User } from "../../models/user";
import success from "../responses/success";
import ensureAuthorized from "../middleware/ensure-authorized";

export class UserRecommentationController extends BaseController {
    listen(router: Router): void {
        // Get the specified number of user recommendations. (An optional parameter is "number", which can be used like "?number=5" at the end of the URL)
        router.get("/:id", ensureAuthorized("user-recommendation.view"), async (req, res, next) => {
        var numberOfRecommendations: number = 10;
        const requestedNumber: number = parseInt(req.query.number.toString());
        const upperLimit = 1000;

        if (requestedNumber > 0 && requestedNumber < upperLimit)
            numberOfRecommendations = requestedNumber;

        res.send(
            success(await this.getRecommendations(req.params.id, numberOfRecommendations))
        );

        next();
      });
    }
    
    public async getRecommendations(_id: string, number: number) {
        const recommendations = await this.getAllPossibleRecomendations(_id);
        return await this.randomlySelectRecommendations(recommendations, number);
    }

    private async getAllPossibleRecomendations(_id: string) {
        const followers = await this.getFollowers(_id);
        const recommendations = [];
        followers.forEach(async follower => {
            const followersOfTheFollower = await this.getFollowers(follower._id);
            followersOfTheFollower.forEach(follower => {
                if (!followers.includes(follower))
                    recommendations.push(follower);
            });
        });

        const university = await UserModel.findOne<User>( {_id: new mongoose.Types.ObjectId(_id)} ).populate('univerity').university;

        university.students.forEach(student => {
            recommendations.push(student);
        });

        return recommendations;
    }

    private async getFollowers(_id: string) {
        return await UserModel.findOne<User>({ _id: new mongoose.Types.ObjectId(_id) }).populate('friends').followers;
    }

    private async randomlySelectRecommendations(recommendations, number: number) {
        const finalRecommendations = [];
        for (let i = 0; i < number; i++) {
            var recommendation = recommendations[Math.random() * recommendations.length];
            finalRecommendations.push(recommendation);
            if (recommendations.includes(recommendation))
                i--;
            else
                recommendations.push(recommendation);
            
            //If, for some reason, we do not have at least "number" unique recommendations in the list, the iteration will never halt.
            //This is to avoid that possiblity.
            if (i > number * 5)
                return null;
        }

        return finalRecommendations;
    }
  }