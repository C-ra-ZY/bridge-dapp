export const idlFactory = ({ IDL }) => {
  const Fee = IDL.Record({ 'rate' : IDL.Nat, 'lowest' : IDL.Nat });
  const TokenHolder = IDL.Variant({
    'Account' : IDL.Text,
    'Principal' : IDL.Principal,
  });
  const CallData = IDL.Record({
    'method' : IDL.Text,
    'args' : IDL.Vec(IDL.Nat8),
  });
  const TransactionResponse = IDL.Record({
    'txid' : IDL.Text,
    'error' : IDL.Opt(IDL.Vec(IDL.Text)),
  });
  const TransactionResult = IDL.Variant({
    'Ok' : TransactionResponse,
    'Err' : IDL.Text,
  });
  const KeyValuePair = IDL.Record({ 'k' : IDL.Text, 'v' : IDL.Text });
  const TxRecord = IDL.Variant({
    'Approve' : IDL.Tuple(
      IDL.Nat,
      IDL.Principal,
      TokenHolder,
      TokenHolder,
      IDL.Nat,
      IDL.Nat,
      IDL.Nat64,
    ),
    'Burn' : IDL.Tuple(IDL.Nat, IDL.Principal, TokenHolder, IDL.Nat, IDL.Nat64),
    'Transfer' : IDL.Tuple(
      IDL.Nat,
      IDL.Principal,
      TokenHolder,
      TokenHolder,
      IDL.Nat,
      IDL.Nat,
      IDL.Nat64,
    ),
  });
  const TxRecordsResult = IDL.Variant({
    'Ok' : IDL.Vec(TxRecord),
    'Err' : IDL.Text,
  });
  const MetaData = IDL.Record({
    'fee' : Fee,
    'decimals' : IDL.Nat8,
    'name' : IDL.Text,
    'total_supply' : IDL.Nat,
    'symbol' : IDL.Text,
  });
  const TokenInfo = IDL.Record({
    'allowance_size' : IDL.Nat,
    'fee_to' : TokenHolder,
    'owner' : IDL.Principal,
    'cycles' : IDL.Nat64,
    'tx_count' : IDL.Nat,
    'holders' : IDL.Nat,
    'storages' : IDL.Vec(IDL.Principal),
  });
  const TxRecordResult = IDL.Variant({
    'Ok' : TxRecord,
    'Err' : IDL.Text,
    'Forward' : IDL.Principal,
  });
  return IDL.Service({
    'allowance' : IDL.Func([IDL.Text, IDL.Text], [IDL.Nat], ['query']),
    'allowancesByHolder' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(IDL.Tuple(TokenHolder, IDL.Nat))],
        ['query'],
      ),
    'approve' : IDL.Func(
        [IDL.Opt(IDL.Vec(IDL.Nat8)), IDL.Text, IDL.Nat, IDL.Opt(CallData)],
        [TransactionResult],
        [],
      ),
    'balanceOf' : IDL.Func([IDL.Text], [IDL.Nat], ['query']),
    'decimals' : IDL.Func([], [IDL.Nat8], ['query']),
    'extend' : IDL.Func([], [IDL.Vec(KeyValuePair)], ['query']),
    'fee' : IDL.Func([], [Fee], ['query']),
    'lastTransactions' : IDL.Func([IDL.Nat64], [TxRecordsResult], ['query']),
    'logo' : IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
    'meta' : IDL.Func([], [MetaData], ['query']),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'owner' : IDL.Func([], [IDL.Principal], []),
    'setExtend' : IDL.Func([IDL.Vec(KeyValuePair)], [IDL.Bool], []),
    'setFee' : IDL.Func([Fee], [IDL.Bool], []),
    'setFeeTo' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'setLogo' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Bool], []),
    'setOwner' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'tokenInfo' : IDL.Func([], [TokenInfo], ['query']),
    'totalSupply' : IDL.Func([], [IDL.Nat], ['query']),
    'transactionById' : IDL.Func([IDL.Text], [TxRecordResult], ['query']),
    'transactionByIndex' : IDL.Func([IDL.Nat], [TxRecordResult], ['query']),
    'transfer' : IDL.Func(
        [IDL.Opt(IDL.Vec(IDL.Nat8)), IDL.Text, IDL.Nat, IDL.Opt(CallData)],
        [TransactionResult],
        [],
      ),
    'transferFrom' : IDL.Func(
        [IDL.Opt(IDL.Vec(IDL.Nat8)), IDL.Text, IDL.Text, IDL.Nat],
        [TransactionResult],
        [],
      ),
  });
};
export const init = ({ IDL }) => {
  const Fee = IDL.Record({ 'rate' : IDL.Nat, 'lowest' : IDL.Nat });
  return [
    IDL.Opt(IDL.Vec(IDL.Nat8)),
    IDL.Opt(IDL.Vec(IDL.Nat8)),
    IDL.Text,
    IDL.Text,
    IDL.Nat8,
    IDL.Nat,
    Fee,
    IDL.Opt(IDL.Vec(IDL.Nat8)),
  ];
};
