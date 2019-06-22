import { Mongo } from "meteor/mongo";

const heroDB = new Mongo.Collection("heroDB");

export default heroDB;