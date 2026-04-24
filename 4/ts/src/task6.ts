interface Target {
  request(): string;
}

class Adaptee {
  specificRequest(): string {
    return "Ответ от устаревшей системы";
  }
}




class Adapter implements Target {
  private adaptee: Adaptee;
  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }
  request(): string {
    return `[Адаптер] -> ${this.adaptee.specificRequest()}`;
  }
}

interface DiscountStrategy {
  apply(price: number): number;
}

class NoDiscount implements DiscountStrategy {
  apply(price: number): number { return price; }
}

class PercentDiscount implements DiscountStrategy {
  constructor(private percent: number) {}
  apply(price: number): number { return price * (1 - this.percent / 100); }
}

class ShoppingCart {
  private strategy: DiscountStrategy;
  constructor(strategy: DiscountStrategy) {
    this.strategy = strategy;
  }
  setStrategy(strategy: DiscountStrategy): void {
    this.strategy = strategy;
  }
  checkout(price: number): number {
    return this.strategy.apply(price);
  }
}




interface Observer {
  update(message: string): void;
}

class Publisher {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(message: string): void {
    for (const obs of this.observers) {
      obs.update(message);
    }
  }
}

class ConsoleLogger implements Observer {
  update(message: string): void {
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