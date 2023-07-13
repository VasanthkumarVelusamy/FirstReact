export function fetchPopularRepos(language) {
    const endpoint = window.encodeURI(
        `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if (!data.items) {
                throw new Error(data.message);
            }

            return data.items;
        });
}

function getErrorMessage(message, username) {
    if (message === "Not Found") {
        return `${username} not found`
    }
    return message
}

function fetchProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((profile) => {
            if (profile.message) {
                throw new Error(getErrorMessage(profile.message, username))
            }
            return profile
        })
}

function fetchRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        .then((res) => res.json())
        .then((repos) => {
            if (repos.message) {
                throw new Error(getErrorMessage(repos.message, username))
            }
            return repos
        })
}

function getStarCount(repos) {
    return repos.reduce((count, { stargazers_count }) => {
        return count + stargazers_count
    }, 0)
}

function getScore(followers, repos) {
    return followers * 3 + getStarCount(repos)
}

function getUserData(player) {
    return Promise.all([fetchProfile(player), fetchRepos(player)])
        .then(([profile, repos]) => ({
            profile: profile,
            score: getScore(profile.followers, repos)
        }))
}

function sortPlayers(players) {
    console.log("printing players in sort method", players)
    return players.sort((a, b) => b.score - a.score)
}

export function battle(players) {
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ]).then((sortPlayers))
}