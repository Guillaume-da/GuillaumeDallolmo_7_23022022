/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { RecipeCard } from './factories/RecipeCard.js';

export class Search {
	constructor() {
		this.searchResultArray = [];
		this.searchByTagArray = [];
		this.ingredientsList = [];
		this.appliancesList = [];
		this.newSearchByTag = [];
		this.utensilsList = [];
		this.updatedList = [];
		this.cleanArray = [];
		this.tagsIcons = [];
		this.tagsItems = [];
		this.tagsIngredientsList = [];
		this.tagsAppliancesList = [];
		this.tagsUtensilsList = [];
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

		this.closeTag = (e) => this._closeTag(e);
		this.getResult = (e) => this._getResult(e);
		this.openDropdown = (e) => this._openDropdown(e);
		this.closeDropdown = (e) => this._closeDropdown(e);
		this.getItemClicked = (e) => this._getItemClicked(e);
		this.updateDropdownListWhenInput = (e) => this._updateDropdownListWhenInput(e);
		
		this.recipeCard = new RecipeCard(recipes);
		this.getListDatas(recipes);
		this.bindEvent();
	}

	getDatasByIngredients(datas, tags, array) {
		datas.filter(recipe => {
			let ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
			let tagList = tags.map(tag => tag.toLowerCase());
						
			if(tagList.every(r => ingredients.includes(r))) {
				if(!array.includes(recipe)) {
					array.push(recipe);
				}
			}
		});
	}

	getDatasByAppliance(datas, tags, array) {
		datas.filter(recipe => {
			let tagList = tags.map(tag => tag.toLowerCase());
						
			if(tagList.includes(recipe.appliance.toLowerCase())) {
				if(!array.includes(recipe)) {
					array.push(recipe);
				}
			}
		});
	}

	getDatasByUtensils(datas, tags, array) {
		datas.filter(recipe => {
			let ustensils = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
			let tagList = tags.map(tag => tag.toLowerCase());
						
			if(tagList.every(r => ustensils.includes(r))) {
				if(!array.includes(recipe)) {
					array.push(recipe);
				}
			}
		});
	}

