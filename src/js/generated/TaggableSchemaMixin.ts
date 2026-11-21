import type { BaseInMemoryEntitySchema, EntityTagsSchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntity } from "../entity/in_memory";

export type TaggableSchemaMixin = Omit<EntityTagsSchema, "tags"> & {
    get tags(): EntityTagsSchema["tags"];
    set tags(value: (NonNullable<EntityTagsSchema["tags"]>[number] | InMemoryEntity)[] | undefined);
};

export type TaggableInMemoryEntity = InMemoryEntity<BaseInMemoryEntitySchema & TaggableSchemaMixin>;

export function taggableSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & TaggableSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<TaggableSchemaMixin> & TaggableSchemaMixin = {
        get tags(): EntityTagsSchema["tags"] {
            return this.prop("tags");
        },
        set tags(
            value: (NonNullable<EntityTagsSchema["tags"]>[number] | InMemoryEntity)[] | undefined,
        ) {
            this.setProp(
                "tags",
                value?.map((item) => InMemoryEntity.getDataForEntity(item)),
            );
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
