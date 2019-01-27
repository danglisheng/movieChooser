
window.onload=function(){
    let outterCircle=document.querySelector("#outterCircle");
    let screenWidthByEightyPercent=window.innerWidth*.5*.7;
    let screenHeightByEightyPercent=window.innerHeight*.5*.7;
    var outterCircleDiameter=Math.min(screenWidthByEightyPercent,screenHeightByEightyPercent);
    let movieData;
    function setAllCircleSizes(){
        let screenWidthByEightyPercent=window.innerWidth*.5*.7;
        let screenHeightByEightyPercent=window.innerHeight*.5*.7;
        var outterCircleDiameter=Math.min(screenWidthByEightyPercent,screenHeightByEightyPercent)
        outterCircle.style.width=outterCircleDiameter+"px"
        outterCircle.style.height=outterCircleDiameter+"px"
       
    }
    // @ alpha 偏离x轴正向的角度值
    function getSingleStarPos(a){
        let alpha=Math.PI/180*a;
        let vh=window.innerHeight;
        let vw=window.innerWidth;
        let starWrapperWidth=document.querySelector(".star-wrapper").offsetWidth;
        
        let starWrapperHeight=document.querySelector(".star-wrapper").offsetHeight;
        let layoutRadius=Math.min(vh/4,vw/4);
        let layoutCenter={
            x:vw/2,
            y:vh/2
        };
        // starWrapper中心的坐标
         let starWrapperCenter={
             x:layoutCenter.x+layoutRadius*Math.cos(alpha),
             y:layoutCenter.y-layoutRadius*Math.sin(alpha)
         }
        
         return {
             left:starWrapperCenter.x-starWrapperWidth/2,
             top:starWrapperCenter.y-starWrapperHeight/2
         }

    }
    function setAllStarPos(){
        let starObj={
            ".tip-1":150,
            ".tip-2":90,
            ".tip-3":30
        }
        let starWrapperWidth=document.querySelector(".star-wrapper").offsetWidth;
       
        let starWrapperHeight=document.querySelector(".star-wrapper").offsetHeight;
        for(var key in starObj){
            let ele=document.querySelector(key);
           
            let elePosObj=getSingleStarPos(starObj[key]);
            ele.style.left=elePosObj.left+"px";
            ele.style.marginLeft=-starWrapperWidth/2+"px";
            ele.style.top=elePosObj.top+"px";
            ele.style.marginTop=-starWrapperHeight/2+"px";
        }
    }
    function setAllStarSize(){
        let starWrapperWidth=document.querySelector(".star-wrapper").offsetWidth;
       
        
        let stars=document.querySelectorAll(".triangle")
        let topStars=document.querySelectorAll(".up-triangle")
        let bottomStars=document.querySelectorAll(".down-triangle")
        stars.forEach(s=>{
            
            s.style.borderWidth=starWrapperWidth/2+"px";
           
        })
        topStars.forEach(s=>{
            
            s.style.borderTopWidth=starWrapperWidth+"px";
            s.style.top=starWrapperWidth/4+"px";
        })
        bottomStars.forEach(s=>{
            
            s.style.borderBottomWidth=starWrapperWidth+"px";
            s.style.bottom=starWrapperWidth/4+"px";
        })
    }
    function fetchMovieData(){
        var movie=fetch("./movie.json")
        .then(res=>{
            return res.json();
        })
        .then((data)=>{
            console.log("moveData",data);
            movieData=data.movies;
        })
    }
    function init(){
        setAllCircleSizes();
        setAllStarSize();
        setAllStarPos();
    }
    
    window.addEventListener("resize",function(){
       init();
    })
    init();
    fetchMovieData();
    Velocity(outterCircle, { 
        left:window.innerWidth-outterCircleDiameter,
        
        }, { 
        duration: 10000,
       
         });
    Velocity(outterCircle, { opacity: 1,
        bottom:window.innerHeight-outterCircleDiameter
        }, { 
        duration: 5000,
        queue: false,
        
            });
    // 创建一个元素，并给它一个class
    function createAnEle(tagName,className){
        var ele=document.createElement(tagName);
        if(className){
            ele.classList.add(className);
        }
       
        return ele;
    }
    // 创建一个item
    // eleArr=[{ tagName:"div",className:"movieIdx",value:"ddd"}]
    function createAnItem(eleArr,parentNode){
        // var name=createAnEle("div","name");
        var name=createAnEle(eleArr[0].tagName,eleArr[0].className);

        // var movieIdx=createAnEle("span","movie-index");
        var movieIdx=createAnEle(eleArr[1].tagName,eleArr[1].className);
        movieIdx.textContent=eleArr[1].value;
        // var movieName=createAnEle("span");
        var movieName=createAnEle(eleArr[2].tagName,eleArr[2].className);
        movieName.textContent=eleArr[2].value;
        name.appendChild(movieIdx);
        name.appendChild(movieName);
        parentNode.appendChild(name)
    }
    // 创建items
    function createItems(itemArr,parentNode){
        itemArr.forEach((i)=>{
            createAnItem(i,parentNode);
        })
    }
    function generateSingleMovieBox(movieObj,idx){
        var movieBox=document.createElement("div");
        movieBox.classList.add("movie-box");

       
        createItems([
            [
                {
                    tagName:"div",
                    className:"name",
                    
                },
                
                {
                    tagName:"span",
                    className:"movie-index",
                    value:idx+1+"."
                },
                {
                    tagName:"span",
                    value:movieObj.name
                }
            ],
            [
                {
                    tagName:"div",
                    className:"specific-time-span",
                    
                },
                
                {
                    tagName:"span",
                    
                    value:'具体时段'
                },
                {
                    tagName:"span",
                    value:(function(){
                        let ts=movieObj.specificTimeSpan;
                        ts=ts.map((i)=>{
                           return i.join("-");
                        })
                        return ts.join(",");
                    })()
                }
            ],
            [
                {
                    tagName:"div",
                    className:"rating"
                },
                {
                    tagName:"span",
                    value:"评分"
                },
                {
                    tagName:"span",
                    value:movieObj.rating
                }
            ],
            [
                {
                    tagName:"div",
                    className:"type"
                },
                {
                    tagName:"span",
                    value:"类型"
                },
                {
                    tagName:"span",
                    value:movieObj.type
                }
            ]
        ],
        movieBox)

        
       

       
        
        return movieBox;
    }
    function showFisrtTimeSpan(){
        let filteredData;
        filteredData=movieData.filter((m)=>{
            return m.timeSpan.indexOf(1)!==-1;
        })
        console.log("filteredData",filteredData)
        let filterOptions=document.querySelector(".filter-options");
        filterOptions.querySelectorAll("li").forEach((c)=>{
            c.classList.remove("active");
        })
        filterOptions.querySelector(".time-span-1").classList.add("active");

        let movieWrapper1=document.querySelector(".movie-wrapper-1");
        movieWrapper1.innerHTML='';
        filteredData.forEach((movieObj,idx)=>{
           let movieBox= generateSingleMovieBox(movieObj,idx);
           movieWrapper1.appendChild(movieBox);
        })

    }
    function showSecondTimeSpan(){
        let filteredData;
        filteredData=movieData.filter((m)=>{
            return m.timeSpan.indexOf(2)!==-1;
        })
        console.log("filteredData",filteredData)
        let filterOptions=document.querySelector(".filter-options");
        filterOptions.querySelectorAll("li").forEach((c)=>{
            c.classList.remove("active");
        })
        filterOptions.querySelector(".time-span-2").classList.add("active");

        let movieWrapper1=document.querySelector(".movie-wrapper-1");
        movieWrapper1.innerHTML='';
        filteredData.forEach((movieObj,idx)=>{
           let movieBox= generateSingleMovieBox(movieObj,idx);
           movieWrapper1.appendChild(movieBox);
        })

    }
    function showCertainRating(rating){
        let filteredData;
        filteredData=movieData.filter((m)=>{
            return parseInt(m.rating)===(rating);
        });
        let movieWrapper2=document.querySelector(".movie-wrapper-3");
        movieWrapper2.innerHTML='';
        filteredData.forEach((movieObj,idx)=>{
           let movieBox= generateSingleMovieBox(movieObj,idx);
           movieWrapper2.appendChild(movieBox);
        })
    }
    function showCertainType(type){
        let filteredData;
        filteredData=movieData.filter((m)=>{
            return m.type.indexOf(type)!==-1;
        });
        let movieWrapper2=document.querySelector(".movie-wrapper-2");
        movieWrapper2.innerHTML='';
        filteredData.forEach((movieObj,idx)=>{
           let movieBox= generateSingleMovieBox(movieObj,idx);
           movieWrapper2.appendChild(movieBox);
        })
    }
    function hideAllPanelThenShowOne(p){
        let panels=document.querySelectorAll(".show-panel");
        panels.forEach((p)=>{
            p.style.display="none";
        })
        var panel=document.querySelector(`.${"panel-"+p.slice(-1)}`);
        console.log("panel",panel);
        panel.style.display="block";

        let num=p.slice(-1);
        if(parseInt(num)===1){
            // 显示第一个时间段
            showFisrtTimeSpan();
        }
        else if(parseInt(num)===2){
            // 显示 动作片
            showCertainType('动作');
            let filterOptions=document.querySelectorAll(".filter-options")[1];
            filterOptions.querySelectorAll("li").forEach((c)=>{
                c.classList.remove("active");
                if(c.classList.contains("type-1")){
                    c.classList.add("active");
                }
            })
        }
        else if(parseInt(num)===3){
            // 显示 动作片
            showCertainRating(7);
            let filterOptions=document.querySelectorAll(".filter-options")[2];
            filterOptions.querySelectorAll("li").forEach((c)=>{
                c.classList.remove("active");
                if(c.classList.contains("rating-7")){
                    c.classList.add("active");
                }
            })
        }
    }
    let allStarWrappers=document.querySelectorAll(".star-wrapper");

    allStarWrappers.forEach((s)=>{
        s.addEventListener("click",function(e){
            console.log(e.currentTarget.className)
            var classNameArr=e.currentTarget.className.split(" ");
            var tipHandler;
            classNameArr.forEach((c)=>{
                if(c.indexOf("tip")!==-1){
                    tipHandler=c;
                }
            })
            console.log("tipHandler",tipHandler)
            hideAllPanelThenShowOne(tipHandler)
        })
    });
    // 绑定筛选面板的事件
    function bindShowPanelEvent(){
        let backIcon=document.querySelectorAll(".back-icon");
        backIcon.forEach((b)=>{
            b.addEventListener("click",function(e){
                let target=e.currentTarget;
                target.parentNode.parentNode.style.display="none";
            })
        });
        let filterOptions=document.querySelectorAll(".filter-options");
        filterOptions.forEach(f=>{
            f.addEventListener("click",function(e){
                let target=e.target;
               
                f.querySelectorAll("li").forEach((c)=>{
                    c.classList.remove("active");
                })
                var idx=target.className.slice(-1);
    
                if(target.className.indexOf("span")!==-1){
                    switch(idx){
                        case "1":showFisrtTimeSpan();break;
                        case "2":showSecondTimeSpan();break;
                        default:break;
                    }
                }
                else if(target.className.indexOf("type")!==-1){
                    let typeObj={
                       "type-1":"动作",
                       "type-2":"冒险",
                       "type-3":"喜剧",
                       "type-4":"科幻",
                        "type-5":"爱情",
                        "type-6":"奇幻",
                        "type-7":"动画"
                    }
                    showCertainType(typeObj[target.className]);
                }
                else if(target.className.indexOf("rating")!==-1){
                    showCertainRating(parseInt(idx));
                }
                target.classList.add("active");
            })
        })
       

    }
    bindShowPanelEvent();
        
}