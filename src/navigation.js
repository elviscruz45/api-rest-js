let maxPage
let page=1
let infiniteScroll

searchFormBtn.addEventListener("click",()=>{
    location.hash="#search="+searchFormInput.value})
trendingBtn.addEventListener("click",()=>{location.hash="#trends"})
arrowBtn.addEventListener("click",()=>{
    history.back()
    //location.hash="#home"
})


window.addEventListener("DOMContentLoaded",navigator,false);
window.addEventListener("hashchange",navigator,false);
window.addEventListener("scroll",infiniteScroll,false)



function navigator(){
    console.log({location})
    if(infiniteScroll){
        window.removeEventListener("scroll",infiniteScroll,{passive:false})
        infiniteScroll=undefined
    }

    if (location.hash.startsWith("#trends")){
            trendsPage()
    }else if (location.hash.startsWith("#search=")){
            searchPage()
    }else if (location.hash.startsWith("#movie=")){
            movieDetailsPage()
    }else if (location.hash.startsWith("#category=")){
            categoryPage()
    }else{
            homePage()
    }
    document.body.scrollTop=0
    document.documentElement.scrollTop=0

    if(infiniteScroll){
        window.addEventListener("scroll",infiniteScroll,{passive:false})
    }
}

function homePage(){
    console.log("Home!")
    headerSection.classList.remove("header-container--long")
    headerSection.style.background=""
    arrowBtn.classList.add("inactive")
    arrowBtn.classList.remove("header-arrow--white")

    headerTitle.classList.remove("inactive")
    headerCategoryTitle.classList.add("inactive")
    searchForm.classList.remove("inactive")

    trendingPreviewSection.classList.remove("inactive")
    categoriesPreviewSection.classList.remove("inactive")
    genericSection.classList.add("inactive")
    movieDetailSection.classList.add("inactive")

getTrendingMoviesPreview()
getCategoriesPreview()
}


function trendsPage(){
    console.log("trends!")
    headerSection.classList.remove("header-container--long")
    headerSection.style.background=""
    arrowBtn.classList.remove("inactive")
    arrowBtn.classList.remove("header-arrow--white")

    headerTitle.classList.add("inactive")
    headerCategoryTitle.classList.remove("inactive")
    searchForm.classList.add("inactive")

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    genericSection.classList.remove("inactive")
    movieDetailSection.classList.add("inactive")

    headerCategoryTitle.innerHTML="Tendencias"

    getTrendingMovies()
    infiniteScroll= getPaginatedTrendingMovies

}


function searchPage(){
    console.log("search!")
    headerSection.classList.remove("header-container--long")
    headerSection.style.background=""
    arrowBtn.classList.remove("inactive")
    arrowBtn.classList.remove("header-arrow--white")

    headerTitle.classList.add("inactive")
    headerCategoryTitle.classList.add("inactive")
    searchForm.classList.remove("inactive")

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    genericSection.classList.remove("inactive")
    movieDetailSection.classList.add("inactive")

     const [_,query]=location.hash.split("=")
    
     getMoviesBySearch(query)
     infiniteScroll= getPaginatedMoviesBySearch(query)

}


function movieDetailsPage(){
    console.log("details!")

    headerSection.classList.add("header-container--long")
    headerSection.style.background=""
    arrowBtn.classList.remove("inactive")
    arrowBtn.classList.add("header-arrow--white")

    headerTitle.classList.add("inactive")
    headerCategoryTitle.classList.add("inactive")
    searchForm.classList.add("inactive")

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    genericSection.classList.add("inactive")
    movieDetailSection.classList.remove("inactive")

    const [_,movieId]=location.hash.split("=")
    getMoviebyId(movieId)
}


function categoryPage(){
    console.log("category!")


    headerSection.classList.remove("header-container--long")
    //headerSection.style.background=""
    arrowBtn.classList.remove("inactive")
    arrowBtn.classList.remove("header-arrow--white")

    headerTitle.classList.add("inactive")
    headerCategoryTitle.classList.remove("inactive")
    searchForm.classList.add("inactive")

    trendingPreviewSection.classList.add("inactive")
    categoriesPreviewSection.classList.add("inactive")
    genericSection.classList.remove("inactive")
    movieDetailSection.classList.add("inactive")

    const [_,categoryData]=location.hash.split("=")
    const [categoryId,categoryName]=categoryData.split("-")

    headerCategoryTitle.innerHTML=categoryName

    
    getMoviesByCategory(categoryId)
    infiniteScroll= getPaginatedMoviesByCategory(categoryId)

}


