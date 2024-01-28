
export default class articleFormsHandler {

    constructor(articlesServerUrl) {
        this.serverUrl=articlesServerUrl;
    }

    assignFormAndArticle(formElementId, cssClass2hideElement,articleId,offset,totalCount){
        this.cssCl2hideElm  = cssClass2hideElement;
        const artForm=document.getElementById(formElementId);
        this.formElements=artForm.elements;

        this.formElements.namedItem('btShowFileUpload').onclick= ()=>this.showFileUpload();
        this.formElements.namedItem('btFileUpload').onclick= ()=>this.uploadImg();
        this.formElements.namedItem('btCancelFileUpload').onclick= ()=>this.cancelFileUpload();


        if(articleId>=0){ //article edit (update)
            artForm.onsubmit= (event)=>this.processArtEditFrmData(event);
            this.articleId = articleId;
            this.offset = offset;
            this.totalCount = totalCount;
        }else{
            artForm.onsubmit= (event)=>this.processArtInsertFrmData(event);
            this.articleId = articleId;
            this.offset = offset;
            this.totalCount = totalCount;
        }

    }

    showFileUpload(event) {
        this.formElements.namedItem('fsetFileUpload').classList.remove( this.cssCl2hideElm);
        this.formElements.namedItem('btShowFileUpload').classList.add( this.cssCl2hideElm);
    }

    cancelFileUpload() {
        this.formElements.namedItem('fsetFileUpload').classList.add( this.cssCl2hideElm);
        this.formElements.namedItem('btShowFileUpload').classList.remove( this.cssCl2hideElm);
    }

    uploadImg() {

        const files = this.formElements.namedItem("flElm").files;

        if (files.length > 0) {
            const imgLinkElement = this.formElements.namedItem("imageLink");
            const fieldsetElement = this.formElements.namedItem("fsetFileUpload");
            const btShowFileUploadElement = this.formElements.namedItem("btShowFileUpload");

            //1. Gather  the image file data
            let imgData = new FormData();
            imgData.append("file", files[0]);


            //2. Set up the request
            const postReqSettings = //an object wih settings of the request
                {
                    method: 'POST',
                    body: imgData
                };


            //3. Execute the request
            fetch(`${this.serverUrl}/fileUpload`, postReqSettings)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`)); //we return a rejected promise to be catched later
                    }
                })
                .then(responseJSON => {
                    imgLinkElement.value = responseJSON.fullFileUrl;
                    btShowFileUploadElement.classList.remove( this.cssCl2hideElm);
                    fieldsetElement.classList.add( this.cssCl2hideElm);
                })
                .catch(error => {
                    window.alert(`Image uploading failed. ${error}.`);
                });
        } else {
            window.alert("Please, choose an image file.");
        }


    }

    processArtEditFrmData(event) {
        event.preventDefault();


        //1. Gather and check the form data
        const articleData = {
            title: this.formElements.namedItem("title").value.trim(),
            content: this.formElements.namedItem("content").value.trim(),
            author: this.formElements.namedItem("author").value.trim(),

            imageLink: this.formElements.namedItem("imageLink").value.trim(),
            tags: this.formElements.namedItem("tags").value.trim()
        };
        if (!(articleData.title && articleData.content)) {
            window.alert("Please, enter article title and content");
            return;
        }
        if (!articleData.author) {
            articleData.author = "Anonymous";
        }
        if (!articleData.imageLink) {
            delete articleData.imageLink;
        }
        if (!articleData.tags) {
            delete articleData.tags;
        } else {
            articleData.tags = articleData.tags.split(",");
            articleData.tags = articleData.tags.map(tag => tag.trim());
            articleData.tags = articleData.tags.filter(tag => tag);
            if (articleData.tags.length == 0) {
                delete articleData.tags;
            }
        }


        //2. Set up the request
        const postReqSettings =
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(articleData)
            };


        //3. Execute the request
        fetch(`${this.serverUrl}/article/${this.articleId}`, postReqSettings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`));
                }
            })
            .then(responseJSON => {
                window.alert("Updated article successfully saved on server");
            })
            .catch(error => { ////here we process all the failed promises
                window.alert(`Failed to save the updated article on server. ${error}`);

            })
            .finally(() => window.location.hash = `#article/${ this.articleId}/${ this.offset}/${ this.totalCount}`);

    }
    processArtInsertFrmData(event){
        event.preventDefault();

        //1. Gather and check the form data
        const articleData = {
            title: this.formElements.namedItem("title").value.trim(),
            content: this.formElements.namedItem("content").value.trim(),
            author: this.formElements.namedItem("author").value.trim(),

            imageLink: this.formElements.namedItem("imageLink").value.trim(),
            tags: this.formElements.namedItem("tags").value.trim()
        };

        if (!(articleData.title && articleData.content)) {
            window.alert("Please, enter article title and content");
            return;
        }

        if (!articleData.author) {
            articleData.author = "Anonymous";
        }

        if (!articleData.imageLink) {
            delete articleData.imageLink;
        }

        if (!articleData.tags) {
            delete articleData.tags;
        } else {
            articleData.tags = articleData.tags.split(","); //zmeni retazec s tagmi na pole. Oddelovac poloziek je ciarka.
            //changes the string with tags to array. Comma is the separator
            articleData.tags = articleData.tags.map(tag => tag.trim()); //odstráni prázdne znaky na začiatku a konci každého kľúčového slova
            //deletes white spaces from the beginning and the end of each tag string

            //newArtData.tags=newArtData.tags.map(function(tag) {return tag.trim()}); //alternativny sposob zapisu predch. prikazu
            //an alternative way of writing the previous command

            articleData.tags = articleData.tags.filter(tag => tag); //odstráni tie tagy, ktoré sú teraz len prázdne reťazce
            //removes those tags that are now just empty strings
            if (articleData.tags.length == 0) {
                delete articleData.tags;
            }
        }

        //2. Set up the request


        const postReqSettings = //an object wih settings of the request
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(articleData)
            };


        //3. Execute the request


        fetch(`${this.serverUrl}/article/`, postReqSettings)  //now we need the second parameter, an object wih settings of the request.
            .then(response => {      //fetch promise fullfilled (operation completed successfully)
                if (response.ok) {    //successful execution includes an error response from the server. So we have to check the return status of the response here.
                    return response.json(); //we return a new promise with the response data in JSON to be processed
                } else { //if we get server error
                    return Promise.reject(new Error(`Server answered with ${response.status}: ${response.statusText}.`)); //we return a rejected promise to be catched later
                }
            })
            .then(responseJSON => { //here we process the returned response data in JSON ...
                window.alert("Updated article successfully saved on server");
            })
            .catch(error => { ////here we process all the failed promises
                window.alert(`Failed to save the updated article on server. ${error}`);

            })
            .finally(() => window.location.hash = `#articles`);
    }
}

