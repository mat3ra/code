import type { BaseInMemoryEntitySchema, SystemInSetSchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntity } from "../entity/in_memory";

export type InSetSchemaMixin = Omit<SystemInSetSchema, "inSet"> & {
    get inSet(): SystemInSetSchema["inSet"];
    set inSet(value: (NonNullable<SystemInSetSchema["inSet"]>[number] | InMemoryEntity)[]);
};

export type InSetInMemoryEntity = InMemoryEntity<BaseInMemoryEntitySchema & InSetSchemaMixin>;

export function inSetSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & InSetSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<InSetSchemaMixin> & InSetSchemaMixin = {
        get inSet(): SystemInSetSchema["inSet"] {
            return this.requiredProp("inSet");
        },
        set inSet(value: (NonNullable<SystemInSetSchema["inSet"]>[number] | InMemoryEntity)[]) {
            this.setProp(
                "inSet",
                value?.map((item) => InMemoryEntity.getDataForEntity(item)),
            );
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
