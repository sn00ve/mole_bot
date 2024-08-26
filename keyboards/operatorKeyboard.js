import { InlineKeyboard } from "grammy";
import { OPERATORS } from "../constants/index.js";

export function operatorKeyboard() {
	return InlineKeyboard.from(Object.keys(OPERATORS).map(operator => [InlineKeyboard.text(operator)]));
}
