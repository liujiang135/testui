import $ from "jquery";
var leftDelet={
	swipper:function(){
		var expansion = null; //是否存在展开的list
		 var x, y, X, Y, swipeX, swipeY;
		$(".item-icon-left").on("touchstart",function(e){
			   x = event.changedTouches[0].pageX;
		        y = event.changedTouches[0].pageY;
		        swipeX = true;
		        swipeY = true ;
		        if(expansion){   //判断是否展开，如果展开则收起
		            $(".item-icon-left").removeClass("swipeleft");
		        }
		   $(this).on("touchmove",function(){
			    X = event.changedTouches[0].pageX;
		        Y = event.changedTouches[0].pageY;        
		        // 左右滑动
		        if(swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0){
		            event.stopPropagation();
		            if(X - x > 10){   //右滑
		                $(this).removeClass("swipeleft");
		                this.hrefFlg=true;
		            }
		            if(x - X > 10){   //左滑
		                $(this).addClass("swipeleft")
		                this.hrefFlg=false;
		                expansion = this;
		               	event.preventDefault();
		               	return false;
		            }
		            swipeY = false;
		        }
		        // 上下滑动
		        if(swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
		            swipeX = false;
		        }
			})
		})
		
	},
//	delete:function(){
//		$(".delete").on("click",function(){
//			console.log($(this).attr("data-id"));
//			event.stopPropagation();
//			return false;
//		})
//	},
	
}
export default leftDelet;