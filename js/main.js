(function(){
  'use strict';
  var timer = document.getElementById('timer');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var reset = document.getElementById('reset');
  var startTime;
  var timerId;
  var elapsedTime = 0;
  var isRunning = false;

  stop.style.display = 'none';
  function UpdateTimer(time){
    var d = new Date(time);
    var min = d.getMinutes();
    var sec = d.getSeconds();
    var msec = d.getMilliseconds();
    min = ( '0' + min ).slice(-2);
    sec = ( '0' + sec ).slice(-2);
    msec = ( '00' + msec ).slice(-3);
    timer.textContent = min + ':' + sec + '.' + msec;
    document.title = timer.textContent;
  }
  function CountUp(){
    timerId = setTimeout(function(){
      elapsedTime = Date.now() - startTime;
      if(elapsedTime >= 59*60*1000+59*1000){
        alert("One hour has passed!!!")
        elapsedTime = 0;
        UpdateTimer(0);
        return;
      }
      console.log(elapsedTime);
      UpdateTimer(elapsedTime);
      CountUp();
    },10);
  }
  start.addEventListener('click',function(){
    if(isRunning === false && elapsedTime === 0){
      isRunning = true;
      start.style.display = 'none';
      stop.style.display = '';
      startTime = Date.now();
      CountUp();
    } else {
      isRunning = true;
      start.style.display = 'none';
      stop.style.display = '';
      startTime = Date.now() - elapsedTime;
      CountUp();
    }
  });
  stop.addEventListener('click',function(){
    if(isRunning === true){
      isRunning = false;
      start.style.display = '';
      stop.style.display = 'none';
      clearTimeout(timerId);
      UpdateTimer(elapsedTime);
    }
  });
  reset.addEventListener('click',function(){
    elapsedTime = 0;
    start.style.display = '';
    stop.style.display = 'none';
    UpdateTimer(elapsedTime);
    clearTimeout(timerId);
  });
})();
