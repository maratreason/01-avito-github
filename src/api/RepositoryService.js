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
        return response;
    }

    static async getByRepoName(userName, repoName) {
        const response = await axios.get(`https://api.github.com/repos/${userName}/${repoName}`);
        return response;
    }

    static async getRepoUser(userName) {
        const response = await axios.get(`https://api.github.com/users/${userName}`);
        return response;
    }

    static async getRepoLanguages(langUrl) {
        const response = await axios.get(langUrl);
        return response;
    }

    static async getRepoContributors(contributorsUrl, per_page = 10) {
        const response = await axios.get(contributorsUrl, {
            params: {
                per_page
            }
        });
        return response;
    }
}
