// routeHistory.js
const routeHistory = [];

function pushRoute(route) {
  routeHistory.push(route);
}

function popRoute() {
  return routeHistory.pop();
}

export { pushRoute, popRoute };
