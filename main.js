
Hooks.once('getUserContextOptions', () => {
    const name = game.user.name;
    if (ciIncludes(name, "return") && ciIncludes(name, "to") && ciIncludes(name, "setup")) {
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
            if (ciIncludes(user.name, "return") && ciIncludes(user.name, "to") && ciIncludes(user.name, "setup")) {
                createUser = false;
            }
        });
        if (createUser) {
            createUserObject();
        }
    }
});

/**
 * @param  {String} input
 * @param  {String} query
 */
function ciIncludes(input, query) {
    return input.toLowerCase().includes(query.toLowerCase());
}

async function createUserObject() {
    const user = await User.create({
        name: "Return to Setup",
        role: CONST.USER_ROLES.GAMEMASTER
    });
}
