import { GoogleSpreadsheet } from 'google-spreadsheet';

export interface IGoogleSheetsServiceOptions {
	doc: GoogleSpreadsheet;
}

export interface IGoogleServiceAccount {
	email: string;
	key: string;
}

export interface ICategory {
	id: string;
	name: string;
}

export interface IExpense {
	date: number;
	category: string;
	amount: number;
}
