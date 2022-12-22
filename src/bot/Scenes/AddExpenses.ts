import { Composer, Markup } from 'telegraf';
import { Scenes } from 'telegraf';
import { getDaysFromMonthStart } from '../../utils/getDaysFromMonthStart';
import { parseDate } from '../../utils/parseDate';
import { MyContext } from '../types/index.d';
import { apiAdatper } from '../model/index';
import { createCategoriesKeyboards } from '../Keyboards/createCategoriesKeyboard';
import * as regexprs from './regexp';
import { getRegexpMatch } from '../../utils/getRegexpMatch';
import { mainMenu } from '../Keyboards/MainMenu';

const daysKeyboard = Markup.inlineKeyboard(
	getDaysFromMonthStart().map((day) => {
		return Markup.button.callback(
			day.toString(),
			`selectDate-${parseDate(day)}`,
		);
	}),
	{
		columns: 7,
	},
);

export const name = 'addExpenses';

const selectDate = new Composer<MyContext>();

selectDate.action(/selectDate\-[0-9]/, async (ctx) => {
	const date = ctx.callbackQuery.data?.split('-')[1];
	if (date) {
		ctx.scene.session.state.date = parseInt(date);
	}

	const categories = await apiAdatper.getCategories();

	if (!categories || !categories.length) {
		ctx.reply('Не получилось загрузить категории');
		ctx.scene.leave();
		ctx.reply('Что ты хочешь сделать?', mainMenu());
		return;
	}

	ctx.answerCbQuery();

	await ctx.reply(
		'Выбери категорию:',
		createCategoriesKeyboards(categories, 'selectCategory-'),
	);

	ctx.wizard.next();
});

const selectCategoryAndAmount = new Composer<MyContext>();
selectCategoryAndAmount.action(/selectCategory/, async (ctx) => {
	await ctx.answerCbQuery();
	if (!ctx.callbackQuery.data) {
		await ctx.reply('Ошибка - нет поля data у callbackQuery');
		ctx.scene.leave();
		return;
	}

	const categoryId = getRegexpMatch(
		ctx.callbackQuery.data,
		regexprs.findCategoryId,
	);

	if (categoryId) {
		ctx.scene.session.state.category = categoryId;
	}

	await ctx.reply('Введи сумму трат:');

	return;
});

selectCategoryAndAmount.on('text', async (ctx) => {
	const input = parseInt(ctx.message.text);
	if (isNaN(input)) {
		await ctx.reply('Нужно ввести число!');
		return;
	}

	ctx.scene.session.state.amount = input;

	const res = await apiAdatper.setExpenseOfDay({
		amount: ctx.scene.session.state.amount,
		category: ctx.scene.session.state.category,
		date: ctx.scene.session.state.date,
	});

	if (res) {
		await ctx.reply('Записано!');
	} else {
		await ctx.reply('Не получилось записать в таблицу');
	}

	const categories = await apiAdatper.getCategories();

	if (!categories || !categories.length) {
		ctx.reply('Не получилось загрузить категории');
		ctx.scene.leave();
		ctx.reply('Что ты хочешь сделать?', mainMenu());
		return;
	}

	await ctx.reply(
		'Выбери категорию:',
		createCategoriesKeyboards(categories, 'selectCategory-'),
	);

	return;
});

export const scene = new Scenes.WizardScene(
	name,
	selectDate,
	selectCategoryAndAmount,
);
scene.enter(async (ctx) => {
	await ctx.reply('За какаую дату хочешь заполнить?', daysKeyboard);
	ctx.answerCbQuery();
});

scene.command('exit', (ctx) => {
	ctx.scene.leave();
	ctx.reply('Что ты хочешь сделать?', mainMenu());
});