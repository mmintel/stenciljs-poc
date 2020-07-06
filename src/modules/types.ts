interface TypeRegistry {
  [key: string]: symbol;
}

export const TYPES: TypeRegistry = {
  ApiClient: Symbol.for('ApiClient'),
  PageService: Symbol.for('PageService'),
  NavigationService: Symbol.for('NavigationService'),
  ContentfulService: Symbol.for('ContentfulService'),
};
