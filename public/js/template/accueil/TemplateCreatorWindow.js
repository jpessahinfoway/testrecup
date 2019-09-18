import {ActionWindow} from "./ActionWindow.js";

class TemplateCreatorWindow extends ActionWindow{

    constructor(templateInterface){
        super(templateInterface);
            this.setTitle('Creer un template')
    }

    switchOn(){
        super.switchOn();
        this.attachFormatChooserRadios().attachTemplateNameInput()
    }

    attachFormatChooserRadios(){
       let inclusiveRadioDiv =  $('<div></div>');
        inclusiveRadioDiv.addClass('radios-group');
        inclusiveRadioDiv.append('<span>Orientation du Template</span>')
        Object.keys(this.interface.options['format']).forEach((format,indexFormat)=>{
            let currentFormat = this.interface.options['format'][format];
            let radioDiv = $('<div></div>');
            radioDiv.addClass('radio');
            let input = $('<input>');
            input.attr({
                'type':'radio',
                'name':'orientation',
                'id'  : currentFormat
            });
            let label = $('<label>'+currentFormat+'</label>');
            label.attr('for',currentFormat.toLowerCase());
            inclusiveRadioDiv.append(radioDiv.append(input).append(label))
        });
        this.$windowLocation.find('form').append(inclusiveRadioDiv);
        return this;
    }

    attachTemplateNameInput(){
        let inclusiveInputDiv =  $('<div></div>');
        inclusiveInputDiv.addClass('input-group');
        let label = $('<label>Nom du Template</label>');
        label.attr('for','name');
        let input = $('<input>')
        input.attr({
            'type':'text',
            'name':'name',
            'id'  : 'name'
        });
        this.$windowLocation.find('form').append(inclusiveInputDiv.append(label).append(input));
        return this;

    }
}

export { TemplateCreatorWindow }