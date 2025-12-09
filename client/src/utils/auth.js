
// We store the token + user object in sessionStorage under "jwt"
const auth = {
  // Save auth data: { token, user }
  authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("jwt", JSON.stringify(jwt));
    }
    if (cb) cb();
  },

  // Get auth data or false if not logged in
  isAuthenticated() {
    if (typeof window === "undefined") return false;
    const stored = window.sessionStorage.getItem("jwt");
    return stored ? JSON.parse(stored) : false;
  },

  // Clear auth data and run callback
  clear(cb) {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("jwt");
    }
    if (cb) cb();
  },
};

export default auth;
