let lib={};
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
