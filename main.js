
Hooks.once('getUserContextOptions', () => {
    if (game.user.name === "Return to Setup") {
        if (sessionStorage.getItem("returnedToSetup") === "true") {
            sessionStorage.removeItem("returnedToSetup");
            game.logOut();
        } else {
            game.shutDown();
            sessionStorage.setItem("returnedToSetup", "true");
        }
    }
    if (game.user.isGM) {
        let createUser = true;
        game.users.forEach(/** @param {User} user */(user) => {
            if (user.name === game.i18n.localize("rts.ReturnToSetup")) {
                createUser = false;
            }
        });
        if (createUser) {
            createUserObject();
        }
    }
});

async function createUserObject() {
    const user = await User.create({
        name: game.i18n.localize("rts.ReturnToSetup"),
        role: CONST.USER_ROLES.GAMEMASTER
    });
}
