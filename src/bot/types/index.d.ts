import { Context, Scenes } from 'telegraf';
import { WizardContext } from 'telegraf/typings/scenes';
import {
	ForceReply,
	InlineKeyboardMarkup,
	ReplyKeyboardMarkup,
	ReplyKeyboardRemove,
} from 'telegraf/typings/core/types/typegram';

export type TSelectDate = number | 'Сегодня' | 'Вчера';

export interface IState {
	category: string;
	date: number;
	amount: number;
}

export interface MyWizardSession extends Scenes.WizardSessionData {
	state: IState;
}

export interface MyContext extends Context {
	scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
	session: MyWizardSession;
	cursor: number;
	wizard: Scenes.WizardContextWizard<MyContext>;
}

export type TKeyboardAll =
	| InlineKeyboardMarkup
	| ReplyKeyboardMarkup
	| ReplyKeyboardRemove
	| ForceReply;
