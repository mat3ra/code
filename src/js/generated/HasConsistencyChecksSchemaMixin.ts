import type {
    BaseInMemoryEntitySchema,
    HasConsistencyCheckSchema,
} from "@mat3ra/esse/dist/js/types";

import { InMemoryEntity } from "../entity/in_memory";

export type HasConsistencyChecksSchemaMixin = Omit<
    HasConsistencyCheckSchema,
    "consistencyChecks"
> & {
    get consistencyChecks(): HasConsistencyCheckSchema["consistencyChecks"];
    set consistencyChecks(
        value:
            | (
                  | NonNullable<HasConsistencyCheckSchema["consistencyChecks"]>[number]
                  | InMemoryEntity
              )[]
            | undefined,
    );
};

export type HasConsistencyChecksInMemoryEntity = InMemoryEntity<
    BaseInMemoryEntitySchema & HasConsistencyChecksSchemaMixin
>;

export function hasConsistencyChecksSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & HasConsistencyChecksSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<HasConsistencyChecksSchemaMixin> &
        HasConsistencyChecksSchemaMixin = {
        get consistencyChecks(): HasConsistencyCheckSchema["consistencyChecks"] {
            return this.prop("consistencyChecks");
        },
        set consistencyChecks(
            value:
                | (
                      | NonNullable<HasConsistencyCheckSchema["consistencyChecks"]>[number]
                      | InMemoryEntity
                  )[]
                | undefined,
        ) {
            this.setProp(
                "consistencyChecks",
                value?.map((item) => InMemoryEntity.getDataForEntity(item)),
            );
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
