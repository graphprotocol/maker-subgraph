import {BigInt} from '@graphprotocol/graph-ts'
import {
  Approval,
  Transfer as TransferEvent,
  Mint as MintEvent,
  Burn as BurnEvent,
  LogNote
} from '../types/Dai/Dai'
import {
  Token,
  Transfer,
  User,
  Mint,
  Burn,
  TempLogNote,
  CountLogNote
} from '../types/schema'

// export function handleTransfer(event: TransferEvent): void {
  // let transferID = event.transaction.hash.toHex()
  // let transfer = new Transfer(transferID)
  // transfer.from = event.params.src
  // transfer.to = event.params.dst
  // transfer.amount = event.params.wad
  // transfer.timestamp = event.block.timestamp.toI32()
  // transfer.save()
  //
  // let id = "DAI"
  // let dai = Token.load(id)
  //
  // let userToID = event.params.dst.toHex()
  // let userTo = User.load(userToID)
  // if (userTo == null){
  //   userTo = new User(userToID)
  //   userTo.daiBalance = BigInt.fromI32(0)
  //   userTo.transferFrom =[]
  //   userTo.transfersTo = []
  //   userTo.mints = []
  //   userTo.burns = []
  //   userTo.txCount = 0
  //   dai.totalUsersEver = dai.totalUsersEver + 1
  // }
  //
  // userTo.daiBalance = userTo.daiBalance.plus(event.params.wad)
  // // user.txCount = user.txCount + 1 NOTE - does not count. You have to initiate tx (sender in this case)
  //
  // let userFromID = event.params.src.toHex()
  // let userFrom = User.load(userFromID)
  // userFrom.daiBalance = userFrom.daiBalance.minus(event.params.wad)
  // userFrom.txCount = userFrom.txCount + 1
  //
  // dai.save()
  // userTo.save()
  // userFrom.save()
// }

export function handleGive(event: LogNote): void {

  let count = CountLogNote.load('1')
  if (count == null){
    count = new CountLogNote('1')
    count.count = BigInt.fromI32(0)
  }

  let id = count.count.toString()
  let logNote = new TempLogNote(id)
  logNote.sig = event.params.sig
  logNote.msgSender = event.params.guy
  logNote.foo = event.params.foo
  logNote.bar = event.params.bar
  logNote.msgValue = event.params.wad
  logNote.msgData = event.params.fax
  logNote.contractAddress = event.address
  logNote.save()

  count.count = count.count.plus(BigInt.fromI32(1))
  count.save()
}

export function handleDraw(event: LogNote): void {

  let count = CountLogNote.load('1')
  if (count == null){
    count = new CountLogNote('1')
    count.count = BigInt.fromI32(0)
  }

  let id = count.count.toString()
  let logNote = new TempLogNote(id)
  logNote.sig = event.params.sig
  logNote.msgSender = event.params.guy
  logNote.foo = event.params.foo
  logNote.bar = event.params.bar
  logNote.msgValue = event.params.wad
  logNote.msgData = event.params.fax
  logNote.contractAddress = event.address
  logNote.save()

  count.count = count.count.plus(BigInt.fromI32(1))
  count.save()
}