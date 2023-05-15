import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import atom from "../../../jotai/atom";
import Routes from "../../../Routes";

type Props = {};

export default function Header({}: Props) {
	const router = useRouter();
	const [user, setUser] = useAtom(atom.storage.user);

	useEffect(() => {}, []);

	const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		console.log("hello");
		setUser(null);
		router.push("/auth/sign-ing");
	};
	return (
		<>
			<header className='myheader sticky-top'>
				<nav className='navbar bg-light navbar-expand-lg '>
					<div className='container'>
						<Link href='/'>
							<a className='navbar-brand'>
								<img src={"/img/logo.png"} alt='' className='img-fluid logo' />
							</a>
						</Link>
						<button
							className='navbar-toggler'
							type='button'
							data-bs-toggle='offcanvas'
							data-bs-target='#offcanvasNavbar'
							aria-controls='offcanvasNavbar'>
							<span className='navbar-toggler-icon' />
						</button>
						<div
							className='offcanvas offcanvas-start'
							tabIndex={-1}
							id='offcanvasNavbar'
							aria-labelledby='offcanvasNavbarLabel'>
							<div className='offcanvas-header'>
								<h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
									Menu
								</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='offcanvas'
									aria-label='Close'
								/>
							</div>
							<div className='offcanvas-body justify-content-lg-between align-items-lg-center'>
								<ul className='navbar-nav  align-items-lg-center flex-grow-1 pe-3'>
									{Routes.headers.map((r) => {
										return (
											<li className='nav-item' key={r.path}>
												{user && !r.role.includes(user?.role_id) ? (
													<Link href={`#`}>
														<a
															className={`nav-link ${
																router.pathname == r.path ? "active" : ""
															}`}
															onClick={(e) => {
																e.preventDefault();
																toast(
																	`Login as ${
																		user?.role_id == 1 ? "Supplier" : "Customer"
																	} to ${r.title}`,
																);
															}}>
															{r.title}
														</a>
													</Link>
												) : (
													<Link href={`${r.path}`}>
														<a
															className={`nav-link ${
																router.pathname == r.path ? "active" : ""
															}`}>
															{r.title}
														</a>
													</Link>
												)}
											</li>
										);
									})}
								</ul>
								{user ? (
									<div className='d-flex'>
										<Link href={`/auth/sign-in`}>
											<a className='btn login-btn' onClick={handleLogout}>
												Log out
											</a>
										</Link>
									</div>
								) : (
									<div className='d-flex'>
										<Link href={`/auth/sign-in`}>
											<a className='btn login-btn'>login / sign up</a>
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</nav>
			</header>
		</>
	);
}
