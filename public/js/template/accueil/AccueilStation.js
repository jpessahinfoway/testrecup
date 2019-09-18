class AccueilStation{
    constructor(){
        this.$locationObject = {
            stageNav : $('nav ul li'),
            templateActionForms : $('.form'),
            allTemplateActionsButtonsInStage : $('.panels'),
            templateActionButtonInCurrentStage : $('.panel'),
            stageStepNavButton : {
                new : null,
                old : null
            },
            oldStagePannelLocation : null
        };
        this.lastStageClicked = 1,
        this.lastPanelOptionClicked;
    }
    init(){
        this.initStageNavigation()
        this.initDisplayFormEventOnUserActionChoice()
    }

    initStageNavigation(){
        console.log('initStageNavigation()')
        this.$locationObject.stageNav.on('click',(e)=>{
            this.$locationObject.stageStepNavButton.new = $(e.target).parent();

            this.$locationObject.templateActionForms.addClass('none');
            this.$locationObject.allTemplateActionsButtonsInStage.addClass('none');
            this.$locationObject.stageNav.removeClass('active');

            // Ajout de la classe 'active'
            this.$locationObject.stageStepNavButton.new.addClass('active')
            // Choix de l'utilisateur
            this.lastStageClicked = this.$locationObject.stageStepNavButton.new.data('stage');
            // Affiche les choix sur la page
            $('#panels-' + this.lastStageClicked).removeClass('none')
            this.$locationObject.stageStepNavButton.old = $(e.target).parent();

        })
    }

    initDisplayFormEventOnUserActionChoice(){
        console.log('initDisplayFormEventOnUserActionChoice()');
        this.$locationObject.templateActionButtonInCurrentStage.on('click',(e)=>{

            let current = e.target;

            this.$locationObject.templateActionForms.addClass('none');
            this.lastPanelOptionClicked = $(current).parent().data('option');
            $('#panel-' + this.lastStageClicked + '-' + this.lastPanelOptionClicked).removeClass('none')
        })
    }

}

export { AccueilStation }