export async function fetcher(...args: any[]) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const res = await fetch(...args);
  return res.json();
}
