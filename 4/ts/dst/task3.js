"use strict";
class UserClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}
const userTyped = new UserClass("Bob", 30);
userTyped.hello();
