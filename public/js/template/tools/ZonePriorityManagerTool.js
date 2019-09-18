import {TemplateTool} from '../TemplateTool.js'
class ZonePriorityManagerTool extends TemplateTool{
    constructor(){
        super();
        this.title='Arranger';
        this.setIcon('fal fa-layer-group');
    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,function(){
            console.log('ça maaarche')
        })
    }
}

export {ZonePriorityManagerTool}