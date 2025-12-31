// https://dummyjson.com/products/search?q=phone
const productDetails =  async ()=>{

    const param = new URLSearchParams(location.search);

    const productName = param.get("search");

     const response = await axios.get(`https://dummyjson.com/products/search?q=${productName}`);
        
     console.log(response.data.products[0]);

     return response.data;

}

    // Done

    //  To Do : only display the name , images, description, reviews, stock 

    // Done 

const dispalyProductInfo = async()=>{

     const result = await productDetails();

     const product = result.products[0];

     const images = product.images;

     console.log(images);

     let productImages = images.map((image,index)=>{

         return `
          <div class="carousel-item ${index == 0 ? "active" : ""}  d-flex justify-content-center align-items-center ">
             <img  src="${image}" class="d-block w-50 " alt="...">
          </div>
         `;
     }).join("");

     const ouReviews = product.reviews;

     console.log(ouReviews);

     const resReveiws = ouReviews.map((review)=>{

        let stars="";
                
         if(Math.floor(review.rating) == 5){
            for(let i = 0; i<5 ; i++){

               stars+=`<i class="fa-solid fa-star text-warning"></i>`;

            }
   
         }else{
             for(let i = 0; i<Math.floor(review.rating) ; i++){
                stars+=`<i class="fa-solid fa-star text-warning "></i>`;
             }

             for(let i = Math.floor(review.rating);i<5;i++){
                stars+=`<i class="fa-regular fa-star" style="color: #FFD43B;"></i>`;
             }

         }
             
        return `
                   <div class="d-flex flex-column gap-2 border rounded py-3 px-3 mt-3 ">
                 <div class="d-flex flex-column ">
                     <h5 class="p-0 m-0 fw-bold text-uppercase">${review.reviewerName}</h5>
                      <span class="text-secondary">${review.reviewerEmail}</span>
                 </div>
                 <p class="fst-italic">${review.comment}</p>
                 <p><span>${stars}</span></p>
                   </div>
        `;

     }).join(" ");



       let info = `
       
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                     ${productImages}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon bg-info p-3 rounded-circle" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon bg-info p-3 rounded-circle" aria-hidden="true"></span>
                        <span class="visually-hidden ">Next</span>
                    </button>
                </div>


                <div class="d-flex justify-content-between  align-items-center">
                <h1>${product.title}</h1>
                <span class="  text-capitalize ${product.availabilityStatus =="In Stock" ?  "bg-success": "bg-danger" } p-1  rounded text-white"> ${product.availabilityStatus}</span>
                </div>

                <p>${product.description}</p>

                <span class="text-capitalize ${product.stock == 0 ?"bg-danger" :"bg-warning" } p-2 rounded text-white">Remain only : ${product.stock}</span>

                <div class="reviews d-flex flex-column ">
                        ${resReveiws}
                 </div>
       
       `;

       document.querySelector(".info").innerHTML = info; 

}

dispalyProductInfo();














