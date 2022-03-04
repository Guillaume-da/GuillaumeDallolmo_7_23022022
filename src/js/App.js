import {Dropdown} from './factories/Dropdown.js';
import {RecipeCard} from './factories/RecipeCard.js';

class App {
    main() {
        new Dropdown();  
        new RecipeCard();  
    }
}

const app = new App();
app.main();