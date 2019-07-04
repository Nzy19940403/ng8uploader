/// <reference lib="webworker" />
debugger
addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  debugger
  postMessage(response);
});

