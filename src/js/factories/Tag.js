/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
export class Tag {
	constructor(){
		this.tagsContainer = document.getElementsByClassName('tags')[0];
		this.items = document.getElementsByClassName('search__dropdown-menu-link');
		this.itemsArray = Array.prototype.slice.call( this.items, 0 );
        this.tagsIcons = document.getElementsByClassName('tags__icon');
        this.tagsIconsArray = Array.prototype.slice.call( this.tagsIcons, 0 );
		
        this.getItemClicked();
	}

	getItemClicked(){
        for(const element of this.itemsArray) {
            element.addEventListener('click', ()=> {
                if (element.classList.contains('js-ingredient')){
                    this.displayTag(element.textContent, 'tags__item--blue');
                } else if (element.classList.contains('js-appliance')){
                    this.displayTag(element.textContent, 'tags__item--green');
                } else if (element.classList.contains('js-utensil')) {
                    this.displayTag(element.textContent, 'tags__item--red');
                } 
			});
        }
	}

	displayTag(tag, colorClass){
		const span = document.createElement('span');
		span.classList.add('tags__item');
        span.classList.add(colorClass);
		span.innerHTML = `${tag} <i class="far fa-times-circle tags__icon"></i>`;
		this.tagsContainer.appendChild(span);
        this.closeItem();
	}   

    closeItem() {
        let array = Array.prototype.slice.call( this.tagsIcons, 0 );
        array.forEach(element => {
            element.addEventListener('click', ()=> {
                element.parentNode.style.display = 'none';
            });
        });
    }
}