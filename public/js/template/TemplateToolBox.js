class TemplateToolBox{
    constructor(){
        console.log('Template Interface initialized !')
        this.iconsSize=null;
        this.casesProperties={size:null,background:'white'};
        //this.setToolBoxCaseSize({width:50,height:50});
        this.setIconSize(20);
        this.tools = {};
        this.$location = {
            toolBox : $('#toolbar'),
            toolsContainer : $('.tools')
        },
        this.active()
    }

    active(){
        console.log('icii')
        this.$location.toolBox.fadeIn();
    }

    setToolBoxCaseSize(size){
        let access = true;

        if(typeof size.width === 'undefined' ||  !Number.isInteger(size.width)){
            console.log("[TemplateToolBox :: setIconSize ] la largeur des cases du menu n'est pas définit ou n'est pas un nombre valide");
            access=false;
        }
        if(typeof size.height === 'undefined' ||  !Number.isInteger(size.width)){
            console.log("[TemplateToolBox :: setIconSize ] la longueur des cases du menu n'est pas définit ou n'est pas un nombre valide");
            access=false;
        }

        if(!access)return;
        this.casesProperties.size=size;
    }
    setIconSize(size){
        let access = true;

        if(typeof size === 'undefined' ||  !Number.isInteger(size)){
            console.log("[TemplateToolBox :: setIconSize ] la taille des icones n'est pas définit ou n'est pas un nombre valide");
            access=false;
        }

        if(!access)return;
        this.iconsSize=size;
    }
    showMenuCase(tool){
       /*if(typeof icon ==='undefined' || !icon.is('i')){
           console.log("[TemplateToolBox :: showMenuCase ] la fonction doit comporter une proprieté icon de type object jquery integrant une balise i");
           return
       }*/
       let icon = tool.jq;
       let caseContainer = $(`<span title=${tool.title} class="${tool.name}"></span>`);
       let menuCase = $('<li class="tools"></li>');
       console.log(menuCase.parent())
        //menuCase.width(this.casesProperties.size.width);
        //menuCase.height(this.casesProperties.size.height);

        this.$location.toolBox.find('ul').css('background-color',this.casesProperties.background)
        icon.css('font-size',this.iconsSize);

        menuCase.append(caseContainer.append(icon));
        this.$location.toolBox.find('ul').append(menuCase);
    }

    disactiveAllTools(exception){
        let exceptionArray = [];

        if(typeof exception === 'undefined' || (!Array.isArray(exception) && typeof exception !== 'string')){
            console.log('[TemplateToolBox :: disactiveAllTools ] le parametre exception specifié doit être un tableau ou une chaine de caractere! ')
            return
        }

        typeof exception === 'string'? exceptionArray.push(exception):exceptionArray = exception;

        Object.keys(this.tools).forEach((tool)=>{
            if(!exceptionArray.includes(tool)){
                this.tools[tool].jq.parents('.tools').removeClass('active-tool');
                this.tools[tool].activeTool(false);
            }
        })
    }

    activeToolBoxEvents(){
        //Au click sur un element de la toolBox
        console.log(this.$location.toolBox.find('li'))
        this.$location.toolBox.find('li').on('click',(e)=>{
            let eventName = $(e.currentTarget).find('i').data('eventName');
            // Désactivation de tous les outils de modification de zones
            this.disactiveAllTools(eventName);
            if(this.tools[eventName].state !== 'enabled'){
                console.log('icii3')
                //Si l'element cliqué n est pas actif on l active
                this.tools[eventName].activeTool(true);
                this.tools[eventName].jq.parents('.tools').addClass('active-tool')
            }else{
                //Si l element cliqué est active on le desactive
                console.log('iciii2')
                this.tools[eventName].activeTool(false);
                this.tools[eventName].jq.parents('.tools').removeClass('active-tool')
            }
        })
    }
    activeAllTools(){

        console.log(this.tools);
        Object.keys(this.tools).forEach((tool)=>{
            this.tools[tool].active();
        })
    }

    addTools(tool){
        this.tools[tool.constructor.name]=tool;
        this.showMenuCase(tool)
    }

}

export {TemplateToolBox}