/* eslint-disable no-undef */
export class Dropdown {
	constructor() {
		this.ingredientsList = [];
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

		this.bindEvent();
		this.getAllIngredients();
		this.getAllAppliances();
		this.getAllUtensils();
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

	// Open / close dropdowns
	bindEvent(){
		this.openDropdown(this.ingredientsButton, this.ingredientsListContainer);   
		this.closeDropdown(this.closeIngredients, this.ingredientsListContainer);
		this.openDropdown(this.appliancesButton, this.appliancesListContainer);
		this.closeDropdown(this.closeAppliances, this.appliancesListContainer);
		this.openDropdown(this.utensilsButton, this.utensilsListContainer);
		this.closeDropdown(this.closeUtensils, this.utensilsListContainer);
	}

	getAllIngredients(){
		recipes.forEach(recipe => {
			recipe.ingredients.forEach(ingredient => {
				if(!this.ingredientsList.includes(ingredient.ingredient)){
					this.createListItem(ingredient.ingredient, this.ingredientItem, this.ingredientsDropdownWrapper);
					this.ingredientsList.push(ingredient.ingredient);
				}
			}); 
		});
	}

	getAllAppliances(){
		recipes.forEach(recipe => {
			if(!this.appliancesList.includes(recipe.appliance)){
				this.createListItem(recipe.appliance, this.applianceItem, this.dropdownApplianceWrapper);
				this.appliancesList.push(recipe.appliance);
			}
		});
	}

	getAllUtensils(){
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