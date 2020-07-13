/*
 * @Author: your name
 * @Date: 2020-07-09 17:39:14
 * @LastEditTime: 2020-07-09 17:42:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \jsQuestion\truthToPromise.js
 */ 

   const fs = require('fs');
  //定义三种状态
  const PENDING = "pending";
  const FULFILLED = "fulfilled";
  const REJECTED = "rejected";

  function MyPromise(executor) {
    let self = this; // 缓存当前promise实例
    self.value = null;
    self.error = null;
    self.status = PENDING;
    self.onFulfilled = null; //成功的回调函数
    self.onRejected = null; //失败的回调函数

    const resolve = (value) => {
      if (self.status !== PENDING) return;
      setTimeout(() => {
        self.status = FULFILLED;
        self.value = value;
        self.onFulfilled(self.value); //resolve时执行成功回调
      });
    };

    const reject = (error) => {
      if (self.status !== PENDING) return;
      setTimeout(() => {
        self.status = REJECTED;
        self.error = error;
        self.onRejected(self.error); //resolve时执行成功回调
      });
    };
    executor(resolve, reject);
  }
  MyPromise.prototype.then = function (onFulfilled, onRejected) {
    if (this.status === PENDING) {
      this.onFulfilled = onFulfilled;
      this.onRejected = onRejected;
    } else if (this.status === FULFILLED) {
      //如果状态是fulfilled，直接执行成功回调，并将成功值传入
      onFulfilled(this.value);
    } else {
      //如果状态是rejected，直接执行失败回调，并将失败原因传入
      onRejected(this.error);
    }
    return this;
  };
  let promise1 = new MyPromise((resolve, reject) => {
    fs.readFile("./001.txt", (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });

  let x1 = promise1.then((data) => {
    console.log("第一次展示", data.toString());
  });

  let x2 = promise1.then((data) => {
    console.log("第二次展示", data.toString());
  });

  let x3 = promise1.then((data) => {
    console.log("第三次展示", data.toString());
  });
