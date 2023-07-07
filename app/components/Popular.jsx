import * as React from 'react'
import PropTypes from 'prop-types'

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
            selectedLanguage: "All"
        }
        this.updateLanguage = this.updateLanguage.bind(this)
    }

    updateLanguage(language) {
        this.setState({
            selectedLanguage: language
        })
    }
    render() {

        return (
            <main>
                <LanguagesNav selected={this.state.selectedLanguage} onLanguageChange={this.updateLanguage} />
                {JSON.stringify(this.state, null, 2)}
            </main>
        )
    }
}