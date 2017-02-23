(function (p_oRoot, p_oUserInterface, p_oMath){
    var aSubjectKeys = [],
        aTopics = [],
        iCurrentRandom,
        p_iSubjects,
        iTopicCount = 0,
        oSubjects = {},
        sCurrentSubject = ''
    ;

    function getRandomInt(p_iMax, p_aExclude) {
        var bFound = false, iMin = 0, iRandom;

        while (bFound === false) {
            iRandom = p_oMath.floor(p_oMath.random() * (p_iMax - iMin)) + iMin;

            if (p_aExclude.indexOf(iRandom) === -1) {
                bFound = true;
            }
        }

        return iRandom;
    }

    function createCard(p_sSubject) {
        var oTemplate, oContent, oContainer, oClone;

        oTemplate = p_oUserInterface.querySelector('template');
        oContent = oTemplate.content.querySelector('.card__content');

        oContent.textContent = p_sSubject;

        oContainer = p_oUserInterface.querySelector('.card-container');
        oClone = p_oUserInterface.importNode(oTemplate.content, true);

        oContainer.appendChild(oClone);
    }

    function pick(p_aTopics, p_iSubjects) {
        iTopicCount = p_aTopics.length;

        while (p_iSubjects > 0) {
            iCurrentRandom = getRandomInt(iTopicCount, aSubjectKeys);

            aSubjectKeys.push(iCurrentRandom);

            oSubjects[iCurrentRandom] = p_aTopics[iCurrentRandom];

            p_iSubjects--;
        }

        Object.keys(oSubjects).forEach(function(p_iKey) {
            createCard(oSubjects[p_iKey]);
        });
    }

    p_oRoot.RandomInspirationPicker = pick;
}(window, document, Math));