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

		this.newResultArray = [];
		this.resultArray = [];
		this.cleanArray = [];

		this.getResult = (e) => this._getResult(e);
		
		this.bindEvent();
	}
	
	getDatas(datas, tag, array) {
		datas.filter(recipe => {
			if(recipe.name.toLowerCase().includes(tag.toLowerCase()) || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) || recipe.description.toLowerCase().includes(tag.toLowerCase())){
				if(!array.includes(recipe)) {
					array.push(recipe);
				}
			}
		});
	}

	getResultByTag(tag) {
		let searchResult = JSON.parse(localStorage.getItem('this.resultArray'));
		console.log(searchResult);
		console.log(tag.toLowerCase());
		let result = localStorage.getItem('resultArray');
		result = JSON.parse(result);
		console.log('result', result);
		
		if(result === null){
			console.log('true');
			this.getDatas(recipes, tag, this.newResultArray);
			/* recipes.forEach(recipe => {
				if(recipe.name.toLowerCase().includes(tag.toLowerCase()) || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) || recipe.description.toLowerCase().includes(tag.toLowerCase())){
					if(!this.newResultArray.includes(recipe)) {
						this.newResultArray.push(recipe);
					}
				}
			}); */
		} else {
			this.getDatas(result, tag, this.newResultArray);
			/* result.forEach(recipe => {
				if(recipe.name.toLowerCase().includes(tag.toLowerCase()) || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) || recipe.description.toLowerCase().includes(tag.toLowerCase())){
					if(!this.newResultArray.includes(recipe)) {
						this.newResultArray.push(recipe);
					}
				}
			}); */
		}
		
		console.log(this.newResultArray);
		this.clearCardsAndDropdowns();
		
		new RecipeCard(this.newResultArray);
		new Dropdown(this.newResultArray);
		
		console.log(this.newResultArray);
	}
	

	_getResult(e) {	
		if(e.target.value.length === 0) {
			localStorage.clear();
		}
		if(e.target.value.length >= 3) {
			localStorage.clear();
			this.resultArray = [];
			this.getDatas(recipes, e.target.value, this.resultArray);
			/* recipes.forEach(recipe => {
				if(recipe.name.toLowerCase().includes(e.target.value) || recipe.ingredients.some(ingredient => ingredient.ingredient.includes(e.target.value)) || recipe.description.toLowerCase().includes(e.target.value)){
					if(!this.resultArray.includes(recipe)) {
						this.resultArray.push(recipe);
						
					}
				}
			}); */
			localStorage.setItem('resultArray', JSON.stringify(this.resultArray));
			this.clearCardsAndDropdowns();
			new RecipeCard(this.resultArray);
			new Dropdown(this.resultArray);
				
		} else if (e.target.value.length < 3) {
			this.clearCardsAndDropdowns();
			new RecipeCard(recipes);
			new Dropdown(recipes);	
		}
		
		let result = localStorage.getItem('resultArray');
		result = JSON.parse(result);
		// console.log('result', result);
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