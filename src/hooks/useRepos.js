import {useMemo} from "react";

export const useSortedRepos = (repos, sort) => {
    const sortedRepos = useMemo(() => {
        if (sort) {
            return [...repos.sort((a, b) => a[sort]?.localeCompare(b[sort]))];
        }
        return repos;
    }, [sort, repos]);

    return sortedRepos;
};

export const useRepos = (repos, sort, query) => {
    const sortedRepos = useSortedRepos(repos, sort);

    const sortedAndSearchedRepos = useMemo(() => {
        return sortedRepos.filter(repo => repo.name.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedRepos]);

    return sortedAndSearchedRepos;
}
