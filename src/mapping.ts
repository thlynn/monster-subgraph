import { BigInt } from "@graphprotocol/graph-ts"
import {
  Transfer,
  monstered
} from "../generated/MonsterContract/MonsterContract"
import { Monster } from "../generated/schema"


export function handleTransfer(event: Transfer): void {
  let monster = Monster.load(event.params.tokenId.toHex())
  if(monster) {
    monster.owner = event.params.to
  }
}

export function handlemonstered(event: monstered): void {
  let monster = new Monster(event.params.monster.toHex())
  monster.owner = event.params.owner
  monster.save()
}
