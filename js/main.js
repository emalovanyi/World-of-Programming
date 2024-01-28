document.addEventListener("DOMContentLoaded", function () {
    const template = document.getElementById("opinions-template").innerHTML;
    const opinionsHandlerMustache = new OpinionsHandlerMustache(template);
    const opinionsContainer = document.getElementById("opinions-container");
    const commentsContainer = document.getElementById("comments-container");

    // Display existing opinions on page load
    const opinionsData = OpinionsHandler.getOpinions();
    opinionsHandlerMustache.renderOpinions(opinionsContainer, opinionsData);

    // Handle form submission
    document.getElementById("Contacts").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const comment = document.getElementById("thoughts").value;

        const newOpinion = { name, comment };

        // Add the new opinion and render updated opinions
        opinionsHandlerMustache.addOpinion(opinionsContainer, newOpinion);

        // Display the new comment immediately
        displayNewComment(commentsContainer, newOpinion);

        // Optionally, clear the form fields
        document.getElementById("name").value = "";
        document.getElementById("thoughts").value = "";
    });

    // Function to display a new comment
    function displayNewComment(container, comment) {
        const newCommentElement = document.createElement("div");
        newCommentElement.innerHTML = `<strong>${comment.name}:</strong> ${comment.comment}`;
        container.appendChild(newCommentElement);
    }
});