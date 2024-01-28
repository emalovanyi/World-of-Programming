const myForm = document.getElementById("Contacts");
    myForm.addEventListener("submit", processFormData);
    function processFormData(event){
        event.preventDefault();
        const formData = new FormData(myForm);

        const visitorInfo = {
            name: formData.get("name"),
            email: formData.get("email"),
            image_url: formData.get("url")
        };

        const usergender = {
            cat_type: formData.get("gender")
        };

        const opinion = {
            cat_opinion: formData.get("thoughts"),
            keywords: formData.get("keywords"),
        };

        Swal.fire({
            title: 'Thank you for your feedback!',
            text: 'The data has been processed and submitted for processing. We will contact you shortly!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            console.log("New message in your inbox!");
            console.log("User info:", visitorInfo);
            console.log("User gender:", usergender);
            console.log("User message:", opinion);
            myForm.reset();
        });
    }