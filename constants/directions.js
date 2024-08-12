export const DIRECTIONS = {
	deposit: "Принять",
	withdraw: "Выдать"
};

export function isDeposit(direction) {
	return direction === DIRECTIONS.deposit;
}

export function isWithdraw(direction) {
	return direction === DIRECTIONS.withdraw;
}
