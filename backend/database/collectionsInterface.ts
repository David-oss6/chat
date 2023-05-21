export interface User {
    name: string;
    pass: string;
    socketId: string;
}

export type Message = {
    text: string,
    owner: string,
    room: string,
    time: string,
}

export interface Room {
    name: string,
    owner: string,
    pass: string,
    users: Array<User>[
    ],
    messages: Array<Message>[
    ]
}