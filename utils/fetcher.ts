export async function fetcher(url: string, token: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const res = await fetch(url, {
    method: "get",
    headers: new Headers({ "Content-Type": "application/JSON", token }),
    credentials: "same-origin",
  });
  return res.json();
}
