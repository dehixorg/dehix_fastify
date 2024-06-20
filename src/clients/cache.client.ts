import cache from 'memory-cache';
import { ServerError } from '../common/errors';

let cacheObject = null;

class CacheClient {
  private cache!: cache;

  constructor() {
    if (cacheObject == null) {
      cacheObject = new cache.Cache();
    }
    this.cache = cacheObject;
  }

  async put(key: string | number, value: any, timeOut: number) {
    try {
      const data = this.cache.put(key, value, timeOut);
      return data;
    } catch (error: any) {
      throw new ServerError('Server Error', '500');
    }
  }

  async get(key: string | number, callback?: (key: string | number) => any) {
    try {
      let data;
      data = this.cache.get(key);
      if (!data && typeof callback === 'function') {
        data = await callback(key);
      } else if (!data && callback !== undefined) {
        throw new TypeError('Callback must be a function');
      }
      return data;
    } catch (error: any) {
      throw new ServerError('Server Error', '500');
    }
  }

  async clear() {
    try {
      this.cache.clear();
      return 'Cache cleared successfully';
    } catch (error: any) {
      throw new ServerError('Server Error', '500');
    }
  }
}

export const cacheClient = new CacheClient();
