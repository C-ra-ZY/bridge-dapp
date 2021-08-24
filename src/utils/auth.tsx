import React, { createContext, useContext, useEffect, useState } from "react";
import { authClient as authenticationClient } from "./authClient";
import { AccountIdentity } from "./account";
import { actorFactory } from "./canisters/actorFactory";
import { KEY_LOCALSTORAGE_ACCOUNT } from "./index"
import { getAccountId } from "./plug-controller/utils/account"
import { wallet } from "./wallet"

export interface AuthContext {
  isAuthenticated: boolean;
  isAuthReady: boolean; //II
  currentAccount: AccountIdentity | undefined;
  logIn: (useWallet?: boolean, password?: string) => void;
  logOut: () => void;
  setCurrentAccount: (p: AccountIdentity | undefined) => void;
}

// Provider hook that creates auth object and handles state
export function useProvideAuth(authClient): AuthContext {
  const [currentAccount, setCurrentAccount] = useState<AccountIdentity | undefined>();
  const [isAuthenticatedLocal, setIsAuthenticatedLocal] = useState<boolean>(
    false
  );
  const [isAuthClientReady, setAuthClientReady] = useState(false);

  // Creating the auth client is async and no auth related checks can happen
  // until it's ready so we set a state variable to keep track of it
  if (!authClient.ready) {
    authClient.create().then(() => setAuthClientReady(true));
  }

  const setCurrentAccountFromLocalStorage = () => {
    const lsAccount = localStorage.getItem(KEY_LOCALSTORAGE_ACCOUNT) || "{}";
    const account = JSON.parse(lsAccount);
    if (account) {
      setCurrentAccount(account);
    }
  };

  // Once the auth client is initialized, get the identity and check that they
  // are authenticated, then set them to be fully logged in.
  useEffect(() => {
    if (currentAccount?.useWallet) {
      if (!wallet.initialized) return;
      if (wallet.isUnlocked) {
        setCurrentAccountFromLocalStorage();
        wallet.authActorFactory().then(() => {
          setIsAuthenticatedLocal(true);
        });
        setAuthClientReady(true);
      }
      else actorFactory.unauthenticateActor();
    }
    else {
      if (!authClient.ready) return;
      Promise.all([authClient.getIdentity(), authClient.isAuthenticated()]).then(
        ([identity, isAuthenticated]) => {
          if (identity && !identity.getPrincipal().isAnonymous() && isAuthenticated) {
            setCurrentAccountFromLocalStorage();
            authClient.authActorFactory().then(() => {
              setIsAuthenticatedLocal(true);
            });
          }
          else actorFactory.unauthenticateActor();
          setAuthClientReady(true);
        }
      );
    }
  }, [isAuthClientReady]);

  useEffect(() => {
    if (currentAccount) {
      localStorage.setItem(KEY_LOCALSTORAGE_ACCOUNT, JSON.stringify(currentAccount));
    }
  }, [currentAccount]);

  const logIn = async function (useWallet?: boolean, password?: string): Promise<boolean> {
    let principal: any = undefined;
    if (useWallet) {
      if (!wallet.initialized) return false;
      if (await wallet.unlock(password || "")) principal = await wallet.getPrincipal();
      else return false;
    }
    else {
      if (!authClient) return false;
      await authClient.login();
      principal = await authClient.getPrincipal()
    }

    if (principal) {
      setIsAuthenticatedLocal(true);
      setCurrentAccount({
        useWallet: useWallet || false,
        name: wallet.name,
        principal,
        subAccount: 0,
        accountId: getAccountId(principal),
      })
      return true;
    } else {
      console.error("Could not get identity from internet identity");
      return false;
    }

  };

  // Clears the authClient of any cached data, and redirects user to root.
  function logOut() {
    setIsAuthenticatedLocal(false);
    if (currentAccount?.useWallet) {
      if (wallet.initialized && wallet.isUnlocked)
        wallet.lock();
    }
    else {
      if (!authClient.ready) return;
      authClient.logout();
    }
  }

  return {
    isAuthenticated: isAuthenticatedLocal,
    isAuthReady: isAuthClientReady,
    logIn,
    logOut,
    currentAccount,
    setCurrentAccount,
  };
}

const authContext = createContext<AuthContext>(null!);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth(authenticationClient);
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
