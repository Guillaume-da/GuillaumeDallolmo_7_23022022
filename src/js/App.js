/* eslint-disable no-undef */
import {Dropdown} from './factories/Dropdown.js';
import {RecipeCard} from './factories/RecipeCard.js';
import { Search } from './Search.js';

class App {
	main() {
		localStorage.clear();
		new Dropdown(recipes);  
		new RecipeCard(recipes); 
		new Search();
	}
}

const app = new App();
app.main();