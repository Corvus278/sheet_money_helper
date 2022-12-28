import { GoogleSheetsService } from '../../googleSheetsService/googleSheetService';
import { getGoogleService } from '../../googleSheetsService/index';
import { ICategory, IExpense } from './types';

export class ApiAdapter {
	private gSheetsApi: GoogleSheetsService | undefined;

	init = async () => {
		this.gSheetsApi = await getGoogleService();
	};

	getCategories = async (): Promise<ICategory[] | undefined> => {
		return this.gSheetsApi?.getCategories();
	};

	setExpenseOfDay = async (expense: IExpense): Promise<boolean | undefined> => {
		return this.gSheetsApi?.setExpense(expense);
	};

	updateDoc = async () => {
		await this.gSheetsApi?.updateDoc();
	};
}

function getMokCategories() {
	return [
		{
			id: 'A',
			name: 'category 1',
		},
		{
			id: 'F',
			name: 'category 2',
		},
		{
			id: 'A',
			name: 'category 3',
		},
		{
			id: 'G',
			name: 'category G',
		},
		{
			id: 'G',
			name: 'category G',
		},
		{
			id: 'G',
			name: 'category G',
		},
		{
			id: 'G',
			name: 'category G',
		},
		{
			id: 'G',
			name: 'category G',
		},
		{
			id: 'G',
			name: 'category G',
		},
		{
			id: 'H',
			name: 'category H',
		},
		{
			id: 'H',
			name: 'category H',
		},
		{
			id: 'H',
			name: 'category H',
		},
	];
}
