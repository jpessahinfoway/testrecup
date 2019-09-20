import {TemplateTool} from '../TemplateTool.js'
class ZonePriorityManagerTool extends TemplateTool{
    constructor(){
        super();
        this.title='Arranger';
        this.$eventLocation=$('body');
        this.subMenuIcons = {}
        this.addSubFunctionalityIconsProperties('ForegroundTool','fad fa-bring-forward','Mettre au premier plan','subforeground');
        this.addSubFunctionalityIconsProperties('BackgroundTool','fad fa-send-backward','Mettre au dernier plan','subbackground');
        this.addSubFunctionalityIconsProperties('AboveTool','fal fa-layer-minus','Mettre au premier plan','subabove');
        this.addSubFunctionalityIconsProperties('BellowTool','fal fa-layer-plus','Mettre au premier plan','subbellow');
        this.setIcon('fal fa-layer-group');

    }


    addSubFunctionalityIconsProperties(label,icon,title,className){
        this.subMenuIcons[label]={
            icon,
            title,
            className
        };
        console.log(this.subMenuIcons)
    }
    setIcon(iconClass){
        super.setIcon(iconClass)
        this.displaySubsIcons()
    }

    initForeGroundTool(){
        console.log($('#subabove'));
        $('body').on('click','#subabove',()=>{
            console.log('test')
        })
    }

    displaySubsIcons(){
        let ul = $('<ul></ul>')
        let lastIcon,lastIconContainer;
        Object.keys(this.subMenuIcons).forEach(subMenuIcon=>{
            lastIcon = $(`<i data-subtool=${subMenuIcon}></i>`)
            lastIcon.addClass(this.subMenuIcons[subMenuIcon].icon);
            lastIconContainer = $(`<li class="subTool ${this.subMenuIcons[subMenuIcon].className}"><span title="${this.subMenuIcons[subMenuIcon].title}"></span></li>`).append(lastIcon);

            ul.append(lastIconContainer)
        });

        this.iconContainer = $(this.iconContainer.get(0).outerHTML + ul.get(0).outerHTML)
    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,()=>{
            console.log($(`.${this.subMenuIcons['BackgroundTool'].className}`))
            $(`${this.subMenuIcons['BackgroundTool'].className}`).on('click',()=>{
                console.log('gfdgdfgfdgfdgd')
            })

        })
    }
}

export {ZonePriorityManagerTool}