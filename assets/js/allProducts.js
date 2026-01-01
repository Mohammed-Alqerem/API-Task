const getCategoryInfo = async (page) => {
  const skip = (page - 1) * 10;

  const response = await axios.get(
    `https://dummyjson.com/products?limit=10&skip=${skip}`
  );
  console.log(response.data);

  return response.data;
};

//  To Do: dispaly the name , price, thumbnali and rate

const displayCategoryInfo = async (page = 1) => {
  const categoryInfo = await getCategoryInfo(page);

  document.querySelector(".loading").classList.add("d-none");

  const nubmerOfPage = Math.ceil(categoryInfo.total / 10);

  // pagination

  let pagination = "";

  let paginationLink = ``;

  if (page > 1) {
    paginationLink = `<li class="page-item"><button class="page-link user-select-none" onclick=displayCategoryInfo(${
      page - 1
    })>Previous</button></li>`;
  } else {
    paginationLink = `<li class="page-item"><button class="page-link cursor-none opacity-50 user-select-none" disabled >Previous</button></li>`;
  }

  for (let i = 1; i <= nubmerOfPage; i++) {
    paginationLink += `<li class="page-item"><button class="page-link user-select-none" onclick=displayCategoryInfo(${i}) >${i}</button></li>`;
  }

  if (page < nubmerOfPage) {
    paginationLink += `<li class="page-item"><button class="page-link user-select-none" onclick=displayCategoryInfo(${
      page + 1
    }) >Next</button></li>`;
  } else {
    paginationLink += `<li class="page-item"><button class="page-link cursor-none opacity-50  user-select-none")>Next</button></li>`;
  }

  // pagination

  const response = categoryInfo.products;

  let result = response
    .map((catInfo) => {
      let stars = "";

      if (Math.floor(catInfo.rating) == 5) {
        for (let i = 0; i < 5; i++) {
          stars += `<i class="fa-solid fa-star"></i>`;
        }
      } else {
        for (let i = 0; i < Math.floor(catInfo.rating); i++) {
          stars += `<i class="fa-solid fa-star text-warning "></i>`;
        }

        for (let i = Math.floor(catInfo.rating); i < 5; i++) {
          stars += `<i class="fa-regular fa-star" style="color: #FFD43B;"></i>`;
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
    })
    .join(" ");

  if (categoryInfo.total > 10) {
    pagination = `
        <nav aria-label="Page navigation example">
                    <ul class="pagination flex-wrap">
                
                      ${paginationLink}
                
                    </ul>
                </nav>
                `;
  } else {
    paginationLink = "";

    pagination = ` 
        <nav aria-label="Page navigation example">
                    <ul class="pagination flex-wrap">
                
                      ${paginationLink}
                
                    </ul>
                </nav>
                `;
  }

  

 document.querySelector(".pagination-wrapper").innerHTML = pagination;

  document.querySelector(".categoryInfo .container .row").innerHTML = result;
};

displayCategoryInfo();
