import { useEffect, useState } from "react";

import test from "../src/validation/schema/test";
import { perfTest, Pick, Validate } from "../src/validation/utils/test";
import _ from "lodash";
import Joi from "joi";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import api from "../src/api/services/api";
import HomeHeader from "../src/views/index/HomeHeader";
import LastJobPictures from "../src/views/index/LastJobPictures";
import { useAtomValue } from "jotai";
import atom from "../src/jotai/atom";
import { ProjectDetails } from "../src/@types/type";
import moment from "moment";
import common from "../src/helpers/common";
import router from "next/router";
import axios from "axios"
import { writeAtom } from "jotai-nexus";

function Home() {
	const latest = useAtomValue(atom.project.api.latest);
	const allreviews = useAtomValue(atom.project.api.allreviews);
	const all_list = useAtomValue(atom.project.api.all_list);
	

	useEffect(() => {
		api.project.latest({ params: { page: 0 } });
	}, []);

	useEffect(() => {
		api.project.allreviews({ params: {} });
	}, []);

	useEffect(() => {
		api.project.image_list({params: {}})
	}, []);

	useEffect(() => {
		api.project.all_lists({ params: {} });
	}, []);

       console.log("latest lists are:- ", latest)

	console.log("all lists are: ------------->", all_list)

	console.log("All reviews are: -", allreviews)

	const RefLink = (l) => {
		localStorage.setItem('items', (l));
		router.replace(l)
	}
	
	const handlepost = () => {
		router.push("/job/post")
	}

	return (
		<>
			<HomeHeader />
			<div>
				<div className='container latest_request'>
					<div>
						<h1>latest requests</h1>
					</div>
					<div className='row'>
						{latest?.length
							? latest?.map((l) => {
								return (
									<div className='col-sm-4'>
										<div className='laste_l'>
											<figure>
												{l?.attachment_name?.includes(",") ? (

									<img
										src={common.get_attachment(
											(l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')),
											l?.createdAt,
										)}
									/>
								) : (
									<img
										src={common.get_attachment(
											(l?.attachment_name),
											l?.createdAt,
										)}
									/>
								)}
											</figure>
											<div>
												<h3>{l?.project_name}</h3>
											<p>{l?.description?.length > 20 ? (l?.description?.slice(0, 20) + '...') : (l?.description)}</p>
												<span>
													Posted :{moment(l?.project_post_date).fromNow()}
												</span>
											</div>
										</div>
									</div>

								);
							}).slice(0, 3)
							: ""}
					</div>
					<div className='all_request_button'>
						<Link href='/job/listing'>
							<a>
								All Requests <i className='fa fa-angle-right' />
							</a>
						</Link>
					</div>
				</div>
				<div className='container step_wrapper'>
					<div className='row'>
						<div className='col-sm-4'>
							<div className='step_w'>
								<figure>
									<img src='img/icon_1.png' />
								</figure>
								<div>
									<span>1</span>
									<h4>Send your blueprint...</h4>
								</div>
							</div>
						</div>
						<div className='col-sm-4'>
							<div className='step_w'>
								<figure>
									<img src='img/icon_2.png' />
								</figure>
								<div>
									<span>2</span>
									<h4>Choose the best CNC quote</h4>
								</div>
							</div>
						</div>
						<div className='col-sm-4'>
							<div className='step_w'>
								<figure>
									<img src='img/icon_3.png' />
								</figure>
								<div>
									<span>3</span>
									<h4>Pay after delivery only if satisfied</h4>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='container price-guide'>
					<h4>Machining Price Guide</h4>
					<p>How much for my custom machined part ?</p>
					<figure>
					<img src="https://www.usineur.fr/euro%20symbole.jpg" />
					</figure>
					<div>
							<a href='/account/price'>
								See all prices <i className='fa fa-angle-right' />
							</a>

					</div>

				</div>

				<div className='container machin1'>
					<div className='row'>
						<div className='col-sm-6'>
							<div className='machin4'>
								<h3>Machining-4U</h3>
								<p>
									is a specialised online marketplace connecting buyers and
									machinists. By dealing directly with a machinist, you can pay
									the lowest prices available by avoiding the sizeable markup
									charged by larger CNC manufacturing companies.
									<br />
									<br />
									No longer do you need to browse numerous sites to find the
									best prices for CNC machined parts. Simply post a free listing
									on Machining-4U, and wait for the affordable quotes to come
									in. When you find a price you are happy with, a machinist will
									get started on making your custom machined part.
									<br />
									<br />
									With so many machinists working for us, we can take on any
									requirement you may have, whether it's with aluminium, steel,
									stainless steel, brass or plastic. Some of our CNC machining
									capabilities include CNC milling, CNC routing and CNC cutting.
									<br />
									<br />
									CNC mills are the most commonly used CNC machines, and their
									core functions include drilling and turning metals. Routers
									are highly automated machines capable of cutting complex
									shapes and prototypes. CNC plasma cutting works in a similar
									way to CNC routing, but it requires a less-powerful setup. CNC
									turning, performed with a CNC lathe, involves
								</p>
							</div>
						</div>
						<div className='col-sm-6'>
							<figure className='machin2'>
								<img src='img/pic3.jpg' />
							</figure>
						</div>
					</div>
				</div>
				<div className='container machin1'>
					<div className='row'>
						<div className='col-sm-6'>
							<figure className='machin3'>
								<img src='img/pic4.jpg' />
							</figure>
						</div>
						<div className='col-sm-6'>
							<div className='machin5'>
								<h3>"CNC Machining One Part Only"</h3>
								<p>
									I finally found the solution to all my machined part needs!
									The workshop on the corner was not really interested in my
									ideas, but on machining-4u I got two offers right away! My
									chosen machinist delivered the parts in just a week and I was
									thrilled. I was able to inspect the delivered parts before my
									payment was processed which gave me the confidence to do my
									first online order on the site.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='container machin1'>
					<div className='row'>
						<div className='col-sm-6'>
							<div className='machin5'>
								<h3>"CNC Machined Parts Online"</h3>
								<p>
									A great new online machining service for anyone who needs to
									find affordable, CNC machined parts. I posted my blueprints
									for the aluminium and steel parts that I designed, chose a
									machinist from a list of proposals and one week later my CNC
									parts are ready to be installed! It was so easy to turn my
									plans into a reality!
								</p>
							</div>
						</div>
						<div className='col-sm-6'>
							<figure className='machin3'>
								<img src='img/pic5.jpg' />
							</figure>
						</div>
					</div>
				</div>


					<div className='container latest_request'>
					<div>
						<h1>Latest Achievements</h1>
					</div>
					<div className='row'>
						{all_list?.length
							? (all_list?.slice(0, 4).map((l) => {
								return (
									l?.adminApprove == 1 ? (
										<div className='col-sm-3'>
											<div className='last_l'>
												<figure>
													<a data-toggle="tooltip" data-placement="top" title={l?.project_name}>
														

														{l?.attach_file?.includes(",") ? (

															<img
																src={common.get_image(
																	(l?.attach_file)?.substring(0, l?.attach_file.indexOf(',')), 
																	
																)}

															onClick={() => RefLink(`/project/${l?.project_name}/${l?.project_id}`)}
															/>
														) : (
															<img
																src={common.get_image(
																	(l?.attach_file),
																	
																)}
															onClick={() => RefLink(`/project/${l?.project_name}/${l?.project_id}`)}
															/>
														)}
													</a>
												</figure>
											</div>

										</div>
									) : (<></>)
								);
							}))
							: ""}
					</div>
					<div className='all_request_button'>
						<Link href='/account/projectgallery'>
							<a>
								All the pictures <i className='fa fa-angle-right' />
							</a>
						</Link>
					</div>
				</div>


				<div className='container latest_review'>
					<div>
						<h1>Latest Reviews</h1>
					</div>
					<div className="row">
						<>
							{allreviews?.length ? allreviews?.map((l) => {

								return (
									<div className='col-sm-4'>
											
										<div className='latest_r'>
											<div className='rf85f'>
												<p>
													<i className='fa fa-star' />
													<i className='fa fa-star' />
													<i className='fa fa-star' />
													<i className='fa fa-star-half-o' />
													<span>{l?.rating}</span>
												</p>
												
												<h6>{new Date(l?.review_post_date).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" })}</h6>
												
											</div>
											
											<h4>
												{l?.comments}
											</h4>
											<h5> {l?.machanic?.name} {l?.machanic?.surname}</h5>
											<h6></h6>
											
										</div>
									</div>
								)
							}).reverse().slice(0, 3) : (<></>)}
						</>

					</div>
					<div className='all_request_button'>
						<Link href='/account/allreviews'>
							<a>
								All reviews <i className='fa fa-angle-right' />
							</a>
						</Link>
					</div>
				</div>
				<div className='container bottom-main-press'>
					<div className='row'>
						<div className='col-sm-2'>
							<figure>
								<img src='img/logo-usn.png' />
							</figure>
						</div>
						<div className='col-sm-2'>
							<figure>
								<img src='img/press_2.png' />
							</figure>
						</div>
						<div className='col-sm-2'>
							<figure>
								<img src='img/press_3.png' />
							</figure>
						</div>
						<div className='col-sm-2'>
							<figure>
								<img src='img/press_4.png' />
							</figure>
						</div>
						<div className='col-sm-2'>
							<figure>
								<img src='img/press_7.png' />
							</figure>
						</div>
						<div className='col-sm-2'>
							<figure>
								<img src='img/press1.jpg' />
							</figure>
						</div>
					</div>
				</div>
			</div>

				<div className="reg-button">
				<button type='submit' name='submit' onClick={handlepost}>
					Post a job
				</button>
			</div>

		</>
	);
}


Home.ignorePath = true;
export default Home;
