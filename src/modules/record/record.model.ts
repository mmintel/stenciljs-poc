export interface Record<T> {
  meta: RecordMeta;
  data: T;
}

interface RecordMeta {
  id: string;
  createdAt: string;
  updatedAt: string;
}
