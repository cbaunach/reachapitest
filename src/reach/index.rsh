/* eslint-disable no-undef */
'reach 0.1';

export const main = Reach.App(() => {
  const A = Participant('A', { notify: Fun([], Null) });
  const B = API("B", { helloWorld: Fun([], UInt) });
  deploy();

  A.publish();
  A.interact.notify();

  // const [keepGoing, timesCalled] = parallelReduce([ true, 0 ])
  //   .invariant(balance() == 0)
  //   .while(keepGoing)
  //   .api(B.helloWorld,
  //     (() => 0),
  //     ((k) => {
  //       const called = timesCalled + 1;
  //       k(called);
  //       return [called < 10, called];
  //     })
  //   )
  //   .timeout(false);

    var [keepGoing, timesCalled] = [ true, 0 ];
    invariant(balance() == 0);
    while (keepGoing) {
      commit()

      const [ [], k ] = call(B.helloWorld).throwTimeout(false);
      const called = timesCalled + 1;
      k(called);

      // B.helloWorld.only(() => {
      //   const [] = declassify(interact.in());
      //   const called = timesCalled + 1;
      // });
      // B.helloWorld.publish(called).throwTimeout(false);
      // B.helloWorld.only(() => {
      //   interact.out([], called);
      // });

      [keepGoing, timesCalled] = [called < 3, called];
      continue
    }

    commit();
    exit();
});