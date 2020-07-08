let auth0 = null;

window.onload = async () => {
    await configureClient();

    // If callback parameters are provided, parse them and authenticate a user
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        console.log("Query: " + query);

        try {
            await auth0.handleRedirectCallback();
        } catch (e) {
            console.log("Login redirect callback cannot be handled", e);
        }

        // Delete callback parameters from url of the page
        window.history.replaceState({}, document.title, "/");
    }

    await updateUi();
}

/**
 * Creates Auth0 client.
 * @returns {Promise<void>}
 */
const configureClient = async () => {
    const config = {
        "domain": "se-skills-tree.eu.auth0.com",
        "clientId": "xuAl3zkmL9tNnDRgskTbAE4xKt63Qy2M"
    };

    auth0 = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
    });
}

/**
 * Depending on is user authenticated or not:
 * - changes the visibility of login/logout buttons;
 * - shows the skills obtained by the user.
 * @returns {Promise<void>}
 */
const updateUi = async () => {
    const isAuthenticated = await auth0.isAuthenticated();
    console.log("Is authenticated: " + isAuthenticated);

    if (isAuthenticated) {
        console.log("User", await auth0.getUser());
        console.log("Id token", await auth0.getIdTokenClaims());

        $("#btn-login").attr("disabled", true);
        $("#btn-logout").attr("disabled", false);

    } else {
        $("#btn-login").attr("disabled", false);
        $("#btn-logout").attr("disabled", true);
    }

    await getAndShowObtainedSkills();
}

/**
 * Login a user with Auth0.
 * @returns {Promise<void>}
 */
const login = async () => {
    try {
        console.log("Logging in");
        await auth0.loginWithRedirect({
            redirect_uri: window.location.origin
        });
    } catch (e) {
        console.log("Log in failed", e);
    }
};

/**
 * Logout the user.
 * @returns {Promise<void>}
 */
const logout = async () => {
    try {
        console.log("Logging out");
        await auth0.logout({
            returnTo: window.location.origin
        });
    } catch (e) {
        console.log("Log out failed", e);
    }
};

/**
 * Representation of a user's skill.
 * @param skillId   the id of a skill
 * @param level     the level of a skill obtained by the user
 * @constructor
 */
function UserSkill(skillId, level) {
    this.skillId = skillId;
    this.level = level;
}

function UserSkillsContainer(userSkills) {
    this.userSkills = userSkills;
}

/**
 * Makes a skills to be obtained by the user.
 * @param skillId   the id of a skill
 * @param level     the level of a skill obtained by the user
 * @returns {Promise<void>}
 */
const obtainSkill = async (skillId, level) => {
    const userSkill = new UserSkill(skillId, level);
    const currentLevel = $("#" + userSkill.skillId + " > div").attr("level");

    console.log("Current skill's level: " + currentLevel);
    if (currentLevel != null && currentLevel > 0) {
        userSkill.level = 0;
    }

    const userSkillsContainer = new UserSkillsContainer(Array.of(userSkill));
    $.ajax({
        url: "https://6gk4moo333.execute-api.us-east-1.amazonaws.com/test/users/" +
            (await auth0.getUser()).sub + "/skills",
        type: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + (await auth0.getIdTokenClaims()).__raw
        },
        crossDomain: true,
        data: JSON.stringify(userSkillsContainer),
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log("skill id: " + userSkill.skillId);
            if (userSkill.level === 0) {
                $("#" + userSkill.skillId).css("border", "1px solid");
            } else {
                $("#" + userSkill.skillId).css("border", "2px solid");
            }
            $("#" + userSkill.skillId + " > div").attr("level", userSkill.level);
        },
        error: function (xhr, status) {
            console.log("Cannot get the response from user skills API");
        }
    });
}

/**
 * Receives the skills obtained by the user from the backend and shows them on the skills tree.
 * @returns {Promise<void>}
 */
const getAndShowObtainedSkills = async () => {
    console.log("--> " + (await auth0.getUser()).sub);
    $.ajax({
        url: "https://6gk4moo333.execute-api.us-east-1.amazonaws.com/test/users/" +
            (await auth0.getUser()).sub + "/skills",
        type: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + (await auth0.getIdTokenClaims()).__raw
        },
        crossDomain: true,
        success: function (response) {
            console.log(response.userSkills);
            response.userSkills.forEach((value, index, array) => {
                console.log("skill id: " + value.skillId + ", level: " + value.level);
                if (value.level > 0) {
                    $("#" + value.skillId).css("border", "2px solid");
                }
                $("#" + value.skillId + " > div").attr("level", value.level);
            });
        },
        error: function (xhr, status) {
            console.log("Cannot get the response from user skills API");
        }
    });
}
