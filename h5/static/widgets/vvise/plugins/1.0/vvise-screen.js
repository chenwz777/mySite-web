var vviseScreen = {
    requestFullscreen: function () {
        var documentElement = document.documentElement;
        if (!this.getScreenStatus()) {

            if (documentElement.requestFullscreen) {
                documentElement.requestFullscreen();
            } else if (documentElement.msRequestFullscreen) {
                documentElement.msRequestFullscreen();
            } else if (documentElement.mozRequestFullScreen) {
                documentElement.mozRequestFullScreen();
            } else if (documentElement.webkitRequestFullscreen) {
                documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
    },

    exitFullscreen: function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    },

    getScreenStatus: function () {
        var ifFull = false;
        if (document.fullscreenElement || document.mozFullScreenElement ||
            document.webkitFullscreenElement || document.msFullscreenElement) {
            ifFull = true;
        }

        return ifFull;
    },

    toggleFullscreen: function () {
        var ifFull = this.getScreenStatus();
        if (!ifFull) {
            this.requestFullscreen();
        } else {
            this.exitFullscreen();
        }

        return !ifFull;
    }
};