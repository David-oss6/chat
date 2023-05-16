// External dependencies
import { ObjectId } from "mongodb";
// Class Implementation
export default class User {
    constructor(public name: string, public pass: string, public id?: ObjectId) {}
}