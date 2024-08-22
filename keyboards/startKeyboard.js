import { Keyboard } from "grammy";
import { MENU_BUTTON } from "../constants/index.js";

export function startKeyboard() {
	return new Keyboard().text(MENU_BUTTON).resized();
}
