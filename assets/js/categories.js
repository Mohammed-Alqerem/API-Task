
const getCategoryInfo = async ()=>{

      const param = new URLSearchParams(location.search);

      const catName = param.get("categoryName");
    
     const response = await axios.get(`https://dummyjson.com/products/category/${catName}`);
     console.log(response.data);
     
      return response.data;
}



 //  To Do: dispaly the name , price, thumbnali and rate  


const displayCategoryInfo = async () => {


  const categoryInfo = await getCategoryInfo();

     document.querySelector(".loading").classList.add("d-none");



  const response = categoryInfo.products;

   let result = response.map((catInfo)=>{

      let stars="";
      
          
         if(Math.floor(catInfo.rating) == 5){
            for(let i = 0; i<5 ; i++){

               stars+=`<i class="fa-solid fa-star"></i>`;

            }

   
         }else{
             for(let i = 0; i<Math.floor(catInfo.rating) ; i++){
                stars+=`<i class="fa-solid fa-star text-warning "></i>`;
             }

             for(let i = Math.floor(catInfo.rating);i<5;i++){
                stars+=`<i class="fa-regular fa-star" style="color: #FFD43B;"></i>`;
             }

         }


    return `

     <div class="col-xxl-3 col-lg-4 col-md-6 col-12">
     <div class="card p-2 h-100">
        <img src="${catInfo.thumbnail}" width="300" height="300" class="card-img-top" alt="...">
               <div class="card-body d-flex flex-column gap-2 align-items-start">
              <h5 class="card-title h3">${catInfo.title}</h5>
             <p class="card-text"><span class="fw-bold">${catInfo.price}$</span></p>
             <span class="d-block">${stars}</span>
             <a class="card-link btn btn-primary  w-100" href="productDetails.html?search=${catInfo.title}">More Details</a>
          </div>
     </div>
     </div>
    
    `;
   }).join(" ");

   const ordering = `
    <div class="col-12">
                    <div class="orderBy mt-5 p-2   bg-light fs-2 d-flex justify-content-end gap-3">
                    
                        <button type="button" class="btn btn-secondary" onclick="orderBy('${categoryInfo.products[0].category}','asc')" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="ASC">
                            <i class="fa-solid fa-arrow-down-short-wide"></i>
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="orderBy('${categoryInfo.products[0].category}','desc')" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="DESC">
                            <i class=" fa-solid fa-arrow-down-wide-short"></i>
                        </button>
                    
                    </div>
                </div>
   
   `;

   result = ordering + result;

   document.querySelector(".categoryInfo .row").innerHTML=result;
   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
   const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));
  
}


const orderBy = async (category , typeSort)=>{


       
    const response = await axios.get(`https://dummyjson.com/products/category/${category}/?sortBy=price&order=${typeSort}`);

     const res= response.data.products;

     console.log(res[0].category)

   //  stop here 
   
   //  To Do : display the data from the API  in the categories page after desc and asc.



     let result = res.map((catInfo)=>{

      let stars="";
      
          
         if(Math.floor(catInfo.rating) == 5){
            for(let i = 0; i<5 ; i++){

               stars+=`<i class="fa-solid fa-star"></i>`;

            }

   
         }else{
             for(let i = 0; i<Math.floor(catInfo.rating) ; i++){
                stars+=`<i class="fa-solid fa-star text-warning "></i>`;
             }

             for(let i = Math.floor(catInfo.rating);i<5;i++){
                stars+=`<i class="fa-regular fa-star" style="color: #FFD43B;"></i>`;
             }

         }


    return `

     <div class="col-xxl-3 col-lg-4 col-md-6 col-12">
     <div class="card p-2 h-100">
        <img src="${catInfo.thumbnail}" width="300" height="300" class="card-img-top" alt="...">
               <div class="card-body d-flex flex-column gap-2 align-items-start">
              <h5 class="card-title h3">${catInfo.title}</h5>
             <p class="card-text"><span class="fw-bold">${catInfo.price}$</span></p>
             <span class="d-block">${stars}</span>
             <a class="card-link btn btn-primary  w-100" href="productDetails.html?search=${catInfo.title}">More Details</a>
          </div>
     </div>
     </div>
    
    `;
   }).join(" ");

      const ordering = `
    <div class="col-12">
                    <div class="orderBy mt-5 p-2   bg-light fs-2 d-flex justify-content-end gap-3">
                    
                        <button type="button" class="btn btn-secondary" onclick="orderBy('${res[0].category}','asc')" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="ASC">
                            <i class="fa-solid fa-arrow-down-short-wide"></i>
                        </button>
                        <button type="button" class="btn btn-secondary" onclick="orderBy('${res[0].category}','desc')" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="DESC">
                            <i class=" fa-solid fa-arrow-down-wide-short"></i>
                        </button>
                    
                    </div>
                </div>
   
   `;

   result = ordering + result;

   document.querySelector(".categoryInfo .row").innerHTML=result;
   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
   const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

}




displayCategoryInfo();



