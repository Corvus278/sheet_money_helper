import { MyContext } from '../../types';

export const getSessionState = (ctx: MyContext) => {
	return ctx.scene.session.state;
};

export const getDate = (ctx: MyContext) => {
	return getSessionState(ctx).date;
};

export const getAmount = (ctx: MyContext) => {
	return getSessionState(ctx).amount;
};

export const getCategory = (ctx: MyContext) => {
	return getSessionState(ctx).category;
};
