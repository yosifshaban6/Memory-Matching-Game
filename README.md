<div align='center'>
   <img alt='Memory-Matching-Game' src='https://github.com/user-attachments/assets/b924f419-2926-44ef-b0d9-8caa5f367f28' width='720'/>
</div>

# Memory Matching Game

The **Memory Matching Game** is a fun and interactive game where players test their memory by matching pairs of cards. The game offers three difficulty levels: Easy, Medium, and Hard, with varying grid sizes to challenge players of all skill levels.

## How to Play

1. **Select a Difficulty Level**: Choose between Easy (4x4 grid), Medium (6x6 grid), or Hard (8x8 grid).
2. **Start the Game**: Click the "Start Game" button to begin.
3. **Flip Cards**: Click on two cards to flip them.
4. **Match Cards**: If the two flipped cards match, they will remain revealed. If not, they will flip back after a short delay.
5. **Track Progress**:
   - The timer starts automatically when the game begins.
   - The number of moves you make will be tracked and displayed.
6. **Win the Game**: Match all pairs of cards to win!
7. **Reset the Game**: Click the "Reset" button to restart the game at any time.

## Features

- **Difficulty Levels**: Adjust the grid size based on the selected difficulty.
- **Timer**: Tracks the time taken to complete the game.
- **Move Counter**: Displays the number of moves made.
- **Scoreboard**: Displays high scores and player statistics to track performance.
- **Sound Effects**: Engaging sound effects for card flips, matches, and game completion.

## Incoming Features

- **Themes**: Introduce multiple themes for cards and backgrounds to enhance visual appeal.
- **Multiplayer Mode**: Allow two players to compete by taking turns to match cards.
- **Leaderboard**: Implement a global leaderboard to compare scores with other players.
- **Accessibility Improvements**: Ensure the game is fully accessible, including keyboard navigation and screen reader support.
- **Save Progress**: Enable players to save and resume their game progress.
- **Hints**: Add a hint feature to assist players in finding matches.
- **Dark Mode**: Provide a dark mode option for better usability in low-light environments.

## Deployed Version

You can play the game online at the following link: [Memory Matching Game](https://yosifshaban6.github.io/Memory-Matching-Game/)

## Technologies Used

### HTML
- Used for structuring the game interface and ensuring semantic markup for better accessibility.

### CSS
- **Clear Structure**: The CSS is modularized using the `@import` rule to separate styles into smaller, reusable files.
- **CSS Variables**: Utilized for maintaining consistent theming and easy updates to colors, fonts, and spacing.
- **Relative Length Units**: Used `em`, `rem`, and `%` for responsive design and better scalability across different screen sizes.
- **Animations**: Smooth transitions and animations for card flips and popups enhance the user experience.

### JavaScript
- **Game Logic**: Handles card flipping, matching logic, and game state management.
- **Session Storage**: Used to temporarily store game data (e.g., current moves, elapsed time) during a session, ensuring data persistence even if the page is refreshed.
- **Local Storage**: Stores high scores and player statistics for long-term access.
- **Event Listeners**: Dynamically added to handle user interactions like card flips, resets, and difficulty selection.

## Contributors

<a href="https://github.com/yosifshaban6/Memory-Matching-Game/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yosifshaban6/Memory-Matching-Game" />
</a>
