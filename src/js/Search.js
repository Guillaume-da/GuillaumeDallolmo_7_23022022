/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { RecipeCard } from './factories/RecipeCard.js';

export class Search {
	constructor() {
		console.log('search constructor');
		this.tagsIngredientsList = [];
		this.tagsAppliancesList = [];
		this.searchResultArray = [];
		this.tagsUtensilsList = [];
		this.searchByTagArray = [];
		this.ingredientsList = [];
		this.appliancesList = [];
		this.newSearchByTag = [];
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
		this.tags = document.getElementsByClassName('tags__item');

		this.closeTag = (e) => this._closeTag(e);
		this.getResult = (e) => this._getResult(e);
		this.openDropdown = (e) => this._openDropdown(e);
		this.closeDropdown = (e) => this._closeDropdown(e);
		this.getItemClicked = (e) => this._getItemClicked(e);
		this.updateDropdownListWhenInput = (e) => this._updateDropdownListWhenInput(e);

		this.getListDatas(recipes);
		
		this.recipeCard = new RecipeCard(recipes);
		
		this.bindEvent();
	}

	getDatasByIngredients(datas, tags, array) {
		datas.filter(recipe => {		
			if(tags.map(tag => tag.toLowerCase()).every(r => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).includes(r))) {
				if(!array.includes(recipe)) {
					array.push(recipe);
				}
			}
		});
	}

	getDatasByAppliance(datas, tags, array) {
		datas.filter(recipe => {
			if(tags.map(tag => tag.toLowerCase()).every(r => recipe.appliance.toLowerCase().includes(r))) {
				if(!array.includes(recipe)) {
					array.push(recipe);
				}
			}
		});
	}

	getDatasByUtensils(datas, tags, array) {
		datas.filter(recipe => {
			if(tags.map(tag => tag.toLowerCase()).every(r => recipe.ustensils.map(ustensil => ustensil.toLowerCase()).includes(r))) {
				if(!array.includes(recipe)) {
					array.push(recipe);
				}
			}
		});
	}

	getResultByTag(tag, tagsList) {
		localStorage.clear();
		if(tag) {
			tagsList.push(tag.toLowerCase());
		}
		this.clearCardsAndDropdowns();
		if (this.searchResultArray.length === 0 && this.searchByTagArray.length === 0){
			this.getDatasByIngredients(recipes, tagsList, this.searchByTagArray);
			this.getDatasByAppliance(recipes, tagsList, this.searchByTagArray);
			this.getDatasByUtensils(recipes, tagsList, this.searchByTagArray);
			
			this.recipeCard.displayAllRecipes(this.searchByTagArray);
			this.getListDatas(this.searchByTagArray, tag);

		} else if (this.searchResultArray.length  > 0 && this.searchByTagArray.length === 0){
			console.log(this.searchResultArray);
			localStorage.setItem('searchResult', JSON.stringify(this.searchResultArray));
			this.searchByTagArray = [];
			let data = localStorage.getItem('searchResult');
			data = JSON.parse(data);
			
			this.getDatasByIngredients(data, tagsList, this.searchByTagArray);
			this.getDatasByAppliance(data, tagsList, this.searchByTagArray);
			this.getDatasByUtensils(data, tagsList, this.searchByTagArray);
			
			this.recipeCard.displayAllRecipes(this.searchByTagArray);
			this.getListDatas(this.searchByTagArray);
			localStorage.clear();

		} else if (this.searchResultArray.length  > 0 && this.searchByTagArray.length > 0){
			localStorage.setItem('resultByTag', JSON.stringify(this.searchByTagArray));
			this.searchByTagArray = [];
			let data = localStorage.getItem('resultByTag');
			data = JSON.parse(data);
			
			this.getDatasByIngredients(data, tagsList, this.searchByTagArray);
			this.getDatasByAppliance(data, tagsList, this.searchByTagArray);
			this.getDatasByUtensils(data, tagsList, this.searchByTagArray);
			
			this.recipeCard.displayAllRecipes(this.searchByTagArray);
			this.getListDatas(this.searchByTagArray);
			localStorage.clear();

		} else if (this.searchResultArray.length === 0 && this.searchByTagArray.length > 0) {
			
			localStorage.setItem('resultByTag', JSON.stringify(this.searchByTagArray));
			this.searchByTagArray = [];
			let data = localStorage.getItem('resultByTag');
			data = JSON.parse(data);
			
			this.getDatasByIngredients(data, tagsList, this.searchByTagArray);
			this.getDatasByAppliance(data, tagsList, this.searchByTagArray);
			this.getDatasByUtensils(data, tagsList, this.searchByTagArray);
			
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

	getDataResult(e, recipes) {
		this.searchResultArray = [];
		recipes.forEach(recipe => {
			if(recipe.name.toLowerCase().includes(e.target.value.toLowerCase()) || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(e.target.value.toLowerCase())) || recipe.description.toLowerCase().includes(e.target.value.toLowerCase())){
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
	}

	_getResult(e) {	
		if(e.target.value.length === 0 && this.searchByTagArray.length === 0) {
			this.searchResultArray = [];
			this.clearCardsAndDropdowns();
			this.recipeCard.displayAllRecipes(recipes);
			this.getListDatas(recipes);
		}
		if(e.target.value.length >= 3 && this.searchByTagArray.length === 0) {
			this.getDataResult(e, recipes);
				
		} else if(e.target.value.length >= 3 && this.searchByTagArray.length > 0) {
			this.getDataResult(e, this.searchByTagArray);
		} else if (e.target.value.length < 3 && this.searchByTagArray.length === 0) {
			this.clearCardsAndDropdowns();
			this.recipeCard.displayAllRecipes(recipes);
			this.getListDatas(recipes);
		} else if (e.target.value.length < 3 && this.searchByTagArray.length > 0) {
			this.clearCardsAndDropdowns();
			this.recipeCard.displayAllRecipes(this.searchByTagArray);
			this.getListDatas(this.searchByTagArray);
		}
	}

	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
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
					this.updatedList.push(item);
					const link = document.createElement('li');
					link.classList.add('search__dropdown-menu-link');
					link.textContent = this.capitalizeFirstLetter(item);
					e.target.parentElement.nextSibling.nextSibling.appendChild(link); 
					if(this.updatedList.length === 1){
						link.classList.add('full-size');
					} else {
						link.classList.remove('full-size');
					}
				}
			}
		}
		for(const element of this.listItems) {
			element.addEventListener('click', this.getItemClicked);
		}
		if(this.updatedList.length === 1){
			e.target.parentElement.parentElement.parentElement.classList.remove('large-size');
			e.target.parentElement.parentElement.classList.add('small-size');
			e.target.parentElement.parentElement.parentElement.classList.add('small-size-container');
		} else {
			e.target.parentElement.parentElement.parentElement.classList.add('large-size');
			e.target.parentElement.parentElement.classList.remove('small-size');
			e.target.parentElement.parentElement.parentElement.classList.remove('small-size-container');
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
		if(e.target.parentElement.parentElement.parentElement.classList.contains('small-size-container')){
			e.target.parentElement.parentElement.parentElement.classList.remove('small-size-container');
			e.target.parentElement.parentElement.parentElement.classList.add('small-size-container-closed');
		}
	}

	displayTag(tag, color, typeClass){
		const span = document.createElement('span');
		span.classList.add('tags__item');
		span.classList.add(typeClass);
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
		let array = [...this.tags];
		let tags = array.map(tag => tag.textContent);
		let cleanItem = item.textContent.replace(/\s/g, '');
		let cleanArray = tags.map(e => e.replace(/\s+/g, ''));
		
		if(item.parentElement.parentElement.classList.contains('small-size')){
			item.parentElement.parentElement.classList.remove('small-size');
			item.parentElement.parentElement.parentElement.classList.remove('small-size-container');
			item.parentElement.parentElement.parentElement.classList.add('large-size');
		}
		
		if(item.parentElement.parentElement.id === 'ingredients-list' && !cleanArray.includes(cleanItem)){
			this.displayTag(item.textContent, backgroundColor, 'js-ingredient-tag');
			this.getResultByTag(item.textContent, this.tagsIngredientsList);
		} else if((item.parentElement.parentElement.id === 'appliances-list') && !cleanArray.includes(cleanItem)){
			this.displayTag(item.textContent, backgroundColor, 'js-appliance-tag');
			this.getResultByTag(item.textContent, this.tagsAppliancesList);
		} else if((item.parentElement.parentElement.id === 'utensils-list') && !cleanArray.includes(cleanItem)) {
			this.displayTag(item.textContent, backgroundColor, 'js-utensil-tag');
			this.getResultByTag(item.textContent, this.tagsUtensilsList);
		} else {
			item.classList.add('selected');
		}
		console.log(this.searchByTagArray);
	}

	getDatasClosingTag(recipes) {
		this.tagsIngredientsList = this.tagsIngredientsList.map(tag => tag.toLowerCase());
		this.tagsUtensilsList = this.tagsUtensilsList.map(tag => tag.toLowerCase());

		if(this.tagsIngredientsList.length > 0 && this.tagsAppliancesList.length > 0 && this.tagsUtensilsList.length > 0){
			recipes.filter(recipe => {
				if(this.tagsIngredientsList.every(r => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).map(e => e.replace(/\s+/g, '')).includes(r)) && this.tagsAppliancesList.includes(recipe.appliance.toLowerCase().replace(/\s+/g, '')) && this.tagsUtensilsList.every(r => recipe.ustensils.map(ustensil => ustensil.toLowerCase()).map(e => e.replace(/\s+/g, '')).includes(r))) {
					if(!this.searchByTagArray.includes(recipe)) {
						this.searchByTagArray.push(recipe);
					}
				}
			});
		} else if(this.tagsIngredientsList.length > 0 && this.tagsAppliancesList.length > 0 && this.tagsUtensilsList.length === 0){
			recipes.filter(recipe => {
				if(this.tagsIngredientsList.every(r => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).map(e => e.replace(/\s+/g, '')).includes(r)) && this.tagsAppliancesList.includes(recipe.appliance.toLowerCase().replace(/\s+/g, ''))) {
					if(!this.searchByTagArray.includes(recipe)) {
						this.searchByTagArray.push(recipe);
					}
				}
			});
		} else if(this.tagsIngredientsList.length > 0 && this.tagsUtensilsList.length > 0 && this.tagsAppliancesList.length === 0){
			recipes.filter(recipe => {
				if(this.tagsIngredientsList.every(r => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).map(e => e.replace(/\s+/g, '')).includes(r)) && this.tagsUtensilsList.map(tag => tag.toLowerCase()).every(r => recipe.ustensils.map(ustensil => ustensil.toLowerCase()).map(e => e.replace(/\s+/g, '')).includes(r))) {
					if(!this.searchByTagArray.includes(recipe)) {
						this.searchByTagArray.push(recipe);
					}
				}
			});
		} else if(this.tagsIngredientsList.length === 0 && this.tagsAppliancesList.length > 0 && this.tagsUtensilsList.length > 0){
			recipes.filter(recipe => {
				if(this.tagsAppliancesList.includes(recipe.appliance.toLowerCase().replace(/\s+/g, '')) && this.tagsUtensilsList.every(r => recipe.ustensils.map(ustensil => ustensil.toLowerCase()).map(e => e.replace(/\s+/g, '')).includes(r))) {
					if(!this.searchByTagArray.includes(recipe)) {
						this.searchByTagArray.push(recipe);
					}
				}
			});
		} else if(this.tagsIngredientsList.length > 0 && this.tagsAppliancesList.length === 0 && this.tagsUtensilsList.length === 0){
			
			recipes.filter(recipe => {
				if(this.tagsIngredientsList.every(ingredient => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase()).map(e => e.replace(/\s+/g, '')).includes(ingredient))) {
					if(!this.searchByTagArray.includes(recipe)) {
						this.searchByTagArray.push(recipe);
					}
				}
			});
		} else if(this.tagsIngredientsList.length === 0 && this.tagsAppliancesList.length > 0 && this.tagsUtensilsList.length === 0){
			recipes.filter(recipe => {
				if(this.tagsAppliancesList.includes(recipe.appliance.toLowerCase().replace(/\s+/g, ''))) {
					if(!this.searchByTagArray.includes(recipe)) {
						this.searchByTagArray.push(recipe);
					}
				}
			});
		} else if(this.tagsIngredientsList.length === 0 && this.tagsAppliancesList.length === 0 && this.tagsUtensilsList.length > 0){
			recipes.filter(recipe => {
				if(this.tagsUtensilsList.every(r => recipe.ustensils.map(ustensil => ustensil.toLowerCase()).map(e => e.replace(/\s+/g, '')).includes(r))) {
					if(!this.searchByTagArray.includes(recipe)) {
						this.searchByTagArray.push(recipe);
					}
				}
			});
		}
		console.log(this.searchByTagArray);
	}

	_closeTag(e) {
		let item = e.target;
		let tag = `${item.parentElement.textContent.toLowerCase().replace(/\s+/g, '')}`;
		this.searchByTagArray = [];
		this.tagsIngredientsList = this.tagsIngredientsList.map(e => e.replace(/\s+/g, ''));
		this.tagsAppliancesList = this.tagsAppliancesList.map(e => e.replace(/\s+/g, ''));
		this.tagsUtensilsList = this.tagsUtensilsList.map(e => e.replace(/\s+/g, ''));

		if(item.parentElement.classList.contains('js-ingredient-tag')){
			this.tagsIngredientsList = this.tagsIngredientsList.filter(e => e !== tag);
			item.parentElement.remove();

		} else if(item.parentElement.classList.contains('js-appliance-tag')) {
			this.tagsAppliancesList = this.tagsAppliancesList.filter(e => e !== tag);
			item.parentElement.remove();

		} else if(item.parentElement.classList.contains('js-utensil-tag')) {
			this.tagsUtensilsList = this.tagsUtensilsList.filter(e => e !== tag);
			item.parentElement.remove();
		}
		
		if (this.searchResultArray.length === 0){
			this.getDatasClosingTag(recipes);
			if(this.tagsIngredientsList.length === 0 && this.tagsAppliancesList.length === 0 && this.tagsUtensilsList.length === 0){
				this.searchByTagArray = recipes;
			}
			this.clearCardsAndDropdowns();
			this.recipeCard.displayAllRecipes(this.searchByTagArray);
			this.getListDatas(this.searchByTagArray);
			item.parentElement.remove();
			
		} else if (this.searchResultArray.length > 0){
			this.getDatasClosingTag(this.searchResultArray);
			if(this.tagsIngredientsList.length === 0 && this.tagsAppliancesList.length === 0 && this.tagsUtensilsList.length === 0){
				this.searchByTagArray = this.searchResultArray;
			}
			this.clearCardsAndDropdowns();
			this.recipeCard.displayAllRecipes(this.searchByTagArray);
			this.getListDatas(this.searchByTagArray);
			item.parentElement.remove();
			this.searchByTagArray = [];
		}
	}

	createListItem(data, wrapper) {
		const item = document.createElement('li');
		item.classList.add('search__dropdown-menu-link');
		// Add uppercase to first letter
		item.textContent = data.charAt(0).toUpperCase() + data.slice(1);
		wrapper.appendChild(item); 
		return item;
	}

	isValidItem(list, item) {
		if(!list.includes(item)){
			list.push(item);
		}
		list.sort();
	}

	getListDatas(recipes) {
		for(let listContainer of this.listContainers) {
			const listWrapper = listContainer.parentElement.lastChild.previousSibling;
			const button = listContainer.parentElement.parentElement.firstChild.nextSibling.dataset.filter;
			
			switch (button) {
			case 'ingredients':
				recipes.forEach(recipe => {
					recipe.ingredients.forEach(ingredient => {
						this.isValidItem(this.ingredientsList, ingredient.ingredient);
					});
				});
				for(let ingredient of this.ingredientsList){
					this.createListItem(ingredient, listWrapper);
				}
				this.ingredientsList = [];
				break;
			case 'appliances':
				recipes.forEach(recipe => {
					this.isValidItem(this.appliancesList, recipe.appliance);
				});
				for(let appliance of this.appliancesList){
					this.createListItem(appliance, listWrapper);
				}
				this.appliancesList = [];
				break;
			case 'utensils':
				recipes.forEach(recipe => {
					recipe.ustensils.forEach(ustensil => {
						this.isValidItem(this.utensilsList, ustensil);
					});
				});
				for(let utensil of this.utensilsList){
					this.createListItem(utensil, listWrapper);
				}
				this.utensilsList = [];
				break;
			}
			for(const element of this.listItems) {
				element.addEventListener('click', this.getItemClicked);
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
	}
}