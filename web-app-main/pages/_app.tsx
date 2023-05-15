//bootstrap css
import "bootstrap/dist/css/bootstrap.css";

//custom css
import "../styles/animate.scss";

import "../styles/bootstrap.min.css";
import "../styles/globals.scss";
import "../styles/responsive.scss";

import { SSRProvider } from "react-bootstrap";
import Layout from "../src/views/Layouts/Main";
import { Toaster } from "react-hot-toast";
import JotaiNexus, { readAtom } from "jotai-nexus";
import { Provider } from "jotai";
import AuthPage from "../src/helpers/AuthPage";
import { useEffect, useState } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	const [isBrowser, setIsBrowser] = useState(false);

	const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
	useEffect(() => {
		setIsBrowser(true);
	}, []);

	if (!isBrowser) {
		return (
			<>
				<Head>
					<link rel='stylesheet' href='/css/bootstrap.min.css' />
					<link rel='stylesheet' href='/css/all.min.css' />
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='stylesheet' href='/css/style.css' />
				</Head>
			</>
		);
	} else {
		return (
			<Provider>
				<SSRProvider>
					{Component.ignorePath ? (
						getLayout(<Component {...pageProps} />)
					) : (
						<AuthPage>{getLayout(<Component {...pageProps} />)}</AuthPage>
					)}
					<JotaiNexus />
					<Toaster />
				</SSRProvider>
			</Provider>
		);
	}
}

export default MyApp;
