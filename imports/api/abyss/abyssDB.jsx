import { Mongo } from "meteor/mongo";

export const abyssDB = new Mongo.Collection("abyssDB");
export const abyssCommentsDB = new Mongo.Collection("abyssCommentsDB");
