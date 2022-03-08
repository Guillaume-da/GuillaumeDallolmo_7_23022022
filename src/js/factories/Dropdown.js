/* eslint-disable no-undef */

import { Tag } from './Tag.js';

export class Dropdown {
	constructor(recipes) {
		this.ingredientsList = [];
		this.ingredientsListUpdated = [];
		this.appliancesListUpdated = [];
		this.utensilsListUpdated = [];
		this.appliancesList = [];
		this.utensilsList = [];
		this.ingredientsDropdownWrapper = document.getElementsByClassName('js-wrapper')[0];
		this.dropdownApplianceWrapper = document.getElementsByClassName('js-wrapper')[1];
		this.dropdownUtensilWrapper = document.getElementsByClassName('js-wrapper')[2];
		this.ingredientsButton = document.getElementById('ingredients');
		this.ingredientsListContainer = document.getElementById('ingredients-list');
		this.appliancesButton = document.getElementById('appliances');
		this.appliancesListContainer = document.getElementById('appliances-list');
		this.utensilsButton = document.getElementById('utensils');
		this.utensilsListContainer = document.getElementById('utensils-list');
		this.closeIngredients = document.getElementsByClassName('js-close')[0];
		this.closeAppliances = document.getElementsByClassName('js-close')[1];
		this.closeUtensils = document.getElementsByClassName('js-close')[2];
		this.ingredientItem = 'js-ingredient';
		this.applianceItem = 'js-appliance';
		this.utensilItem = 'js-utensil';
		this.ingredientsInput = document.getElementsByClassName('search__dropdown-menu-input')[0];
		this.appliancesInput = document.getElementsByClassName('search__dropdown-menu-input')[1];
		this.utensilsInput = document.getElementsByClassName('search__dropdown-menu-input')[2];
		this.ingredientsContainer = document.getElementsByClassName('search__dropdown-menu-list')[0];
		this.appliancesContainer = document.getElementsByClassName('search__dropdown-menu-list')[1];
		this.utensilsContainer = document.getElementsByClassName('search__dropdown-menu-list')[2];

		this.bindEvent();
		this.getAllIngredients(recipes);
		this.getAllAppliances(recipes);
		this.getAllUtensils(recipes);
	}

	closeOtherDropdowns(firstContainer, firstButton, secondContainer, secondButton) {
		firstContainer.style.display = 'none';
		firstButton.style.width = '170px';
		secondContainer.style.display = 'none';
		secondButton.style.width = '170px';
	}

	openDropdown(button, container) {
		button.addEventListener('click', ()=> {
			container.style.display = 'block';

			if(screen.width >= 1380) {
				// Close other dropdowns when 1 opened
				switch (button) {
				case this.ingredientsButton:
					this.closeOtherDropdowns(this.appliancesListContainer, this.appliancesButton, this.utensilsListContainer, this.utensilsButton);
					break;
				case this.appliancesButton:
					this.closeOtherDropdowns(this.ingredientsListContainer, this.ingredientsButton, this.utensilsListContainer, this.utensilsButton);
					break;
				case this.utensilsButton:
					this.closeOtherDropdowns(this.ingredientsListContainer, this.ingredientsButton, this.appliancesListContainer, this.appliancesButton);
					break;
				}
			}   
			// Allow to other buttons to be visible when dropdown opened
			if(screen.width >= 1380) {
				button.style.width = '715px';
			}
            
		});
	}

	closeDropdown(button, container) {
		button.addEventListener('click', ()=> {
			container.style.display = 'none';
			if(screen.width >= 1380) {

				// Allow to back to initals width
				switch (container) {
				case this.ingredientsListContainer:
					this.ingredientsButton.style.width = '170px';
					break;
				case this.appliancesListContainer:
					this.appliancesButton.style.width = '170px';
					break;
				case this.utensilsListContainer:
					this.utensilsButton.style.width = '170px';
					break;
				}
			}
		});
	}

	clearList(container) {
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
	}

	updateDropdownListWhenInput(input, updatedList, container, list) {
		input.addEventListener('input', (e)=> {
			updatedList = [];
			this.clearList(container);
			list.forEach(item => {
				if(!updatedList.includes(item)) {
					if(item.toLowerCase().includes(e.target.value.toLowerCase())) {
						switch (input) {
						case this.ingredientsInput:
							this.createListItem(item, this.ingredientItem, this.ingredientsDropdownWrapper);
							break;
						case this.appliancesInput:
							this.createListItem(item, this.applianceItem, this.dropdownApplianceWrapper);
							break;
						case this.utensilsInput:
							this.createListItem(item, this.utensilItem, this.dropdownUtensilWrapper);
							break;
						}
						updatedList.push(item);
					}
				}
			});
			new Tag();
		});
	}

