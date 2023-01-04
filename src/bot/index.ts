import { Scenes, Telegraf, session } from 'telegraf';
import { mainMenu } from './Keyboards/MainMenu';
import * as scenes from './Scenes';
import * as actions from './actions';
import { apiAdatper } from './model/index';
import { MyContext } from './types';
import { IDI_NA_HYI_PHOTO_URL, USER_CHAT_TG_ID, BOT_TOKEN } from '../consts';
require('dotenv').config();

export const botLaunch = async () => {
	// Wait init google api
	await apiAdatper.init();

	if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');
	const bot = new Telegraf<MyContext>(BOT_TOKEN);

	// Init stage for scenes
	const stage = new Scenes.Stage<MyContext>([scenes.addExpenses.scene]);
	bot.use(session());
	bot.use(stage.middleware());

	bot.start(async (ctx) => {
		if (ctx.chat.id === USER_CHAT_TG_ID) {
			ctx.reply('Что хочешь сделать?', mainMenu());
		} else {
			ctx.replyWithPhoto(IDI_NA_HYI_PHOTO_URL);
		}
	});

	bot.action(actions.CALCULATE_EXPENSES, (ctx) => {
		ctx.scene.enter(scenes.addExpenses.name, scenes.addExpenses.scene);
	});
	1;
	try {
		bot.launch();
		console.log('bot launch!');
	} catch (e) {
		console.log('launch err -', e);
	}

	process.once('SIGINT', () => bot.stop());
	process.once('SIGTERM', () => bot.stop());
};
