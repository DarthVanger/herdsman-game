# Herdsman Game

A simple 2D prototype of the mini-game where the player can collect animals using Main Hero and move them to the destination point (yard).

Language: TypeScript
Frameworks: Pixi.js
Patterns:
- [Entity Component System](https://www.kodeco.com/2806-introduction-to-component-based-architecture-in-games)

Features:
- Player run the application and can see the game field (green area) with Main Hero (red circle).
- Player can see the random number of animals (white circles) located on the game field at random positions.
- Player can see the destination point: yard (yellow area).
- Player can see the score value at the Top UI.
- Player can click on the game filed and the Main Hero must move to the click position.
- If the Main Hero moves close to animal it will follow the Main Hero – create a group. The max number of the animals in the group is 5.
- If the animal reaches the yard the score counter increased.
- Spawn generator spawns animals in random time intervals at random positions.
- Animals have patrol behaviour. During the patrol animals cannot move to the yard without Main Hero.
