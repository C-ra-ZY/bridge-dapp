import type { Principal } from '@dfinity/principal';
export interface Bridge {
  '_hasVotedOnProposal' : (
      arg_0: Array<number>,
      arg_1: string,
      arg_2: string,
    ) => Promise<boolean>,
  'adminAddRelayer' : (arg_0: string) => Promise<boolean>,
  'adminChangeFee' : (arg_0: bigint) => Promise<boolean>,
  'adminChangeRelayerThreshold' : (arg_0: number) => Promise<boolean>,
  'adminPauseTransfers' : () => Promise<boolean>,
  'adminRemoveRelayer' : (arg_0: string) => Promise<boolean>,
  'adminSetBurnable' : (arg_0: string, arg_1: string) => Promise<CommonResult>,
  'adminSetResource' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: TokenActorType,
      arg_4: bigint,
    ) => Promise<CommonResult>,
  'adminUnpauseTransfers' : () => Promise<boolean>,
  'adminWithdraw' : (
      arg_0: string,
      arg_1: string,
      arg_2: string,
      arg_3: bigint,
    ) => Promise<CommonResult>,
  'cancelProposal' : (arg_0: number, arg_1: bigint, arg_2: string) => Promise<
      CommonResult
    >,
  'deposit' : (arg_0: string, arg_1: number, arg_2: DepositData) => Promise<
      CommonResult
    >,
  'executeProposal' : (
      arg_0: number,
      arg_1: bigint,
      arg_2: DepositData,
      arg_3: string,
    ) => Promise<CommonResult>,
  'getDepositRecord' : (arg_0: string, arg_1: number, arg_2: bigint) => Promise<
      [] | [DepositRecord]
    >,
  'getProposal' : (arg_0: number, arg_1: bigint, arg_2: string) => Promise<
      [] | [Proposal]
    >,
  'grantRole' : (arg_0: string, arg_1: string) => Promise<boolean>,
  'isRelayer' : (arg_0: string) => Promise<boolean>,
  'renounceAdmin' : (arg_0: string) => Promise<boolean>,
  'totalRelayers' : () => Promise<bigint>,
  'transferFunds' : (arg_0: Array<string>, arg_1: Array<bigint>) => Promise<
      CommonResult
    >,
  'voteProposal' : (
      arg_0: number,
      arg_1: bigint,
      arg_2: string,
      arg_3: string,
    ) => Promise<CommonResult>,
}
export type CommonResult = { 'Ok' : [] | [string] } |
  { 'Err' : string };
export interface DepositData { 'recipientAddress' : string, 'amount' : bigint }
export interface DepositRecord {
  'fee' : bigint,
  'depositer' : string,
  'resourceID' : string,
  'depositNonce' : bigint,
  'destinationChainID' : number,
  'timestamp' : Time,
  'caller' : string,
  'recipientAddress' : string,
  'amount' : bigint,
}
export interface Proposal {
  'status' : ProposalStatus,
  'yesVotes' : Array<number>,
  'proposedTime' : Time,
  'yesVotesTotal' : number,
}
export type ProposalStatus = { 'active' : null } |
  { 'cancelled' : null } |
  { 'inactive' : null } |
  { 'executed' : null } |
  { 'passed' : null };
export type Time = bigint;
export type TokenActorType = { 'dft' : null } |
  { 'ext' : null } |
  { 'undefined' : null };
export interface _SERVICE extends Bridge {}
