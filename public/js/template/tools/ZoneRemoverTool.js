import {TemplateTool} from '../TemplateTool.js'
class ZoneRemoverTool extends TemplateTool{
    constructor(template){
        super(template);
        this.setIcon('fal fa-trash-alt');
        this.title='Supprimer';
        this.$eventLocation = $('.zoneDeleter');
        this.removerIcon = {
            name : '<i class="fal fa-times"></i>',
            size : 10,
            position: {top:false,bottom:false,left:false,right:0},
            class:'zoneDeleter'
        }

        console.log('ici')
    }

    appendCloseButton(){
        var myPromise = new Promise(resolve=>{
            Object.keys(this.template.zones).forEach((zoneIndex,indexIter)=>{
                let currentZone = this.template.zones[zoneIndex];
                let removerIcon = $(this.removerIcon.name);
                removerIcon.css('font-size',this.removerIcon.size+'px');
                removerIcon.css('position','absolute');

                removerIcon.css({'right':this.removerIcon.position.right});
                removerIcon.css('box-shadow','inset 0 0 0 1px');
                removerIcon.css('padding',5);
                removerIcon.addClass(this.removerIcon.class);
                currentZone.$zone.append(removerIcon);
                if(indexIter === Object.keys(this.template.zones).length-1){
                    console.log('unefois')
                    let zoneDeleterFinderInterval = setInterval(()=>{
                        if(currentZone.$zone.find('.zoneDeleter').length>0){
                            resolve('icone zone Deleter ajouté partout')
                            clearInterval(zoneDeleterFinderInterval);
                        }
                    },100);
                }
            })
        });
        return myPromise;

    }

    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                this.appendCloseButton().then(()=>{
                    $(`.${this.removerIcon.class}`).on('click.'+this.constructor.name,(e)=>{
                        let zoneId=$(e.currentTarget).parent().prop('id').match(/[0-9]*$/)[0];
                        console.log(this.template.deleteZoneInTemplate(zoneId));
                    });
                })
            }else if(mode === 'off'){
                $('.'+this.removerIcon.class).remove()
            }
        })
    }
}

export {ZoneRemoverTool}