class ActionWindow{
    constructor(templateInterface){
        this.$windowLocation = $('#panel-action');
        this.$titleLocation = this.$windowLocation.find('h2');
        this.titleLabel = null;
        this.interface = templateInterface;
    }

    switchOn(){
        this.$windowLocation.attr('id',`panel-${this.interface.currentStage}-1`);
    }

    setTitle(title){
       this.titleLabel = title;
       this.$titleLocation.append(title)
    }

}

export { ActionWindow }