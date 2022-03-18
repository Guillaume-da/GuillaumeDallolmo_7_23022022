/* eslint-disable no-undef */
import {Dropdown} from './factories/Dropdown.js';
import {RecipeCard} from './factories/RecipeCard.js';
import { Search } from './Search.js';


class App {
	constructor() {
		this.getDropdowns = new Dropdown(recipes);
		this.getRecipes = new RecipeCard();
		this.searchByWord = new Search();
	}

	main() {
		// localStorage.clear();
		this.getRecipes.displayAllRecipes(recipes);
		this.getDropdowns.getListDatas(recipes);
		this.getDropdowns.bindEvent();
		this.searchByWord.bindEvent();
	}
}

const app = new App();
app.main();