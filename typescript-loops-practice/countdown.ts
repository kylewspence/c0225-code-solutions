/* exported countdown */
function countdown(num: unknown): number[] {
  for (let i = num; i >= 0; i--)
    return countdown(num)
}