	getResultByTag(tag, getDatas, tagsList) {
		localStorage.clear();
		if(tag) {
			tagsList.push(tag.toLowerCase());
		}
		this.clearCardsAndDropdowns();
		if (this.searchResultArray.length === 0 && this.searchByTagArray.length === 0){
			if(tagsList === this.ingredientsList){
				this.ingredientsList(recipes, tagsList, this.searchByTagArray, parent);
			}
			getDatas(recipes, tagsList, this.searchByTagArray, parent);
			
			this.recipeCard.displayAllRecipes(this.searchByTagArray);
			this.getListDatas(this.searchByTagArray);
		} else if (this.searchResultArray.length  > 0 && this.searchByTagArray.length === 0){
			getDatas(this.searchResultArray, tagsList, this.searchByTagArray);
			
			this.recipeCard.displayAllRecipes(this.searchByTagArray);
			this.getListDatas(this.searchByTagArray);
		} else if (this.searchResultArray.length === 0 && this.searchByTagArray.length > 0) {
			
			localStorage.setItem('resultByTag', JSON.stringify(this.searchByTagArray));
			this.searchByTagArray = [];
			let data = localStorage.getItem('resultByTag');
			data = JSON.parse(data);
			getDatas(data, tagsList, this.searchByTagArray);
			
			this.recipeCard.displayAllRecipes(this.searchByTagArray);
			this.getListDatas(this.searchByTagArray);
			localStorage.clear();
		}
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
			this.clearCardsAndDropdowns();
			this.recipeCard.displayAllRecipes(recipes);
			this.getListDatas(recipes);
		}
		if(e.target.value.length >= 3) {
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
			this.getListDatas(recipes);
		}
		
	}

	_updateDropdownListWhenInput(e) {

		// Get list iems in dropdown, put items in this.list
		this.updatedList = [];
		let listItems = e.target.parentElement.nextSibling.nextSibling.getElementsByClassName('search__dropdown-menu-link');
		for(let item of listItems){
			if(!this.list.includes(item.textContent.toLowerCase())){
				this.list.push(item.textContent.toLowerCase());
			}
		}
		// Clear dropdown
		if (typeof(e) !== 'undefined') {
			this.clearList(e.target.parentElement.parentElement.lastChild.previousElementSibling);
		}
		
		// Check if target value matchs with an item
		// If match, create item and put item in this.updatedList
		for(let item of this.list){
			if(item.toLowerCase().includes(e.target.value)){
				if(!this.updatedList.includes(item.toLowerCase())) {
					this.updatedList.push(item.toLowerCase());
					const link = document.createElement('li');
					link.classList.add('search__dropdown-menu-link');
					link.textContent = item.toLowerCase();
					e.target.parentElement.nextSibling.nextSibling.appendChild(link); 
				}
			}
		}
		for(const element of this.listItems) {
			element.addEventListener('click', this.getItemClicked);
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
			icon.addEventListener('click', this.closeTag);
		}
	} 

	_getItemClicked(e) {
		let item = e.target;
		let backgroundColor = window.getComputedStyle(item.parentElement.parentElement).backgroundColor;
		this.displayTag(item.textContent, backgroundColor);
		if(item.parentElement.parentElement.id === 'ingredients-list'){
			this.getResultByTag(item.textContent, this.getDatasByIngredients, this.tagsIngredientsList);
		} else if((item.parentElement.parentElement.id === 'appliances-list')){
			this.getResultByTag(item.textContent, this.getDatasByAppliance, this.tagsAppliancesList);
		} else if((item.parentElement.parentElement.id === 'utensils-list')) {
			this.getResultByTag(item.textContent, this.getDatasByUtensils, this.tagsUtensilsList);
		}
		
	}

	_closeTag(e) {
		let item = e.target;
		let tag = `'${item.parentElement.textContent.toLowerCase()}'`;
		tag = tag.replace(/\s+/g, '');
		
		if(item.parentElement.style.backgroundColor === 'rgb(50, 130, 247)') {
			this.tagsIngredientsList = this.tagsIngredientsList.map(e => e.replace(/\s+/g, ''));
			this.tagsIngredientsList.splice(this.tagsIngredientsList.indexOf(tag), 1);
			item.parentElement.remove();
			this.clearCardsAndDropdowns();
			if(this.tagsIngredientsList.length === 0 && this.searchResultArray.length > 0) {
				this.searchByTagArray = [];
				this.recipeCard.displayAllRecipes(this.searchResultArray);
				this.getListDatas(this.searchResultArray);
			} else if (this.searchResultArray.length === 0 && this.tagsIngredientsList.length > 0) {
				this.searchByTagArray = [];
				console.log(this.tagsIngredientsList);
				this.getDatasByIngredients(recipes, this.tagsIngredientsList, this.searchByTagArray);
				console.log(this.tagsIngredientsList);
				console.log(this.searchByTagArray);
				this.recipeCard.displayAllRecipes(this.searchByTagArray);
				this.getListDatas(this.searchByTagArray);
			} else if(this.tagsIngredientsList.length === 0 && this.searchResultArray.length === 0){
				localStorage.clear();
				this.searchByTagArray = [];
				this.recipeCard.displayAllRecipes(recipes);
				this.getListDatas(recipes);
			}
		} else if (item.parentElement.style.backgroundColor === 'rgb(104, 217, 164)') {
			this.tagsAppliancesList = this.tagsAppliancesList.map(e => e.replace(/\s+/g, ''));
			this.tagsAppliancesList.splice(this.tagsAppliancesList.indexOf(tag), 1);
			console.log(this.tagsAppliancesList);
			item.parentElement.remove();
			if (this.searchResultArray.length === 0 && this.tagsAppliancesList.length > 0) {
				this.searchByTagArray = [];
				console.log(this.tagsAppliancesList);
				this.getDatasByIngredients(recipes, this.tagsAppliancesList, this.searchByTagArray);
				console.log(this.tagsAppliancesList);
				console.log(this.searchByTagArray);
				this.recipeCard.displayAllRecipes(this.searchByTagArray);
				this.getListDatas(this.searchByTagArray);
			} else if(this.tagsAppliancesList.length === 0 && this.searchResultArray.length === 0){
				localStorage.clear();
				this.searchByTagArray = [];
				this.recipeCard.displayAllRecipes(recipes);
				this.getListDatas(recipes);
			}
			
		} else if (item.parentElement.style.backgroundColor === 'rgb(208, 79, 79)') {
			item.parentElement.remove();
			
		}
		/* let tag = `'${item.parentElement.textContent.toLowerCase()}'`;
		tag = tag.replace(/\s+/g, '');
		this.tagsList = this.tagsList.map(e => e.replace(/\s+/g, ''));
		this.tagsList = this.tagsList.filter(item => item === tag);
		
		console.log('tagsList', this.tagsList);
		item.parentElement.remove();
		this.clearCardsAndDropdowns();
		if(this.tagsList.length === 0 && this.searchResultArray.length > 0) {
			this.searchByTagArray = [];
			console.log('searchResultArray', this.searchResultArray);
			
			this.recipeCard.displayAllRecipes(this.searchResultArray);
			this.getListDatas(this.searchResultArray);
		} else if (this.tagsList.length > 0) {
			
			this.recipeCard.displayAllRecipes(this.searchByTagArray);
			this.getListDatas(this.searchByTagArray);
		} else {
			
			this.recipeCard.displayAllRecipes(recipes);
			this.getListDatas(recipes);
		} */
	}

	// Create list item
	createListItem(data, wrapper) {
		const item = document.createElement('li');
		item.classList.add('search__dropdown-menu-link');
		// Add uppercase to first letter
		item.textContent = data.charAt(0).toUpperCase() + data.slice(1);
		wrapper.appendChild(item); 
		return item;
	}

	isValidItem(list, listWrapper, item) {
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
				this.ingredientsList = [];
				break;
			case 'appliances':
				recipes.forEach(recipe => {
					this.isValidItem(this.appliancesList, listWrapper, recipe.appliance);
				});
				this.appliancesList = [];
				break;
			case 'utensils':
				recipes.forEach(recipe => {
					recipe.ustensils.forEach(ustensil => {
						this.isValidItem(this.utensilsList, listWrapper, ustensil);
					});
				});
				this.utensilsList = [];
				break;
			}
		}
	}

	bindEvent(){
		this.searchInput.addEventListener('input', this.getResult);
		
		for(const dropdownButton of this.dropdownButtons) {
			dropdownButton.addEventListener('click', this.openDropdown);
		}
		for(const closeButton of this.closeButtons) {
			closeButton.addEventListener('click', this.closeDropdown);
		}
		for(const input of this.inputs) {
			input.addEventListener('input', this.updateDropdownListWhenInput);
		}
		// console.log('bind search');
	}
}