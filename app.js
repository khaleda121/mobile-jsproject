
   // details button action form
const productDetails=(id)=>{
          // console.log(id)
           fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
           .then(res => res.json())
           .then(data =>{
            // console.log(data.data.mainFeatures.sensors)
            const sensorsName = data.data.mainFeatures.sensors;
            // console.log(sensorsName);
            let storeSensorName = '';
            for(const sensorName of sensorsName){
              storeSensorName = `${storeSensorName} ${sensorName}, `
            }
            const showDetails = document.getElementById('show-details');
                showDetails.innerHTML=`
                <div  class=" row row-cols-1 row-cols-md-3 g-4 ms-5">
                    <div class="col">
                      <div class="card">
                        <img src=${data.data.image} class="card-img-top mx-auto w-75 pt-5" alt="...">
                        <div id="datails-body" class="card-body">
                          <h5 class="card-title fw-bold">Brand: ${data.data.brand}</h5>
                          <p class="card-text fw-bold">Storage: ${data.data.mainFeatures.storage}</p>
                          <p class="card-text fw-bold">ChipSet: ${data.data.mainFeatures.chipSet}</p>
                          <p class="card-text fw-bold">DisplaySize: ${data.data.mainFeatures.displaySize}</p>
                          <p class="card-text fw-bold">Sensors : ${storeSensorName}</p> 
                        </div>
                      </div>  
                    </div> 
                </div>     
                `;
        
                // inject release Date 
                const container = document.getElementById
                ('datails-body');
                const p = document.createElement('p');
                  if(data.data.releaseDate){
                    p.innerText=`Realease Info:${data.data.releaseDate}`;
                    container.appendChild(p);
                  }else{
                    p.innerText=`Realease Info: Not Found`;
                    container.appendChild(p);
                  }
           } );
        }

   // get search field
  const searchPhone = () => {

          clearSearchResult('show-details');
          clearSearchResult('show-Result');
          displayHandle('none','error-message');
          displayHandle('none','show-all-Button')

         const searchField = document.getElementById('search-field');
         const searchText = searchField.value;

    //loading Data 

          fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
         .then(res => res.json())
        // .then(data => displayResult(data.data))
        .then(data =>{
          if(data.data.length != 0){
            displayResult(data.data) 
          }else{
            displayHandle('block','error-message');
          }
        })  
         

             //Clear Data
              searchField.value ='';

 };

  const displayResult = phones => {
          
           const resultShow = document.getElementById('show-Result');
               resultShow.innerHTML ='';
                   
               let count = 0;
           phones.forEach(phone => {
                // console.log(phone);

               if(count <=20){

                    const div = document.createElement('div');
                    div.classList.add("col");
                    div.innerHTML = `
                         <div class="card">
                            <img src=${phone.image} class="card-img-top mx-auto w-75 pt-5" alt="...">
                            <div class="card-body">
                                <h5 class="card-title fw-bold pt-2">Model : ${phone.phone_name}</h5>
                                 <p class="card-text fw-bold">Brand : ${phone.brand}</p>
                                 <button class="btn btn-danger fw-bold" onclick="productDetails('${phone.slug}')"> Details </button>
                             </div>
                         </div>   
                    
                    ` ;  
                    
                    resultShow.appendChild(div);
               }
               else{

                    displayHandle('block','show-all-Button');
               }
                    
              count++;
                     
           });


}

// error handle
 const displayHandle = (direction,id) =>{
          const errorMessage = document.getElementById(id);
          errorMessage.style.display= direction;
        }
        //clear previous result 
        const clearSearchResult = (direction) =>{
          const searchResult = document.getElementById(direction);
          searchResult.innerHTML = '';
        }