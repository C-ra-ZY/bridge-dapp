import { actorFactory } from "../actorFactory";
import { _SERVICE as DepositToolInterface } from "./Bridge.did";
import { idlFactory } from "./did";

const CANISTER_ID = "rrkah-fqaaa-aaaaa-aaaaq-cai";

export const createDepositTool = () =>
  actorFactory.createActor<DepositToolInterface>(idlFactory, CANISTER_ID);

