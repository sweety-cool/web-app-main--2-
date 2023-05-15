import React from "react";

type Props = {};

export default function Footer({}: Props) {
	return (
		<footer>
			<div className='container footer_wp'>
				<div className='row'>
					<div className='col-sm-4'>
						<figure className='footer_logo'>
							<img src='/img/logo.png' />
						</figure>
						<p>
							With Usineur.fr, SMEs and individuals have access to the machining
							workshops that will best meet their needs: aluminum, steel,
							stainless steel, brass, plastic parts...
							<br />
							<br />
							Usineur.fr allows Machinists to identify the requests that best
							correspond to their know-how, materials in stock, tooling capacity
							and thus offer machined parts at very attractive prices.
						</p>
					</div>
					<div className='col-sm-3 offset-md-1'>
						<h5>Quick Link</h5>
						<ul>
							<li>
								<a href='/account/how_it_works'>How it works </a>
							</li>
							<li>
								<a href='/account/assistance'>Assistance </a>
							</li>
							<li>
								<a href='/account/who_we_are'>Who are we ? </a>
							</li>
							
							
							<li>
								<a href='/account/price'>The Price page</a>
							</li>
						</ul>
					</div>
					<div className='col-sm-4'>
						<figure className='footer_payment'>
							<img src='/img/foot-ico2.png' />
						</figure>
					</div>
				</div>
			</div>
			<div className='copy_r'>
				<p>Copyright © 2022 usineur. All rights reserved</p>
			</div>
		</footer>
	);
}
