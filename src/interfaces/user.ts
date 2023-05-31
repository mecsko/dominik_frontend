interface User {
	_id?: string;
	createdAt?: string;
	updatedAt?: string;
	username: string;
	fullname?: string;
	displayName?: string;
	email: string;
	email_is_verified?: boolean;
	password?: string;
	locale?: string;
	picture?: string;
	role?: string;
}

interface EditUser {
	username?: string;
	email?: string;
	locale?: string;
	fullname?: string;
	picture?: string;
	password?: string;
}

export { User, EditUser };
