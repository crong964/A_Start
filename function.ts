function app(s: string) {
  if (l?.innerHTML) {
    l.innerHTML = "";
  }
  l?.append(s);
}
function app1(s: string) {
  if (l1?.innerHTML) {
    l1.innerHTML = "";
  }
  l1?.append(s);
}
function nP(a: number, b: number) {
  return parseInt(a / b + "");
}

function Draw_f(x: number, y: number, type: string) {
  var ctx = canavas.getContext("2d");
  if (ctx == null) {
    return;
  }
  ctx.fillStyle = type;
  ctx.fillRect(x * 5, y * 5, 5, 5);
}

function distance(a: location_num, b: location_num) {
  var s = (a.x - b.x) * (a.x - b.x);
  var d = (a.y - b.y) * (a.y - b.y);
  return Math.sqrt(s + d);
}

function minPointStar(a: point, b: point) {
  var c = a.distanceLastPoint + a.distanceFisrtPoint;
  var d = b.distanceLastPoint + b.distanceFisrtPoint;
  return c < d;
}
function minPointDistra(a: point, b: point) {
  var c = a.distanceFisrtPoint;
  var d = b.distanceFisrtPoint;
  return c < d;
}
