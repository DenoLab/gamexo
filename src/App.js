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


        renderSquare(i) {
            return <Square value={this.props.squares[i]} onCick={() => this.props.onClick(i)}/>; /**truyen ham props.onCick bang 1 ham tu component Board cha  */
        } //Board render ra Square co ham onClick, 
          //khi onClick cua Square duoc goi den -> thuc hien goi ham handleClick cua Board
        
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
            )
        }
    }

    class Game extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                history: [{
                    squares: Array(9).fill(null),
                }],
                stepNumber: 0,
                xIsNext: true,
            };
        }
        handleClick(i) {
            const history = this.state.history.slice(0, this.state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[i]) {
                return;
            }
            squares[i] = this.state.xIsNext === true ? 'X' : 'O';
            this.setState({
                history: history.concat([{
                    squares: squares
                }]),  
                stepNumber: history.length,    
                xIsNext: !this.state.xIsNext,
            });
        }
        


        jumpTo(step){
            this.setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0,
            });
        }

        render() {
            const history = this.state.history;
            const current = history[this.state.stepNumber];
            const winner = calculateWinner(current.squares);
            const moves = history.map((step, mov) => {
                const desc = mov ?
                    'Go to move #' + mov : 'Go to game start';
                return (
                    <li key={mov}><button onClick={() => this.jumpTo(mov)}>{desc}</button></li>
                );
            });

            let status;
            if (winner) {
                status = 'Winner: ' + winner;
            } else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }


            return (
                <div>
                    <div>
                        <Board 
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div>
                        <div>{status}</div>
                        <ol>{moves}</ol>
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
