import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorizationUrl:
				"https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
			scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.sleep.read",
		}),
	],
	jwt: {
		encryption: true,
	},
	secret: process.env.SECRET,
	callbacks: {
		async jwt(token, user, account) {
			if (account && user) {
				token.refreshToken = account.refreshToken;
			}
			return token;
		},
		async session(session, token) {
			if (token) {
				session.refreshToken = token.refreshToken;
			}
			return session;
		},
	},
});
