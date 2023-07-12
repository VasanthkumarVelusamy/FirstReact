import * as React from 'react';
import PropTypes from 'prop-types';
import { close } from '../utils/icons';
import Results from './Results';

function Instructions() {
    return (
        <section className='instructions-container'>
            <h2>Instructions</h2>
            <ol>
                <li>Enter 2 Github users</li>
                <li>Battle</li>
                <li>See the winners</li>
            </ol>
        </section>
    )
}

class PlayerInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.username)
    }

    handleChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    render() {
        return (
            <form className="card" onSubmit={this.handleSubmit}>
                <label htmlFor="username" className="player-label">
                    {this.props.label}
                </label>
                <div className="input-row">
                    <input
                        type="text"
                        id="username"
                        placeholder="github username"
                        autoComplete="off"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button
                        className="btn link"
                        type="submit"
                        disabled={!this.state.username}
                    >
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

function PlayerPreview({ username, onReset, label }) {
    return (
        <article className='card'>
            <h3 className='player-label'>{label}</h3>
            <div className="split">
                <div className='row gap-md'>
                    <img
                        width={32}
                        height={32}
                        src={`https://github.com/${username}.png?size=200`}
                        alt={`avatar for ${username}`}
                    />
                    <a href={`https://github.com/${username}`} className='link'>{username}</a>
                </div>
                <button className='btn secondary icon' onClick={onReset}>
                    {close}
                </button>
            </div>
        </article>
    )
}

export default class Battle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            player1: null,
            player2: null,
            battle: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleSubmit(id, player) {
        console.log(`setting value ${player}`)
        this.setState({
            [id]: player
        })
    }

    handleReset(id) {

        this.setState({
            [id]: null
        })
    }

    render() {
        const { player1, player2, battle } = this.state
        const isBattleButtonDisabled = !player1 || !player2

        if (battle == true) {
            return <Results player1={player1} player2={player2} />
        }

        return (
            <main className='stack main-stack animate-in'>
                <div className='split'>
                    <h1>Players</h1>
                    <button onClick={() => this.setState({ battle: true })} className={`btn primary ${isBattleButtonDisabled ? "disabled" : ""}`}>Battle</button>
                </div>
                <section className='grid'>
                    {player1 == null ? <PlayerInput label='Player1' onSubmit={(player) => { this.handleSubmit("player1", player) }
                    } /> :
                        <PlayerPreview label={"Player1"} onReset={() => this.handleReset("player1")} username={this.state.player1} />
                    }

                    {player2 == null ? <PlayerInput label='Player2' onSubmit={(player) => { this.handleSubmit("player2", player) }
                    } /> :
                        <PlayerPreview label={"Player2"} onReset={() => this.handleReset("player2")} username={this.state.player2} />
                    }
                </section>
                <Instructions />
            </main>
        )
    }
}