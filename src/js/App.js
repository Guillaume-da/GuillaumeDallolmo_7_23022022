/* eslint-disable no-undef */
import {Dropdown} from './factories/Dropdown.js';
import {RecipeCard} from './factories/RecipeCard.js';

class App {
	main() {
		new Dropdown(recipes);  
		new RecipeCard(recipes); 
	}
}

const app = new App();
app.main();