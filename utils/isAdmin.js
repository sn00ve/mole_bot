export function isAdmin(userId) {
	return userId.toString() === process.env.ADMIN_ID;
}
