import { SKIP_DATA } from "../constants/index.js";

export function withSkipButton(keyboard) {
	return keyboard.row().text("Пропустить", SKIP_DATA);
}
