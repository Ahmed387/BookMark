let Snameinput=document.getElementById("sitename");
let Surlinput=document.getElementById("urlname");
let B=document.getElementById("BUTT");
let B1=document.getElementById("BUTT1");
let war=document.getElementById("warn");
let search=document.getElementById("inputsearch");
let Allbookmarks=[];

var bookmarkindexupdated;
Re();
if(localStorage.getItem("marks")===null)
  {
    Allbookmarks=[];
  }
  else
  {
    Allbookmarks=JSON.parse(localStorage.getItem("marks"));
    Display();
  }

document.getElementById("BUTT").onclick=function Add()
{
  let newbookmark=
  {
    name:Snameinput.value,
    url:Surlinput.value, 
  };
Allbookmarks.push(newbookmark);
console.log(Allbookmarks);
localStorage.setItem("marks",JSON.stringify(Allbookmarks));
Display();
reset();
Re();
}

function Display()
{
  let cartona="";
  for (let i = 0; i < Allbookmarks.length; i++) 
  { 
    cartona+=
    `
    <tr>
    <td># ${i+1}</td>
    <td>${Allbookmarks[i].name}</td>
    <td><button class="btn btn-info"><a class="text-decoration-none text-white" href="${Allbookmarks[i].url}"target="blank">visit</a></button></td>
    <td><button class="btn btn-success" onclick="Update(${i})">update</button></td>
    <td><button class="btn btn-danger" onclick="Delete(${i})"  >Delete</a></button></td>
    </tr>
    `
    
  }
  document.getElementById("row").innerHTML=cartona;
 Re(); 
}




function reset()
{
  Snameinput.value=null;
  Surlinput.value=null;
}

function Delete(index) {
  
  Allbookmarks.splice(index,1);
  localStorage.setItem("marks",JSON.stringify(Allbookmarks));
  Display();
}



//this return Id,value;
function validate(el)

{
  let regex=
  {
    sitename:/./,
    urlname:/^https?:?./,
  }
  if(regex[el.id].test(el.value)&&Snameinput!=""&&Surlinput!="")
    {
      el.style.color="green";
      el.classList.add(`is-valid`);
      el.classList.remove("is-invalid");
      war.classList.replace("d-block","d-none");
      B.classList.replace("d-none","d-block");
      
    }
    else
    {
      el.style.color="red";
      el.classList.add(`is-invalid`);
      el.classList.remove("is-valid");
      B.classList.replace("d-block","d-none");
      war.classList.replace("d-none","d-block");
      
    }
}


function Update(index)
{
  bookmarkindexupdated=index;
  Snameinput.value=Allbookmarks[index].name;  
  Surlinput.value=Allbookmarks[index].url;
B.classList.replace("d-block","d-none");
B1.classList.replace("d-none","d-block");
console.log(index);
}

function FUpgrade()
{
console.log("hello");
B1.classList.replace("d-block","d-none");
B.classList.replace("d-none","d-block");
let newbookmark=
{
  name:Snameinput.value,
  url:Surlinput.value, 
};

  Allbookmarks.splice(bookmarkindexupdated,1,newbookmark);
  localStorage.setItem("marks",JSON.stringify(Allbookmarks));
  Display();
  reset();
}


function Re() 
{
  Snameinput.classList.remove("is-valid");
  Surlinput.classList.remove("is-valid");
  Snameinput.classList.remove("is-invalid");
  Surlinput.classList.remove("is-invalid"); 
  if( Snameinput.value===null||Surlinput.value===null)
    {
      Snameinput.classList.remove("is-valid");
  Surlinput.classList.remove("is-valid");
  Snameinput.classList.remove("is-invalid");
  Surlinput.classList.remove("is-invalid"); 
      
    }

}



search.oninput=function searchY()
{
//  console.log(search.value);
let cartona="";
  for (let i = 0; i < Allbookmarks.length; i++) 
  {
    
    if(Allbookmarks[i].name.toLowerCase().includes(search.value.toLowerCase()))
{
    cartona+=
    `
    <tr>
    <td># ${i+1}</td>
    <td>${Allbookmarks[i].name}</td>
    <td><button class="btn btn-info"><a class="text-decoration-none text-white" href="${Allbookmarks[i].url}"target="blank">visit</a></button></td>
    <td><button class="btn btn-success" onclick="Update(${i})">update</button></td>
    <td><button class="btn btn-danger" onclick="Delete(${i})">Delete</a></button></td>
    </tr>
    `
  }
  else if(search.value=='')
    {
      cartona+= 
       `
      <tr>
      <td># ${i+1}</td>
      <td>${Allbookmarks[i].name}</td>
      <td><button class="btn btn-info"><a class="text-decoration-none text-white" href="${Allbookmarks[i].url}"target="blank">visit</a></button></td>
      <td><button class="btn btn-success" onclick="Update(${i})">update</button></td>
      <td><button class="btn btn-danger" onclick="Delete(${i})">Delete</a></button></td>
      </tr>
      `
    }
  document.getElementById("row").innerHTML=cartona;
 
 }
}