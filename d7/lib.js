let lib={};
//設計彈幕系統

lib.BulletSystem=function(){
    this.bullets=[]; //儲存在彈幕中的子彈
    this.update = function (){
        //每4回合新增一顆子彈
        if(game.circle%4 == 0){
            this.bullets.push(new lib.bullet())
        }
        //更新每一顆子彈
        for (let i=0 ; i<this.bullets.length; i++){
            if ( this.bullets[i].update()) {
                this.bullets.splice(i,1);
                i--;
            }
        }
        //碰撞偵測
        let bullet , threshold, distance;
        for(let i=0;i<this.bullets.length;i++){
            bullet=this.bullets[i];
            threshold = bullet.size+game.plane.size/2;//子彈跟飛機接觸得距離
            distance=Math.sqrt(
                Math.pow(game.plane.x-bullet.x, 2)+
                Math.pow(game.plane.y-bullet.y, 2)
            );
            if(distance<=threshold){
                console.log('Game Lose')
                game.over = true;
                break;
            }
        }
    };
    this.draw=function () {
        /*
        動畫分鏡
        let reminder = game.circle%30;
        if(reminder<10){
            img=res.img.p0
        }else if(reminder<20){
            img = res.img.p1
        }else if(reminder<30){
            img = res.img.p2
        }
         */
        //重畫每一顆子彈
        for(let i=0;i<this.bullets.length;i++){
            this.bullets[i].draw();
        }
    }
}

lib.bullet = function () {
    let seed = Math.random()
    if(seed>0.75){ //25%機率左到右
        this.x = 0;
        this.y = Math.random()*ctx.canvas.height;
        this.vx = Math.random()*1+0.5 ;
        this.vy = Math.random()*2-1 ;
    }else if(seed>0.5){ //25%機率右到左
        this.x = ctx.canvas.width;
        this.y = Math.random()*ctx.canvas.height;
        this.vx = Math.random()*1-1.5;
        this.vy = Math.random()*2-1;
    }else if(seed>0.25){ //25%機率上到下
        this.x = Math.random()*ctx.canvas.width;
        this.y = 0;
        this.vx = Math.random()*1-0.5;
        this.vy = Math.random()*1+0.5
    }else{//25%機率下到上
        this.x = Math.random()*ctx.canvas.width;
        this.y = ctx.canvas.height;
        this.vx = Math.random()*2-1;
        this.vy = Math.random()*1-1.5;
    }


    this.size=1;
    this.update=function () {
        this.x +=this.vx;
        this.y +=this.vy;
        //清除條件：子彈的座標超出畫面
        return this.x<0 || this.x>ctx.canvas.width
        || this.y<0 || this.y>ctx.canvas.height;
    };
    this.draw=function () {
        ctx.save();
        ctx.fillStyle="white";
        ctx.beginPath();
        //(水平位置，垂直位置,大小,初始位置角度,結束的位置角度)
        ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
        ctx.fill();
        ctx.restore();
    }
}




lib.Plane = function () {
    //初始位置
    this.x = ctx.canvas.width/2;
    this.y = ctx.canvas.height/2;
    this.size = 20;
    this.updated=()=> {
        let speed = 1;
        if(game.key.space){
            speed = 2
        }
        //不用else 是因為可以讓使用使用者同時用兩個案件·彼此互相存在觸發
        if(game.key.left){
            this.x -= speed
        }
        if (game.key.top) {
            this.y -= speed
        }
        if (game.key.right) {
            this.x += speed
        }
        if (game.key.bottom) {
            this.y += speed
        }
        return false
    };

    /*
    ctx.save()
    ctx.restore()
     */
    this.draw=()=>{
        ctx.save()
        ctx.drawImage(res.img.plane,
            this.x-this.size/2,
            this.y-this.size/2,
            this.size,this.size
            )
        ctx.restore()
    }
}
