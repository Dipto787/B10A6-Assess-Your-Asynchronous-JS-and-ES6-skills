 let loadCategaryData=async ()=>{
    let res=await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    let data=await res.json(); 
    let activeBackground=false;
    data.categories.forEach(buttonData => { 
        let buttonContainer=document.getElementById('buttons-container');
        let div=document.createElement('div');
        div.classList='flex items-center border-2 px-20 justify-center  cursor-pointer py-4 gap-2';
        div.innerHTML=`<img src="${buttonData.category_icon}"/> <h1 class="font-bold">${buttonData.category}</h1>`;
        
        
        div.addEventListener('click',function(){ 
          document.getElementById('card-container').innerHTML=' '
          document.getElementById('loader').classList.remove('hidden'); 
           setTimeout(()=>{
            document.getElementById('loader').classList.add('hidden');
            searchPetByCategoris(buttonData.category);
           },2000)
            if(activeBackground){
                activeBackground.classList.remove('rounded-full'); 
                activeBackground.classList.remove('bg-[#E7F2F2]'); 
            }
            
            div.classList.add('rounded-full');
            div.classList.add('bg-[#E7F2F2]');
            activeBackground= div;
        });
        buttonContainer.appendChild(div); 
    });
    
 }


 let cardDataLoad=async ()=>{
    let res=await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    let data=await res.json();
    
    data.pets.forEach(allPets=>{  
      console.log(allPets.price);
      
        let cardContainer=document.getElementById('card-container');
        let card=document.createElement('div');
        card.classList='border-2 p-5';
        card.innerHTML=`
        <div class="card ">
                <figure>
                  <img class="rounded-2xl w-[400px] "
                    src="${allPets.image}"
                    alt="Shoes" />
                </figure>
                <div class="space-y-2">
                  <h2 class="card-title">
                   ${allPets.pet_name
                   }
                     
                  </h2>
                  <div class="flex gap-3"><img class="" src="images/Frame (1).svg" alt=""><p>Breed: ${allPets.breed || 'Not Available' }</p></div>

                  <div class="flex gap-3"><img src="images/Frame.png" alt=""><p>Birth: ${allPets.date_of_birth || 'Not Available'
                  }</p></div>

                  <div class="flex gap-3"><img src="images/Frame (1).png" alt=""><p>Gender: ${allPets.gender || 'Not Available'}</p></div>

                  <div class="flex gap-3"><img src="images/Frame (2).png" alt=""><p>Price : ${allPets.price || 'Not Available'} $</p></div>
                <hr>
                  <div class="  flex gap-3">
                    <button onclick="likeImage('${allPets.image}')" class="btn  px-4 py-2 bg-transparent border-2 text-2xl "><i class="fa-regular fa-thumbs-up"></i></button>

                    <button onclick="adobt()" class="btn  px-4 py-2 bg-transparent border-2 text-[#0E7A81] ">Adopt</button>
                    <button onclick="showModal('${allPets.petId}')" class="btn  px-4 py-2 bg-transparent border-2 text-[#0E7A81] ">Details</button>

                  </div>
                </div>
              </div>
        `;
        cardContainer.appendChild(card);
        
    })
    
 }

let searchPetByCategoris= async (searchCategory)=>{ 
  
  
    let cardContainer=document.getElementById('card-container');
    cardContainer.innerHTML=' ';
    let res=await fetch(`https://openapi.programming-hero.com/api/peddy/category/${searchCategory}`);
    let data=await res.json();
    
    
    let notAvailave=document.getElementById('not-availve');
   if(!isNaN(data.data)){
    notAvailave.classList.remove('hidden')
    
   }else{
    notAvailave.classList.add('hidden')
   }
   
    data.data.forEach(allPets=>{ 

     
        let cardContainer=document.getElementById('card-container');
        let card=document.createElement('div');
        card.classList='border-2'
        card.innerHTML=`
        <div class="card p-5">
                <figure>
                  <img class="rounded-2xl w-[400px] "
                    src="${allPets.image}"
                    alt="Shoes" />
                </figure>
                <div class="space-y-2">
                  <h2 class="card-title">
                   ${allPets.pet_name
                   }
                     
                  </h2>
                  <div class="flex gap-3"><img class="" src="images/Frame (1).svg" alt=""><p>Breed: ${allPets.breed || 'Not Available' }</p></div>

                  <div class="flex gap-3"><img src="images/Frame.png" alt=""><p>Birth: ${allPets.date_of_birth || 'Not Available'
                  }</p></div>

                  <div class="flex gap-3"><img src="images/Frame (1).png" alt=""><p>Gender: ${allPets.gender || 'Not Available'}</p></div>

                  <div class="flex gap-3"><img src="images/Frame (2).png" alt=""><p>Price : ${allPets.price || 'Not Available'} $</p></div>
                <hr>
                  <div class="  flex gap-3">
                    <button onclick="likeImage('${allPets.image}')" class="btn  px-4 py-2 bg-transparent border-2 text-2xl "><i class="fa-regular fa-thumbs-up"></i></button>

                    <button  onclick="adobt()" class="btn  px-4 py-2 bg-transparent border-2 text-[#0E7A81] ">Adopt</button>
                    <button onclick="showModal('${allPets.petId}')" class="btn  px-4 py-2 bg-transparent border-2 text-[#0E7A81] ">Details</button>

                  </div>
                </div>
              </div>
        `;
        cardContainer.appendChild(card)
      
        
    })
    
}

