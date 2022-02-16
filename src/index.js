import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

/* 
class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
} */

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true, //the first state is X turn
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice(); //copy the origin squares to make it as a immuatable object
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext, // !first state 
        });
    }
    renderSquare(i) {
        return (
        <Square 
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)} //passing handleClick to onClick event of Square
        />
        );
    }
    render() {

        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        }
        else {
           status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
       

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* Status */}</div>
                    <div>{/* Todo */}</div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <Game />,
    document.getElementById('root')
)


function calculateWinner(squares) {
    const winPossibilites = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for(let i = 0; i < winPossibilites.length; i++) {
        const [x1, x2, x3] = winPossibilites[i];
        if(squares[x1] && squares[x1] === squares[x2] && squares[x1] === squares[x3]) {
            return squares[x1]
        }
    }
    return null;
}