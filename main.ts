function pushIfPossible (direction: number) {
    locationInDirection = grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
    pushedLocationInDirection = grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0] * 2, DIRECTION_VECTORS[direction][1] * 2)
    if (tiles.tileAtLocationEquals(locationInDirection, assets.tile`myTile0`) || tiles.tileAtLocationEquals(locationInDirection, sprites.dungeon.stairLadder)) {
        if (!(tiles.tileAtLocationIsWall(pushedLocationInDirection))) {
            if (tiles.tileAtLocationEquals(locationInDirection, assets.tile`myTile0`)) {
                tiles.setTileAt(locationInDirection, assets.tile`myTile`)
            } else {
                tiles.setTileAt(locationInDirection, sprites.dungeon.floorDark2)
            }
            tiles.setWallAt(locationInDirection, false)
            if (tiles.tileAtLocationEquals(pushedLocationInDirection, assets.tile`myTile`)) {
                tiles.setTileAt(pushedLocationInDirection, assets.tile`myTile0`)
            } else {
                tiles.setTileAt(pushedLocationInDirection, sprites.dungeon.stairLadder)
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
function onDirectionButtonDown (direction: number, spriteImage: Image) {
    if (canMove) {
        playerSprite.setImage(spriteImage)
        if (checkWall(direction)) {
            if (checkBox(direction)) {
                if (pushIfPossible(direction)) {
                    info.changeScoreBy(1)
                    grid.move(playerSprite, DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1])
                    checkWin()
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
// 0 - up
// 1 - right
// 2 - down 
// 3 - left
function checkBox (direction: number) {
    return tiles.tileAtLocationEquals(grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1]), assets.tile`myTile0`) || tiles.tileAtLocationEquals(grid.add(grid.getLocation(playerSprite), DIRECTION_VECTORS[direction][0], DIRECTION_VECTORS[direction][1]), sprites.dungeon.stairLadder)
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
let LEFT: number[] = []
let DOWN: number[] = []
let RIGHT: number[] = []
let UP: number[] = []
let pushedLocationInDirection: tiles.Location = null
let DIRECTION_VECTORS: number[][] = []
let locationInDirection: tiles.Location = null
let canMove = false
let playerSprite: Sprite = null
initConstants()
tiles.setCurrentTilemap(tilemap`level3`)
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
grid.place(playerSprite, tiles.getTileLocation(6, 4))
canMove = true
info.setScore(0)
