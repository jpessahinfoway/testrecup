import {TemplateTool} from '../TemplateTool.js'
class ZoneCreatorTool extends TemplateTool{
    constructor(template){
        super(template);
        this.setIcon('fal fa-plus-square');
        this.title='Ajouter';
        this.$eventLocation=$('body');
        this.$currentWorkZone = null;
        this.lastPosition = null;
    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                this.$eventLocation.on('mousedown.'+this.constructor.name,(e)=> {
                    this.lastMousePosition = {x: e.pageX - this.workZone.offset().left, y: e.pageY - this.workZone.offset().top};
                    let cursorPositionInTemplate = this.getCursorPositionInTemplate(e,this.workZone);
                    this.startPosition = cursorPositionInTemplate;
                    this.lastSize = {width : 0, height:0};
                    this.activated=true;
                })
                this.$eventLocation.on('mousemove.'+this.constructor.name, (e) => {
                    let cursorPositionInTemplate = this.getCursorPositionInTemplate(e,this.workZone)
                    if (this.activated) {

                        this.lastSize.width =  cursorPositionInTemplate.left- this.startPosition.left;
                        this.lastSize.height =  cursorPositionInTemplate.top - this.startPosition.top ;

                        console.log(this.lastSize)
                        if (!this.$currentWorkZone) this.$currentWorkZone = this.template.createNewZone(this.startPosition, this.lastSize);
                        else{
                            this.$currentWorkZone.setSize({width:this.lastSize.width,height: this.lastSize.height})
                        }
                        //debugger
                    }
                });
                this.$eventLocation.on('mouseup.'+this.constructor.name, (e) => {
                    this.$currentWorkZone=null;
                    this.activated = false;
                })
            }else if(mode==='off'){
                this.$eventLocation.unbind('click.'+this.constructor.name);
                this.$eventLocation.unbind('mouseup.'+this.constructor.name);
                this.$eventLocation.unbind('mousedown.'+this.constructor.name);
                this.$eventLocation.unbind('mousemove.'+this.constructor.name);
            }
        })
    }

}

export {ZoneCreatorTool}