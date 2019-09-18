$(_ => {
    // Masque un élément sur la page
    $(document).on('click', '.close', e => {
        let current = e.target
        // On remonte au parent pour masique l'ensemble
        $(current).parent().fadeOut('slow')
    })
})