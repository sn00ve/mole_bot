import { InlineKeyboard } from "grammy";
import { DIRECTIONS } from "../constants/index.js";

export function directionKeyboard() {
	return InlineKeyboard.from(Object.values(DIRECTIONS).map(direction => [InlineKeyboard.text(direction)]));
}
