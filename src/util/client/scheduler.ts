export class Scheduler {
  private max: number;
  private count = 0; // 当前执行中的异步操作
  private queue: Func[] = [];

  constructor(max = 5) {
    this.max = max;
  }

  public async add(task: Func) {
    // 注意这里是>=，不是>,比如max = 2，那么当count = 2时，说明已经有2个进行的任务了
    if (this.count >= this.max) {
      // 这一块可以说是是很巧妙的设计，利用await把新的 promise 卡在这里
      // 并把这个promise的 resolve 推到队列的末尾
      // 当调用这个 resolve 的时候就相当于“放行！”
      await new Promise((resolve, reject) => {
        this.queue.push(resolve);
      });
    }

    // 执行到这里时，说明任务马上要执行了，先把当前异步执行的个数 +1
    this.count++;

    let res: any;

    try {
      res = await task();
    } catch (err) {
      res = Promise.reject(err);
    }

    // 执行到这里时，说明任务完成了，异步执行的个数 -1
    this.count--;

    if (this.queue.length) {
      const resolve = this.queue.shift();
      resolve?.();
    }
    return res;
  }
}
