import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Transfer,
  monstered,
  MonsterContract
} from "../generated/MonsterContract/MonsterContract"
import { Monster } from "../generated/schema"


export function handleTransfer(event: Transfer): void {
  let monster = Monster.load(event.params.tokenId.toHex())
  if(monster) {
    monster.owner = event.params.to
    monster.save()
  }
}

export function handlemonstered(event: monstered): void {
  let monster = new Monster(event.params.monster.toHex())
  
  let mc = MonsterContract.bind(event.address)
  let tokenId = event.params.monster
  monster.critical = mc.critical(tokenId)
  monster.dodge = mc.dodge(tokenId)
  monster.health_Point = mc.health_Point(tokenId)
  monster.hit = mc.hit(tokenId)
  monster.magical_damage_point = mc.magical_damage_point(tokenId)
  monster.magical_defence = mc.magical_defence(tokenId)
  monster.monsterName = mc.monster(tokenId)
  monster.parry = mc.parry(tokenId)
  monster.physical_damage_point = mc.physical_damage_point(tokenId)
  monster.physical_defence = mc.physical_defence(tokenId)
  monster.prefix = mc.prefix(tokenId)
  monster.suffix = mc.suffix(tokenId)
  monster.profession = mc.profession(mc.suffix(tokenId))
  
  monster.owner = event.params.owner
  monster.save()
}
