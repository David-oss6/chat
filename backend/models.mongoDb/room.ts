// External dependencies
import { FindCursor, ObjectId } from "mongodb";
import { TMessage, TSchema, TUser } from "../domain/types";
// Class Implementation
export default class Room {
    constructor(public name: string, public pass: string, public owner: TUser, public messages: TMessage[], public users: TUser[], public id?: ObjectId) {}
}
