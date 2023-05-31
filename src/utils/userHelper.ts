import type { User } from "@interfaces/user";

function getDisplayName(user?: User | Partial<User>): string {
	if (user && user.email) {
		return user.fullname || user.username || user.email;
	}
	return "user";
}

function getAvatar(picture?: string) {
	if (picture) return picture;
	return "https://pic.onlinewebfonts.com/svg/img_329115.png";
}

function getLocalDate(date?: string) {
	if (date) {
		const dateAsDate = new Date(date);
		return dateAsDate.toLocaleString();
	}
}

export { getDisplayName, getAvatar, getLocalDate };
