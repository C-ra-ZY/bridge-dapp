export const idlFactory = ({ IDL }) => {
  const CommonResult = IDL.Variant({
    'Ok' : IDL.Opt(IDL.Text),
    'Err' : IDL.Text,
  });
  const TokenActorType = IDL.Variant({
    'dft' : IDL.Null,
    'ext' : IDL.Null,
    'undefined' : IDL.Null,
  });
  const DepositData = IDL.Record({
    'recipientAddress' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const Time = IDL.Int;
  const DepositRecord = IDL.Record({
    'fee' : IDL.Nat,
    'depositer' : IDL.Text,
    'resourceID' : IDL.Text,
    'depositNonce' : IDL.Nat64,
    'destinationChainID' : IDL.Nat16,
    'timestamp' : Time,
    'caller' : IDL.Text,
    'recipientAddress' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const ProposalStatus = IDL.Variant({
    'active' : IDL.Null,
    'cancelled' : IDL.Null,
    'inactive' : IDL.Null,
    'executed' : IDL.Null,
    'passed' : IDL.Null,
  });
  const Proposal = IDL.Record({
    'status' : ProposalStatus,
    'yesVotes' : IDL.Vec(IDL.Nat8),
    'proposedTime' : Time,
    'yesVotesTotal' : IDL.Nat8,
  });
  const Bridge = IDL.Service({
    '_hasVotedOnProposal' : IDL.Func(
        [IDL.Vec(IDL.Nat8), IDL.Text, IDL.Text],
        [IDL.Bool],
        [],
      ),
    'adminAddRelayer' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'adminChangeFee' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'adminChangeRelayerThreshold' : IDL.Func([IDL.Nat8], [IDL.Bool], []),
    'adminPauseTransfers' : IDL.Func([], [IDL.Bool], []),
    'adminRemoveRelayer' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'adminSetBurnable' : IDL.Func([IDL.Text, IDL.Text], [CommonResult], []),
    'adminSetResource' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, TokenActorType, IDL.Nat],
        [CommonResult],
        [],
      ),
    'adminUnpauseTransfers' : IDL.Func([], [IDL.Bool], []),
    'adminWithdraw' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Nat],
        [CommonResult],
        [],
      ),
    'cancelProposal' : IDL.Func(
        [IDL.Nat16, IDL.Nat64, IDL.Text],
        [CommonResult],
        [],
      ),
    'deposit' : IDL.Func(
        [IDL.Text, IDL.Nat16, DepositData],
        [CommonResult],
        [],
      ),
    'executeProposal' : IDL.Func(
        [IDL.Nat16, IDL.Nat64, DepositData, IDL.Text],
        [CommonResult],
        [],
      ),
    'getDepositRecord' : IDL.Func(
        [IDL.Text, IDL.Nat16, IDL.Nat64],
        [IDL.Opt(DepositRecord)],
        [],
      ),
    'getProposal' : IDL.Func(
        [IDL.Nat16, IDL.Nat64, IDL.Text],
        [IDL.Opt(Proposal)],
        [],
      ),
    'grantRole' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'isRelayer' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'renounceAdmin' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'totalRelayers' : IDL.Func([], [IDL.Nat], []),
    'transferFunds' : IDL.Func(
        [IDL.Vec(IDL.Text), IDL.Vec(IDL.Nat)],
        [CommonResult],
        [],
      ),
    'voteProposal' : IDL.Func(
        [IDL.Nat16, IDL.Nat64, IDL.Text, IDL.Text],
        [CommonResult],
        [],
      ),
  });
  return Bridge;
};
export const init = ({ IDL }) => {
  return [IDL.Nat16, IDL.Nat8, IDL.Nat, IDL.Nat, IDL.Principal];
};
