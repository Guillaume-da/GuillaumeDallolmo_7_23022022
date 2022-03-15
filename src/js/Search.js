/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { Dropdown } from './factories/Dropdown.js';
import { RecipeCard } from './factories/RecipeCard.js';

export class Search {
	constructor() {
		this.searchInput = document.getElementsByClassName('search__input')[0];
		this.articles = document.getElementsByClassName('recipes__item');
		this.articlesArray = Array.prototype.slice.call( this.articles, 0 );
		this.recipesWrapper = document.querySelector('.recipes');
		this.listContainers = document.getElementsByClassName('search__dropdown-menu-list');

		this.searchByTagArray = [];
		this.searchResultArray = [];
		this.cleanArray = [];

		this.getResult = (e) => this._getResult(e);
		
		this.bindEvent();
	}
	
	getDatas(datas, tag, array) {
		datas.filter(recipe => {
			if(recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) || recipe.appliance.toLowerCase().includes(tag.toLowerCase()) || recipe.ustensils.includes(tag.toLowerCase())){
				if(!array.includes(recipe)) {
					array.push(recipe);
				}
			}
		});
	}

	getResultByTag(tag) {
		let result = localStorage.getItem('searchResultArray');
		result = JSON.parse(result);
		
		if(result === null){
			this.getDatas(recipes, tag, this.searchByTagArray);
		} else {
			this.getDatas(result, tag, this.searchByTagArray);
		}
		
		this.clearCardsAndDropdowns();
		
		new RecipeCard(this.searchByTagArray);
		new Dropdown(this.searchByTagArray);
	}
	
	insertMessage() {
		const paragraph = document.createElement('div');
		paragraph.classList.add('recipes__no-result-message');
		const message = `
                <p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>
        `;
		paragraph.innerHTML = message;
		return paragraph;
	}

	_getResult(e) {	
		localStorage.clear();
		if(e.target.value.length === 0) {
			localStorage.clear();
		}
		if(e.target.value.length >= 3) {
			localStorage.clear();
			this.searchResultArray = [];
			recipes.forEach(recipe => {
				if(recipe.name.toLowerCase().includes(e.target.value) || recipe.ingredients.some(ingredient => ingredient.ingredient.includes(e.target.value)) || recipe.description.toLowerCase().includes(e.target.value)){
					if(!this.searchResultArray.includes(recipe)) {
						this.searchResultArray.push(recipe);
					}
				}
			});
			localStorage.setItem('searchResultArray', JSON.stringify(this.searchResultArray));
			this.clearCardsAndDropdowns();
			let result = localStorage.getItem('searchResultArray');
			result = JSON.parse(result);
			if(result.length === 0){
				this.recipesWrapper.appendChild(this.insertMessage());
			}
			new RecipeCard(this.searchResultArray);
			new Dropdown(this.searchResultArray);
				
		} else if (e.target.value.length < 3) {
			this.clearCardsAndDropdowns();
			new RecipeCard(recipes);
			new Dropdown(recipes);	
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
			this.clearList(container);
		}
	}

	bindEvent(){
		this.searchInput.addEventListener('input', this.getResult);
	}
	
}