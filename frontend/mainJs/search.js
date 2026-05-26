import * as getSearch from '../CRUD/getSearch.js'
import * as render from '../mainJs/render.js'

export async function search(src) {
    const data = await getSearch.getSearch(src)
    render.rendering(data)
} 