let adobt=()=>{
  my_modal_1.showModal();
  let count=4;
  let conter=document.getElementById('counting')
  let counting=setInterval(() => {
    count--; 
    conter.innerHTML=count;
    if(count===-0){
      clearInterval(counting);
      my_modal_1.close();
      conter.innerHTML=' ';
    }
    console.log(count);
  }, 1000);
  
  
}


let likeImage=(data)=>{
    console.log(data);
    let likeImageContainer=document.getElementById('like-image-container');
    let div=document.createElement('div');
    div.classList='';
    div.innerHTML=`<img class="rounded-xl"  src="${data}" />`
    likeImageContainer.appendChild(div)
}

 



loadCategaryData();
document.getElementById('loader').classList.remove('hidden');
  let loader=setTimeout(()=>{
    document.getElementById('loader').classList.add('hidden');
    cardDataLoad();
  },2000)


  let showModal= async (data)=>{ 
    let res=await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${data}`);
    let resData=await res.json();
    let details=document.getElementById('show_imformation');
    console.log();
    
    details.innerHTML=`
    <div class="modal-box px-5  w-11/12 max-w-5xl">
    <div class="flex justify-center"><img class="w-[100%] rounded-2xl " src="${resData.petData.image}" /></div>
    <h3 class="text-4xl mt-5 font-bold">${resData.petData.pet_name}</h3>
    
     <div class="flex  mb-3 gap-10"> 
     <div>
       <div class="flex mt-2 gap-2">
     <img src="images/Frame (1).svg" /> <h1 class="text-xl font-semibold"> Breed: ${resData.petData.breed || 'Not Available' }</h1> 
     </div>


       <div class="flex mt-2 gap-2">
     <img src="images/Frame (1).png" /> <h1 class="text-xl font-semibold"> Gender: ${resData.petData.gender || 'Not Available'}</h1> 
     </div>


       <div class="flex mt-2 gap-2">
     <img src="images/Frame (1).png" /> <h1 class="text-xl font-semibold"> vaccinated status: ${resData.petData.vaccinated_status || 'Not Available'}</h1>  
      </div> </div> 

      <div>
      <div class="flex mt-2 gap-2">
  <img src="images/Frame.png" /> <h1 class="text-xl font-semibold"> Brith: ${resData.petData.date_of_birth || 'Not Available'}</h1> 
  </div>
   <div class="flex mt-2 gap-2">
  <img src="images/Frame (2).png" /> <h1 class="text-xl font-semibold"> Brith: ${resData.petData.price || 'Not Available'}</h1> 
  </div>
      </div> 
     </div>
<hr>
    <h1 class="text-xl font-semibold mt-5">Details Information</h1>
    <p>
    ${resData.petData.pet_details
    }</p>
    <div class="modal-action"> 
        <button id="closeModal" class="btn w-full  bg-[#E7F2F2] border-2 text-[#0E7A81]">Close</button>
       
    </div>
  </div>
    `
  console.log(resData.petData);
  
    
    show_imformation.showModal();

    document.getElementById('closeModal').addEventListener('click',function(){
      show_imformation.close();
    })
  };


 
let sortByPrice=(price)=>{
  let numbers = [price];
numbers.sort((a, b) => b - a);
console.log(numbers);
}
