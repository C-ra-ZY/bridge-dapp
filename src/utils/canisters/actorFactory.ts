import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import dfxConfig from "../../../dfx.json";
export const IC_HOST = "https://ic0.app";
const DFX_NETWORK = process.env.DFX_NETWORK || "local";
const isLocalEnv = DFX_NETWORK;
function getHost() {
  // Setting host to undefined will default to the window location
  return isLocalEnv ? dfxConfig.networks.local.bind : IC_HOST;
}
const host = getHost();

function is_local(agent: HttpAgent) {
  // @ts-ignore
  const hostname = agent._host.hostname;
  return hostname === "127.0.0.1" || hostname.endsWith("localhost");
}

class ActorFactory {
  private static _instance: ActorFactory = new ActorFactory();
  private static _identity: any; 
  public static getInstance() {
    return this._instance;
  }
  _isAuthenticated: boolean = false;

  createActor<T>(
    canisterDid: any,
    canisterId: string | Principal,
    identity?: Identity 
  ) {
    const agent = new HttpAgent({
      host,
      identity: identity || ActorFactory._identity,
    });
    const actor = Actor.createActor<T>(canisterDid, {
      agent,
      canisterId,
    });
    // The root key only has to be fetched for local development environments
    if (is_local(agent)) {
      agent.fetchRootKey().catch(console.error);
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
