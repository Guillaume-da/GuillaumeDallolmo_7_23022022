/* eslint-disable no-undef */

import { Tag } from './Tag.js';

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

		this.openDropdown = (e) => this._openDropdown(e);
		this.closeDropdown = (e) => this._closeDropdown(e);
		this.updateDropdownListWhenInput = (e) => this._updateDropdownListWhenInput(e);

		this.bindEvent();
	}

	// Create list item
	createListItem(data, wrapper) {
		const item = document.createElement('li');
		item.classList.add('search__dropdown-menu-link');

		// Add uppercase to first letter
		item.textContent = data.charAt(0).toUpperCase() + data.slice(1);
		wrapper.appendChild(item); 
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
		if(e.target.dataset.filter === 'ingredients') {
			recipes.forEach(recipe => {
				recipe.ingredients.forEach(ingredient => {
					const listContainer = e.target.parentElement.lastChild.previousElementSibling.lastChild.previousElementSibling;
					if(!this.ingredientsList.includes(ingredient.ingredient)){
						this.createListItem(ingredient.ingredient, listContainer);
						this.ingredientsList.push(ingredient.ingredient);
					}
				}); 
			});
		} else if (e.target.dataset.filter === 'appliances') {
			recipes.forEach(recipe => {
				const listContainer = e.target.parentElement.lastChild.previousElementSibling.lastChild.previousElementSibling;
				if(!this.appliancesList.includes(recipe.appliance)){
					this.createListItem(recipe.appliance, listContainer);
					this.appliancesList.push(recipe.appliance);
				}
			});
		} else if (e.target.dataset.filter === 'utensils') {
			recipes.forEach(recipe => {
				const listContainer = e.target.parentElement.lastChild.previousElementSibling.lastChild.previousElementSibling;
				recipe.ustensils.forEach(ustensil => {
					if(!this.utensilsList.includes(ustensil)){
						this.createListItem(ustensil, listContainer);
						this.utensilsList.push(ustensil);
					}
				});
			});
		}

		// Allow to other buttons to be visible when dropdown opened
		if(screen.width >= 1380) {
			dropdownList.parentElement.classList.add('large-size');
		}
		new Tag();
	}

	_closeDropdown(e) {
		let dropdownList = e.target.parentElement.nextSibling.nextSibling;
		if(dropdownList.parentElement.classList.contains('show')){
			dropdownList.parentElement.classList.remove('show');
		}
		dropdownList.parentElement.classList.add('hide');
		if(screen.width >= 1380) {
			dropdownList.parentElement.parentElement.classList.remove('large-size');
		}
	}

	clearList(container) {
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
	}

	_updateDropdownListWhenInput(e) {
		this.updatedList = [];
		let listItems = e.target.parentElement.nextSibling.nextSibling.getElementsByClassName('search__dropdown-menu-link');
		for(let item of listItems){
			if(!this.list.includes(item.textContent.toLowerCase())){
				this.list.push(item.textContent.toLowerCase());
			}
		}

		if (typeof(e) !== 'undefined') {
			this.clearList(e.target.parentElement.parentElement.lastChild.previousElementSibling);
		}
		
		for(let item of this.list){
			if(!this.updatedList.includes(item.toLowerCase())) {
				if(item.toLowerCase().includes(e.target.value)){
					this.updatedList.push(item.toLowerCase());
					const link = document.createElement('li');
					link.classList.add('search__dropdown-menu-link');
					link.textContent = item.toLowerCase();
					e.target.parentElement.nextSibling.nextSibling.appendChild(link); 
				}
			}
		}
		
		new Tag();
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