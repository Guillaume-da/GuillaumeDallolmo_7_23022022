/* eslint-disable no-unused-vars */

import { Dropdown } from './factories/Dropdown.js';
import { RecipeCard } from './factories/RecipeCard.js';
import { Tag } from './factories/Tag.js';

/* eslint-disable no-undef */
export class Search {
	constructor() {
		this.searchInput = document.getElementsByClassName('search__input')[0];
		this.articles = document.getElementsByClassName('recipes__item');
		this.articlesArray = Array.prototype.slice.call( this.articles, 0 );
		this.recipesWrapper = document.querySelector('.recipes');
		this.listContainers = document.getElementsByClassName('search__dropdown-menu-list');
		
		this.resultArray = [];
		this.cleanArray = [];

		this.getResult = (e) => this._getResult(e);
		
		this.bindEvent();

		
	}

	_getResult(e) {
		if(e.target.value.length >= 3) {
			this.resultArray = [];
			recipes.forEach(recipe => {
				if(!this.resultArray.includes(recipe)) {
					if(recipe.name.toLowerCase().includes(e.target.value) || recipe.ingredients.some(ingredient => ingredient.ingredient.includes(e.target.value)) || recipe.description.toLowerCase().includes(e.target.value)){
						this.resultArray.push(recipe);
					}
				}
			});
			this.clearCardsAndDropdowns();
			new RecipeCard(this.resultArray);
			new Dropdown(this.resultArray);
			// new Dropdown().getIngredientsList(this.resultArray);
			// new Dropdown().getAppliancesList(this.resultArray);
			// new Dropdown().getUtensilsList(this.resultArray);
			// new Tag();
				
		} else if (e.target.value.length < 3) {
			this.clearCardsAndDropdowns();
			new RecipeCard(recipes);
			// new Dropdown().getIngredientsList(recipes);
			// new Dropdown().getAppliancesList(recipes);
			// new Dropdown().getUtensilsList(recipes);
			// new Tag();
				
		}
		
	}

	clearList(wrapper) {
		while (wrapper.firstChild) {
			wrapper.removeChild(wrapper.firstChild);
		}
	}

	clearCardsAndDropdowns() {
		this.clearList(this.recipesWrapper);
		for(let container of this.listContainers) {
			// console.log(container.firstChild);
			this.clearList(container);
		}
	}

	bindEvent(){
		this.searchInput.addEventListener('input', this.getResult);
	}
	
}