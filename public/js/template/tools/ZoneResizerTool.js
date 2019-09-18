import {TemplateTool} from '../TemplateTool.js'
class ZoneResizerTool extends TemplateTool{
    constructor(template){
        super(template);
        this.setIcon('fal fa-vector-square');
        this.title='Transformation';
        this.$eventLocation = 'zoneResizer';
        this.iconsArray = [];
        this.size = 5;
        this.backGroundColor = null;
        this.borderStyle = null;

    }



    appendResizeButton(){
        let myPromise = new Promise((resolve)=>{
            Object.keys(this.template.zones).forEach((templateZoneIndex,iterIndex)=>{
                let currentZone = this.template.zones[templateZoneIndex];
                this.iconsArray = [];
                this.iconsArray.push($(`<span class="tl" data-position="topLeft" style="top:-2px;left:-2px"></span>`));
                this.iconsArray.push($(`<span class="tr" data-position="topRight" style="top:-2px;right:-2px"></span>`));
                this.iconsArray.push($(`<span class="bl" data-position="bottomLeft" style="bottom:-2px;left:-2px"></span>`));
                this.iconsArray.push($(`<span class="br" data-position="bottomRight" style="bottom:-2px;right:-2px"></span>`));
                this.iconsArray.push($(`<span class="ml" data-position="middleLeft" style="top:50%;left:-2px;transform:translateY(-50%)"></span>`));
                this.iconsArray.push($(`<span class="mr" data-position="middleRight" style="top:50%;right:-2px;transform:translateY(-50%)"></span>`));
                this.iconsArray.push($(`<span class="mb" data-position="middleBottom" style="bottom:-2px;left:50%;transform:translateX(-50%)"></span>`));
                this.iconsArray.push($(`<span class="mt" data-position="middleTop" style="top:-2px;right:50%;transform:translateX(50%)"></span>`));
                this.iconsArray.forEach(icon=>{
                    icon.addClass('zoneResizer')
                    if(this.size !== null)icon.css({ "width" : this.size,"height": this.size});
                    if(this.backGroundColor !== null)icon.css('background-color',this.backGroundColor);
                    if(this.borderStyle !== null)icon.css('border',this.borderStyle);
                    //icon.css('border')
                    console.log(this.template.zones[templateZoneIndex])
                    this.template.zones[templateZoneIndex].$zone.append(icon)
                })
                if(iterIndex === Object.keys(this.template.zones).length-1){
                    let zoneRemoverFinderInterval = setInterval(()=>{
                        if(currentZone.$zone.find('.zoneResizer').length===this.iconsArray.length){
                            resolve('icone zone Remover ajouté partout')
                            clearInterval(zoneRemoverFinderInterval);
                        }
                    },100);
                }
            })
        })
        return myPromise;
    }

