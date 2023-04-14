const cursor = document.querySelector('.cursor');
var timeout;

function isDesktop() {
  return window.matchMedia('(min-width: 1024px)').matches;
}

if (isDesktop()) {
  //follow cursor on mousemove
  document.addEventListener('mousemove', (e) => {
    let x = e.pageX;
    let y = e.pageY;

    cursor.style.top = y + 'px';
    cursor.style.left = x + 'px';
    cursor.style.display = 'block';

    //cursor effects when mouse stopped
    function mouseStopped() {
      cursor.style.display = 'none';
    }
    clearTimeout(timeout);
    timeout = setTimeout(mouseStopped, 1000);
  });

  //cursor effects when mouseout
  document.addEventListener('mouseout', () => {
    cursor.style.display = 'none';
  });
}
