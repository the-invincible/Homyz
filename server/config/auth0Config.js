import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
    audience: "https://animated-enigma-x5x759q5gpwxc57p-8000.app.github.dev",
    issuerBaseURL: "https://dev-cjthkvbi2d02zo4n.us.auth0.com",
    tokenSigningAlg: "RS256"
});

export default jwtCheck;