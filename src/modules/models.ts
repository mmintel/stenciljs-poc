import { Page as PageInterface } from './page/page.model';
import { Navigation as NavigationInterface } from './navigation/navigation.model';
import { Record } from './record/record.model';

export type Page = PageInterface;
export type Navigation = NavigationInterface;
export type PageRecord = Record<PageInterface>;
export type NavigationRecord = Record<NavigationInterface>;
