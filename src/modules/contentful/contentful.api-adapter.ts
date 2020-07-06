import { TYPES } from '../types';
import { inject, injectable } from 'inversify';
import { ContentfulService, ContentfulEntry, ContentfulQuery } from '.';
import { ApiClient, Query, Record } from '../api';
import { Logger, createLogger } from '../../utils/logger';
import * as flatten from 'flattenjs';
import { isObject, has } from 'lodash';

interface Fields {
  [key: string]: any;
}

@injectable()
export class ContentfulApiAdapter implements ApiClient {
  @inject(TYPES.ContentfulService) private contentfulService: ContentfulService;
  private logger: Logger = createLogger('ContentfulApiAdapter');

  public async getMany<T>(query: Query): Promise<Record<T>[]> {
    const entries = await this.contentfulService.getEntries(
      this.convertQuery(query),
    );
    const parsedEntries = entries.items.map(this.entryToRecord);
    return parsedEntries;
  }

  public async getOne<T>(query: Query): Promise<Record<T>> {
    const item = await this.contentfulService.getEntry(
      this.convertQuery(query),
    );
    return this.entryToRecord<T>(item);
  }

  private convertQuery(query: Query): ContentfulQuery {
    const fields = flatten.flatten({ fields: query.fields });
    const converted = {
      content_type: query.type,
      include: query.levels,
      ...fields,
    };
    this.logger.trace('Converted query from', query, 'to', converted);
    return converted;
  }

  private entryToRecord<T>(entry: ContentfulEntry<T>): Record<T> {
    const { fields, sys } = entry;
    const { createdAt, updatedAt, id } = sys;

    return {
      meta: {
        id,
        createdAt,
        updatedAt,
      },
      data: this.parseFields<T>(fields),
    };
  }

  private parseFields<T>(fields: Fields): T {
    const parsedFields: Fields = { ...fields };

    for (const [key, value] of Object.entries(fields)) {
      if (Array.isArray(value)) {
        this.logger.trace(`Found multiple nested items at "${key}".`);
        parsedFields[key] = value.map(item => this.entryToRecord(item));
      }

      if (isObject(value) && has(value, 'fields')) {
        this.logger.trace(`Found single nested item at "${key}".`);
        parsedFields[key] = this.entryToRecord(value);
      }
    }

    return parsedFields as T;
  }
}
