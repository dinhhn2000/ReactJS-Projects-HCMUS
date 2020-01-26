# Midterm project - Gomoku online
## This is the project for mid-term test in Advanced-Web Class
## Description
* Game Gomoku (5-in-a-row) online (version Viet Nam)
* The game has 2 mode
    * Single mode
    * Duel mode (2 people)
* Demonstration: https://gomoku1612107.herokuapp.com/
## Techstack
* Front-end
    * Core: React JS / Redux
    * UI: React-Bootstrap
* Backend
    * Node-Express (REST API)
* Database
    * Mongo DB (Using cloud database)
## Feature & evaluation
|                  Feature Name                 | Evaluation Point |
|-----------------------------------------------|:----------------:|
| Using React-Bootstrap                         |        0.5       |
| Register                                      |        0.5       |
| Authenticate by Passport & JWT                |        1.0       |
| Login by Google & Facebook                    |        0.5       |
| Login by email & password                     |        0.5       |
| Update profile                                |        0.5       |
| Upload avatar                                 |        0.5       |
| Single play (Play with computer)              |        0.5       |
| Show history of moves                         |        0.5       |
| Undo & Redo at any move                       |        0.5       |
| Show the winner pattern & announce the winner |        0.5       |
| Find player (In duel mode)                    |        0.5       |
| Pair 2 player (In duel mode)                  |        0.5       |
| Play between 2 player (In duel mode)          |        0.5       |
| Undo request                                  |        0.5       |
| Upload to host                                |        1.0       |
| **Total**                                     |      **9.0**     |

## Other feature
* Apply AI in Single mode
    * Reference: [Package Link](https://www.npmjs.com/package/gomokuai)
    * Result: 
        * Computer can play better instead of random
        * Disable computer's move in history board (Because the AI only return 1 result with the previous move)
* Handle user when refresh while in a match (Duel mode)
    * Technique: Save match's information in Session Storage
    * Problems: Although can keep the match between 2 players, the data (list of moves) cannot keep (If save the data at local storage, player can **hack** the result)
## Git progress
* Because this project is base on other project so the commit history will not be detail at the beginning
* Link of reference git project:
    * API: https://github.com/dinhhn2000/testAPI
    * Game: https://github.com/dinhhn2000/ReactJS-Projects-HCMUS/tree/master/gomoku-refactor
    * Application: https://github.com/dinhhn2000/ReactJS-Projects-HCMUS/tree/master/XO_GAME_Authentication/xo-game-authentication
