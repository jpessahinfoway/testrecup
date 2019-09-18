import {TemplateTool} from '../TemplateTool.js'
class ZoneDraggerTool extends TemplateTool{
    constructor(template){
        super(template);
        this.title='Déplacer';
        this.setIcon('fal fa-arrows');
        this.$eventLocation = '.zone'
    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                let newPosition,
                    oldPosition,
                    deplacementValue,
                    currentPosition,
                    currentZone,
                    nextZonePos;
                $('.zone').addClass('draggerModeOn');
                $(this.$eventLocation).on('mousedown.'+this.constructor.name,(e)=>{
                    this.activated = true;
                    currentZone = this.template.zones[$(e.currentTarget).prop('id').match(/[0-9]*$/)[0]];
                    currentPosition = Object.assign(currentZone.position,{});
                    newPosition = this.getCursorPositionInTemplate(e,this.workZone);
                    oldPosition = null;
                })
                $(`${'body'}`).on('mousemove.'+this.constructor.name, (e) => {
                    if(this.activated){
                        new Promise(resolve=>{
                            oldPosition = newPosition;
                            newPosition = this.getCursorPositionInTemplate(e,this.workZone);
                            deplacementValue = {left:newPosition.left-oldPosition.left,top:newPosition.top-oldPosition.top};
                            console.log(deplacementValue);
                            nextZonePos = {left : currentPosition.left + deplacementValue.left, top:currentPosition.top + deplacementValue.top};

                            console.log('current: '+currentPosition.left+ ' + deplacement : '+deplacementValue.left+' = '+nextZonePos.left);
                            console.log('')
                            let positionLimit;
                            if(nextZonePos.left<0)nextZonePos.left=0;
                            if(nextZonePos.top<0)nextZonePos.top=0;
                            if(nextZonePos.left + currentZone.size.width>this.template.size.width)nextZonePos.left= this.template.size.width-currentZone.size.width
                            /*else if(nextZonePos.left + currentZone.size.width>this.template.size.width) {
                                positionLimit = {left:this.template.size.width-currentZone.size.width}
                                currentZone.setPosition(positionLimit)
                                resolve(this.stopMove=true)
                            }*/
                            else if(nextZonePos.top<=0) {
                                /*positionLimit = {top : 0}
                                Promise.resolve(currentZone.setPosition(positionLimit)).then(()=>{
                                    this.stopMove=true
                                })*/
                            }
                            else{
                                this.stopMove=false
                            }
                        })
                        /*if(nextZonePos.left<0 || (nextZonePos.left + this.currentZone.size.width) > this.template.size.width || nextZonePos.top <= 0) { this.stopMove = false }
                        else { this.stopMove=true; }*/
                        //if (this.activated && !this.stopMove) {
                            currentZone.setPosition(nextZonePos);
                            currentPosition = nextZonePos
                        this.template.tools['ZoneInfoDisplayerTool'].updateInfosZoneContent({position:nextZonePos});
                            // currentZone.setPosition();
                        //}
                    }
                })
                $(`${'body'}`).on('mouseup.'+this.constructor.name, (e) => {
                    this.activated = false;
                })
            }
            if(mode=='off'){
                $('.zone').removeClass('draggerModeOn');
                $(this.$eventLocation).unbind('mousedown.'+this.constructor.name);
                $(`${'body'}`).unbind('mousemove.'+this.constructor.name);
                $(`${'body'}`).unbind('mouseup.'+this.constructor.name);
            }
        })
    }

}

export {ZoneDraggerTool}