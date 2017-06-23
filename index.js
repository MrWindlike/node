Vue.component('component', {
  template: `
  	<div>
  		<ul>
  			<li v-for="wechat of wechats" >
  				<a :href="wechat">{{wechat}}</a>
  			</li>
  		</ul>
		
  	</div>
  	`,
  data : function(){
  	return {
  		wechats : []
  	}
  },
  created : function(){
  	/*axios.get('http://192.168.1.100/').then((result)=>{
  		console.log(result);
  		this.wechats = result.data;
  	});*/
    var _this = this;
    fetch('http://192.168.1.100/')  
      .then(  
        function(response) {  
          if (response.status !== 200) {  
            console.log('Looks like there was a problem. Status Code: ' +  
              response.status);  
            return;  
          }

          // Examine the text in the response  
          response.json().then(function(data) {  
            console.log(data);  
            _this.wechats = data;
          });  
        }  
      )  
      .catch(function(err) {  
        console.log('Fetch Error :-S', err);  
      });
  }
})

new Vue({
  el: '#app'
})