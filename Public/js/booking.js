const bookingForm=document.getElementById('bookingForm');

if(bookingForm){
    document.getElementById('booking').addEventListener('click',(e)=>{
        e.preventDefault();
        const booking={};
         const id=bookingForm.className;
        booking.name=document.getElementById('name').value;
     booking.people=document.getElementById('people').value;
        booking.details=document.getElementById('description').value;
        booking.date=document.getElementById('date').value;
        console.log(booking);
        fetch(`http://127.0.0.1:3000/venue/book/${id}`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status == "success") {

                    window.location.assign('/')
                } else {
                    console.log(data)
                    if (data.msg) {
                        alert(data.msg);
                    }
                }
            })
            .catch((error) => {
                console.log(error)
                alert(error.msg);
            });

    })
}