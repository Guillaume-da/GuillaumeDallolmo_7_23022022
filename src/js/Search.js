/* eslint-disable no-unused-vars */

import { Dropdown } from './factories/Dropdown.js';
import { RecipeCard } from './factories/RecipeCard.js';
// import { Tag } from './factories/Tag.js';

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
		this.tagsContainer = document.getElementsByClassName('tags')[0];
		this.items = document.getElementsByClassName('search__dropdown-menu-link');
		this.itemsArray = Array.prototype.slice.call( this.items, 0 );
		this.tagsIcons = document.getElementsByClassName('tags__icon');
		this.tagsIconsArray = Array.prototype.slice.call( this.tagsIcons, 0 );
		this.resultArray = [];
		this.cleanArray = [];
		
		this.getResult();
		this.getItemClicked();
	}

	getItemClicked(){
		for(const element of this.itemsArray) {
			element.addEventListener('click', ()=> {
				if (element.classList.contains('js-ingredient')){
					console.log('clic');
					this.displayTag(element.textContent, 'tags__item--blue');
					this.getSearchTagResult();
				} else if (element.classList.contains('js-appliance')){
					this.displayTag(element.textContent, 'tags__item--green');
				} else if (element.classList.contains('js-utensil')) {
					this.displayTag(element.textContent, 'tags__item--red');
				} 
			});
		}
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
				this.getItemClicked();
				
			} else if (this.searchInput.value.length < 3) {
				this.clearCardsAndDropdowns();
				new RecipeCard(recipes);
				new Dropdown(recipes);
				// new Tag();
			}
		});
	}

	getSearchTagResult() {
		console.log('ok');
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


	displayTag(tag, colorClass){
		const span = document.createElement('span');
		span.classList.add('tags__item');
		span.classList.add(colorClass);
		span.innerHTML = `${tag} <i class="far fa-times-circle tags__icon"></i>`;
		this.tagsContainer.appendChild(span);
		this.closeItem();
	}   

	closeItem() {
		let array = Array.prototype.slice.call( this.tagsIcons, 0 );
		array.forEach(element => {
			element.addEventListener('click', ()=> {
				element.parentNode.style.display = 'none';
			});
		});
	}
}