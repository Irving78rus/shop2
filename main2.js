const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; //массив товаров из jSON документов
        this.allProducts = []; //массив объектов класса товар
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                this.render()
                this.addGoods()
            });

    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })

    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }

    addGoods() {
        document.querySelector(".buy-btn").addEventListener('click', (event) => {
            let targetId = event.target.id
            let foundProduct = this.goods.find(func => func.id == targetId)
            console.log(foundProduct)
        })
    }

}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;

    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button id=${this.id} class="buy-btn">Купить</button>
                </div>
            </div>`
    }





}

let list = new ProductsList();