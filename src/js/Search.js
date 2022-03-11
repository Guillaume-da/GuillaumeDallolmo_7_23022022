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
		this.ingredientsContainer = document.getElementsByClassName('search__dropdown-menu-list')[0];
		this.appliancesContainer = document.getElementsByClassName('search__dropdown-menu-list')[1];
		this.utensilsContainer = document.getElementsByClassName('search__dropdown-menu-list')[2];
		
		this.resultArray = [];
		this.cleanArray = [];
		
		this.getResult();
		new Tag();
	}

	getResult() {
		this.searchInput.addEventListener('input', ()=> {
			
			if(this.searchInput.value.length >= 3) {
				this.resultArray = [];
				recipes.forEach(recipe => {
					if(!this.resultArray.includes(recipe)) {
						if(recipe.name.toLowerCase().includes(this.searchInput.value) || recipe.ingredients.some(ingredient => ingredient.ingredient.includes(this.searchInput.value)) || recipe.description.toLowerCase().includes(this.searchInput.value)){
							this.resultArray.push(recipe);
						}
					}
				});
				this.clearCardsAndDropdowns();
				new RecipeCard(this.resultArray);
				new Dropdown(this.resultArray);
				new Tag();
				
			} else if (this.searchInput.value.length < 3) {
				this.clearCardsAndDropdowns();
				new RecipeCard(recipes);
				new Dropdown(recipes);
				new Tag();
				
			}
		});
	}

	clearList(wrapper) {
		while (wrapper.firstChild) {
			wrapper.removeChild(wrapper.firstChild);
		}
	}

	clearCardsAndDropdowns() {
		this.clearList(this.recipesWrapper);
		this.clearList(this.ingredientsContainer);
		this.clearList(this.appliancesContainer);
		this.clearList(this.utensilsContainer);
	}
}