var l = document.getElementById("location");
var l1 = document.getElementById("location1");
var canavas = <HTMLCanvasElement>document.getElementById("canavas");
var Draw = <HTMLInputElement>document.getElementById("Draw");
var Start = <HTMLInputElement>document.getElementById("Start");
var Finish = <HTMLInputElement>document.getElementById("Finish");
var Remove = <HTMLInputElement>document.getElementById("Remove");
var removeAllWall = <HTMLButtonElement>document.getElementById("removeAllWall");
var aStar = <HTMLButtonElement>document.getElementById("aStar");
var reset = document.getElementById("reset");
var myInterval: number|undefined=undefined;
var _location: location_num = {
  x: 0,
  y: 0,
};
var wall: any = {};
var wait: any = {};
var step: any = {};
var result: point[] = [];
var start: location_num | undefined;
var finish: location_num | undefined;
var _stop: boolean = false;

removeAllWall.addEventListener("click", () => {
  for (const key in wall) {
    if (Object.prototype.hasOwnProperty.call(wall, key)) {
      let element: location_num = wall[key];
      Draw_f(element.x, element.y, "white");
      console.log(wall[key].x + ":" + wall[key].y);
      delete wall[key];
    }
  }
});
document.addEventListener("mousemove", (ev: MouseEvent) => {
  _location.x = nP(ev.clientX, 20);
  _location.y = nP(ev.clientY, 20);
  app1(ev.clientX + " " + ev.clientY);
});
document.addEventListener("keypress", (ev: KeyboardEvent) => {
  if (
    _location.x < 0 ||
    _location.y < 0 ||
    _location.x > 60 ||
    _location.y > 30
  ) {
    return;
  }
  app(JSON.stringify(_location));
  switch (ev.key) {
    case Draw.value:
      Draw_f(_location.x, _location.y, "Blue");
      var s: location_num = {
        x: _location.x,
        y: _location.y,
      };
      wall[_location.x + " " + _location.y] = s;

      break;
    case Start.value:
      var s: location_num = {
        x: _location.x,
        y: _location.y,
      };
      if (!_checkWallNull(s.x, s.y)) {
        return;
      }
      if (start) {
        Draw_f(start.x, start.y, "white");
      }
      start = s;
      Draw_f(_location.x, _location.y, "red");
      break;
    case Finish.value:
      var s: location_num = {
        x: _location.x,
        y: _location.y,
      };
      if (!_checkWallNull(s.x, s.y)) {
        return;
      }
      if (finish) {
        Draw_f(finish.x, finish.y, "white");
      }
      finish = s;
      Draw_f(_location.x, _location.y, "green");
      break;
    case Remove.value:
      Draw_f(_location.x, _location.y, "white");
      delete wall[_location.x + " " + _location.y];
      break;
  }
});
document.addEventListener("click", (ev) => {
  if (
    _location.x < 0 ||
    _location.y < 0 ||
    _location.x > 60 ||
    _location.y > 30
  ) {
    return;
  }
  app(JSON.stringify(_location));
  Draw_f(_location.x, _location.y, "Blue");
  var s: location_num = {
    x: _location.x,
    y: _location.y,
  };
  wall[_location.x + " " + _location.y] = s;
});
aStar.addEventListener("click", () => {
  var key = start?.x + " " + start?.y;

  if (!start || !finish) {
    alert("chưa khái báo");
    return;
  }
  var s: point = {
    distanceFisrtPoint: 0,
    distanceLastPoint: distance(start, finish),
    location: start,
    preNamePoint: key,
  };
  wait[key] = s;
  if (myInterval!=undefined) {
    clearInterval(myInterval);
  }
  myInterval = setInterval(_Astart, 10);
});
reset?.addEventListener("click", () => {
  for (const key in step) {
    if (Object.prototype.hasOwnProperty.call(step, key)) {
      const element: point = step[key];
      Draw_f(element.location.x, element.location.y, "white");
      delete step[key];
    }
  }
  for (const key in wait) {
    if (Object.prototype.hasOwnProperty.call(wait, key)) {
      const element: point = wait[key];
      Draw_f(element.location.x, element.location.y, "white");
      delete wait[key];
    }
  }
  result.map((v: point) => {
    Draw_f(v.location.x, v.location.y, "white");
  });
  result = [];
  if (start && finish) {
    Draw_f(start?.x, start?.y, "red");
    Draw_f(finish?.x, finish?.y, "green");
  }
  clearInterval(myInterval);
  _stop = false;
});

