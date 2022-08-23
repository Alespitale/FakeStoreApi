const url = 'https://fakestoreapi.com/carts'

export const carts = {
    getAll: async function () {
        const response = await fetch(url)
        return await response.json()
    },
    getById: async function (id) {
        const response = await fetch(url + '/' + id)
        return await response.json()
    }
}