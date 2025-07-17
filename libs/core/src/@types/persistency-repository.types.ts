export interface PersistancyRepository<T, K> {
  entityMapper(doc: T): K;
}
