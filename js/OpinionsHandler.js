class OpinionsHandler {
    static getOpinions() {
        return {
            opinions: [
                { name: "Tom Tailor:", comment: "Great site! Here i can find a lot of informations about programming)" },
                { name: "Vladyslav Bonak:", comment: "Very good! Thank developer!" },
                { name: "Yevhenii Orlov:", comment: "I will choose another one" },
                { name: "Kilian Manuk:", comment: "Thanks! But can you add more program topics?" },
            ],
        };
    }
}

document.addEventListener("DOMContentLoaded", function (){
    const opinionsContainer = document.getElementById("comments-container");

    // Get opinions data
    const opinionsData = OpinionsHandler.getOpinions();

    // Render opinions
    opinionsData.opinions.forEach(opinion => {
    	const opinionElement = document.createElement("div");
        opinionElement.innerHTML = `<strong>${opinion.name}</strong> ${opinion.comment}`;
        opinionsContainer.appendChild(opinionElement);
    });
});