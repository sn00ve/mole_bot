export function getFloatNumber(string) {
	if (!string) return;

	return Number.parseFloat(string.replace(",", "."));
}
