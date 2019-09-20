class TemplateToolBox{
    constructor(){
        console.log('Template Interface initialized !')
        this.iconsSize=null;
        this.casesProperties={size:null,background:'white'};
        //this.setToolBoxCaseSize({width:50,height:50});
        this.setIconSize(20);
        this.tools = {};
        this.activatedTool = null;
        this.lastActivatedToolBoxElements = {};
        this.initLastActivatedToolBoxElements();
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

    initLastActivatedToolBoxElements(){
        this.lastActivatedToolBoxElements = {
            tool : {
                'li' : null,
                'i'  : null
            },
            subTool: {
                'li' : null,
                'i'  : "dfgdfg"
            }
        }
    }
    setLastActivatedToolBoxElements({tool = {li : false, i:false}, subTool = {li:false,i:false}} = {}){
        if(tool.li)this.lastActivatedToolBoxElements.tool.li=tool.li;
        if(tool.i)this.lastActivatedToolBoxElements.tool.i=tool.i;
        if(subTool.li)this.lastActivatedToolBoxElements.subTool.li=subTool.li;
        if(subTool.i) this.lastActivatedToolBoxElements.subTool.i = subTool.i
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
       let icon = tool.iconContainer;


       let menuCase = $('<li class="tools"></li>');

        //menuCase.width(this.casesProperties.size.width);
        //menuCase.height(this.casesProperties.size.height);

        this.$location.toolBox.find('ul').css('background-color',this.casesProperties.background)
        icon.css('font-size',this.iconsSize);

        menuCase.append(icon);
        this.$location.toolBox.find('ul:first').append(menuCase);
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
               console.log(this.tools[tool].iconContainer)
                this.tools[tool].iconContainer.first().parents('.tools').removeClass('active-tool');
                this.tools[tool].activeTool(false);
            }
        })
    }

    disactiveSubTools(){
        let subTool = $('.active-subTool').length<1?null:$('.active-subTool').find('i').data('subtool');
        if(subTool!==null){
            let toolName = $('.active-subTool').parents('.tools li').find('i:first').data('eventname');
            this.tools[toolName].subTool=null
            $('.active-subTool').removeClass('active-subTool');
        }
        return subTool;
    }

    activeToolBoxEvents(){
        //Au click sur un element de la toolBox
        this.$location.toolBox.find('li').on('click',(e)=>{
            let lastSubToolRemoved=this.disactiveSubTools();
            let lastActivatedToolBoxElements = {tool : {li : null, i:null}, subTool : {li:null,i:null}};

            if(!$(e.currentTarget).hasClass('tools')){
                lastActivatedToolBoxElements.subTool.li=$(e.currentTarget);
                lastActivatedToolBoxElements.subTool.i = lastActivatedToolBoxElements.subTool.li.find('i');
            }

            lastActivatedToolBoxElements.tool.li=$(e.currentTarget).hasClass('tools')?$(e.currentTarget):$(e.currentTarget).parents('.tools li');
            lastActivatedToolBoxElements.tool.i = lastActivatedToolBoxElements.tool.li.find('i:first');


            this.setLastActivatedToolBoxElements(lastActivatedToolBoxElements);
            if(this.activatedTool !== null)console.log(this.activatedTool.subTool);

            let eventName = this.lastActivatedToolBoxElements.tool.i.data('eventname');
            // Désactivation de tous les outils de modification de zones
            console.log(eventName)
            this.disactiveAllTools(eventName);
            //this.disactiveSubTools(eventName);
            if(typeof lastActivatedToolBoxElements.subTool.i !== 'undefined' && lastActivatedToolBoxElements.subTool.i!== null && typeof lastActivatedToolBoxElements.subTool.i.data('subtool') !== 'undefined' && lastActivatedToolBoxElements.subTool.i.data('subtool') !== lastSubToolRemoved){
                lastActivatedToolBoxElements.subTool.li.addClass('active-subTool')
                this.tools[eventName].subTool = lastActivatedToolBoxElements.subTool.i.data('subtool');

            }
            if(this.tools[eventName].state !== 'enabled'){
                //Si l'element cliqué n est pas actif on l active
                this.activeToolInToolBox(eventName,true);
            }else{
                if(lastActivatedToolBoxElements.subTool.li!== null && lastActivatedToolBoxElements.subTool.i.data('subtool') === lastSubToolRemoved)
                this.activeToolInToolBox(eventName,false);
            }
            e.stopPropagation()
        })
    }
    activeAllTools(){

        console.log(this.tools);
        Object.keys(this.tools).forEach((tool)=>{
            this.tools[tool].active();
        })
    }
    activeToolInToolBox(toolName,active=true){
        this.tools[toolName].activeTool(active);
        if(active){
            this.activatedTool= this.tools[toolName]
            this.tools[toolName].iconContainer.first().parents('.tools').addClass('active-tool')
        }else{
            this.activatedTool= null
            this.tools[toolName].iconContainer.first().parents('.tools').removeClass('active-tool')
        }

    }

    addTools(tool){
        this.tools[tool.constructor.name]=tool;
        this.showMenuCase(tool)
    }

}

export {TemplateToolBox}