/* eslint-disable no-undef */

import { Tag } from './Tag.js';
import { Search } from '../Search.js';

export class Dropdown {
	// eslint-disable-next-line no-unused-vars
	constructor(recipes) {
		this.ingredientsList = [];
		this.appliancesList = [];
		this.utensilsList = [];
		this.list = [];
		this.updatedList = [];
		this.dropdownButtons = document.getElementsByClassName('js-openDropdown');
		this.closeButtons = document.getElementsByClassName('js-close');
		this.inputs = document.getElementsByClassName('js-input');
		this.dropdownsLists = document.getElementsByClassName('js-showDropdownList');
		this.listContainers = document.getElementsByClassName('js-wrapper');

		this.getListDatas(recipes);

		this.openDropdown = (e) => this._openDropdown(e);
		this.closeDropdown = (e) => this._closeDropdown(e);
		this.updateDropdownListWhenInput = (e) => this._updateDropdownListWhenInput(e);

		this.bindEvent();

		new Tag();
	}

	// Create list item
	createListItem(data, wrapper) {
		const item = document.createElement('li');
		item.classList.add('search__dropdown-menu-link');

		// Add uppercase to first letter
		item.textContent = data.charAt(0).toUpperCase() + data.slice(1);
		wrapper.appendChild(item); 
	}

	isValidItem(list, listWrapper, item) {
		if(!list.includes(item)){
			list.push(item);
			this.createListItem(item, listWrapper);
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

	clearList(container) {
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
	}

	_updateDropdownListWhenInput(e) {
		/* let results =  this.ingredientsList.filter((ingredient) => {
			return ingredient.includes(e.target.value);
		});
		console.log(results);
		if (typeof(e) !== 'undefined') {
			this.clearList(e.target.parentElement.parentElement.lastChild.previousElementSibling);
		}
		const listContainer = document.getElementsByClassName('js-wrapper')[0];
		for(let result of results) {
			const item = document.createElement('li');
			item.classList.add('search__dropdown-menu-link');

			// Add uppercase to first letter
			item.textContent = result;
			listContainer.appendChild(item);
		} */

		
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

		/* if(this.updatedList.length === 2) {
			let links = e.target.parentElement.nextSibling.nextElementSibling.getElementsByClassName('search__dropdown-menu-link');
			e.target.parentElement.parentElement.classList.add('medium-size');
			for(let link of links){
				link.classList.add('half-size');	
			}
			let button = e.target.parentElement.parentElement.parentElement;
			if(button.classList.contains('large-size')){
				button.classList.remove('large-size');
			}
			button.classList.add('list-medium-size');

		} else if(this.updatedList.length > 2) {
			let links = e.target.parentElement.nextSibling.nextElementSibling.getElementsByClassName('search__dropdown-menu-link');
			for(let link of links){
				if(link.classList.contains('half-size'))
					link.classList.remove('half-size');	
			}
			let button = e.target.parentElement.parentElement.parentElement;
			if(button.classList.contains('list-medium-size')){
				button.classList.remove('list-medium-size');
				button.classList.add('list-large-size');
				// e.target.parentElement.parentElement.classList.remove('medium-size');
				// e.target.parentElement.parentElement.classList.add('list-large-size');
			}
		} */
		new Tag();
		new Search().getResult(e);
	}

	bindEvent(){
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