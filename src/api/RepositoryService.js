import axios from "axios";

export default class RepositoryService {
    static async getAll(page = 1, per_page, query, sort) {
        const response = await axios.get("https://api.github.com/search/repositories", {
            params: {
                q: query,
                per_page,
                page,
                sort
            }
        });
        console.log("response", response)
        return response;
    }

    static async getById(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return response;
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response;
    }
}