function _checkWallNull(x: number, y: number) {
  return wall[x + " " + y] == undefined;
}

function _Astart() {
  if (_stop) {
    return;
  }
  let _key: string | undefined = findBestPointInWait();
  if (_key == undefined) {
    _stop = true;
    alert("Stop Ket Qua");
    return;
  }

  let nowStep: point = wait[_key];
  step[_key] = nowStep;
  Draw_f(nowStep.location.x, nowStep.location.y, "pink");
  delete wait[_key];

  addPointToWait(_key);

  if (_key == finish?.x + " " + finish?.y) {
    _stop = true;
    path();
    return;
  }
}

function findBestPointInWait() {
  debugger
  var _key: string | undefined = undefined;
  for (const key in wait) {
    if (_key == undefined) {
      _key = key;
      continue;
    }
    if (minPointStar(wait[key], wait[_key])) {
      _key = key;
    }
  }

  return _key;
}
function addPointToWait(key: string) {
  debugger;
  let numberLocation: string[] = key.split(" ");
  let x: number = parseInt(numberLocation[0]);
  let y: number = parseInt(numberLocation[1]);
  neighborhoodPoint(x + 1, y, key);
  neighborhoodPoint(x - 1, y, key);
  neighborhoodPoint(x, y + 1, key);
  neighborhoodPoint(x, y - 1, key);

  neighborhoodPoint(x - 1, y - 1, key);
  neighborhoodPoint(x + 1, y - 1, key);
  neighborhoodPoint(x - 1, y + 1, key);
  neighborhoodPoint(x + 1, y + 1, key);
}

function neighborhoodPoint(x: number, y: number, keyPrePoint: string) {
  var nowKey: string = x + " " + y;
  if (x < 0 || y < 0 || x >= 60 || y >= 30) {
    return;
  }
  if (wall[nowKey] != undefined) {
    return;
  }
  if (step[nowKey] != undefined) {
    return;
  }

  if (finish == null) {
    return;
  }
  var nowPoint: point = {
    preNamePoint: keyPrePoint,
    distanceFisrtPoint: (step[keyPrePoint].distanceFisrtPoint + 1),
    distanceLastPoint: distance({ x: x, y: y }, finish),
    location: {
      x: x,
      y: y,
    },
  };
  if (wait[nowKey]) {
    if (minPointStar(nowPoint, wait[nowKey])) {
      wait[nowKey] = nowPoint;
    }
  } else {
    wait[nowKey] = nowPoint;
  }
  Draw_f(nowPoint.location.x, nowPoint.location.y, "yellow");
}
function path() {
  var keyFinishPoint: string = finish?.x + " " + finish?.y;
  while (step[keyFinishPoint] != undefined) {
    var s: point = step[keyFinishPoint];
    result.push(s);
    Draw_f(s.location.x, s.location.y, "black");
    delete step[keyFinishPoint];
    keyFinishPoint = s.preNamePoint;
  }
}

// var image = new Image();
//   image.onload=()=>{
//     Promise.resolve(createImageBitmap(image))
//     .then((v)=>{
//       var ctx = canavas.getContext("2d");
//       if (ctx == null) {
//         return;
//       }
//       ctx.drawImage(image,x*20,y*20);
//     })
//   }
//   image.src="./wait.png"
