import {TemplateTool} from '../TemplateTool.js'
class ZoneInfoDisplayerTool extends TemplateTool{
    constructor(template){
        super(template);
        this.title='ZoneInfos';
        this.setIcon('fal fa-arrows');
        this.$eventLocation = document
        this.$location = {
            zones   : $('.zones'),
            infoDiv : $('.infos'),
        }
        this.infosZoneAttrs = {
            name     : null,
            position : null,
            size     : null
        }
    }

    updateInfosZoneContent({name = null, position = {left : null, top : null}, size = {width : null, height:null} } = {}){
        if(name !== null){
            console.log(this.$location.infoDiv.find('#name'))
            this.$location.infoDiv.find('#name').val(name)
        }

        if(position.left !== null && position.top !== null){
            this.$location.infoDiv.find('#x').val(position.left);
            this.$location.infoDiv.find('#y').val(position.top);
        }

        if(size.width !== null && size.height !== null){
            this.$location.infoDiv.find('#width').val(size.width);
            this.$location.infoDiv.find('#height').val(size.height);
        }
    }
    activeTool(boolean){
        super.activeToolDecorator(boolean,(mode)=>{
            if(mode==='on'){
                console.log('ici')
                $(this.$eventLocation).on('click', '.zone', e => {
                    let current = e.currentTarget
                    let zoneId=$(current).prop('id').match(/[0-9]*$/)[0];
                    this.lastTargetZone = this.template.zones[zoneId];
                    console.log(current)
                    this.updateInfosZoneContent({
                        name     : this.lastTargetZone.name,
                        position : this.lastTargetZone.position,
                        size     : this.lastTargetZone.size
                    })
                    // Supprime la classe 'opacity' sur l'ensemble des zones
                    $('.zone').removeClass('opacity')
                    // Ajoute la classe 'opacity' à la zone active
                    $(current).addClass('opacity')
                    // Affiche le container contenant les informations de la zone
                    $('.infos').fadeIn('slow')
                    // On rend disponible l'option 'Transformation manuelle'
                    $('#toolbar span.disabled, nav ul li.disabled').removeClass('disabled')
                })
            }
            if(mode=='off'){

            }
        })
    }

}

export {ZoneInfoDisplayerTool}