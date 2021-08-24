import { Principal } from "@dfinity/principal";

export interface AccountIdentity {
  useWallet: boolean;
  name?: string;
  principal: Principal;
  subAccount?: number;
  accountId: string;
}
