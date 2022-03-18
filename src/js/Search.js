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
		this.currentTag = [];
		this.searchByTagArray = [];
		this.searchResultArray = [];
		this.cleanArray = [];

		this.getResult = (e) => this._getResult(e);
		console.log('search constructor');
	}
	
	getDatas(datas, tag, array) {
		datas.filter(recipe => {
			if(recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) || recipe.appliance.toLowerCase().includes(tag.toLowerCase()) || recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.toLowerCase()))){
				if(!array.includes(recipe)) {
					array.push(recipe);
				}
			}
		});
		localStorage.setItem('searchByTagArray', JSON.stringify(array));
	}

	getResultByTag(tag) {
		if(tag) {
			this.currentTag.push(tag);
		}
		let searchResult = localStorage.getItem('searchResultArray');
		searchResult = JSON.parse(searchResult);
		let searchByTagResult = localStorage.getItem('searchByTagArray');
		searchByTagResult = JSON.parse(searchByTagResult);
		
		if(searchResult === null && searchByTagResult === null){
			this.getDatas(recipes, tag, this.searchByTagArray);
		} else if(searchResult === null && searchByTagResult != null){
			this.getDatas(searchByTagResult, tag, this.searchByTagArray);
		} else {
			this.getDatas(searchResult, tag, this.searchByTagArray);
		}
		
		this.clearCardsAndDropdowns();
		
		let displaySearchResult = new RecipeCard();
		displaySearchResult.displayAllRecipes(this.searchByTagArray);

		let updateDropdown = new Dropdown();
		updateDropdown.getListDatas(this.searchByTagArray, tag);
		// updateDropdown.unbindEvent();
		updateDropdown.bindEvent();
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
		if(e.target.value.length === 0) {
			localStorage.clear();
		}
		if(e.target.value.length >= 3) {
			console.log(e.target.value);
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
			if(this.searchResultArray.length === 0){
				this.recipesWrapper.appendChild(this.insertMessage());
			}
			
			let displaySearchResult = new RecipeCard();
			displaySearchResult.displayAllRecipes(this.searchResultArray);

			let updateDropdown = new Dropdown();
			updateDropdown.getListDatas(this.searchResultArray);
			// updateDropdown.unbindEvent();
			updateDropdown.bindEvent();
				
		} /* else if (e.target.value.length < 3) {
			this.clearCardsAndDropdowns();
			let displaySearchResult = new RecipeCard();
			displaySearchResult.displayAllRecipes(recipes);

			let updateDropdown = new Dropdown();
			updateDropdown.getListDatas(recipes);
			// updateDropdown.unbindEvent();
			updateDropdown.bindEvent();
		} */
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
		console.log('bind search');
	}
	
}