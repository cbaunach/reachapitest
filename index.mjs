import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);
const thread = async (f) => await f();

(async () => {
  const startingBalance = stdlib.parseCurrency(100);

  const [ accAlice ] =
    await stdlib.newTestAccounts(1, startingBalance);

  const ctcAlice = accAlice.contract(backend);

  const user = async (uid) => {
    const acc = await stdlib.newTestAccount(startingBalance);
    acc.setDebugLabel(uid);
    return async () => {
      const ctc = acc.contract(backend, ctcAlice.getInfo());
      const bob = ctc.a.B;

      const call = async (f) => {
        let res = undefined;
        try {
          res = await f();
        } catch (e) {
          res = [`err`, e]
        }
        console.log(`res`, res);
      };

      await call(() => bob.helloWorld());
    };
  };

  await Promise.all([
    backend.A(ctcAlice, {
      notify: () => {
        console.log(`notify`);
      }
    }),
    thread(await user('Bob')),
  ]);
})();