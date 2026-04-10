"use strict";
class Adaptee {
    specificRequest() {
        return "Ответ от устаревшей системы";
    }
}
class Adapter {
    constructor(adaptee) {
        this.adaptee = adaptee;
    }
    request() {
        return `[Адаптер] -> ${this.adaptee.specificRequest()}`;
    }
}
class NoDiscount {
    apply(price) { return price; }
}
class PercentDiscount {
    constructor(percent) {
        this.percent = percent;
    }
    apply(price) { return price * (1 - this.percent / 100); }
}
class ShoppingCart {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    checkout(price) {
        return this.strategy.apply(price);
    }
}
class Publisher {
    constructor() {
        this.observers = [];
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }
    notify(message) {
        for (const obs of this.observers) {
            obs.update(message);
        }
    }
}
class ConsoleLogger {
    update(message) {
        console.log(`[Logger] Получено событие: ${message}`);
    }
}
console.log("\n--- ADAPTER ---");
const oldSystem = new Adaptee();
const adapter = new Adapter(oldSystem);
console.log(adapter.request());
console.log("\n--- STRATEGY ---");
const cart = new ShoppingCart(new NoDiscount());
console.log("Без скидки:", cart.checkout(1000));
cart.setStrategy(new PercentDiscount(15));
console.log("Скидка 15%:", cart.checkout(1000));
console.log("\n--- OBSERVER ---");
const publisher = new Publisher();
const logger = new ConsoleLogger();
publisher.subscribe(logger);
publisher.notify("Новый заказ #1234");
publisher.unsubscribe(logger);
