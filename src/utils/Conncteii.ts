import _SERVICE  from "./plug-controller/interfaces/ledger";
import { AuthClient } from "@dfinity/auth-client";
import { actorFactory } from './canisters/actorFactory'
import { getAccountId } from "./plug-controller/utils/account";
import ledgerIDLFactory from "./ledger.did";
const CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";

export function Conncteii(){
  console.log('Login ii .....');
  var p = new Promise(async (resolve,reject) => {
    window.localStorage.clear();
    const authClient = await AuthClient.create();
    await authClient.login({
      onSuccess: async () => {
        const identity = await authClient.getIdentity();
        const accountId = getAccountId(identity.getPrincipal())
        actorFactory.authenticateActor(identity)
        const ibActor = await actorFactory.createActor<_SERVICE>(ledgerIDLFactory, CANISTER_ID, identity)
        const blance = await ibActor.account_balance_dfx({ account: accountId });
        const icpBalance: string = String(parseInt(blance.e8s.toString(), 10).toFixed(3));
        localStorage.setItem("walletAddress", accountId);
        localStorage.setItem("icpBalance", icpBalance)
        resolve('login done')
      },
    })
  });
  return p;
}