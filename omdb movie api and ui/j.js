
let imagearray=[
  "https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-0-1z5469034/cover/1920x77053c4c05a41264776bf4ebfae97be5515.jpg",
  "https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-101-10z5458335/cover/1920x7705f44eddfabda4a06b7d21d15aa224f04.jpg",
  "https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-101-10z5410076/cover/1920x7701ad813348f11484b8471f760467c4fe1.jpg",
  "https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-0-1z5437988/cover/1920x7708e6cb3caa784411e843a43a4af4595ae.jpg",
  "https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-0-1z5454041/cover/1920x7701164cd9a3a114beda17aff22a7b434d8af6fdba0d39948c99ef0a25dc78c8943.jpg",
  "https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-6-4z5297873/cover/1920x7704c196d432305459c867171d5793e95f5.jpg",
  "https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-101-10z5481787/cover/1920x77018160673203c4133a79e2a5d5d0536ea.jpg",
  "https://akamaividz2.zee5.com/image/upload/w_1013,h_405,c_scale,f_webp,q_auto:eco/resources/0-6-4z5297873/cover/1920x7704c196d432305459c867171d5793e95f5.jpg",
  
];


window.addEventListener("load",startimageslider); // load event occure and function call

var idt;
let index;
function startimageslider(){
  let image=document.getElementById("img"); // catch img tag under child div
  index=0;
  idt=setInterval(function (){
      if(index==imagearray.length){
          index=0;
      }
  
    image.src=imagearray[index];
    index++;
  },3000)
}

function Time(){
  this.cleartime=function (){
      clearInterval(idt);
  }
  this.cleartime();
}
function Previous(){
  this.time=new Time();
  this.time.cleartime();
  let image=document.getElementById("img");
  index--;
  if(index<0){
      index=imagearray.length-1;
  }
  image.src=imagearray[index];

}

function Next(){

  let image=document.getElementById("img");
  this.time=new Time();
  this.time.cleartime();

index++;
if(index==imagearray.length){
  index=0;
}
image.src=imagearray[index];
console.log(index)
}

/**above we are implemented image slider functions */

window.addEventListener("load",f);
function searchbar(){
    let div=document.getElementById("searchdiv");
    div.setAttribute("class","searchbardiv")
}
function f(){
  let nv=document.getElementById("navbar");
  nv.setAttribute("class","navbar");
  setTimeout(function(){
         searchbar();
  },1000)
}
let intvarl;
let bfv=0;
function displaymovie(){
  document.getElementById("container").innerHTML="";
  /**buffer system start */
  let bf=document.getElementById("buffer");
  document.getElementById("resultstatedisplay").textContent="";
  
  setTimeout(function(){
    bf.style.display="flex";
  },800)
  let bfd=document.getElementById("bfd");
 //bfd.setAttribute("class","bufferdiv")
intvarl=setInterval(function(){
    bfd.style.transition="1s"
    let r=1*bfv;
    let c=r;
    bfd.style.transform=`rotate(${c}deg)`
    bfv+=2;
 },10)

 /** buffer end above we desing the buffer animation with help of js */
 
  let convertedinput="";
  let input=document.getElementById("searchname").value;// here we catch the search query
  for(let i=0;i<input.length;i++){
    if(input[i]==" "){
      convertedinput+="+";
    }
    else{
      convertedinput+=input[i];
    }
  }

  /**above we run a loop in search keyword if any position we find space that position
   * we add + symbol for querying simpliciy with api througn server
   */

  fetch(`https://www.omdbapi.com/?s=${convertedinput}&apikey=5059992c`)/**here we start fetching 
  process of search query */
  .then((data)=>{
    data=data.json()
    .then((info)=>{
      displaymoviedivs(info.Search) // after success of fild the query
      // call displaymoviedivs function and pass our search result

    }

    )
  }

  )
  .catch(function(err){
  console.log(`${err}`);
  displaymoviedivs();
  })
}

function displaymoviedivs(search){ // first we catch he search input as a parem
  /**timeout */
 setTimeout(function(){
  let bf=document.getElementById("buffer");
  bf.style.display="none";
  clearInterval(intvarl);
  bfv=0;

  if(search==undefined){
    console.log("Not found")
    document.getElementById("resultstatedisplay").innerText=`NO results found`;
  }
  else{
    document.getElementById("resultstatedisplay").innerText=`${search.length} results found`;
    console.log(search);
  }
  displaydata(search)
 },3000)
 /**timeout here after five seconds we display off bf div and clear
  * buffer system timeInterval
 */
}

function displaydata(finaldata){
  /**in this funciton we finally create div sp img and append 
   * server data to the and finally to main conatainer
   * 
   */
  let container =document.getElementById("container");
  //cated the main container body
for(let i=0;i<finaldata.length;i++){ // run a loop over geted data []
let cart=document.createElement("div");
cart.setAttribute("class","cart");
let imgpart=document.createElement("div");
imgpart.setAttribute("class","imgpart");
let infopart=document.createElement("div");
infopart.setAttribute("class","infopart");
let poster=document.createElement("img");
poster.setAttribute("class","poster");
let title=document.createElement("p");
let type=document.createElement("p");
let year=document.createElement("p");
let movieid=document.createElement("p");


poster.src=finaldata[i].Poster;
title.textContent=`Title: ${finaldata[i].Title}`;
type.textContent=`Movie type ${finaldata[i].Type}`;
year.textContent=`Release year ${finaldata[i].Year}`;
movieid.textContent=`IMDB movie id ${finaldata[i].imdbID}`;

imgpart.append(poster);

infopart.append(title);
infopart.append(type);
infopart.append(year);
infopart.append(movieid);

cart.append(imgpart);
cart.append(infopart);
container.append(cart);


}

}