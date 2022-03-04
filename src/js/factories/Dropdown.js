export class Dropdown {
    constructor() {
        this.ingredientsList = [];
        this.appliancesList = [];
        this.utensilsList = [];
        this.ingredientsDropdownWrapper = document.getElementsByClassName('js-wrapper')[0];
        this.dropdownApplianceWrapper = document.getElementsByClassName('js-wrapper')[1];
        this.dropdownUtensilWrapper = document.getElementsByClassName('js-wrapper')[2];
        this.ingredientsButton = document.getElementById("ingredients");
        this.ingredientsListContainer = document.getElementById("ingredients-list");
        this.appliancesButton = document.getElementById("appliances");
        this.appliancesListContainer = document.getElementById("appliances-list");
        this.utensilsButton = document.getElementById("utensils");
        this.utensilsListContainer = document.getElementById("utensils-list");
        this.closeIngredients = document.getElementsByClassName('js-close')[0];
        this.closeAppliances = document.getElementsByClassName('js-close')[1];
        this.closeUtensils = document.getElementsByClassName('js-close')[2];

        this.bindEvent();
        this.getAllIngredients();
        this.getAllAppliances();
        this.getAllUtensils();
    }

    openDropdown(button, container) {
        button.addEventListener('click', ()=> {
            container.style.display = "block";
            if(screen.width >= 1380) {
                button.style.width = "715px";
            }
            
        })
    }

    closeDropdown(button, container) {
        button.addEventListener('click', ()=> {
            container.style.display = "none";
            if(screen.width >= 1380) {
                if (container == this.ingredientsListContainer) {
                    this.ingredientsButton.style.width = "170px";
                } else if (container == this.appliancesListContainer){
                    this.appliancesButton.style.width = "170px";
                } else if (container == this.utensilsListContainer){
                    this.utensilsButton.style.width = "170px";
                }
            }
        })
    }

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
                    this.createListItem(ingredient.ingredient, this.ingredientsDropdownWrapper);
                    this.ingredientsList.push(ingredient.ingredient);
                }
            }) 
        })
    }

    getAllAppliances(){
        recipes.forEach(recipe => {
            if(!this.appliancesList.includes(recipe.appliance)){
                this.createListItem(recipe.appliance, this.dropdownApplianceWrapper);
                    this.appliancesList.push(recipe.appliance);
            }
        })
    }

    getAllUtensils(){
        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
            if(!this.utensilsList.includes(ustensil)){
                this.createListItem(ustensil, this.dropdownUtensilWrapper);
                this.utensilsList.push(ustensil);
            }
        })
    })
    }

    createListItem(data, wrapper) {
        const item = document.createElement('li');
        item.classList.add('search__dropdown-menu-link');
        item.textContent = data.charAt(0).toUpperCase() + data.slice(1);;
        wrapper.appendChild(item); 
    }
}