    resizeZoneOnMouseActivity(){
        let newPosition,oldPosition,deplacementValue

        $(`.${this.$eventLocation}`).on('mousedown.'+this.constructor,(e)=>{
            this.lastIconClicked = $(e.currentTarget);
            this.activated=true;
            let zoneId=$(e.currentTarget).parent().prop('id').match(/[0-9]*$/)[0];
            this.$currentWorkZone = this.template.zones[zoneId];
            this.zoneStartPositionInTemplate = this.$currentWorkZone.$zone.position();
            this.zoneStartSize = this.$currentWorkZone.size;
            newPosition = this.getCursorPositionInTemplate(e,this.workZone);
            oldPosition = null;
            deplacementValue = null;
        });
        $(`${'body'}`).on('mousemove.'+this.constructor.name, (e) => {


            if (this.activated) {
                oldPosition = newPosition;
                newPosition = this.getCursorPositionInTemplate(e,this.workZone);
                deplacementValue = {left:newPosition.left-oldPosition.left,top:newPosition.top-oldPosition.top}
                let newSize;
                let newPos;
                switch(this.lastIconClicked.data('position')){
                    case 'topLeft':
                        // $('body').addClass('tl');
                        newPos = {left : this.$currentWorkZone.position.left + deplacementValue.left,top:this.$currentWorkZone.position.top + deplacementValue.top};
                        newSize = {width: this.$currentWorkZone.size.width - deplacementValue.left,height:this.$currentWorkZone.size.height - deplacementValue.top};
                        this.$currentWorkZone.setPosition({top:newPos.top,left:newPos.left});
                        this.$currentWorkZone.setSize(newSize);
                        this.template.tools['ZoneInfoDisplayerTool'].updateInfosZoneContent({position:this.$currentWorkZone.position,size:this.$currentWorkZone.size});
                        break;
                    case 'topRight':
                        newPos = {left: false,top:this.$currentWorkZone.position.top+deplacementValue.top};
                        newSize = {width: this.$currentWorkZone.size.width + deplacementValue.left,height:this.$currentWorkZone.size.height-deplacementValue.top};
                        this.$currentWorkZone.setSize(newSize);
                        this.$currentWorkZone.setPosition(newPos);
                        this.template.tools['ZoneInfoDisplayerTool'].updateInfosZoneContent({position:this.$currentWorkZone.position,size:this.$currentWorkZone.size});
                        break;
                    case 'bottomLeft':
                        newPos = {left: this.$currentWorkZone.position.left + deplacementValue.left,top:false};
                        newSize = {width: this.$currentWorkZone.size.width - deplacementValue.left,height:this.$currentWorkZone.size.height+deplacementValue.top};
                        this.$currentWorkZone.setSize(newSize);
                        this.$currentWorkZone.setPosition(newPos);
                        this.template.tools['ZoneInfoDisplayerTool'].updateInfosZoneContent({position:this.$currentWorkZone.position,size:this.$currentWorkZone.size});
                        break;
                    case 'bottomRight' :
                        newSize = {width: this.$currentWorkZone.size.width + deplacementValue.left,height:this.$currentWorkZone.size.height+deplacementValue.top};
                        this.$currentWorkZone.setSize(newSize);
                        this.template.tools['ZoneInfoDisplayerTool'].updateInfosZoneContent({size:this.$currentWorkZone.size});
                        break;
                    case 'middleLeft':
                        newPos = {left: this.$currentWorkZone.position.left + deplacementValue.left,top:false};
                        newSize = {width: this.$currentWorkZone.size.width - deplacementValue.left,height:false};
                        this.$currentWorkZone.setSize(newSize);
                        this.$currentWorkZone.setPosition(newPos);
                        this.template.tools['ZoneInfoDisplayerTool'].updateInfosZoneContent({position:this.$currentWorkZone.position,size:this.$currentWorkZone.size});
                        break;
                    case 'middleRight':
                        newSize = {width: this.$currentWorkZone.size.width + deplacementValue.left,height:false};
                        this.$currentWorkZone.setSize(newSize);
                        this.template.tools['ZoneInfoDisplayerTool'].updateInfosZoneContent({size:this.$currentWorkZone.size});
                        break;
                    case 'middleTop':
                        console.log(deplacementValue.top)
                        console.log(this.$currentWorkZone.position.top)
                        newSize = {width: false,height:this.$currentWorkZone.size.height - deplacementValue.top};
                        newPos = {left: false,top:this.$currentWorkZone.position.top + deplacementValue.top};
                        console.log(this.$currentWorkZone.position)
                        this.$currentWorkZone.setSize(newSize);
                        this.$currentWorkZone.setPosition(newPos);
                        this.template.tools['ZoneInfoDisplayerTool'].updateInfosZoneContent({position:this.$currentWorkZone.position,size:this.$currentWorkZone.size});
                        break;
                    case 'middleBottom':
                        newSize = {width: false,height:this.$currentWorkZone.size.height + deplacementValue.top};
                        this.$currentWorkZone.setSize(newSize);
                        this.template.tools['ZoneInfoDisplayerTool'].updateInfosZoneContent({size:this.$currentWorkZone.size});
                        break;
                }
            }
        });
        $('body').on('mouseup',()=>{
            this.activated = false;
        })
    }
    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){

                this.appendResizeButton().then(()=>{
                    this.resizeZoneOnMouseActivity()
                })
            }else if(mode === 'off'){
                let $eventLocation = $('.'+this.$eventLocation);
                $eventLocation.remove();
                $(`${'body'}`).unbind('mouseup.'+this.constructor.name);
                $eventLocation.unbind('mousedown.'+this.constructor.name);
                $(`${'body'}`).unbind('mousemove.'+this.constructor.name);

               // $('.'+this.removerIcon.class).remove()
            }
        })
    }

}

export {ZoneResizerTool}