import type { Principal } from '@dfinity/principal';
export interface CallData { 'method' : string, 'args' : Array<number> }
export interface Fee { 'rate' : bigint, 'lowest' : bigint }
export interface KeyValuePair { 'k' : string, 'v' : string }
export interface MetaData {
  'fee' : Fee,
  'decimals' : number,
  'name' : string,
  'total_supply' : bigint,
  'symbol' : string,
}
export type TokenHolder = { 'Account' : string } |
  { 'Principal' : Principal };
export interface TokenInfo {
  'allowance_size' : bigint,
  'fee_to' : TokenHolder,
  'owner' : Principal,
  'cycles' : bigint,
  'tx_count' : bigint,
  'holders' : bigint,
  'storages' : Array<Principal>,
}
export interface TransactionResponse {
  'txid' : string,
  'error' : [] | [Array<string>],
}
export type TransactionResult = { 'Ok' : TransactionResponse } |
  { 'Err' : string };
export type TxRecord = {
    'Approve' : [
      bigint,
      Principal,
      TokenHolder,
      TokenHolder,
      bigint,
      bigint,
      bigint,
    ]
  } |
  { 'Burn' : [bigint, Principal, TokenHolder, bigint, bigint] } |
  {
    'Transfer' : [
      bigint,
      Principal,
      TokenHolder,
      TokenHolder,
      bigint,
      bigint,
      bigint,
    ]
  };
export type TxRecordResult = { 'Ok' : TxRecord } |
  { 'Err' : string } |
  { 'Forward' : Principal };
export type TxRecordsResult = { 'Ok' : Array<TxRecord> } |
  { 'Err' : string };
export interface _SERVICE {
  'allowance' : (arg_0: string, arg_1: string) => Promise<bigint>,
  'allowancesByHolder' : (arg_0: string) => Promise<
      Array<[TokenHolder, bigint]>
    >,
  'approve' : (
      arg_0: [] | [Array<number>],
      arg_1: string,
      arg_2: bigint,
      arg_3: [] | [CallData],
    ) => Promise<TransactionResult>,
  'balanceOf' : (arg_0: string) => Promise<bigint>,
  'decimals' : () => Promise<number>,
  'extend' : () => Promise<Array<KeyValuePair>>,
  'fee' : () => Promise<Fee>,
  'lastTransactions' : (arg_0: bigint) => Promise<TxRecordsResult>,
  'logo' : () => Promise<Array<number>>,
  'meta' : () => Promise<MetaData>,
  'name' : () => Promise<string>,
  'owner' : () => Promise<Principal>,
  'setExtend' : (arg_0: Array<KeyValuePair>) => Promise<boolean>,
  'setFee' : (arg_0: Fee) => Promise<boolean>,
  'setFeeTo' : (arg_0: string) => Promise<boolean>,
  'setLogo' : (arg_0: Array<number>) => Promise<boolean>,
  'setOwner' : (arg_0: Principal) => Promise<boolean>,
  'symbol' : () => Promise<string>,
  'tokenInfo' : () => Promise<TokenInfo>,
  'totalSupply' : () => Promise<bigint>,
  'transactionById' : (arg_0: string) => Promise<TxRecordResult>,
  'transactionByIndex' : (arg_0: bigint) => Promise<TxRecordResult>,
  'transfer' : (
      arg_0: [] | [Array<number>],
      arg_1: string,
      arg_2: bigint,
      arg_3: [] | [CallData],
    ) => Promise<TransactionResult>,
  'transferFrom' : (
      arg_0: [] | [Array<number>],
      arg_1: string,
      arg_2: string,
      arg_3: bigint,
    ) => Promise<TransactionResult>,
}
