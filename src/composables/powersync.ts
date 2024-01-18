import type { SQLWatchOptions } from "@journeyapps/powersync-sdk-web";
import type { MaybeRefOrGetter } from "vue";
import { Ref, ref, toValue, watchEffect } from "vue";

import { usePowerSync } from "@/db/powersync";

export { usePowerSync };

/**
 * A composable to access a single static query.
 * For an updated result, use usePowerSyncWatchedQuery instead
 */
export const usePowerSyncQuery = <T = any>(
  sqlStatement: MaybeRefOrGetter<string>,
  parameters: Array<MaybeRefOrGetter<any>> = [],
): Ref<Array<T>> => {
  const powerSync = usePowerSync();

  const data: Ref<Array<T>> = ref([]);

  watchEffect(async () => {
    data.value = await powerSync.readLock((tx) =>
      tx.getAll<T>(toValue(sqlStatement), parameters.map(toValue)),
    );
  });

  return data;
};

/**
 * A composable to access the results of a watched query.
 */
export const usePowerSyncWatchedQuery = <T = any>(
  sqlStatement: MaybeRefOrGetter<string>,
  parameters: Array<MaybeRefOrGetter<any>> = [],
  options: MaybeRefOrGetter<Omit<SQLWatchOptions, "signal">> = {},
): Ref<Array<T>> => {
  const powerSync = usePowerSync();

  const data: Ref<Array<T>> = ref([]);

  let abortController = new AbortController();

  watchEffect(async (onCleanup) => {
    onCleanup(() => abortController.abort());
    abortController.abort();
    abortController = new AbortController();

    for await (const result of powerSync.watch(
      toValue(sqlStatement),
      parameters.map(toValue),
      {
        ...toValue(options),
        signal: abortController.signal,
      },
    )) {
      data.value = result.rows?._array ?? [];
    }
  });

  return data;
};
