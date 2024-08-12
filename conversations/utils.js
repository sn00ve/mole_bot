export async function waitAnswer(conversation, ctx) {
	ctx = await conversation.wait();

	if (ctx.callbackQuery?.message) {
		await ctx.api.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);

		return ctx.callbackQuery.data;
	}

	// await ctx.api.deleteMessage(ctx.chat.id, conversation.session.message);
	// await ctx.api.deleteMessage(ctx.chat.id, ctx.message.message_id);

	return ctx.message.text;
}
