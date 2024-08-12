export const CURRENCIES = {
	USD: "USD",
	RUB: "RUB",
	EUR: "EUR",
	USDT: "USDT",
	BTC: "BTC"
};

export function isRUB(currency) {
	return currency === CURRENCIES.RUB;
}

export function isUSD(currency) {
	return currency === CURRENCIES.USD;
}

export function isEUR(currency) {
	return currency === CURRENCIES.EUR;
}

export function isBTC(currency) {
	return currency === CURRENCIES.BTC;
}
