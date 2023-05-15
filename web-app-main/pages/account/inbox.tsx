import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CountryReponse, MyMsgResponse } from "../../src/@types/type";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";

const EditProfile = () => {
	const router = useRouter();

	const list = useAtomValue(atom.project.api.my_msgs);
	const user = useAtomValue(atom.storage.user);
	const notifs = useAtomValue(atom.project.api.notifs);
	//const [shownotification, setshownotification] = useState(false);

	useEffect(() => {
		api.project.my_msgs({});
		api.project.notifs({});
	}, []);

	const allnotification = () => {
		window.location.href = 'http://18.169.104.118/account/allNotification'
		
	}
	 const formatDate = (val) => {
        const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date: string = val;
        const datenew = date?.slice(0, 10)
        const day = datenew?.slice(8, 10)
        const month = monthList[Number(datenew?.slice(5, 7)) - 1]
        const year = datenew?.slice(0, 4)

        const finaldate = day + "-" + month + "," + year
        return finaldate;

    }


	

	console.log("notifications-->", notifs);

let pusharray = [];

	const handleChange = (event) => {
		if (event.target.checked) {
			console.log("checked", event.target.name)
			pusharray.push(event.target.name)
			console.log(pusharray)
		} else {
			console.log("unchecked", event.target.name)
			let index = pusharray.indexOf(event.target.name)
			pusharray.splice(index, 1);
			console.log(pusharray)
		}
	};


	
	console.log("List are:- ", list)

	return (
		<>
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
						{user?.role_id == 2 ? (
							<div className='profile_box mb-4'>
								<h3 className='pb-0'>
									Notifications <span className='darkblue-text '>({notifs.length})</span>{" "}
								</h3>
								<hr className='dashed-hr' />
								<div className='inbox-box'>
									{notifs.length ? notifs.slice(0, 2).map((n) => {
										return (
											<div className='project_loop border-0 pb-0'>

												<p> Admin</p>
												<p className='admin-text'>
													<span className='dpt-box'></span>{n.email_subject}
												</p>
												<p>{formatDate(n?.notif_date)}</p>
											</div>
										)

									}) : (<></>)}
									<hr className='dashed-hr' />

									<div className='project_loop text-end border-0 pb-0'>
											<a onClick={allnotification} className='view-text'>
												View all notifications
											</a>
									</div>
								</div>
							</div>
						) : (<></>)}
						<div className='profile_box'>
							<h3 className='pb-0'>Messages</h3>
							
							<hr className='dashed-hr' />
							<div className='table-responsive inbox-table mt-4'>
								<table className='table'>
									<thead>
										<tr>
											<th></th>
											<th>User</th>
											<th>Project title</th>
											<th className='text-end'>Last message</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{list.length && list.map((l) => {
											return (
												<tr>
													<td>
														<div className="msgform"><i className="fa fa-square"></i></div>

													</td>
													<td className='dummy-anchor darkblue-text cursor-pointer'>

														{l?.message?.from?.user_name}
													</td>
													<td>{l?.project?.project_name}</td>
													<td className='dummy-anchor cursor-pointer' onClick={() => {
														router.push(
															`/project/msg/${l?.project?.id}/${l?.message?.from_id}/${l?.message?.to_id}`,
														)
													}}>
														{l?.message?.message}</td>

												</	tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProfile;
