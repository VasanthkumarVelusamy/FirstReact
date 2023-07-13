import * as React from 'react'
import { battle } from '../utils/api'

function Card({ profile }) {
    const {
        login,
        avatar_url,
        html_url,
        followers,
        following,
        public_repos,
        location,
        company,
    } = profile;

    return (
        <div className="card bg-light">
            <header className="split">
                <div>
                    <h4>
                        <a href={html_url}>{login}</a>
                    </h4>
                    <p>{location || "unknown"}</p>
                </div>
                <img
                    className="avatar large"
                    src={avatar_url}
                    alt={`Avatar for ${login}`}
                />
            </header>
            <ul className="stack">
                <li className="split">
                    <span>Name:</span> <span>{login || "n/a"}</span>
                </li>
                <li className="split">
                    <span>Company:</span> <span>{company || "n/a"}</span>
                </li>
                <li className="split">
                    <span>Followers:</span> <span>{followers}</span>
                </li>
                <li className="split">
                    <span>Following:</span> <span>{following}</span>
                </li>
                <li className="split">
                    <span>Repositories:</span> <span>{public_repos}</span>
                </li>
            </ul>
        </div>
    );
}

export default class Results extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount() {
        battle([this.props.player1, this.props.player2]).then((players) => {
            console.log("data", players)
            this.setState({
                winner: players[0],
                loser: players[1],
                error: null,
                loading: false
            })
        }).catch(({ error }) => {
            this.setState({
                error: error,
                loading: false
            })
        })
    }

    render() {
        const { winner, loser, error, loading } = this.state
        if (loading) {
            return <i>LOADING</i>
        }
        if (error) {
            return <p className='text-center error'>{error}</p>
        }
        return (
            <main className='animate-in stack main-stack'>
                <div className='split'>
                    <h1>Results</h1>
                </div>
                <section className='grid'>
                    <article className='results-container'>
                        <Card profile={winner.profile} />
                        <p className='results'>
                            <span>
                                {winner.score === loser.score ? "Tie" : "Winner"}{" "}{winner.score.toLocaleString()}
                            </span>
                            {winner.score != loser.score && (
                                <img
                                    width={80}
                                    src="https://ui.dev/images/certificate.svg"
                                    alt="Certificate"
                                />
                            )}
                        </p>
                    </article>
                    <arcticle className="results-container">
                        <Card profile={loser.profile} />
                        <p className='results'>
                            <span>
                                {winner.score === loser.score ? "Tie" : "Loser"}
                                {loser.score.toLocaleString()}
                            </span>
                        </p>
                    </arcticle>
                </section>
            </main>
        )
    }
}