import React, { useEffect , useState } from "react";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import api from "../../src/api/services/api";
import { Button } from "react-bootstrap";
import {BsCheckCircleFill,BsFillSdCardFill} from "react-icons/bs";
import atom from "../../src/jotai/atom";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import Link from "next/link";	

type Props = {};

//let Invoice_data = []

function DownloadPDF(customer,p_name,amount,date,cus_address,cus_city,cus_zcode,transaction_id){
	//console.log("click---",customer,p_name,amount,date)
	localStorage.setItem('customer_name',customer)
	localStorage.setItem('project_name',p_name)
	localStorage.setItem('amount',amount)
	localStorage.setItem('Date',date)
	localStorage.setItem('customer_address',cus_address)
	localStorage.setItem('customer_city',cus_city)
	localStorage.setItem('customer_zcode',cus_zcode)
	localStorage.setItem('transaction_id',transaction_id)
	

	let path ="http://18.169.104.118/account/Invoice_pdf"
	// let path ="http://localhost:3000/account/InvoicePdf"
	window.open(path,'_blank')

	// let printContents = document.getElementById('Content').innerHTML;
	// let originalContents = document.body.innerHTML;
	// document.body.innerHTML = printContents;
	// window.print();
	// document.body.innerHTML = originalContents; 
}
const invoices = (props: Props) => {
	
	const router = useRouter();
	const opt = useAtomValue(atom.project.api.list_opt);
	const invoices = useAtomValue(atom.project.api.invoices);
	var year =new Date().getFullYear();

	const UserData = JSON.parse(localStorage.getItem('UserData'));
	console.log("data--", UserData)

	useEffect(() => {
		api.project.Invoice_list({ params: { ...opt, machinist_id: UserData.id } })

	}, [])


	console.log("inv_data", invoices)

	const handlePageClick = (i) => {
		router
			.replace({
				pathname: router.pathname,
				query: {
					page: i + 1,
				},
			})
			.then(() => {
				api.project.Invoice_list({ params: { ...opt, page: i, machinist_id: UserData.id } });
			});
	};


 	// Invoice_data = d.data;

			//setLoaded(true);
		
		// console.log("inv_data",Invoice_data)

		
		// setTimeout(()=>{
		// 	let Tbody = document.getElementById('Tbody') 
		// 	let InvoiceList = JSON.parse(localStorage.getItem('Invoice_List'));
		// 	console.log("List_inv--",InvoiceList)

		// 	// InvoiceList.map((item)=>(
		// 	// 	Tbody.innerHTML = 	Tbody.innerHTML + `<tr> <td>${item.status}</td> <td>${item.creator.name}</td> 	<td>${item.project.project_name}</td>  <td>$${item.amount}</td> </tr>`
		// 	// ))
	
		// 	console.log(Invoice_data)
		// },1000)

	return (
		<div>
			<div
				className='banner_wp sign_banner'
				style={{ backgroundImage: "url(./img/banner1.jpg)" }}>
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
							<h3>Invoices</h3>
							<div className='fund_wp'>
								<div className='table-responsive'>
								{/* <Button style={{background:'#d6c940',color:'black',borderRadius:'12px'}} onClick={()=>{DownloadPDF()}} >Download </Button> */}
									<table className='table table-bordered table-sm'>
										<thead>
											<tr className='table-primary'>
												<td>Invoice Number</td>
												<td>Date</td>
												<td>Client</td>
												<td>Name of the project</td>
												<td>Amount</td>
												<td>Commision(GBP)</td>
												<td>Action</td>
											</tr>
										</thead>
										<tbody id="Tbody">

											{invoices?.length
												? (

													invoices.map((item)=>{

												return (
													<tr>
															<td>{year}{item.id}</td>
															<td>{item.status}</td>
															<td>{item.creator.name}</td>
															<td style={{textAlign:'center'}}>{item.project.project_name}</td>
															<td style={{textAlign:'center'}}>${item.amount}</td>
															<td style={{textAlign:'center'}}>{(parseFloat(item.amount)*0.2).toFixed(2)}</td>
															<td>  <Button style={{background:'whitesmoke',color:'black',borderRadius:'12px'}} onClick={()=>{DownloadPDF(item.creator.name,item.project.project_name,item.amount,item.status,item.creator.address1,item.creator.city,item.creator.zcode,item.id)}} ><BsFillSdCardFill/> </Button></td>
														</tr>
												)
											})): (
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
										{Array.from({ length: opt.total_pages + 1 }).map(
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
						</div>
					</div>
				</div>
			</div>
			<div id="Content" style={{display:'none'}}>


				<table style={{  width:'100%', fontFamily: 'sans-serif',color: '#1e4066'}} >
					<tr>
						<td>
							<img width="150px" src="http://jhunsinfobay.net/usineur/img/logo.png" alt="" />
						</td>
						<td align="right" style={{color: '#1e4066'}}>
							<b>Date: 16jan.2022</b>
						</td>
					</tr>
					<tr>
						<td style={{ color: '#1e4066'}}><b>Machining-4U - SAS Faberville</b></td>
						<td align="right" style={{ color: '#1e4066'}}><b>Invoice No: 2019000041</b></td>
					</tr>
					<tr>
						<td style={{ lineHeight: '20px'}}>
							<address>
								15 rue Racine<br />
								91400 Orsay<br />
								No SIRET: 96854756
							</address>
						</td>
						<td align="right" style={{lineHeight: '20px'}}>
							<b>Johnson</b><br /><br />
							<address>
								6412<br />
								United Kingdom<br />
								6412
							</address>
						</td>
					</tr>
					<tr><td style={{height:'30px'}}></td></tr>
					<tr>
						<td align="center"><b>Invoice</b></td>
					</tr>
					<tr><td style={{height:'20px'}}></td></tr>
					<tr>
						<td >
							<table style={{ width:'100%', backgroundColor:'#eee'}} >
								<tr style={{background: '#6384ac',color: '#fff'}}>
									<td align="center">Name of the project</td>
									<td align="center">Project amount</td>
									<td align="center">Commission(%)</td>
									<td align="center">Commission Paid</td>
								</tr>
								<tr>
									<td align="center">Throttle Body Adaptor</td>
									<td align="center">161.00</td>
									<td align="center">14.90</td>
									<td align="center">GBP 23.99</td>
								</tr>
								<tr style={{ background: '#dfdfdf'}}>
									<td ></td>
									<td align="center">Commission Paid</td>
									<td align="center">GBP 23.99</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</div>
		</div>
	);
};

export default invoices;
