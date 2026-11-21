import type { BaseInMemoryEntitySchema, DescriptionSchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntity } from "../entity/in_memory";

export type HasDescriptionSchemaMixin = Omit<DescriptionSchema, "descriptionObject"> & {
    get descriptionObject(): DescriptionSchema["descriptionObject"];
    set descriptionObject(value: DescriptionSchema["descriptionObject"] | InMemoryEntity);
};

export type HasDescriptionInMemoryEntity = InMemoryEntity<
    BaseInMemoryEntitySchema & HasDescriptionSchemaMixin
>;

export function hasDescriptionSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & HasDescriptionSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<HasDescriptionSchemaMixin> & HasDescriptionSchemaMixin = {
        get description(): DescriptionSchema["description"] {
            return this.prop("description");
        },
        set description(value: DescriptionSchema["description"]) {
            this.setProp("description", value);
        },
        get descriptionObject(): DescriptionSchema["descriptionObject"] {
            return this.prop("descriptionObject");
        },
        set descriptionObject(value: DescriptionSchema["descriptionObject"] | InMemoryEntity) {
            this.setProp("descriptionObject", InMemoryEntity.getDataForEntity(value));
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
