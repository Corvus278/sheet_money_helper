import { ICategory } from '../model/types';
import { createKeyboard } from './createKeyboard';

export const createCategoriesKeyboards = (
	categories: ICategory[],
	prefix = '',
) => {
	return createKeyboard(
		categories.map((category) => {
			return {
				content: category.name,
				action: prefix + category.id.toString(),
			};
		}),
		3,
	);
};
