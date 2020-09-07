/*
 * @Author: your name
 * @Date: 2020-07-20 17:21:32
 * @LastEditTime: 2020-07-20 17:38:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jsQuestion\MVVM\js\observe.js
 */ 
function Observer (data) {
   this.data = data
   this.walk(data)
}
Observer.prototype = {
   constructor: Observer,
   walk: function (data) {
      
   }
}