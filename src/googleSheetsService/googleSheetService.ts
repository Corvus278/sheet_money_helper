import {
	IGoogleServiceAccount,
	IGoogleSheetsServiceOptions,
	ICategory,
} from './types';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { config } from './config';
import { IExpense } from '../bot/model/types';

export class GoogleSheetsService {
	private doc: GoogleSpreadsheet;
	private config = {
		categories: {
			startCell: config.categoriesCells.split(':')[0],
			endCell: config.categoriesCells.split(':')[1],
			rangeCell: config.categoriesCells,
		},
	};

	constructor({ doc }: IGoogleSheetsServiceOptions) {
		// Loading doc - in index file
		this.doc = doc;
	}

	get #currentSheet() {
		// Две последние таблицы - изначальные шаблоны, после них идёт таблица текущего месяца
		// Не очень надёжно конечно, но пока похуй)
		return this.doc.sheetsByIndex[this.doc.sheetCount - 3];
	}

	#loadCatergoriesCells = async () => {
		await this.loadCellsByA1(this.config.categories.rangeCell);
	};

	getCategories = async (): Promise<ICategory[]> => {
		await this.#loadCatergoriesCells();

		const categoriesList: ICategory[] = [];
		const {
			rowIndex: categoriesRowIndex,
			columnIndex: categoriesStartColumnIndex,
		} = this.#currentSheet.getCellByA1(this.config.categories.startCell);
		const categoriesEndColumnIndex = this.#currentSheet.getCellByA1(
			this.config.categories.endCell,
		).columnIndex;

		for (
			let i = categoriesStartColumnIndex;
			i <= categoriesEndColumnIndex;
			i++
		) {
			const currentCell = this.#currentSheet.getCell(categoriesRowIndex, i);

			categoriesList.push({
				id: currentCell.a1Address,
				name: currentCell.value as string,
			});
		}

		return categoriesList;
	};

	setExpense = async (expense: IExpense): Promise<boolean> => {
		if (expense.date > 31) {
			return false;
		}
		const currentA1 = this.getExpenseA1Addres(expense);

		await this.loadCellsByA1(currentA1);

		const currentCell = this.getCellByA1(currentA1);

		currentCell.value = expense.amount;

		await this.#currentSheet.saveUpdatedCells();

		return true;
	};

	private getExpenseA1Addres = ({
		category: categoryA1Adres,
		date,
	}: IExpense): string => {
		return categoryA1Adres[0] + (date + 1).toString();
	};

	private loadCellsByA1 = async (a1: string) => {
		await this.#currentSheet.loadCells(a1);
	};

	private getCellByA1 = (a1: string) => {
		return this.#currentSheet.getCellByA1(a1);
	};
}
