import {Dropdown} from './factories/Dropdown.js';
import {RecipeCard} from './factories/RecipeCard.js';
import { Tag } from './factories/Tag.js';

class App {
	main() {
		new Dropdown();  
		new RecipeCard(); 
		new Tag(); 
	}
}

const app = new App();
app.main();