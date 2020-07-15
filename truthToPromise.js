/*
 * @Author: your name
 * @Date: 2020-07-09 17:39:14
 * @LastEditTime: 2020-07-13 13:45:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jsQuestion\truthToPromise.js
 */ 
/**
 * Promise类实现原理
 * 构造函数传入一个function，有两个参数，resolve：成功回调; reject：失败回调
 * state: 状态存储 [PENDING-进行中 RESOLVED-成功 REJECTED-失败]
 * doneList: 成功处理函数列表
 * failList: 失败处理函数列表
 * done: 注册成功处理函数
 * fail: 注册失败处理函数
 * then: 同时注册成功和失败处理函数
 * always: 一个处理函数注册到成功和失败
 * resolve: 更新state为：RESOLVED，并且执行成功处理队列
 * reject: 更新state为：REJECTED，并且执行失败处理队列
**/

class PromiseNew {
  constructor(fn) {
    this.state = 'PENDING';
    this.doneList = [];
    this.failList = [];
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  // 注册成功处理函数
  done(handle) {
    console.log(typeof handle);
    console.log( handle);
    
    if (typeof handle === 'function') {
      console.log('function');
      
      this.doneList.push(handle);
    } else {
      console.log('no function');
      
      throw new Error('缺少回调函数');
    }
    return this;
  }

  // 注册失败处理函数
  fail(handle) {
    if (typeof handle === 'function') {
      this.failList.push(handle);
    } else {
      throw new Error('缺少回调函数');
    }
    return this;
  }

  // 同时注册成功和失败处理函数
  then(success, fail) {
    this.done(success || function () { }).fail(fail || function () { });
    return this;
  }

  // 一个处理函数注册到成功和失败
  always(handle) {
    this.done(handle || function () { }).fail(handle || function () { });
    return this;
  }

  // 更新state为：RESOLVED，并且执行成功处理队列
  resolve() {
    this.state = 'RESOLVED';
    let args = Array.prototype.slice.call(arguments);
    setTimeout(function () {
      this.doneList.forEach((item, key, arr) => {
        item.apply(null, args);
        arr.shift();
      });
    }.bind(this), 200);
  }

  // 更新state为：REJECTED，并且执行失败处理队列
  reject() {
    this.state = 'REJECTED';
    let args = Array.prototype.slice.call(arguments);
    setTimeout(function () {
      this.failList.forEach((item, key, arr) => {
        item.apply(null, args);
        arr.shift();
      });
    }.bind(this), 200);
  }
}

// 下面一波骚操作
// new PromiseNew((resolve, reject) => {
//   resolve('hello world');
//   // reject('you are err');
// }).done((res) => {
//   console.log(res);
// }).fail((res) => {
//   console.log(res);
// })
const promise01 = new PromiseNew((resolve,reject) => {
  resolve('i am one')
  console.log('i am one');
  
})
const promise02 = new PromiseNew((resolve,reject) => {
  resolve('i am two')
  console.log('i am two');
})
const promise03 = new PromiseNew((resolve,reject) => {
  resolve('i am three')
  console.log('i am three');
})
promise01.done(promise02).done(promise03)