import { Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { actorFactory } from "./canisters/actorFactory";

// Where the IDP should be servied from
const IDENTITY_URL =
  new URLSearchParams(document.location.search).get("internetIdentityUrl") ||
  process.env.REACT_APP_INTERNET_IDENTITY_URL ||
  "https://identity.ic0.app";

/*
 * A simple wrapper for the official auth client to initialize it and wrap
 * some of the methods in promises
 */
class AuthClientWrapper {
  public authClient?: AuthClient;
  public ready = false;
  constructor() {
    return this;
  }

  // Create a new auth client and update it's ready state
  async create() {
    this.authClient = await AuthClient.create();
    await this.authClient?.isAuthenticated();
    this.ready = true;
  }

  async login(): Promise<Identity | undefined> {
    return new Promise(async (resolve) => {
      await this.authClient?.login({
        identityProvider: IDENTITY_URL,
        onSuccess: async () => {
          resolve(this.authClient?.getIdentity());
        },
      });
    });
  }

  async logout() {
    return this.authClient?.logout({ returnTo: "/" });
  }

  public authActorFactory = async () => {
    const identity = await this.authClient?.getIdentity();
    if (identity && !identity.getPrincipal().isAnonymous()) {
      await actorFactory.authenticateActor(identity);
      return true;
    } else {
      return false;
    }
  };

  public getPrincipal = async () => {
    const identity = await this.authClient?.getIdentity();
    if (identity != null) return identity.getPrincipal();
  };

  async isAuthenticated() {
    return this.authClient?.isAuthenticated();
  }
}

export const authClient = new AuthClientWrapper();
