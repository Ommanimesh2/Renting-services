import { BaseQueryApi } from "@reduxjs/toolkit/dist/query"
import { FetchArgs, FetchBaseQueryArgs, } from "@reduxjs/toolkit/dist/query/fetchBaseQuery"
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers"

type prepareHeaders = (
    headers: Headers,
    api: {
      getState: () => unknown
      extra: unknown
      endpoint: string
      type: 'query' | 'mutation'
      forced: boolean | undefined
    }
  ) => Headers | void

  export default prepareHeaders

  export type BaseQueryFn<
  Args = any,
  Result = unknown,
  Error = unknown,
  DefinitionExtraOptions = {},
  Meta = {}
> = (
  args: Args,
  api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions
) => MaybePromise<QueryReturnValue<Result, Error, Meta>>

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E
      data?: undefined
      meta?: M
    }
  | {
      error?: undefined
      data: T
      meta?: M
    }