import * as React from 'react'

export default class Results extends React.Component {
    render() {
        return (
            <div>
                Results
                {JSON.stringify(this.props, null, 2)}
            </div>
        )
    }
}