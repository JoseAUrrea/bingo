// import the React library from 'react'
import React from 'react';

// import the Bingo.css
import '../components/Bingo.css';

// Define class Bingo that extends React.Component
class Bingo extends React.Component {
    // Define the constructor method, parameter list includes props
    constructor(props) {
        // Call the super constructor method, pass parameter props as an argument
        super(props);

        const initialData = this.populateData();

        // Bind event handler handleMouseClick for clicking on the numbers
        this.handleMouseClick = this.handleMouseClick.bind(this);

        // Initialize the state object
        this.state = {
            // Add property data: initialize to initialData
            data: initialData,
            // Add property card: initialize to method call populateCard() with initialData
            card: this.populateCard(initialData)
        };
    }

    // Define method populateData, empty parameter list
    populateData() {
        // Declare variable data initialized to and empty array using the literal implementation
        let data = [];
        // iterate to generate the Bingo numbers 1 - 75 and push on the array data
        for (let i = 1; i <= 75; i++) {
            data.push(i);
        }
        // return the array data
        return data;
    }

    // Define method populateCard, parameter list includes data
    populateCard(data) {
        // Declare variable card initialized to and empty array using the literal implementation
        let card = new Array(25).fill(null);
        // Iterate for the five columns
        for (let col = 0; col < 5; col++) {
            // Declare variable offset initialized to the column loop control variable multiplied by 15
            let offset = col * 15;
            // Iterate until each column has five unique values
            for (let row = 0; row < 5; row++) {
                if (row === 2 && col === 2) {
                    // Set the center of the card to 'FREE'
                    card[row * 5 + col] = 'FREE';
                    continue;
                }
                let idx;
                do {
                    // Initialize idx to a random number based on the offset
                    idx = Math.floor(Math.random() * 15) + offset;
                } while (card.includes(data[idx]));
                // push the value on to the card array
                card[row * 5 + col] = data[idx];
            }
        }
        // return the card array
        return card;
    }

    // Define event handler method handleMouseClick
    handleMouseClick(event) {
        // Add the class 'highlight' to the clicked object
        event.target.classList.toggle('highlight');
    }

    // Declare method getNumber with one parameter (i.e., idx)
    getNumber(idx) {
        // Declare constant bingoCard initialized to the state object property card
        const { card } = this.state;
        // Declare variable number initialized to array bingoCard at index idx
        let number = card[idx];
        // Return variable number
        return number;
    }

    // Declare method render()
    render() {
        // Return the element
        return (
            // Write the JSX
            <div id="bingo-container">
                <div id="board">
                    {[...Array(5)].map((_, rowIndex) => (
                        <div className="row" key={rowIndex}>
                            {[...Array(5)].map((_, colIndex) => {
                                let index = rowIndex * 5 + colIndex;
                                return (
                                    <div className="bingo" onClick={this.handleMouseClick} key={colIndex}>
                                        <span>
                                            {rowIndex === 2 && colIndex === 2 ? 'FREE' : this.getNumber(index)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

// Include the export default statement
export default Bingo;
