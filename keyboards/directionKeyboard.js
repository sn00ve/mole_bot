import { InlineKeyboard } from "grammy";
import { DIRECTIONS } from "../constants/index.js";
import { createButtons } from "./utils.js";

export function directionKeyboard() {
	return InlineKeyboard.from(createButtons(Object.values(DIRECTIONS)));
}
