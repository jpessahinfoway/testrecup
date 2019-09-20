class TemplateTool {
    constructor(template){
        this.template = template;
        this.name = this.constructor.name
        this.jq = null;
        this.icon = null;
        this.title = null
        this.state = 'disabled';
        this.$eventLocation=null;
        this.workZone = $('#template__workzone__templateZone')
        this.activatedSubTool =null;
        this.activated = false;
    }

    getCursorPositionInTemplate(e,$el) {
        let offsetElement = this.getOffset($el);
        return {left : e.pageX - offsetElement.left,top: e.pageY - offsetElement.top}
    }

    getOffset( $el ) {
        let el = $el.get(0)
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }

    setIcon(iconClass){
        this.icon = $(`<i data-eventname="${this.constructor.name}"></i>`)
        this.iconContainer = $(`<span title=${this.title} class="${this.name}"></span>`);

        this.iconContainer.append(this.icon);

        iconClass.split(' ').forEach((className)=>{
            this.icon.addClass(className);
        });
        this.icon.data('eventname',this.constructor.name);
        console.log(iconClass);
    }

    isActivated(){
        return this.state ==='enabled';
    }
    switchState(){
        if(typeof this.state === 'undefined' || (this.state !== 'enabled' && this.state !== 'disabled')){
            console.log('[TemplateTool :: switchState] Mauvais paramètre indiqué. La fonction switchState requiere un parametre valant enabled ou disabled')
            return;
        }
        if(this.state === 'enabled')this.state = 'disabled';
        else this.state='enabled';
        console.log(this.state);
        return this.state !== 'disabled';
    }

    activeToolDecorator(boolean,functionToExecuteWhenEventIsTriggered){
        console.log('aaaaaaaa')
        if(typeof boolean ==='undefined'){
            this.activeToolDecorator(this.switchState());
            return;
        }
        else{
            if(typeof boolean !=='boolean'){
                console.log('[TemplateTool :: activeTool] Mauvais paramètre indiqué. La fonction activeTool requiere un parametre de type booleen ou aucun parametre')
                return
            }
        }
        if(typeof this.$eventLocation === 'undefined' || this.$eventLocation== null){
            console.log('Attention aucune zone d application d evenement reconnue, Veuillez specifier le champ d action de l evenement pour le tool '+this.constructor.name);
        }
        if(boolean){
            this.state = 'enabled';
            //this.activeTool(false);
           if(typeof this.$eventLocation !== 'undefined' && this.$eventLocation!== null ){
               console.log('iiiiiii')
                   functionToExecuteWhenEventIsTriggered('on')
           }
            this.state = 'enabled';
            console.log(this.state);
        }else{
            this.state='disabled';
            if(typeof this.$eventLocation !== 'undefined' && this.$eventLocation!== null ){
                functionToExecuteWhenEventIsTriggered('off')
            }
            console.log('fonction desactivée');
        }
    }


}

export {TemplateTool}