export type profileInfo = {
    username: string,
    id: string,
    password: string,
};


export type User = {
    username: string;
    id: number;
    role: string;
};

export type Incidents = {
    id: number;
	title: string;
	status: string;
	priority: string;
	assignedTo: number;
	createdAt: string;
	updatedAt: string;
	assignedUser: {
        id: number,
		username: string
	}
}