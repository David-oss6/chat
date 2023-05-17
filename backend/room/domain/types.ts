import { TUser } from "../../user/domain/types"

export type TRoom = {
    name: string,
    pass: string,
    owner: string,
    users: TUser[],
    messages: TMessage[]
}

export type TMessage = {
    text: string,
    owner: string,
    room: string,
}
