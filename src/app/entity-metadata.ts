import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: true,
    },
  },
  Users: {},
};

const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
