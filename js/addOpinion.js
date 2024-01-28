
export default function processOpnFrmData(event){
    //1.prevent normal event (form sending) processing
    event.preventDefault();

    //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
    const nopName = document.getElementById("nameElm").value.trim();
    const nopEmail = document.getElementById("emailElm").value.trim();

    const nopText = document.getElementById("textElm").value.trim();
    //3. Verify the data
    if(nopName==="" || nopText==="" || nopEmail===""){
        window.alert("Please, enter both your name and opinion");
        return;
    }

    //3. Add the data to the array opinions and local storage
    const newOpinion =
        {
            name: nopName,
            text: nopText,
            email: nopEmail,


            created: new Date()

        };


    let opinions = [];

    if(localStorage.myTreesComments){
        opinions=JSON.parse(localStorage.myTreesComments);
    }

    opinions.push(newOpinion);
    localStorage.myTreesComments = JSON.stringify(opinions);


    //5. Go to the opinions
    window.location.hash="#opinions";

}