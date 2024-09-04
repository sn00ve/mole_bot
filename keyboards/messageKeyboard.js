import { InlineKeyboard } from "grammy";

export function messageKeyboard() {
    return new InlineKeyboard().text("Сохранить", "saveMessage");
}
