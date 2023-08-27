import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { stateGetters } from '../../model';
import { MyContext, TKeyboardAll } from '../../types';
import { IMessageData } from './types';
import { WizardContext } from 'telegraf/typings/scenes';
import { Markup } from 'telegraf/typings/markup';

const makeMessages = () => {
	const messageDataSeparator = ';\n';

	const getDataStr = (prefix: string, data?: string | number) => {
		if (data === undefined) {
			return '';
		}

		return `${prefix}${data}` + messageDataSeparator;
	};

	const getDateStr = (date?: number) => {
		return getDataStr('Число: ', date);
	};

	const getCategoryStr = (category?: string) => {
		return getDataStr('Категория: ', category);
	};

	const getPrevCategoryStr = (prevCategory?: string) => {
		return getDataStr('Предыдущая категория: ', prevCategory);
	};

	const getPrevExpense = (prevExpense?: string | number) => {
		return getDataStr('Предыдущая сумма: ', prevExpense);
	};

	const getHeaderStr = (messageData: IMessageData) => {
		const { date, category, prevCategory, prevExpense } = messageData;
		return (
			getDateStr(date) +
			getCategoryStr(category) +
			getPrevCategoryStr(prevCategory) +
			getPrevExpense(prevExpense)
		);
	};

	const sendMessageWithStateData = async (
		ctx: MyContext,
		text: string,
		keyboard?: Markup<InlineKeyboardMarkup>,
	) => {
		const { getDate, getAmount, getCategory } = stateGetters;

		const stateData: IMessageData = {
			date: getDate(ctx),
			prevExpense: getAmount(ctx),
			prevCategory: getCategory(ctx),
		};

		const message = getHeaderStr(stateData) + '\n' + text;

		await ctx.reply(message, keyboard);
		await ctx.answerCbQuery();
	};

	return {
		getHeaderStr,
		sendMessageWithStateData,
	};
};

export const sendMessage = makeMessages();
