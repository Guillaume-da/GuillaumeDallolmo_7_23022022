/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { Search } from '../Search.js';

export class Tag {
	constructor(){
		this.tagsContainer = document.getElementsByClassName('tags')[0];
		this.items = document.getElementsByClassName('search__dropdown-menu-link');
		this.tagsIcons = document.getElementsByClassName('tags__icon');
		this.activetagsItems = document.getElementsByClassName('tags__item');
		this.tagsClickedArray = [];

		this.getItemClicked = (e) => this._getItemClicked(e);
		this.closeTag = (e) => this._closeTag(e);
	}

	displayTag(tag, color){
		const span = document.createElement('span');
		span.classList.add('tags__item');
		span.style.backgroundColor = color;
		span.innerHTML = `${tag} <i class="far fa-times-circle tags__icon"></i>`;
		this.tagsContainer.appendChild(span);

		let tagSearch = new Search();
		tagSearch.getResultByTag(tag);
		
		for(let item of this.activetagsItems) {
			this.tagsClickedArray.push(item.textContent);
		}

		for(let item of this.tagsClickedArray) {
			tagSearch.getResultByTag(item);
		}
	} 

	_getItemClicked(e) {
		let item = e.target;
		let backgroundColor = window.getComputedStyle(item.parentElement.parentElement).backgroundColor;
		this.displayTag(item.textContent, backgroundColor);
	}

	_closeTag(e) {
		let item = e.target;
		console.log(item);
		// item.parentElement.classList.add('hide');
		const index = this.tagsClickedArray.indexOf(e.target.textContent);
		console.log('index', index);
		if (index > -1) {
			this.tagsClickedArray.splice(index, 1); // 2nd parameter means remove one item only
		}
		console.log(this.tagsClickedArray);
		/* for(let item of this.tagsClickedArray) {
			if(item === e.target.textContent){
				const index = this.tagsClickedArray.indexOf(item);
				if (index > -1) {
					this.tagsClickedArray.splice(index, 1); // 2nd parameter means remove one item only
				}
			}
			let tagSearch = new Search();
			tagSearch.getResultByTag(item);
		} */
	}

	bindEvent(){
		for(const element of this.items) {
			element.addEventListener('click', this.getItemClicked);
		}
		for(const icon of this.tagsIcons) {
			icon.addEventListener('click', this.closeTag);
		}
		console.log('bind tag');
	} 

	unbindEvent(){
		for(const element of this.items) {
			element.removeEventListener('click', this.getItemClicked);
		}
		for(const icon of this.tagsIcons) {
			icon.removeEventListener('click', this.closeTag);
		}
		console.log('unbind tag');
	} 
}