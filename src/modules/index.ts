import 'reflect-metadata';
import { Container } from 'inversify';
import { ApiClient } from './api';
import { PageService } from './page';
import { NavigationService } from './navigation';
import { ContentfulService, ContentfulApiAdapter } from './contentful';
import { TYPES } from './types';

export * from './models';

const container = new Container();

container.bind<ApiClient>(TYPES.ApiClient).to(ContentfulApiAdapter);
container.bind<PageService>(TYPES.PageService).to(PageService);
container
  .bind<NavigationService>(TYPES.NavigationService)
  .to(NavigationService);
container.bind<ContentfulService>(TYPES.ContentfulService).toConstantValue(
  new ContentfulService({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  }),
);

export const pageService = container.get<PageService>(TYPES.PageService);
export const navigationService = container.get<NavigationService>(
  TYPES.NavigationService,
);
