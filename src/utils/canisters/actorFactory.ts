import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import dfxConfig from "../../../dfx.json";
export const IC_HOST = 'https://ic0.app';
// const DFX_NETWORK = process.env.DFX_NETWORK || "local";
const isLocalEnv =false;
function getHost() {
  // Setting host to undefined will default to the window location
  return isLocalEnv ? dfxConfig.networks.local.bind : IC_HOST;
}
const host = getHost();

class ActorFactory {
  private static _instance: ActorFactory = new ActorFactory();
  private static _identity: any;
  public static getInstance() {
    return this._instance;
  }
  _isAuthenticated: boolean = false;

  async createActor<T>(
    canisterDid: any,
    canisterId: string,
    identity?: Identity
  ) {
    const agent = new HttpAgent({ host, identity });
    const actor = Actor.createActor<T>(canisterDid, {
      agent,
      canisterId,
    });
    // The root key only has to be fetched for local development environments
    if (isLocalEnv) {
      agent.fetchRootKey().catch((err) => {
        console.warn(
          "Unable to fetch root key. Check to ensure that your local replica is running"
        );
        console.error(err);
      });
    }
    return actor;
  }

  /*
   * Once a user has authenticated and has an identity pass this identity
   * to create a new actor with it, so they pass their Principal to the backend.
   */
  async authenticateActor(identity: Identity) {
    ActorFactory._identity = identity;
    this._isAuthenticated = true;
  }

  /*
   * If a user unauthenticates, recreate the actor without an identity.
   */
  unauthenticateActor() {
    ActorFactory._identity = undefined;
    this._isAuthenticated = false;
  }

}

export const actorFactory = ActorFactory.getInstance();
