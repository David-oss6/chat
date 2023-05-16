export type TRoom ={
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

export type TUser = {
    name: string,
    pass: string,    
}

export type TSchema = {
    name: string,
    pass: string,
    owner: string,
    users: TUser[],
    messages: TMessage[]
}

