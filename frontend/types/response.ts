export interface Response<R> {
  code: number
  message: string
  result: R
}