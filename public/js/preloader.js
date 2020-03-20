function Preloader(v) {

   window.addEventListener('load', function() {
       var video = document.querySelector(v);
       var container = video.parentNode;
       var preloader = document.createElement('div');
       var vWidth = window.getComputedStyle(video, null).getPropertyValue('width');
       var vHeight = window.getComputedStyle(video, null).getPropertyValue('height');

       container.style.position = 'relative';
       video.style.position = 'absolute';
       preloader.style.position = 'absolute';
       preloader.style.width = vWidth;
       preloader.style.height = vHeight;
       preloader.style.backgroundColor = '#000';
       preloader.innerHTML = '<img src="images/preloader.gif">';

       container.appendChild(preloader);

       function checkLoad() {
            if (video.readyState === 4) {
                container.removeChild(preloader);
            } else {
                setTimeout(checkLoad, 100);
            }
       }

       checkLoad();

   });

}