import { Redis as UpstashRedis } from "@upstash/redis";
import { RedisClientType, createClient } from "redis";

export default class Redis {
  client: UpstashRedis | RedisClientType;

  static shared = new Redis();

  constructor() {
    if (process.env.NODE_ENV === "production") {
      this.client = new UpstashRedis({
        url: process.env.UPSTASH_REDIS_REST_URL as string,
        token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
      });
    } else {
      this.client = createClient({
        url: process.env.REDIS_SERVER_URL as string,
        //port: "32053",
        //password: "********",
        //tls: {},
        // Maybe password + port etc...
      });
    }
  }

  set(key: string, value: string) {
    if (this.client instanceof UpstashRedis) {
      const client = this.client as UpstashRedis;

      return client.set(key, value);
    } else {
      const client = this.client as RedisClientType;

      return client.set(key, value);
    }
  }

  get(key: string) {
    if (this.client instanceof UpstashRedis) {
      const client = this.client as UpstashRedis;

      return client.get(key);
    } else {
      const client = this.client as RedisClientType;

      return client.get(key);
    }
  }
}
