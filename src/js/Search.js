/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { RecipeCard } from './factories/RecipeCard.js';

export class Search {
	constructor() {
		console.log('search constructor');
		this.searchResultArray = [];
		this.searchByTagArray = [];
		this.ingredientsList = [];
		this.appliancesList = [];
		this.utensilsList = [];
		this.updatedList = [];
		this.cleanArray = [];
		this.tagsIcons = [];
		this.tagsItems = [];
		this.list = [];
		this.listContainers = document.getElementsByClassName('js-wrapper');
		this.searchInput = document.getElementsByClassName('search__input')[0];
		this.articles = document.getElementsByClassName('recipes__item');
		this.articlesArray = Array.prototype.slice.call( this.articles, 0 );
		this.recipesWrapper = document.querySelector('.recipes');
		this.listContainers = document.getElementsByClassName('search__dropdown-menu-list');
		this.listItems = document.getElementsByClassName('search__dropdown-menu-link');
		this.dropdownButtons = document.getElementsByClassName('js-openDropdown');
		this.closeButtons = document.getElementsByClassName('js-close');
		this.inputs = document.getElementsByClassName('js-input');
		this.dropdownsLists = document.getElementsByClassName('js-showDropdownList');
		this.tagsContainer = document.getElementsByClassName('tags')[0];

		this.getResult = (e) => this._getResult(e);
		this.closeItem = (e) => this._closeItem(e);
		this.openDropdown = (e) => this._openDropdown(e);
		this.closeDropdown = (e) => this._closeDropdown(e);
		this.getItemClicked = (e) => this._getItemClicked(e);
		
		this.recipeCard = new RecipeCard(recipes);
		this.getListDatas(recipes);
		
		this.bindEvent();
	}

