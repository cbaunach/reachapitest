'reach 0.1';

export const main = Reach.App(() => {
  const A = Participant('A', { notify: Fun([], Null) });
  const B = API("B", { helloWorld: Fun([], UInt) });
  deploy();
  
  A.interact.notify();
  A.publish();
  commit();
  
  Anybody.publish();

  const [keepGoing, timesCalled] = parallelReduce([ true, 0 ])
    .invariant(balance() == 0)
    .while(keepGoing)
    .api(B.helloWorld,
      (() => [0]),
      ((notify) => {
        const called = timesCalled + 1;
        notify(called);
        return [called < 3, called];
      }))
      .timeout(absoluteSecs(30), () => {
        Anybody.publish();
        return [ false, timesCalled ];
        });

    commit();
    exit();
});