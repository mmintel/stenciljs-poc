import * as contentful from 'contentful';
import { injectable } from 'inversify';
import { Logger, createLogger } from '../../utils/logger';

export type ContentfulEntry<T> = contentful.Entry<T>;
export type ContentfulEntryCollection<T> = contentful.EntryCollection<T>;

export interface ContentfulQuery {
  [key: string]: any;
  content_type?: string;
  include?: number;
}

interface Options {
  space: string;
  accessToken: string;
  preview?: boolean;
}

@injectable()
export class ContentfulService {
  private logger: Logger = createLogger('ContentfulService');
  private client: contentful.ContentfulClientApi;

  constructor(options: Options) {
    this.client = contentful.createClient({
      space: options.space,
      accessToken: options.accessToken,
      host: options.preview ? 'preview.contentful.com' : 'cdn.contentful.com',
    });
  }

  public async getEntries(
    query: ContentfulQuery,
  ): Promise<ContentfulEntryCollection<any>> {
    this.logger.trace('Looking up entry with query', query);
    const entries = await this.client.getEntries(query);
    this.logger.trace('Received entries', entries);
    return entries;
  }

  public async getEntry(query: ContentfulQuery): Promise<ContentfulEntry<any>> {
    const entries = await this.getEntries({
      ...query,
      limit: 1,
    });
    return entries.items[0];
  }

  public async getEntryByID<T>(id: string): Promise<ContentfulEntry<T>> {
    return this.client.getEntry<T>(id);
  }
}
