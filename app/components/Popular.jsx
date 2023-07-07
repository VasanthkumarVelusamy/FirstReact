import * as React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

function LanguagesNav({ selected, onLanguageChange }) {
    const languages = ["All", "JavaScript", "Ruby", "HTML", "CSS", "Python"]
    // Not moving the selectedLanguage state property here since it is appropriate to have it in the parent component since it needs that for fetching repos as per the selectedLanguage
    return (
        <select
            onChange={(e) => onLanguageChange(e.target.value)}
            selected={selected}
        >
            {
                languages.map((language) =>
                    <option key={language} value={language}>{language}</option>
                )
            }
        </select>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onLanguageChange: PropTypes.func.isRequired
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedLanguage: "All",
            repos: null,
            error: null
        }
        this.updateLanguage = this.updateLanguage.bind(this)
    }
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }

    updateLanguage(language) {
        this.setState({
            selectedLanguage: language
        })
        fetchPopularRepos(language)
            .then((repos) => this.setState({
                repos: repos,
                error: null
            })).catch((error) => this.setState({
                repos: null,
                error: error
            }));
    }
    render() {
        const { selectedLanguage, repos, error } = this.state
        return (
            <main className="stack main-stack animate-in">
                <div className="split">
                    <h1>Popular</h1>
                    <LanguagesNav selected={selectedLanguage} onLanguageChange={this.updateLanguage} />
                </div>
                {error && <p className="text-center error">{"error"}</p>}
                {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
            </main>
        )
    }
}