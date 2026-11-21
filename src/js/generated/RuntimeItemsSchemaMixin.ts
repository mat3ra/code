import type { BaseInMemoryEntitySchema, RuntimeItemsSchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntity } from "../entity/in_memory";

export type RuntimeItemsSchemaMixin = Omit<
    RuntimeItemsSchema,
    "preProcessors" | "postProcessors" | "monitors" | "results"
> & {
    get preProcessors(): RuntimeItemsSchema["preProcessors"];
    set preProcessors(
        value: (NonNullable<RuntimeItemsSchema["preProcessors"]>[number] | InMemoryEntity)[],
    );
    get postProcessors(): RuntimeItemsSchema["postProcessors"];
    set postProcessors(
        value: (NonNullable<RuntimeItemsSchema["postProcessors"]>[number] | InMemoryEntity)[],
    );
    get monitors(): RuntimeItemsSchema["monitors"];
    set monitors(value: (NonNullable<RuntimeItemsSchema["monitors"]>[number] | InMemoryEntity)[]);
    get results(): RuntimeItemsSchema["results"];
    set results(value: (NonNullable<RuntimeItemsSchema["results"]>[number] | InMemoryEntity)[]);
};

export type RuntimeItemsInMemoryEntity = InMemoryEntity<
    BaseInMemoryEntitySchema & RuntimeItemsSchemaMixin
>;

export function runtimeItemsSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & RuntimeItemsSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<RuntimeItemsSchemaMixin> & RuntimeItemsSchemaMixin = {
        get preProcessors(): RuntimeItemsSchema["preProcessors"] {
            return this.requiredProp("preProcessors");
        },
        set preProcessors(
            value: (NonNullable<RuntimeItemsSchema["preProcessors"]>[number] | InMemoryEntity)[],
        ) {
            this.setProp(
                "preProcessors",
                value?.map((item) => InMemoryEntity.getDataForEntity(item)),
            );
        },
        get postProcessors(): RuntimeItemsSchema["postProcessors"] {
            return this.requiredProp("postProcessors");
        },
        set postProcessors(
            value: (NonNullable<RuntimeItemsSchema["postProcessors"]>[number] | InMemoryEntity)[],
        ) {
            this.setProp(
                "postProcessors",
                value?.map((item) => InMemoryEntity.getDataForEntity(item)),
            );
        },
        get monitors(): RuntimeItemsSchema["monitors"] {
            return this.requiredProp("monitors");
        },
        set monitors(
            value: (NonNullable<RuntimeItemsSchema["monitors"]>[number] | InMemoryEntity)[],
        ) {
            this.setProp(
                "monitors",
                value?.map((item) => InMemoryEntity.getDataForEntity(item)),
            );
        },
        get results(): RuntimeItemsSchema["results"] {
            return this.requiredProp("results");
        },
        set results(
            value: (NonNullable<RuntimeItemsSchema["results"]>[number] | InMemoryEntity)[],
        ) {
            this.setProp(
                "results",
                value?.map((item) => InMemoryEntity.getDataForEntity(item)),
            );
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
