/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Search } from './Search.js';

export class App {
	constructor() {
		localStorage.clear();
		this.search = new Search();
		console.log(recipes);
	}
}

const app = new App();