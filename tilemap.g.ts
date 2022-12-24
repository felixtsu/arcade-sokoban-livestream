// 自动生成的代码。请勿编辑。
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level2":
            case "level2":return tiles.createTilemap(hex`0a000a0000010808080808020000000509090b0909070000000509090a090907000000050b0a090a0b070000000509090a0909070000000509090b090907000000040606060606030000000000000000000000000000000000000000000000000000000000000000`, img`
. 2 2 2 2 2 2 2 . . 
. 2 . . . . . 2 . . 
. 2 . . 2 . . 2 . . 
. 2 . 2 . 2 . 2 . . 
. 2 . . 2 . . 2 . . 
. 2 . . . . . 2 . . 
. 2 2 2 2 2 2 2 . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
`, [myTiles.transparency16,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterSouth1,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterNorth0,sprites.dungeon.floorDark2,sprites.dungeon.stairLadder,myTiles.tile1], TileScale.Sixteen);
            case "level1":
            case "级别1":return tiles.createTilemap(hex`0a000a00000000010c0200000000000000050f070000000000010c0a0e0b0c02000000050f0e0d0e0f070000000406090e0806030000000000050f070000000000000004060300000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . 2 2 2 . . . . 
. . . 2 . 2 . . . . 
. 2 2 2 2 2 2 2 . . 
. 2 . 2 . 2 . 2 . . 
. 2 2 2 2 2 2 2 . . 
. . . 2 . 2 . . . . 
. . . 2 2 2 . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
`, [myTiles.transparency16,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterSouth1,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenInnerNorthWest,sprites.dungeon.greenInnerNorthEast,sprites.dungeon.greenInnerSouthEast,sprites.dungeon.greenInnerSouthWest,sprites.dungeon.greenOuterNorth0,sprites.dungeon.floorDark2,sprites.dungeon.stairLadder,myTiles.tile1], TileScale.Sixteen);
            case "level0":
            case "级别2":return tiles.createTilemap(hex`0a0008000000000000000000000000000000000000000000000002030303040000000000090a0b010500000000000807070706000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . 
. . . . . . . . . . 
. . 2 2 2 2 2 . . . 
. . 2 . 2 . 2 . . . 
. . 2 2 2 2 2 . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
`, [myTiles.transparency16,myTiles.tile1,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterSouth1,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterWest0,sprites.dungeon.floorDark2,sprites.dungeon.stairLadder], TileScale.Sixteen);
            case "level3":
            case "level3":return tiles.createTilemap(hex`0a000a0000000000000000000000000203040000000000000005010d030303040000000501010c0c0c09000000050c0808080c09000000050c0c0c0c0b0a00000006070707070a000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . 
. 2 2 2 . . . . . . 
. 2 . 2 2 2 2 2 . . 
. 2 . . . . . 2 . . 
. 2 . 2 2 2 . 2 . . 
. 2 . . . . 2 2 . . 
. 2 2 2 2 2 2 . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
`, [myTiles.transparency16,myTiles.tile1,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterSouth1,sprites.dungeon.stairLadder,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenInnerNorthWest,sprites.dungeon.floorDark2,sprites.dungeon.greenInnerSouthWest], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "myTile":
            case "tile1":return tile1;
            case "myTile0":
            case "tile2":return tile2;
        }
        return null;
    })

}
// 自动生成的代码。请勿编辑。
