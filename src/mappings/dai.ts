import {BigInt} from '@graphprotocol/graph-ts'
import {
  Approval,
  Transfer as TransferEvent,
  Mint as MintEvent,
  Burn as BurnEvent
} from '../types/Dai/Dai'
import {
  Token,
  Transfer,
  User,
  Mint,
  Burn
} from '../types/schema'

export function handleTransfer(event: TransferEvent): void {
  let transferID = event.transaction.hash.toHex()
  let transfer = new Transfer(transferID)
  transfer.from = event.params.src
  transfer.to = event.params.dst
  transfer.amount = event.params.wad
  transfer.timestamp = event.block.timestamp.toI32()
  transfer.save()

  let id = "DAI"
  let dai = Token.load(id)

  let userToID = event.params.dst.toHex()
  let userTo = User.load(userToID)
  if (userTo == null){
    userTo = new User(userToID)
    userTo.daiBalance = BigInt.fromI32(0)
    userTo.transferFrom =[]
    userTo.transfersTo = []
    userTo.mints = []
    userTo.burns = []
    userTo.txCount = 0
    dai.totalUsersEver = dai.totalUsersEver + 1
  }

  userTo.daiBalance = userTo.daiBalance.plus(event.params.wad)
  // user.txCount = user.txCount + 1 NOTE - does not count. You have to initiate tx (sender in this case)

  let userFromID = event.params.src.toHex()
  let userFrom = User.load(userFromID)
  userFrom.daiBalance = userFrom.daiBalance.minus(event.params.wad)
  userFrom.txCount = userFrom.txCount + 1

  dai.save()
  userTo.save()
  userFrom.save()
}

export function handleMint(event: MintEvent): void {
  let id = "DAI"
  let dai = Token.load(id)
  if (dai == null){
    dai = new Token("DAI")
    dai.amount = BigInt.fromI32(0)
    dai.totalMinted = BigInt.fromI32(0)
    dai.totalBurned = BigInt.fromI32(0)
    dai.totalUsersEver = 0

  }
  dai.amount = dai.amount.plus(event.params.wad)
  dai.totalMinted = dai.totalMinted.plus(event.params.wad)

  let userID = event.params.guy.toHex()
  let user = User.load(userID)
  if (user == null){
    user = new User(userID)
    user.daiBalance = BigInt.fromI32(0)
    user.transferFrom =[]
    user.transfersTo = []
    user.mints = []
    user.burns = []
    user.txCount = 0
    dai.totalUsersEver = dai.totalUsersEver + 1
  }

  user.daiBalance = user.daiBalance.plus(event.params.wad)
  user.txCount = user.txCount + 1


  // mint entity
  let mintID = event.transaction.hash.toHex()
  let mint = new Mint(mintID)
  mint.timestamp = event.block.timestamp.toI32()
  mint.minter = event.params.guy
  mint.amount = event.params.wad

  dai.save()
  user.save()
  mint.save()
}

export function handleBurn(event: BurnEvent): void {
  let id = "DAI"
  let dai = Token.load(id)
  dai.amount = dai.amount.minus(event.params.wad)
  dai.totalBurned = dai.totalBurned.plus(event.params.wad)

  let userID = event.params.guy.toHex()
  let user = User.load(userID)

  user.daiBalance = user.daiBalance.minus(event.params.wad)
  user.txCount = user.txCount + 1

  // burn entity
  let burnID = event.transaction.hash.toHex()
  let burn = new Burn(burnID)
  burn.timestamp = event.block.timestamp.toI32()
  burn.burner = event.params.guy
  burn.amount = event.params.wad

  dai.save()
  user.save()
  burn.save()
}

// Not implemented... yet
// export function handleApproval(event: Approval): void {
//
// }