	getDatas(datas, tag, array) {
		datas.filter(recipe => {
			if(recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) || recipe.appliance.toLowerCase().includes(tag.toLowerCase()) || recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.toLowerCase()))){
				if(!array.includes(recipe)) {
					array.push(recipe);
				}
			}
		});
	}

	getResultByTag(tag) {
		
		console.log('searchResultArray', this.searchResultArray);

		if(this.searchResultArray.length === 0 && this.searchByTagArray.length === 0){
			this.getDatas(recipes, tag, this.searchByTagArray);
		} else if(this.searchResultArray.length === 0 && this.searchByTagArray.length > 0){
			this.getDatas(this.searchByTagArray, tag, this.searchByTagArray);
		} else {
			this.getDatas(this.searchResultArray, tag, this.searchByTagArray);
		}

		console.log('searchByTag', this.searchByTagArray);
		this.clearCardsAndDropdowns();
		this.recipeCard.displayAllRecipes(this.searchByTagArray);
		this.getListDatas(this.searchByTagArray);
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
		e.preventDefault();
		if(e.target.value.length === 0) {
			this.clearCardsAndDropdowns();
			this.dropdowns.getListDatas(recipes);
		}
		if(e.target.value.length >= 3) {
			console.log(e.target.value);
			this.searchResultArray = [];
			recipes.forEach(recipe => {
				if(recipe.name.toLowerCase().includes(e.target.value) || recipe.ingredients.some(ingredient => ingredient.ingredient.includes(e.target.value)) || recipe.description.toLowerCase().includes(e.target.value)){
					if(!this.searchResultArray.includes(recipe)) {
						this.searchResultArray.push(recipe);
					}
				}
			});
			this.clearCardsAndDropdowns();
			
			if(this.searchResultArray.length === 0){
				this.recipesWrapper.appendChild(this.insertMessage());
			}
			
			this.recipeCard.displayAllRecipes(this.searchResultArray);
			this.getListDatas(this.searchResultArray);
				
		} else if (e.target.value.length < 3) {
			localStorage.clear();
			this.getListDatas(recipes);
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

	_openDropdown(e) {
		let dropdownList = e.target.parentElement.getElementsByClassName('js-showDropdownList')[0];
		for(let dropdown of this.dropdownsLists) {
			if(dropdown.classList.contains('show')){
				dropdown.classList.remove('show');
			}
			if(dropdown.parentElement.classList.contains('large-size')){
				dropdown.parentElement.classList.remove('large-size');
			}
			dropdown.classList.add('hide');
		}
		dropdownList.classList.remove('hide');
		dropdownList.classList.add('show');

		// Allow to other buttons to be visible when dropdown opened
		if(screen.width >= 1380) {
			dropdownList.parentElement.classList.add('large-size');
		}
	}

	_closeDropdown(e) {
		let dropdownList = e.target.parentElement.nextSibling.nextSibling;
		if(dropdownList.parentElement.classList.contains('show')){
			dropdownList.parentElement.classList.remove('show');
		}
		dropdownList.parentElement.classList.add('hide');
		if(screen.width >= 1380) {
			dropdownList.parentElement.parentElement.classList.remove('large-size');
			if(dropdownList.parentElement.parentElement.classList.contains('list-medium-size')){
				dropdownList.parentElement.parentElement.classList.remove('list-medium-size');
			}
		}
	}

	displayTag(tag, color){
		const span = document.createElement('span');
		span.classList.add('tags__item');
		span.style.backgroundColor = color;
		span.innerHTML = `${tag} <i class="far fa-times-circle tags__icon"></i>`;
		this.tagsContainer.appendChild(span);
		this.tagsItems = document.getElementsByClassName('tags__item');
		this.tagsIcons = document.getElementsByClassName('tags__icon');

		for(const icon of this.tagsIcons) {
			icon.addEventListener('click', this.closeItem);
		}
	} 

	_getItemClicked(e) {
		let item = e.target;
		let backgroundColor = window.getComputedStyle(item.parentElement.parentElement).backgroundColor;
		this.displayTag(item.textContent, backgroundColor);
		this.getResultByTag(item.textContent);
	}

	_closeItem(e) {
		let item = e.target;
		console.log(item);
		item.parentElement.remove();
	}

	// Create list item
	createListItem(data, wrapper) {
		const item = document.createElement('li');
		item.classList.add('search__dropdown-menu-link');
		// Add uppercase to first letter
		item.textContent = data.charAt(0).toUpperCase() + data.slice(1);
		wrapper.appendChild(item); 
		// return item;
	}

	isValidItem(list, listWrapper, item) {
		list = [];
		if(!list.includes(item)){
			list.push(item);
			this.createListItem(item, listWrapper);
		}
		for(const element of this.listItems) {
			element.addEventListener('click', this.getItemClicked);
		}
	}

	getListDatas(recipes) {
		for(let listContainer of this.listContainers) {
			const listWrapper = listContainer.parentElement.lastChild.previousSibling;
			const button = listContainer.parentElement.parentElement.firstChild.nextSibling.dataset.filter;
			
			switch (button) {
			case 'ingredients':
				recipes.forEach(recipe => {
					recipe.ingredients.forEach(ingredient => {
						this.isValidItem(this.ingredientsList, listWrapper, ingredient.ingredient);
					});
				});
				break;
			case 'appliances':
				recipes.forEach(recipe => {
					this.isValidItem(this.appliancesList, listWrapper, recipe.appliance);
				});
				break;
			case 'utensils':
				recipes.forEach(recipe => {
					recipe.ustensils.forEach(ustensil => {
						this.isValidItem(this.utensilsList, listWrapper, ustensil);
					});
				});
				break;
			}
		}
	}

	bindEvent(){
		this.searchInput.addEventListener('input', this.getResult);
		/* for(const element of this.listItems) {
			element.addEventListener('click', this.getItemClicked);
		} */
		for(const dropdownButton of this.dropdownButtons) {
			dropdownButton.addEventListener('click', this.openDropdown);
		}
		for(const closeButton of this.closeButtons) {
			closeButton.addEventListener('click', this.closeDropdown);
		}
		for(const input of this.inputs) {
			input.addEventListener('input', this.updateDropdownListWhenInput);
		}
		console.log('bind search');
	}
}