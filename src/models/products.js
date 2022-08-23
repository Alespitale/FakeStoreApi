const url = 'https://fakestoreapi.com/products'

export const products = {
    getAll: async function () {
        const response = await fetch(url)
        return await response.json()
    },
    getById: async function (id) {
        const response = await fetch(url + '/' + id)
        return await response.json()
    },
    getCategories: async function () {
        const response = await fetch(url + '/categories')
        return await response.json()
    },
    getByCategory: async function (category) {
        const response = await fetch(url + '/category/' + category)
        return await response.json()
    },
    getInCategories: async function () {
        const categories = await this.getCategories()
        const products = await Promise.all(
            categories.map(async (category) => {
                return { category, products: await this.getByCategory(category) }
            })
        )
        return products
    }
}