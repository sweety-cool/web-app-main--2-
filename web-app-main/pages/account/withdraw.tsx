import React, { useEffect, useState }  from "react";
import { useAtomValue } from "jotai";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import atom from "../../src/jotai/atom";
import api from "../../src/api/services/api";
import { BalanceResponse } from "../../src/@types/type";
import { toast } from "react-hot-toast";

type Props = {};

const withdraw = (props: Props) => {

	const balanceData = useAtomValue<BalanceResponse>(atom.auth.api.user_balance);
	const updatedBalance = useAtomValue<BalanceResponse>(atom.auth.api.update_balance);

	const [currBalance, setCurrBalance] = useState(balanceData?.amount_gbp);
	const [remain, setRemain] = useState(0);

	const onChange = (e) => {

		const { name, value } = e.target;

		if(currBalance){
			if (value <= currBalance) {
				const remainValue = currBalance - value;
				setRemain(remainValue);
			}
			else{
				setRemain(0);
			}

		}
		else{
			if (value <= balanceData?.amount_gbp) {
				const remainValue = balanceData?.amount_gbp - value;
				setRemain(remainValue);
			}
			else{
				setRemain(0);
			}

		}

	}

	const handleClick = ()=>{
		//setBalance(remain);

		var e = (document.getElementById("payOptions")) as HTMLSelectElement;
		//console.log(e);
		
		var sel = e.selectedIndex;
		var opt = e.options[sel];
		var payMethod = opt.value;
		api.auth.update_balance({ body: { "balance": remain, "method":payMethod } });
		(document.getElementById('amounttered') as HTMLInputElement).value =""
		setRemain(0);
		toast.success("Withdrawl successful!")
		
	}

	useEffect(()=>{
        setCurrBalance(updatedBalance?.amount_gbp)
	},[updatedBalance])

	useEffect(() => {
		api.auth.user_balance({});
	}, [])

	//console.log(balanceData);

	return (
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
							<h3>Remove Fund</h3>
							<div className='fund_wp'>
								<div className='row'>
									<div className='col-sm-4'>
										<label>Withdrawal Method:</label>
									</div>
									<div className='col-sm-8'>
										<select className='Gr-Border' name='paymentMethod' id="payOptions">
											<option value='paypal'>Paypal</option>
											<option value='bank'>Bank Transfer</option>
										</select>
										<p>
											for your first bank transfer payment, please email your
											bank details to us admin@machining-4u.co.uk
										</p>
									</div>
								</div>
								<hr />
								<div className='table-responsive'>
									<table className='table table-bordered table-sm'>
										<thead>
											<tr className='table-primary'>
												<td>Available Balance</td>
												<td>Amount to Withdraw</td>
												<td>New Balance</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>GBP £ {currBalance || balanceData?.amount_gbp}</td>
												<td>
													GBP £{" "}
													<input  onChange={onChange}
														name='total'
														size={15}
														type='text'
														id='amounttered'
														className='in-s'
													/>
												</td>
												<td>GBP £ {remain}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className='reg-bottom'>
									<button onClick={handleClick} type='submit' name='submit'>
										Withdraw Now
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withdraw;
