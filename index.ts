declare const hljs: typeof import("highlight.js/lib/core").default;

const until = <T>(
  getItem: () => T,
  check: (item: T) => boolean,
  msToWait = 10_000,
  msReqTimeout = 20,
) =>
  new Promise<T>((res, rej) => {
    const reqLimit = msToWait / msReqTimeout;
    let i = 0;
    const interval = setInterval(() => {
      if (i++ > reqLimit) exit(rej);
      const item = getItem();
      if (!check(item)) return;
      exit(() => res(item));
    }, msReqTimeout);
    const exit = (cb: () => void) => {
      clearInterval(interval);
      cb();
    };
  });

const untilAppear = <T>(getItem: () => T, msToWait?: number) =>
  until<T>(getItem, Boolean, msToWait);

untilAppear(() => document.getElementById("comments")).then((comments) => {
  let isCSSLoaded = false;
  const visited = new Set();

  const loadCSS = () => {
    fetch("https://cdn.jsdelivr.net/npm/highlight.js/styles/atom-one-dark.css")
      .then((r) => r.text())
      .then((cssText) => {
        document.head.appendChild(document.createElement("style")).innerHTML =
          cssText;
      });
  };

  const _formatter = {
    createHTML: (code: string) =>
      code.replace(
        /```(\S+)\n(.+?)```/gs,
        (_$0, $1, $2) =>
          `<code>\`\`\`${$1}\n${hljs.highlight($2, { language: $1 }).value}\`\`\`</code>`,
      ),
  };

  const formatter =
    window.trustedTypes && window.trustedTypes.createPolicy
      ? window.trustedTypes.createPolicy("highlightedCode", _formatter)
      : _formatter;

  setInterval(() => {
    for (const elem of comments!.querySelectorAll(
      "ytd-comment-view-model #content .yt-core-attributed-string",
    )) {
      let lang: string | undefined;
      if (
        !visited.has(elem) &&
        (lang = /```(\S+)\n/.exec(elem.textContent!)?.[1])
      ) {
        visited.add(elem);
        if (!isCSSLoaded) {
          loadCSS();
          isCSSLoaded = true;
        }
        elem.innerHTML = formatter.createHTML(elem.textContent!);
      }
    }
  }, 3000);
});
