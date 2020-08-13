
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
            if (user.name === "Return to Setup") {
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
        name: "Return to Setup",
        role: CONST.USER_ROLES.GAMEMASTER
    });
}
