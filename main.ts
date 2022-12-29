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
    if (tiles.getTilesByType(assets.tile`myTile`).length == 0) {
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
                if (pushIfPossible(direction)) {
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
    locationInDirection = grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
    if (tiles.tileAtLocationEquals(locationInDirection, assets.tile`myTile2`) || tiles.tileAtLocationEquals(locationInDirection, assets.tile`myTile1`)) {
        if (direction == 1 || direction == 2) {
            enterBox(direction)
            return true
        }
    }
    return false
}
tiles.onMapLoaded(function (tilemap2) {
    if (currentTilemapChange == 0) {
        grid.place(playerSprite, tiles.getTileLocation(2, 3))
    } else if (currentTilemapChange == 1) {
        if (currentDirection == 1) {
            grid.place(playerSprite, tiles.getTileLocation(1, 5))
        } else {
            grid.place(playerSprite, tiles.getTileLocation(5, 1))
        }
    } else {
        subBoxTile = tiles.getTilesByType(assets.tile`myTile1`)[0]
        if (currentDirection == 0) {
            grid.place(playerSprite, tiles.getTileLocation(subBoxTile.column, subBoxTile.row - 1))
        } else {
            grid.place(playerSprite, tiles.getTileLocation(subBoxTile.column - 1, subBoxTile.row))
        }
    }
})
// 0 - up
// 1 - right
// 2 - down 
// 3 - left
function checkBox (direction: number) {
    return tiles.tileAtLocationEquals(grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1]), assets.tile`myTile2`) || tiles.tileAtLocationEquals(grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1]), assets.tile`myTile1`)
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
let subBoxTile: tiles.Location = null
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
let currentTilemapChange = 0
initConstants()
currentTilemapChange = 0
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
tiles.loadMap(tiles.createMap(tilemap`level4`))
canMove = true
info.setScore(0)
