import PlugKeyRing from "./plug-controller/PlugKeyRing";
import { actorFactory } from "./canisters/actorFactory";

class Wallet {
  private static _instance: Wallet;
  private static _keyRing: PlugKeyRing;
  private static _mnemonic: string;

  public static getInstance() {
    if (this._instance) return this._instance;
    else {
      const keyRing = new PlugKeyRing();
      keyRing.init();
      this._keyRing = keyRing;
      this._instance = new Wallet();
      return this._instance;
    }
  }

  public get initialized() {
    return Wallet._keyRing.isInitialized;
  }

  public authActorFactory = async () => {
    if (!this.initialized || !this.isUnlocked) return false;
    await actorFactory.authenticateActor(
      Wallet._keyRing.currentWallet.identity
    );
    return true;
  };

  public getPrincipal = async () => {
    return Wallet._keyRing.currentWallet.identity.getPrincipal();
  };

  public get isUnlocked() {
    return Wallet._keyRing.isUnlocked;
  }

  public get name() {
    return Wallet._keyRing.currentWallet.name;
  }

  public create = async (name: string, password: string) => {
    const { wallet, mnemonic } = await Wallet._keyRing.create({ password });
    wallet.name = name;
    return { wallet, mnemonic };
  };

  public import = async (name: string, mnemonic: string, password: string) => {
    const { wallet } = await Wallet._keyRing.importMnemonic({
      mnemonic,
      password,
    });
    wallet.name = name;
    return { wallet, mnemonic };
  };

  public unlock = (password: string): Promise<boolean> => {
    return Wallet._keyRing.unlock(password);
  };

  public lock = (): Promise<void> => {
    return Wallet._keyRing.lock();
  };
}

export const wallet = Wallet.getInstance();