	// Open / close dropdowns
	bindEvent(){
		this.openDropdown(this.ingredientsButton, this.ingredientsListContainer);   
		this.closeDropdown(this.closeIngredients, this.ingredientsListContainer);
		this.openDropdown(this.appliancesButton, this.appliancesListContainer);
		this.closeDropdown(this.closeAppliances, this.appliancesListContainer);
		this.openDropdown(this.utensilsButton, this.utensilsListContainer);
		this.closeDropdown(this.closeUtensils, this.utensilsListContainer);
		this.updateDropdownListWhenInput(this.ingredientsInput, this.ingredientsListUpdated, this.ingredientsContainer, this.ingredientsList);
		this.updateDropdownListWhenInput(this.appliancesInput, this.appliancesListUpdated, this.appliancesContainer, this.appliancesList);
		this.updateDropdownListWhenInput(this.utensilsInput, this.utensilsListUpdated, this.utensilsContainer, this.utensilsList);
		/* this.ingredientsInput.addEventListener('input', (e)=> {
			this.ingredientsListUpdated = [];
			this.clearList(this.ingredientsContainer);
			this.ingredientsList.forEach(ingredient => {
				if(!this.ingredientsListUpdated.includes(ingredient)) {
					if(ingredient.toLowerCase().includes(e.target.value.toLowerCase())) {
						this.createListItem(ingredient, this.ingredientItem, this.ingredientsDropdownWrapper);
						this.ingredientsListUpdated.push(ingredient);
					}
				}
			});
		});
		this.appliancesInput.addEventListener('input', (e)=> {
			this.appliancesListUpdated = [];
			this.clearList(this.appliancesContainer);
			this.appliancesList.forEach(appliance => {
				if(!this.appliancesListUpdated.includes(appliance)) {
					if(appliance.toLowerCase().includes(e.target.value.toLowerCase())) {
						this.createListItem(appliance, this.applianceItem, this.dropdownApplianceWrapper);
						this.appliancesListUpdated.push(appliance);
					}
				}
			});
		});
		this.utensilsInput.addEventListener('input', (e)=> {
			this.utensilsListUpdated = [];
			this.clearList(this.utensilsContainer);
			this.utensilsList.forEach(utensil => {
				if(!this.utensilsListUpdated.includes(utensil)) {
					if(utensil.toLowerCase().includes(e.target.value.toLowerCase())) {
						this.createListItem(utensil, this.utensilItem, this.dropdownUtensilWrapper);
						this.utensilsListUpdated.push(utensil);
					}
				}
			});
		}); */
	}

	getAllIngredients(recipes){
		recipes.forEach(recipe => {
			recipe.ingredients.forEach(ingredient => {
				if(!this.ingredientsList.includes(ingredient.ingredient)){
					this.createListItem(ingredient.ingredient, this.ingredientItem, this.ingredientsDropdownWrapper);
					this.ingredientsList.push(ingredient.ingredient);
				}
			}); 
		});
	}

	getAllAppliances(recipes){
		recipes.forEach(recipe => {
			if(!this.appliancesList.includes(recipe.appliance)){
				this.createListItem(recipe.appliance, this.applianceItem, this.dropdownApplianceWrapper);
				this.appliancesList.push(recipe.appliance);
			}
		});
	}

	getAllUtensils(recipes){
		recipes.forEach(recipe => {
			recipe.ustensils.forEach(ustensil => {
				if(!this.utensilsList.includes(ustensil)){
					this.createListItem(ustensil, this.utensilItem, this.dropdownUtensilWrapper);
					this.utensilsList.push(ustensil);
				}
			});
		});
	}

	// Create list item
	createListItem(data, typeClass, wrapper) {
		const item = document.createElement('li');
		item.classList.add('search__dropdown-menu-link');
		item.classList.add(typeClass);
		// Add uppercase to first letter
		item.textContent = data.charAt(0).toUpperCase() + data.slice(1);
		wrapper.appendChild(item); 
	}
}