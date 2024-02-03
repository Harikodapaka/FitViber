"use client";
import styles from "./page.module.css";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Page(): JSX.Element {
	return (
		<GoogleOAuthProvider clientId="">
			<main className={styles.main}>
				<h1>👋🏼 from Fit Viber</h1>
				<div>
					<GoogleLogin
						onSuccess={async (credentialResponse: any) => {
							console.log("credentialResponse", credentialResponse);

							const response = await fetch("http://localhost:9999/graphql", {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									query: `
								mutation authorizeGoogleUser {
									authorizeGoogleUser(token: "${credentialResponse.credential}") {
									  message
									  success
									}
								}
								`,
								}),
							});
							console.log("response", response);
						}}
						onError={() => {
							console.log("Login Failed");
						}}
					/>
				</div>
			</main>
		</GoogleOAuthProvider>
	);
}
