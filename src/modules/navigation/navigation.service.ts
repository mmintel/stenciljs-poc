import { TYPES } from './../types';
import { Record } from '../record';
import { ApiClient, ContentType } from '../api';
import { Navigation, NavigationName } from './navigation.model';
import { inject, injectable } from 'inversify';

@injectable()
export class NavigationService {
  @inject(TYPES.ApiClient) private apiClient: ApiClient;

  public async getMainNavigation(): Promise<Record<Navigation>> {
    const item = await this.apiClient.getOne<Navigation>({
      type: ContentType.navigation,
      levels: 2,
      fields: {
        name: NavigationName.mainNavigation,
      },
    });
    return item;
  }
}
