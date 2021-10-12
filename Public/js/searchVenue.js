if(document.getElementById('searchForm')){
    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
    document.getElementById('searchBtn').addEventListener('click',(e)=>{
        e.preventDefault();
        const data={}
        data.city=document.getElementById('city').value;
        
        data.event=document.getElementById('event-category-select').value;
        console.log(data)
        window.location.assign(`http://127.0.0.1:3000/venue/search/${data.city}/${data.event}`)
        
    })
    }