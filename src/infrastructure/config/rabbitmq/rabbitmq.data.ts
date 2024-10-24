export class RabbitMQ {
  constructor(data) {
    RabbitMQ.data = data;
  }

  private static data;

  static getClient() {
    return RabbitMQ.data;
  }
}
