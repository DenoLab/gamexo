import './App.css';
import React from 'react';

function App() {

    function Square(props) {
        //Square render ra nut Button co ham onClick, khi con button duoc nhan, onClick của button goi den ham onClick cua Square
            return (
                <button className="square" onClick={props.onCick}> {/* khai bao 1 ham onCick o day */}
                    {props.value} {/* khai báo onCick và value là 2 props được truyền vào từ component cha */}
                </button>
            );
    }

    class Board extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                squares: Array(9).fill(null),
                xIsNext: true,
            };
        }

        handleClick(i) {
            const squares = this.state.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = this.state.xIsNext === true ? 'X' : 'O';
            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext,
            });
        }

        renderSquare(i) {
            return <Square value={this.state.squares[i]} onCick={() => this.handleClick(i)}/>; /**truyen ham props.onCick bang 1 ham tu component Board cha  */
        } //Board render ra Square co ham onClick, 
          //khi onClick cua Square duoc goi den -> thuc hien goi ham handleClick cua Board
        
        render() {
            const winner = calculateWinner(this.state.squares);
            let status;
            if (winner) {
                status = 'Winner: ' + winner;
            } else {
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
            )
        }
    }

    class Game extends React.Component {
        render() {
            return (
                <div>
                    <div>
                        <Board />
                    </div>
                    <div>
                        <div>{/**status */}</div>
                        <ol>{/**todo */}</ol>
                    </div>
                </div>
            )
        }
    }


    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }

    return (
        <div className="App">
            <Game />
        </div>
    );
}

export default App;
