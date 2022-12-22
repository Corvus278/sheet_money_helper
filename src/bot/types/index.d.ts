import { Context, Scenes } from 'telegraf';
import { WizardContext } from 'telegraf/typings/scenes';

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

	wizard: Scenes.WizardContextWizard<MyContext>;
}
