import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { UserDetails } from "../../src/@types/type";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import Link from "next/link";
import { useRouter } from "next/router";


type Props = {};

const profile = (props: Props) => {
	const router = useRouter();
	const data = useAtomValue<UserDetails>(atom.auth.api.me);
	const opt = useAtomValue(atom.project.api.my_opt);
	const opt_user = useAtomValue(atom.project.api.my_proj_opt);
	const user = useAtomValue(atom.storage.user);
	const list = useAtomValue(atom.project.api.my);
	const projects = useAtomValue(atom.project.api.my_project);
	const transactions = useAtomValue(atom.auth.api.user_spent);

	let project_images = [];

	list.forEach(element => {
		project_images.push(element?.project_images[0]?.attach_file);
	})

	console.log("projects list", projects);

	console.log("total pages", opt.total_pages);

	const [index, setIndex] = useState(0);
	const [slide, setSlide] = useState(project_images[0]);


	useEffect(() => {
		api.auth.me({});
		api.project.my({ params: { ...opt, status: 1 } });
		api.project.my_projects({ params: { ...opt_user, status: 1 } });
		api.auth.user_spent({params: {}});
		setSlide(project_images[0])
	}, []);

	let totalAmount = 0;

	transactions.forEach((e)=>{
		totalAmount+=e.amount;
	})

	console.log("total spent amount-", totalAmount);

	const handlePageClick = (i) => {
		router
			.replace({
				pathname: router.pathname,
				query: {
					page: i + 1,
				},
			})
			.then(() => {
				api.project.my_projects({ params: { ...opt_user, page: i } });
			});
	};

	const prevSlide = () => {
		if (index == 0) {
			setIndex(project_images.length - 1);
		}
		else {
			setIndex(index - 1);
		}
		setSlide(project_images[index]);
		//console.log("prev slide ", slide);

	}


	const nextSlide = () => {
		setIndex((index + 1) % (project_images.length - 1));
		setSlide(project_images[index]);
		//console.log("next slide ", slide);
	}

	return (
		<>
			<div>
				<div
					className='banner_wp sign_banner'
					style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
					<div className='container'>
						<div className='row'>
							<div className='banner_text inner_banner_text'>
								<h1 className='yh'>My Profile</h1>
							</div>
						</div>
					</div>
				</div>
				<div className='container cjw'>
					<div className='row'>
						<AccountSideBar />

						<div className='col-sm-8'>
							<div className='profile_box'>
								<h3>
									My Profile (
									{user?.role_id == 1
										? "Customer"
										: user?.role_id == 2
											? "Machinist"
											: ""}
									)
								</h3>
								<div className='myprofile_w'>
									<div className='myprofile_l'>
										<div className='myprofile_name_label'>
											<p>Username</p>
										</div>
										<div className='myprofile_name_list'>
											<p>{data?.user_name}</p>
										</div>
										<div className='myprofile_name_label'>
											<p>Name</p>
										</div>
										<div className='myprofile_name_list'>
											<p>{data?.name + " " + data?.surname}</p>
										</div>
										<div className='myprofile_name_label'>
											<p>Address</p>
										</div>
										<div className='myprofile_name_list'>
											<p>{data?.address1}</p>
										</div>
										<div className='myprofile_name_label'>
											<p>Post code</p>
										</div>
										<div className='myprofile_name_list'>
											<p>{data?.zcode}</p>
										</div>
										<div className='myprofile_name_label'>
											<p>City</p>
										</div>
										<div className='myprofile_name_list'>
											<p>{data?.city}</p>
										</div>
										{user?.pro_user == 1 ? (
											<>
												<div className='myprofile_name_label'>
													<p>Company Name</p>
												</div>
												<div className='myprofile_name_list'>
													<p>{data?.company_name}</p>
												</div>

												<div className='myprofile_name_label'>
													<p>SIREN</p>
												</div>
												<div className='myprofile_name_list'>
													<p>{data?.siren}</p>
												</div>
											</>
										) : (<></>)}
										<div className='myprofile_name_label'>
											<p>Country</p>
										</div>
										<div className='myprofile_name_list'>
											<p>{data?.country_code_country?.country_name}</p>
										</div>
										<div className='myprofile_name_label'>
											<p>Description</p>
										</div>
										<div className='myprofile_name_list'>
											<p>{data?.description}</p>
										</div>
										{user?.role_id == 2 ? (
											<>
												<div className='myprofile_name_label'>
													<p>Portfolio Pictures</p>
												</div>
												<div className='myprofile_name_list'>
													<div
														id='demo'
														className='carousel slide'
														data-ride='carousel'>
														<div className='carousel-inner'>
															<div className='carousel-item active'>
																<img src={common.get_image(slide)} id="curr_img" />
															</div>
														</div>
														<button
															className='carousel-control-prev'
															onClick={prevSlide}
															data-slide='prev'>
															<span className='carousel-control-prev-icon' />
														</button>
														<button
															className='carousel-control-next'
															onClick={nextSlide}
															data-slide='next'>
															<span className='carousel-control-next-icon' />
														</button>
													</div>
												</div>






											</>
										) : (
											<></>
										)}
										{user?.role_id == 2 && user?.pro_user == 1 ? (
											<>
												<table>
													<tr>
														<td><b>TVA : </b></td>
														<td><b>{user?.pro_vat}%</b></td>
													</tr>
												</table>
											</>
										) : (<></>)}
										{/* <div className='myprofile_name_label'>
											<p>Portfolio Pictures</p>
										</div>
										<div className='myprofile_name_list'>
											<div
												id='demo'
												className='carousel slide'
												data-ride='carousel'>
												<div className='carousel-inner'>
													<div className='carousel-item active'>
														<img src='/img/pic.png' />
													</div>
													<div className='carousel-item'>
														<img src='/img/pic1.png' />
													</div>
													<div className='carousel-item'>
														<img src='/img/pic2.png' />
													</div>
												</div>
												<a
													className='carousel-control-prev'
													href='#demo'
													data-slide='prev'>
													<span className='carousel-control-prev-icon' />
												</a>
												<a
													className='carousel-control-next'
													href='#demo'
													data-slide='next'>
													<span className='carousel-control-next-icon' />
												</a>
											</div>
										</div> */}
									</div>
									<div className='myprofile_r'>
										<figure>
											<img
												src={
													common.get_image(data?.prof_pic) ||
													"/img/no-images.png"
												}
											/>
										</figure>
										<figcaption>Profile Picture</figcaption>
									</div>
								</div>
								<hr />
								{user?.role_id == 1 ? (
									<>
										<h3>My Jobs</h3>
										<div className='table-responsive'>
											<table className='table table-bordered table-sm'>
												<thead>
													<tr className='table-primary'>
														<td>Jobs published</td>
														<td>Jobs awarded</td>
														<td>Evaluations</td>
														<td>GBP Spent</td>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>{list?.length}</td>
														<td>
															{
																transactions?.length
															}
														</td>
														<td>
															{list?.reduce(
																(a, b) => a + parseInt(b?.bids_count || "0"),
																0,
															)}{" "}
															Votes received
														</td>
														<td>{totalAmount}</td>
													</tr>
												</tbody>
											</table>

											<div>
												<table className='table table-bordered table-sm'>
													<thead>
														<tr className='table-primary'>
															<th scope='col'>Job Title</th>
															<th scope='col'>Published</th>
														</tr>
													</thead>
													<tbody>
														{projects?.length ? (
															projects?.map((l) => {
																return (
																	<tr>
																		<td>{l?.project_name}</td>
																		<td>
																			{moment(l?.createdAt).format(
																				"DD-MMM, YYYY",
																			)}
																		</td>
																	</tr>
																);
															})
														) : (
															<></>
														)}
													</tbody>
												</table>

												<ul className='pagination'>
													{/* <li className='page-item'>
														<a className='page-link' href='#'>
															Previous
														</a>
													</li> */}
													{Array.from({ length: opt_user.total_pages + 1 }).map(
														(d, i: any) => {
															return (
																<li
																	className={`page-item ${parseFloat((router?.query?.page || 0).toString()) -
																		1 ==
																		i
																		? "active"
																		: ""
																		}`}>
																	<Link href={`${router.pathname}?page=${i}`}>
																		<a
																			className='page-link'
																			onClick={(e) => {
																				e.preventDefault();
																				handlePageClick(i);
																			}}>
																			{i + 1}
																		</a>
																	</Link>
																</li>
															);
														},
													)}

													{/* <li className='page-item'>
														<a className='page-link' href=''>
															Next
														</a>
													</li> */}
												</ul>


											</div>

										</div>
									</>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
profile.ignorePath = false;

export default profile;
