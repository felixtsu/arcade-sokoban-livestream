function pushIfPossible (direction: number) {
    locationInDirection = grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
    pushedLocationInDirection = grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0] * 2, DIRECTION_VECTORS[direction][1] * 2)
    if (tiles.tileAtLocationEquals(locationInDirection, assets.tile`myTile2`) || tiles.tileAtLocationEquals(locationInDirection, assets.tile`myTile1`)) {
        if (!(tiles.tileAtLocationIsWall(pushedLocationInDirection))) {
            if (tiles.tileAtLocationEquals(locationInDirection, assets.tile`myTile2`)) {
                tiles.setTileAt(locationInDirection, assets.tile`myTile`)
            } else {
                tiles.setTileAt(locationInDirection, sprites.dungeon.floorDark2)
            }
            tiles.setWallAt(locationInDirection, false)
            if (tiles.tileAtLocationEquals(pushedLocationInDirection, assets.tile`myTile`)) {
                tiles.setTileAt(pushedLocationInDirection, assets.tile`myTile2`)
            } else {
                tiles.setTileAt(pushedLocationInDirection, assets.tile`myTile1`)
            }
            tiles.setWallAt(pushedLocationInDirection, true)
            return true
        }
    }
    return false
}
function checkWin () {
    if (emptyTargetTile == 0) {
        canMove = false
        playerSprite.sayText("Yay~")
        pause(1000)
        game.over(true)
    }
}
function enterBox (direction: number) {
    mainLevelTileMap = tiles.getLoadedMap()
    currentTilemapChange = 1
    tiles.loadMap(tiles.createMap(tilemap`SubBoxInLevel4`))
}
function onDirectionButtonDown (direction: number, spriteImage: Image) {
    currentDirection = direction
    if (canMove) {
        playerSprite.setImage(spriteImage)
        if (checkWall(direction)) {
            if (checkBox(direction)) {
                if (pushIfPossibleMultipleBox(direction, grid.spriteCol(playerSprite), grid.spriteRow(playerSprite))) {
                    info.changeScoreBy(1)
                    grid.move(playerSprite, DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
                    checkWin()
                } else if (enterBoxIfPossible(direction)) {
                	
                }
            }
        } else {
            info.changeScoreBy(1)
            grid.move(playerSprite, DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
        }
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    onDirectionButtonDown(0, img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    onDirectionButtonDown(2, img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
})
function initConstants () {
    UP = [0, -1]
    RIGHT = [1, 0]
    DOWN = [0, 1]
    LEFT = [-1, 0]
    DIRECTION_VECTORS = [
    UP,
    RIGHT,
    DOWN,
    LEFT
    ]
}
function enterBoxIfPossible (direction: number) {
    locationInDirection2 = grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
    if (tiles.tileAtLocationEquals(locationInDirection2, assets.tile`myTile2`) || tiles.tileAtLocationEquals(locationInDirection2, assets.tile`myTile1`)) {
        if (direction == 1 || direction == 2) {
            enterBox(direction)
            return true
        }
    }
    return false
}
// 0 - up
// 1 - right
// 2 - down
// 3 - left
function checkBox (direction: number) {
    directionTileColumn = DIRECTION_VECTORS[direction][0]
    directionTileRow = DIRECTION_VECTORS[direction][1]
    return tiles.tileAtLocationEquals(grid.add(grid.getLocation(playerSprite), directionTileColumn, directionTileRow), assets.tile`myTile2`) || tiles.tileAtLocationEquals(grid.add(grid.getLocation(playerSprite), directionTileColumn, directionTileRow), assets.tile`myTile1`) || (tiles.tileAtLocationEquals(grid.add(grid.getLocation(playerSprite), directionTileColumn, directionTileRow), assets.tile`myTile0`) || tiles.tileAtLocationEquals(grid.add(grid.getLocation(playerSprite), directionTileColumn, directionTileRow), sprites.dungeon.stairLadder))
}
// 0 - up
// 1 - right
// 2 - down
// 3 - left
function checkBoxAtLocation (column: number, row: number) {
    return tiles.tileAtLocationEquals(tiles.getTileLocation(column, row), assets.tile`myTile2`) || tiles.tileAtLocationEquals(tiles.getTileLocation(column, row), assets.tile`myTile1`) || (tiles.tileAtLocationEquals(tiles.getTileLocation(column, row), assets.tile`myTile0`) || tiles.tileAtLocationEquals(tiles.getTileLocation(column, row), sprites.dungeon.stairLadder))
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    onDirectionButtonDown(1, img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    moveOutOfBox(currentDirection)
})
tiles.onMapLoaded(function (tilemap2) {
    if (currentTilemapChange == 0) {
        grid.place(playerSprite, tiles.getTileLocation(3, 4))
    } else if (currentTilemapChange == 1) {
        if (currentDirection == 1) {
            if (boxEntered == 1) {
                tiles.setTileAt(tiles.getTileLocation(2, 5), sprites.dungeon.stairLadder)
                tiles.setWallAt(tiles.getTileLocation(2, 5), true)
                grid.place(playerSprite, tiles.getTileLocation(1, 5))
            } else {
                grid.place(playerSprite, tiles.getTileLocation(1, 5))
            }
        } else {
            grid.place(playerSprite, tiles.getTileLocation(5, 1))
        }
    } else {
        subBoxTile = tiles.getTilesByType(assets.tile`myTile1`)[0]
        if (currentDirection == 0) {
            if (boxEntered == 2) {
                emptyTargetTile += -1
                tiles.setTileAt(tiles.getTileLocation(subBoxTile.column, subBoxTile.row - 2), assets.tile`myTile0`)
                tiles.setWallAt(tiles.getTileLocation(subBoxTile.column, subBoxTile.row - 2), true)
            }
            grid.place(playerSprite, tiles.getTileLocation(subBoxTile.column, subBoxTile.row - 1))
        } else {
            grid.place(playerSprite, tiles.getTileLocation(subBoxTile.column - 1, subBoxTile.row))
        }
    }
})
function pushIfPossibleMultipleBox (direction: number, col: number, row: number) {
    pushedBoxCandidates = []
    locationInDirection = grid.add(tiles.getTileLocation(col, row), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
    pushedLocationInDirection = grid.add(tiles.getTileLocation(col, row), DIRECTION_VECTORS[direction][0] * 2, DIRECTION_VECTORS[direction][1] * 2)
    while (!(tiles.tileAtLocationEquals(pushedLocationInDirection, assets.tile`transparency16`))) {
        if (tiles.tileAtLocationEquals(pushedLocationInDirection, sprites.dungeon.floorDark2) || tiles.tileAtLocationEquals(pushedLocationInDirection, assets.tile`myTile`)) {
            if (tiles.tileAtLocationEquals(pushedLocationInDirection, assets.tile`myTile`)) {
                emptyTargetTile += -1
                if (tiles.tileAtLocationEquals(locationInDirection, sprites.dungeon.stairLadder)) {
                    tiles.setTileAt(pushedLocationInDirection, assets.tile`myTile0`)
                } else {
                    tiles.setTileAt(pushedLocationInDirection, assets.tile`myTile2`)
                }
            } else {
                tiles.setTileAt(pushedLocationInDirection, tiles.tileImageAtLocation(locationInDirection))
            }
            tiles.setWallAt(pushedLocationInDirection, true)
            for (let index = 0; index <= pushedBoxCandidates.length - 1; index++) {
                pushedBox = pushedBoxCandidates.pop()
                pushedLocationInDirection = grid.add(pushedLocationInDirection, 0 - DIRECTION_VECTORS[direction][0], 0 - DIRECTION_VECTORS[direction][1])
                tiles.setTileAt(pushedLocationInDirection, tiles.tileImageAtLocation(pushedBox))
                tiles.setWallAt(pushedLocationInDirection, true)
            }
            pushedLocationInDirection = grid.add(pushedLocationInDirection, 0 - DIRECTION_VECTORS[direction][0], 0 - DIRECTION_VECTORS[direction][1])
            if (tiles.tileAtLocationEquals(pushedLocationInDirection, sprites.dungeon.stairLadder) || tiles.tileAtLocationEquals(pushedLocationInDirection, assets.tile`myTile1`)) {
                tiles.setTileAt(pushedLocationInDirection, sprites.dungeon.floorDark2)
            } else {
                tiles.setTileAt(pushedLocationInDirection, assets.tile`myTile`)
            }
            tiles.setWallAt(pushedLocationInDirection, false)
            return true
        } else if (checkBoxAtLocation(pushedLocationInDirection.column, pushedLocationInDirection.row)) {
            pushedBoxCandidates.push(locationInDirection)
        }
        locationInDirection = grid.add(locationInDirection, DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
        pushedLocationInDirection = grid.add(pushedLocationInDirection, DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
    }
    pushedLocationInDirection = grid.add(pushedLocationInDirection, 0 - DIRECTION_VECTORS[direction][0], 0 - DIRECTION_VECTORS[direction][1])
    if (!(tiles.tileAtLocationEquals(pushedLocationInDirection, assets.tile`myTile4`))) {
        boxEntered = 2
        locationInDirection = grid.add(locationInDirection, 0 - DIRECTION_VECTORS[direction][0], 0 - DIRECTION_VECTORS[direction][1])
        tiles.setTileAt(locationInDirection, sprites.dungeon.floorDark2)
        return true
    }
    pushedLocationInDirection = grid.add(pushedLocationInDirection, 0 - DIRECTION_VECTORS[direction][0], 0 - DIRECTION_VECTORS[direction][1])
    pushedBoxCandidates.push(locationInDirection)
    if (pushedBoxCandidates.length > 1 && (tiles.tileAtLocationEquals(pushedLocationInDirection, assets.tile`myTile2`) || tiles.tileAtLocationEquals(pushedLocationInDirection, assets.tile`myTile1`))) {
        for (let index2 = 0; index2 <= pushedBoxCandidates.length - 1; index2++) {
            info.changeLifeBy(10)
            pushedBox = pushedBoxCandidates.pop()
            pushedLocationInDirection = grid.add(pushedLocationInDirection, 0 - DIRECTION_VECTORS[direction][0], 0 - DIRECTION_VECTORS[direction][1])
            tiles.setTileAt(pushedLocationInDirection, tiles.tileImageAtLocation(pushedBox))
            tiles.setWallAt(pushedLocationInDirection, true)
        }
        tiles.setTileAt(pushedLocationInDirection, sprites.dungeon.floorDark2)
        tiles.setWallAt(pushedLocationInDirection, false)
        boxEntered = 1
        return true
    }
    return false
}
function moveOutOfBox (direction: number) {
    currentTilemapChange = 2
    tiles.loadMap(mainLevelTileMap)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    onDirectionButtonDown(3, img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
})
// 0 - up
// 1 - right
// 2 - down
// 3 - left
function checkWall (direction: number) {
    return tiles.tileAtLocationIsWall(grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1]))
}
let pushedBox: tiles.Location = null
let pushedBoxCandidates: tiles.Location[] = []
let subBoxTile: tiles.Location = null
let boxEntered = 0
let directionTileRow = 0
let directionTileColumn = 0
let locationInDirection2: tiles.Location = null
let LEFT: number[] = []
let DOWN: number[] = []
let RIGHT: number[] = []
let UP: number[] = []
let currentDirection = 0
let mainLevelTileMap: tiles.WorldMap = null
let pushedLocationInDirection: tiles.Location = null
let DIRECTION_VECTORS: number[][] = []
let locationInDirection: tiles.Location = null
let canMove = false
let playerSprite: Sprite = null
let emptyTargetTile = 0
let currentTilemapChange = 0
initConstants()
currentTilemapChange = 0
emptyTargetTile = 2
playerSprite = sprites.create(img`
    . . . . . . f f f f f f . . . . 
    . . . . f f e e e e f 2 f . . . 
    . . . f f e e e e f 2 2 2 f . . 
    . . . f e e e f f e e e e f . . 
    . . . f f f f e e 2 2 2 2 e f . 
    . . . f e 2 2 2 f f f f e 2 f . 
    . . f f f f f f f e e e f f f . 
    . . f f e 4 4 e b f 4 4 e e f . 
    . . f e e 4 d 4 1 f d d e f . . 
    . . . f e e e 4 d d d d f . . . 
    . . . . f f e e 4 4 4 e f . . . 
    . . . . . 4 d d e 2 2 2 f . . . 
    . . . . . e d d e 2 2 2 f . . . 
    . . . . . f e e f 4 5 5 f . . . 
    . . . . . . f f f f f f . . . . 
    . . . . . . . f f f . . . . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(playerSprite)
tiles.loadMap(tiles.createMap(tilemap`level4`))
canMove = true
info.setScore(0)
