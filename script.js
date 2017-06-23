 var imgs = document.getElementsByTagName('img');
    for(var index = 0; index < imgs.length;  ){
        var url = imgs[0].getAttribute('data-src') + '&tp=webp&wxfrom=5&wx_lazy=1';
        //imgs[index].setAttribute('src', url);
        var parent = imgs[0].parentNode;
        parent.innerHTML = '<div id="image_kill_referrer"></div>';
        
        parent.childNodes[0].innerHTML = ReferrerKiller.imageHtml(url);
    }

    var iframes = document.getElementsByTagName('iframe');
    var resize = function(){
        for(var index = 0;index < iframes.length ; index++){
            /*iframes[index].setAttribute('width', document.scrollWidth);
            iframes[index].setAttribute('height', document.scrollHeight);*/
            var src = iframes[index].getAttribute('data-src')
            if(src){
                iframes[index].setAttribute('src', src);
                iframes[index].removeAttribute('data-src');
            }
        }
    }

    resize();