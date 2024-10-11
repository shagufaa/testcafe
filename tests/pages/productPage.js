// pages/productPage.js
import { Selector } from 'testcafe';

class ProductPage {
    constructor() {
        this.productContainer = Selector('.productinfo');
    }

    async extractProductsFromWebsite(t) {
        const productCount = await this.productContainer.count;
        const websiteProducts = [];

        for (let i = 0; i < productCount; i++) {
            const productName = await this.productContainer.nth(i).find('p').innerText;
            const productPrice = await this.productContainer.nth(i).find('h2').innerText;

            // Parse the price to extract the numeric value
            const price = parseFloat(productPrice.replace('Rs.', ''));

            // Store the product name and price in an array
            websiteProducts.push({ productName, price });
        }

        return websiteProducts;
    }
}

export default new ProductPage(); // Export the instance
