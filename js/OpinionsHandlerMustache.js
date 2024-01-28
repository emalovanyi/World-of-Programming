class OpinionsHandlerMustache {
    constructor(template){
        this.template = template;
    }

    renderOpinions(container, opinionsData){
        const renderedOpinions = Mustache.render(this.template, opinionsData);
        container.innerHTML = renderedOpinions;
    }

    addOpinion(container, opinion){
        const opinionsData = this.getOpinionsData(container);
        opinionsData.opinions.push(opinion);
        this.renderOpinions(container, opinionsData);
    }

    getOpinionsData(container){
        const existingOpinions = container.innerHTML;
        try{
            return JSON.parse(existingOpinions);
        } 
        catch (error){
            return{ 
                opinions: [] 
            };
        }
    }
}