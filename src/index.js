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
    renderSquare(i) {
        return (
        <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)} //passing handleClick to onClick event of Square
        />
        );
    }
    render() {
        return (
            <div>
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
    constructor(props) {
        super(props);
        this.state = {
            history: [
            {
               squares: Array(9).fill(null) //each array has a squares prop
            }
            ],
            stepNumber: 0,
            xIsNext: true, //the first state is X turn
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice(); //copy the origin squares to make it as a immuatable object
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([
                {
                    squares: squares, //we can use push but concat doesn't mutate the original array.
                }
            ]),
            stepNumber: history.length, //always display last array in history
            xIsNext: !this.state.xIsNext, // !first state 
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step, //display current array in history
            xIsNext: (step % 2) === 0,
        })
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const draw = isDraw(current.squares, this.state.stepNumber);
        console.log(draw);

        const moves = history.map((step, move) => { //map((element, index) => { /* ... */ })
            console.log(step);
            console.log(move);
            const desc = move ? "Go to move #" + move : "Go to the start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc} </button>
                </li>
            )
        });
        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        }
        else if(draw) {
            status = 'Draw';
        }
        else {
           status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
       
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>{moves}</div>
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

function isDraw(squares, stepNumber){
    return (squares.filter(e => e !== null).length && stepNumber === 9) ? true : false; //all element is filled?
}